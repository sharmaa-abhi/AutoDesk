"use client";

import { useState } from "react";
import {
  Globe,
  Brain,
  Database,
  UserCheck,
  Mail,
  FileCheck,
  Check,
  X,
  Layers,
  ArrowRight,
  Terminal,
  Send,
  ExternalLink,
  Copy,
  CheckCheck,
  RefreshCw,
  Clock,
} from "lucide-react";

export default function TacticalEngineCanvas({
  selectedEvent,
  onApproveEvent,
  onRejectEvent,
  onSimulateWebhook,
}) {
  const [activeStage, setActiveStage] = useState(3);
  const [viewMode, setViewMode] = useState("TACTICAL"); // TACTICAL | PAYLOAD | NOTION_SYNC
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rawPrompt, setRawPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  const stages = [
    {
      id: 1,
      title: "1. Ingest Gateway",
      sub: "Sanitize & Hash",
      icon: Globe,
      status: "PASS",
    },
    {
      id: 2,
      title: "2. Gemini Flash",
      sub: "Extract Intent",
      icon: Brain,
      status: `${selectedEvent?.confidence || 98}% CONF`,
    },
    {
      id: 3,
      title: "3. Notion Queue",
      sub: "Operator Decision",
      icon: Database,
      status: selectedEvent?.status || "PENDING",
    },
    {
      id: 4,
      title: "4. Dispatcher",
      sub: "Cert + Mailer",
      icon: Mail,
      status: selectedEvent?.status === "SUCCESS" ? "SENT" : "READY",
    },
    {
      id: 5,
      title: "5. Run Log",
      sub: "Notion Proof",
      icon: FileCheck,
      status: "SEALED",
    },
  ];

  const presets = [
    {
      label: "Certificate Missing",
      name: "Rahul Sharma",
      email: "rahul@college.edu",
      msg: "Sir I attended the 2-day GenAI workshop but did not receive certificate yet. Please verify attendance.",
    },
    {
      label: "Attendance Discrepancy",
      name: "Sneha Patel",
      email: "sneha@college.edu",
      msg: "My attendance is showing absent for Day 2 Web3 session, but I submitted the check-in form.",
    },
    {
      label: "Duplicate Submission",
      name: "Aman Verma",
      email: "aman@college.edu",
      msg: "I accidentally submitted the registration form twice with different emails, please merge records.",
    },
  ];

  const handleApplyPreset = (p) => {
    setUserName(p.name);
    setUserEmail(p.email);
    setRawPrompt(p.msg);
    setSubmitFeedback(null);
  };

  const handleRunPipeline = async (e) => {
    e.preventDefault();
    if (!rawPrompt.trim()) return;

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      await onSimulateWebhook({
        custom: true,
        userName: userName.trim() || "Student Participant",
        userEmail: userEmail.trim() || "student@college.edu",
        rawMessage: rawPrompt.trim(),
      });
      setSubmitFeedback({
        type: "success",
        msg: "Pipeline executed! Ingested into Notion & analyzed with Gemini AI.",
      });
      setRawPrompt("");
    } catch (err) {
      setSubmitFeedback({
        type: "error",
        msg: err.message || "Pipeline failed to execute.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const payloadData = {
    request_id: selectedEvent?.id || "REQ-108",
    user_name: selectedEvent?.userName || "Rahul Sharma",
    user_email: selectedEvent?.userEmail || "rahul@college.edu",
    intent: selectedEvent?.category || "CERTIFICATE_ISSUE",
    confidence_score: selectedEvent?.confidence
      ? Number((selectedEvent.confidence / 100).toFixed(2))
      : 0.98,
    status: selectedEvent?.status || "WAITING_APPROVAL",
    attendance_verified: !!selectedEvent?.attendanceVerified,
    action_spec: {
      type: selectedEvent?.actionPreview || "GENERATE_PDF + EMAIL",
      template: "event_certificate_v2.html",
      recipient: selectedEvent?.userEmail || "rahul@college.edu",
    },
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(payloadData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Center Card 1: PROMINENT INPUT & ACTION SECTION */}
      <div className="dev-card bg-white p-6 sm:p-7">
        <div className="mb-5 pb-3 border-b-2 border-[#18181b]">
          <h2 className="text-base font-black text-[#18181b] uppercase tracking-tight flex items-center gap-2">
            <span>Autonomous Request Automation Engine</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#18181b] text-white">
              LIVE
            </span>
          </h2>
          <p className="text-xs text-[#52525b] mt-0.5">
            Enter natural language student requests. The engine categorizes with Gemini AI, synchronizes Notion, and executes actions.
          </p>
        </div>

        {/* Quick Fill Presets */}
        <div className="mb-4">
          <span className="text-[11px] font-mono uppercase font-bold text-[#71717a] block mb-2">
            Quick Test Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="text-xs font-mono px-3 py-1.5 rounded-lg border-2 border-[#18181b] bg-[#fcfbfa] hover:bg-[#f4f3ef] hover:shadow-[1.5px_1.5px_0px_#18181b] text-[#18181b] transition-all font-semibold"
              >
                Preset {idx + 1}: {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleRunPipeline} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="engine-username" className="block text-xs font-mono font-bold text-[#18181b] mb-1">
                STUDENT / SENDER NAME
              </label>
              <input
                id="engine-username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="dev-input font-medium"
              />
            </div>
            <div>
              <label htmlFor="engine-email" className="block text-xs font-mono font-bold text-[#18181b] mb-1">
                STUDENT EMAIL ADDRESS
              </label>
              <input
                id="engine-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="e.g. rahul@college.edu"
                className="dev-input font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="engine-prompt" className="block text-xs font-mono font-bold text-[#18181b] mb-1">
              REQUEST / COMPLAINT PROMPT (NATURAL LANGUAGE)
            </label>
            <textarea
              id="engine-prompt"
              rows={3}
              value={rawPrompt}
              onChange={(e) => setRawPrompt(e.target.value)}
              placeholder="e.g. Sir I attended the 2-day GenAI workshop yesterday but didn't receive my certificate. Please verify my attendance..."
              className="dev-input font-medium resize-none leading-relaxed"
            />
          </div>

          {submitFeedback && (
            <div
              className={`p-3 rounded-lg border-2 text-xs font-mono font-semibold ${submitFeedback.type === "success"
                  ? "bg-[#ecfdf5] border-[#059669] text-[#065f46]"
                  : "bg-[#fee2e2] border-[#dc2626] text-[#991b1b]"
                }`}
            >
              {submitFeedback.msg}
            </div>
          )}

          {/* STRONG RED PRIMARY CTA BUTTON */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <button
              type="submit"
              disabled={isSubmitting || !rawPrompt.trim()}
              className="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-black flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Run Automation Pipeline</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>

            <span className="hidden sm:inline-block text-[11px] font-mono text-[#71717a]">
              ⚡ Ingests to Notion + Triggers Real Mailer
            </span>
          </div>
        </form>
      </div>

      {/* Center Card 2: 5-STAGE PIPELINE PROGRESS */}
      <div className="dev-card bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#e2dfd6]">
          <span className="text-xs font-mono font-bold text-[#18181b] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#dc2626]" />
            Pipeline Execution Flow
          </span>
          <span className="text-[11px] font-mono text-[#71717a]">
            Active Incident: <strong className="text-[#dc2626]">{selectedEvent?.id || "REQ-108"}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {stages.map((stage, idx) => {
            const isTarget = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative ${isTarget
                    ? "bg-[#ffffff] border-[#18181b] shadow-[3px_3px_0px_#dc2626]"
                    : "bg-[#fcfbfa] border-[#e2dfd6] hover:border-[#18181b] hover:bg-white"
                  }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-[#18181b] text-white flex items-center justify-center">
                    <stage.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
                    {stage.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#18181b] truncate">{stage.title}</div>
                <div className="text-[10px] text-[#71717a] font-mono truncate">{stage.sub}</div>

                {idx < stages.length - 1 && (
                  <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-3 h-3 text-[#18181b]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Card 3: STRUCTURED OUTPUT / CONTENT PANELS */}
      <div className="dev-card bg-white p-6 space-y-5">
        {/* Output Panel Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[#18181b]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#18181b]">
              Incident Output & Clearance:
            </span>
            <span className="px-2 py-0.5 rounded bg-[#18181b] text-white text-xs font-mono font-bold">
              {selectedEvent?.id || "REQ-108"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#f4f3ef] border border-[#e2dfd6] text-xs font-mono">
            {[
              { id: "TACTICAL", label: "ANALYSIS" },
              { id: "PAYLOAD", label: "JSON SCHEMA" },
              { id: "NOTION_SYNC", label: "NOTION DB" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${viewMode === tab.id
                    ? "bg-[#18181b] text-white shadow-[1.5px_1.5px_0px_#dc2626]"
                    : "text-[#52525b] hover:text-[#18181b]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode 1: TACTICAL / ANALYSIS */}
        {viewMode === "TACTICAL" && (
          <div className="space-y-4">
            {/* Raw Complaint Panel */}
            <div className="p-4 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] mb-1.5">
                <span>RAW COMPLAINT INGESTED:</span>
                <span>From: <strong className="text-[#18181b]">{selectedEvent?.userName}</strong> ({selectedEvent?.userEmail})</span>
              </div>
              <p className="text-sm text-[#18181b] font-medium italic">
                &ldquo;{selectedEvent?.rawMessage}&rdquo;
              </p>
            </div>

            {/* AI Classification Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-[10px] text-[#71717a] block font-bold">CATEGORY</span>
                <strong className="text-xs text-[#18181b] truncate block mt-0.5">
                  {selectedEvent?.category || "CERTIFICATE_ISSUE"}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-[10px] text-[#71717a] block font-bold">AI CONFIDENCE</span>
                <strong className="text-xs text-[#059669] block mt-0.5">
                  {selectedEvent?.confidence || 98}% Accuracy
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-[10px] text-[#71717a] block font-bold">ATTENDANCE</span>
                <strong className="text-xs text-[#18181b] block mt-0.5">
                  {selectedEvent?.attendanceVerified ? "Verified (100%) ✓" : "Unverified ⚠️"}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-[10px] text-[#71717a] block font-bold">PRIORITY</span>
                <strong className="text-xs text-[#dc2626] block mt-0.5">
                  {selectedEvent?.priority || "HIGH"}
                </strong>
              </div>
            </div>

            {/* Operator Clearance Station */}
            <div className="p-4 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#18181b] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#dc2626]" />
                  Human-in-the-Loop Clearance:
                </span>
                <p className="text-xs text-[#52525b] mt-0.5">
                  {selectedEvent?.status === "WAITING_APPROVAL"
                    ? "Requires operator review before real certificate dispatch."
                    : selectedEvent?.status === "FAILED"
                      ? "Rejected by operator — request dismissed."
                      : selectedEvent?.status === "NEEDS_FIX"
                        ? "Flagged for manual data fix."
                        : "Completed and audited in Notion."}
                </p>
              </div>

              {selectedEvent?.status === "WAITING_APPROVAL" ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onApproveEvent(selectedEvent?.id)}
                    className="btn-primary py-2 px-4 text-xs font-mono font-bold bg-[#059669] hover:bg-[#047857] shadow-[2px_2px_0px_#18181b]"
                  >
                    <Check className="w-4 h-4 stroke-[3]" /> Approve & Dispatch
                  </button>
                  <button
                    onClick={() => onRejectEvent(selectedEvent?.id)}
                    className="btn-secondary py-2 px-3 text-xs font-mono font-bold text-[#dc2626] hover:bg-[#fee2e2]"
                  >
                    <X className="w-4 h-4 stroke-[3]" /> Reject
                  </button>
                </div>
              ) : selectedEvent?.status === "FAILED" ? (
                <span className="px-3 py-1.5 rounded-lg bg-[#fee2e2] border-2 border-[#dc2626] text-[#991b1b] text-xs font-mono font-bold">
                  ❌ REJECTED BY OPERATOR
                </span>
              ) : selectedEvent?.status === "NEEDS_FIX" ? (
                <span className="px-3 py-1.5 rounded-lg bg-[#fef3c7] border-2 border-[#f59e0b] text-[#92400e] text-xs font-mono font-bold">
                  ⚠️ REQUIRES DATA FIX
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-[#ecfdf5] border-2 border-[#059669] text-[#065f46] text-xs font-mono font-bold">
                  ✅ EXECUTED & SEALED
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Mode 2: JSON SCHEMA WITH COPY BUTTON */}
        {viewMode === "PAYLOAD" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#18181b] font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#dc2626]" />
                Extracted JSON Entity (Gemini AI):
              </span>
              <button
                type="button"
                onClick={handleCopyJson}
                className="btn-secondary btn-secondary-sm text-xs font-mono font-bold flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span className="text-[#059669]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#18181b]" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#18181b] text-[12px] text-[#4ade80] overflow-x-auto border-2 border-[#18181b] leading-relaxed font-mono">
              {JSON.stringify(payloadData, null, 2)}
            </pre>
          </div>
        )}

        {/* View Mode 3: NOTION SYNC */}
        {viewMode === "NOTION_SYNC" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[#18181b] font-bold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#d97706]" />
              Notion Database Synchronized Page:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">PARENT DB</span>
                <span className="text-[#18181b] font-bold">📥 Requests DB</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">SYNC STATUS</span>
                <span className="text-[#059669] font-bold">Live Synchronized</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">AUTHENTICATION</span>
                <span className="text-[#18181b] font-bold">Bot Integration Token</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">AUDIT RUN ID</span>
                <span className="text-[#dc2626] font-bold">
                  {selectedEvent?.id ? `RUN-${selectedEvent.id.replace('REQ-', '')}` : 'RUN-042'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
