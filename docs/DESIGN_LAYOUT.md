# 📐 UI Design & Layout Specification — AutoDesk Engine

> **Design Theme**: Clean Modern Developer-Tool Design System  
> **Domain**: Autonomous Certificate Request Automation & Human-in-the-Loop Backend (HITL Pipeline)

---

## 📑 Table of Contents
1. [🎨 Visual Identity & Color Palette](#1-🎨-visual-identity--color-palette)
2. [📐 Wireframe & Page Layout Architecture](#2-📐-wireframe--page-layout-architecture)
3. [🧱 Component Breakdown](#3-🧱-component-breakdown)
   - [A. Shared Components](#a-shared-components)
   - [B. Landing Page Components](#b-landing-page-components)
   - [C. Dashboard Cockpit Components](#c-dashboard-cockpit-components)
   - [D. About Page Components](#d-about-page-components)
4. [✨ Surfaces, Texture & Structural Tokens](#4-✨-surfaces-texture--structural-tokens)
5. [💻 Design System CSS Tokens](#5-💻-design-system-css-tokens)

---

## Current Feature Set

The implemented web experience includes a landing-page submission modal, animated pipeline and feature sections, an About page, and a 3-column live tactical cockpit. The cockpit provides event filtering, request inspection, confidence and priority display, clean/garbage webhook simulation, approve/reject controls, counters, and recent run-log telemetry. The backend actions behind these controls are `ingest`, `approve`, and `reject`.

---

## 1. 🎨 Visual Identity & Color Palette

| Token | Hex / RGBA | Preview / Purpose | Description |
|:---|:---|:---|:---|
| `--bg-canvas` | `#f7f6f2` | 🔲 Warm Off-White / Beige | Primary application background canvas |
| `--bg-panel` | `#ffffff` | ⬜ Pure White Panel | Crisp container panel surface |
| `--bg-panel-elevated` | `#fcfbfa` | ◽ Elevated Surface | Floating cards, modals & active areas |
| `--border-charcoal` | `#18181b` | ◼️ Dark Charcoal Outline | High-contrast 2px–3px structured boundary |
| `--text-primary` | `#18181b` | ⬛ High-Contrast Charcoal | Primary typography & headers |
| `--text-secondary` | `#52525b` | 🔘 Slate Gray | Muted subtitles, units & descriptions |
| `--accent-red` | `#dc2626` | 🔴 Primary Crimson | Primary CTA buttons, attention & critical flags |
| `--accent-emerald` | `#059669` | 🟢 Emerald Green | Verified attendance & success status |
| `--accent-amber` | `#d97706` | 🔶 Amber Gold | Warnings & Human Review queue indicators |
| `--accent-blue` | `#2563eb` | 🔷 Royal Blue | Link highlights & secondary badges |
| `--accent-violet` | `#7c3aed` | 🟣 Violet Pulse | AI classification category tags |

---

## 2. 📐 Wireframe & Page Layout Architecture

### Three-Page Application Structure

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ 🧭 STICKY TOP NAVBAR (with Red Scroll Progress Bar)                                │
│ [⚡ AutoDesk Engine]    [Home]   [Live Cockpit]   [About Team]    [+ Submit Ticket] │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│  PAGE 1: /           PAGE 2: /dashboard           PAGE 3: /about                   │
│  Landing Page        Live Tactical Cockpit        Team & Tech Stack                │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Dashboard Cockpit Wireframe (Clean 3-Column Grid)

```
┌─────────────────┬────────────────────────────────┬───────────────────────────────┐
│ COL 1 (3/12)    │ COL 2 (6/12)                   │ COL 3 (3/12)                  │
│                 │                                │                               │
│ 📋 EVENT STREAM │ 🎛️ TACTICAL ENGINE CANVAS       │ 📊 BENTO METRICS              │
│ TIMELINE        │                                │                               │
│                 │ • 5-Stage Live Visualizer      │ • Notion DB Status Monitor    │
│ • Filter Tabs   │ • Interactive / JSON Mode Tabs │ • SLA Latency Telemetry       │
│   (ALL, WAITING,│ • Student Intent Extraction    │ • Total Completed / Pending   │
│    DISPATCHED,  │ • Approve / Reject Buttons     │ • Live Append-Only Run Log    │
│    REJECTED)    │ • Webhook Simulator Buttons    │   Feed with Bot Token Proof   │
│ • Real Ticket   │   (Clean + Garbage Input)      │                               │
│   Queue Stream  │ • Custom Form Input Submission │                               │
│                 │                                │                               │
└─────────────────┴────────────────────────────────┴───────────────────────────────┘
```

---

## 3. 🧱 Component Breakdown

### A. Shared Components

1. **`Navbar.jsx`**
   - Red scroll depth progress bar fixed to the top viewport.
   - Brand logo with lightning bolt icon.
   - Navigation links to Home, Live Cockpit, and About Team.
   - Notion HQ link and prominent "+ Submit Ticket" modal trigger CTA.

2. **`SubmitRequestModal.jsx`**
   - Modal overlay with escape/click-outside dismiss.
   - Test presets (Clean Happy Path, Attendance Discrepancy, Edge Case).
   - Custom student name, email, and raw complaint inputs.
   - Real-time pipeline execution state with green success confirmation card.

3. **`Footer.jsx`**
   - Hackathon attribution and project description.
   - Quick navigational shortcuts.
   - GitHub repository links and developer credits.

---

### B. Landing Page Components (`src/app/page.js`)

1. **`Hero.jsx`**
   - Headline: *"Kill One Boring Job. Completely."*
   - Live metrics summary strip and dual CTAs.
2. **`StatsStrip.jsx`**
   - 3 live counters: Incidents Auto-Resolved, Uptime SLA, Certificates Dispatched.
3. **`HowItWorks.jsx`**
   - 6-step cascading timeline: Ingest ➔ Sanitize ➔ Classify ➔ Route ➔ Execute ➔ Audit.
4. **`Features.jsx`**
   - Bento-style feature cards detailing Gemini AI, Human-in-the-Loop, Dynamic PDF/HTML certs, and Notion Run Logs.
5. **`Architecture.jsx`**
   - Interactive system flow blueprint illustrating end-to-end data transfer.

---

### C. Dashboard Cockpit Components (`src/app/dashboard/page.js`)

1. **`EventStreamTimeline.jsx` (Left Column)**
   - Header with active incident count.
   - Status filters (`ALL`, `WAITING`, `DISPATCHED`, `REJECTED`).
   - Interactive list of live student tickets with category and urgency badges.

2. **`TacticalEngineCanvas.jsx` (Center Column)**
   - 5-Stage visualizer (Ingest, Sanitize, Gemini AI, Notion Queue, Email Dispatch).
   - View mode toggle (`INTERACTIVE UI` vs. `PAYLOAD (JSON)`).
   - Student info, extracted intent, confidence percentage, and priority badge.
   - Approve & Reject action triggers with loading states.
   - Custom simulation station and quick preset buttons.

3. **`BentoMetrics.jsx` (Right Column)**
   - Notion integration status monitor with database links.
   - Real-time SLA latency metrics.
   - Live append-only Run Log feed showing timestamped execution traces.

---

### D. About Page Components (`src/app/about/page.js`)

1. **`TeamCard.jsx`**
   - Developer cards for Abhishek Sharma & Akash Gautam.
   - Social links (GitHub, LinkedIn).
2. **`TechStack.jsx`**
   - Grid displaying Next.js 16, Google Gemini AI, Notion API, Resend, Tailwind CSS, and Framer Motion.

---

## 4. ✨ Surfaces, Texture & Structural Tokens

- **Border Width**: `2px solid #18181b` for cards and interactive elements.
- **Card Shadows**: `2px 2px 0px #18181b` (resting), `3px 3px 0px #18181b` (hover).
- **Radius Tokens**: `6px` (small badges), `10px` (buttons and inputs), `14px` (cards and containers).

---

## 5. 💻 Design System CSS Tokens

```css
:root {
  --bg-canvas: #f7f6f2;
  --bg-panel: #ffffff;
  --bg-panel-elevated: #fcfbfa;
  --bg-card-hover: #f3f1eb;
  --bg-surface-active: #ece9e0;
  --bg-input: #fcfbf9;

  --border-charcoal: #18181b;
  --border-subtle: #e2dfd6;
  --border-mid: #cbd5e1;

  --accent-red: #dc2626;
  --accent-red-hover: #b91c1c;
  --accent-emerald: #059669;
  --accent-amber: #d97706;
  --accent-blue: #2563eb;
  --accent-violet: #7c3aed;

  --text-primary: #18181b;
  --text-secondary: #52525b;
  --text-muted: #71717a;
  --text-white: #ffffff;

  --shadow-card: 2px 2px 0px #18181b;
  --shadow-card-hover: 3px 3px 0px #18181b;
  --shadow-button: 2px 2px 0px #18181b;
}
```
