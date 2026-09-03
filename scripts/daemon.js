/**
 * AutoDesk Engine — Continuous Background Polling Daemon
 * 
 * Runs a standalone background process that polls the Notion Operator Database
 * every POLL_INTERVAL_MS, detects approved requests, triggers certificate generation,
 * sends emails, and writes audit trails.
 */

const POLL_INTERVAL_MS = parseInt(process.env.POLL_INTERVAL_MS || '15000', 10);
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

console.log('====================================================');
console.log('⚡ AutoDesk Engine — Continuous Background Polling Daemon');
console.log(`⏱️  Polling Interval: ${POLL_INTERVAL_MS / 1000}s`);
console.log(`🎯 Target Endpoint: ${APP_URL}/api/cron/poll-notion`);
console.log('====================================================');

let cycleCount = 0;

async function pollOnce() {
  cycleCount++;
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [Cycle #${cycleCount}] Polling Notion for approved operator requests...`);

  try {
    const res = await fetch(`${APP_URL}/api/cron/poll-notion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      console.warn(`[Cycle #${cycleCount}] Server returned status ${res.status}: ${res.statusText}`);
      return;
    }

    const data = await res.json();
    if (data.itemsProcessed > 0) {
      console.log(`🎉 [Cycle #${cycleCount}] Success: Processed ${data.itemsProcessed} approved requests!`);
      data.processed.forEach((p) => {
        console.log(`   - Dispatched certificate to: ${p.userName} (${p.userEmail})`);
      });
    } else {
      console.log(`💤 [Cycle #${cycleCount}] No new pending approvals found. (${data.durationMs || 0}ms)`);
    }
  } catch (err) {
    console.error(`❌ [Cycle #${cycleCount}] Daemon poll error:`, err.message);
  }
}

// Initial poll then loop
pollOnce();
setInterval(pollOnce, POLL_INTERVAL_MS);
