import fs from 'fs';
import path from 'path';
import os from 'os';

function getStoragePaths() {
  const primaryDir = path.join(process.cwd(), '.data');
  const fallbackDir = path.join(os.tmpdir(), 'autodesk-data');
  
  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ primaryDir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ primaryDir, { recursive: true });
    }
    // Test write
    const testFile = path.join(primaryDir, '.write-test');
    fs.writeFileSync(/*turbopackIgnore: true*/ testFile, 'ok', 'utf8');
    fs.unlinkSync(/*turbopackIgnore: true*/ testFile);
    return { dir: primaryDir, file: path.join(primaryDir, 'dedup-store.json') };
  } catch {
    // Fallback to os tmpdir
    try {
      if (!fs.existsSync(/*turbopackIgnore: true*/ fallbackDir)) {
        fs.mkdirSync(/*turbopackIgnore: true*/ fallbackDir, { recursive: true });
      }
      return { dir: fallbackDir, file: path.join(fallbackDir, 'dedup-store.json') };
    } catch {
      return { dir: primaryDir, file: path.join(primaryDir, 'dedup-store.json') };
    }
  }
}

const { dir: DATA_DIR, file: DEDUP_FILE } = getStoragePaths();
const DEDUP_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory cache synced with disk
let memoryStore = null;

function ensureDataDir() {
  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ DATA_DIR)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[Store] Notice: Directory init in memory fallback:', err.message);
  }
}

function loadStore() {
  if (memoryStore !== null) {
    return memoryStore;
  }

  ensureDataDir();

  try {
    if (fs.existsSync(/*turbopackIgnore: true*/ DEDUP_FILE)) {
      const content = fs.readFileSync(/*turbopackIgnore: true*/ DEDUP_FILE, 'utf8');
      memoryStore = JSON.parse(content || '{}');
    } else {
      memoryStore = {};
      saveStore(memoryStore);
    }
  } catch (err) {
    console.warn('[Store] Initializing clean memory store:', err.message);
    memoryStore = {};
  }

  return memoryStore;
}

function saveStore(store) {
  ensureDataDir();
  try {
    // Atomic write using a temp file
    const tempFile = `${DEDUP_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(/*turbopackIgnore: true*/ tempFile, JSON.stringify(store, null, 2), 'utf8');
    fs.renameSync(/*turbopackIgnore: true*/ tempFile, DEDUP_FILE);
  } catch {
    // Graceful fallback to memory without crash
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
