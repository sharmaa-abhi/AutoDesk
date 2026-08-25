"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "user", label: "👤 User", sub: "Submits complaint", category: "INPUT", type: "input" },
  { id: "webhook", label: "🌐 Webhook", sub: "POST /api/pipeline", category: "INPUT", type: "input" },
  { id: "validate", label: "🛡️ Validate", sub: "Sanitize & deduplicate", category: "PROCESSING", type: "process" },
  { id: "ai", label: "🧠 Gemini AI", sub: "Extract intent & classify", category: "PROCESSING", type: "process" },
  { id: "notion", label: "🗄️ Notion DB", sub: "Create request card", category: "PROCESSING", type: "process" },
  { id: "human", label: "🙋 Approval", sub: "Approve / Reject / Override", category: "PROCESSING", type: "process" },
  { id: "action", label: "🚀 Actions", sub: "Email + PDF + API", category: "OUTPUT", type: "output" },
  { id: "runlog", label: "📜 Run Log", sub: "Tamper-proof audit trail", category: "OUTPUT", type: "output" },
];

export default function Architecture() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full border border-emerald-accent/20">
            ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gold mt-4 mb-4 text-glow-gold">
            System Blueprint
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            The complete end-to-end pipeline — from user complaint to automated proof.
          </p>

          {/* Semantic Category Legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mt-6 text-xs font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-accent" aria-hidden="true" />
              <span className="text-text-secondary">INPUT (Ingestion)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-accent" aria-hidden="true" />
              <span className="text-text-secondary">PROCESSING (Engine & AI)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent" aria-hidden="true" />
              <span className="text-text-secondary">OUTPUT (Action & Audit)</span>
            </span>
          </div>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-panel rounded-2xl border border-border-subtle p-8 sm:p-12 overflow-hidden"
        >
          {/* Dot grid inside */}
          <div className="absolute inset-0 dot-grid opacity-50 rounded-2xl" aria-hidden="true" />

          {/* Vertical Flow */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Row 1: User */}
            <FlowNode node={nodes[0]} delay={0} />
            <FlowArrow delay={0.1} />

            {/* Row 2: Webhook */}
            <FlowNode node={nodes[1]} delay={0.15} />
            <FlowArrow delay={0.25} />

            {/* Row 3: Validate */}
            <FlowNode node={nodes[2]} delay={0.3} />
            <FlowArrow delay={0.4} />

            {/* Row 4: AI */}
            <FlowNode node={nodes[3]} delay={0.45} />

            {/* Branch */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex items-start gap-4 sm:gap-8 w-full mt-2"
            >
              {/* Left Branch: Notion + Approval */}
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="text-violet-accent text-xs font-mono mb-1 font-semibold">↓ High Risk (Review)</div>
                <FlowNode node={nodes[4]} delay={0.6} />
                <FlowArrow delay={0.7} />
                <FlowNode node={nodes[5]} delay={0.75} />
              </div>

              {/* Right Branch: Direct Action */}
              <div className="flex-1 flex flex-col items-center gap-4">
                <div className="text-emerald-accent text-xs font-mono mb-1 font-semibold">↓ Low Risk (Verified)</div>
                <FlowNode node={nodes[6]} delay={0.6} />
                <div className="h-[40px]" />
                <div className="text-text-muted text-xs font-mono">↓ auto-execute</div>
              </div>
            </motion.div>

            {/* Merge Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85, duration: 0.3 }}
              className="flex items-center gap-2 text-text-muted text-xs font-mono my-2"
            >
              <span aria-hidden="true">←</span> both paths merge <span aria-hidden="true">→</span>
            </motion.div>

            {/* Run Log */}
            <FlowNode node={nodes[7]} delay={0.9} />

            {/* Final Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-4 px-4 py-2 rounded-full bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent text-xs font-mono font-bold"
            >
              🏁 EXECUTION CYCLE COMPLETE
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FlowNode({ node, delay }) {
  const typeClass =
    node.type === "input"
      ? "blueprint-input"
      : node.type === "process"
      ? "blueprint-process"
      : "blueprint-output";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`w-full max-w-xs px-5 py-3 rounded-xl border text-center transition-colors ${typeClass}`}
    >
      <div className="flex items-center justify-center mb-1">
        <span className="blueprint-category-badge">{node.category}</span>
      </div>
      <div className="font-bold text-sm text-text-white">{node.label}</div>
      <div className="text-text-secondary text-xs mt-0.5">{node.sub}</div>
    </motion.div>
  );
}

function FlowArrow({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="w-[2px] h-8 bg-gradient-to-b from-cyan-accent/60 to-transparent origin-top"
      aria-hidden="true"
    />
  );
}

