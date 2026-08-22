import { Client } from '@notionhq/client';

const notionApiKey = process.env.NOTION_API_KEY;

export const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;

/**
 * Creates a request row in the Notion Requests Database
 */
export async function createNotionRequest({
  title,
  userName,
  userEmail,
  category,
  confidence,
  priority,
  status = 'WAITING_APPROVAL',
  rawMessage,
}) {
  if (!notion || !process.env.NOTION_REQUESTS_DATABASE_ID) {
    console.warn('Notion API or Requests DB not configured. Skipping Notion write.');
    return { mock: true, id: `NOTION-MOCK-${Date.now()}` };
  }

  const response = await notion.pages.create({
    parent: { database_id: process.env.NOTION_REQUESTS_DATABASE_ID },
    properties: {
      Title: {
        title: [{ text: { content: title || 'Student Request' } }],
      },
      StudentName: {
        rich_text: [{ text: { content: userName || 'Anonymous' } }],
      },
      Email: {
        email: userEmail || 'unknown@example.com',
      },
      Category: {
        select: { name: category || 'UNCLASSIFIED_DATA' },
      },
      Priority: {
        select: { name: priority || 'MEDIUM' },
      },
      Status: {
        status: { name: status },
      },
    },
  });

  return response;
}

/**
 * Logs an execution row to the Notion Run Log Database
 */
export async function logRunToNotion({
  runId,
  action,
  trigger = 'AI Pipeline',
  duration = 0,
  status = 'SUCCESS',
}) {
  if (!notion || !process.env.NOTION_RUN_LOG_DATABASE_ID) {
    console.warn('Notion API or Run Log DB not configured. Skipping Run Log write.');
    return { mock: true, runId: runId || `RUN-${Date.now()}` };
  }

  const response = await notion.pages.create({
    parent: { database_id: process.env.NOTION_RUN_LOG_DATABASE_ID },
    properties: {
      RunId: {
        title: [{ text: { content: runId || `RUN-${Date.now()}` } }],
      },
      Action: {
        rich_text: [{ text: { content: action || 'Pipeline Execution' } }],
      },
      Trigger: {
        rich_text: [{ text: { content: trigger } }],
      },
      Status: {
        select: { name: status },
      },
    },
  });

  return response;
}
