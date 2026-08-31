import { NextResponse } from 'next/server';
import {
  sendEmail,
  sendBatchEmails,
  getEmail,
  updateEmail,
  listEmails,
  listAttachments,
  getAttachment,
  createApiKey,
  listApiKeys,
  updateApiKey,
  removeApiKey,
} from '@/lib/resend';
import { sendUniversalEmail } from '@/lib/mailer';

export async function GET() {
  try {
    const rawKey = process.env.RESEND_API_KEY;
    const isResendConfigured = rawKey && !rawKey.includes('xxxxxxxxx');

    if (!isResendConfigured) {
      return NextResponse.json({
        success: true,
        message: 'Resend API key is not configured. System is currently using Gmail SMTP dispatcher.',
        activeProvider: process.env.SMTP_USER ? 'gmail_smtp' : 'none',
        data: [],
      });
    }

    const listResult = await listEmails();
    return NextResponse.json({ success: true, data: listResult });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to list emails' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action = 'send' } = body;

    let result;

    switch (action) {
      case 'batch':
        result = await sendBatchEmails(body.emails || []);
        break;

      case 'get':
        result = await getEmail(body.id);
        break;

      case 'update':
        result = await updateEmail({ id: body.id, scheduledAt: body.scheduledAt });
        break;

      case 'list':
        result = await listEmails();
        break;

      case 'listAttachments':
        result = await listAttachments({ emailId: body.emailId });
        break;

      case 'getAttachment':
        result = await getAttachment({ id: body.id, emailId: body.emailId });
        break;

      case 'createApiKey':
        result = await createApiKey({
          name: body.name || 'Production',
          permission: body.permission,
          domainId: body.domainId,
        });
        break;

      case 'listApiKeys':
        result = await listApiKeys();
        break;

      case 'updateApiKey':
        result = await updateApiKey(body.id, { name: body.name });
        break;

      case 'removeApiKey':
        result = await removeApiKey(body.id);
        break;

      case 'send':
      default:
        result = await sendUniversalEmail({
          to: body.to || 'delivered@resend.dev',
          subject: body.subject || 'Certificate Delivery — AutoDesk Engine',
          html: body.html || '<p>Your request has been processed successfully!</p>',
          attachments: body.attachments || [],
        });
        break;
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Resend operation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Resend operation failed' },
      { status: 500 }
    );
  }
}


