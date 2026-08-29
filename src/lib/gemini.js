import { GoogleGenAI } from '@google/genai';

let _ai = null;

function getClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!_ai && key) {
    _ai = new GoogleGenAI({ apiKey: key });
  }
  return _ai;
}

/**
 * Safely parse JSON from LLM output — strips markdown fences, trailing commas, etc.
 */
function safeParseJSON(raw) {
  let text = (raw || '').trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  text = text.replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(text);
}

/**
 * Call Gemini REST API directly with automatic model fallback for 100% resilience.
 */
async function callGeminiGenerate(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not configured in .env.local');

  // Candidate models in order of priority (gemini-3.5-flash is ultra-fast & stable)
  const candidateModels = [
    'gemini-3.5-flash',
    'gemini-flash-lite-latest',
    'gemini-flash-latest',
    'gemini-3.6-flash',
  ];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
        signal: AbortSignal.timeout(12000),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err) {
      lastError = err;
      console.warn(`Model ${model} unavailable (${err.message}). Trying next candidate...`);
    }
  }

  // Also attempt SDK fallback if direct fetch fails
  const client = getClient();
  if (client) {
    try {
      const sdkRes = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
      });
      const text = typeof sdkRes.text === 'function' ? sdkRes.text() : sdkRes.text;
      if (text) return text;
    } catch (sdkErr) {
      lastError = sdkErr;
    }
  }

  throw lastError || new Error('All Gemini model candidates failed');
}

/**
 * Classifies an unstructured student request using Gemini AI.
 * @param {Object} params
 * @param {string} params.rawMessage - The user input or complaint message
 * @param {string} [params.userName] - Student's name if provided
 * @param {string} [params.userEmail] - Student's email if provided
 */
export async function classifyRequest({ rawMessage, userName = '', userEmail = '' }) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in .env.local');
  }

  const safeMessage = (rawMessage || '').slice(0, 10000);
  const safeName = (userName || '').slice(0, 200);
  const safeEmail = (userEmail || '').slice(0, 320);

  const prompt = `You are AutoDesk Engine's AI Classifier for college event student requests.
Analyze the following student ticket:

User Name: "${safeName}"
User Email: "${safeEmail}"
Message: "${safeMessage}"

Analyze and extract the following details in STRICT JSON format:
{
  "title": "Short descriptive title (max 6 words)",
  "category": "One of: CERTIFICATE_ISSUE, DUPLICATE_REGISTRATION, ATTENDANCE_VERIFICATION, CALENDAR_RESCHEDULE, UNCLASSIFIED_DATA",
  "confidence": number between 50 and 99,
  "priority": "One of: LOW, MEDIUM, HIGH, CRITICAL",
  "status": "One of: WAITING_APPROVAL, AUTO_APPROVED, NEEDS_FIX",
  "attendanceVerified": boolean (true if the student attended or can be matched, false if suspicious or unverified),
  "sentiment": "One of: POLITE, FRUSTRATED, URGENT, NEUTRAL",
  "actionPreview": "One of: GENERATE_PDF + EMAIL, DEDUPLICATED, FLAGGED_NOTION, CALENDAR_SYNC, MANUAL_REVIEW",
  "extractedName": "Extracted student name from message or metadata",
  "extractedEmail": "Extracted email if found",
  "reasoning": "Brief explanation (1 sentence) for this classification"
}

Return ONLY valid JSON.`;

  try {
    const rawOutput = await callGeminiGenerate(prompt);
    const parsed = safeParseJSON(rawOutput);

    if (!parsed.category || !parsed.priority) {
      return {
        ...buildFallback({ rawMessage: safeMessage, userName: safeName, userEmail: safeEmail }),
        ...parsed,
      };
    }

    return parsed;
  } catch (error) {
    console.error('Gemini Classification Error:', error.message || error);
    return buildFallback({ rawMessage: safeMessage, userName: safeName, userEmail: safeEmail });
  }
}

/**
 * Deterministic fallback classification when all models are unreachable.
 */
function buildFallback({ rawMessage, userName, userEmail }) {
  const msg = (rawMessage || '').toLowerCase();

  let category = 'UNCLASSIFIED_DATA';
  if (msg.includes('certificate')) category = 'CERTIFICATE_ISSUE';
  else if (msg.includes('duplicate') || msg.includes('twice')) category = 'DUPLICATE_REGISTRATION';
  else if (msg.includes('attendance') || msg.includes('attended')) category = 'ATTENDANCE_VERIFICATION';
  else if (msg.includes('reschedule') || msg.includes('calendar') || msg.includes('shift')) category = 'CALENDAR_RESCHEDULE';

  return {
    title: 'Student Support Request',
    category,
    confidence: 65,
    priority: 'MEDIUM',
    status: 'WAITING_APPROVAL',
    attendanceVerified: false,
    sentiment: 'NEUTRAL',
    actionPreview: 'MANUAL_REVIEW',
    extractedName: userName || 'Student',
    extractedEmail: userEmail || '',
    reasoning: 'Fallback rule-based classification.',
  };
}
