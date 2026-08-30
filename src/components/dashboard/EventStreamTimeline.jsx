"use client";

import { useState } from "react";
import {
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Inbox,
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
    <div className="dev-card bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-3.5 border-b-2 border-[#18181b] bg-[#fcfbfa] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-black text-[#18181b] uppercase tracking-wider">
              Live Tickets Stream
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
            {events.length} Tickets
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="p-2 border-b border-[#e2dfd6] bg-[#f9f8f5] flex gap-1 text-xs font-mono">
          {filterTabs.map((tab) => {
            const isActive = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`flex-1 py-1 px-1.5 rounded-md text-center font-bold text-[11px] transition-all flex items-center justify-center gap-1 ${
                  isActive
                    ? "bg-[#18181b] text-white border border-[#18181b] shadow-[1px_1px_0px_#dc2626]"
                    : "bg-white text-[#52525b] border border-[#e2dfd6] hover:border-[#18181b] hover:text-[#18181b]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1 rounded ${
                    isActive ? "bg-[#dc2626] text-white" : "bg-[#f4f3ef] text-[#71717a]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stacked Navigation Cards for Incidents */}
        <div className="overflow-y-auto p-3 space-y-2.5 max-h-[520px]">
          {filteredEvents.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-[#71717a] bg-[#fcfbfa] rounded-xl border border-dashed border-[#d3cfc2]">
              No tickets matching &quot;{filterTab}&quot; filter.
            </div>
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
              <div
                key={item.id}
                onClick={() => onSelectEvent(item.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#ffffff] border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] translate-x-0.5"
                    : "bg-[#fcfbfa] border-[#e2dfd6] hover:border-[#18181b] hover:bg-white hover:shadow-[1.5px_1.5px_0px_#18181b]"
                }`}
              >
                {/* Header: Time and ID */}
                <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-[#71717a]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#dc2626]" />
                    <span>{item.time}</span>
                    <span>•</span>
                    <strong className="text-[#18181b]">{item.id}</strong>
                  </div>

                  {item.status === "WAITING_APPROVAL" && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#f59e0b] font-bold text-[8px]">
                      REVIEW
                    </span>
                  )}
                  {item.status === "SUCCESS" && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#ecfdf5] text-[#065f46] border border-[#059669] font-bold text-[8px]">
                      DISPATCHED
                    </span>
                  )}
                  {item.status === "NEEDS_FIX" && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#fee2e2] text-[#991b1b] border border-[#dc2626] font-bold text-[8px]">
                      DATA FIX
                    </span>
                  )}
                  {item.status === "FAILED" && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#fee2e2] text-[#991b1b] border border-[#dc2626] font-bold text-[8px]">
                      REJECTED
                    </span>
                  )}
                </div>

                {/* Title with Icon */}
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-5 h-5 rounded bg-[#f4f3ef] border border-[#18181b] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#18181b]">
                    <StatusIcon className="w-3 h-3" />
                  </div>
                  <h3 className="text-xs font-bold text-[#18181b] leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                </div>

                {/* Muted description */}
                <p className="text-[11px] text-[#52525b] line-clamp-2 leading-relaxed pl-7">
                  &ldquo;{item.rawMessage}&rdquo;
                </p>

                {/* Footer metadata */}
                <div className="flex items-center justify-between text-[9px] font-mono text-[#71717a] mt-2 pt-1.5 border-t border-[#f0eee6] pl-7">
                  <span>By: <strong className="text-[#18181b]">{item.userName}</strong></span>
                  <span className="text-[#dc2626] font-bold">{item.actionPreview}</span>
                </div>
              </div>
            );
          }))}
        </div>
      </div>
  );
}
