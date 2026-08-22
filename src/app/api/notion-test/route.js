import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const dbId = process.env.NOTION_REQUESTS_DATABASE_ID;

    if (!notionApiKey) {
      return NextResponse.json(
        { success: false, error: 'NOTION_API_KEY is not set' },
        { status: 400 }
      );
    }

    const notion = new Client({ auth: notionApiKey });

    // Test retrieving database schema or querying entries
    const dbInfo = await notion.databases.retrieve({ database_id: dbId });

    return NextResponse.json({
      success: true,
      message: 'Notion Database successfully connected!',
      databaseTitle: dbInfo.title?.[0]?.plain_text || 'Untitled',
      properties: Object.keys(dbInfo.properties || {}),
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
