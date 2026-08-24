# 📜 Audit Log & Telemetry Specification

> **Official Logging Standard, Telemetry Format & Query Rules for AutoDesk Engine**  
> *Complete Reference for Automated Run Logging and Observability*

---

## 📑 Overview

Every action taken by the AutoDesk Engine—whether autonomous AI triage, MD5 spam filtering, human operator approval, or email dispatch—generates a tamper-proof entry in the **Notion Run Log**. This document defines the schema, event catalog, and validation rules.

---

## 🗄️ Notion Run Log Database Schema

The `logRunToNotion()` function in [`src/lib/notion.js`](file:///src/lib/notion.js) creates Notion pages with a `Name` title property and structured block children. The target database is specified by `NOTION_RUN_LOG_DATABASE_ID`.

### Page Structure (as written by `notion.pages.create()`)

| Element | Notion Type | Content Format |
|:--------|:------------|:---------------|
| **Page Title** | `title` (Name property) | `"📜 {runId} — {status}"` (e.g., `📜 RUN-1724458900123 — SUCCESS`) |
| **Telemetry Callout** | `callout` block (✅ or ⚠️ emoji) | `"⏱️ Execution Duration: {duration}ms \| 🎯 Trigger: {trigger} \| 🚦 Status: {status}"` |
| **Action Summary** | `paragraph` block | `"Action Summary: {action}\nTimestamp: {ISO 8601 UTC}"` |
| **Created Time** | Notion auto-field | ISO 8601 UTC timestamp (automatically set by Notion server) |
| **Created By** | Notion auto-field | Notion Bot Integration Token (proves automated execution) |

> **Fallback**: If `NOTION_API_KEY` or `NOTION_RUN_LOG_DATABASE_ID` is not set, returns `{ mock: true, runId: 'RUN-...' }` without failing.


---

## 📋 Catalog of Standard Audit Events

### Event 1: Ingestion & Auto-Dispatch (Low-Risk Happy Path)
- **Trigger**: `Webhook Ingestion Pipeline`
- **Condition**: AI confidence $\ge 90\%$ and verified attendance.
- **Action String**: `Auto-Dispatched Certificate to [User Name]`
- **Status**: `SUCCESS`
- **Expected Duration**: `600ms - 1,200ms`

### Event 2: Ingestion Queued for Human Review (Edge Case / Missing Attendance)
- **Trigger**: `Webhook Ingestion Pipeline`
- **Condition**: Unverified attendance or low confidence.
- **Action String**: `Queued for Human Approval: [Category]`
- **Status**: `SUCCESS`
- **Expected Duration**: `300ms - 600ms`

### Event 3: Spam / Duplicate Blocked
- **Trigger**: `Sanitization & Dedup Gate`
- **Condition**: MD5 hash matches active cache entry within 24 hours.
- **Action String**: `MD5 Duplicate Blocked for [User Email]`
- **Status**: `BLOCKED`
- **Expected Duration**: `5ms - 25ms`

### Event 4: Operator Approval Execution
- **Trigger**: `Notion Operator Cockpit`
- **Condition**: Admin clicks "Approve" button on ticket.
- **Action String**: `Operator Approved Certificate for [User Name] ([Request ID])`
- **Status**: `SUCCESS`
- **Expected Duration**: `400ms - 800ms`

### Event 5: Operator Rejection Execution
- **Trigger**: `Notion Operator Cockpit`
- **Condition**: Admin clicks "Reject" button.
- **Action String**: `Operator Rejected Request [Request ID] (Attendance not verified)`
- **Status**: `REJECTED`
- **Expected Duration**: `20ms - 50ms`

### Event 6: Critical API / Service Failure
- **Trigger**: `Pipeline Exception Handler`
- **Condition**: Network timeout or unhandled exception.
- **Action String**: `Critical Failure in [Stage Name]: [Error Message]`
- **Status**: `FAILED`
- **Expected Duration**: N/A

---

## 🔍 Sample Audit Records (JSON Serialization)

```json
[
  {
    "runId": "RUN-1724458900101",
    "trigger": "Webhook Ingestion Pipeline",
    "action": "Auto-Dispatched Certificate to Rahul Sharma",
    "status": "SUCCESS",
    "durationMs": 842,
    "timestamp": "2026-08-24T06:40:00.101Z",
    "botVerified": true
  },
  {
    "runId": "RUN-1724458900202",
    "trigger": "Sanitization & Dedup Gate",
    "action": "MD5 Duplicate Blocked for sharmaa24434@gmail.com",
    "status": "BLOCKED",
    "durationMs": 14,
    "timestamp": "2026-08-24T06:41:12.202Z",
    "botVerified": true
  },
  {
    "runId": "RUN-1724458900303",
    "trigger": "Notion Operator Cockpit",
    "action": "Operator Approved Certificate for Ananya Verma (REQ-742)",
    "status": "SUCCESS",
    "durationMs": 512,
    "timestamp": "2026-08-24T06:45:30.303Z",
    "botVerified": true
  },
  {
    "runId": "RUN-1724458900404",
    "trigger": "Notion Operator Cockpit",
    "action": "Operator Rejected Request REQ-990 (Attendance not verified)",
    "status": "REJECTED",
    "durationMs": 28,
    "timestamp": "2026-08-24T06:46:01.404Z",
    "botVerified": true
  }
]
```

---

## 📊 Telemetry Querying & Dashboard Integration

The AutoDesk Dashboard reads these records via the `/api/pipeline` or directly from the Notion SDK to render real-time statistics:
- **Total Ingested Runs**
- **Autonomous vs. Human Approval Ratio**
- **Spam Block Rate (%)**
- **Average Pipeline Latency (ms)**

---

*Audit log specification ratified for production runtime observability.*
