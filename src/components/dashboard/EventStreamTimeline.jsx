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
    <div className="dev-card bg-white flex flex-col overflow-hidden shadow-[3px_3px_0px_#18181b]">
      {/* Header */}
      <div className="p-4 border-b-2 border-[#18181b] bg-[#fcfbfa] flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#18181b] tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          <span>Live Tickets Stream</span>
        </h2>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
          {events.length} Tickets
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="p-2.5 border-b border-[#e2dfd6] bg-[#f9f8f5] flex gap-1.5 text-xs font-mono" role="tablist" aria-label="Ticket Status Filter">
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
              className={`flex-1 py-1.5 px-2 rounded-lg text-center font-bold text-xs transition-all flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#18181b] relative ${
                isActive
                  ? "bg-[#18181b] text-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#dc2626]"
                  : "bg-white text-[#52525b] border-2 border-[#e2dfd6] hover:border-[#18181b] hover:text-[#18181b]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isActive ? "bg-[#dc2626] text-white" : "bg-[#f4f3ef] text-[#71717a]"
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
              className="p-6 text-center text-xs font-mono text-[#71717a] bg-[#fcfbfa] rounded-xl border border-dashed border-[#d3cfc2]"
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
                  className={`p-3.5 rounded-xl border-2 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#18181b] relative overflow-hidden ${
                    isSelected
                      ? "bg-[#ffffff] border-[#18181b] shadow-[3.5px_3.5px_0px_#18181b]"
                      : "bg-[#fcfbfa] border-[#e2dfd6] hover:border-[#18181b] hover:bg-white hover:shadow-[2px_2px_0px_#18181b]"
                  }`}
                >
                  {/* Selected Active Marker Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedTicketBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#dc2626]"
                    />
                  )}

                  {/* Header: Time and ID */}
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-[#71717a]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#dc2626]" aria-hidden="true" />
                      <span>{item.time}</span>
                      <span>•</span>
                      <strong className="text-[#18181b]">{item.id}</strong>
                    </div>

                    {item.status === "WAITING_APPROVAL" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#f59e0b] font-bold text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                        <span>REVIEW</span>
                      </span>
                    )}
                    {item.status === "SUCCESS" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#059669] font-bold text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>DISPATCHED</span>
                      </span>
                    )}
                    {item.status === "NEEDS_FIX" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] border border-[#dc2626] font-bold text-[10px]">
                        DATA FIX
                      </span>
                    )}
                    {item.status === "FAILED" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] border border-[#dc2626] font-bold text-[10px]">
                        REJECTED
                      </span>
                    )}
                  </div>

                  {/* Title with Icon */}
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <div className="w-6 h-6 rounded bg-[#f4f3ef] border border-[#18181b] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#18181b]">
                      <StatusIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#18181b] leading-tight line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Ticket Body Text */}
                  <p className="text-xs sm:text-sm text-[#52525b] line-clamp-2 leading-relaxed pl-8">
                    &ldquo;{item.rawMessage}&rdquo;
                  </p>

                  {/* Footer metadata and human-readable action label */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#71717a] mt-2.5 pt-2 border-t border-[#f0eee6] pl-8">
                    <span>By: <strong className="text-[#18181b]">{item.userName}</strong></span>
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
