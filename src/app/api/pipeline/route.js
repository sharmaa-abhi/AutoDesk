import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { classifyRequest } from '@/lib/gemini';
import { createNotionRequest, logRunToNotion } from '@/lib/notion';
import { sendUniversalEmail } from '@/lib/mailer';
import { generateCertificateHTML } from '@/lib/certificate';
import { checkAndSetDedup, getDedupStats } from '@/lib/store';
import { getEventProfile } from '@/lib/events';

function getPayloadHash(email, message) {
  const normalized = `${(email || '').toLowerCase().trim()}_${(message || '').toLowerCase().trim()}`;
  return crypto.createHash('md5').update(normalized).digest('hex');
}

/**
 * Basic email format check.
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  const stats = getDedupStats();
  return NextResponse.json({
    status: 'ONLINE',
    service: 'AutoDesk Engine Pipeline',
    dedup: stats,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      action,
      userName,
      userEmail,
      rawMessage,
      eventId = 'automate-india-2026',
      eventName = null,
      requestId,
    } = body;

    const eventProfile = getEventProfile(eventId || eventName);
    const resolvedEventName = eventName || eventProfile.name;

    // =====================
    // GLOBAL INPUT VALIDATION
    // =====================
    if (!action || !['ingest', 'approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, error: `Invalid or missing action. Must be one of: ingest, approve, reject` },
        { status: 400 }
      );
    }

    // ==========================================
    // ACTION 1: INGEST NEW TICKET / WEBHOOK
    // ==========================================
    if (action === 'ingest') {
      if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
        return NextResponse.json(
          { success: false, error: 'rawMessage is required and must be a non-empty string.' },
          { status: 400 }
        );
      }

      if (!userName || typeof userName !== 'string' || !userName.trim()) {
        return NextResponse.json(
          { success: false, error: 'userName is required.' },
          { status: 400 }
        );
      }

      const isEmailValid = isValidEmail(userEmail);
      const safeEmail = (userEmail || 'unspecified@student.edu').slice(0, 320);
      const safeName = (userName || 'Anonymous Student').slice(0, 200);
      const safeMessage = rawMessage.slice(0, 10000);
      const safeRequestId = requestId || `REQ-${Math.floor(100 + Math.random() * 900)}`;

      // Check & persist deduplication in persistent storage
      const hash = getPayloadHash(safeEmail, safeMessage);
      const dedupCheck = checkAndSetDedup(hash, {
        email: safeEmail,
        name: safeName,
        eventId: eventProfile.id,
        requestId: safeRequestId,
      });

      if (dedupCheck.isDuplicate) {
        const runId = `RUN-${Date.now()}`;
        const duration = Date.now() - startTime;
        await logRunToNotion({
          runId,
          action: `MD5 Duplicate Blocked for ${safeEmail} (Event: ${eventProfile.shortName})`,
          trigger: 'Persistent Dedup Gate',
          duration,
          status: 'BLOCKED',
        });

        return NextResponse.json({
          success: true,
          status: 'DUPLICATE_FILTERED',
          message: 'Duplicate submission blocked within persistent 24h window.',
          hash,
          requestId: safeRequestId,
          runId,
          durationMs: duration,
        });
      }

      // 1. Gemini AI Analysis
      const aiResult = await classifyRequest({
        rawMessage: safeMessage,
        userName: safeName,
        userEmail: safeEmail,
      });

      // 2. Push to Notion Database
      const notionEntry = await createNotionRequest({
        title: aiResult.title || 'Student Certificate Request',
        userName: safeName || aiResult.extractedName,
        userEmail: safeEmail || aiResult.extractedEmail,
        category: aiResult.category,
        confidence: aiResult.confidence,
        priority: aiResult.priority,
        status: aiResult.status || 'WAITING_APPROVAL',
        rawMessage: safeMessage,
        eventId: eventProfile.id,
      });

      let emailResult = null;
      let finalStatus = !isEmailValid ? 'NEEDS_FIX' : (aiResult.status || 'WAITING_APPROVAL');

      // 3. Smart Routing: If auto-approved / verified attendance
      if (isEmailValid && aiResult.attendanceVerified && aiResult.confidence >= 90 && finalStatus !== 'NEEDS_FIX') {
        finalStatus = 'SUCCESS';

        const certHtml = generateCertificateHTML({
          studentName: safeName || aiResult.extractedName || 'Student Participant',
          eventId: eventProfile.id,
          eventName: resolvedEventName,
          certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
        });

        try {
          emailResult = await sendUniversalEmail({
            to: safeEmail,
            subject: `🎓 Verified Certificate of Completion — ${resolvedEventName}`,
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
          ? `Auto-Dispatched Certificate to ${safeName} (${eventProfile.shortName})`
          : `Queued for Human Approval: ${aiResult.category} (${eventProfile.shortName})`,
        trigger: 'Webhook Ingestion Pipeline',
        duration,
        status: 'SUCCESS',
      });

      return NextResponse.json({
        success: true,
        requestId: safeRequestId,
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
      const safeName = (userName || 'Student Participant').slice(0, 200);
      const safeEmail = userEmail && isValidEmail(userEmail) ? userEmail : null;
      const safeRequestId = requestId || `REQ-${Date.now()}`;

      const certHtml = generateCertificateHTML({
        studentName: safeName,
        eventId: eventProfile.id,
        eventName: resolvedEventName,
        certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
      });

      let emailResult = null;
      if (safeEmail) {
        try {
          emailResult = await sendUniversalEmail({
            to: safeEmail,
            subject: `🎓 Approved: Verified Certificate — ${resolvedEventName}`,
            html: certHtml,
          });
        } catch (mailErr) {
          console.warn('Email dispatch warning:', mailErr.message);
        }
      }

      const duration = Date.now() - startTime;
      const runId = `RUN-${Date.now()}`;

      await logRunToNotion({
        runId,
        action: `Operator Approved Certificate for ${safeName} (${safeRequestId}) [${eventProfile.shortName}]`,
        trigger: 'Notion Operator Cockpit',
        duration,
        status: 'SUCCESS',
      });

      return NextResponse.json({
        success: true,
        requestId: safeRequestId,
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
      const safeRequestId = requestId || `REQ-${Date.now()}`;
      const duration = Date.now() - startTime;
      const runId = `RUN-${Date.now()}`;

      await logRunToNotion({
        runId,
        action: `Operator Rejected Request ${safeRequestId} (Attendance not verified) [${eventProfile.shortName}]`,
        trigger: 'Notion Operator Cockpit',
        duration,
        status: 'REJECTED',
      });

      return NextResponse.json({
        success: true,
        requestId: safeRequestId,
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
