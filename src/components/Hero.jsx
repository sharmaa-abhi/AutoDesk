"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Plus, Sparkles, Zap, ShieldCheck } from "lucide-react";
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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const pipelineStages = [
    { icon: "⚡", label: "Ingest" },
    { icon: "🧠", label: "Gemini AI" },
    { icon: "📥", label: "Notion Queue" },
    { icon: "🙋", label: "HITL Approval" },
    { icon: "📜", label: "Notion Run Log", highlight: true },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden">
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#dc2626]/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.12, 0.22, 0.12],
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#059669]/15 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        {/* Top Developer Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[2px_2px_0px_#18181b] cursor-default transition-shadow hover:shadow-[3px_3px_0px_#dc2626]"
        >
          <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" aria-hidden="true" />
          <span className="font-bold">Automate India 2026</span>
          <span className="text-[#71717a]">•</span>
          <span>Notion + Gemini Autonomous Engine</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#18181b] leading-[1.08]">
            Kill One Boring Job.{" "}
            <motion.span
              animate={{ color: ["#dc2626", "#b91c1c", "#dc2626"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-[#dc2626] underline decoration-4 decoration-[#18181b] inline-block"
            >
              Completely.
            </motion.span>
          </h1>

          <p className="text-base sm:text-xl text-[#52525b] max-w-2xl mx-auto leading-relaxed">
            An <strong className="text-[#18181b]">autonomous backend automation service</strong> that eliminates repetitive student requests. Notion serves as the control center, Gemini AI classifies incoming tickets, and verified real-world actions execute in seconds.
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
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary btn-primary-lg text-sm w-full sm:w-auto relative overflow-hidden group shadow-[3px_3px_0px_#18181b] hover:shadow-[5px_5px_0px_#18181b]"
          >
            <Plus className="w-4 h-4 stroke-[3] group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" focusable="false" />
            <span>Submit Live Ticket</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" focusable="false" />
          </motion.button>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="btn-secondary btn-secondary-lg text-sm w-full sm:w-auto shadow-[3px_3px_0px_#18181b] hover:shadow-[5px_5px_0px_#18181b] transition-all"
            >
              <Activity className="w-4 h-4 text-[#dc2626] animate-pulse" aria-hidden="true" focusable="false" />
              <span>Open Live Cockpit</span>
            </Link>
          </motion.div>
        </motion.div>

        <SubmitRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Bottom Formula Container Card with Animated Flow Highlight */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3 }}
          className="relative p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#18181b] shadow-[3px_3px_0px_#18181b] max-w-3xl mx-auto overflow-hidden transition-all hover:shadow-[5px_5px_0px_#18181b]"
        >
          {/* Animated subtle top border light sweep */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/3 h-[3px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent"
          />

          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717a] block mb-2.5">
            5-Stage Real-Time Pipeline Architecture
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-[#18181b] font-bold">
            {pipelineStages.map((stage, idx) => (
              <div key={stage.label} className="flex items-center gap-2 sm:gap-3">
                <motion.span
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`px-2.5 py-1 rounded border border-[#18181b] transition-colors cursor-default ${
                    stage.highlight
                      ? "bg-[#dc2626] text-white shadow-[1px_1px_0px_#18181b]"
                      : "bg-[#f4f3ef] hover:bg-[#e4e2dc]"
                  }`}
                >
                  {stage.icon} {stage.label}
                </motion.span>
                {idx < pipelineStages.length - 1 && (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.25 }}
                    className="text-[#dc2626] font-bold"
                  >
                    →
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
