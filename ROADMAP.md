# 🗺️ AutoDesk Engine — Product & Architecture Roadmap

> **Mission:** *Kill One Boring Job. Completely.*  
> Transform manual college and event operational overhead—certificate re-issues, attendance discrepancies, and student complaints—into an autonomous, audited, human-in-the-loop workflow powered by **Notion**, **Gemini AI**, and **Universal Action Dispatchers**.

---

## 🧭 Roadmap Milestones at a Glance

| Phase | Milestone | Status | Target Horizon |
|---|---|:---:|---|
| **Phase 1** | **Core Automation Engine & Cockpit** | ✅ **COMPLETED** | August 2026 |
| **Phase 2** | **Continuous Polling, High-Concurrency & Caching** | 🔄 **IN PROGRESS** | Q3 2026 |
| **Phase 3** | **Omnichannel Ingestion (WhatsApp, Telegram, Voice & OCR)** | 📋 **PLANNED** | Q4 2026 |
| **Phase 4** | **Self-Healing AI Workflows & Dynamic RAG** | 📋 **PLANNED** | Q1 2027 |
| **Phase 5** | **Enterprise Scale, LMS Integrations & Verifiable Credentials** | 📋 **PLANNED** | Q2 2027 |

---

## 📍 Phase 1: Core Engine & Cockpit (Completed ✅)

- [x] **Gemini AI Intent Classification Engine**
  - Multi-model fallback cascade prioritizing `gemini-flash-lite-latest`, `gemini-flash-latest`, `gemini-2.5-flash`, and `gemini-3.5-flash`.
  - Sub-second latency with 5,000ms abort signals.
  - Markdown code-fence block extractor to prevent JSON parsing crashes.
  - Extraction of category (`CERTIFICATE_ISSUE`, `ATTENDANCE_FIX`, etc.), confidence score, priority, and action specifications.

- [x] **Notion Human-in-the-Loop Cockpit**
  - Automatic creation of live incident pages in the connected Notion database via official `@notionhq/client`.
  - Accurate schema mapping: Student Name, Email, Raw Complaint, Intent, Confidence, Status, and Attendance.
  - Operator approval states (`WAITING_APPROVAL`, `SUCCESS`, `FAILED`, `NEEDS_FIX`).

- [x] **Universal Action Dispatcher**
  - Primary dispatch via Resend transactional email API (`resend` v6.22.0).
  - Automatic, seamless fallback to authenticated Gmail SMTP (`nodemailer` v9.0.5) when Resend keys are unconfigured.
  - Dynamic, tamper-proof HTML/SVG certificate rendering engine with XSS/HTML entity sanitization.

- [x] **Sanitization & 24-Hour Deduplication Gate**
  - In-memory MD5 payload fingerprinting within a 24-hour rolling window.
  - Rejection and telemetry recording for duplicate spam submissions.

- [x] **Clean Modern Developer-Tool 3-Column UI**
  - Warm off-white background (`#f7f6f2`), crisp white cards (`#ffffff`), and bold 2px–3px dark charcoal borders (`#18181b`).
  - Left navigation cards for Incident Stream and workspace navigation.
  - Center prominent input station with natural language textarea, test presets, and strong red primary CTA (`#dc2626`).
  - Right utility sidebar with Notion workspace links, SLA telemetry, and tamper-proof run log live feed.
  - Full mobile and tablet responsive reflow.

---

## 📍 Phase 2: Reliability, Autonomy & Production Hardening (Q3 2026 🔄)

- [ ] **Continuous Background Polling Daemon**
  - Autonomous Node.js daemon checking the Notion database every 30 seconds for operator status changes.
  - Automatic trigger of action dispatchers when an operator changes a Notion page status to `"Approved"`.
  - Mutex lock to prevent duplicate execution across parallel daemon workers.

- [ ] **Persistent Redis / SQLite Deduplication Store**
  - Upgrade from in-memory MD5 cache to persistent Redis or local SQLite store.
  - Prevents cache clearing during container restarts or zero-downtime serverless redeployments.

- [ ] **Batch Certificate Generation & Bulk Dispatch**
  - Bulk CSV/Excel attendee ingestion tool supporting 500+ student cohorts.
  - Rate-limited email queue with automated exponential backoff to respect SMTP and Resend sending limits (e.g., 10 emails/second).

- [ ] **Real-Time WebSockets / Server-Sent Events (SSE)**
  - Replace client-side polling on `/dashboard` with live Server-Sent Events.
  - Instant card animations and telemetry counter updates when new tickets are ingested or approved.

