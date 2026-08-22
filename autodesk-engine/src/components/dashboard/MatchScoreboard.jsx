"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Clock, ShieldCheck, Flame, ArrowUpRight, Cpu, Radio } from "lucide-react";

export default function MatchScoreboard({ activeEvent, stats }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(4043); // 67m 23s
  const [livePulse, setLivePulse] = useState(true);

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
    <div className="relative rounded-2xl bg-panel border border-border-subtle overflow-hidden shadow-2xl p-5 mb-6">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-32 bg-amber-accent/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Banner Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-border-subtle text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-accent/15 border border-emerald-accent/30 text-emerald-accent font-bold tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            MATCH CENTER ACTIVE
          </span>
          <span className="text-text-muted hidden sm:inline">|</span>
          <span className="text-text-secondary hidden sm:inline">
            COHORT: <span className="text-gold font-bold">2026-AUG HACKATHON</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Clock className="w-3.5 h-3.5 text-cyan-accent" />
            <span className="text-text-muted">MATCH CLOCK:</span>
            <span className="text-cyan-accent font-bold text-sm tracking-wider tabular-nums">
              ⏱ {formatTime(elapsedSeconds)}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-panel-elevated border border-border-subtle text-text-white text-[11px]">
            DAEMON #WORKER-01
          </span>
        </div>
      </div>

      {/* Main Scoreboard VS Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        {/* Left Side: INBOUND INGESTION CREST */}
        <div className="md:col-span-4 flex items-center gap-4 bg-panel-elevated/60 p-3.5 rounded-xl border border-border-subtle">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-accent/20 to-cyan-accent/5 border border-cyan-accent/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <Zap className="w-6 h-6 text-cyan-accent" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-semibold">
              Source Inbound
            </span>
            <span className="text-base font-bold text-text-white truncate">
              Webhooks & Forms
            </span>
            <span className="text-[11px] text-text-muted font-mono">
              ⚡ 1,284 Ingested Events
            </span>
          </div>
        </div>

        {/* Center: SCORE / AUTOMATION STATUS READOUT */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-emerald-accent tracking-tight tabular-nums">
                {stats.completed || 248}
              </span>
              <span className="block text-[10px] font-mono text-emerald-accent/80 uppercase font-semibold">
                Auto Actions
              </span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="text-xs font-mono text-text-muted uppercase tracking-widest">
                VS QUEUE
              </span>
              <span className="text-lg font-black text-amber-accent/80">:</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-accent/15 border border-amber-accent/30 text-amber-accent font-mono font-bold mt-0.5">
                {stats.pending || 3} PENDING
              </span>
            </div>

            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-gold tracking-tight tabular-nums">
                {stats.logged || 251}
              </span>
              <span className="block text-[10px] font-mono text-gold/80 uppercase font-semibold">
                Run Logs
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: NOTION & EXECUTION CREST */}
        <div className="md:col-span-4 flex items-center justify-end gap-4 bg-panel-elevated/60 p-3.5 rounded-xl border border-border-subtle text-right">
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-accent font-semibold">
              Execution Destination
            </span>
            <span className="text-base font-bold text-text-white truncate">
              Notion + PDF + Resend
            </span>
            <span className="text-[11px] text-text-muted font-mono">
              🛡️ Bot Token Proof: 100%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-accent/20 to-emerald-accent/5 border border-emerald-accent/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,230,118,0.15)]">
            <ShieldCheck className="w-6 h-6 text-emerald-accent" />
          </div>
        </div>
      </div>

      {/* Real-time Momentum Velocity Bar */}
      <div className="mt-4 pt-3 border-t border-border-subtle">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
          <span className="text-cyan-accent flex items-center gap-1 font-semibold">
            <Flame className="w-3.5 h-3.5" />
            AUTOMATION PRESSURE (68%)
          </span>
          <span className="text-text-muted">
            THROUGHPUT: <span className="text-gold font-bold">1.42s avg latency</span>
          </span>
          <span className="text-emerald-accent font-semibold">
            WORKER CAPACITY (32% free)
          </span>
        </div>
        <div className="h-2 w-full bg-canvas rounded-full overflow-hidden flex border border-border-subtle p-0.5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-accent via-violet-accent to-amber-accent rounded-l-full"
          />
          <div className="h-full bg-panel-elevated flex-1 rounded-r-full" />
        </div>
      </div>
    </div>
  );
}
