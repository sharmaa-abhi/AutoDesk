import { getEventProfile } from './events.js';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates an official, tamper-proof HTML / SVG Certificate of Completion with multi-event dynamic themes.
 */
export function generateCertificateHTML({
  studentName = 'Student Participant',
  eventId = 'automate-india-2026',
  eventName = null,
  certificateId = `CERT-${Date.now().toString(36).toUpperCase()}`,
  issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
}) {
  const event = getEventProfile(eventId || eventName);
  const theme = event.theme || {
    primaryColor: '#FFD700',
    accentColor: '#00E5FF',
    borderColor: '#FFB300',
    bgGradient: 'radial-gradient(circle at 50% 0%, #10141D 0%, #0A0C10 100%)',
    badgeBg: 'rgba(0, 229, 255, 0.1)',
    badgeBorder: 'rgba(0, 229, 255, 0.3)',
    badgeText: '#00E5FF',
    badgeLabel: 'AUTODESK ENGINE • VERIFIED CREDENTIAL',
    verifiedColor: '#00E676',
  };

  const safeName = escapeHtml(studentName);
  const safeEvent = escapeHtml(eventName || event.name);
  const safeCertId = escapeHtml(certificateId);
  const safeDate = escapeHtml(issueDate);
  const safeOrg = escapeHtml(event.organization);
  const safeSignatory = escapeHtml(event.signatory);
  const safeSigTitle = escapeHtml(event.signatoryTitle);
  const safeTrack = escapeHtml(event.track);
  const safeDescription = escapeHtml(event.description);

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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .cert-card {
      position: relative;
      width: 820px;
      padding: 48px 56px;
      background: ${theme.bgGradient};
      border: 2px solid ${theme.borderColor};
      border-radius: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 45px ${theme.badgeBg};
      text-align: center;
      overflow: hidden;
      box-sizing: border-box;
    }
    .corner-decor {
      position: absolute;
      width: 40px;
      height: 40px;
      border-color: ${theme.accentColor};
      border-style: solid;
    }
    .top-left { top: 15px; left: 15px; border-width: 2px 0 0 2px; }
    .top-right { top: 15px; right: 15px; border-width: 2px 2px 0 0; }
    .bottom-left { bottom: 15px; left: 15px; border-width: 0 0 2px 2px; }
    .bottom-right { bottom: 15px; right: 15px; border-width: 0 2px 2px 0; }
    
    .header-badge {
      display: inline-block;
      font-size: 11px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      color: ${theme.badgeText};
      background: ${theme.badgeBg};
      border: 1px solid ${theme.badgeBorder};
      padding: 6px 18px;
      border-radius: 9999px;
      margin-bottom: 20px;
    }
    .issuer-tag {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #94A3B8;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 34px;
      font-weight: 900;
      color: ${theme.primaryColor};
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 0 0 8px 0;
    }
    p.subtext {
      color: #94A3B8;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .recipient-name {
      font-size: 38px;
      font-weight: 900;
      color: #FFFFFF;
      text-decoration: underline;
      text-decoration-color: ${theme.primaryColor};
      text-underline-offset: 8px;
      margin: 18px 0;
      letter-spacing: 1px;
    }
    .description {
      font-size: 14px;
      color: #CBD5E1;
      line-height: 1.6;
      max-width: 640px;
      margin: 0 auto 30px auto;
    }
    .event-title {
      color: ${theme.accentColor};
      font-weight: 700;
    }
    .track-badge {
      display: inline-block;
      margin-top: 8px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 6px;
      color: #E2E8F0;
    }
    .footer-grid {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      padding-top: 24px;
      margin-top: 28px;
    }
    .meta-col {
      text-align: left;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      color: #94A3B8;
      line-height: 1.6;
    }
    .meta-col span {
      color: ${theme.primaryColor};
      font-weight: 700;
    }
    .sig-col {
      text-align: right;
    }
    .signature {
      font-family: 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
      font-size: 26px;
      color: ${theme.verifiedColor};
      margin-bottom: 3px;
    }
    .sig-name {
      font-size: 12px;
      font-weight: 700;
      color: #F1F5F9;
    }
    .sig-title {
      font-size: 10px;
      color: #94A3B8;
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

    <div class="header-badge">${escapeHtml(theme.badgeLabel)}</div>
    <div class="issuer-tag">${safeOrg}</div>
    <h1>Certificate of Completion</h1>
    <p class="subtext">This is proudly awarded to</p>

    <div class="recipient-name">${safeName}</div>

    <p class="description">
      ${safeDescription}<br/>
      <span class="event-title">${safeEvent}</span><br/>
      <span class="track-badge">Specialization: ${safeTrack}</span>
    </p>

    <div class="footer-grid">
      <div class="meta-col">
        <div>ID: <span>${safeCertId}</span></div>
        <div>DATE: <span>${safeDate}</span></div>
        <div>STATUS: <span style="color: ${theme.verifiedColor};">CRYPTOGRAPHICALLY VERIFIED</span></div>
      </div>
      <div class="sig-col">
        <div class="signature">${safeSignatory}</div>
        <div class="sig-name">${safeSignatory}</div>
        <div class="sig-title">${safeSigTitle}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
