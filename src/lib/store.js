import fs from 'fs';
import path from 'path';

// Store path inside project .data directory
const DATA_DIR = path.join(process.cwd(), '.data');
const DEDUP_FILE = path.join(DATA_DIR, 'dedup-store.json');
const DEDUP_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory cache synced with disk
let memoryStore = null;

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[Store] Could not create .data directory:', err.message);
  }
}

function loadStore() {
  if (memoryStore !== null) {
    return memoryStore;
  }

  ensureDataDir();

  try {
    if (fs.existsSync(DEDUP_FILE)) {
      const content = fs.readFileSync(DEDUP_FILE, 'utf8');
      memoryStore = JSON.parse(content || '{}');
    } else {
      memoryStore = {};
      saveStore(memoryStore);
    }
  } catch (err) {
    console.warn('[Store] Error reading dedup store, initializing empty store:', err.message);
    memoryStore = {};
  }

  return memoryStore;
}

function saveStore(store) {
  ensureDataDir();
  try {
    // Atomic write using a temp file
    const tempFile = `${DEDUP_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(store, null, 2), 'utf8');
    fs.renameSync(tempFile, DEDUP_FILE);
  } catch (err) {
    console.warn('[Store] Error writing to dedup store on disk:', err.message);
  }
}

/**
 * Prunes expired hashes beyond TTL.
 */
export function pruneExpiredDedupEntries(ttlMs = DEDUP_TTL_MS) {
  const store = loadStore();
  const now = Date.now();
  let modified = false;

  for (const [hash, entry] of Object.entries(store)) {
    const timestamp = typeof entry === 'number' ? entry : (entry.timestamp || 0);
    if (now - timestamp > ttlMs) {
      delete store[hash];
      modified = true;
    }
  }

  if (modified) {
    saveStore(store);
  }
  return Object.keys(store).length;
}

/**
 * Checks if a hash exists within TTL. If not, sets it and persists to disk.
 * Returns { isDuplicate: boolean, entry: object }
 */
export function checkAndSetDedup(hash, metadata = {}, ttlMs = DEDUP_TTL_MS) {
  pruneExpiredDedupEntries(ttlMs);
  const store = loadStore();
  const now = Date.now();

  const existing = store[hash];
  if (existing) {
    const timestamp = typeof existing === 'number' ? existing : (existing.timestamp || 0);
    if (now - timestamp <= ttlMs) {
      return {
        isDuplicate: true,
        entry: typeof existing === 'number' ? { timestamp: existing } : existing,
      };
    }
  }

  // Record new entry
  const newEntry = {
    timestamp: now,
    ...metadata,
  };
  store[hash] = newEntry;
  saveStore(store);

  return {
    isDuplicate: false,
    entry: newEntry,
  };
}

/**
 * Retrieves telemetry statistics from the persistent store.
 */
export function getDedupStats() {
  const store = loadStore();
  const keys = Object.keys(store);
  const now = Date.now();
  let activeCount = 0;

  keys.forEach((k) => {
    const entry = store[k];
    const ts = typeof entry === 'number' ? entry : (entry.timestamp || 0);
    if (now - ts <= DEDUP_TTL_MS) activeCount++;
  });

  return {
    totalEntries: keys.length,
    active24hEntries: activeCount,
    storageLocation: DEDUP_FILE,
  };
}
