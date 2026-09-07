"use client";

import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  ShieldCheck,
  Cpu,
  Radio,
  Lock,
  Layers,
  Clock,
  Database,
  Hash,
  CheckCircle2,
} from "lucide-react";

// Orbital pipeline nodes for radar visualization
const RADAR_NODES = [
  { id: "ingress", label: "Ingress", angle: 0, color: "#3b82f6", icon: Radio, latency: "12ms" },
  { id: "antispam", label: "Anti-Spam", angle: 72, color: "#8b5cf6", icon: Lock, latency: "4ms" },
  { id: "gemini", label: "Gemini 2.5", angle: 144, color: "#dc2626", icon: Cpu, latency: "380ms" },
  { id: "hitl", label: "HITL Triage", angle: 216, color: "#d97706", icon: Layers, latency: "42ms" },
  { id: "notion", label: "Notion Vault", angle: 288, color: "#059669", icon: Database, latency: "85ms" },
];

export default function ArchitectureTelemetry({ selectedNode, activeSimulation }) {
  const [activeTab, setActiveTab] = useState("RADAR"); // "RADAR" | "OSCILLOSCOPE" | "CRYPTO"
  const [isBursting, setIsBursting] = useState(false);
  const [processedEvents, setProcessedEvents] = useState(1482);
  const [currentHash, setCurrentHash] = useState("0x7f4e91bc3a84d281ef5690b21a38914c");
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [confidenceRate, setConfidenceRate] = useState(98.6);
  const [latencyValue, setLatencyValue] = useState(380);

  const rawScopeId = useId();
  const scopeId = rawScopeId.replace(/:/g, "_");

  // Rolling hash simulation & continuous heartbeat
  useEffect(() => {
    const hashInterval = setInterval(() => {
      const chars = "0123456789abcdef";
      let res = "0x";
      for (let i = 0; i < 32; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      setCurrentHash(res);
      setProcessedEvents((prev) => prev + Math.floor(Math.random() * 2 + 1));
    }, 2800);

    return () => clearInterval(hashInterval);
  }, []);

  // Sync with selected node from flowchart
  useEffect(() => {
    if (!selectedNode) return;
    if (selectedNode.id === "gemini" || selectedNode.id === "triage") {
      setActiveStageIndex(2);
      setLatencyValue(380);
      setConfidenceRate(98.6);
    } else if (selectedNode.id === "spam") {
      setActiveStageIndex(1);
      setLatencyValue(4);
      setConfidenceRate(99.9);
    } else if (selectedNode.id === "webhook" || selectedNode.id === "user") {
      setActiveStageIndex(0);
      setLatencyValue(12);
      setConfidenceRate(99.4);
    } else if (selectedNode.id === "notion") {
      setActiveStageIndex(4);
      setLatencyValue(85);
      setConfidenceRate(100.0);
    } else {
      setActiveStageIndex(3);
      setLatencyValue(42);
      setConfidenceRate(96.2);
    }
  }, [selectedNode]);

  const handleTriggerBurst = () => {
    if (isBursting) return;
    setIsBursting(true);
    setProcessedEvents((p) => p + 12);
    setTimeout(() => {
      setIsBursting(false);
    }, 1800);
  };

  return (
    <div className="dev-card bg-[var(--bg-panel)] rounded-2xl border-2 border-[var(--border-charcoal)] shadow-[4px_4px_0px_var(--border-charcoal)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden transition-all relative">
      {/* Top Header Strip with Status Indicator */}
      <div className="p-4 sm:p-5 border-b-2 border-[var(--border-charcoal)] bg-[var(--bg-panel-elevated)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#dc2626]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-tight">
                LIVE ENGINE TELEMETRY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
              Sub-second telemetry &amp; cryptographic audit radar
            </span>
          </div>
        </div>

        {/* Live Burst Simulator Button */}
        <motion.button
          type="button"
          onClick={handleTriggerBurst}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_var(--border-charcoal)] ${
            isBursting
              ? "bg-[#dc2626] text-white border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              : "bg-[var(--bg-panel)] text-[var(--text-primary)] hover:border-[#dc2626] border-[var(--border-charcoal)]"
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${isBursting ? "animate-bounce text-white" : "text-[#dc2626]"}`} />
          <span>{isBursting ? "Surge Pulsing..." : "Simulate Traffic Surge"}</span>
        </motion.button>
      </div>

      {/* Sub-Nav View Mode Tabs */}
      <div className="px-4 pt-3 pb-2 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
        <div className="flex items-center gap-1 bg-[var(--bg-card-hover)] p-1 rounded-xl border border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => setActiveTab("RADAR")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "RADAR"
                ? "bg-[var(--border-charcoal)] text-white dark:bg-[#dc2626] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            🛰️ Orbital Radar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("OSCILLOSCOPE")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "OSCILLOSCOPE"
                ? "bg-[var(--border-charcoal)] text-white dark:bg-[#dc2626] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            📊 Waveform Scope
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("CRYPTO")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "CRYPTO"
                ? "bg-[var(--border-charcoal)] text-white dark:bg-[#dc2626] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            🔐 SHA256 Ledger
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#dc2626]" />
            <span>99.99% Uptime</span>
          </span>
          <span className="text-[var(--border-mid)]">|</span>
          <span className="font-semibold text-[var(--text-primary)]">
            {processedEvents.toLocaleString()} Events
          </span>
        </div>
      </div>

      {/* Main Interactive Visualizer Canvas */}
      <div className="p-4 sm:p-6 space-y-5">
        <AnimatePresence mode="wait">
          {activeTab === "RADAR" && (
            <motion.div
              key="tab-radar"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Circular Cybernetic Radar Screen */}
              <div className="relative w-full h-[280px] sm:h-[300px] rounded-2xl bg-[#090b10] border-2 border-slate-800 shadow-inner flex items-center justify-center overflow-hidden">
                {/* Background Concentric Grid Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-64 h-64 rounded-full border border-dashed border-red-500/20 animate-[spin_60s_linear_infinite]" />
                  <div className="w-48 h-48 rounded-full border border-slate-700/50 absolute" />
                  <div className="w-32 h-32 rounded-full border border-emerald-500/20 absolute" />
                  <div className="w-16 h-16 rounded-full border border-slate-700/60 absolute" />
                  {/* Crosshairs */}
                  <div className="w-full h-px bg-slate-800 absolute" />
                  <div className="h-full w-px bg-slate-800 absolute" />
                </div>

                {/* Sweeping Radar Scanner Beam */}
                <div
                  className={`absolute w-72 h-72 rounded-full pointer-events-none transition-opacity ${
                    isBursting ? "opacity-90 animate-[spin_2s_linear_infinite]" : "opacity-40 animate-[spin_8s_linear_infinite]"
                  }`}
                  style={{
                    background: "conic-gradient(from 0deg, transparent 270deg, rgba(220,38,38,0.3) 340deg, rgba(220,38,38,0.7) 360deg)",
                  }}
                />

                {/* Central AI Nucleus */}
                <div className="relative z-10 flex flex-col items-center justify-center p-3 rounded-2xl bg-[#11131a]/90 border-2 border-[#dc2626] shadow-[0_0_25px_rgba(220,38,38,0.45)] backdrop-blur-sm">
                  <motion.div
                    animate={isBursting ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } : { rotate: 360 }}
                    transition={isBursting ? { duration: 0.6, repeat: 2 } : { duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-6 h-6 text-[#dc2626]" />
                  </motion.div>
                  <span className="text-[10px] font-mono font-bold text-white mt-1">ENGINE HUB</span>
                  <span className="text-[9px] font-mono text-emerald-400 font-semibold">{latencyValue}ms</span>
                </div>

                {/* Orbiting Stage Nodes around Center */}
                {RADAR_NODES.map((node, i) => {
                  const radius = 105; // px from center
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const isActive = activeStageIndex === i;
                  const NodeIcon = node.icon;

                  return (
                    <motion.div
                      key={node.id}
                      className="absolute z-20"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      whileHover={{ scale: 1.15 }}
                      onClick={() => setActiveStageIndex(i)}
                    >
                      <div
                        className={`p-2 rounded-xl border-2 flex items-center gap-1.5 cursor-pointer transition-all shadow-md ${
                          isActive
                            ? "bg-[#181a24] border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.6)] scale-105"
                            : "bg-[#0f1118]/90 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        <NodeIcon className="w-3.5 h-3.5" style={{ color: node.color }} />
                        <span className="text-[11px] font-mono font-bold text-slate-200 hidden sm:inline">
                          {node.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Traveling Energy Burst Particles */}
                {isBursting && (
                  <>
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <motion.div
                        key={`particle-${idx}`}
                        className="absolute w-2.5 h-2.5 rounded-full bg-[#dc2626] shadow-[0_0_10px_#dc2626] z-30 pointer-events-none"
                        initial={{ scale: 0.2, opacity: 1, x: 0, y: 0 }}
                        animate={{
                          scale: [0.5, 1.5, 0],
                          opacity: [1, 0.8, 0],
                          x: Math.cos((idx * 72 * Math.PI) / 180) * 140,
                          y: Math.sin((idx * 72 * Math.PI) / 180) * 140,
                        }}
                        transition={{ duration: 1.2, ease: "easeOut", repeat: 1 }}
                      />
                    ))}
                  </>
                )}

                {/* HUD Coordinates in corners */}
                <span className="absolute top-2.5 left-3 text-[9px] font-mono text-slate-400 select-none">
                  RADAR_MODE::ACTIVE_FEED
                </span>
                <span className="absolute top-2.5 right-3 text-[9px] font-mono text-emerald-400 select-none">
                  FREQ: 60Hz STABLE
                </span>
                <span className="absolute bottom-2.5 left-3 text-[9px] font-mono text-slate-500 select-none">
                  COORD [42.10.88.9]
                </span>
                <span className="absolute bottom-2.5 right-3 text-[9px] font-mono text-red-400 select-none">
                  {isBursting ? "SURGE BURST ACTIVE" : "STATUS: MONITORED"}
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === "OSCILLOSCOPE" && (
            <motion.div
              key="tab-scope"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* High-Tech Oscilloscope Waveform Display */}
              <div className="relative w-full h-[280px] sm:h-[300px] rounded-2xl bg-[#08090d] border-2 border-slate-800 p-4 shadow-inner flex flex-col justify-between overflow-hidden">
                {/* Header line inside scope */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2 z-10">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    AI Reasoning Latency Waveform
                  </span>
                  <span>100ms / div | Ch1: Influx | Ch2: Dispatch</span>
                </div>

                {/* Dynamic SVG Waveform Animation */}
                <div className="relative h-40 w-full flex items-center justify-center my-auto">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
                    <defs>
                      <linearGradient id={`${scopeId}-grad`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="40%" stopColor="#dc2626" stopOpacity="1" />
                        <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id={`${scopeId}-area`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />

                    {/* Area under curve */}
                    <path
                      d="M 0 60 Q 50 20 100 60 T 200 60 Q 230 10 260 85 T 320 60 Q 380 30 420 70 T 500 60 L 500 120 L 0 120 Z"
                      fill={`url(#${scopeId}-area)`}
                      className={isBursting ? "animate-pulse" : ""}
                    />

                    {/* Animated Pulsing Wave Path */}
                    <motion.path
                      d="M 0 60 Q 50 20 100 60 T 200 60 Q 230 10 260 85 T 320 60 Q 380 30 420 70 T 500 60"
                      fill="none"
                      stroke={`url(#${scopeId}-grad)`}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{
                        d: isBursting
                          ? [
                              "M 0 60 Q 50 5 100 80 T 200 40 Q 230 -10 260 115 T 320 50 Q 380 15 420 90 T 500 60",
                              "M 0 60 Q 50 70 100 40 T 200 80 Q 230 110 260 20 T 320 75 Q 380 85 420 30 T 500 60",
                              "M 0 60 Q 50 20 100 60 T 200 60 Q 230 10 260 85 T 320 60 Q 380 30 420 70 T 500 60",
                            ]
                          : [
                              "M 0 60 Q 50 20 100 60 T 200 60 Q 230 10 260 85 T 320 60 Q 380 30 420 70 T 500 60",
                              "M 0 60 Q 50 40 100 50 T 200 70 Q 230 30 260 70 T 320 65 Q 380 45 420 60 T 500 60",
                              "M 0 60 Q 50 20 100 60 T 200 60 Q 230 10 260 85 T 320 60 Q 380 30 420 70 T 500 60",
                            ],
                      }}
                      transition={{ duration: isBursting ? 0.6 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Animated Tracer Point */}
                    <circle cx="260" cy="85" r="4.5" fill="#dc2626" className="animate-ping" />
                    <circle cx="260" cy="85" r="3" fill="#ffffff" />
                  </svg>
                </div>

                {/* Oscilloscope Stats Footer */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300">V_PEAK: 1.42V</span>
                  <span className="text-emerald-400">JITTER: &lt; 0.8ms</span>
                  <span className="text-blue-400">FPS: 60.0 STABLE</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "CRYPTO" && (
            <motion.div
              key="tab-crypto"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Cryptographic Proof & Ledger View */}
              <div className="relative w-full h-[280px] sm:h-[300px] rounded-2xl bg-[#0a0c12] border-2 border-slate-800 p-4 sm:p-5 shadow-inner flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-200 block">
                          HMAC-SHA256 Cryptographic Seal
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Immutable Notion Database Block Proof
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      PROOF_VERIFIED
                    </span>
                  </div>

                  {/* Hash Stream Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-[#0e111a] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Hash className="w-3.5 h-3.5 text-[#dc2626]" /> Active Ledger Hash:
                      </span>
                      <span className="text-emerald-400 text-[10px]">SYNCED TO NOTION</span>
                    </div>
                    <div className="font-mono text-xs sm:text-[13px] text-amber-400 break-all font-semibold tracking-wide bg-black/40 p-2.5 rounded-lg border border-slate-800/80">
                      {currentHash}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                      <span className="text-slate-500 block text-[9px]">ENCRYPTION STANDARD</span>
                      <span>AES-256-GCM + SHA256</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                      <span className="text-slate-500 block text-[9px]">BLOCK SIGNATURE</span>
                      <span className="text-emerald-400">STRICT SEALED</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Audit Trail guarantees tamper-free history across all student requests.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4 Bottom Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {/* Metric 1 */}
          <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
              AI Confidence
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-[var(--text-primary)] font-mono">
                {confidenceRate}%
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="w-full bg-[var(--border-subtle)] h-1 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${confidenceRate}%` }}
              />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
              Edge Latency
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-[var(--text-primary)] font-mono">
                {latencyValue}ms
              </span>
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            </div>
            <div className="w-full bg-[var(--border-subtle)] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#dc2626] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (latencyValue / 400) * 100)}%` }}
              />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
              Tamper Rate
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                0.00%
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <span className="text-[9px] font-mono text-[var(--text-muted)] block">
              100% Verified
            </span>
          </div>

          {/* Metric 4 */}
          <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
              Spam Drop
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 font-mono">
                100%
              </span>
              <Lock className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <span className="text-[9px] font-mono text-[var(--text-muted)] block">
              MD5 Guarded
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
