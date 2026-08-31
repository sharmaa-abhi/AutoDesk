import { NextResponse } from 'next/server';
import {
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
  getLog,
  listLogs,
} from '@/lib/resend';
import { sendUniversalEmail } from '@/lib/mailer';

/**
 * Validates that a required field is present in the request body.
 * Returns a NextResponse error if the field is missing, or null if valid.
 */
function requireField(body, field, label) {
  if (!body[field]) {
    return NextResponse.json(
      { success: false, error: `Missing required field: '${label || field}'` },
      { status: 400 }
    );
  }
  return null;
}

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

    // BUG-V2-001 FIX: Check for Resend SDK-level errors
    if (listResult?.error) {
      return NextResponse.json(
        { success: false, error: listResult.error.message || 'Failed to list emails' },
        { status: listResult.error.statusCode || 500 }
      );
    }

    return NextResponse.json({ success: true, data: listResult?.data ?? listResult });
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
    let validationError;

    switch (action) {
      case 'batch':
        result = await sendBatchEmails(body.emails || []);
        break;

      case 'get':
        validationError = requireField(body, 'id', 'id');
        if (validationError) return validationError;
        result = await getEmail(body.id);
        break;

      case 'update':
        validationError = requireField(body, 'id', 'id');
        if (validationError) return validationError;
        result = await updateEmail({ id: body.id, scheduledAt: body.scheduledAt });
        break;

      case 'list':
        result = await listEmails();
        break;

      case 'listAttachments':
        validationError = requireField(body, 'emailId', 'emailId');
        if (validationError) return validationError;
        result = await listAttachments({ emailId: body.emailId });
        break;

      case 'getAttachment':
        validationError = requireField(body, 'id', 'id') || requireField(body, 'emailId', 'emailId');
        if (validationError) return validationError;
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
        validationError = requireField(body, 'id', 'id') || requireField(body, 'name', 'name');
        if (validationError) return validationError;
        result = await updateApiKey(body.id, { name: body.name });
        break;

      case 'removeApiKey':
        validationError = requireField(body, 'id', 'id');
        if (validationError) return validationError;
        result = await removeApiKey(body.id);
        break;

      case 'getLog':
        validationError = requireField(body, 'id', 'id');
        if (validationError) return validationError;
        result = await getLog(body.id);
        break;

      case 'listLogs':
        result = await listLogs(body.options || {});
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

    // BUG-V2-001 FIX: Detect Resend SDK-level errors before returning success
    if (result?.error) {
      return NextResponse.json(
        { success: false, error: result.error.message || 'Resend operation failed' },
        { status: result.error.statusCode || 500 }
      );
    }

    return NextResponse.json({ success: true, data: result?.data ?? result });
  } catch (error) {
    console.error('Resend operation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Resend operation failed' },
      { status: 500 }
    );
  }
}
