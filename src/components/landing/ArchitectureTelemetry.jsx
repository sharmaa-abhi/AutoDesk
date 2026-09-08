"use client";

import { useState, useEffect, useId, useRef } from "react";
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
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Terminal,
  CheckCircle2,
} from "lucide-react";

// The 5 sequential pipeline stages that process every student ticket
const PIPELINE_STAGES = [
  {
    id: "ingress",
    step: "01",
    label: "Ingress Gateway",
    shortLabel: "Ingress",
    icon: Radio,
    color: "#3b82f6",
    latency: 12,
    confidence: 99.4,
    status: "ACTIVE INGEST",
    role: "Inbound Dispatcher",
    desc: "Captures incoming student emails, portal submissions & webhook events in under 15ms.",
    livePayload: "📩 INBOUND [aarav@univ.edu]: 'Need extension on assignment 3 due to medical leave'",
    actionDetail: "Signed token #TK-8492 issued • Zero dropped requests",
    badge: "STAGE 1",
    // SVG coordinates (viewBox 500 x 340)
    svgX: 95,
    svgY: 75,
  },
  {
    id: "antispam",
    step: "02",
    label: "Anti-Spam & Dedup",
    shortLabel: "Anti-Spam",
    icon: Lock,
    color: "#a855f7",
    latency: 4,
    confidence: 99.9,
    status: "INTEGRITY SHIELD",
    role: "Edge Sanitizer",
    desc: "Screens out bot spam, drops duplicate rapid-fire tickets, and enforces rate limits before AI calls.",
    livePayload: "🛡️ DEDUP CHECK: MD5 signature unique • Rate 1/min OK • Threat Score: 0.00 (Safe)",
    actionDetail: "Filtered junk & prevented duplicate AI token consumption",
    badge: "STAGE 2",
    svgX: 405,
    svgY: 75,
  },
  {
    id: "gemini",
    step: "03",
    label: "Gemini 2.5 Flash Brain",
    shortLabel: "Gemini 2.5",
    icon: Cpu,
    color: "#dc2626",
    latency: 380,
    confidence: 99.4,
    status: "NEURAL INFERENCE",
    role: "Core Reasoning",
    desc: "Contextually analyzes intent, student sentiment & course syllabus to classify priority and draft answers.",
    livePayload: "🧠 REASONING: Intent='Medical Leave Extension' • Urgency='HIGH' • Sentiment='Anxious'",
    actionDetail: "Structured output generated with 99.4% confidence score",
    badge: "STAGE 3",
    svgX: 415,
    svgY: 255,
  },
  {
    id: "hitl",
    step: "04",
    label: "HITL Triage Cockpit",
    shortLabel: "HITL Triage",
    icon: Layers,
    color: "#f59e0b",
    latency: 42,
    confidence: 98.6,
    status: "INTELLIGENT GATE",
    role: "Safety Protocol",
    desc: "Autonomous approval for high-confidence queries; routes ambiguous edge cases (<90%) to human staff.",
    livePayload: "⚖️ TRIAGE RULE: Confidence 99.4% > 90% threshold → Auto-approved for direct Notion commit",
    actionDetail: "Zero hallucinations allowed • Escalate on anomaly",
    badge: "STAGE 4",
    svgX: 250,
    svgY: 295,
  },
  {
    id: "notion",
    step: "05",
    label: "Notion Vault Sync",
    shortLabel: "Notion Vault",
    icon: Database,
    color: "#10b981",
    latency: 85,
    confidence: 100.0,
    status: "PERSISTED & SEALED",
    role: "Database State",
    desc: "Instantly commits verified record into Notion Database blocks with immutable timestamp & alert.",
    livePayload: "💾 NOTION SYNC: Row #5831 created in 'Active Inquiries' • Slack alert sent to TA",
    actionDetail: "Tamper-proof log preserved • Two-way real-time sync",
    badge: "STAGE 5",
    svgX: 85,
    svgY: 255,
  },
];

