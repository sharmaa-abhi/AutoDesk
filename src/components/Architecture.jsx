"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

const nodes = [
  { id: "user", label: "👤 Student / User", sub: "Submits natural complaint", category: "INPUT", type: "input" },
  { id: "webhook", label: "🌐 Webhook Gateway", sub: "POST /api/pipeline", category: "INPUT", type: "input" },
  { id: "validate", label: "🛡️ Sanitize & Deduplicate", sub: "MD5 24h Duplicate Guard", category: "PROCESSING", type: "process" },
  { id: "ai", label: "🧠 Gemini 3.6 Flash AI", sub: "Extract intent & schema JSON", category: "PROCESSING", type: "process" },
  { id: "notion", label: "🗄️ Notion Database", sub: "Create live incident page", category: "PROCESSING", type: "process" },
  { id: "human", label: "🙋 Human-in-the-Loop", sub: "Approve / Reject Cockpit", category: "PROCESSING", type: "process" },
  { id: "action", label: "🚀 Action Dispatcher", sub: "HTML Certificate + Resend/SMTP", category: "OUTPUT", type: "output" },
  { id: "runlog", label: "📜 Notion Run Log", sub: "Tamper-proof audit proof", category: "OUTPUT", type: "output" },
];

const nodeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function Architecture() {
  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-charcoal)]">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626] animate-spin" style={{ animationDuration: "6s" }} />
            <span className="font-bold">SYSTEM BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            End-to-End Pipeline Architecture
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            The complete blueprint — from student complaint ingestion to audited real-world execution.
          </p>

          {/* Semantic Category Legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mt-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 font-bold text-[var(--text-primary)] bg-[var(--bg-panel)] px-3 py-1 rounded-full border border-[var(--border-charcoal)] shadow-[1px_1px_0px_var(--border-charcoal)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-charcoal)]" aria-hidden="true" />
              <span>INPUT (Ingestion)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[var(--text-primary)] bg-[var(--bg-panel)] px-3 py-1 rounded-full border border-[var(--border-charcoal)] shadow-[1px_1px_0px_#dc2626]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" aria-hidden="true" />
              <span>PROCESSING (AI & Notion)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[var(--text-primary)] bg-[var(--bg-panel)] px-3 py-1 rounded-full border border-[var(--border-charcoal)] shadow-[1px_1px_0px_#059669]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" aria-hidden="true" />
              <span>OUTPUT (Action & Audit)</span>
            </span>
          </div>
        </motion.div>

        {/* Architecture Diagram Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="dev-card bg-[var(--bg-panel)] p-6 sm:p-10 relative overflow-hidden shadow-[4px_4px_0px_var(--border-charcoal)] hover:shadow-[6px_6px_0px_var(--border-charcoal)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(220,38,38,0.25)] transition-all"
        >
          {/* Subtle Grid Paper Pattern Background */}
          <div className="absolute inset-0 grid-paper opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Row 1: User */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[0]} />
            </motion.div>
            <motion.div variants={arrowVariants} className="origin-top">
              <FlowArrow color="#3b82f6" />
            </motion.div>

            {/* Row 2: Webhook */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[1]} />
            </motion.div>
            <motion.div variants={arrowVariants} className="origin-top">
              <FlowArrow color="#2563eb" />
            </motion.div>

            {/* Row 3: Validate */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[2]} />
            </motion.div>
            <motion.div variants={arrowVariants} className="origin-top">
              <FlowArrow color="#7c3aed" />
            </motion.div>

            {/* Row 4: AI */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[3]} highlightAI />
            </motion.div>

            {/* Branching Stage */}
            <motion.div variants={nodeVariants} className="flex items-start gap-4 sm:gap-8 w-full mt-2">
              {/* Left Branch: Notion + Approval */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[#dc2626] text-xs font-mono font-bold flex items-center gap-1"
                >
                  <span>↓ Needs Approval (High Risk)</span>
                </motion.div>
                <FlowNode node={nodes[4]} />
                <FlowArrow color="#dc2626" />
                <FlowNode node={nodes[5]} />
              </div>

              {/* Right Branch: Direct Action */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-[#059669] dark:text-[#10b981] text-xs font-mono font-bold flex items-center gap-1"
                >
                  <span>↓ Verified (Auto Execute)</span>
                </motion.div>
                <FlowNode node={nodes[6]} />
                <div className="h-[44px] flex items-center justify-center">
                  <FlowArrow color="#059669" />
                </div>
                <div className="text-[var(--text-muted)] text-xs font-mono font-semibold">↓ auto-dispatch</div>
              </div>
            </motion.div>

            {/* Merge Arrow with Animated Travelling Pulse */}
            <motion.div
              variants={nodeVariants}
              className="my-3 px-4 py-1 rounded-full bg-[var(--bg-card-hover)] border border-[var(--border-charcoal)] text-[var(--text-primary)] text-xs font-mono font-bold flex items-center gap-2 shadow-[1px_1px_0px_var(--border-charcoal)]"
            >
              <motion.span
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ⮜ Both Execution Paths Converge ⮞
              </motion.span>
            </motion.div>

            {/* Run Log */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[7]} />
            </motion.div>

            {/* Final Badge with interactive bounce */}
            <motion.div
              variants={nodeVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/40 border-2 border-[#059669] text-[#065f46] dark:text-emerald-400 text-xs font-mono font-bold shadow-[2.5px_2.5px_0px_var(--border-charcoal)] dark:shadow-[0_0_15px_rgba(5,150,105,0.3)] cursor-default flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse shadow-[0_0_8px_#059669]" />
              <span>🏁 TAMPER-PROOF RUN LOG PROOF SEALED</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FlowNode({ node, highlightAI = false }) {
  const badgeClass =
    node.type === "input"
      ? "bg-[var(--bg-card-hover)] text-[var(--text-primary)] border-[var(--border-charcoal)]"
      : node.type === "process"
      ? "bg-[#fee2e2] dark:bg-red-950/40 text-[#991b1b] dark:text-red-400 border-[#dc2626]"
      : "bg-[#ecfdf5] dark:bg-emerald-950/40 text-[#065f46] dark:text-emerald-400 border-[#059669]";

  return (
    <motion.div
      whileHover={{ scale: 1.035, y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className={`w-full max-w-sm px-5 py-3 rounded-xl border-2 border-[var(--border-charcoal)] bg-[var(--bg-panel-elevated)] shadow-[2.5px_2.5px_0px_var(--border-charcoal)] text-center transition-all hover:shadow-[4.5px_4.5px_0px_var(--border-charcoal)] cursor-default relative overflow-hidden ${
        highlightAI ? "border-[#dc2626] shadow-[2.5px_2.5px_0px_#dc2626] dark:shadow-[0_0_15px_rgba(220,38,38,0.35)]" : ""
      }`}
    >
      {highlightAI && (
        <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#dc2626] text-white text-[9px] font-mono font-bold rounded-bl-lg shadow-[0_0_8px_#dc2626]">
          CORE
        </div>
      )}
      <div className="flex items-center justify-center mb-1">
        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
          {node.category}
        </span>
      </div>
      <div className="font-bold text-sm text-[var(--text-primary)]">{node.label}</div>
      <div className="text-[var(--text-secondary)] text-xs mt-0.5 font-mono">{node.sub}</div>
    </motion.div>
  );
}

function FlowArrow({ color = "#dc2626" }) {
  return (
    <div className="relative w-[2.5px] h-7 bg-[var(--border-charcoal)] my-0.5 overflow-hidden rounded-full">
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-4 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
