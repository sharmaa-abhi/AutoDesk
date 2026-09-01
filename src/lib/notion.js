import { Client } from '@notionhq/client';

const notionApiKey = process.env.NOTION_API_KEY;

export const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;

export function getResolvedDatabaseId(customId) {
  const raw = customId || process.env.NOTION_REQUESTS_DATABASE_ID || '3c4460806457802e8a8cfd9593734bb3';
  const clean = (raw || '').replace(/-/g, '').trim();

  // If the user's old page ID was provided, automatically route to the real database ID
  if (clean === '3c44608064578053bec2c9ce5f1a0f04' || !clean) {
    return '3c446080-6457-802e-8a8c-fd9593734bb3';
  }

  // Format into standard UUID if 32 hex chars
  if (clean.length === 32) {
    return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
  }
  return raw;
}

/**
 * Creates a structured request row in the Notion Requests Database
 */
export async function createNotionRequest({
  title,
  userName = 'Anonymous Student',
  userEmail = 'sharmaa24434@gmail.com',
  category = 'CERTIFICATE_ISSUE',
  confidence = 95,
  priority = 'HIGH',
  status = 'WAITING_APPROVAL',
  rawMessage = '',
}) {
  const dbId = getResolvedDatabaseId(process.env.NOTION_REQUESTS_DATABASE_ID);

  if (!notion || !dbId) {
    console.warn('Notion API or Requests DB not configured. Skipping Notion write.');
    return { mock: true, id: `NOTION-MOCK-${Date.now()}` };
  }

  const pageTitle = `${userName} — ${title || category}`;

  try {
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: pageTitle,
              },
            },
          ],
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
                  content: `🏷️ CATEGORY: ${category} | ⚡ PRIORITY: ${priority} | 📊 CONFIDENCE: ${confidence}% | 🔄 STATUS: ${status}`,
                },
              },
            ],
            icon: { emoji: '⚡' },
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `👤 Student Name: ${userName}\n📧 Email Address: ${userEmail}\n📝 Student Message: "${rawMessage}"`,
                },
              },
            ],
          },
        },
      ],
    });

    return response;
  } catch (error) {
    console.error('Error creating Notion Request page:', error.message);
    return { error: error.message, mock: true };
  }
}

/**
 * Logs an automated run to the Notion Run Log Database
 */
export async function logRunToNotion({
  runId,
  action,
  trigger = 'AI Pipeline',
  duration = 0,
  status = 'SUCCESS',
}) {
  // NOTE: If NOTION_RUN_LOG_DATABASE_ID equals NOTION_REQUESTS_DATABASE_ID,
  // run logs and requests will be co-mingled in the same database.
  // For production, consider using separate databases for cleaner audit trails.
  const dbId = getResolvedDatabaseId(process.env.NOTION_RUN_LOG_DATABASE_ID);

  if (!notion || !dbId) {
    console.warn('Notion API or Run Log DB not configured. Skipping Run Log write.');
    return { mock: true, runId: runId || `RUN-${Date.now()}` };
  }

  const logTitle = `📜 ${runId || `RUN-${Date.now()}`} — ${status}`;

  try {
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: logTitle,
              },
            },
          ],
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
                  content: `⏱️ Execution Duration: ${duration}ms | 🎯 Trigger: ${trigger} | 🚦 Status: ${status}`,
                },
              },
            ],
            icon: { emoji: status === 'SUCCESS' ? '✅' : '⚠️' },
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `Action Summary: ${action}\nTimestamp: ${new Date().toISOString()}`,
                },
              },
            ],
          },
        },
      ],
    });

    return response;
  } catch (error) {
    console.error('Error writing Notion Run Log:', error.message);
    return { error: error.message, mock: true };
  }
}
