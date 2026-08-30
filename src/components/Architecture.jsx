"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "user", label: "👤 Student / User", sub: "Submits natural complaint", category: "INPUT", type: "input" },
  { id: "webhook", label: "🌐 Webhook Gateway", sub: "POST /api/pipeline", category: "INPUT", type: "input" },
  { id: "validate", label: "🛡️ Sanitize & Deduplicate", sub: "MD5 24h Duplicate Guard", category: "PROCESSING", type: "process" },
  { id: "ai", label: "🧠 Gemini Flash AI", sub: "Extract intent & schema JSON", category: "PROCESSING", type: "process" },
  { id: "notion", label: "🗄️ Notion Database", sub: "Create live incident page", category: "PROCESSING", type: "process" },
  { id: "human", label: "🙋 Human-in-the-Loop", sub: "Approve / Reject Cockpit", category: "PROCESSING", type: "process" },
  { id: "action", label: "🚀 Action Dispatcher", sub: "HTML Certificate + Resend SMTP", category: "OUTPUT", type: "output" },
  { id: "runlog", label: "📜 Notion Run Log", sub: "Tamper-proof audit proof", category: "OUTPUT", type: "output" },
];

const nodeVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.2 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export default function Architecture() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <span>SYSTEM BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
            End-to-End Pipeline Architecture
          </h2>
          <p className="text-sm sm:text-base text-[#52525b] max-w-xl mx-auto">
            The complete blueprint — from student complaint ingestion to audited real-world execution.
          </p>

          {/* Semantic Category Legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mt-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 font-bold text-[#18181b]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18181b]" aria-hidden="true" />
              <span>INPUT (Ingestion)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#18181b]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" aria-hidden="true" />
              <span>PROCESSING (AI & Notion)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#18181b]">
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
          className="dev-card bg-white p-6 sm:p-10 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Row 1: User */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[0]} />
            </motion.div>
            <motion.div variants={arrowVariants} className="origin-top">
              <FlowArrow />
            </motion.div>

            {/* Row 2: Webhook */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[1]} />
            </motion.div>
            <motion.div variants={arrowVariants} className="origin-top">
              <FlowArrow />
            </motion.div>

            {/* Row 3: Validate */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[2]} />
            </motion.div>
            <motion.div variants={arrowVariants} className="origin-top">
              <FlowArrow />
            </motion.div>

            {/* Row 4: AI */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[3]} />
            </motion.div>

            {/* Branch */}
            <motion.div variants={nodeVariants} className="flex items-start gap-4 sm:gap-8 w-full mt-2">
              {/* Left Branch: Notion + Approval */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="text-[#dc2626] text-xs font-mono font-bold">↓ Needs Approval (High Risk)</div>
                <FlowNode node={nodes[4]} />
                <FlowArrow />
                <FlowNode node={nodes[5]} />
              </div>

              {/* Right Branch: Direct Action */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="text-[#059669] text-xs font-mono font-bold">↓ Verified (Auto Execute)</div>
                <FlowNode node={nodes[6]} />
                <div className="h-[44px]" />
                <div className="text-[#71717a] text-xs font-mono">↓ auto-dispatch</div>
              </div>
            </motion.div>

            {/* Merge Arrow */}
            <motion.div variants={nodeVariants} className="text-[#71717a] text-xs font-mono my-2 font-bold">
              ← Both Paths Merge →
            </motion.div>

            {/* Run Log */}
            <motion.div variants={nodeVariants} className="w-full flex justify-center">
              <FlowNode node={nodes[7]} />
            </motion.div>

            {/* Final Badge */}
            <motion.div
              variants={nodeVariants}
              className="mt-4 px-4 py-2 rounded-full bg-[#ecfdf5] border-2 border-[#059669] text-[#065f46] text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b]"
            >
              🏁 TAMPER-PROOF RUN LOG PROOF SEALED
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FlowNode({ node }) {
  const badgeClass =
    node.type === "input"
      ? "bg-[#f4f3ef] text-[#18181b] border-[#18181b]"
      : node.type === "process"
      ? "bg-[#fee2e2] text-[#991b1b] border-[#dc2626]"
      : "bg-[#ecfdf5] text-[#065f46] border-[#059669]";

  return (
    <div className="w-full max-w-sm px-5 py-3 rounded-xl border-2 border-[#18181b] bg-[#fcfbfa] shadow-[2px_2px_0px_#18181b] text-center">
      <div className="flex items-center justify-center mb-1">
        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
          {node.category}
        </span>
      </div>
      <div className="font-bold text-sm text-[#18181b]">{node.label}</div>
      <div className="text-[#52525b] text-xs mt-0.5 font-mono">{node.sub}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="w-[2px] h-6 bg-[#18181b] my-0.5" aria-hidden="true" />
  );
}
