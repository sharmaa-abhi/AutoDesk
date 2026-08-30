# ⚡ AutoDesk Engine

> **"Kill One Boring Job. Completely."**  
> An autonomous, Human-in-the-Loop backend service built for the **Notion Track Hackathon**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Notion API](https://img.shields.io/badge/Notion_API-v5.26-000000?style=for-the-badge&logo=notion)](https://developers.notion.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.18-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Resend](https://img.shields.io/badge/Resend-v6.22-black?style=for-the-badge&logo=resend)](https://resend.com/)

---

## 🎯 The Problem in 10 Seconds

Every college, club, and student organization in India loses hours every week to one painful routine:
- ❌ Students spamming WhatsApp/forms: *"Sir, certificate nahi mila!"*
- ❌ Organizers manually verifying attendance sheets row by row.
- ❌ Retyping names into Canva/PowerPoint to export PDFs.
- ❌ Mailing certificates one by one and losing track of duplicates.

---

## 💡 The Solution: How AutoDesk Engine Works

AutoDesk Engine replaces that entire chaotic manual cycle with an **autonomous 5-stage pipeline**:

```
 1. 📥 INGEST       2. 🧠 CLASSIFY       3. 🙋 APPROVE        4. 🚀 EXECUTE       5. 📜 AUDIT
 ─────────────      ──────────────      ─────────────        ─────────────       ───────────
 User submits  ───► Backend checks ───► Notion Control  ───► Real-World    ───► Automated
 form/webhook       dedup & AI parses    Queue (HITL)         PDF + Email         Run Log
```

### 🔁 Step-by-Step Flow:

1. **⚡ Trigger & Ingestion**: Form submission or webhook arrives at [`POST /api/pipeline`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/pipeline/route.js).
2. **🛡️ Data Sanitization & Deduplication**: Inputs are cleaned; MD5 hash prevents double-submissions within 24h.
3. **🧠 AI Intelligence (Gemini)**: Extracts student intent, urgency, and matches against verified attendance.
4. **🔀 Smart Routing**:
   - **Low-Risk Requests** (*Verified attendance*) ➔ **Auto-Executes instantly**.
   - **High-Risk / Edge Cases** (*Missing attendance / Malformed name*) ➔ **Pushed to Notion Human Queue** for 1-click `Approve` / `Reject`.
5. **🚀 Real-World Action**: HTML template engine generates a styled, signed certificate and sends it via Email (Resend / Gmail SMTP).
6. **📜 Tamper-Proof Audit**: Every single run is written automatically to the **Notion Run Log** with real timestamps and execution metrics.

### 🌟 Current Feature Set

- **Live Request Intake**: Submit ticket modal on the landing page and direct webhook endpoint `POST /api/pipeline`.
- **Gemini AI Classification**: Multi-model fallback cascade (`gemini-flash-lite-latest`, `gemini-flash-latest`, `gemini-2.5-flash`, `gemini-3.5-flash`) with deterministic JSON parsing fallback.
- **24-Hour MD5 Deduplication**: Filters identical email/complaint spam within a rolling 24-hour TTL window.
- **Smart HITL Routing**: Auto-dispatches verified high-confidence requests while queueing edge cases for human review.
- **Live Tactical Cockpit**: 3-column operator dashboard for inspecting incidents, payload schemas, approval actions, event filters, and SLA telemetry.
- **Dynamic HTML/SVG Certificate Engine**: Renders high-fidelity verifiable certificates with unique cryptographic IDs and timestamped signatures.
- **Universal Email Dispatcher**: Dual-layer transactional mailer utilizing Resend API with seamless failover to authenticated Gmail SMTP.
- **Notion SDK Operations**: Automated database synchronization with mock mode fallback when keys are absent.

---

## 🏆 Why This Wins the Notion Track ("The Repo Deletion Test")

> 🔪 **The Test:** If you delete this GitHub repository, does the system still work?  
> - **If Yes:** It was just a no-code Zapier/Make wrapper (0 marks).  
> - **If No:** **Your custom backend code is the true brain.** Notion serves as the operator's cockpit & audit trail (Full marks).

- ✅ **Real Backend Logic**: Custom validation, fingerprint hashing, Gemini NLP extraction, and certificate generation.
- ✅ **Operator Cockpit**: Organizers never touch code or raw databases — they manage everything via Notion.
- ✅ **Complete Loop**: From messy student input to a verified certificate in their inbox + proof in the Run Log.

---

## 🖥️ Live Simulator & Frontend Pages

This repo includes a Next.js web experience designed with the **Clean Modern Developer-Tool** design system:

| Route | Page | Purpose |
|:------|:-----|:--------|
| [`/`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/page.js) | **🏠 Landing Page** | Product overview, interactive pipeline flow, live stats, and a **Submit Live Ticket** modal. |
| [`/dashboard`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/dashboard/page.js) | **🎛️ Live Tactical Cockpit** | Interactive operator simulator for webhook payloads, ticket inspection, and approve/reject actions. |
| [`/about`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/about/page.js) | **👥 About & Team** | Team background, system architecture philosophy, and technology stack. |

> 💡 **Submit Ticket Modal**: Available from both the **Navbar** and the **Hero section CTA** on any page. Students can type a raw complaint, and the system runs the full pipeline live — Gemini AI classification → Notion DB write → certificate generation → email dispatch.

---

## 🚀 Quick Start (Run Locally in 60s)

```bash
# 1. Clone the repository
git clone https://github.com/sharmaa-abhi/Notion.AI.git
cd Notion.AI

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Copy the backend example and fill in your API keys:
cp .env.backend.example .env.local
# Required keys: NOTION_API_KEY, NOTION_REQUESTS_DATABASE_ID,
#   NOTION_RUN_LOG_DATABASE_ID, GEMINI_API_KEY
# Plus either RESEND_API_KEY or SMTP_USER + SMTP_PASS for email

# 4. Start development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## 🎨 Design System Tokens

Built with a high-contrast modern developer-tool aesthetic:

| Token | Hex / Value | Usage |
|:------|:------------|:------|
| `--bg-canvas` | `#f7f6f2` | Warm off-white / light beige canvas |
| `--bg-panel` | `#ffffff` | Pure white container panels |
| `--bg-panel-elevated` | `#fcfbfa` | Floating bento cards & modals |
| `--border-charcoal` | `#18181b` | 2px–3px dark charcoal structured borders |
| `--accent-red` | `#dc2626` | Primary action buttons & critical flags |
| `--accent-emerald` | `#059669` | Verified attendance & success status |
| `--accent-amber` | `#d97706` | Warnings & Human Review queue indicators |
| `--text-primary` | `#18181b` | Primary dark charcoal typography |
| `--text-secondary` | `#52525b` | Muted slate secondary text |

---

## 📖 In-Depth Documentation Index

All deep architectural diagrams, specs, and hackathon rules are documented in the [`docs/`](docs/) directory:

- [docs/WORKFLOW_AUDIT_MASTER.md](docs/WORKFLOW_AUDIT_MASTER.md) — 📋 Master end-to-end technical & operational audit of all 9 workflows.
- [docs/AUDIT_PIPELINE_STAGES.md](docs/AUDIT_PIPELINE_STAGES.md) — 🔬 Deep-dive stage-by-stage payload schemas, latency benchmarks & trace matrix.
- [docs/SECURITY_AND_COMPLIANCE_AUDIT.md](docs/SECURITY_AND_COMPLIANCE_AUDIT.md) — 🔒 Security posture, MD5 dedup, bot token authenticity & "Repo Deletion Test" audit.
- [docs/AUDIT_LOG_SPECIFICATION.md](docs/AUDIT_LOG_SPECIFICATION.md) — 📜 Notion Run Log telemetry specifications, schema catalog & verification standards.
- [docs/FLOWCHARTS.md](docs/FLOWCHARTS.md) — Complete visual Mermaid architecture diagrams for every state machine.
- [docs/NOTION_TRACK_GUIDE.md](docs/NOTION_TRACK_GUIDE.md) — Comprehensive guide on Notion Track rules & evaluation criteria.
- [docs/COLOR_SYSTEM.md](docs/COLOR_SYSTEM.md) — Complete UI color ramps, contrast tokens, and CSS variables.
- [docs/DESIGN_LAYOUT.md](docs/DESIGN_LAYOUT.md) — Multi-pane wireframes and design specifications.
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) — Frontend build roadmap and component structure.
- [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) — 🎬 Official hackathon demo presentation script and recording guide.
- [docs/BUG_REPORT.md](docs/BUG_REPORT.md) — 🐞 Comprehensive bug audit, test resolutions, and verification evidence.
- [docs/ROADMAP.md](docs/ROADMAP.md) — 🗺️ Product milestones, architecture phases, and planned features.
- [docs/Notion_Track_Complete_Conversation.md](docs/Notion_Track_Complete_Conversation.md) — Full problem breakdown transcript & ideation notes.

---

## 👥 Team

- [**Abhishek Sharma**](https://www.linkedin.com/in/abhishek-sharma-88876b389/) — *Full-Stack Developer & System Architect*
- [**Akash Gautam**](https://www.linkedin.com/in/akash-gautam-07664230a/) — *Full-Stack Developer & AI Systems Engineer*

---

## 📜 License & Hackathon Credit

Built with 🔥 for **Automate India 2026** (Notion Track).
