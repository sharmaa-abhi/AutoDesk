"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function EventStreamTimeline({
  events,
  selectedEventId,
  onSelectEvent,
  filterTab,
  setFilterTab,
}) {
  const filterTabs = [
    { id: "ALL", label: "All", count: events.length },
    { id: "APPROVAL", label: "Review", count: events.filter((e) => e.status === "WAITING_APPROVAL").length },
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

  const formatActionLabel = (action) => {
    if (!action) return "Generate PDF + Email";
    if (action === "GENERATE_PDF + EMAIL") return "Generate PDF + Email";
    if (action === "PDF_DISPATCHED") return "PDF Dispatched";
    if (action === "NOTION_HITL_REVIEW") return "Notion Review";
    return action;
  };

  return (
    <div className="dev-card bg-[var(--bg-panel)] flex flex-col overflow-hidden shadow-[3px_3px_0px_var(--border-charcoal)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
      {/* Header */}
      <div className="p-4 border-b-2 border-[var(--border-charcoal)] bg-[var(--bg-panel-elevated)] flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse shadow-[0_0_6px_#059669]" />
          <span>Live Tickets Stream</span>
        </h2>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
          {events.length} Tickets
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="p-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-card-hover)] flex gap-1.5 text-xs font-mono" role="tablist" aria-label="Ticket Status Filter">
        {filterTabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterTab(tab.id)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold text-xs transition-all flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)] relative ${
                isActive
                  ? "bg-[#18181b] dark:bg-[#dc2626] text-white border-2 border-[var(--border-charcoal)] shadow-[1.5px_1.5px_0px_#dc2626]"
                  : "bg-[var(--bg-panel)] text-[var(--text-secondary)] border-2 border-[var(--border-subtle)] hover:border-[var(--border-charcoal)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isActive ? "bg-[#dc2626] text-white" : "bg-[var(--bg-card-hover)] text-[var(--text-muted)]"
                }`}
              >
                {tab.count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Stacked Ticket Stream */}
      <div className="overflow-y-auto p-3 space-y-3 max-h-[580px]">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 text-center text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-panel-elevated)] rounded-xl border border-dashed border-[var(--border-subtle)]"
            >
              No tickets matching &quot;{filterTab}&quot; filter.
            </motion.div>
          ) : (
            filteredEvents.map((item) => {
              const isSelected = item.id === selectedEventId;

              const StatusIcon =
                item.status === "WAITING_APPROVAL"
                  ? UserCheck
                  : item.status === "SUCCESS"
                  ? CheckCircle2
                  : item.status === "NEEDS_FIX"
                  ? AlertTriangle
                  : XCircle;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.015, x: 2 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => onSelectEvent(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectEvent(item.id);
                    }
                  }}
                  className={`p-3.5 rounded-xl border-2 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)] relative overflow-hidden ${
                    isSelected
                      ? "bg-[var(--bg-panel)] border-[var(--border-charcoal)] shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(220,38,38,0.3),2px_2px_0px_#dc2626]"
                      : "bg-[var(--bg-panel-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-charcoal)] hover:bg-[var(--bg-panel)] hover:shadow-[2px_2px_0px_var(--border-charcoal)]"
                  }`}
                >
                  {/* Selected Active Marker Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedTicketBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626] shadow-[0_0_8px_#dc2626]"
                    />
                  )}

                  {/* Header: Time and ID */}
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#dc2626]" aria-hidden="true" />
                      <span>{item.time}</span>
                      <span>•</span>
                      <strong className="text-[var(--text-primary)]">{item.id}</strong>
                    </div>

                    {item.status === "WAITING_APPROVAL" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] dark:bg-amber-950/40 text-[#92400e] dark:text-amber-300 border border-[#f59e0b] font-bold text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                        <span>REVIEW</span>
                      </span>
                    )}
                    {item.status === "SUCCESS" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/40 text-[#065f46] dark:text-emerald-300 border border-[#059669] font-bold text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>DISPATCHED</span>
                      </span>
                    )}
                    {item.status === "NEEDS_FIX" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] dark:bg-red-950/40 text-[#991b1b] dark:text-red-300 border border-[#dc2626] font-bold text-[10px]">
                        DATA FIX
                      </span>
                    )}
                    {item.status === "FAILED" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] dark:bg-red-950/40 text-[#991b1b] dark:text-red-300 border border-[#dc2626] font-bold text-[10px]">
                        REJECTED
                      </span>
                    )}
                  </div>

                  {/* Title with Icon */}
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <div className="w-6 h-6 rounded bg-[var(--bg-card-hover)] border border-[var(--border-charcoal)] flex items-center justify-center flex-shrink-0 mt-0.5 text-[var(--text-primary)]">
                      <StatusIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-tight line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Ticket Body Text */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed pl-8">
                    &ldquo;{item.rawMessage}&rdquo;
                  </p>

                  {/* Footer metadata and human-readable action label */}
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mt-2.5 pt-2 border-t border-[var(--border-subtle)] pl-8">
                    <span>By: <strong className="text-[var(--text-primary)]">{item.userName}</strong></span>
                    <span className="text-[#dc2626] font-bold">
                      {formatActionLabel(item.actionPreview)}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
