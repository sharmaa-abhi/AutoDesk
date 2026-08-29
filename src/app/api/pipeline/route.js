import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { classifyRequest } from '@/lib/gemini';
import { createNotionRequest, logRunToNotion } from '@/lib/notion';
import { sendUniversalEmail } from '@/lib/mailer';
import { generateCertificateHTML } from '@/lib/certificate';

// In-memory deduplication cache with TTL cleanup (24h window)
const DEDUP_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const deduplicationCache = new Map();

function cleanExpiredEntries() {
  const now = Date.now();
  for (const [hash, timestamp] of deduplicationCache) {
    if (now - timestamp > DEDUP_TTL_MS) {
      deduplicationCache.delete(hash);
    }
  }
}

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

export async function POST(request) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      action,
      userName,
      userEmail,
      rawMessage,
      eventName = 'Automate India',
      requestId,
    } = body;

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
      // Validate required fields for ingest
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

      // Cleanup expired dedup entries
      cleanExpiredEntries();

      const hash = getPayloadHash(safeEmail, safeMessage);
      const isDuplicate = deduplicationCache.has(hash);

      if (isDuplicate) {
        const runId = `RUN-${Date.now()}`;
        const duration = Date.now() - startTime;
        await logRunToNotion({
          runId,
          action: `MD5 Duplicate Blocked for ${safeEmail}`,
          trigger: 'Sanitization & Dedup Gate',
          duration,
          status: 'BLOCKED',
        });

        return NextResponse.json({
          success: true,
          status: 'DUPLICATE_FILTERED',
          message: 'Duplicate submission blocked within 24h window.',
          hash,
          requestId: safeRequestId,
        });
      }

      // Record in cache
      deduplicationCache.set(hash, Date.now());

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
      });

      let emailResult = null;
      let finalStatus = !isEmailValid ? 'NEEDS_FIX' : (aiResult.status || 'WAITING_APPROVAL');

      // 3. Smart Routing: If auto-approved / verified attendance
      if (isEmailValid && aiResult.attendanceVerified && aiResult.confidence >= 90 && finalStatus !== 'NEEDS_FIX') {
        finalStatus = 'SUCCESS';

        const certHtml = generateCertificateHTML({
          studentName: safeName || aiResult.extractedName || 'Student Participant',
          eventName,
          certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
        });

        try {
          emailResult = await sendUniversalEmail({
            to: safeEmail,
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
          ? `Auto-Dispatched Certificate to ${safeName}`
          : `Queued for Human Approval: ${aiResult.category}`,
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
        eventName,
        certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
      });

      let emailResult = null;
      if (safeEmail) {
        try {
          emailResult = await sendUniversalEmail({
            to: safeEmail,
            subject: `🎓 Approved: Verified Certificate — ${eventName}`,
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
        action: `Operator Approved Certificate for ${safeName} (${safeRequestId})`,
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
        action: `Operator Rejected Request ${safeRequestId} (Attendance not verified)`,
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
