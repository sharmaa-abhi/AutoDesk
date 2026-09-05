"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Plus,
  Sparkles,
  Zap,
  ShieldCheck,
  Bot,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import SubmitRequestModal from "@/components/SubmitRequestModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 24,
      },
    },
  };

  const pipelineStages = [
    { icon: "⚡", label: "Ingest", color: "#2563eb" },
    { icon: "🧠", label: "Gemini AI", color: "#7c3aed" },
    { icon: "📥", label: "Notion Queue", color: "#d97706" },
    { icon: "🙋", label: "HITL Approval", color: "#dc2626" },
    { icon: "📜", label: "Notion Run Log", highlight: true, color: "#059669" },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden">
      {/* Dynamic Animated Ambient Background Orbs with multi-axis drift */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.18, 0.35, 0.18],
            x: [0, 45, 0],
            y: [0, -35, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/6 left-1/5 w-96 h-96 rounded-full bg-[#dc2626]/20 dark:bg-[#dc2626]/25 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/6 right-1/5 w-[28rem] h-[28rem] rounded-full bg-[#059669]/20 dark:bg-[#059669]/25 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [0.9, 1.2, 0.9],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-[#3b82f6]/15 dark:bg-[#3b82f6]/20 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        {/* Top Developer Badge with Interactive Ping */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.06, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] text-xs font-mono text-[var(--text-primary)] shadow-[2.5px_2.5px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(220,38,38,0.25),2px_2px_0px_var(--border-charcoal)] cursor-default transition-all hover:shadow-[4px_4px_0px_#dc2626]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dc2626]" />
          </span>
          <span className="font-bold">Automate India 2026</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-[var(--text-secondary)] font-medium">Notion + Gemini Autonomous Engine</span>
        </motion.div>

        {/* Main Headline with High-Impact Typography & Animated Underline */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] leading-[1.08]">
            Kill One Boring Job.{" "}
            <motion.span
              animate={{
                color: ["#dc2626", "#ef4444", "#f87171", "#dc2626"],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#dc2626] underline decoration-4 decoration-[var(--border-charcoal)] inline-block relative drop-shadow-[0_2px_10px_rgba(220,38,38,0.3)]"
            >
              Completely.
            </motion.span>
          </h1>

          <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            An <strong className="text-[var(--text-primary)] font-bold">autonomous backend automation service</strong> that eliminates repetitive student requests. Notion serves as the control center, Gemini AI classifies incoming tickets, and verified real-world actions execute in seconds.
          </p>
        </motion.div>

        {/* Primary Call to Action Buttons with Spring Micro-interactions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <motion.button
            type="button"
            aria-haspopup="dialog"
            aria-controls="ticket-dialog"
            aria-expanded={modalOpen}
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="btn-primary btn-primary-lg text-sm w-full sm:w-auto relative overflow-hidden group shadow-[3px_3px_0px_var(--border-charcoal)] dark:shadow-[0_0_20px_rgba(220,38,38,0.4),2px_2px_0px_#dc2626] hover:shadow-[5px_5px_0px_var(--border-charcoal)]"
          >
            {/* Shimmer Light Reflection effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
            <Plus className="w-4 h-4 stroke-[3] group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" focusable="false" />
            <span>Submit Live Ticket</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" focusable="false" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              href="/dashboard"
              className="btn-secondary btn-secondary-lg text-sm w-full sm:w-auto shadow-[3px_3px_0px_var(--border-charcoal)] hover:shadow-[5px_5px_0px_var(--border-charcoal)] transition-all group"
            >
              <Activity className="w-4 h-4 text-[#dc2626] group-hover:scale-125 transition-transform" aria-hidden="true" focusable="false" />
              <span>Open Live Cockpit</span>
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse ml-1 shadow-[0_0_8px_#059669]" />
            </Link>
          </motion.div>
        </motion.div>

        <SubmitRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Bottom Formula Container Card with Moving Laser Beam & Interactive Stages */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative p-5 sm:p-6 rounded-2xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.85),2px_2px_0px_var(--border-charcoal)] max-w-3xl mx-auto overflow-hidden transition-all hover:shadow-[6px_6px_0px_var(--border-charcoal)] dark:hover:shadow-[0_16px_40px_-5px_rgba(0,0,0,0.9),0_0_20px_rgba(220,38,38,0.25),2px_2px_0px_#dc2626]"
        >
          {/* Animated subtle top border light sweep */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--border-subtle)] overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_8px_#dc2626]"
            />
          </div>

          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse shadow-[0_0_8px_#059669]" />
              <span>5-Stage Real-Time Pipeline Architecture</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-[#059669] dark:text-emerald-400 bg-[#ecfdf5] dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-[#059669]/30">
              ⚡ ~1.4s TOTAL LATENCY
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-[var(--text-primary)] font-bold">
            {pipelineStages.map((stage, idx) => (
              <div key={stage.label} className="flex items-center gap-2 sm:gap-3">
                <motion.span
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`px-3 py-1.5 rounded-lg border-2 border-[var(--border-charcoal)] transition-all cursor-default shadow-[1.5px_1.5px_0px_var(--border-charcoal)] ${
                    stage.highlight
                      ? "bg-[#dc2626] text-white shadow-[2px_2px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                      : "bg-[var(--bg-panel-elevated)] hover:bg-[var(--bg-card-hover)] hover:shadow-[2.5px_2.5px_0px_var(--border-charcoal)]"
                  }`}
                >
                  <span className="mr-1.5">{stage.icon}</span>
                  <span>{stage.label}</span>
                </motion.span>
                {idx < pipelineStages.length - 1 && (
                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 1, 0.4],
                      x: [0, 2, 0],
                    }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: idx * 0.22 }}
                    className="text-[#dc2626] font-black text-sm"
                  >
                    ➔
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
