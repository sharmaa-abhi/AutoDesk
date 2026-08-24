# AutoDesk Engine — Full-Stack Implementation Plan

Build a stunning, production-grade full-stack application for **AutoDesk Engine** — a college event certificate request automation system. Three pages: **Home (Landing)** + **Dashboard (Live Simulator)** + **About/Team**. Fully functional backend with Gemini AI, Notion SDK, and Email dispatch.

## Tech Stack
- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Google Gemini AI** (`@google/genai` — `gemini-3.6-flash`)
- **Notion SDK** (`@notionhq/client` v5.26)
- **Resend** (`resend` v6.22) + **Nodemailer** (Gmail SMTP fallback)

## Design System (from DESIGN_LAYOUT.md & globals.css)
- Dark theme (Deep OLED Void): `#050508` canvas, `#0A0C10` panels, `#10141D` elevated
- Accents: Cyan `#00E5FF`, Amber `#FFB300`, Crimson `#FF2A55`, Emerald `#00E676`, Violet `#7C4DFF`, Orange `#FF6E40`
- Text: Gold `#FFD700` (primary), White `#F3F4F6`, Secondary `#8B949E`, Muted `#545D68`
- Fonts: Inter (sans) + JetBrains Mono (mono)
- Glassmorphism overlays, dot-matrix grid background
- Motion: smooth scroll reveals, hover lifts, floating orbs, shimmer effects

---

## Project Structure (Actual)

```
New folder/
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
├── jsconfig.json
├── .env.local                  ← Runtime secrets (Notion, Gemini, Resend, SMTP keys)
├── .env.example                ← Frontend env template
├── .env.backend.example        ← Backend env template
├── docs/                       ← Architecture docs, flowcharts, audit files
├── public/
├── src/
│   ├── app/
│   │   ├── layout.js           ← Root layout, fonts, metadata
│   │   ├── page.js             ← Home landing page
│   │   ├── globals.css         ← Tailwind v4 + custom CSS design tokens
│   │   ├── about/
│   │   │   └── page.js         ← About/Team page
│   │   ├── dashboard/
│   │   │   └── page.js         ← Live Tactical Cockpit simulator
│   │   └── api/
│   │       ├── pipeline/
│   │       │   └── route.js    ← 🔥 Core pipeline: ingest / approve / reject
│   │       ├── classify/
│   │       │   └── route.js    ← Standalone Gemini AI classification endpoint
│   │       ├── send-email/
│   │       │   └── route.js    ← Full Resend email API (send/batch/get/list)
│   │       └── notion-test/
│   │           └── route.js    ← Notion database connection verification
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Features.jsx
│   │   ├── Architecture.jsx
│   │   ├── StatsStrip.jsx
│   │   ├── Footer.jsx
│   │   ├── TeamCard.jsx
│   │   ├── TechStack.jsx
│   │   ├── SubmitRequestModal.jsx   ← Interactive form modal (triggers pipeline)
│   │   └── dashboard/               ← Dashboard sub-components
│   └── lib/
│       ├── gemini.js            ← Gemini AI classification engine
│       ├── notion.js            ← Notion SDK: createNotionRequest + logRunToNotion
│       ├── certificate.js       ← HTML certificate template generator
│       ├── mailer.js            ← Universal email dispatcher (Resend → SMTP fallback)
│       └── resend.js            ← Full Resend SDK wrapper (send/batch/get/update/list)
```

---

## Frontend Pages

### Page 1: Home / Landing Page (`/`)
Sections in order:
1. **Navbar** — Logo + nav links (Home, Dashboard, About) + "Submit Request" CTA button
2. **Hero Section** — Big bold headline "Kill One Boring Job. Completely." + animated gradient orbs
3. **Stats Strip** — Live counters: Requests Processed, Uptime, Certificates Sent, Response Time
4. **How It Works** — 5-stage pipeline flow with icons (Ingest → Classify → Approve → Execute → Audit)
5. **Features Grid** — Bento-style cards for AI Classification, HITL, Real-World Actions, Tamper-Proof Logs
6. **Architecture Diagram** — Visual system flow showing the full pipeline
7. **Footer** — Project name, hackathon credit, team links

### Page 2: Live Tactical Cockpit (`/dashboard`)
1. **Interactive Simulator** — Test webhooks, trigger garbage payloads, approve/reject requests in real time
2. **Live Pipeline Execution** — Calls `/api/pipeline` with real Gemini AI + Notion + Email dispatch
3. **Stage-by-Stage Visualization** — Shows each pipeline stage result in sequence

### Page 3: About / Team (`/about`)
1. **Team Cards** — Glassmorphism cards for Abhishek Sharma & Akash Gautam
2. **Tech Stack Section** — Visual grid of technologies used
3. **Footer** — Same as Home

---

## Backend API Endpoints

| Endpoint | Method | Actions | Description |
|:---------|:-------|:--------|:------------|
| `/api/pipeline` | `POST` | `ingest`, `approve`, `reject` | Core 5-stage pipeline: sanitize → classify → route → execute → log |
| `/api/classify` | `POST` | — | Standalone Gemini AI text classification |
| `/api/send-email` | `GET` | — | List sent emails via Resend |
| `/api/send-email` | `POST` | `send`, `batch`, `get`, `update`, `list`, `listAttachments`, `getAttachment` | Full Resend email operations |
| `/api/notion-test` | `GET` | — | Notion database connection verification test |

---

## Environment Variables Required

| Variable | Required | Provider |
|:---------|:---------|:---------|
| `NOTION_API_KEY` | ✅ | Notion Integrations |
| `NOTION_REQUESTS_DATABASE_ID` | ✅ | Notion Database |
| `NOTION_RUN_LOG_DATABASE_ID` | ✅ | Notion Database |
| `GEMINI_API_KEY` | ✅ | Google AI Studio |
| `RESEND_API_KEY` | ⚡ Either this | Resend.com |
| `SMTP_USER` + `SMTP_PASS` | ⚡ Or these | Gmail App Password |

---

## Verification Plan

### Automated Verification
- `npm run build` — Verify Next.js production build passes
- `npm run lint` — Verify ESLint passes

### Manual Verification
- Run `npm run dev` and verify all 3 pages render correctly
- Test `/api/pipeline` with `action: "ingest"` → verify Gemini AI classification + Notion write + Email send
- Test `/api/pipeline` with `action: "approve"` → verify certificate generation + email dispatch
- Test `/api/pipeline` with `action: "reject"` → verify rejection run log entry
- Test `/api/notion-test` → verify Notion database connection
- Test duplicate submission within 24h → verify MD5 deduplication blocks it
- Confirm dark theme colors match the design system
- Verify all Framer Motion animations work on landing page
