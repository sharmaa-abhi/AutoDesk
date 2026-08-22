"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Flame,
  UserCheck,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function EventStreamTimeline({
  events,
  selectedEventId,
  onSelectEvent,
  filterTab,
  setFilterTab,
}) {
  const [commentaryOpen, setCommentaryOpen] = useState(false);

  const filterTabs = [
    { id: "ALL", label: "All", count: events.length },
    { id: "APPROVAL", label: "Approval", count: events.filter((e) => e.status === "WAITING_APPROVAL").length },
    { id: "COMPLETED", label: "Done", count: events.filter((e) => e.status === "SUCCESS").length },
    { id: "FAILED", label: "Alerts", count: events.filter((e) => e.status === "FAILED" || e.status === "NEEDS_FIX").length },
  ];

  const filteredEvents = events.filter((ev) => {
    if (filterTab === "ALL") return true;
    if (filterTab === "APPROVAL") return ev.status === "WAITING_APPROVAL";
    if (filterTab === "COMPLETED") return ev.status === "SUCCESS";
    if (filterTab === "FAILED") return ev.status === "FAILED" || ev.status === "NEEDS_FIX";
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-panel border border-border-subtle rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-border-subtle bg-panel-elevated/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-accent animate-ping" />
          <h2 className="text-sm font-bold text-text-white uppercase tracking-wider flex items-center gap-1.5">
            Match Stream <span className="text-cyan-accent text-xs font-mono">LIVE</span>
          </h2>
        </div>
        <span className="text-[11px] font-mono text-text-muted">
          {events.length} INCIDENTS
        </span>
      </div>

      {/* Incident Filter Tabs */}
      <div className="flex p-2 gap-1 border-b border-border-subtle bg-canvas/60 text-xs font-mono">
        {filterTabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                isActive
                  ? "bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30 font-bold shadow-sm"
                  : "text-text-secondary hover:text-text-white hover:bg-panel-elevated"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1 rounded-full ${
                  isActive ? "bg-cyan-accent/30 text-cyan-accent" : "bg-panel text-text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events Chronological Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-h-[520px] scrollbar-thin">
        <AnimatePresence initial={false}>
          {filteredEvents.map((item, idx) => {
            const isSelected = item.id === selectedEventId;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                onClick={() => onSelectEvent(item.id)}
                className={`group relative p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-panel-elevated border-cyan-accent shadow-[0_0_20px_rgba(0,229,255,0.15)] ring-1 ring-cyan-accent/30"
                    : "bg-panel-elevated/40 border-border-subtle hover:border-white/20 hover:bg-panel-elevated/70"
                }`}
              >
                {/* Event Time Stamp + Incident Type Badge */}
                <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Clock className="w-3 h-3 text-cyan-accent" />
                    <span>{item.time}</span>
                    <span className="text-text-muted/60">•</span>
                    <span className="text-gold font-semibold">{item.minute}&apos;</span>
                  </div>

                  {item.status === "WAITING_APPROVAL" && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-accent/20 text-amber-accent border border-amber-accent/30 font-bold text-[10px] flex items-center gap-1 animate-pulse">
                      <UserCheck className="w-3 h-3" /> APPROVAL
                    </span>
                  )}
                  {item.status === "SUCCESS" && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30 font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> EXECUTED
                    </span>
                  )}
                  {item.status === "NEEDS_FIX" && (
                    <span className="px-2 py-0.5 rounded-full bg-crimson-accent/20 text-crimson-accent border border-crimson-accent/30 font-bold text-[10px] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> DATA FIX
                    </span>
                  )}
                </div>

                {/* Event Title & User Payload Summary */}
                <div className="text-xs font-bold text-text-white group-hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent font-mono">{item.id}:</span>
                  <span className="truncate">{item.title}</span>
                </div>

                <p className="text-[11px] text-text-secondary line-clamp-1 mt-1">
                  &ldquo;{item.rawMessage}&rdquo;
                </p>

                {/* Tactical Mini Badges */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-subtle/50 text-[10px] font-mono">
                  <span className="text-text-muted">User: <b className="text-text-secondary">{item.userName}</b></span>
                  <span className="text-text-muted">|</span>
                  <span className="text-text-muted">AI: <b className="text-violet-accent">{item.confidence}%</b></span>
                  <span className="ml-auto text-cyan-accent font-semibold">{item.actionPreview}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Live Commentary Collapsible Strip */}
      <div className="p-3 border-t border-border-subtle bg-canvas/90">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-gold flex items-center gap-1.5 font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            TELEMETRY COMMENTARY
          </span>
          <span className="text-[10px] text-emerald-accent font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-ping" />
            STREAMING
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-panel border border-border-subtle font-mono text-[11px] text-text-secondary max-h-20 overflow-y-auto leading-relaxed">
          <p className="text-cyan-accent">
            [67:18] ⚡ Ingestion Webhook received POST payload from &lsquo;abhi@test.com&rsquo;
          </p>
          <p className="text-text-muted mt-1">
            [67:20] 🧠 Gemini JSON schema returned high confidence entity: Certificate_Missing
          </p>
          <p className="text-amber-accent mt-1">
            [67:23] 🙋 Status locked into &lsquo;WAITING_APPROVAL&rsquo; in Notion Cockpit
          </p>
        </div>
      </div>
    </div>
  );
}
