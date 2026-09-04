async function runTests() {
  console.log('====================================');
  console.log('🧪 AutoDesk Engine Pipeline Test');
  console.log('====================================\n');

  // Case A: High-Confidence Verified Student
  console.log('--- TEST CASE A: Verified Student (Auto-Execute) ---');
  try {
    const resA = await fetch('http://localhost:3000/api/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ingest',
        userName: 'Aarav Sharma',
        userEmail: 'aarav.sharma.test@gmail.com',
        rawMessage: 'Hello, I attended all sessions of Automate India Hackathon 2026 and submitted our final project. Please issue my certificate.',
        eventId: 'automate-india-2026',
      }),
    });
    const dataA = await resA.json();
    console.log('Status Code:', resA.status);
    console.log('Pipeline Result:', JSON.stringify(dataA, null, 2));
  } catch (err) {
    console.error('Case A Error:', err.message);
  }

  console.log('\n----------------------------------------------------\n');

  // Case B: Unverified / Suspicious Request (HITL Review)
  console.log('--- TEST CASE B: Unverified Request (HITL Notion Queue) ---');
  try {
    const resB = await fetch('http://localhost:3000/api/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ingest',
        userName: 'Unknown Person',
        userEmail: 'random_unverified_user@tempmail.xyz',
        rawMessage: 'I never registered or attended this event, but can you give me a certificate anyway?',
        eventId: 'automate-india-2026',
      }),
    });
    const dataB = await resB.json();
    console.log('Status Code:', resB.status);
    console.log('Pipeline Result:', JSON.stringify(dataB, null, 2));
  } catch (err) {
    console.error('Case B Error:', err.message);
  }

  console.log('\n====================================');
  console.log('🏁 Tests Completed');
  console.log('====================================');
}

runTests();
