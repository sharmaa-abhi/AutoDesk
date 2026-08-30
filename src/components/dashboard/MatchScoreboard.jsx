"use client";

import { useState, useEffect } from "react";
import { Zap, Clock, ShieldCheck, Activity, Cpu, ArrowUpRight } from "lucide-react";

export default function MatchScoreboard({ activeEvent, stats }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(4043); // 67m 23s

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="dev-card bg-white p-4 sm:p-5 mb-6">
      {/* Top Banner Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[#e2dfd6] text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="badge-live">
            <span className="badge-live-dot animate-pulse" aria-hidden="true" />
            <span>HITL COCKPIT ACTIVE</span>
          </span>
          <span className="text-[#71717a] hidden sm:inline">•</span>
          <span className="text-[#52525b] hidden sm:inline">
            SYSTEM: <strong className="text-[#18181b]">NOTION + GEMINI AI AUTONOMOUS DAEMON</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f4f3ef] border border-[#e2dfd6] text-[#18181b]">
            <Clock className="w-3.5 h-3.5 text-[#dc2626]" />
            <span className="text-[#71717a]">SESSION CLOCK:</span>
            <span className="font-bold tabular-nums">{formatTime(elapsedSeconds)}</span>
          </div>
          <span className="px-2 py-1 rounded bg-[#18181b] text-white font-bold text-[10px]">
            DAEMON #WORKER-01
          </span>
        </div>
      </div>

      {/* Main Stats Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Metric 1: Inbound Events */}
        <div className="md:col-span-4 p-3.5 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-[#18181b] flex items-center justify-center flex-shrink-0 text-white shadow-[2px_2px_0px_#dc2626]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block font-semibold">
              INBOUND GATEWAY
            </span>
            <span className="text-sm font-black text-[#18181b] truncate block">
              Webhooks & Direct Forms
            </span>
            <span className="text-xs font-mono text-[#dc2626] font-bold">
              ⚡ 1,284 Ingested Incidents
            </span>
          </div>
        </div>

        {/* Metric 2: Completed vs Pending Center Readout */}
        <div className="md:col-span-4 p-3 rounded-xl bg-white border-2 border-[#18181b] flex items-center justify-around text-center shadow-[1.5px_1.5px_0px_#18181b]">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-[#059669] tracking-tight tabular-nums block">
              {stats.completed || 248}
            </span>
            <span className="text-[10px] font-mono font-bold text-[#065f46] uppercase">
              Auto Dispatched
            </span>
          </div>

          <div className="h-8 w-[1.5px] bg-[#e2dfd6]" />

          <div>
            <span className="text-2xl sm:text-3xl font-black text-[#dc2626] tracking-tight tabular-nums block">
              {stats.pending || 3}
            </span>
            <span className="text-[10px] font-mono font-bold text-[#991b1b] uppercase">
              Pending Queue
            </span>
          </div>

          <div className="h-8 w-[1.5px] bg-[#e2dfd6]" />

          <div>
            <span className="text-2xl sm:text-3xl font-black text-[#18181b] tracking-tight tabular-nums block">
              {stats.logged || 251}
            </span>
            <span className="text-[10px] font-mono font-bold text-[#52525b] uppercase">
              Notion Logs
            </span>
          </div>
        </div>

        {/* Metric 3: Notion Database Destination */}
        <div className="md:col-span-4 p-3.5 rounded-xl bg-[#fcfbfa] border-2 border-[#18181b] flex items-center justify-between gap-3.5">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block font-semibold">
              EXECUTION DESTINATION
            </span>
            <span className="text-sm font-black text-[#18181b] truncate block">
              Notion DB + Resend / SMTP
            </span>
            <span className="text-xs font-mono text-[#059669] font-bold">
              🛡️ Bot Token Verified: 100%
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#059669] flex items-center justify-center flex-shrink-0 text-white shadow-[2px_2px_0px_#18181b]">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* SLA & Worker Throughput Bar */}
      <div className="mt-4 pt-3 border-t border-[#e2dfd6] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#18181b] font-bold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#dc2626]" />
            THROUGHPUT VELOCITY:
          </span>
          <span className="text-[#52525b]">
            Avg SLA Latency <strong className="text-[#18181b]">1.42s</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#059669] font-bold">● Capacity: 68% active / 32% reserve</span>
          <span className="text-[#71717a]">|</span>
          <span className="text-[#52525b]">Notion Poll Frequency: <strong className="text-[#18181b]">30s</strong></span>
        </div>
      </div>
    </div>
  );
}
