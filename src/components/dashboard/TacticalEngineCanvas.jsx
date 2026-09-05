"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { EVENT_CATALOG, DEFAULT_EVENT_ID } from "@/lib/events";
import CircularEngineWheel from "@/components/dashboard/CircularEngineWheel";

export default function TacticalEngineCanvas({
  selectedEvent,
  onApproveEvent,
  onRejectEvent,
  onSimulateWebhook,
}) {
  const [activeStage, setActiveStage] = useState(3);
  const [flowLayout, setFlowLayout] = useState("WHEEL"); // WHEEL | GRID
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
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "2. Gemini AI",
      sub: "Intent Extractor",
      icon: Brain,
      status: `✓ ${selectedEvent?.confidence || 98}%`,
      color: "#8b5cf6",
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
      color: "#f59e0b",
    },
    {
      id: 4,
      title: "4. Dispatcher",
      sub: "Cert & Email",
      icon: Mail,
      status: selectedEvent?.status === "SUCCESS" ? "✓ Sent" : "Ready",
      color: "#dc2626",
    },
    {
      id: 5,
      title: "5. Run Log",
      sub: "Notion Proof",
      icon: FileCheck,
      status: "✓ Sealed",
      color: "#059669",
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="dev-card bg-[var(--bg-panel)] p-6 sm:p-7 shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
      >
        <div className="mb-5 pb-3 border-b-2 border-[var(--border-charcoal)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
              <span>Autonomous Request Automation Engine</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--border-charcoal)] text-white flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <span>LIVE</span>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
              Enter natural language student requests. The engine categorizes with Gemini AI, synchronizes Notion, and executes actions.
            </p>
          </div>

          {/* Daemon Quick Trigger Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleTriggerDaemonPoll}
            disabled={daemonLoading}
            className="btn-secondary btn-secondary-sm text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto shadow-[1.5px_1.5px_0px_var(--border-charcoal)]"
            title="Poll Notion Database for Operator Approvals"
          >
            {daemonLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#dc2626]" />
            ) : (
              <Activity className="w-3.5 h-3.5 text-[#059669]" />
            )}
            <span>Poll Notion Approvals</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {daemonFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-3 mb-4 rounded-lg border-2 text-xs font-mono font-semibold flex items-center justify-between ${
                daemonFeedback.type === "success"
                  ? "bg-[#ecfdf5] dark:bg-emerald-950/40 border-[#059669] text-[#065f46] dark:text-emerald-300"
                  : daemonFeedback.type === "error"
                  ? "bg-[#fee2e2] dark:bg-red-950/40 border-[#dc2626] text-[#991b1b] dark:text-red-300"
                  : "bg-[var(--bg-card-hover)] border-[var(--border-charcoal)] text-[var(--text-primary)]"
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Fill Presets */}
        <div className="mb-5">
          <span className="text-xs font-mono uppercase font-bold text-[var(--text-muted)] block mb-2">
            Quick Test Presets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {presets.map((p, idx) => (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApplyPreset(p)}
                className="btn-secondary btn-secondary-sm w-full text-xs font-mono text-left justify-start py-2.5 px-3 font-semibold h-full truncate shadow-[1.5px_1.5px_0px_var(--border-charcoal)]"
                title={`Preset ${idx + 1}: ${p.label}`}
              >
                <span className="font-bold text-[#dc2626] mr-1.5 flex-shrink-0">P{idx + 1}:</span>
                <span className="truncate">{p.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleRunPipeline} className="space-y-4">
          {/* Event Track Selector */}
          <div>
            <label htmlFor="engine-event" className="block text-xs font-mono font-bold text-[var(--text-primary)] mb-1.5 flex items-center gap-1.5">
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
                <option key={ev.id} value={ev.id} className="bg-[var(--bg-panel)] text-[var(--text-primary)]">
                  {ev.name} ({ev.track})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="engine-username" className="block text-xs font-mono font-bold text-[var(--text-primary)] mb-1.5">
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
              <label htmlFor="engine-email" className="block text-xs font-mono font-bold text-[var(--text-primary)] mb-1.5">
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
            <label htmlFor="engine-prompt" className="block text-xs font-mono font-bold text-[var(--text-primary)] mb-1.5">
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

          <AnimatePresence>
            {submitFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className={`p-3 rounded-lg border-2 text-xs font-mono font-semibold ${
                  submitFeedback.type === "success"
                    ? "bg-[#ecfdf5] dark:bg-emerald-950/40 border-[#059669] text-[#065f46] dark:text-emerald-300"
                    : "bg-[#fee2e2] dark:bg-red-950/40 border-[#dc2626] text-[#991b1b] dark:text-red-300"
                }`}
              >
                {submitFeedback.msg}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting || !rawPrompt.trim()}
              className="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold flex items-center justify-center gap-2 relative overflow-hidden group shadow-[2.5px_2.5px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(220,38,38,0.35)]"
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
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </>
              )}
            </motion.button>

            <span className="hidden sm:inline-block text-xs font-mono text-[var(--text-secondary)] font-medium">
              ⚡ Ingests to Notion + Triggers Real Mailer
            </span>
          </div>
        </form>
      </motion.div>

      {/* Center Card 2: 5-STAGE PIPELINE PROGRESS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.08 }}
        className="dev-card bg-[var(--bg-panel)] p-5 sm:p-6 shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#dc2626]" aria-hidden="true" />
              <span>Pipeline Execution Flow</span>
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
              • Incident: <strong className="text-[#dc2626] font-bold">{selectedEvent?.id || "REQ-108"}</strong>
            </span>
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-xs font-mono">
            <button
              type="button"
              onClick={() => setFlowLayout("WHEEL")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                flowLayout === "WHEEL"
                  ? "bg-[#18181b] dark:bg-[#dc2626] text-white shadow-[1px_1px_0px_#dc2626]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              🔄 Circular Wheel
            </button>
            <button
              type="button"
              onClick={() => setFlowLayout("GRID")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                flowLayout === "GRID"
                  ? "bg-[#18181b] dark:bg-[#dc2626] text-white shadow-[1px_1px_0px_#dc2626]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              📊 Linear Grid
            </button>
          </div>
        </div>

        {flowLayout === "WHEEL" ? (
          <CircularEngineWheel
            stages={stages}
            activeStage={activeStage}
            setActiveStage={setActiveStage}
            selectedEvent={selectedEvent}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stages.map((stage, idx) => {
              const isTarget = activeStage === stage.id;
              return (
                <motion.div
                  key={stage.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveStage(stage.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStage(stage.id);
                    }
                  }}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)] ${
                    isTarget
                      ? "bg-[var(--bg-panel)] border-[var(--border-charcoal)] shadow-[3.5px_3.5px_0px_#dc2626] dark:shadow-[0_0_15px_rgba(220,38,38,0.35),2px_2px_0px_#dc2626]"
                      : "bg-[var(--bg-panel-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-charcoal)] hover:bg-[var(--bg-panel)] hover:shadow-[2px_2px_0px_var(--border-charcoal)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-7 h-7 rounded-md bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626]"
                    >
                      <stage.icon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                      {stage.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[var(--text-primary)] truncate">{stage.title}</div>
                  <div className="text-xs text-[var(--text-muted)] font-mono truncate">{stage.sub}</div>

                  {idx < stages.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-primary)]" aria-hidden="true" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Center Card 3: STRUCTURED OUTPUT / CONTENT PANELS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.14 }}
        className="dev-card bg-[var(--bg-panel)] p-6 space-y-5 shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
      >
        {/* Output Panel Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[var(--border-charcoal)]">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-mono font-bold uppercase text-[var(--text-primary)]">
              Incident Output & Clearance:
            </h3>
            <span className="px-2.5 py-0.5 rounded bg-[#18181b] dark:bg-[#dc2626] text-white text-xs font-mono font-bold shadow-[1px_1px_0px_#dc2626]">
              {selectedEvent?.id || "REQ-108"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-xs font-mono">
            {[
              { id: "TACTICAL", label: "Analysis" },
              { id: "PAYLOAD", label: "JSON Schema" },
              { id: "NOTION_SYNC", label: "Notion DB" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setViewMode(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)] relative ${
                  viewMode === tab.id
                    ? "bg-[#18181b] dark:bg-[#dc2626] text-white shadow-[1.5px_1.5px_0px_#dc2626]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* View Mode 1: TACTICAL / ANALYSIS */}
        <AnimatePresence mode="wait">
          {viewMode === "TACTICAL" && (
            <motion.div
              key="tactical-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Raw Complaint Panel */}
              <div className="p-4 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-charcoal)]">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2 gap-1">
                  <span className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
                    <span>RAW COMPLAINT INGESTED:</span>
                  </span>
                  <span>
                    From: <strong className="text-[var(--text-primary)]">{selectedEvent?.userName}</strong> ({selectedEvent?.userEmail})
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium italic leading-relaxed">
                  &ldquo;{selectedEvent?.rawMessage}&rdquo;
                </p>
              </div>

              {/* AI Classification Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[1.5px_1.5px_0px_var(--border-charcoal)]">
                  <span className="text-xs text-[var(--text-muted)] block font-bold">CATEGORY</span>
                  <strong className="text-xs text-[var(--text-primary)] truncate block mt-1">
                    {formatDisplayCategory(selectedEvent?.category)}
                  </strong>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[1.5px_1.5px_0px_var(--border-charcoal)]">
                  <span className="text-xs text-[var(--text-muted)] block font-bold">AI CONFIDENCE</span>
                  <strong className="text-xs text-[#059669] dark:text-[#10b981] block mt-1">
                    {selectedEvent?.confidence || 98}% Accuracy
                  </strong>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[1.5px_1.5px_0px_var(--border-charcoal)]">
                  <span className="text-xs text-[var(--text-muted)] block font-bold">ATTENDANCE</span>
                  <strong className="text-xs text-[var(--text-primary)] block mt-1">
                    {selectedEvent?.attendanceVerified ? "Verified (100%) ✓" : "Unverified ⚠️"}
                  </strong>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} className="p-3 rounded-xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[1.5px_1.5px_0px_var(--border-charcoal)]">
                  <span className="text-xs text-[var(--text-muted)] block font-bold">PRIORITY</span>
                  <strong className="text-xs text-[#dc2626] block mt-1">
                    {selectedEvent?.priority || "HIGH"}
                  </strong>
                </motion.div>
              </div>

              {/* Operator Clearance Station */}
              <div className="p-4 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-charcoal)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#dc2626]" aria-hidden="true" />
                    <span>Human-in-the-Loop Clearance:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
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
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onApproveEvent(selectedEvent?.id)}
                      className="btn-success btn-success-sm text-xs font-mono shadow-[2px_2px_0px_var(--border-charcoal)]"
                    >
                      <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                      <span>Approve & Dispatch</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onRejectEvent(selectedEvent?.id)}
                      className="btn-danger btn-danger-sm text-xs font-mono shadow-[2px_2px_0px_var(--border-charcoal)]"
                    >
                      <X className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                      <span>Reject</span>
                    </motion.button>
                  </div>
                ) : selectedEvent?.status === "FAILED" ? (
                  <span className="px-3 py-1.5 rounded-lg bg-[#fee2e2] dark:bg-red-950/40 border-2 border-[#dc2626] text-[#991b1b] dark:text-red-300 text-xs font-mono font-bold">
                    ✗ Rejected by Operator
                  </span>
                ) : selectedEvent?.status === "NEEDS_FIX" ? (
                  <span className="px-3 py-1.5 rounded-lg bg-[#fef3c7] dark:bg-amber-950/40 border-2 border-[#f59e0b] text-[#92400e] dark:text-amber-300 text-xs font-mono font-bold">
                    ⚠️ Requires Data Fix
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg bg-[#ecfdf5] dark:bg-emerald-950/40 border-2 border-[#059669] text-[#065f46] dark:text-emerald-300 text-xs font-mono font-bold">
                    ✓ Executed & Sealed
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* View Mode 2: JSON SCHEMA WITH COPY BUTTON */}
          {viewMode === "PAYLOAD" && (
            <motion.div
              key="payload-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#dc2626]" aria-hidden="true" />
                  Extracted JSON Entity (Gemini AI):
                </span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyJson}
                  className="btn-secondary btn-secondary-sm text-xs font-mono font-bold flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_var(--border-charcoal)]"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
                      <span className="text-[#059669]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--text-primary)]" aria-hidden="true" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </motion.button>
              </div>
              <pre className="p-4 rounded-xl bg-[#111318] text-xs text-[#4ade80] overflow-x-auto border-2 border-[var(--border-charcoal)] leading-relaxed font-mono shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
                {JSON.stringify(payloadData, null, 2)}
              </pre>
            </motion.div>
          )}

          {/* View Mode 3: NOTION SYNC */}
          {viewMode === "NOTION_SYNC" && (
            <motion.div
              key="notion-sync-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 font-mono text-xs"
            >
              <div className="text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                <Database className="w-4 h-4 text-[#d97706]" aria-hidden="true" />
                <span>Notion Database Synchronized Page:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-charcoal)]">
                  <span className="text-[var(--text-muted)] block text-xs">PARENT DB</span>
                  <span className="text-[var(--text-primary)] font-bold">📥 Requests DB</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-charcoal)]">
                  <span className="text-[var(--text-muted)] block text-xs">SYNC STATUS</span>
                  <span className="text-[#059669] dark:text-[#10b981] font-bold">Live Synchronized</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-charcoal)]">
                  <span className="text-[var(--text-muted)] block text-xs">AUTHENTICATION</span>
                  <span className="text-[var(--text-primary)] font-bold">Bot Token</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-charcoal)]">
                  <span className="text-[var(--text-muted)] block text-xs">AUDIT RUN ID</span>
                  <span className="text-[#dc2626] font-bold">
                    {selectedEvent?.id ? `RUN-${selectedEvent.id.replace('REQ-', '')}` : 'RUN-042'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
