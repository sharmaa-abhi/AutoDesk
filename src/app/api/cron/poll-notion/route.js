import { NextResponse } from 'next/server';
import { queryPendingApprovedRequests, updateNotionRequestStatus, logRunToNotion } from '@/lib/notion';
import { generateCertificateHTML } from '@/lib/certificate';
import { sendUniversalEmail } from '@/lib/mailer';
import { getEventProfile } from '@/lib/events';

// In-process lock to prevent overlapping daemon runs
let isPolling = false;

async function executePollCycle() {
  if (isPolling) {
    return {
      status: 'BUSY',
      message: 'A polling cycle is already actively executing.',
    };
  }

  isPolling = true;
  const startTime = Date.now();
  const runId = `DAEMON-POLL-${Date.now()}`;

  try {
    const queryResult = await queryPendingApprovedRequests();
    const pendingItems = queryResult.results || [];
    const processed = [];

    for (const item of pendingItems) {
      if (!item.userEmail) continue;

      const eventProfile = getEventProfile(item.eventId);
      const certId = `CERT-HITL-${Date.now().toString(36).toUpperCase()}`;

      const certHtml = generateCertificateHTML({
        studentName: item.userName,
        eventId: item.eventId,
        eventName: eventProfile.name,
        certificateId: certId,
      });

      let emailResult = null;
      try {
        emailResult = await sendUniversalEmail({
          to: item.userEmail,
          subject: `🎓 Verified: ${eventProfile.name} Certificate — ${item.userName}`,
          html: certHtml,
        });
      } catch (err) {
        console.warn(`Email error during daemon dispatch for ${item.userEmail}:`, err.message);
      }

      await updateNotionRequestStatus(
        item.pageId,
        'SUCCESS',
        `Dispatched Certificate ID: ${certId} via universal mailer.`
      );

      processed.push({
        userName: item.userName,
        userEmail: item.userEmail,
        certificateId: certId,
        eventId: item.eventId,
        emailResult,
      });
    }

    const duration = Date.now() - startTime;

    if (processed.length > 0) {
      await logRunToNotion({
        runId,
        action: `Daemon Processed ${processed.length} Approved Request(s): ${processed.map((p) => p.userName).join(', ')}`,
        trigger: 'Continuous Notion Polling Daemon',
        duration,
        status: 'SUCCESS',
      });
    }

    return {
      status: 'COMPLETED',
      runId,
      itemsFound: pendingItems.length,
      itemsProcessed: processed.length,
      processed,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    };
  } finally {
    isPolling = false;
  }
}

export async function GET() {
  const result = await executePollCycle();
  return NextResponse.json(result);
}

export async function POST() {
  const result = await executePollCycle();
  return NextResponse.json(result);
}
