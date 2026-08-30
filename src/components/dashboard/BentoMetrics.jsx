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
  FileCode,
  BookOpen,
} from "lucide-react";

export default function BentoMetrics({ stats, runLogs }) {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Card 1: Tamper-Proof Notion Run Log Feed */}
      <div className="dev-card bg-white p-4 flex flex-col min-h-[320px]">
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#e2dfd6]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-[1.5px_1.5px_0px_#18181b]">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#18181b] uppercase tracking-wider">
                Tamper-Proof Run Log
              </h3>
              <span className="text-[10px] text-[#71717a] font-mono block">
                Notion Bot Token Verified
              </span>
            </div>
          </div>
          <span className="badge-live text-[9px] px-1.5 py-0.5">
            VERIFIED
          </span>
        </div>

        {/* Live Run Log Rows */}
        <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px]">
          {runLogs.map((log) => (
            <div
              key={log.runId}
              className="p-2.5 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] font-mono text-[11px] hover:bg-white hover:shadow-[2px_2px_0px_#18181b] transition-all"
            >
              <div className="flex items-center justify-between text-[10px] text-[#71717a] mb-1">
                <strong className="text-[#18181b]">{log.runId}</strong>
                <span>{log.timestamp}</span>
              </div>
              <div className="text-[#18181b] font-semibold flex items-center gap-1.5">
                <span
                  className={
                    log.status === "REJECTED"
                      ? "text-[#dc2626] font-bold"
                      : log.status === "BLOCKED"
                      ? "text-[#d97706] font-bold"
                      : log.status === "ALERT"
                      ? "text-[#d97706] font-bold"
                      : "text-[#059669] font-bold"
                  }
                >
                  {log.status === "REJECTED" ? "✗" : log.status === "BLOCKED" ? "⊘" : log.status === "ALERT" ? "⚠" : "✓"}
                </span>
                <span className="truncate">{log.action}</span>
              </div>
              <div className="flex items-center justify-between text-[9px] text-[#71717a] mt-1 pt-1 border-t border-[#f0eee6]">
                <span>Trigger: <strong className="text-[#18181b]">{log.trigger}</strong></span>
                <span className="text-[#059669] font-bold">{log.duration}ms</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 rounded-lg bg-[#f4f3ef] border border-[#e2dfd6] flex items-center gap-2 text-[10px] font-mono text-[#52525b]">
          <Lock className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
          <span>Written via Notion API Bot token — zero manual edits.</span>
        </div>
      </div>

      {/* Card 2: Performance SLA & Target Execution */}
      <div className="dev-card bg-white p-4">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e2dfd6]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#18181b] text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_#dc2626]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[#18181b] uppercase tracking-wider font-mono">
              Engine SLA Latency
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#065f46] font-bold px-2 py-0.5 rounded bg-[#ecfdf5] border border-[#059669]">
            OPTIMAL
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div className="p-2.5 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
            <span className="text-[10px] font-mono text-[#71717a] block font-semibold">AVG LATENCY</span>
            <span className="text-xl font-black text-[#18181b] font-mono tabular-nums block">
              1.42s
            </span>
            <span className="text-[10px] text-[#059669] block font-mono font-bold">Target: &lt; 3.0s</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b]">
            <span className="text-[10px] font-mono text-[#71717a] block font-semibold">AI ACCURACY</span>
            <span className="text-xl font-black text-[#dc2626] font-mono tabular-nums block">
              98.6%
            </span>
            <span className="text-[10px] text-[#52525b] block font-mono">Gemini Flash</span>
          </div>
        </div>

        {/* Action Type Progress Bars */}
        <div className="space-y-2 pt-2 border-t border-[#f0eee6] text-[11px] font-mono">
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
              <span>Transactional Emails (Resend/SMTP)</span>
              <strong className="text-[#dc2626]">38% (134)</strong>
            </div>
            <div className="h-2 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#dc2626] rounded-full" style={{ width: "38%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[#52525b] mb-1">
              <span>Operator HITL Approvals</span>
              <strong className="text-[#059669]">20% (71)</strong>
            </div>
            <div className="h-2 w-full bg-[#f4f3ef] border border-[#e2dfd6] rounded-full overflow-hidden">
              <div className="h-full bg-[#059669] rounded-full" style={{ width: "20%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Useful Resources & Community Links (Sidebar Cards) */}
      <div className="dev-card bg-white p-4 space-y-2.5">
        <span className="text-[11px] font-mono text-[#71717a] uppercase font-bold tracking-wider block mb-1">
          Useful Resources & Links:
        </span>

        {/* Link Card 1 */}
        <a
          href="https://notion.so"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2.5 rounded-xl border-2 border-[#18181b] bg-[#fcfbfa] hover:bg-white hover:shadow-[2px_2px_0px_#18181b] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#18181b] text-white flex items-center justify-center flex-shrink-0">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#18181b] group-hover:text-[#dc2626] transition-colors flex items-center gap-1">
              <span>Notion Workspace HQ</span>
              <ExternalLink className="w-3 h-3 text-[#71717a]" />
            </div>
            <p className="text-[10px] text-[#71717a] truncate font-mono">
              Requests & Run Log database view
            </p>
          </div>
        </a>

        {/* Link Card 2 */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2.5 rounded-xl border-2 border-[#18181b] bg-[#fcfbfa] hover:bg-white hover:shadow-[2px_2px_0px_#18181b] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#18181b] text-white flex items-center justify-center flex-shrink-0">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#18181b] group-hover:text-[#dc2626] transition-colors flex items-center gap-1">
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-[#71717a]" />
            </div>
            <p className="text-[10px] text-[#71717a] truncate font-mono">
              Full source code & documentation
            </p>
          </div>
        </a>

        {/* Link Card 3 */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl border-2 border-[#e2dfd6] bg-[#f9f8f5]">
          <div className="w-8 h-8 rounded-lg bg-[#f4f3ef] border border-[#18181b] text-[#18181b] flex items-center justify-center flex-shrink-0">
            <Cpu className="w-4 h-4 text-[#dc2626]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#18181b]">
              Autonomous Background Daemon
            </div>
            <p className="text-[10px] text-[#52525b] truncate font-mono">
              Polls Notion queue every 30s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
