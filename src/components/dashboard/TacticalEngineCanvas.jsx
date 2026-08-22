"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  Brain,
  Database,
  UserCheck,
  Mail,
  FileCheck,
  ShieldAlert,
  Sparkles,
  Check,
  X,
  Play,
  RotateCcw,
  Layers,
  ArrowRight,
  Terminal,
} from "lucide-react";

export default function TacticalEngineCanvas({
  selectedEvent,
  onApproveEvent,
  onRejectEvent,
  onSimulateWebhook,
}) {
  const [activeStage, setActiveStage] = useState(3); // default highlight on human approval
  const [viewMode, setViewMode] = useState("TACTICAL"); // TACTICAL | PAYLOAD | NOTION_SYNC

  const stages = [
    {
      id: 1,
      title: "1. Webhook Ingest",
      sub: "Sanitize & MD5 Hash",
      icon: Globe,
      color: "text-cyan-accent",
      border: "border-cyan-accent/30",
      bg: "bg-cyan-accent/10",
      status: "PASS",
    },
    {
      id: 2,
      title: "2. Gemini 1.5 Flash",
      sub: "Extract Intent & Schema",
      icon: Brain,
      color: "text-violet-accent",
      border: "border-violet-accent/30",
      bg: "bg-violet-accent/10",
      status: `${selectedEvent?.confidence || 94}% CONF`,
    },
    {
      id: 3,
      title: "3. Notion Queue",
      sub: "Human-in-the-Loop HQ",
      icon: Database,
      color: "text-amber-accent",
      border: "border-amber-accent/40",
      bg: "bg-amber-accent/15",
      status: selectedEvent?.status || "WAITING",
    },
    {
      id: 4,
      title: "4. Real Dispatcher",
      sub: "PDFKit + Resend SMTP",
      icon: Mail,
      color: "text-crimson-accent",
      border: "border-crimson-accent/30",
      bg: "bg-crimson-accent/10",
      status: "DISPATCH READY",
    },
    {
      id: 5,
      title: "5. Notion Run Log",
      sub: "Bot Token Verified Audit",
      icon: FileCheck,
      color: "text-emerald-accent",
      border: "border-emerald-accent/30",
      bg: "bg-emerald-accent/10",
      status: "AUDIT PROOF",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-panel border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Tactical Pitch Canvas Header */}
      <div className="p-4 border-b border-border-subtle bg-panel-elevated/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
            <Layers className="w-4 h-4 text-cyan-accent" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-text-white tracking-wide flex items-center gap-2">
              TACTICAL EXECUTION FIELD
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-accent/15 text-cyan-accent font-bold border border-cyan-accent/30">
                2D RADAR
              </span>
            </h2>
            <p className="text-[11px] text-text-muted font-mono">
              ACTIVE TRACE: <span className="text-gold font-bold">{selectedEvent?.id || "REQ-108"}</span>
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-canvas border border-border-subtle text-xs font-mono">
          {["TACTICAL", "PAYLOAD", "NOTION_SYNC"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                viewMode === mode
                  ? "bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30 shadow-sm"
                  : "text-text-secondary hover:text-text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Center 2D Tactical Field Canvas */}
      <div className="relative flex-1 p-6 bg-canvas overflow-hidden flex flex-col justify-between min-h-[460px]">
        {/* Tactical Pitch Background Grid Lines Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 229, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 229, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Tactical Field Center Circle and Coordinate Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-cyan-accent/10 pointer-events-none flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-dashed border-cyan-accent/15" />
          <div className="absolute top-0 bottom-0 w-[1px] bg-cyan-accent/10" />
          <div className="absolute left-0 right-0 h-[1px] bg-cyan-accent/10" />
        </div>

        {/* Glowing Vector Telemetry Lines Connecting Stages */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const isTarget = activeStage === stage.id;
            return (
              <motion.div
                key={stage.id}
                whileHover={{ scale: 1.03, y: -2 }}
                onClick={() => setActiveStage(stage.id)}
                className={`relative p-3.5 rounded-xl border transition-all cursor-pointer backdrop-blur-md ${
                  isTarget
                    ? `${stage.bg} ${stage.border} ring-2 ring-gold/40 shadow-[0_0_25px_rgba(0,229,255,0.15)]`
                    : "bg-panel-elevated/70 border-border-subtle hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg ${stage.bg} border ${stage.border} flex items-center justify-center`}>
                    <stage.icon className={`w-4 h-4 ${stage.color}`} />
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-canvas/80 text-text-secondary border border-border-subtle">
                    {stage.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-text-white truncate">{stage.title}</div>
                <div className="text-[10px] text-text-muted font-mono truncate">{stage.sub}</div>

                {/* Connector Arrow to next stage */}
                {idx < stages.length - 1 && (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-cyan-accent/60">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Live Inspected Payload / Decision Center */}
        <div className="relative z-10 my-4 p-4 rounded-xl bg-panel-elevated/80 border border-border-subtle backdrop-blur-xl">
          {viewMode === "TACTICAL" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Request Metadata */}
              <div className="md:col-span-7 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-gold font-bold">{selectedEvent?.id}</span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-white font-semibold">{selectedEvent?.userName}</span>
                  <span className="text-cyan-accent">({selectedEvent?.userEmail})</span>
                </div>
                <div className="p-2.5 rounded-lg bg-canvas/90 border border-border-subtle font-mono text-xs text-text-secondary leading-relaxed">
                  <span className="text-text-muted block text-[10px] uppercase font-bold text-cyan-accent mb-0.5">
                    RAW INGESTED USER MESSAGE:
                  </span>
                  &ldquo;{selectedEvent?.rawMessage}&rdquo;
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-violet-accent/15 text-violet-accent border border-violet-accent/30 font-semibold">
                    Category: {selectedEvent?.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-accent/15 text-emerald-accent border border-emerald-accent/30 font-semibold">
                    Attendance: {selectedEvent?.attendanceVerified ? "Verified (92%) ✅" : "Unverified ⚠️"}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-accent/15 text-amber-accent border border-amber-accent/30 font-semibold">
                    Priority: {selectedEvent?.priority || "HIGH"}
                  </span>
                </div>
              </div>

              {/* Human-in-the-Loop Direct Action Station */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-xl bg-canvas/70 border border-border-subtle text-center">
                <span className="text-[11px] font-mono uppercase text-amber-accent font-bold mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Operator Decision Station
                </span>
                <p className="text-[11px] text-text-muted mb-3 font-mono">
                  {selectedEvent?.status === "WAITING_APPROVAL"
                    ? "Paused in Notion — Requires human clearance"
                    : "Action processed and sealed with Run Log"}
                </p>

                {selectedEvent?.status === "WAITING_APPROVAL" ? (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => onApproveEvent(selectedEvent?.id)}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-accent/20 hover:bg-emerald-accent/30 text-emerald-accent border border-emerald-accent/40 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,230,118,0.2)] flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> APPROVE
                    </button>
                    <button
                      onClick={() => onRejectEvent(selectedEvent?.id)}
                      className="py-2 px-3 rounded-lg bg-crimson-accent/20 hover:bg-crimson-accent/30 text-crimson-accent border border-crimson-accent/40 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> REJECT
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-2 rounded-lg bg-emerald-accent/10 border border-emerald-accent/30 text-emerald-accent font-mono text-xs font-bold">
                    ✅ EXECUTED & AUDITED #RUN-042
                  </div>
                )}
              </div>
            </div>
          )}

          {viewMode === "PAYLOAD" && (
            <div className="space-y-2 font-mono text-xs">
              <div className="text-cyan-accent font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                EXTRACTED JSON SCHEMA (Gemini 1.5 Flash Mode):
              </div>
              <pre className="p-3 rounded-lg bg-canvas text-[11px] text-emerald-accent overflow-x-auto border border-border-subtle leading-relaxed">
{`{
  "request_id": "${selectedEvent?.id || "REQ-108"}",
  "user_name": "${selectedEvent?.userName || "Rahul Sharma"}",
  "intent": "CERTIFICATE_MISSING",
  "confidence_score": 0.94,
  "requires_hitl_approval": true,
  "action_spec": {
    "type": "GENERATE_PDF_AND_DISPATCH_RESEND",
    "template": "event_certificate_v2.html",
    "recipient": "${selectedEvent?.userEmail || "rahul@test.com"}"
  }
}`}
              </pre>
            </div>
          )}

          {viewMode === "NOTION_SYNC" && (
            <div className="space-y-2 font-mono text-xs">
              <div className="text-amber-accent font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                NOTION DATABASE PAGE ATTRIBUTION:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded bg-canvas border border-border-subtle">
                  <span className="text-text-muted block text-[9px]">PARENT DB</span>
                  <span className="text-text-white font-bold">📥 Requests DB</span>
                </div>
                <div className="p-2 rounded bg-canvas border border-border-subtle">
                  <span className="text-text-muted block text-[9px]">STATUS</span>
                  <span className="text-amber-accent font-bold">{selectedEvent?.status}</span>
                </div>
                <div className="p-2 rounded bg-canvas border border-border-subtle">
                  <span className="text-text-muted block text-[9px]">WRITTEN BY</span>
                  <span className="text-emerald-accent font-bold">Bot Integration Token</span>
                </div>
                <div className="p-2 rounded bg-canvas border border-border-subtle">
                  <span className="text-text-muted block text-[9px]">RUN LOG ATTACHED</span>
                  <span className="text-cyan-accent font-bold">#RUN-20260822-0042</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sandbox Simulation Bar */}
        <div className="relative z-10 pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-text-muted">SANDBOX INJECTORS:</span>
            <button
              onClick={() => onSimulateWebhook("CERTIFICATE_REQ")}
              className="px-3 py-1.5 rounded-lg bg-cyan-accent/15 hover:bg-cyan-accent/25 text-cyan-accent border border-cyan-accent/30 font-bold transition-all flex items-center gap-1.5"
            >
              <Play className="w-3 h-3" /> Ingest Test Request
            </button>
            <button
              onClick={() => onSimulateWebhook("GARBAGE_INPUT")}
              className="px-3 py-1.5 rounded-lg bg-amber-accent/15 hover:bg-amber-accent/25 text-amber-accent border border-amber-accent/30 font-bold transition-all flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3 h-3" /> Simulate Dirty Input
            </button>
          </div>

          <div className="text-text-muted text-[11px]">
            ⚡ 24/7 Background Sync: <span className="text-emerald-accent font-bold">POLLING NOTION EVERY 30s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
