import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { getResolvedDatabaseId, getResolvedDataSourceId } from '@/lib/notion';

export async function GET() {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const dbId = getResolvedDatabaseId(process.env.NOTION_REQUESTS_DATABASE_ID);

    if (!notionApiKey) {
      return NextResponse.json(
        { success: false, error: 'NOTION_API_KEY is not set' },
        { status: 400 }
      );
    }

    const notion = new Client({ auth: notionApiKey });

    // Test creating a live verification entry with full rich properties
    const testPage = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `🧪 Connection Test — ${new Date().toLocaleTimeString()}`,
              },
            },
          ],
        },
        'Record Type': {
          select: { name: 'Run Log' },
        },
        Status: {
          select: { name: 'Dispatched' },
        },
        Category: {
          select: { name: 'GENERAL_QUERY' },
        },
        Priority: {
          select: { name: 'MEDIUM' },
        },
        'Student Name': {
          rich_text: [{ text: { content: 'AutoDesk System Auditor' } }],
        },
        'Student Email': {
          email: 'audit@autodesk-engine.io',
        },
        'Event ID': {
          rich_text: [{ text: { content: 'system-diagnostic-2026' } }],
        },
        'AI Confidence': {
          number: 1.0,
        },
        'Attendance Verified': {
          checkbox: true,
        },
        'Action Summary': {
          rich_text: [{ text: { content: 'Automated healthcheck and schema verification executed successfully.' } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'callout',
          callout: {
            rich_text: [
              {
                text: {
                  content: '✅ Notion Database connection and rich schema verified successfully!',
                },
              },
            ],
            icon: { emoji: '🚀' },
          },
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Notion Database successfully connected and verified with rich structured schema!',
      databaseId: dbId,
      createdPageId: testPage.id,
      pageUrl: testPage.url,
      propertiesConfigured: [
        'Record Type',
        'Status',
        'Category',
        'Priority',
        'Student Name',
        'Student Email',
        'Event ID',
        'AI Confidence',
        'Attendance Verified',
        'Action Summary'
      ]
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to connect to Notion database',
        hint: 'Make sure your Notion integration is added to the database page via "..." -> "Connections" in Notion.',
      },
      { status: 500 }
    );
  }
}
