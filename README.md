# ⚡ AutoDesk Engine

> **Kill One Boring Job. Completely.**

An autonomous backend automation service that eliminates repetitive college tasks — from certificate requests to attendance tracking. Built for the **Notion Track Hackathon**.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
autodesk-engine/
├── docs/                           # 📖 Documentation
│   ├── COLOR_SYSTEM.md             #    Complete color palette & tokens
│   ├── DESIGN_LAYOUT.md            #    UI wireframes & design specs
│   ├── FLOWCHARTS.md               #    System architecture diagrams
│   ├── IMPLEMENTATION_PLAN.md      #    Build plan & checklist
│   ├── NOTION_TRACK_GUIDE.md       #    Hackathon theme rules & guide
│   ├── Notion_Track_Complete_Conversation.md  #  Full problem breakdown
│   └── color-palette.html          #    Interactive color swatch viewer
│
├── src/                            # 💻 Source Code
│   ├── app/                        #    Next.js App Router
│   │   ├── globals.css             #    Design system tokens & animations
│   │   ├── layout.js               #    Root layout (Inter + JetBrains Mono)
│   │   ├── page.js                 #    🏠 Home / Landing page
│   │   └── about/
│   │       └── page.js             #    👥 About / Team page
│   │
│   └── components/                 #    Reusable UI Components
│       ├── Navbar.jsx              #    Fixed glassmorphism navbar
│       ├── Hero.jsx                #    Hero section with floating orbs
│       ├── HowItWorks.jsx          #    6-step pipeline flow
│       ├── Features.jsx            #    4 bento feature cards
│       ├── Architecture.jsx        #    System blueprint flowchart
│       ├── StatsStrip.jsx          #    Animated counter stats
│       ├── Footer.jsx              #    Footer with system status
│       ├── TeamCard.jsx            #    Glass team member card
│       └── TechStack.jsx           #    Tech stack badges
│
├── public/                         #    Static assets
├── .env.example                    #    Frontend env template
├── .env.backend.example            #    Backend env template
├── next.config.mjs                 #    Next.js configuration
├── package.json                    #    Dependencies
└── README.md                       #    ← You are here
```

---

## 🎨 Design System (Deep OLED Void)
 
| Token | Value | Usage |
|:------|:------|:------|
| `--bg-canvas` | `#050508` | App background (Pitch Black) |
| `--bg-panel` | `#0A0C10` | Cards & panels |
| `--bg-panel-elevated` | `#10141D` | Modals & elevated cards |
| `--accent-cyan` | `#00E5FF` | Primary actions |
| `--accent-amber` | `#FFB300` | Warnings |
| `--accent-crimson` | `#FF2A55` | Errors |
| `--accent-emerald` | `#00E676` | Success |
| `--text-gold` | `#FFD700` | Heading text |

> See [`docs/COLOR_SYSTEM.md`](docs/COLOR_SYSTEM.md) for the full palette.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:-----------|:--------|
| **Next.js** | Frontend framework (App Router) |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Inter + JetBrains Mono** | Typography |

---

## 📊 System Flow

```
⚡ Trigger → 💻 Your Code → 🧠 AI → 🙋 Approval → 🌍 Action → 📜 Run Log
```

> See [`docs/FLOWCHARTS.md`](docs/FLOWCHARTS.md) for full architecture diagrams.

---

## 👥 Team

- **Abhi Sharma** — Full-Stack Developer & System Architect
- **Team Member 2** — *(to be updated)*

---

## 📜 License

Built with 🔥 for the Notion Track Hackathon — 2026.
