# AutoDesk Engine — Claude Developer Guide

> Autonomous, Human-in-the-Loop request and certificate automation system for the **Notion Track Hackathon**.

@AGENTS.md

---

## 🚀 Quick Command Reference

| Command | Description |
|:---|:---|
| `npm run dev` | Start Next.js 16 development server (`http://localhost:3000`) |
| `npm run build` | Compile production build using Next.js / Turbopack |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint v9 checks across the codebase |

---

## 🏗️ Tech Stack & Architecture

- **Framework**: Next.js 16.3.2 (App Router) + React 19.2.8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) + Vanilla CSS variables in `src/app/globals.css`
- **AI Engine**: Google Gemini API (`@google/genai` v2.18.0) with multi-model fallback cascade (`gemini-flash-lite-latest`, `gemini-flash-latest`, `gemini-2.5-flash`, `gemini-3.5-flash`)
- **Operator Cockpit & Audit**: Notion REST SDK (`@notionhq/client` v5.26.0)
- **Transactional Mailer**: Resend API (`resend` v6.22.0) with automatic failover to Gmail SMTP (`nodemailer` v9.0.5)
- **Icons & Motion**: Lucide React (`lucide-react` v1.33.0) + Framer Motion (`framer-motion` v13.1.1)

---

## 🔑 Environment Variables (`.env.local`)

```env
# Notion Integration
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_REQUESTS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_RUN_LOG_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Gemini AI
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Transactional Email (Primary: Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Transactional Email Fallback (Gmail SMTP)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM="AutoDesk Engine <onboarding@resend.dev>"
```

---

## 📁 Key Directories & Entry Points

- **Landing Page**: [`src/app/page.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/page.js)
- **Tactical Cockpit**: [`src/app/dashboard/page.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/dashboard/page.js)
- **About Team**: [`src/app/about/page.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/about/page.js)
- **Core Pipeline Route**: [`src/app/api/pipeline/route.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/app/api/pipeline/route.js)
- **Gemini Service**: [`src/lib/gemini.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/lib/gemini.js)
- **Notion SDK Client**: [`src/lib/notion.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/lib/notion.js)
- **Certificate Generator**: [`src/lib/certificate.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/lib/certificate.js)
- **Mailer Dispatcher**: [`src/lib/mailer.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/lib/mailer.js)
- **Resend Wrapper**: [`src/lib/resend.js`](file:///c:/Users/ABHI%20SHARMA/OneDrive/Desktop/New%20folder/src/lib/resend.js)
