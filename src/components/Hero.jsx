"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Plus } from "lucide-react";
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        {/* Top Developer Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[2px_2px_0px_#18181b]">
          <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" aria-hidden="true" />
          <span className="font-bold">Automate India 2026</span>
          <span className="text-[#71717a]">•</span>
          <span>Notion + Gemini Autonomous Engine</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#18181b] leading-[1.08]">
            Kill One Boring Job.{" "}
            <span className="text-[#dc2626] underline decoration-4 decoration-[#18181b]">
              Completely.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#52525b] max-w-2xl mx-auto leading-relaxed">
            An <strong className="text-[#18181b]">autonomous backend automation service</strong> that eliminates repetitive student requests. Notion serves as the control center, Gemini AI classifies incoming tickets, and verified real-world actions execute in seconds.
          </p>
        </motion.div>

        {/* Primary Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls="ticket-dialog"
            aria-expanded={modalOpen}
            onClick={() => setModalOpen(true)}
            className="btn-primary btn-primary-lg text-sm w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" aria-hidden="true" focusable="false" />
            <span>Submit Live Ticket</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" focusable="false" />
          </button>

          <Link
            href="/dashboard"
            className="btn-secondary btn-secondary-lg text-sm w-full sm:w-auto"
          >
            <Activity className="w-4 h-4 text-[#dc2626]" aria-hidden="true" focusable="false" />
            <span>Open Live Cockpit</span>
          </Link>
        </motion.div>

        <SubmitRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Bottom Formula Container Card */}
        <motion.div
          variants={itemVariants}
          className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#18181b] shadow-[3px_3px_0px_#18181b] max-w-3xl mx-auto"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717a] block mb-2.5">
            5-Stage Real-Time Pipeline Architecture
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-[#18181b] font-bold">
            <span className="px-2.5 py-1 rounded bg-[#f4f3ef] border border-[#18181b]">⚡ Ingest</span>
            <span className="text-[#71717a]">→</span>
            <span className="px-2.5 py-1 rounded bg-[#f4f3ef] border border-[#18181b]">🧠 Gemini AI</span>
            <span className="text-[#71717a]">→</span>
            <span className="px-2.5 py-1 rounded bg-[#f4f3ef] border border-[#18181b]">📥 Notion Queue</span>
            <span className="text-[#71717a]">→</span>
            <span className="px-2.5 py-1 rounded bg-[#f4f3ef] border border-[#18181b]">🙋 HITL Approval</span>
            <span className="text-[#71717a]">→</span>
            <span className="px-2.5 py-1 rounded bg-[#dc2626] text-white border border-[#18181b]">📜 Notion Run Log</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
