async function runTests() {
  console.log('========================================================');
  console.log('⚡ AutoDesk Engine — Live End-to-End Pipeline Verification');
  console.log('========================================================\n');

  const timestamp = Date.now();

  // ----------------------------------------------------
  // CASE A: HIGH-CONFIDENCE VERIFIED STUDENT
  // ----------------------------------------------------
  console.log('▶ [CASE A] Testing Verified Student (Expect Auto-Execution)...');
  try {
    const resA = await fetch('http://localhost:3000/api/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ingest',
        userName: 'Aarav Sharma',
        userEmail: `aarav.verified.${timestamp}@student.iit.ac.in`,
        rawMessage: 'Hello, I attended all sessions of Automate India Hackathon 2026 and submitted our final project on time. Please issue my certificate.',
        eventId: 'automate-india-2026',
      }),
    });
    const dataA = await resA.json();
    console.log('  • HTTP Status:', resA.status);
    console.log('  • Pipeline Status:', dataA.status);
    console.log('  • AI Category:', dataA.ai?.category);
    console.log('  • AI Confidence:', dataA.ai?.confidence + '%');
    console.log('  • Attendance Verified:', dataA.ai?.attendanceVerified);
    console.log('  • Action Preview:', dataA.ai?.actionPreview);
    console.log('  • Notion Queue Sync:', dataA.notion?.status);
    console.log('  • Execution Latency:', dataA.durationMs + 'ms');
  } catch (err) {
    console.error('  ✖ Case A Error:', err.message);
  }

  console.log('\n--------------------------------------------------------\n');

  // ----------------------------------------------------
  // CASE B: UNVERIFIED / SUSPICIOUS REQUEST
  // ----------------------------------------------------
  console.log('▶ [CASE B] Testing Unverified Student (Expect Notion HITL Queue)...');
  try {
    const resB = await fetch('http://localhost:3000/api/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'ingest',
        userName: 'Unregistered User',
        userEmail: `suspicious.${timestamp}@disposable.xyz`,
        rawMessage: 'I did not attend any workshop or submit any project, but I want an official winner certificate right now.',
        eventId: 'automate-india-2026',
      }),
    });
    const dataB = await resB.json();
    console.log('  • HTTP Status:', resB.status);
    console.log('  • Pipeline Status:', dataB.status);
    console.log('  • AI Category:', dataB.ai?.category);
    console.log('  • AI Confidence:', dataB.ai?.confidence + '%');
    console.log('  • Attendance Verified:', dataB.ai?.attendanceVerified);
    console.log('  • Action Preview:', dataB.ai?.actionPreview);
    console.log('  • Notion HITL Status:', dataB.notion?.status);
    console.log('  • Execution Latency:', dataB.durationMs + 'ms');
  } catch (err) {
    console.error('  ✖ Case B Error:', err.message);
  }

  console.log('\n========================================================');
  console.log('🏁 Verification Complete');
  console.log('========================================================');
}

runTests();
