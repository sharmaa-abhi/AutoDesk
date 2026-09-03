import { Client } from '@notionhq/client';

let _notionClient = null;

export function getNotionClient() {
  const key = process.env.NOTION_API_KEY;
  if (!key) return null;
  if (!_notionClient) {
    _notionClient = new Client({ auth: key });
  }
  return _notionClient;
}

export const notion = {
  get client() {
    return getNotionClient();
  },
  get pages() {
    const client = getNotionClient();
    return client ? client.pages : null;
  },
  get databases() {
    const client = getNotionClient();
    return client ? client.databases : null;
  },
  get blocks() {
    const client = getNotionClient();
    return client ? client.blocks : null;
  },
};

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
  eventId = 'automate-india-2026',
}) {
  const dbId = getResolvedDatabaseId(process.env.NOTION_REQUESTS_DATABASE_ID);

  if (!notion.pages || !dbId) {
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
                  content: `🏷️ CATEGORY: ${category} | ⚡ PRIORITY: ${priority} | 📊 CONFIDENCE: ${confidence}% | 🔄 STATUS: ${status} | 🎪 EVENT: ${eventId}`,
                },
              },
            ],
            icon: { emoji: status === 'SUCCESS' ? '✅' : '⚡' },
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: `👤 Student Name: ${userName}\n📧 Email Address: ${userEmail}\n🎪 Event ID: ${eventId}\n📝 Student Message: "${rawMessage}"`,
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
 * Queries Notion Requests Database for tickets that have been Approved by an Operator.
 */
export async function queryPendingApprovedRequests(customDbId) {
  const client = getNotionClient();
  const dbId = getResolvedDatabaseId(customDbId || process.env.NOTION_REQUESTS_DATABASE_ID);

  if (!client || !dbId) {
    return { mock: true, results: [] };
  }

  try {
    const response = await client.databases.query({
      database_id: dbId,
      page_size: 25,
    });

    const pendingApproved = [];

    for (const page of response.results || []) {
      // Check block children or properties for "STATUS: Approved" or "Approved"
      try {
        const blocks = await client.blocks.children.list({ block_id: page.id });
        let isApproved = false;
        let isAlreadyProcessed = false;
        let extractedEmail = null;
        let extractedName = null;
        let extractedEvent = 'automate-india-2026';

        for (const block of blocks.results || []) {
          const text = (block.callout?.rich_text || block.paragraph?.rich_text || [])
            .map((t) => t.plain_text || '')
            .join(' ');

          if (text.includes('STATUS: Approved') || text.includes('STATUS: APPROVED')) {
            isApproved = true;
          }
          if (text.includes('DISPATCHED: TRUE') || text.includes('STATUS: SUCCESS')) {
            isAlreadyProcessed = true;
          }

          const emailMatch = text.match(/Email Address:\s*([^\s\n]+)/i);
          if (emailMatch) extractedEmail = emailMatch[1].trim();

          const nameMatch = text.match(/Student Name:\s*([^\n]+)/i);
          if (nameMatch) extractedName = nameMatch[1].trim();

          const eventMatch = text.match(/Event ID:\s*([^\s\n]+)/i);
          if (eventMatch) extractedEvent = eventMatch[1].trim();
        }

        if (isApproved && !isAlreadyProcessed) {
          pendingApproved.push({
            pageId: page.id,
            userName: extractedName || 'Student Participant',
            userEmail: extractedEmail,
            eventId: extractedEvent,
            url: page.url,
          });
        }
      } catch (childErr) {
        console.warn(`Error reading blocks for page ${page.id}:`, childErr.message);
      }
    }

    return { results: pendingApproved, total: pendingApproved.length };
  } catch (error) {
    console.error('Error querying Notion approved requests:', error.message);
    return { error: error.message, results: [] };
  }
}

/**
 * Updates a Notion page with an audit badge indicating automated dispatch execution.
 */
export async function updateNotionRequestStatus(pageId, status = 'SUCCESS', notes = '') {
  const client = getNotionClient();
  if (!client || !pageId) {
    return { mock: true };
  }

  try {
    const response = await client.blocks.children.append({
      block_id: pageId,
      children: [
        {
          object: 'block',
          type: 'callout',
          callout: {
            rich_text: [
              {
                text: {
                  content: `🤖 AUTODESK DAEMON EXECUTION: [STATUS: ${status}] [DISPATCHED: TRUE]\n${notes}\nTimestamp: ${new Date().toISOString()}`,
                },
              },
            ],
            icon: { emoji: status === 'SUCCESS' ? '🎉' : '⚠️' },
          },
        },
      ],
    });

    return response;
  } catch (error) {
    console.error(`Error appending execution status to Notion page ${pageId}:`, error.message);
    return { error: error.message };
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
  const dbId = getResolvedDatabaseId(process.env.NOTION_RUN_LOG_DATABASE_ID);

  if (!notion.pages || !dbId) {
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
