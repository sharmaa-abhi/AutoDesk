import nodemailer from 'nodemailer';
import { sendEmail as sendViaResend } from './resend.js';

/**
 * Normalize attachments into each provider's expected format.
 */
function toNodemailerAttachments(attachments) {
  if (!attachments || !attachments.length) return [];
  return attachments.map((att) => ({
    filename: att.filename || att.name || 'attachment',
    content: att.content,
    ...(att.contentType ? { contentType: att.contentType } : {}),
    ...(att.path ? { path: att.path } : {}),
  }));
}

// BUG-V2-003 FIX: Pass through `path` property for file-path-based attachments
function toResendAttachments(attachments) {
  if (!attachments || !attachments.length) return [];
  return attachments.map((att) => ({
    filename: att.filename || att.name || 'attachment',
    content: att.content,
    ...(att.path ? { path: att.path } : {}),
  }));
}

// Cache the SMTP transporter as a lazy singleton to avoid re-creating on every call
let _smtpTransporter = null;

function getSmtpTransporter() {
  if (_smtpTransporter) return _smtpTransporter;
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    _smtpTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 6000,
    });
  }
  return _smtpTransporter;
}

/**
 * Universal email dispatcher: Uses Gmail SMTP as Primary (100% unrestricted delivery to ANY email address);
 * falls back to Resend if SMTP is unavailable.
 */
export async function sendUniversalEmail({ to, subject, html, attachments = [] }) {
  const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;
  const hasResend = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('xxxxxxxxx');

  // 1. Primary: Use Gmail SMTP (Delivers directly to ANY valid email address without domain/sandbox restrictions)
  if (hasSmtp) {
    try {
      const transporter = getSmtpTransporter();
      const info = await transporter.sendMail({
        from: `"AutoDesk Engine" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        attachments: toNodemailerAttachments(attachments),
      });

      return { provider: 'gmail_smtp', result: info };
    } catch (smtpErr) {
      console.warn('Gmail SMTP failed, cascading to Resend fallback:', smtpErr.message);
    }
  }

  // 2. Fallback: Try Resend if configured
  if (hasResend) {
    try {
      const resendResult = await sendViaResend({
        to,
        subject,
        html,
        attachments: toResendAttachments(attachments),
      });

      if (resendResult && resendResult.error) {
        console.warn('Resend API notice:', resendResult.error.message);
        throw new Error(resendResult.error.message || 'Resend delivery restricted');
      }

      if (resendResult && (resendResult.id || (resendResult.data && resendResult.data.id))) {
        return { provider: 'resend', result: resendResult };
      }
    } catch (err) {
      console.warn('Resend fallback delivery failed:', err.message);
      throw err;
    }
  }

  throw new Error('No working email provider configured. Please check SMTP_USER/SMTP_PASS or RESEND_API_KEY in .env.local');
}

/**
 * Universal batch email dispatcher.
 */
export async function sendBatchUniversalEmails(emailList = []) {
  const results = [];
  for (const item of emailList) {
    const res = await sendUniversalEmail({
      to: item.to,
      subject: item.subject,
      html: item.html,
      attachments: item.attachments || [],
    });
    results.push(res);
  }
  return { success: true, count: results.length, data: results };
}

