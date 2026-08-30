"use client";

import { useState } from "react";
import {
  Globe,
  Brain,
  Database,
  UserCheck,
  Mail,
  FileCheck,
  ShieldAlert,
  Check,
  X,
  Play,
  Layers,
  ArrowRight,
  Terminal,
  Send,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function TacticalEngineCanvas({
  selectedEvent,
  onApproveEvent,
  onRejectEvent,
  onSimulateWebhook,
}) {
  const [activeStage, setActiveStage] = useState(3);
  const [viewMode, setViewMode] = useState("TACTICAL"); // TACTICAL | PAYLOAD | NOTION_SYNC
  const [quickInput, setQuickInput] = useState("");
  const [quickName, setQuickName] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stages = [
    {
      id: 1,
      title: "1. Ingest Gateway",
      sub: "Sanitize & MD5 Hash",
      icon: Globe,
      status: "VERIFIED",
    },
    {
      id: 2,
      title: "2. Gemini Flash",
      sub: "Intent & Extraction",
      icon: Brain,
      status: `${selectedEvent?.confidence || 94}% CONF`,
    },
    {
      id: 3,
      title: "3. Notion Queue",
      sub: "Operator Decision HQ",
      icon: Database,
      status: selectedEvent?.status || "WAITING",
    },
    {
      id: 4,
      title: "4. Dispatcher",
      sub: "PDF/HTML + Mailer",
      icon: Mail,
      status: selectedEvent?.status === "SUCCESS" ? "DISPATCHED" : "READY",
    },
    {
      id: 5,
      title: "5. Run Log Audit",
      sub: "Tamper-Proof Proof",
      icon: FileCheck,
      status: "SEALED",
    },
  ];

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    setIsSubmitting(true);
    try {
      await onSimulateWebhook({
        custom: true,
        userName: quickName.trim() || "Student Participant",
        userEmail: quickEmail.trim() || "student@college.edu",
        rawMessage: quickInput.trim(),
      });
      setQuickInput("");
      setQuickName("");
      setQuickEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dev-card bg-white flex flex-col h-full overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b-2 border-[#18181b] bg-[#fcfbfa] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#18181b] text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_#dc2626]">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black text-[#18181b] uppercase tracking-wide flex items-center gap-2">
              Autonomous Automation Engine
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4f3ef] text-[#18181b] font-bold border border-[#18181b]">
                RADAR
              </span>
            </h2>
            <p className="text-[11px] text-[#71717a] font-mono">
              ACTIVE TRACE: <strong className="text-[#dc2626] font-bold">{selectedEvent?.id || "REQ-108"}</strong>
            </p>
          </div>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#f4f3ef] border border-[#e2dfd6] text-xs font-mono">
          {[
            { id: "TACTICAL", label: "TACTICAL FLOW" },
            { id: "PAYLOAD", label: "JSON SCHEMA" },
            { id: "NOTION_SYNC", label: "NOTION DB" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
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

      {/* Main Execution Canvas */}
      <div className="flex-1 p-5 sm:p-6 bg-[#faf9f6] space-y-5 overflow-y-auto">
        {/* 5-Stage Pipeline Progress Cards */}
        <div>
          <span className="text-[11px] font-mono text-[#71717a] uppercase font-bold tracking-wider block mb-2">
            Execution Pipeline Stages:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {stages.map((stage, idx) => {
              const isTarget = activeStage === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative ${
                    isTarget
                      ? "bg-white border-[#18181b] shadow-[3px_3px_0px_#dc2626]"
                      : "bg-[#ffffff] border-[#e2dfd6] hover:border-[#18181b] hover:shadow-[2px_2px_0px_#18181b]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 rounded-md bg-[#f4f3ef] border border-[#18181b] flex items-center justify-center text-[#18181b]">
                      <stage.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
                      {stage.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#18181b] truncate">{stage.title}</div>
                  <div className="text-[10px] text-[#71717a] font-mono truncate">{stage.sub}</div>

                  {idx < stages.length - 1 && (
                    <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#71717a]">
                      <ArrowRight className="w-3 h-3 text-[#18181b]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Display: Tactical / Payload / Notion */}
        {viewMode === "TACTICAL" && (
          <div className="p-5 rounded-2xl bg-white border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Selected Ticket Metadata & Message */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-[#18181b] text-white font-bold">
                    {selectedEvent?.id}
                  </span>
                  <span className="font-bold text-[#18181b]">{selectedEvent?.userName}</span>
                  <span className="text-[#71717a]">({selectedEvent?.userEmail})</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] font-mono text-xs text-[#18181b] leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-[#dc2626] block mb-1">
                    STUDENT COMPLAINT INGESTION:
                  </span>
                  &ldquo;{selectedEvent?.rawMessage}&rdquo;
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b] font-semibold">
                    Category: <strong>{selectedEvent?.category}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#ecfdf5] border border-[#059669] text-[#065f46] font-bold">
                    Attendance: {selectedEvent?.attendanceVerified ? "Verified (100%) ✓" : "Unverified ⚠️"}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#fef3c7] border border-[#f59e0b] text-[#92400e] font-bold">
                    Priority: {selectedEvent?.priority || "HIGH"}
                  </span>
                </div>
              </div>

              {/* Operator Decision Station (Approve / Reject / Status) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] text-center shadow-[1.5px_1.5px_0px_#18181b]">
                <span className="text-xs font-mono uppercase text-[#18181b] font-bold mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#dc2626]" />
                  Operator Decision Cockpit
                </span>
                <p className="text-[11px] text-[#52525b] mb-3 font-mono leading-relaxed">
                  {selectedEvent?.status === "WAITING_APPROVAL"
                    ? "Paused in Notion — Requires human clearance"
                    : selectedEvent?.status === "FAILED"
                    ? "Operator rejected request — Attendance unverified"
                    : selectedEvent?.status === "NEEDS_FIX"
                    ? "Invalid data format — Flagged for manual correction"
                    : "Action processed and sealed with Run Log"}
                </p>

                {selectedEvent?.status === "WAITING_APPROVAL" ? (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => onApproveEvent(selectedEvent?.id)}
                      className="flex-1 py-2 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white border-2 border-[#18181b] font-mono text-xs font-bold transition-all shadow-[2px_2px_0px_#18181b] flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 stroke-[3]" /> APPROVE
                    </button>
                    <button
                      onClick={() => onRejectEvent(selectedEvent?.id)}
                      className="py-2 px-3 rounded-lg bg-white hover:bg-[#fee2e2] text-[#dc2626] border-2 border-[#18181b] font-mono text-xs font-bold transition-all shadow-[2px_2px_0px_#18181b] flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4 stroke-[3]" /> REJECT
                    </button>
                  </div>
                ) : selectedEvent?.status === "FAILED" ? (
                  <div className="px-4 py-2 rounded-lg bg-[#fee2e2] border-2 border-[#dc2626] text-[#991b1b] font-mono text-xs font-bold">
                    ❌ REJECTED BY OPERATOR
                  </div>
                ) : selectedEvent?.status === "NEEDS_FIX" ? (
                  <div className="px-4 py-2 rounded-lg bg-[#fef3c7] border-2 border-[#f59e0b] text-[#92400e] font-mono text-xs font-bold">
                    ⚠️ REQUIRES DATA FIX
                  </div>
                ) : (
                  <div className="px-4 py-2 rounded-lg bg-[#ecfdf5] border-2 border-[#059669] text-[#065f46] font-mono text-xs font-bold">
                    ✅ EXECUTED & AUDITED #{selectedEvent?.id ? `RUN-${selectedEvent.id.replace('REQ-', '')}` : 'RUN-042'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {viewMode === "PAYLOAD" && (
          <div className="p-4 rounded-2xl bg-white border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] space-y-2 font-mono text-xs">
            <div className="text-[#18181b] font-bold flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#dc2626]" />
              EXTRACTED INTENT & SCHEMA (Gemini AI Engine):
            </div>
            <pre className="p-4 rounded-xl bg-[#18181b] text-[12px] text-[#4ade80] overflow-x-auto border-2 border-[#18181b] leading-relaxed font-mono">
{JSON.stringify(
  {
    request_id: selectedEvent?.id || "REQ-108",
    user_name: selectedEvent?.userName || "Rahul Sharma",
    user_email: selectedEvent?.userEmail || "rahul@college.edu",
    intent: selectedEvent?.category || "CERTIFICATE_ISSUE",
    confidence_score: selectedEvent?.confidence ? Number((selectedEvent.confidence / 100).toFixed(2)) : 0.94,
    status: selectedEvent?.status || "WAITING_APPROVAL",
    attendance_verified: !!selectedEvent?.attendanceVerified,
    action_spec: {
      type: selectedEvent?.actionPreview || "GENERATE_PDF + EMAIL",
      template: "event_certificate_v2.html",
      recipient: selectedEvent?.userEmail || "rahul@college.edu",
    },
  },
  null,
  2
)}
            </pre>
          </div>
        )}

        {viewMode === "NOTION_SYNC" && (
          <div className="p-4 rounded-2xl bg-white border-2 border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] space-y-3 font-mono text-xs">
            <div className="text-[#18181b] font-bold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#d97706]" />
              NOTION DATABASE PAGE ATTRIBUTION:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">PARENT DB</span>
                <span className="text-[#18181b] font-bold">📥 Requests DB</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">CURRENT STATUS</span>
                <span className="text-[#d97706] font-bold">{selectedEvent?.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">WRITTEN BY</span>
                <span className="text-[#059669] font-bold">Bot Integration Token</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
                <span className="text-[#71717a] block text-[10px]">RUN LOG ATTACHED</span>
                <span className="text-[#18181b] font-bold">
                  #{selectedEvent?.id ? `RUN-${selectedEvent.id.replace('REQ-', '2026-')}` : 'RUN-20260822-0042'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Sandbox Simulation Bar */}
        <div className="pt-3 border-t-2 border-[#18181b] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#71717a] font-bold">SANDBOX INJECTORS:</span>
            <button
              onClick={() => onSimulateWebhook("CERTIFICATE_REQ")}
              className="btn-secondary btn-secondary-sm text-xs font-bold"
            >
              <Play className="w-3 h-3 text-[#059669]" /> Ingest Test Ticket
            </button>
            <button
              onClick={() => onSimulateWebhook("GARBAGE_INPUT")}
              className="btn-secondary btn-secondary-sm text-xs font-bold"
            >
              <ShieldAlert className="w-3 h-3 text-[#dc2626]" /> Dirty Input Guardrail
            </button>
          </div>

          <div className="text-[#52525b] text-[11px]">
            ⚡ 24/7 Autonomous Sync: <strong className="text-[#059669]">POLLING EVERY 30s</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