export default function ArchitectureTelemetry({ selectedNode, activeSimulation }) {
  const [activeTab, setActiveTab] = useState("RADAR"); // "RADAR" | "OSCILLOSCOPE"
  const [isBursting, setIsBursting] = useState(false);
  const [processedEvents, setProcessedEvents] = useState(1489);
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const rawScopeId = useId();
  const scopeId = rawScopeId.replace(/:/g, "_");

  // Continuous background event counter increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessedEvents((prev) => prev + Math.floor(Math.random() * 2 + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Auto-tour through the 5 pipeline stages every 3.2s
  useEffect(() => {
    if (!isAutoPlaying || isBursting) return;
    const tourInterval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 3200);
    return () => clearInterval(tourInterval);
  }, [isAutoPlaying, isBursting]);

  // Sync with selected node from the flowchart outside
  useEffect(() => {
    if (!selectedNode) return;
    if (selectedNode.id === "gemini" || selectedNode.id === "triage") {
      setActiveStageIndex(2);
      setIsAutoPlaying(false);
    } else if (selectedNode.id === "spam") {
      setActiveStageIndex(1);
      setIsAutoPlaying(false);
    } else if (selectedNode.id === "webhook" || selectedNode.id === "user") {
      setActiveStageIndex(0);
      setIsAutoPlaying(false);
    } else if (selectedNode.id === "notion") {
      setActiveStageIndex(4);
      setIsAutoPlaying(false);
    } else {
      setActiveStageIndex(3);
      setIsAutoPlaying(false);
    }
  }, [selectedNode]);

  const handleTriggerBurst = () => {
    if (isBursting) return;
    setIsBursting(true);
    setProcessedEvents((p) => p + 18);
    // Rapidly cycle during surge
    let cycleCount = 0;
    const burstCycle = setInterval(() => {
      cycleCount++;
      setActiveStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
      if (cycleCount >= 5) {
        clearInterval(burstCycle);
      }
    }, 350);

    setTimeout(() => {
      setIsBursting(false);
    }, 2200);
  };

  const currentStage = PIPELINE_STAGES[activeStageIndex];
  const CurrentIcon = currentStage.icon;

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
              Interactive request pipeline &amp; real-time execution flow
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
              ? "bg-[#dc2626] text-white border-[#dc2626] shadow-[0_0_18px_rgba(220,38,38,0.7)]"
              : "bg-[var(--bg-panel)] text-[var(--text-primary)] hover:border-[#dc2626] border-[var(--border-charcoal)]"
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${isBursting ? "animate-bounce text-white" : "text-[#dc2626]"}`} />
          <span>{isBursting ? "Simulating Traffic Surge..." : "Simulate Traffic Surge"}</span>
        </motion.button>
      </div>

      {/* Sub-Nav View Mode Tabs & Controls */}
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
            🛰️ Orbital Radar &amp; Flow
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
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
          {activeTab === "RADAR" && (
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-[var(--border-subtle)] hover:border-[#dc2626] bg-[var(--bg-card-hover)] text-[var(--text-primary)] transition-all cursor-pointer mr-1"
              title="Toggle automatic pipeline step progression"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-2.5 h-2.5 text-amber-500" />
                  <span className="text-[10px]">Auto-Tour: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5 text-emerald-500" />
                  <span className="text-[10px]">Auto-Tour: PAUSED</span>
                </>
              )}
            </button>
          )}
          <span className="hidden sm:flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#dc2626]" />
            <span>99.99% Uptime</span>
          </span>
          <span className="hidden sm:inline text-[var(--border-mid)]">|</span>
          <span className="font-semibold text-[var(--text-primary)]">
            {processedEvents.toLocaleString()} Events
          </span>
        </div>
      </div>

      {/* Main Interactive Visualizer Canvas */}
      <div className="p-4 sm:p-5 space-y-4">
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
              {/* Circular Cybernetic Radar Screen with Directed Animated Pipeline Circuit */}
              <div className="relative w-full h-[320px] sm:h-[340px] rounded-2xl bg-[#080a10] border-2 border-slate-800 shadow-inner flex items-center justify-center overflow-hidden">
                {/* Background Concentric Radar Rings & Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-80 h-80 rounded-full border border-dashed border-red-500/20 animate-[spin_80s_linear_infinite]" />
                  <div className="w-64 h-64 rounded-full border border-slate-700/40 absolute" />
                  <div className="w-44 h-44 rounded-full border border-emerald-500/20 absolute" />
                  <div className="w-24 h-24 rounded-full border border-slate-700/60 absolute" />
                  <div className="w-full h-px bg-slate-800/80 absolute" />
                  <div className="h-full w-px bg-slate-800/80 absolute" />
                </div>

                {/* Sweeping Radar Scanner Beam */}
                <div
                  className={`absolute w-80 h-80 rounded-full pointer-events-none transition-opacity ${
                    isBursting ? "opacity-90 animate-[spin_2s_linear_infinite]" : "opacity-35 animate-[spin_9s_linear_infinite]"
                  }`}
                  style={{
                    background: "conic-gradient(from 0deg, transparent 270deg, rgba(220,38,38,0.2) 340deg, rgba(220,38,38,0.65) 360deg)",
                  }}
                />

                {/* SVG Connecting Tracks & Animated Data Packets */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 500 340"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="30%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#dc2626" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Spoke Lines from Center Hub (250, 165) to all 5 Nodes */}
                  <line x1="250" y1="165" x2="95" y2="75" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="250" y1="165" x2="405" y2="75" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="250" y1="165" x2="415" y2="255" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="250" y1="165" x2="250" y2="295" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <line x1="250" y1="165" x2="85" y2="255" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

                  {/* Main Sequential Pipeline Loop Track */}
                  {/* Ingress (95,75) -> Anti-Spam (405,75) -> Gemini (415,255) -> HITL (250,295) -> Notion (85,255) -> Close */}
                  <path
                    d="M 95 75 L 405 75 L 415 255 L 250 295 L 85 255 Z"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="3"
                  />

                  {/* Active Glowing Pulse Track */}
                  <path
                    d="M 95 75 L 405 75 L 415 255 L 250 295 L 85 255 Z"
                    fill="none"
                    stroke="url(#trackGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="14 180"
                    className={isBursting ? "animate-[dash_1s_linear_infinite]" : "animate-[dash_4s_linear_infinite]"}
                    filter="url(#glow)"
                  />

                  {/* Directed Flow Chevrons along track */}
                  <path d="M 245 71 L 255 75 L 245 79" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 406 160 L 410 170 L 414 160" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 335 272 L 325 277 L 331 283" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 165 283 L 171 277 L 161 272" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 86 170 L 90 160 L 94 170" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                </svg>

                {/* Central Engine Hub Nucleus (250, 165) */}
                <div className="relative z-10 flex flex-col items-center justify-center px-3.5 py-2.5 rounded-2xl bg-[#0e111a]/95 border-2 border-[#dc2626] shadow-[0_0_25px_rgba(220,38,38,0.5)] backdrop-blur-sm select-none">
                  {/* Burst Ripple Rings */}
                  {isBursting && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-red-500 pointer-events-none"
                      initial={{ scale: 1, opacity: 0.9 }}
                      animate={{ scale: [1, 1.8, 2.4], opacity: [0.9, 0.4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                  <motion.div
                    animate={isBursting ? { scale: [1, 1.25, 1], rotate: [0, 180, 360] } : { rotate: 360 }}
                    transition={isBursting ? { duration: 0.6, repeat: Infinity } : { duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-5 h-5 text-[#dc2626]" />
                  </motion.div>
                  <span className="text-[10px] font-mono font-bold text-white mt-1 tracking-wider">
                    ENGINE HUB
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">
                    {currentStage.latency}ms
                  </span>
                </div>

                {/* The 5 Pipeline Stage Nodes Positioned Relative to viewBox Coordinates */}
                {PIPELINE_STAGES.map((stage, i) => {
                  const isActive = activeStageIndex === i;
                  const NodeIcon = stage.icon;

                  // Convert 500x340 viewBox coords into percentage offsets
                  const leftPercent = `${(stage.svgX / 500) * 100}%`;
                  const topPercent = `${(stage.svgY / 340) * 100}%`;

                  return (
                    <motion.div
                      key={stage.id}
                      className="absolute z-20"
                      style={{
                        left: leftPercent,
                        top: topPercent,
                        transform: "translate(-50%, -50%)",
                      }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveStageIndex(i);
                        setIsAutoPlaying(false);
                      }}
                    >
                      <div
                        className={`px-2.5 py-1.5 rounded-xl border-2 flex items-center gap-2 cursor-pointer transition-all shadow-md ${
                          isActive
                            ? "bg-[#181a26] border-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.7)] scale-105"
                            : "bg-[#0c0e16]/95 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {/* Step Number Tag */}
                        <span
                          className="text-[9px] font-mono font-black px-1 py-0.2 rounded"
                          style={{
                            backgroundColor: `${stage.color}25`,
                            color: stage.color,
                          }}
                        >
                          {stage.step}
                        </span>

                        <NodeIcon className="w-3.5 h-3.5 shrink-0" style={{ color: stage.color }} />

                        <div className="flex flex-col text-left">
                          <span className="text-[11px] font-mono font-bold text-slate-200 whitespace-nowrap">
                            {stage.shortLabel}
                          </span>
                        </div>

                        {/* Active Blinking Beacon */}
                        {isActive && (
                          <span className="relative flex h-2 w-2 shrink-0 ml-0.5">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ backgroundColor: stage.color }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-2 w-2"
                              style={{ backgroundColor: stage.color }}
                            />
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* HUD Coordinates in corners */}
                <div className="absolute top-2.5 left-3 flex items-center gap-1.5 text-[9px] font-mono text-slate-400 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>RADAR::PIPELINE_FEED</span>
                </div>
                <span className="absolute top-2.5 right-3 text-[9px] font-mono text-emerald-400 select-none">
                  STAGE {currentStage.step}/05 ACTIVE
                </span>
                <span className="absolute bottom-2.5 left-3 text-[9px] font-mono text-slate-500 select-none hidden sm:inline">
                  TOPOLOGY [CYCLE_LOOP]
                </span>
                <span className="absolute bottom-2.5 right-3 text-[9px] font-mono text-red-400 select-none">
                  {isBursting ? "⚡ HIGH-SPEED SURGE PULSE" : `LATENCY: ${currentStage.latency}ms`}
                </span>
              </div>

              {/* Explainer & Interactive Stage Inspector Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-panel-elevated)] border-2 border-[var(--border-subtle)] space-y-3">
                {/* Stage Header Info with Progress Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-1.5 rounded-lg border flex items-center justify-center"
                      style={{
                        backgroundColor: `${currentStage.color}18`,
                        borderColor: `${currentStage.color}50`,
                      }}
                    >
                      <CurrentIcon className="w-4 h-4" style={{ color: currentStage.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          Step {currentStage.step}: {currentStage.label}
                        </span>
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase"
                          style={{
                            backgroundColor: `${currentStage.color}20`,
                            color: currentStage.color,
                            borderColor: `${currentStage.color}40`,
                          }}
                        >
                          {currentStage.role}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[var(--text-secondary)] mt-0.5">
                        {currentStage.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">
                      ⚡ {currentStage.latency}ms
                    </span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-blue-400 font-semibold">
                      ✓ {currentStage.confidence}% Confidence
                    </span>
                  </div>
                </div>

                {/* Simulated Live Packet Execution Terminal */}
                <div className="p-2.5 rounded-lg bg-[#07090e] border border-slate-800 font-mono text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/80 pb-1">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Terminal className="w-3 h-3 text-[#dc2626]" />
                      LIVE DATA PACKET TRANSFORMATION:
                    </span>
                    <span className="text-emerald-400 font-bold">{currentStage.status}</span>
                  </div>
                  <div className="text-amber-400 pt-0.5 leading-relaxed break-all">
                    {currentStage.livePayload}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{currentStage.actionDetail}</span>
                  </div>
                </div>

                {/* Quick 5-Step Pipeline Stepper Navigation */}
                <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto pb-1">
                  {PIPELINE_STAGES.map((s, idx) => {
                    const isCurrent = activeStageIndex === idx;
                    const SIcon = s.icon;
                    return (
                      <button
                        key={`step-btn-${s.id}`}
                        type="button"
                        onClick={() => {
                          setActiveStageIndex(idx);
                          setIsAutoPlaying(false);
                        }}
                        className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-lg border text-left transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-[var(--border-charcoal)] text-white border-[#dc2626] shadow-sm scale-100"
                            : "bg-[var(--bg-card-hover)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold">
                          <SIcon className="w-2.5 h-2.5" style={{ color: s.color }} />
                          <span>#{s.step}</span>
                        </div>
                        <span className="text-[10px] font-mono truncate block mt-0.5">
                          {s.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
              <div className="relative w-full h-[320px] sm:h-[340px] rounded-2xl bg-[#08090d] border-2 border-slate-800 p-4 shadow-inner flex flex-col justify-between overflow-hidden">
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
                              "M 0 60 Q 50 10 100 80 T 200 40 Q 230 5 260 110 T 320 40 Q 380 15 420 90 T 500 60",
                              "M 0 60 Q 50 80 100 30 T 200 90 Q 230 105 260 20 T 320 90 Q 380 100 420 30 T 500 60",
                              "M 0 60 Q 50 10 100 80 T 200 40 Q 230 5 260 110 T 320 40 Q 380 15 420 90 T 500 60",
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
                {currentStage.confidence}%
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="w-full bg-[var(--border-subtle)] h-1 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentStage.confidence}%` }}
              />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-3 rounded-xl bg-[var(--bg-panel-elevated)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
              Stage Latency
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-[var(--text-primary)] font-mono">
                {currentStage.latency}ms
              </span>
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            </div>
            <div className="w-full bg-[var(--border-subtle)] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#dc2626] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentStage.latency / 400) * 100)}%` }}
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
