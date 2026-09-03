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
  Copy,
  CheckCheck,
  RefreshCw,
  Play,
  Calendar,
  Activity,
} from "lucide-react";
import { EVENT_CATALOG, DEFAULT_EVENT_ID } from "@/lib/events";

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
  const [selectedEventId, setSelectedEventId] = useState(DEFAULT_EVENT_ID);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);
  const [daemonLoading, setDaemonLoading] = useState(false);
  const [daemonFeedback, setDaemonFeedback] = useState(null);

  const stages = [
    {
      id: 1,
      title: "1. Ingest",
      sub: "Sanitize & Hash",
      icon: Globe,
      status: "✓ Ready",
    },
    {
      id: 2,
      title: "2. Gemini AI",
      sub: "Intent Extractor",
      icon: Brain,
      status: `✓ ${selectedEvent?.confidence || 98}%`,
    },
    {
      id: 3,
      title: "3. Notion Queue",
      sub: "Operator Decision",
      icon: Database,
      status:
        selectedEvent?.status === "SUCCESS"
          ? "✓ Approved"
          : selectedEvent?.status === "FAILED"
          ? "✗ Rejected"
          : "Review",
    },
    {
      id: 4,
      title: "4. Dispatcher",
      sub: "Cert & Email",
      icon: Mail,
      status: selectedEvent?.status === "SUCCESS" ? "✓ Sent" : "Ready",
    },
    {
      id: 5,
      title: "5. Run Log",
      sub: "Notion Proof",
      icon: FileCheck,
      status: "✓ Sealed",
    },
  ];

  const presets = [
    {
      label: "GenAI Certificate Missing",
      name: "Rahul Sharma",
      email: "rahul.sharma24@gmail.com",
      eventId: "ai-masterclass",
      msg: "Sir, I attended both Day 1 and Day 2 of the GenAI & Agentic AI Workshop. My attendance was marked at the venue, but I have not received my completion certificate email yet. Please verify and issue.",
    },
    {
      label: "Hackathon Finalist Delivery",
      name: "Priya Verma",
      email: "priya.verma.cse@iitd.ac.in",
      eventId: "automate-india-2026",
      msg: "Hello team, our team 'NeuralCoders' secured 2nd position in the National Hackathon 2026 track. Requesting official merit certificate dispatch to registered team email.",
    },
    {
      label: "Web3 Attendance Fix",
      name: "Sneha Patel",
      email: "sneha.patel@dtu.ac.in",
      eventId: "web3-builders",
      msg: "Respected organizers, I attended the complete Web3 Smart Contracts track yesterday. During the closing session, the QR attendance scanner timed out. Kindly verify my attendance via the submitted project link and issue the verified badge.",
    },
  ];

  const handleApplyPreset = (p) => {
    setUserName(p.name);
    setUserEmail(p.email);
    setRawPrompt(p.msg);
    if (p.eventId) setSelectedEventId(p.eventId);
    setSubmitFeedback(null);
  };

  const handleRunPipeline = async (e) => {
    e.preventDefault();
    if (!rawPrompt.trim()) return;

    setIsSubmitting(true);
    setSubmitFeedback(null);

    const eventProfile = EVENT_CATALOG[selectedEventId] || EVENT_CATALOG[DEFAULT_EVENT_ID];

    try {
      await onSimulateWebhook({
        custom: true,
        userName: userName.trim() || "Student Participant",
        userEmail: userEmail.trim() || "student@college.edu",
        rawMessage: rawPrompt.trim(),
        eventId: eventProfile.id,
        eventName: eventProfile.name,
      });
      setSubmitFeedback({
        type: "success",
        msg: `Pipeline executed for [${eventProfile.shortName}]! Ingested into Notion & analyzed with Gemini AI.`,
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

  const handleTriggerDaemonPoll = async () => {
    setDaemonLoading(true);
    setDaemonFeedback(null);

    try {
      const res = await fetch("/api/cron/poll-notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Daemon poll failed");

      if (data.itemsProcessed > 0) {
        setDaemonFeedback({
          type: "success",
          msg: `Daemon processed ${data.itemsProcessed} approved request(s) in ${data.durationMs}ms!`,
        });
      } else {
        setDaemonFeedback({
          type: "info",
          msg: `Daemon poll finished in ${data.durationMs || 0}ms. No pending 'Approved' tickets in Notion.`,
        });
      }
    } catch (err) {
      setDaemonFeedback({
        type: "error",
        msg: `Daemon trigger failed: ${err.message}`,
      });
    } finally {
      setDaemonLoading(false);
    }
  };

  const formatDisplayCategory = (cat) => {
    if (!cat) return "Certificate Issue";
    if (cat === "CERTIFICATE_ISSUE") return "Certificate Issue";
    if (cat === "ATTENDANCE_FIX") return "Attendance Verification";
    if (cat === "UNCLASSIFIED_DATA") return "Unclassified Data";
    return cat.replace(/_/g, " ");
  };

  const activeEventProfile = EVENT_CATALOG[selectedEventId] || EVENT_CATALOG[DEFAULT_EVENT_ID];

  const payloadData = {
    request_id: selectedEvent?.id || "REQ-108",
    event_id: activeEventProfile.id,
    event_name: activeEventProfile.name,
    user_name: selectedEvent?.userName || "Rahul Sharma",
    user_email: selectedEvent?.userEmail || "rahul.sharma24@gmail.com",
    intent: selectedEvent?.category || "CERTIFICATE_ISSUE",
    confidence_score: selectedEvent?.confidence
      ? Number((selectedEvent.confidence / 100).toFixed(2))
      : 0.98,
    status: selectedEvent?.status || "WAITING_APPROVAL",
    attendance_verified: !!selectedEvent?.attendanceVerified,
    action_spec: {
      type: selectedEvent?.actionPreview || "Generate PDF + Email",
      template: `${activeEventProfile.id}_certificate.html`,
      recipient: selectedEvent?.userEmail || "rahul.sharma24@gmail.com",
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
        <div className="mb-5 pb-3 border-b-2 border-[#18181b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#18181b] tracking-tight flex items-center gap-2">
              <span>Autonomous Request Automation Engine</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#18181b] text-white">
                LIVE
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#52525b] mt-1 leading-relaxed">
              Enter natural language student requests. The engine categorizes with Gemini AI, synchronizes Notion, and executes actions.
            </p>
          </div>

          {/* Daemon Quick Trigger Button */}
          <button
            type="button"
            onClick={handleTriggerDaemonPoll}
            disabled={daemonLoading}
            className="btn-secondary btn-secondary-sm text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto"
            title="Poll Notion Database for Operator Approvals"
          >
            {daemonLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#dc2626]" />
            ) : (
              <Activity className="w-3.5 h-3.5 text-[#059669]" />
            )}
            <span>Poll Notion Approvals</span>
          </button>
        </div>

        {daemonFeedback && (
          <div
            className={`p-3 mb-4 rounded-lg border-2 text-xs font-mono font-semibold flex items-center justify-between ${
              daemonFeedback.type === "success"
                ? "bg-[#ecfdf5] border-[#059669] text-[#065f46]"
                : daemonFeedback.type === "error"
                ? "bg-[#fee2e2] border-[#dc2626] text-[#991b1b]"
                : "bg-[#f4f3ef] border-[#18181b] text-[#18181b]"
            }`}
          >
            <span>🤖 {daemonFeedback.msg}</span>
            <button
              type="button"
              onClick={() => setDaemonFeedback(null)}
              className="text-xs underline ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Quick Fill Presets */}
        <div className="mb-5">
          <span className="text-xs font-mono uppercase font-bold text-[#71717a] block mb-2">
            Quick Test Presets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="btn-secondary btn-secondary-sm w-full text-xs font-mono text-left justify-start py-2.5 px-3 font-semibold h-full truncate"
                title={`Preset ${idx + 1}: ${p.label}`}
              >
                <span className="font-bold text-[#dc2626] mr-1.5 flex-shrink-0">P{idx + 1}:</span>
                <span className="truncate">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleRunPipeline} className="space-y-4">
          {/* Event Track Selector */}
          <div>
            <label htmlFor="engine-event" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#dc2626]" aria-hidden="true" />
              <span>EVENT / WORKSHOP TRACK</span>
            </label>
            <select
              id="engine-event"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="dev-input font-medium cursor-pointer"
            >
              {Object.values(EVENT_CATALOG).map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name} ({ev.track})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engine-username" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5">
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
              <label htmlFor="engine-email" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5">
                STUDENT EMAIL ADDRESS
              </label>
              <input
                id="engine-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="e.g. rahul.sharma24@gmail.com"
                className="dev-input font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="engine-prompt" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5">
              REQUEST / COMPLAINT PROMPT (NATURAL LANGUAGE)
            </label>
            <textarea
              id="engine-prompt"
              rows={3}
              value={rawPrompt}
              onChange={(e) => setRawPrompt(e.target.value)}
              placeholder="e.g. Sir I attended the 2-day GenAI workshop yesterday but didn't receive my certificate. Please verify my attendance..."
              className="dev-input font-medium resize-none leading-relaxed text-xs sm:text-sm"
            />
          </div>

          {submitFeedback && (
            <div
              className={`p-3 rounded-lg border-2 text-xs font-mono font-semibold ${
                submitFeedback.type === "success"
                  ? "bg-[#ecfdf5] border-[#059669] text-[#065f46]"
                  : "bg-[#fee2e2] border-[#dc2626] text-[#991b1b]"
              }`}
            >
              {submitFeedback.msg}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <button
              type="submit"
              disabled={isSubmitting || !rawPrompt.trim()}
              className="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                  <span>Processing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Run Automation Pipeline</span>
                  <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
                </>
              )}
            </button>

            <span className="hidden sm:inline-block text-xs font-mono text-[#52525b] font-medium">
              ⚡ Ingests to Notion + Triggers Real Mailer
            </span>
          </div>
        </form>
      </div>

      {/* Center Card 2: 5-STAGE PIPELINE PROGRESS */}
      <div className="dev-card bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e2dfd6]">
          <h3 className="text-xs font-mono font-bold text-[#18181b] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#dc2626]" aria-hidden="true" />
            <span>Pipeline Execution Flow</span>
          </h3>
          <span className="text-xs font-mono text-[#71717a]">
            Active Incident: <strong className="text-[#dc2626]">{selectedEvent?.id || "REQ-108"}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const isTarget = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveStage(stage.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStage(stage.id);
                  }
                }}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative focus-visible:outline-2 focus-visible:outline-[#18181b] ${
                  isTarget
                    ? "bg-[#ffffff] border-[#18181b] shadow-[3px_3px_0px_#dc2626]"
                    : "bg-[#fcfbfa] border-[#e2dfd6] hover:border-[#18181b] hover:bg-white hover:shadow-[1.5px_1.5px_0px_#18181b]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-md bg-[#18181b] text-white flex items-center justify-center">
                    <stage.icon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
                    {stage.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#18181b] truncate">{stage.title}</div>
                <div className="text-xs text-[#71717a] font-mono truncate">{stage.sub}</div>

                {idx < stages.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-[#18181b]" aria-hidden="true" />
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
            <h3 className="text-xs font-mono font-bold uppercase text-[#18181b]">
              Incident Output & Clearance:
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#18181b] text-white text-xs font-mono font-bold">
              {selectedEvent?.id || "REQ-108"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#f4f3ef] border border-[#e2dfd6] text-xs font-mono">
            {[
              { id: "TACTICAL", label: "Analysis" },
              { id: "PAYLOAD", label: "JSON Schema" },
              { id: "NOTION_SYNC", label: "Notion DB" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setViewMode(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-[#18181b] ${
                  viewMode === tab.id
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
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#71717a] mb-2 gap-1">
                <span className="font-bold">RAW COMPLAINT INGESTED:</span>
                <span>
                  From: <strong className="text-[#18181b]">{selectedEvent?.userName}</strong> ({selectedEvent?.userEmail})
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#18181b] font-medium italic leading-relaxed">
                &ldquo;{selectedEvent?.rawMessage}&rdquo;
              </p>
            </div>

            {/* AI Classification Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-xs text-[#71717a] block font-bold">CATEGORY</span>
                <strong className="text-xs text-[#18181b] truncate block mt-1">
                  {formatDisplayCategory(selectedEvent?.category)}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-xs text-[#71717a] block font-bold">AI CONFIDENCE</span>
                <strong className="text-xs text-[#059669] block mt-1">
                  {selectedEvent?.confidence || 98}% Accuracy
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-xs text-[#71717a] block font-bold">ATTENDANCE</span>
                <strong className="text-xs text-[#18181b] block mt-1">
                  {selectedEvent?.attendanceVerified ? "Verified (100%) ✓" : "Unverified ⚠️"}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-xs text-[#71717a] block font-bold">PRIORITY</span>
                <strong className="text-xs text-[#dc2626] block mt-1">
                  {selectedEvent?.priority || "HIGH"}
                </strong>
              </div>
            </div>

            {/* Operator Clearance Station */}
            <div className="p-4 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#18181b] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#dc2626]" aria-hidden="true" />
                  Human-in-the-Loop Clearance:
                </span>
                <p className="text-xs sm:text-sm text-[#52525b] mt-1 leading-relaxed">
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
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onApproveEvent(selectedEvent?.id)}
                    className="btn-success btn-success-sm text-xs font-mono"
                  >
                    <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                    <span>Approve & Dispatch</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRejectEvent(selectedEvent?.id)}
                    className="btn-danger btn-danger-sm text-xs font-mono"
                  >
                    <X className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                    <span>Reject</span>
                  </button>
                </div>
              ) : selectedEvent?.status === "FAILED" ? (
                <span className="px-3 py-1.5 rounded-lg bg-[#fee2e2] border-2 border-[#dc2626] text-[#991b1b] text-xs font-mono font-bold">
                  ✗ Rejected by Operator
                </span>
              ) : selectedEvent?.status === "NEEDS_FIX" ? (
                <span className="px-3 py-1.5 rounded-lg bg-[#fef3c7] border-2 border-[#f59e0b] text-[#92400e] text-xs font-mono font-bold">
                  ⚠️ Requires Data Fix
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-[#ecfdf5] border-2 border-[#059669] text-[#065f46] text-xs font-mono font-bold">
                  ✓ Executed & Sealed
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
                <Terminal className="w-4 h-4 text-[#dc2626]" aria-hidden="true" />
                Extracted JSON Entity (Gemini AI):
              </span>
              <button
                type="button"
                onClick={handleCopyJson}
                className="btn-secondary btn-secondary-sm text-xs font-mono font-bold flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
                    <span className="text-[#059669]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#18181b]" aria-hidden="true" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#18181b] text-xs text-[#4ade80] overflow-x-auto border-2 border-[#18181b] leading-relaxed font-mono">
              {JSON.stringify(payloadData, null, 2)}
            </pre>
          </div>
        )}

        {/* View Mode 3: NOTION SYNC */}
        {viewMode === "NOTION_SYNC" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[#18181b] font-bold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#d97706]" aria-hidden="true" />
              <span>Notion Database Synchronized Page:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-xs">PARENT DB</span>
                <span className="text-[#18181b] font-bold">📥 Requests DB</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-xs">SYNC STATUS</span>
                <span className="text-[#059669] font-bold">Live Synchronized</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-xs">AUTHENTICATION</span>
                <span className="text-[#18181b] font-bold">Bot Token</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-xs">AUDIT RUN ID</span>
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
