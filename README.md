# ⚡ AutoDesk Engine

> **"Kill One Boring Job. Completely."**  
> An autonomous, Human-in-the-Loop backend service built for the **Notion Track Hackathon**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Notion API](https://img.shields.io/badge/Notion_API-Integrated-000000?style=for-the-badge&logo=notion)](https://developers.notion.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI_Engine-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

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

1. **⚡ Trigger & Ingestion**: Form submission or webhook arrives at your deployed backend.
2. **🛡️ Data Sanitization & Deduplication**: Inputs are cleaned; MD5 hash prevents double-submissions within 24h.
3. **🧠 AI Intelligence (Gemini)**: Extracts student intent, urgency, and matches against verified attendance.
4. **🔀 Smart Routing**:
   - **Low-Risk Requests** (*Verified attendance*) ➔ **Auto-Executes instantly**.
   - **High-Risk / Edge Cases** (*Missing attendance / Malformed name*) ➔ **Pushed to Notion Human Queue** for 1-click `Approve` / `Reject`.
5. **🚀 Real-World Action**: Puppeteer generates a tamper-proof signed PDF certificate and sends it via Email (SMTP/Resend).
6. **📜 Tamper-Proof Audit**: Every single run is written automatically to the **Notion Run Log** with real timestamps and execution metrics.

---

## 🏆 Why This Wins the Notion Track ("The Repo Deletion Test")

> 🔪 **The Test:** If you delete this GitHub repository, does the system still work?  
> - **If Yes:** It was just a no-code Zapier/Make wrapper (0 marks).  
> - **If No:** **Your custom backend code is the true brain.** Notion serves as the operator's cockpit & audit trail (Full marks).

- ✅ **Real Backend Logic**: Custom validation, fingerprint hashing, and PDF generation.
- ✅ **Operator Cockpit**: Organizers never touch code or raw databases — they manage everything via Notion.
- ✅ **Complete Loop**: From messy student input to a verified certificate in their inbox + proof in the Run Log.

---

## 🖥️ Live Simulator & Frontend Pages

This repo includes a Next.js web experience designed with the **Deep OLED Void / Pitch Black** design system:

| Route | Page | Purpose |
|:------|:-----|:--------|
| [`/`](file:///src/app/page.js) | **🏠 Landing Page** | High-impact product overview, bento features, interactive pipeline flowchart, and real-time stats. |
| [`/dashboard`](file:///src/app/dashboard/page.js) | **🎛️ Live Tactical Cockpit** | Interactive simulator where you can test webhooks, trigger garbage payloads, and approve/reject requests in real time. |
| [`/about`](file:///src/app/about/page.js) | **👥 About & Team** | Team background, system architecture philosophy, and technology stack. |

---

## 🚀 Quick Start (Run Locally in 60s)

```bash
# 1. Clone the repository
git clone https://github.com/sharmaa-abhi/Notion.AI.git
cd Notion.AI

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## 🎨 Design System Tokens (Deep OLED Void)

Built with a high-contrast mathematical dark theme:

| Token | Hex / Value | Usage |
|:------|:------------|:------|
| `--bg-canvas` | `#050508` | True Pitch Black Void background |
| `--bg-panel` | `#0A0C10` | Obsidian Matte container panels |
| `--bg-panel-elevated` | `#10141D` | Floating bento cards & modals |
| `--accent-cyan` | `#00E5FF` | Primary actions & baseline flow |
| `--accent-amber` | `#FFB300` | Warnings & Human Review flags |
| `--accent-crimson` | `#FF2A55` | Critical alerts & action buttons |
| `--accent-emerald` | `#00E676` | Verified attendance & success |
| `--text-gold` | `#FFD700` | Primary glow headings & accents |

---

## 📖 In-Depth Documentation Index

All deep architectural diagrams, specs, and hackathon rules are documented in the [`docs/`](docs/) directory:

- [docs/FLOWCHARTS.md](docs/FLOWCHARTS.md) — Complete visual Mermaid architecture diagrams for every state machine.
- [docs/NOTION_TRACK_GUIDE.md](docs/NOTION_TRACK_GUIDE.md) — Comprehensive guide on Notion Track rules & evaluation criteria.
- [docs/COLOR_SYSTEM.md](docs/COLOR_SYSTEM.md) — Complete UI color ramps, contrast tokens, and CSS variables.
- [docs/DESIGN_LAYOUT.md](docs/DESIGN_LAYOUT.md) — Multi-pane wireframes and design specifications.
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) — Frontend build roadmap and component structure.
- [docs/Notion_Track_Complete_Conversation.md](docs/Notion_Track_Complete_Conversation.md) — Full problem breakdown transcript & ideation notes.

---

## 👥 Team

- [**Abhishek Sharma**](https://www.linkedin.com/in/abhishek-sharma-88876b389/) — *Full-Stack Developer & System Architect*
- [**Akash Gautam**](https://www.linkedin.com/in/akash-gautam-07664230a/) — *Full-Stack Developer & AI Systems Engineer*

---

## 📜 License & Hackathon Credit

Built with 🔥 for **Automate India 2026** (Notion Track).
