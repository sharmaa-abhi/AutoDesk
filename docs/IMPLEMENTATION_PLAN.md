# AutoDesk Engine — Hackathon MVP Frontend

Build a stunning, pixel-perfect frontend for **AutoDesk Engine** — a college event certificate request automation system. Two pages: **Home (Landing)** + **About/Team**. Static MVP with mock data, no backend.

## Tech Stack
- **Next.js** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Design System (from DESIGN_LAYOUT.md)
- Dark theme (Deep OLED Void): `#050508` canvas, `#0A0C10` panels, `#10141D` elevated
- Accents: Cyan `#00E5FF`, Amber `#FFB300`, Crimson `#FF2A55`, Emerald `#00E676`
- Fonts: Inter (sans) + JetBrains Mono (mono)
- Glassmorphism overlays, dot-matrix grid background
- Motion: smooth scroll reveals, hover lifts, floating orbs

---

## Proposed Changes

### Page 1: Home / Landing Page

Sections in order:

1. **Navbar** — Logo + nav links (Home, About) + "Submit Request" CTA button
2. **Hero Section** — Big bold headline "Kill One Boring Job. Completely." + subtitle about automating college requests + animated gradient orbs + "Get Started" CTA
3. **How It Works** — 6-step horizontal/vertical flow with icons: Trigger → Backend → AI → Notion → Human Approval → Real Action → Run Log
4. **Features Grid** — 4 bento-style cards: AI Classification, Human-in-the-Loop, Real-World Actions (PDF/Email), Tamper-Proof Run Log
5. **Architecture Diagram** — Visual system flow showing the full pipeline (static SVG/CSS illustration)
6. **Live Stats Strip** — Mock counters: "1,247 Requests Processed", "99.2% Uptime", "342 Certificates Sent", "< 2s Response Time"
7. **Footer** — Project name, hackathon credit, GitHub link placeholder

### Page 2: About / Team

1. **Page Header** — "The Team Behind AutoDesk Engine"
2. **Team Cards** — 2 glassmorphism cards with name, role, links
   - Abhi Sharma (placeholder for photo)
   - Member 2 (placeholder)
3. **Tech Stack Section** — Visual grid of tech used (Next.js, Tailwind, Gemini AI, Notion API, Node.js, Resend)
4. **Project Story** — Short paragraph about the hackathon problem
5. **Footer** — same as Home

### Project Structure

```
New folder/
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── app/
│   │   ├── layout.js          ← Root layout, fonts, metadata
│   │   ├── page.js            ← Home landing page
│   │   ├── about/
│   │   │   └── page.js        ← About/Team page
│   │   └── globals.css        ← Tailwind + custom CSS tokens
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── HowItWorks.jsx
│       ├── Features.jsx
│       ├── Architecture.jsx
│       ├── StatsStrip.jsx
│       ├── Footer.jsx
│       ├── TeamCard.jsx
│       └── TechStack.jsx
```

> [!IMPORTANT]
> All data is hardcoded/mock — no backend API calls. This is a static hackathon demo frontend.

## Verification Plan

### Manual Verification
- Run `npm run dev` and verify both pages render correctly
- Check responsive layout on desktop
- Verify all Framer Motion animations work
- Confirm dark theme colors match the design system
