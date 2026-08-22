import { NextResponse } from 'next/server';
import {
  sendEmail,
  sendBatchEmails,
  getEmail,
  updateEmail,
  listEmails,
  listAttachments,
  getAttachment,
} from '@/lib/resend';

export async function GET() {
  try {
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

      case 'send':
      default:
        result = await sendEmail({
          to: body.to || 'delivered@resend.dev',
          subject: body.subject || 'Certificate Delivery — AutoDesk Engine',
          html: body.html || '<p>Your request has been processed successfully!</p>',
          from: body.from,
          attachments: body.attachments,
          scheduledAt: body.scheduledAt,
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


