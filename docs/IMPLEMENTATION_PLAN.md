# AutoDesk Engine — Full-Stack Implementation Plan & Architecture Spec

Build a production-grade full-stack application for **AutoDesk Engine** — a college event certificate and student request automation system. Three pages: **Home (Landing)** + **Dashboard (Live Simulator)** + **About/Team**. Fully functional backend with Gemini AI, Notion SDK, and Email dispatch.

## Implemented Feature Update

The full request-to-action workflow is live:
- Landing-page ticket submission calls the pipeline directly.
- Gemini Flash AI or deterministic fallback classifies requests.
- Duplicate payloads are filtered using in-memory 24h MD5 hashing with automated TTL garbage collection.
- Notion stores request and run records with mock mode fallback.
- High-confidence verified requests auto-dispatch.
- Uncertain requests remain available for dashboard operator approval or rejection.
- Certificates are generated as standalone cryptographic HTML/SVG and delivered through Resend with Gmail SMTP fallback.

---

## 🏗️ Tech Stack

- **Framework**: **Next.js 16.3.2** (App Router) + **React 19.2.8**
- **Styling**: **Tailwind CSS v4** (`@tailwindcss/postcss`) + Vanilla CSS design tokens in `src/app/globals.css`
- **Animations**: **Framer Motion** (`framer-motion` v13.1.1)
- **Icons**: **Lucide React** (`lucide-react` v1.33.0)
- **AI Engine**: **Google Gemini AI** (`@google/genai` v2.18.0 — multi-model cascade)
- **Database & Operator Cockpit**: **Notion SDK** (`@notionhq/client` v5.26.0)
- **Transactional Mailer**: **Resend** (`resend` v6.22.0) + **Nodemailer** (`nodemailer` v9.0.5 — Gmail SMTP fallback)

---

## 🎨 Design System

Built on a Clean Modern Developer-Tool Design System:
- **Canvas / Background**: Warm off-white `#f7f6f2`, pure white panels `#ffffff`, elevated cards `#fcfbfa`
- **Borders**: Structured 2px–3px dark charcoal `#18181b`
- **Accents**: Red `#dc2626` (primary action), Emerald `#059669` (success/verified), Amber `#d97706` (review/warning), Blue `#2563eb`, Violet `#7c3aed`
- **Typography**: Inter (sans) + JetBrains Mono (mono)
- **Shadows**: Tactical offset developer shadows (`2px 2px 0px #18181b`)
- **Motion**: Fluid scroll progress bar, hover card elevations, tab indicators, and timeline transitions

---

