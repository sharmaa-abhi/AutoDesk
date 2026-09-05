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
  Zap,
  Play,
  Pause,
  RefreshCw,
  Send,
  Check,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Terminal,
  Layers,
  Sparkles,
  Calendar,
  Activity,
} from "lucide-react";
import { EVENT_CATALOG, DEFAULT_EVENT_ID } from "@/lib/events";

export default function FullPageCircularCockpit({
  events,
  selectedEvent,
  selectedEventId,
  onSelectEvent,
  onApproveEvent,
  onRejectEvent,
  onSimulateWebhook,
  stats,
  runLogs,
}) {
  const [isRotating, setIsRotating] = useState(true);
  const [speed, setSpeed] = useState(48); // seconds per full 360deg rotation (slow and continuous)
  const [isHovered, setIsHovered] = useState(false);

  // Form states for central generator
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rawPrompt, setRawPrompt] = useState("");
  const [selectedEventTrack, setSelectedEventTrack] = useState(DEFAULT_EVENT_ID);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Orbital radius in pixels for satellites
  const orbitalRadius = 350;

  const handleRunPipeline = async (e) => {
    e.preventDefault();
    if (!rawPrompt.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    const eventProfile = EVENT_CATALOG[selectedEventTrack] || EVENT_CATALOG[DEFAULT_EVENT_ID];

    try {
      await onSimulateWebhook({
        custom: true,
        userName: userName.trim() || "Student Participant",
        userEmail: userEmail.trim() || "student@college.edu",
        rawMessage: rawPrompt.trim(),
        eventId: eventProfile.id,
        eventName: eventProfile.name,
      });
      setFeedback({
        type: "success",
        msg: `Pipeline triggered! Analyzed with Gemini AI & synced to Notion.`,
      });
      setRawPrompt("");
    } catch (err) {
      setFeedback({
        type: "error",
        msg: err.message || "Pipeline execution failed.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6 Orbital Satellite Stations
  const satellites = [
    {
      id: "queue",
      angle: 0, // 12 o'clock (top)
      title: "1. Inbound Queue",
      tag: `${events.length} ACTIVE`,
      accent: "#3b82f6",
      icon: Globe,
      render: (
        <div className="space-y-2">
          <div className="text-[10px] text-[var(--text-muted)] font-mono flex items-center justify-between">
            <span>Latest: <strong className="text-[var(--text-primary)]">{events[0]?.id || "REQ-108"}</strong></span>
            <span className="text-[#059669] dark:text-[#10b981] font-bold">● Live Ingest</span>
          </div>
          <p className="text-xs text-[var(--text-primary)] font-medium line-clamp-2 italic">
            &ldquo;{selectedEvent?.rawMessage || "Waiting for student request..."}&rdquo;
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
            <span>From: <strong className="text-[var(--text-primary)]">{selectedEvent?.userName || "Student"}</strong></span>
            <span className="text-[#dc2626] font-bold">{selectedEvent?.time || "Now"}</span>
          </div>
        </div>
      ),
    },
    {
      id: "ai",
      angle: 60, // 2 o'clock
      title: "2. Gemini 3.6 AI",
      tag: `${selectedEvent?.confidence || 98}% ACCURACY`,
      accent: "#8b5cf6",
      icon: Brain,
      render: (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span>Category:</span>
            <strong className="text-[var(--text-primary)]">{selectedEvent?.category || "CERTIFICATE_ISSUE"}</strong>
          </div>
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span>Roster Check:</span>
            <strong className="text-[#059669] dark:text-[#10b981]">
              {selectedEvent?.attendanceVerified ? "Verified (100%) ✓" : "Unverified ⚠️"}
            </strong>
          </div>
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span>Priority:</span>
            <strong className="text-[#dc2626]">{selectedEvent?.priority || "HIGH"}</strong>
          </div>
        </div>
      ),
    },
    {
      id: "hitl",
      angle: 120, // 4 o'clock
      title: "3. Notion Clearance",
      tag: selectedEvent?.status === "SUCCESS" ? "APPROVED" : "REVIEW",
      accent: "#f59e0b",
      icon: UserCheck,
      render: (
        <div className="space-y-2">
          <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
            {selectedEvent?.status === "WAITING_APPROVAL"
              ? "Operator clearance required to dispatch."
              : selectedEvent?.status === "SUCCESS"
              ? "Completed & sealed by operator."
              : "Incident resolved."}
          </p>
          {selectedEvent?.status === "WAITING_APPROVAL" ? (
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onApproveEvent(selectedEvent?.id);
                }}
                className="btn-success btn-success-sm text-[10px] font-mono py-1 px-2 flex-1 shadow-[1px_1px_0px_var(--border-charcoal)]"
              >
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Approve</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRejectEvent(selectedEvent?.id);
                }}
                className="btn-danger btn-danger-sm text-[10px] font-mono py-1 px-2 flex-1 shadow-[1px_1px_0px_var(--border-charcoal)]"
              >
                <X className="w-3 h-3 stroke-[3]" />
                <span>Reject</span>
              </button>
            </div>
          ) : (
            <div className="text-[11px] font-mono font-bold text-[#059669] dark:text-[#10b981] bg-[#ecfdf5] dark:bg-emerald-950/40 p-1.5 rounded text-center border border-[#059669]/30">
              ✓ Status: {selectedEvent?.status || "SUCCESS"}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "dispatcher",
      angle: 180, // 6 o'clock (bottom)
      title: "4. Real Action Dispatch",
      tag: "SMTP / RESEND",
      accent: "#dc2626",
      icon: Mail,
      render: (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span>Payload:</span>
            <strong className="text-[var(--text-primary)]">HTML/SVG Cert</strong>
          </div>
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span>Recipient:</span>
            <strong className="text-[var(--text-primary)] truncate max-w-[120px]">
              {selectedEvent?.userEmail || "rahul.sharma@gmail.com"}
            </strong>
          </div>
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span>Dispatch:</span>
            <strong className="text-[#059669] dark:text-[#10b981]">
              {selectedEvent?.status === "SUCCESS" ? "Sent ✓" : "Queued"}
            </strong>
          </div>
        </div>
      ),
    },
    {
      id: "runlog",
      angle: 240, // 8 o'clock
      title: "5. Notion Run Log",
      tag: "BOT PROOF",
      accent: "#059669",
      icon: FileCheck,
      render: (
        <div className="space-y-1.5 text-[11px] font-mono">
          <div className="flex justify-between text-[var(--text-muted)]">
            <span>Audit Proof ID:</span>
            <strong className="text-[var(--text-primary)]">{runLogs[0]?.runId || "RUN-0045"}</strong>
          </div>
          <p className="text-xs text-[var(--text-primary)] line-clamp-2 leading-tight">
            {runLogs[0]?.action || "Verified Certificate Dispatched to student"}
          </p>
          <div className="text-[10px] text-[#059669] dark:text-[#10b981] font-bold flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
            <span>Bot Signed</span>
            <span>{runLogs[0]?.duration || "1,240"}ms</span>
          </div>
        </div>
      ),
    },
    {
      id: "sla",
      angle: 300, // 10 o'clock
      title: "6. SLA & Performance",
      tag: "99.8% UPTIME",
      accent: "#6366f1",
      icon: Activity,
      render: (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="grid grid-cols-2 gap-1.5 text-center">
            <div className="p-1 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
              <span className="text-[9px] text-[var(--text-muted)] block">LATENCY</span>
              <strong className="text-xs text-[var(--text-primary)]">1.42s</strong>
            </div>
            <div className="p-1 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]">
              <span className="text-[9px] text-[var(--text-muted)] block">ACCURACY</span>
              <strong className="text-xs text-[#dc2626]">98.6%</strong>
            </div>
          </div>
          <div className="text-[10px] text-[#059669] dark:text-[#10b981] font-bold text-center">
            ● 24/7 Autonomous Daemon
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[920px] py-4 overflow-hidden select-none">
      {/* Top Floating Radar Control Bar */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 px-4 mb-6 z-40">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(5,150,105,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
            </span>
            <span className="font-bold">360° Circular Radar Cockpit</span>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
            Active: <strong className="text-[#dc2626] font-bold">{selectedEvent?.id || "REQ-108"}</strong>
          </span>
        </div>

        {/* Orbit Wheel Controls */}
        <div className="flex items-center gap-2 bg-[var(--bg-panel)] p-1.5 rounded-xl border-2 border-[var(--border-charcoal)] shadow-[2px_2px_0px_var(--border-charcoal)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.6)] text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="px-3 py-1 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-charcoal)] text-[var(--text-primary)] font-bold flex items-center gap-1.5 hover:bg-[var(--bg-panel)] shadow-[1px_1px_0px_var(--border-charcoal)] transition-all cursor-pointer"
          >
            {isRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>Pause Orbit</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#059669]" />
                <span>Resume Orbit</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSpeed((prev) => (prev === 48 ? 24 : prev === 24 ? 72 : 48))}
            className="px-2.5 py-1 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold hover:border-[var(--border-charcoal)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title="Toggle Orbital Speed"
          >
            Speed: {speed === 72 ? "0.5x" : speed === 48 ? "1x (Slow)" : "2x"}
          </button>
        </div>
      </div>

      {/* GIANT CIRCULAR UNIVERSE VIEWPORT */}
      <div
        className="relative w-[780px] h-[780px] sm:w-[860px] sm:h-[860px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Radar Conentric Circles and Grid Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 860 860"
          fill="none"
          aria-hidden="true"
        >
          {/* Outer Major Orbit Ring */}
          <circle
            cx="430"
            cy="430"
            r={orbitalRadius}
            stroke="currentColor"
            className="text-[var(--border-charcoal)]"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.35"
          />

          {/* Middle Ring */}
          <circle
            cx="430"
            cy="430"
            r={orbitalRadius * 0.65}
            stroke="currentColor"
            className="text-[var(--border-charcoal)]"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.22"
          />

          {/* Inner Ring */}
          <circle
            cx="430"
            cy="430"
            r={orbitalRadius * 0.35}
            stroke="currentColor"
            className="text-[var(--border-charcoal)]"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.18"
          />

          {/* 360° Radar Crosshairs */}
          <line x1="430" y1="40" x2="430" y2="820" stroke="currentColor" className="text-[var(--border-charcoal)]" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          <line x1="40" y1="430" x2="820" y2="430" stroke="currentColor" className="text-[var(--border-charcoal)]" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          <line x1="154" y1="154" x2="706" y2="706" stroke="currentColor" className="text-[var(--border-charcoal)]" strokeWidth="1" strokeDasharray="4 4" opacity="0.12" />
          <line x1="706" y1="154" x2="154" y2="706" stroke="currentColor" className="text-[var(--border-charcoal)]" strokeWidth="1" strokeDasharray="4 4" opacity="0.12" />
        </svg>

        {/* Ambient Glowing Orbs */}
        <div className="absolute w-96 h-96 rounded-full bg-[#dc2626]/15 dark:bg-[#dc2626]/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute w-[32rem] h-[32rem] rounded-full bg-[#059669]/12 dark:bg-[#059669]/18 blur-3xl pointer-events-none" />

        {/* ROTATING SATELLITE ORBIT CONTAINER */}
        <motion.div
          animate={
            isRotating
              ? { rotate: 360 }
              : {}
          }
          transition={
            isRotating
              ? {
                  repeat: Infinity,
                  duration: isHovered ? speed * 2.8 : speed,
                  ease: "linear",
                }
              : { duration: 0 }
          }
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto"
        >
          {/* 6 Radial Satellite Stations */}
          {satellites.map((sat) => {
            const angleRad = ((sat.angle - 90) * Math.PI) / 180;
            const x = Math.round(orbitalRadius * Math.cos(angleRad));
            const y = Math.round(orbitalRadius * Math.sin(angleRad));

            return (
              <div
                key={sat.id}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className="absolute z-30"
              >
                {/* COUNTER-ROTATE SO SATELLITE CARDS STAY UPRIGHT AND CLICKABLE */}
                <motion.div
                  animate={
                    isRotating
                      ? { rotate: -360 }
                      : {}
                  }
                  transition={
                    isRotating
                      ? {
                          repeat: Infinity,
                          duration: isHovered ? speed * 2.8 : speed,
                          ease: "linear",
                        }
                      : { duration: 0 }
                  }
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-[220px] sm:w-[240px] p-4 rounded-2xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.85),2px_2px_0px_var(--border-charcoal)] hover:shadow-[6px_6px_0px_var(--border-charcoal)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.95),0_0_20px_rgba(220,38,38,0.3)] transition-all cursor-pointer relative overflow-hidden group"
                >
                  {/* Top Color Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: sat.accent }}
                  />

                  {/* Satellite Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-md text-white flex items-center justify-center shadow-[1px_1px_0px_var(--border-charcoal)]"
                        style={{ backgroundColor: sat.accent }}
                      >
                        <sat.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)] leading-none">
                        {sat.title}
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
                      style={{ color: sat.accent, borderColor: `${sat.accent}55`, backgroundColor: `${sat.accent}15` }}
                    >
                      {sat.tag}
                    </span>
                  </div>

                  {/* Satellite Content */}
                  {sat.render}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* STATIC CENTER ENGINE CORE (SUN / HUB) */}
        <div className="relative z-40 w-[290px] sm:w-[320px] p-5 rounded-3xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[6px_6px_0px_var(--border-charcoal)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(220,38,38,0.3)] flex flex-col justify-between overflow-hidden">
          {/* Top light sweep indicator */}
          <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#dc2626] via-[#059669] to-[#2563eb]" />

          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626] dark:shadow-[0_0_10px_#dc2626]">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight">
                  AutoDesk<span className="text-[#dc2626]">.Core</span>
                </h2>
                <span className="text-[9px] font-mono text-[var(--text-muted)] block">
                  Autonomous Triage Hub
                </span>
              </div>
            </div>
            <span className="badge-live text-[9px] py-0.5 px-2">
              <span className="badge-live-dot" />
              <span>LIVE</span>
            </span>
          </div>

          {/* Central Live Request Trigger Form */}
          <form onSubmit={handleRunPipeline} className="space-y-2.5">
            <div>
              <label htmlFor="core-track" className="block text-[10px] font-mono font-bold text-[var(--text-primary)] mb-1">
                EVENT TRACK
              </label>
              <select
                id="core-track"
                value={selectedEventTrack}
                onChange={(e) => setSelectedEventTrack(e.target.value)}
                className="dev-input text-xs py-1.5 px-2 font-medium cursor-pointer"
              >
                {Object.values(EVENT_CATALOG).map((ev) => (
                  <option key={ev.id} value={ev.id} className="bg-[var(--bg-panel)] text-[var(--text-primary)]">
                    {ev.shortName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="core-prompt" className="block text-[10px] font-mono font-bold text-[var(--text-primary)] mb-1">
                STUDENT NATURAL PROMPT
              </label>
              <textarea
                id="core-prompt"
                rows={2}
                value={rawPrompt}
                onChange={(e) => setRawPrompt(e.target.value)}
                placeholder="e.g. Attended AI masterclass, need certificate urgently..."
                className="dev-input text-xs py-1.5 px-2 resize-none leading-snug"
              />
            </div>

            {feedback && (
              <div
                className={`p-2 rounded text-[10px] font-mono font-bold ${
                  feedback.type === "success"
                    ? "bg-[#ecfdf5] dark:bg-emerald-950/40 text-[#065f46] dark:text-emerald-300 border border-[#059669]"
                    : "bg-[#fee2e2] dark:bg-red-950/40 text-[#991b1b] dark:text-red-300 border border-[#dc2626]"
                }`}
              >
                {feedback.msg}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || !rawPrompt.trim()}
              className="btn-primary w-full py-2 text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Run Autonomous Pipeline</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Info Footer */}
          <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>Active Queue: <strong className="text-[var(--text-primary)]">{events.length}</strong></span>
            <span className="text-[#059669] dark:text-[#10b981] font-bold">100% Audited</span>
          </div>
        </div>
      </div>

      {/* Bottom helper notification */}
      <div className="text-center mt-4 text-xs font-mono text-[var(--text-muted)] flex items-center justify-center gap-2">
        <span>💡 Hover anywhere on the wheel to slow down & interact with orbital stations.</span>
      </div>
    </div>
  );
}
