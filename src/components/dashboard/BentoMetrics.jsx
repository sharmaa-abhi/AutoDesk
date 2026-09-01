"use client";

import {
  ShieldCheck,
  Zap,
  Lock,
  ExternalLink,
  Code2,
  Database,
} from "lucide-react";

export default function BentoMetrics({ stats, runLogs }) {
  return (
    <div className="space-y-5">
      {/* Sidebar Section Header */}
      <h2 className="text-xs font-mono text-[#71717a] uppercase font-bold tracking-wider px-1">
        Utilities & Telemetry
      </h2>

      {/* Card 1: Notion Workspace DB */}
      <a
        href="https://notion.so"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Notion Workspace in new tab"
        className="dev-card bg-white p-4 flex items-start gap-3.5 border-2 border-[#18181b] hover:shadow-[3px_3px_0px_#18181b] transition-all group block focus-visible:outline-2 focus-visible:outline-[#18181b]"
      >
        <div className="w-9 h-9 rounded-lg bg-[#18181b] text-white flex items-center justify-center flex-shrink-0 shadow-[1.5px_1.5px_0px_#dc2626]">
          <Database className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-xs sm:text-sm font-bold text-[#18181b] group-hover:text-[#dc2626] transition-colors flex items-center gap-1">
              <span>Notion Workspace DB</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" aria-hidden="true" />
            </h3>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#065f46] border border-[#059669]">
              LIVE
            </span>
          </div>
          {/* Fix 7: Minimum 12px description text */}
          <p className="text-xs text-[#52525b] mt-1 leading-relaxed font-mono">
            Human-in-the-loop audit cockpit & synchronized request records.
          </p>
        </div>
      </a>

      {/* Card 2: Engine SLA & Performance Telemetry (Fix 8 & 9) */}
      <div className="dev-card bg-white p-5 border-2 border-[#18181b]">
        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#e2dfd6]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#18181b] text-white flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </div>
            {/* Fix 8: Sentence Case heading */}
            <h3 className="text-xs sm:text-sm font-bold text-[#18181b] tracking-tight">
              Engine Performance
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#065f46] font-bold px-2 py-0.5 rounded bg-[#ecfdf5] border border-[#059669]">
            OPTIMAL
          </span>
        </div>

        {/* Fix 9: Metric Labels minimum 12px */}
        <div className="grid grid-cols-2 gap-2.5 mb-4 font-mono">
          <div className="p-2.5 rounded-lg bg-[#fcfbfa] border-2 border-[#18181b]">
            <span className="text-xs text-[#71717a] block font-semibold">AVG LATENCY</span>
            <span className="text-lg sm:text-xl font-black text-[#18181b] block mt-0.5">1.42s</span>
            <span className="text-xs text-[#059669] font-bold block mt-0.5">Target: &lt;3.0s</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#fcfbfa] border-2 border-[#18181b]">
            <span className="text-xs text-[#71717a] block font-semibold">AI ACCURACY</span>
            <span className="text-lg sm:text-xl font-black text-[#dc2626] block mt-0.5">98.6%</span>
            <span className="text-xs text-[#52525b] block mt-0.5">Gemini Flash</span>
          </div>
        </div>

        {/* Action Type Progress Bars (Fix 9: minimum 12px text) */}
        <div className="space-y-2.5 pt-1 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[#52525b] mb-1">
              <span>PDF Certificates Dispatched</span>
              <strong className="text-[#18181b]">42% (148)</strong>
            </div>
            <div className="h-2 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#18181b] rounded-full" style={{ width: "42%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[#52525b] mb-1">
              <span>Transactional Emails</span>
              <strong className="text-[#dc2626]">38% (134)</strong>
            </div>
            <div className="h-2 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#dc2626] rounded-full" style={{ width: "38%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[#52525b] mb-1">
              <span>Operator Clearance</span>
              <strong className="text-[#059669]">20% (71)</strong>
            </div>
            <div className="h-2 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#059669] rounded-full" style={{ width: "20%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Tamper-Proof Notion Run Log Feed (Fix 10–14 & Fix 17) */}
      <div className="dev-card bg-white p-5 flex flex-col border-2 border-[#18181b]">
        {/* Clean Structured Header (Fix 17: No floating overlapping icons) */}
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#e2dfd6]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-[1px_1px_0px_#18181b]">
              <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#18181b] tracking-tight">
                Tamper-Proof Run Log
              </h3>
              <span className="text-[10px] text-[#71717a] font-mono block">
                Notion Bot Token
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ecfdf5] text-[#065f46] border border-[#059669]">
            PROOF
          </span>
        </div>

        {/* Live Run Log Rows (Fix 10–14: Complete, untruncated, wrapping text with min-w-0) */}
        <div className="overflow-y-auto space-y-2.5 max-h-[220px]">
          {runLogs.map((log) => (
            <div
              key={log.runId}
              title={log.action}
              className="p-2.5 rounded-lg bg-[#fcfbfa] border border-[#18181b] font-mono text-xs hover:bg-white transition-all min-w-0"
            >
              <div className="flex items-center justify-between text-[#71717a] text-[11px] mb-1">
                <strong className="text-[#18181b]">{log.runId}</strong>
                <span>{log.timestamp}</span>
              </div>
              {/* Fix 10–14: Wrapped readable activity action message */}
              <div className="text-[#18181b] font-medium flex items-start gap-1.5 whitespace-normal break-words leading-relaxed">
                <span
                  className={`flex-shrink-0 font-bold ${
                    log.status === "REJECTED"
                      ? "text-[#dc2626]"
                      : log.status === "BLOCKED"
                      ? "text-[#d97706]"
                      : "text-[#059669]"
                  }`}
                  aria-hidden="true"
                >
                  {log.status === "REJECTED" ? "✗" : log.status === "BLOCKED" ? "⊘" : "✓"}
                </span>
                <span className="flex-1 min-w-0 break-words">{log.action}</span>
              </div>
              <div className="flex items-center justify-between text-[#71717a] text-[11px] mt-1.5 pt-1.5 border-t border-[#f0eee6]">
                <span className="truncate">{log.trigger}</span>
                <span className="text-[#059669] font-bold flex-shrink-0">{log.duration}ms</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 rounded bg-[#f4f3ef] border border-[#e2dfd6] flex items-center gap-2 text-xs font-mono text-[#52525b]">
          <Lock className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" aria-hidden="true" />
          <span className="leading-snug">Written by Notion bot token — verifiable audit trail.</span>
        </div>
      </div>

      {/* Card 4: Open Source Repository */}
      <a
        href="https://github.com/sharmaa-abhi/Notion.AI"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub Repository in new tab"
        className="dev-card bg-white p-4 flex items-start gap-3.5 border-2 border-[#18181b] hover:shadow-[3px_3px_0px_#18181b] transition-all group block focus-visible:outline-2 focus-visible:outline-[#18181b]"
      >
        <div className="w-8 h-8 rounded-lg bg-[#18181b] text-white flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#dc2626]">
          <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-[#18181b] group-hover:text-[#dc2626] transition-colors flex items-center gap-1">
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" aria-hidden="true" />
            </h3>
          </div>
          {/* Fix 7: Minimum 12px description text */}
          <p className="text-xs text-[#52525b] mt-1 leading-relaxed font-mono">
            Autonomous backend daemon, API handlers & integration tests.
          </p>
        </div>
      </a>
    </div>
  );
}