## 📁 Project Structure

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
│   │   │   ├── error.js        ← Dashboard error boundary
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
│   │   ├── Navbar.jsx          ← Navigation header with scroll progress & modal trigger
│   │   ├── Hero.jsx            ← Hero section with live statistics and CTA
│   │   ├── HowItWorks.jsx      ← 6-stage interactive pipeline flow
│   │   ├── Features.jsx        ← Bento feature highlights
│   │   ├── Architecture.jsx    ← Interactive system architecture diagram
│   │   ├── StatsStrip.jsx      ← Live counter metric badges
│   │   ├── Footer.jsx          ← Footer with navigation and hackathon credits
│   │   ├── TeamCard.jsx        ← Team profile card component
│   │   ├── TechStack.jsx       ← Tech stack showcase grid
│   │   ├── SubmitRequestModal.jsx   ← Interactive form modal (triggers pipeline)
│   │   └── dashboard/
│   │       ├── BentoMetrics.jsx          ← Right telemetry sidebar & audit log feed
│   │       ├── EventStreamTimeline.jsx   ← Left live incident queue & filters
│   │       └── TacticalEngineCanvas.jsx  ← Center 5-stage live execution engine
│   └── lib/
│       ├── gemini.js            ← Gemini AI classification engine with model fallback
│       ├── notion.js            ← Notion SDK: createNotionRequest + logRunToNotion
│       ├── certificate.js       ← HTML/SVG certificate template generator with XSS sanitization
│       ├── mailer.js            ← Universal email dispatcher (Resend → Gmail SMTP fallback)
│       └── resend.js            ← Full Resend SDK wrapper (send/batch/get/update/list)
```

---

## 🖥️ Frontend Pages & Workflows

### Page 1: Home / Landing Page (`/`)
1. **Navbar** — Logo + nav links (Home, Live Cockpit, About) + "+ Submit Ticket" primary CTA.
2. **Hero Section** — Headline "Kill One Boring Job. Completely." + live metric pills + test modal launch.
3. **Stats Strip** — Real-time metrics: Incidents Auto-Resolved, Uptime SLA, Certificates Dispatched.
4. **How It Works** — 6-step animated pipeline flow (Ingest → Sanitize → Classify → Route → Execute → Audit).
5. **Features Grid** — Bento-style cards for Zero Hallucination AI, Human-in-the-Loop, Dynamic HTML Certificates, and Tamper-Proof Notion Run Logs.
6. **Architecture Blueprint** — Interactive blueprint showcasing end-to-end data pipelines.
7. **Footer** — Hackathon credentials, GitHub links, and author credits.

### Page 2: Live Tactical Cockpit (`/dashboard`)
1. **Left Column (Live Incident Queue)** — Filter tabs (`ALL`, `WAITING`, `DISPATCHED`, `REJECTED`), real-time ticket stream, and quick selector.
2. **Center Column (Tactical Engine Canvas)** — 5-Stage execution pipeline visualizer with interactive mode and raw JSON payload inspector.
3. **Right Column (Telemetry & Audit Log)** — Notion DB status, SLA latency monitors, and live append-only run log feed.

### Page 3: About / Team (`/about`)
1. **Team Cards** — Abhishek Sharma & Akash Gautam with GitHub and LinkedIn links.
2. **System Philosophy** — Architectural principles behind the "Repo Deletion Test".
3. **Tech Stack Section** — Visual grid of core frameworks and SDKs.

---

## 🔌 Backend API Endpoints

| Endpoint | Method | Supported Actions / Operations | Description |
|:---------|:-------|:-------------------------------|:------------|
| [`/api/pipeline`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/pipeline/route.js) | `POST` | `ingest`, `approve`, `reject` | Core 5-stage pipeline: sanitize → classify → route → execute → audit log |
| [`/api/classify`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/classify/route.js) | `POST` | — | Standalone Gemini AI text classification with schema validation |
| [`/api/send-email`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/send-email/route.js) | `GET` | — | List sent emails via Resend API |
| [`/api/send-email`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/send-email/route.js) | `POST` | `send`, `batch`, `get`, `update`, `list`, `listAttachments`, `getAttachment` | Full Resend transactional email suite |
| [`/api/notion-test`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/notion-test/route.js) | `GET` | — | Notion database connectivity and schema audit test |

---

## 🔑 Environment Variables

| Variable | Required | Default / Provider | Purpose |
|:---------|:---------|:-------------------|:--------|
| `NOTION_API_KEY` | ✅ Required | Notion Integrations | Authenticates Notion SDK client |
| `NOTION_REQUESTS_DATABASE_ID` | ✅ Required | Notion Database | Stores inbound requests & human approval queue |
| `NOTION_RUN_LOG_DATABASE_ID` | ✅ Required | Notion Database | Stores immutable telemetry run logs |
| `GEMINI_API_KEY` | ✅ Required | Google AI Studio | Powers Gemini Flash classification cascade |
| `RESEND_API_KEY` | ⚡ Primary | Resend.com | Primary transactional email dispatch provider |
| `SMTP_USER` + `SMTP_PASS` | ⚡ Fallback | Gmail App Password | Seamless failover SMTP transporter |

---

## 🧪 Verification & QA Plan

### Automated Verification
- `npm run build` — Verify Next.js 16 production build compiles with exit code 0.
- `npm run lint` — Verify zero ESLint syntax or style errors.

### Manual Verification
- Launch local development server (`npm run dev`) and test all 3 pages (`/`, `/dashboard`, `/about`).
- Submit live ticket in modal → verify AI classification, Notion record creation, certificate generation, and mailer dispatch.
- Test deduplication gate with identical prompt → verify `DUPLICATE_FILTERED` status.
- Test operator clearance on `/dashboard` → verify approve/reject state transitions and run log append.
