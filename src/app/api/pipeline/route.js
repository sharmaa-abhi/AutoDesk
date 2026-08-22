import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { classifyRequest } from '@/lib/gemini';
import { createNotionRequest, logRunToNotion } from '@/lib/notion';
import { sendUniversalEmail } from '@/lib/mailer';
import { generateCertificateHTML } from '@/lib/certificate';

// In-memory deduplication cache for recent hashes (24h window)
const deduplicationCache = new Map();

function getPayloadHash(email, message) {
  const normalized = `${(email || '').toLowerCase().trim()}_${(message || '').toLowerCase().trim()}`;
  return crypto.createHash('md5').update(normalized).digest('hex');
}

export async function POST(request) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      action = 'ingest',
      userName = 'Rahul Sharma',
      userEmail = 'sharmaa24434@gmail.com',
      rawMessage = "Sir I attended the 2-day GenAI workshop but didn't receive my certificate yet. Please verify attendance.",
      eventName = 'National GenAI & Web3 Hackathon 2026',
      requestId = `REQ-${Math.floor(100 + Math.random() * 900)}`,
    } = body;

    // ==========================================
    // ACTION 1: INGEST NEW TICKET / WEBHOOK
    // ==========================================
    if (action === 'ingest') {
      const hash = getPayloadHash(userEmail, rawMessage);
      const isDuplicate = deduplicationCache.has(hash);

      if (isDuplicate) {
        const runId = `RUN-${Date.now()}`;
        const duration = Date.now() - startTime;
        await logRunToNotion({
          runId,
          action: `MD5 Duplicate Blocked for ${userEmail}`,
          trigger: 'Sanitization & Dedup Gate',
          duration,
          status: 'BLOCKED',
        });

        return NextResponse.json({
          success: true,
          status: 'DUPLICATE_FILTERED',
          message: 'Duplicate submission blocked within 24h window.',
          hash,
          requestId,
        });
      }

      // Record in cache
      deduplicationCache.set(hash, Date.now());

      // 1. Gemini AI Analysis
      const aiResult = await classifyRequest({
        rawMessage,
        userName,
        userEmail,
      });

      // 2. Push to Notion Database
      const notionEntry = await createNotionRequest({
        title: aiResult.title || 'Student Certificate Request',
        userName: userName || aiResult.extractedName,
        userEmail: userEmail || aiResult.extractedEmail,
        category: aiResult.category,
        confidence: aiResult.confidence,
        priority: aiResult.priority,
        status: aiResult.status || 'WAITING_APPROVAL',
        rawMessage,
      });

      let emailResult = null;
      let finalStatus = aiResult.status || 'WAITING_APPROVAL';

      // 3. Smart Routing: If auto-approved / verified attendance
      if (aiResult.attendanceVerified && aiResult.confidence >= 90 && finalStatus !== 'NEEDS_FIX') {
        finalStatus = 'SUCCESS';

        const certHtml = generateCertificateHTML({
          studentName: userName || aiResult.extractedName || 'Student Participant',
          eventName,
          certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
        });

        try {
          emailResult = await sendUniversalEmail({
            to: userEmail || 'sharmaa24434@gmail.com',
            subject: `🎓 Verified Certificate of Completion — ${eventName}`,
            html: certHtml,
          });
        } catch (mailErr) {
          console.warn('Email dispatch warning:', mailErr.message);
        }
      }

      const duration = Date.now() - startTime;
      const runId = `RUN-${Date.now()}`;

      // 4. Log to Notion Run Log
      await logRunToNotion({
        runId,
        action: finalStatus === 'SUCCESS'
          ? `Auto-Dispatched Certificate to ${userName}`
          : `Queued for Human Approval: ${aiResult.category}`,
        trigger: 'Webhook Ingestion Pipeline',
        duration,
        status: 'SUCCESS',
      });

      return NextResponse.json({
        success: true,
        requestId,
        runId,
        durationMs: duration,
        status: finalStatus,
        ai: aiResult,
        notion: notionEntry,
        email: emailResult,
      });
    }

    // ==========================================
    // ACTION 2: HUMAN APPROVE (HITL COCKPIT)
    // ==========================================
    if (action === 'approve') {
      const certHtml = generateCertificateHTML({
        studentName: userName || 'Student Participant',
        eventName,
        certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
      });

      let emailResult = null;
      try {
        emailResult = await sendUniversalEmail({
          to: userEmail || 'sharmaa24434@gmail.com',
          subject: `🎓 Approved: Verified Certificate — ${eventName}`,
          html: certHtml,
        });
      } catch (mailErr) {
        console.warn('Email dispatch warning:', mailErr.message);
      }

      const duration = Date.now() - startTime;
      const runId = `RUN-${Date.now()}`;

      await logRunToNotion({
        runId,
        action: `Operator Approved Certificate for ${userName} (${requestId})`,
        trigger: 'Notion Operator Cockpit',
        duration,
        status: 'SUCCESS',
      });

      return NextResponse.json({
        success: true,
        requestId,
        runId,
        status: 'SUCCESS',
        durationMs: duration,
        email: emailResult,
      });
    }

    // ==========================================
    // ACTION 3: HUMAN REJECT
    // ==========================================
    if (action === 'reject') {
      const duration = Date.now() - startTime;
      const runId = `RUN-${Date.now()}`;

      await logRunToNotion({
        runId,
        action: `Operator Rejected Request ${requestId} (Attendance not verified)`,
        trigger: 'Notion Operator Cockpit',
        duration,
        status: 'REJECTED',
      });

      return NextResponse.json({
        success: true,
        requestId,
        runId,
        status: 'REJECTED',
        durationMs: duration,
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch (error) {
    console.error('Pipeline Execution Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Pipeline execution failed' },
      { status: 500 }
    );
  }
}
