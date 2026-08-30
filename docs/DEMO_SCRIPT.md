# 🎬 AutoDesk Engine — Official Hackathon Demo Script & Video Recording Guide

> **Project Name:** AutoDesk Engine  
> **Tagline:** Kill One Boring Job. Completely. (Autonomous Request & Certificate Automation System)  
> **Event:** Automate India 2026 Hackathon (Notion Track)  
> **Target Video Duration:** 2:30 to 3:00 Minutes  
> **Local Server URL:** `http://localhost:3000`

---

## 🎥 Quick Recording Tool Shortcuts (Windows)
- **Built-in Windows Screen Recorder:** Press **`Win + Alt + R`** (starts instant HD recording with mic audio).
- **Alternative Free Screen Recorders:** Loom (Chrome Extension), OBS Studio, or Clipchamp.

---

## ⏱️ Video Timeline & Presentation Script

### 🕒 Section 1: Hook & The Real-World Problem (0:00 - 0:35)
* **Screen Display:** Open landing page `http://localhost:3000` at the Hero section.
* **Camera / Voiceover Talking Points:**
  > *"Every time a college hackathon or tech workshop ends, organizers face one massive, boring, soul-crushing job: hundreds of student emails complaining about missing certificates, wrong names, or duplicate registrations.*  
  > *Organizers spend 40+ hours manually checking spreadsheets, creating certificates in Canva, and sending emails one by one.*  
  > *Today, we built **AutoDesk Engine** — an autonomous backend system that uses **Google Gemini AI** and **Notion** to kill this boring job completely in under 2 seconds."*

---

### 🕒 Section 2: Landing Page & Architectural Blueprint (0:35 - 1:05)
* **Screen Actions:**
  1. Scroll down slowly past the **Live Stats Strip** (show numbers counting up to 1,247 incidents and 99.8% uptime).
  2. Show the **Top Red Scroll Progress Bar** in the navbar tracking page depth.
  3. Scroll through **"How The Autonomous Engine Works"** (show the 6 automated steps cascading into view).
  4. Pause at **"End-to-End Pipeline Architecture"** (explain the blueprint: Webhook Ingest ➔ MD5 Dedup ➔ Gemini Flash AI ➔ Notion DB ➔ Human-in-the-Loop ➔ Transactional Mailer).
* **Voiceover Talking Points:**
  > *"AutoDesk Engine isn't just a chatbot or mockup. It's a complete 5-stage production pipeline with automated MD5 deduplication, multi-lingual AI classification, live Notion database sync, and cryptographic SVG certificate generation."*

---

### 🕒 Section 3: Live Incident Submission Demo (1:05 - 1:40)
* **Screen Actions:**
  1. Scroll back up or click **"+ Submit Ticket"** in the top navbar.
  2. In the modal, click **"Preset 2: Hello team, our team 'NeuralCoders' secured 2nd position..."**.
  3. Show the student name (**Mohit**) and email (**mohit99105294@gmail.com**).
  4. Click **"Launch Automated Pipeline"**.
  5. Show the processing state (`Processing with Gemini AI & Notion...`) turning into the **Green Success Card** in ~1.4 seconds.
  6. Highlight the extracted AI entity:
     - **Category:** `CERTIFICATE_ISSUE`
     - **Confidence:** `98%`
     - **Priority:** `MEDIUM`
     - **Action:** `GENERATE_PDF + EMAIL`
* **Voiceover Talking Points:**
  > *"Let's submit a live student complaint. Mohit writes in natural conversational language that his team 'NeuralCoders' secured 2nd position.  
  > In 1.4 seconds, Gemini Flash AI extracts the intent with 98% confidence, automatically validates attendance, creates a Notion page, and triggers the action engine."*

---

### 🕒 Section 4: Live Notion Cockpit & Operator Clearance (1:40 - 2:20)
* **Screen Actions:**
  1. Click **"Close & View Cockpit"** (navigates to `http://localhost:3000/dashboard`).
  2. Show the **Live Incident Queue** on the left with different ticket statuses (`REVIEW`, `DISPATCHED`, `DATA FIX`).
  3. Click a ticket marked `REVIEW` to inspect the 5-Stage Real-Time Pipeline Canvas in the center.
  4. Switch view mode from **"INTERACTIVE UI"** to **"PAYLOAD (JSON)"** to show clean schema extraction.
  5. Click **"Approve & Dispatch"** button to demonstrate Human-in-the-Loop (HITL) authorization.
  6. Point out the **SLA Telemetry** and **Audit Log** in the right sidebar.
* **Voiceover Talking Points:**
  > *"Inside the Live Cockpit, organizers have full oversight. High-confidence routine tickets auto-dispatch in seconds, while edge cases pause for 1-click human clearance. Every single action is written to the Notion Run Log using the official bot integration token — guaranteeing a 100% tamper-proof audit trail."*

---

### 🕒 Section 5: About Team & Closing (2:20 - 2:45)
* **Screen Actions:**
  1. Click **"About Team"** in the top navbar (`http://localhost:3000/about`).
  2. Show the developer profiles: **Abhishek Sharma** and **Akash Gautam** with clickable GitHub and LinkedIn links.
  3. Show the modern tech stack breakdown (**Next.js 16 App Router, Gemini Flash AI, Notion REST API, Nodemailer/Resend, Framer Motion**).
* **Voiceover Talking Points:**
  > *"Built with Next.js 16, Google Gemini AI, and Notion by Abhishek Sharma and Akash Gautam. AutoDesk Engine: eliminating repetitive manual work so organizers can focus on what truly matters. Thank you!"*

---

## 🏆 Key Features to Highlight to Judges
1. **Zero Hallucination AI Classification:** Deterministic JSON schema extraction with 100% resilient fallback.
2. **Real-World Execution:** Real emails sent with verified SVG certificates (no fake timeouts or mock alerts).
3. **Tamper-Proof Audit Proof:** Automated Notion database logging via integration bot token.
4. **24-Hour MD5 Deduplication:** Protects against spam submissions and duplicate requests.
5. **Human-in-the-Loop Cockpit:** Gives event operators full control over sensitive approvals.
