import { Client } from '@notionhq/client';

let _notionClient = null;
let _dataSourceIdCache = new Map();

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
  get dataSources() {
    const client = getNotionClient();
    return client ? client.dataSources : null;
  },
  get blocks() {
    const client = getNotionClient();
    return client ? client.blocks : null;
  },
};

export function getResolvedDatabaseId(customId) {
  const raw = customId || process.env.NOTION_REQUESTS_DATABASE_ID || '3d49e190299680008b7ccea6187e3959';
  const clean = (raw || '').replace(/-/g, '').trim();

  // If the user's old page ID was provided, automatically route to the real database ID
  if (clean === '3c44608064578053bec2c9ce5f1a0f04' || !clean) {
    return '3d49e190-2996-8000-8b7c-cea6187e3959';
  }

  // Format into standard UUID if 32 hex chars
  if (clean.length === 32) {
    return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
  }
  return raw;
}

/**
 * Resolves the underlying Notion data_source_id from a database ID
 * (required in @notionhq/client v5+ where query is on dataSources)
 */
export async function getResolvedDataSourceId(databaseId) {
  const cleanDbId = getResolvedDatabaseId(databaseId);
  if (!cleanDbId) return null;

  if (_dataSourceIdCache.has(cleanDbId)) {
    return _dataSourceIdCache.get(cleanDbId);
  }

  const client = getNotionClient();
  if (!client) return null;

  try {
    const db = await client.databases.retrieve({ database_id: cleanDbId });
    if (db.data_sources && db.data_sources.length > 0) {
      const dsId = db.data_sources[0].id;
      _dataSourceIdCache.set(cleanDbId, dsId);
      return dsId;
    }
  } catch (err) {
    console.warn(`Could not resolve data_source_id for ${cleanDbId}:`, err.message);
  }

  return cleanDbId;
}

/**
 * Maps raw system status to Notion select option
 */
function mapStatusToNotionSelect(status) {
  if (status === 'SUCCESS' || status === 'DISPATCHED') return 'Dispatched';
  if (status === 'APPROVED') return 'Approved';
  if (status === 'REJECTED' || status === 'FAILED') return 'Rejected';
  if (status === 'NEEDS_FIX') return 'Needs Fix';
  if (status === 'DUPLICATE_FILTERED' || status === 'BLOCKED') return 'Duplicate Blocked';
  return 'Waiting Approval';
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
  attendanceVerified = true,
}) {
  const dbId = getResolvedDatabaseId(process.env.NOTION_REQUESTS_DATABASE_ID);

  if (!notion.pages || !dbId) {
    console.warn('Notion API or Requests DB not configured. Skipping Notion write.');
    return { mock: true, id: `NOTION-MOCK-${Date.now()}` };
  }

  const pageTitle = `${userName} — ${title || category}`;
  const notionStatus = mapStatusToNotionSelect(status);

  // Full rich properties set matching the database schema
  const richProperties = {
    Name: {
      title: [
        {
          text: {
            content: pageTitle,
          },
        },
      ],
    },
    'Record Type': {
      select: { name: 'Request' },
    },
    Status: {
      select: { name: notionStatus },
    },
    Category: {
      select: { name: category || 'CERTIFICATE_ISSUE' },
    },
    Priority: {
      select: { name: priority || 'HIGH' },
    },
    'Student Name': {
      rich_text: [
        {
          text: {
            content: (userName || 'Student').slice(0, 200),
          },
        },
      ],
    },
    'Event ID': {
      rich_text: [
        {
          text: {
            content: eventId || 'automate-india-2026',
          },
        },
      ],
    },
    'AI Confidence': {
      number: Math.min(1, Math.max(0, (confidence || 95) / 100)),
    },
    'Attendance Verified': {
      checkbox: Boolean(attendanceVerified),
    },
    'Action Summary': {
      rich_text: [
        {
          text: {
            content: (rawMessage || 'Student Certificate Ingest').slice(0, 2000),
          },
        },
      ],
    },
  };

  // Only attach email property if valid email format
  if (userEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    richProperties['Student Email'] = { email: userEmail };
  }

  const pageChildren = [
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
  ];

  try {
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: richProperties,
      children: pageChildren,
    });

    return response;
  } catch (error) {
    console.error('Error creating rich Notion Request page, trying fallback:', error.message);
    // Fallback: minimal properties if schema mismatch occurs
    try {
      const fallbackResponse = await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
          Name: {
            title: [{ text: { content: pageTitle } }],
          },
        },
        children: pageChildren,
      });
      return fallbackResponse;
    } catch (fallbackError) {
      console.error('Fallback Notion page creation also failed:', fallbackError.message);
      return { error: error.message, mock: true };
    }
  }
}

/**
 * Queries Notion Requests Database for tickets that have been Approved by an Operator.
 * Works seamlessly with both @notionhq/client v5 (dataSources.query) and v2/v1 (databases.query).
 */
