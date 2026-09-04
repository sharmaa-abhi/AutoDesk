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
} from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "1. Trigger",
    desc: "Webhook / Form / Cron fires automatically upon student complaint",
    accent: "#3b82f6",
  },
  {
    icon: Cpu,
    title: "2. Backend Engine",
    desc: "Node.js service validates, sanitizes, and hashes for deduplication",
    accent: "#6366f1",
  },
  {
    icon: Brain,
    title: "3. AI Classification",
    desc: "Gemini extracts intent, attendance entity, priority, and action type",
    accent: "#8b5cf6",
  },
  {
    icon: Database,
    title: "4. Notion Database",
    desc: "Live request page created automatically via Notion REST API",
    accent: "#ec4899",
  },
  {
    icon: UserCheck,
    title: "5. Human Approval",
    desc: "Admin clears pending incidents with 1-click in Notion cockpit",
    accent: "#f59e0b",
  },
  {
    icon: Mail,
    title: "6. Real Action & Log",
    desc: "Certificate generated, transactional email sent, run log sealed",
    accent: "#10b981",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>SYSTEM PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
            How The Autonomous Engine Works
          </h2>
          <p className="text-sm sm:text-base text-[#52525b] max-w-xl mx-auto">
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
              whileHover={{ y: -6, scale: 1.02 }}
              className="dev-card bg-white p-6 relative flex flex-col justify-between group overflow-hidden transition-all hover:shadow-[5px_5px_0px_#18181b]"
            >
              {/* Subtle top color highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: step.accent }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-10 h-10 rounded-lg bg-[#18181b] text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_#dc2626] transition-transform"
                  >
                    <step.icon className="w-5 h-5 text-white" aria-hidden="true" focusable="false" />
                  </motion.div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#18181b] text-[#18181b] group-hover:bg-[#18181b] group-hover:text-white transition-colors">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#18181b] mb-2 group-hover:text-[#dc2626] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tamper-Proof Audit Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01, y: -2 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="dev-card bg-white p-5 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto cursor-default shadow-[3px_3px_0px_#18181b] hover:shadow-[5px_5px_0px_#059669] transition-all"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-11 h-11 rounded-lg bg-[#059669] text-white flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#18181b]"
          >
            <ScrollText className="w-5 h-5 text-white" aria-hidden="true" focusable="false" />
          </motion.div>
          <div className="text-center sm:text-left flex-1">
            <h4 className="font-bold text-[#18181b] text-sm flex items-center justify-center sm:justify-start gap-2">
              <span>Tamper-Proof Run Log Verification</span>
              <span className="badge-live text-[9px] bg-[#ecfdf5] text-[#065f46] border border-[#059669]/40 font-mono font-bold px-1.5 py-0.5 rounded">BOT TOKEN PROOF</span>
            </h4>
            <p className="text-[#52525b] text-xs mt-1">
              Every action automatically writes a timestamped execution row to Notion — written via the Notion Integration Bot token, never manually entered.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
