"use client";

import { motion } from "framer-motion";
import { Brain, UserCheck, Mail, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Classification",
    desc: "Gemini API reads raw multi-lingual natural language input and extracts structured intent, category, and priority. Zero hardcoded regex.",
    tag: "GEMINI 3.6 FLASH",
    accent: "#3b82f6",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-Loop Cockpit",
    desc: "Ambiguous or sensitive actions automatically pause for human clearance inside Notion. Operators approve, reject, or resolve with full context.",
    tag: "NOTION HQ",
    accent: "#f59e0b",
  },
  {
    icon: Mail,
    title: "Real-World Execution",
    desc: "The engine produces dynamic, tamper-proof HTML/SVG certificates and dispatches them via Resend or Gmail SMTP directly to students.",
    tag: "EMAIL + CERT DISPATCH",
    accent: "#10b981",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Proof Run Log",
    desc: "Every automated cycle writes a timestamped record via bot integration token. Anyone can verify in Notion — manual spoofing is strictly prevented.",
    tag: "NOTION AUDIT PROOF",
    accent: "#dc2626",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
            Engineered For True Autonomy
          </h2>
          <p className="text-sm sm:text-base text-[#52525b] max-w-xl mx-auto">
            Not a mockup or chatbot. A robust, audited production automation system with live backend dispatching.
          </p>
        </motion.div>

        {/* 2x2 Feature Bento Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              className="dev-card bg-white p-7 relative flex flex-col justify-between group overflow-hidden transition-all hover:shadow-[5px_5px_0px_#18181b]"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: f.accent }}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-[2px_2px_0px_#dc2626] transition-transform"
                  >
                    <f.icon className="w-6 h-6 text-white" aria-hidden="true" focusable="false" />
                  </motion.div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#18181b] text-[#18181b] group-hover:bg-[#18181b] group-hover:text-white transition-colors">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#18181b] mb-2.5 group-hover:text-[#dc2626] transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
