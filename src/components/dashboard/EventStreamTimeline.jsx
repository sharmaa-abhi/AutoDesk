"use client";

import { useState } from "react";
import {
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MessageSquare,
  Sparkles,
  Inbox,
  ArrowRight,
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

  return (
    <div className="dev-card bg-white flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b-2 border-[#18181b] bg-[#fcfbfa] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#18181b] text-white flex items-center justify-center font-bold text-xs shadow-[1.5px_1.5px_0px_#dc2626]">
            <Inbox className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-black text-[#18181b] uppercase tracking-wider">
              Incident Queue
            </h2>
            <p className="text-[10px] text-[#71717a] font-mono">
              Real-time Ingest Stream
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
          {events.length} Tickets
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="p-2.5 border-b border-[#e2dfd6] bg-[#f9f8f5] flex gap-1.5 text-xs font-mono">
        {filterTabs.map((tab) => {
          const isActive = filterTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center font-semibold transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? "bg-[#18181b] text-white border-2 border-[#18181b] shadow-[1.5px_1.5px_0px_#dc2626]"
                  : "bg-white text-[#52525b] border border-[#e2dfd6] hover:border-[#18181b] hover:text-[#18181b]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1 rounded font-bold ${
                  isActive ? "bg-[#dc2626] text-white" : "bg-[#f4f3ef] text-[#71717a]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Individual Rectangular Navigation Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[640px]">
        {filteredEvents.map((item) => {
          const isSelected = item.id === selectedEventId;

          // Status Icon
          const StatusIcon =
            item.status === "WAITING_APPROVAL"
              ? UserCheck
              : item.status === "SUCCESS"
              ? CheckCircle2
              : item.status === "NEEDS_FIX"
              ? AlertTriangle
              : XCircle;

          return (
            <div
              key={item.id}
              onClick={() => onSelectEvent(item.id)}
              className={`relative p-3.5 rounded-[14px] border-2 transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-[#ffffff] border-[#18181b] shadow-[3px_3px_0px_#18181b] translate-x-1"
                  : "bg-[#fcfbfa] border-[#e2dfd6] hover:border-[#18181b] hover:bg-white hover:shadow-[2px_2px_0px_#18181b]"
              }`}
            >
              {/* Card Header: Timestamp & Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#71717a]">
                  <Clock className="w-3 h-3 text-[#dc2626]" />
                  <span>{item.time}</span>
                  <span>•</span>
                  <span className="font-bold text-[#18181b]">{item.id}</span>
                </div>

                {item.status === "WAITING_APPROVAL" && (
                  <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#f59e0b] font-mono font-bold text-[9px]">
                    APPROVAL
                  </span>
                )}
                {item.status === "SUCCESS" && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#059669] font-mono font-bold text-[9px]">
                    DISPATCHED
                  </span>
                )}
                {item.status === "NEEDS_FIX" && (
                  <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] border border-[#dc2626] font-mono font-bold text-[9px]">
                    DATA FIX
                  </span>
                )}
                {item.status === "FAILED" && (
                  <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] border border-[#dc2626] font-mono font-bold text-[9px]">
                    REJECTED
                  </span>
                )}
              </div>

              {/* Title with Icon on Left */}
              <div className="flex items-start gap-2 mb-1.5">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    item.status === "WAITING_APPROVAL"
                      ? "bg-[#fef3c7] text-[#92400e]"
                      : item.status === "SUCCESS"
                      ? "bg-[#ecfdf5] text-[#059669]"
                      : "bg-[#fee2e2] text-[#dc2626]"
                  }`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-[#18181b] leading-tight line-clamp-1">
                  {item.title}
                </h3>
              </div>

              {/* Muted Description Below */}
              <p className="text-[11px] text-[#52525b] line-clamp-2 leading-relaxed pl-8">
                &ldquo;{item.rawMessage}&rdquo;
              </p>

              {/* Card Footer Metadata */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#71717a] mt-2.5 pt-2 border-t border-[#f0eee6] pl-8">
                <span>By: <strong className="text-[#18181b]">{item.userName}</strong></span>
                <span className="text-[#dc2626] font-bold">{item.actionPreview}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Stream Footer */}
      <div className="p-3 border-t-2 border-[#18181b] bg-[#f9f8f5]">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-[#18181b] font-bold">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#dc2626]" />
            LIVE TELEMETRY STREAM
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#ecfdf5] text-[#065f46] border border-[#059669] font-bold">
            POLLING
          </span>
        </div>
        <p className="text-[10px] font-mono text-[#52525b] leading-relaxed">
          Daemon connected to Notion Database. Incoming webhooks are parsed with Gemini AI in &lt;1.5s.
        </p>
      </div>
    </div>
  );
}
