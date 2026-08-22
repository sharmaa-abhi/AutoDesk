import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { getResolvedDatabaseId } from '@/lib/notion';

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

    // Test creating a live verification entry
    const testPage = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: [
          {
            text: {
              content: `🧪 Connection Test — ${new Date().toLocaleTimeString()}`,
            },
          },
        ],
      },
      children: [
        {
          object: 'block',
          type: 'callout',
          callout: {
            rich_text: [
              {
                text: {
                  content: '✅ Notion Database connection verified successfully!',
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
      message: 'Notion Database successfully connected and verified!',
      databaseId: dbId,
      createdPageId: testPage.id,
      pageUrl: testPage.url,
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
