import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

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

  const prompt = `You are AutoDesk Engine's AI Classifier for college event student requests.
Analyze the following student ticket:

User Name: "${userName}"
User Email: "${userEmail}"
Message: "${rawMessage}"

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

Return ONLY valid JSON. Do not include markdown code block formatting like \`\`\`json.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text ? response.text.trim() : '';
    // Clean potential markdown wrap
    const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    console.error('Gemini Classification Error:', error);
    // Fallback classification if model errors
    return {
      title: 'Student Support Request',
      category: rawMessage.toLowerCase().includes('certificate') ? 'CERTIFICATE_ISSUE' : 'UNCLASSIFIED_DATA',
      confidence: 85,
      priority: 'HIGH',
      status: 'WAITING_APPROVAL',
      attendanceVerified: true,
      sentiment: 'NEUTRAL',
      actionPreview: 'GENERATE_PDF + EMAIL',
      extractedName: userName || 'Student',
      extractedEmail: userEmail || '',
      reasoning: 'Fallback classification rule triggered.',
    };
  }
}
