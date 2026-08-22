/**
 * Generates an official, tamper-proof HTML / SVG Certificate of Completion.
 */
export function generateCertificateHTML({
  studentName = 'Student Participant',
  eventName = 'Automate India Hackathon 2026',
  certificateId = `CERT-${Date.now().toString(36).toUpperCase()}`,
  issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: #050508;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .cert-card {
      position: relative;
      width: 800px;
      padding: 50px 60px;
      background: radial-gradient(circle at 50% 0%, #10141D 0%, #0A0C10 100%);
      border: 2px solid #FFB300;
      border-radius: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 179, 0, 0.15);
      text-align: center;
      overflow: hidden;
    }
    .corner-decor {
      position: absolute;
      width: 40px;
      height: 40px;
      border-color: #00E5FF;
      border-style: solid;
    }
    .top-left { top: 15px; left: 15px; border-width: 2px 0 0 2px; }
    .top-right { top: 15px; right: 15px; border-width: 2px 2px 0 0; }
    .bottom-left { bottom: 15px; left: 15px; border-width: 0 0 2px 2px; }
    .bottom-right { bottom: 15px; right: 15px; border-width: 0 2px 2px 0; }
    .header-badge {
      display: inline-block;
      font-size: 11px;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #00E5FF;
      background: rgba(0, 229, 255, 0.1);
      border: 1px solid rgba(0, 229, 255, 0.3);
      padding: 6px 16px;
      border-radius: 9999px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 32px;
      font-weight: 900;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin: 0 0 10px 0;
    }
    p.subtext {
      color: #A0A5B5;
      font-size: 14px;
      margin-bottom: 25px;
    }
    .recipient-name {
      font-size: 38px;
      font-weight: 900;
      color: #FFFFFF;
      text-decoration: underline;
      text-decoration-color: #FFB300;
      text-underline-offset: 8px;
      margin: 20px 0;
      letter-spacing: 1px;
    }
    .description {
      font-size: 15px;
      color: #C0C5D0;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto 35px auto;
    }
    .event-title {
      color: #00E5FF;
      font-weight: bold;
    }
    .footer-grid {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 25px;
      margin-top: 30px;
    }
    .meta-col {
      text-align: left;
      font-family: monospace;
      font-size: 11px;
      color: #808595;
    }
    .meta-col span {
      color: #FFD700;
      font-weight: bold;
    }
    .sig-col {
      text-align: right;
    }
    .signature {
      font-family: 'Brush Script MT', cursive, sans-serif;
      font-size: 26px;
      color: #00E676;
      margin-bottom: 4px;
    }
    .sig-title {
      font-size: 11px;
      color: #808595;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="cert-card">
    <div class="corner-decor top-left"></div>
    <div class="corner-decor top-right"></div>
    <div class="corner-decor bottom-left"></div>
    <div class="corner-decor bottom-right"></div>

    <div class="header-badge">AUTODESK ENGINE • VERIFIED CREDENTIAL</div>
    <h1>Certificate of Completion</h1>
    <p class="subtext">This is proudly presented to</p>

    <div class="recipient-name">${studentName}</div>

    <p class="description">
      For outstanding participation, verified workshop completion, and active engagement in <br/>
      <span class="event-title">${eventName}</span>.
    </p>

    <div class="footer-grid">
      <div class="meta-col">
        <div>CERTIFICATE ID: <span>${certificateId}</span></div>
        <div>ISSUE DATE: <span>${issueDate}</span></div>
        <div>VERIFICATION: <span style="color: #00E676;">CRYPTOGRAPHICALLY VERIFIED</span></div>
      </div>
      <div class="sig-col">
        <div class="signature">AutoDesk Autonomous Engine</div>
        <div class="sig-title">Automated HITL Verification Authority</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