---

## 📍 Phase 3: Omnichannel Ingestion (Q4 2026 🚀)

- [ ] **WhatsApp Business API & Telegram Bot Ingestion**
  - Allow students to send complaints directly via WhatsApp or Telegram.
  - Webhook parser converting chat messages into standard AutoDesk Engine incident payloads.
  - Automatic reply to WhatsApp/Telegram chats with live status links and certificate downloads.

- [ ] **Multimodal Voice-to-Text Transcription**
  - Integration with Gemini Multimodal / Whisper API to accept voice notes from organizers and students.
  - Automatic transcription, translation, and intent extraction from Hindi/English voice recordings.

- [ ] **OCR Proof & Screenshot Verification**
  - Support image uploads (e.g., screenshots of event registration, Google Meet logs, or student ID cards).
  - Gemini Vision extraction to verify student identity against the college database before certificate generation.

- [ ] **Multi-Event & Multi-College Tenant Isolation**
  - Support multiple Notion workspaces and databases from a single deployment.
  - Role-based access control (RBAC) for different event heads and college chapters.

---

## 📍 Phase 4: Self-Healing AI & Dynamic Governance (Q1 2027 🧠)

- [ ] **Autonomous Confidence Threshold Routing**
  - **Tier 1 (High Confidence >95%):** Auto-approve and dispatch certificates instantly without human intervention.
  - **Tier 2 (Medium Confidence 75%–94%):** Queue in Notion with pre-computed AI recommendation tag for rapid 1-click clearance.
  - **Tier 3 (Low Confidence <75%):** Flag as anomaly with diagnostic explanation for manual operator investigation.

- [ ] **Dynamic RAG (Retrieval-Augmented Generation) Knowledge Base**
  - Vector embeddings of event rules, eligibility criteria, and college policies.
  - Enables Gemini to answer complex, rule-dependent edge cases (e.g., *"Did attending only Day 2 qualify for a certificate?"*).

- [ ] **Reinforcement Learning from Operator Feedback (RLOF)**
  - Track operator rejections or corrections in Notion.
  - Automatically log edge-case prompts to fine-tune classification prompts and few-shot examples.

---

## 📍 Phase 5: Enterprise Scaling & Web3 Verifiable Credentials (Q2 2027 🌐)

- [ ] **Native Notion Marketplace Integration**
  - Package AutoDesk Engine as an official Notion Integration template.
  - One-click duplicate workspace setup with pre-configured Requests and Run Log databases.

- [ ] **LMS Integrations (Canvas, Moodle, Google Classroom)**
  - Direct roster sync with college learning management systems.
  - Automatic gradebook and attendance reconciliation.

- [ ] **Web3 Soulbound Verifiable Credentials**
  - Optional on-chain digital certificate minting on Base or Polygon.
  - Cryptographically signed soulbound token (SBT) accompanying the PDF certificate for permanent academic proof.

- [ ] **Automated Meeting Reconciliation**
  - Automatic parsing of Zoom, Google Meet, and YouTube Live attendance export CSVs to eliminate manual roster checking.

---

## 🏗️ Technical Architecture Evolution

```
Current (Phase 1-2):
[Student Webhook / Form] ──> [MD5 Gate] ──> [Gemini AI Engine] ──> [Notion Database HQ]
                                                                          │
                                                                   [HITL Operator]
                                                                          │
                                                     [PDF/HTML Cert] <────┴────> [Resend / SMTP Mailer]
                                                                          │
                                                                 [Notion Run Log Audit]

Future (Phase 3-5):
[Web / WhatsApp / Telegram / Voice / OCR]
               │
      [Omnichannel Gateway]
               │
  [Persistent Redis Deduplication]
               │
    [Gemini Multimodal + RAG]
               │
  ┌────────────┴────────────┐
  │ Confidence Score Check  │
  ▼                         ▼
[>95%: Auto-Action]   [<95%: Notion HITL Cockpit]
  │                         │
  └────────────┬────────────┘
               ▼
[Universal Action Cluster]
├── Transactional Email (Resend/SMTP)
├── Verified HTML/SVG PDF Certificates
├── Web3 Soulbound Digital Credentials
└── Notion Tamper-Proof Audit Run Log
```

---

## 👥 Governance & Contribution

- **Repository:** [AutoDesk Engine on GitHub](https://github.com/sharmaa-abhi/Notion.AI)
- **Control Center:** Connected Notion Workspace
- **Maintainers:** Abhishek Sharma & Akash Gautam
- **License:** MIT License
