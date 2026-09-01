import { Resend } from 'resend';

// BUG-V2-004 FIX: Lazy singleton — re-evaluates env var on first call after cold start
let _resendClient = null;

function getResendClient() {
  if (_resendClient) return _resendClient;
  const key = process.env.RESEND_API_KEY;
  if (key && !key.includes('xxxxxxxxx')) {
    _resendClient = new Resend(key);
  }
  return _resendClient;
}

// Lazy getter — callers should use getResendClient() or this accessor
// to avoid evaluating env vars at module parse time.
export function getResend() {
  return getResendClient();
}

function ensureClient() {
  const client = getResendClient();
  if (!client) {
    throw new Error('RESEND_API_KEY is not configured in .env.local. Please add your Resend API Key (starts with re_).');
  }
  return client;
}

/**
 * 1. Send Single Email
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = 'AutoDesk Engine <onboarding@resend.dev>',
  attachments = [],
  scheduledAt,
}) {
  const client = ensureClient();
  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };

  if (attachments && attachments.length > 0) {
    payload.attachments = attachments;
  }

  if (scheduledAt) {
    payload.scheduledAt = scheduledAt;
  }

  return await client.emails.send(payload);
}

/**
 * 2. Send Batch Emails (for Bulk Certificate / Notification dispatch)
 * @param {Array<Object>} emailList
 */
export async function sendBatchEmails(emailList) {
  const client = ensureClient();
  const formattedList = emailList.map((item) => ({
    from: item.from || 'AutoDesk Engine <onboarding@resend.dev>',
    to: Array.isArray(item.to) ? item.to : [item.to],
    subject: item.subject,
    html: item.html,
    ...(item.attachments ? { attachments: item.attachments } : {}),
  }));

  return await client.batch.send(formattedList);
}

/**
 * 3. Retrieve Email by ID
 * @param {string} id
 */
export async function getEmail(id) {
  const client = ensureClient();
  return await client.emails.get(id);
}

/**
 * 4. Reschedule / Update an Email
 * @param {Object} options
 * @param {string} options.id
 * @param {string} options.scheduledAt - ISO timestamp string
 */
export async function updateEmail({ id, scheduledAt }) {
  const client = ensureClient();
  return await client.emails.update({
    id,
    scheduledAt,
  });
}

/**
 * 5. Cancel a Scheduled Email
 * @param {string} id
 */
export async function cancelEmail(id) {
  const client = ensureClient();
  return await client.emails.cancel(id);
}

/**
 * 6. Share an Email (generate public web view link)
 * @param {string} id
 */
export async function shareEmail(id) {
  const client = ensureClient();
  return await client.emails.share(id);
}

/**
 * 7. List Recent Sent Emails
 */
export async function listEmails() {
  const client = ensureClient();
  return await client.emails.list();
}

/**
 * 8. List Email Attachments
 * @param {Object} options
 * @param {string} options.emailId
 */
export async function listAttachments({ emailId }) {
  const client = ensureClient();
  return await client.emails.attachments.list({ emailId });
}

/**
 * 9. Get Specific Email Attachment
 * @param {Object} options
 * @param {string} options.id
 * @param {string} options.emailId
 */
export async function getAttachment({ id, emailId }) {
  const client = ensureClient();
  return await client.emails.attachments.get({ id, emailId });
}

/**
 * 10. Get Email Metrics / Analytics
 * @param {Object} options
 */
export async function getEmailMetrics(options = {}) {
  const client = ensureClient();
  return await client.emails.metrics(options);
}

/**
 * 11. Create API Key
 * @param {Object} options
 * @param {string} options.name - The name of the API key
 * @param {'full_access' | 'sending_access'} [options.permission]
 * @param {string} [options.domainId]
 */
export async function createApiKey({ name = 'Production', permission, domainId } = {}) {
  const client = ensureClient();
  const payload = { name };
  if (permission) payload.permission = permission;
  if (domainId) payload.domain_id = domainId;
  return await client.apiKeys.create(payload);
}

/**
 * 12. List API Keys
 * @param {Object} [options]
 */
export async function listApiKeys(options = {}) {
  const client = ensureClient();
  return await client.apiKeys.list(options);
}

/**
 * 13. Update API Key
 * @param {string} id - The API key ID
 * @param {Object} payload
 * @param {string} payload.name - The new name of the API key
 */
export async function updateApiKey(id, { name } = {}) {
  const client = ensureClient();
  return await client.apiKeys.update(id, { name });
}

/**
 * 14. Remove API Key
 * @param {string} id - The API key ID
 */
export async function removeApiKey(id) {
  const client = ensureClient();
  return await client.apiKeys.remove(id);
}

/**
 * 15. Retrieve a Specific Log
 * @param {string} id - The Log ID
 */
export async function getLog(id) {
  const client = ensureClient();
  return await client.logs.get(id);
}

/**
 * 16. List Logs
 * @param {Object} [options]
 */
export async function listLogs(options = {}) {
  const client = ensureClient();
  return await client.logs.list(options);
}
