"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Brain,
  Database,
  UserCheck,
  Mail,
  ScrollText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "1. Trigger",
    desc: "Webhook / Form / Cron fires automatically upon student complaint",
    accent: "#3b82f6",
    tag: "INGESTION",
  },
  {
    icon: Cpu,
    title: "2. Backend Engine",
    desc: "Node.js service validates, sanitizes, and hashes for deduplication",
    accent: "#6366f1",
    tag: "SANITIZE",
  },
  {
    icon: Brain,
    title: "3. AI Classification",
    desc: "Gemini extracts intent, attendance entity, priority, and action type",
    accent: "#8b5cf6",
    tag: "GEMINI 3.6",
  },
  {
    icon: Database,
    title: "4. Notion Database",
    desc: "Live request page created automatically via Notion REST API",
    accent: "#ec4899",
    tag: "NOTION SYNC",
  },
  {
    icon: UserCheck,
    title: "5. Human Approval",
    desc: "Admin clears pending incidents with 1-click in Notion cockpit",
    accent: "#f59e0b",
    tag: "HUMAN-IN-LOOP",
  },
  {
    icon: Mail,
    title: "6. Real Action & Log",
    desc: "Certificate generated, transactional email sent, run log sealed",
    accent: "#10b981",
    tag: "DISPATCH & AUDIT",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-charcoal)]">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626] animate-spin" style={{ animationDuration: "6s" }} />
            <span className="font-bold">SYSTEM PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            How The Autonomous Engine Works
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            From inbound trigger to tamper-proof proof — every step is automated, audited, and human-supervised.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.025 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="dev-card bg-[var(--bg-panel)] p-6 relative flex flex-col justify-between group overflow-hidden transition-all hover:shadow-[6px_6px_0px_var(--border-charcoal)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.9),0_0_20px_rgba(220,38,38,0.25)]"
            >
              {/* Dynamic top color highlight with pulse sweep */}
              <div
                className="absolute top-0 left-0 right-0 h-[3.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: step.accent }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    className="w-11 h-11 rounded-xl bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center shadow-[2px_2px_0px_#dc2626] dark:shadow-[0_0_12px_rgba(220,38,38,0.5)] transition-transform"
                  >
                    <step.icon className="w-5 h-5 text-white" aria-hidden="true" focusable="false" />
                  </motion.div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[var(--bg-card-hover)] border border-[var(--border-charcoal)] text-[var(--text-primary)] group-hover:bg-[var(--border-charcoal)] group-hover:text-white transition-all shadow-[1px_1px_0px_var(--border-charcoal)]">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
                    style={{ color: step.accent, borderColor: `${step.accent}55`, backgroundColor: `${step.accent}15` }}
                  >
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#dc2626] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Card Footer Indicator */}
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Status: <strong className="text-[#059669] dark:text-[#10b981]">Automated</strong></span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#dc2626] font-bold">
                  Active ➔
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tamper-Proof Audit Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.015, y: -3 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="dev-card bg-[var(--bg-panel)] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto cursor-default shadow-[3.5px_3.5px_0px_var(--border-charcoal)] hover:shadow-[6px_6px_0px_#059669] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(5,150,105,0.3)] transition-all relative overflow-hidden"
        >
          {/* Subtle live radar ping effect */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#059669]/10 rounded-full blur-xl pointer-events-none" />

          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-xl bg-[#059669] text-white flex items-center justify-center flex-shrink-0 shadow-[2.5px_2.5px_0px_var(--border-charcoal)]"
          >
            <ScrollText className="w-6 h-6 text-white" aria-hidden="true" focusable="false" />
          </motion.div>
          <div className="text-center sm:text-left flex-1">
            <h4 className="font-bold text-[var(--text-primary)] text-sm flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span>Tamper-Proof Run Log Verification</span>
              <span className="badge-live text-[9px] bg-[#ecfdf5] dark:bg-emerald-950/40 text-[#065f46] dark:text-emerald-400 border border-[#059669]/40 font-mono font-bold px-2 py-0.5 rounded">
                BOT TOKEN PROOF
              </span>
            </h4>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-1 leading-relaxed">
              Every action automatically writes a timestamped execution row to Notion — written via the Notion Integration Bot token, never manually entered.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
