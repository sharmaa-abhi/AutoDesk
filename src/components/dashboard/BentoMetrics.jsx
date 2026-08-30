"use client";

import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Cpu,
  Lock,
  ExternalLink,
  Code2,
  Database,
  Play,
  ShieldAlert,
  Radio,
  BookOpen,
} from "lucide-react";

export default function BentoMetrics({ stats, runLogs, onSimulateWebhook }) {
  return (
    <div className="space-y-4">
      {/* Sidebar Section Header */}
      <span className="text-[11px] font-mono text-[#71717a] uppercase font-bold tracking-wider block px-1">
        Utilities & Telemetry:
      </span>

      {/* Card 1: Notion Workspace DB */}
      <a
        href="https://notion.so"
        target="_blank"
        rel="noopener noreferrer"
        className="dev-card bg-white p-4 flex items-start gap-3.5 border-2 border-[#18181b] hover:shadow-[3px_3px_0px_#18181b] transition-all group block"
      >
        <div className="w-9 h-9 rounded-lg bg-[#18181b] text-white flex items-center justify-center flex-shrink-0 shadow-[1.5px_1.5px_0px_#dc2626]">
          <Database className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#18181b] group-hover:text-[#dc2626] transition-colors flex items-center gap-1">
              <span>Notion Workspace DB</span>
              <ExternalLink className="w-3 h-3 text-[#71717a]" />
            </h3>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#ecfdf5] text-[#065f46] border border-[#059669]">
              LIVE
            </span>
          </div>
          <p className="text-[10px] text-[#52525b] mt-0.5 leading-relaxed font-mono">
            Human-in-the-loop audit cockpit & synchronized request records.
          </p>
        </div>
      </a>

      {/* Card 2: Engine SLA & Performance Telemetry */}
      <div className="dev-card bg-white p-4 border-2 border-[#18181b]">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e2dfd6]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#18181b] text-white flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-black text-[#18181b] uppercase tracking-wider font-mono">
              Engine Performance
            </h3>
          </div>
          <span className="text-[9px] font-mono text-[#065f46] font-bold px-1.5 py-0.5 rounded bg-[#ecfdf5] border border-[#059669]">
            OPTIMAL
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 font-mono">
          <div className="p-2 rounded-lg bg-[#fcfbfa] border-2 border-[#18181b]">
            <span className="text-[9px] text-[#71717a] block font-bold">AVG LATENCY</span>
            <span className="text-lg font-black text-[#18181b] block">1.42s</span>
            <span className="text-[9px] text-[#059669] font-bold block">Target: &lt;3.0s</span>
          </div>

          <div className="p-2 rounded-lg bg-[#fcfbfa] border-2 border-[#18181b]">
            <span className="text-[9px] text-[#71717a] block font-bold">AI ACCURACY</span>
            <span className="text-lg font-black text-[#dc2626] block">98.6%</span>
            <span className="text-[9px] text-[#52525b] block">Gemini Flash</span>
          </div>
        </div>

        {/* Action Type Progress Bars */}
        <div className="space-y-1.5 pt-1 text-[10px] font-mono">
          <div>
            <div className="flex justify-between text-[#52525b] mb-0.5">
              <span>PDF Certificates Dispatched</span>
              <strong className="text-[#18181b]">42% (148)</strong>
            </div>
            <div className="h-1.5 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#18181b] rounded-full" style={{ width: "42%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[#52525b] mb-0.5">
              <span>Transactional Emails (Resend/SMTP)</span>
              <strong className="text-[#dc2626]">38% (134)</strong>
            </div>
            <div className="h-1.5 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#dc2626] rounded-full" style={{ width: "38%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[#52525b] mb-0.5">
              <span>Operator Clearance</span>
              <strong className="text-[#059669]">20% (71)</strong>
            </div>
            <div className="h-1.5 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#059669] rounded-full" style={{ width: "20%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Tamper-Proof Notion Run Log Feed */}
      <div className="dev-card bg-white p-4 flex flex-col border-2 border-[#18181b] min-h-[290px]">
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#e2dfd6]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#059669] text-white flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#18181b] uppercase tracking-wider">
                Tamper-Proof Run Log
              </h3>
              <span className="text-[9px] text-[#71717a] font-mono block">
                Notion Bot Token
              </span>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#065f46] border border-[#059669]">
            PROOF
          </span>
        </div>

        {/* Live Run Log Rows */}
        <div className="flex-1 overflow-y-auto space-y-2 max-h-[180px]">
          {runLogs.map((log) => (
            <div
              key={log.runId}
              className="p-2 rounded-lg bg-[#fcfbfa] border border-[#18181b] font-mono text-[10px] hover:bg-white transition-all"
            >
              <div className="flex items-center justify-between text-[#71717a] mb-0.5">
                <strong className="text-[#18181b]">{log.runId}</strong>
                <span>{log.timestamp}</span>
              </div>
              <div className="text-[#18181b] font-bold flex items-center gap-1 truncate">
                <span
                  className={
                    log.status === "REJECTED"
                      ? "text-[#dc2626]"
                      : log.status === "BLOCKED"
                      ? "text-[#d97706]"
                      : "text-[#059669]"
                  }
                >
                  {log.status === "REJECTED" ? "✗" : log.status === "BLOCKED" ? "⊘" : "✓"}
                </span>
                <span className="truncate">{log.action}</span>
              </div>
              <div className="flex items-center justify-between text-[#71717a] mt-1 pt-1 border-t border-[#f0eee6]">
                <span>{log.trigger}</span>
                <span className="text-[#059669] font-bold">{log.duration}ms</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 p-1.5 rounded bg-[#f4f3ef] border border-[#e2dfd6] flex items-center gap-1.5 text-[9px] font-mono text-[#52525b]">
          <Lock className="w-3 h-3 text-[#059669] flex-shrink-0" />
          <span>Written by Notion bot token — cannot be spoofed.</span>
        </div>
      </div>

      {/* Card 4: Open Source Repository */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="dev-card bg-white p-3.5 flex items-start gap-3 border-2 border-[#18181b] hover:shadow-[2.5px_2.5px_0px_#18181b] transition-all group block"
      >
        <div className="w-8 h-8 rounded-lg bg-[#18181b] text-white flex items-center justify-center flex-shrink-0">
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#18181b] group-hover:text-[#dc2626] transition-colors flex items-center gap-1">
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-[#71717a]" />
            </h3>
          </div>
          <p className="text-[10px] text-[#52525b] mt-0.5 leading-relaxed font-mono">
            Autonomous backend daemon, API handlers & tests.
          </p>
        </div>
      </a>
    </div>
  );
}