export async function queryPendingApprovedRequests(customDbId) {
  const client = getNotionClient();
  const dbId = getResolvedDatabaseId(customDbId || process.env.NOTION_REQUESTS_DATABASE_ID);

  if (!client || !dbId) {
    return { mock: true, results: [] };
  }

  try {
    let queryResponse = null;

    // First attempt @notionhq/client v5+ dataSources query
    const dsId = await getResolvedDataSourceId(dbId);
    if (client.dataSources && dsId) {
      try {
        queryResponse = await client.dataSources.query({
          data_source_id: dsId,
          page_size: 50,
        });
      } catch (dsErr) {
        console.warn('dataSources.query attempt failed, falling back:', dsErr.message);
      }
    }

    // Fallback to databases.query if available
    if (!queryResponse && typeof client.databases?.query === 'function') {
      try {
        queryResponse = await client.databases.query({
          database_id: dbId,
          page_size: 50,
        });
      } catch (dbErr) {
        console.warn('databases.query failed:', dbErr.message);
      }
    }

    const pages = queryResponse?.results || [];
    const pendingApproved = [];

    for (const page of pages) {
      // 1. Check structured Status property (primary HITL mechanism in Notion)
      const statusProp = page.properties?.Status?.select?.name || '';
      const recordType = page.properties?.['Record Type']?.select?.name || '';

      // Skip Run Log entries
      if (recordType === 'Run Log') continue;

      let isApproved = statusProp.toLowerCase() === 'approved';
      let isAlreadyProcessed = statusProp.toLowerCase() === 'dispatched';

      let extractedName = page.properties?.['Student Name']?.rich_text?.[0]?.plain_text || null;
      let extractedEmail = page.properties?.['Student Email']?.email || null;
      let extractedEvent = page.properties?.['Event ID']?.rich_text?.[0]?.plain_text || 'automate-india-2026';

      // Fallback: Check title for student name if not in rich_text
      if (!extractedName && page.properties?.Name?.title?.[0]?.plain_text) {
        const titleText = page.properties.Name.title[0].plain_text;
        const namePart = titleText.split('—')[0]?.trim();
        if (namePart && !namePart.startsWith('📜') && !namePart.startsWith('🚀')) {
          extractedName = namePart;
        }
      }

      // If status property wasn't set to Approved, check block children text as fallback
      if (!isApproved && !isAlreadyProcessed) {
        try {
          const blocks = await client.blocks.children.list({ block_id: page.id });
          for (const block of blocks.results || []) {
            const text = (block.callout?.rich_text || block.paragraph?.rich_text || [])
              .map((t) => t.plain_text || '')
              .join(' ');

            if (text.includes('STATUS: Approved') || text.includes('STATUS: APPROVED')) {
              isApproved = true;
            }
            if (text.includes('DISPATCHED: TRUE') || text.includes('STATUS: SUCCESS') || text.includes('STATUS: Dispatched')) {
              isAlreadyProcessed = true;
            }

            if (!extractedEmail) {
              const emailMatch = text.match(/Email Address:\s*([^\s\n]+)/i);
              if (emailMatch) extractedEmail = emailMatch[1].trim();
            }
            if (!extractedName) {
              const nameMatch = text.match(/Student Name:\s*([^\n]+)/i);
              if (nameMatch) extractedName = nameMatch[1].trim();
            }
            if (!extractedEvent || extractedEvent === 'automate-india-2026') {
              const eventMatch = text.match(/Event ID:\s*([^\s\n]+)/i);
              if (eventMatch) extractedEvent = eventMatch[1].trim();
            }
          }
        } catch (childErr) {
          console.warn(`Error reading blocks for page ${page.id}:`, childErr.message);
        }
      }

      if (isApproved && !isAlreadyProcessed) {
        pendingApproved.push({
          pageId: page.id,
          userName: extractedName || 'Student Participant',
          userEmail: extractedEmail,
          eventId: extractedEvent || 'automate-india-2026',
          url: page.url,
        });
      }
    }

    return { results: pendingApproved, total: pendingApproved.length };
  } catch (error) {
    console.error('Error querying Notion approved requests:', error.message);
    return { error: error.message, results: [] };
  }
}

/**
 * Updates a Notion page with an audit badge and updates its Status property to Dispatched.
 */
export async function updateNotionRequestStatus(pageId, status = 'SUCCESS', notes = '') {
  const client = getNotionClient();
  if (!client || !pageId) {
    return { mock: true };
  }

  const notionStatus = mapStatusToNotionSelect(status);

  // 1. Update the structured Status column in Notion
  try {
    await client.pages.update({
      page_id: pageId,
      properties: {
        Status: {
          select: { name: notionStatus },
        },
      },
    });
  } catch (propErr) {
    console.warn(`Could not update Status property on page ${pageId}:`, propErr.message);
  }

  // 2. Append audit callout block to the page content
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
                  content: `🤖 AUTODESK DAEMON EXECUTION: [STATUS: ${notionStatus.toUpperCase()}] [DISPATCHED: TRUE]\n${notes}\nTimestamp: ${new Date().toISOString()}`,
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
 * Logs an automated run to the Notion Run Log Database with full structured metadata
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
  const notionStatus = status === 'SUCCESS' ? 'Dispatched' : (status === 'BLOCKED' ? 'Duplicate Blocked' : 'Rejected');

  const richProperties = {
    Name: {
      title: [
        {
          text: {
            content: logTitle,
          },
        },
      ],
    },
    'Record Type': {
      select: { name: 'Run Log' },
    },
    Status: {
      select: { name: notionStatus },
    },
    Trigger: {
      rich_text: [
        {
          text: {
            content: trigger || 'AI Pipeline',
          },
        },
      ],
    },
    'Duration (ms)': {
      number: Number(duration) || 0,
    },
    'Action Summary': {
      rich_text: [
        {
          text: {
            content: (action || 'Automated execution cycle').slice(0, 2000),
          },
        },
      ],
    },
  };

  const pageChildren = [
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
  ];

  try {
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: richProperties,
      children: pageChildren,
    });

    return response;
  } catch (error) {
    console.error('Error writing rich Notion Run Log, trying fallback:', error.message);
    try {
      const fallbackResponse = await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
          Name: {
            title: [{ text: { content: logTitle } }],
          },
        },
        children: pageChildren,
      });
      return fallbackResponse;
    } catch (fallbackErr) {
      console.error('Fallback Notion Run Log creation also failed:', fallbackErr.message);
      return { error: error.message, mock: true };
    }
  }
}
