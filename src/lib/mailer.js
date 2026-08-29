import nodemailer from 'nodemailer';
import { sendEmail as sendViaResend } from './resend';

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

function toResendAttachments(attachments) {
  if (!attachments || !attachments.length) return [];
  return attachments.map((att) => ({
    filename: att.filename || att.name || 'attachment',
    content: att.content,
  }));
}

/**
 * Universal email dispatcher: Attempts Resend first; falls back to Gmail SMTP if configured.
 */
export async function sendUniversalEmail({ to, subject, html, attachments = [] }) {
  const hasResend = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('xxxxxxxxx');
  const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;

  // 1. Try Resend if configured
  if (hasResend) {
    try {
      const resendResult = await sendViaResend({
        to,
        subject,
        html,
        attachments: toResendAttachments(attachments),
      });
      return { provider: 'resend', result: resendResult };
    } catch (err) {
      console.warn('Resend failed, attempting SMTP fallback:', err.message);
    }
  }

  // 2. Try Gmail SMTP if credentials exist
  if (hasSmtp) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"AutoDesk Engine" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments: toNodemailerAttachments(attachments),
    });

    return { provider: 'gmail_smtp', result: info };
  }

  throw new Error('No email provider configured. Please provide either a valid RESEND_API_KEY or SMTP_USER & SMTP_PASS in .env.local');
}
