"use client";

import { motion } from "framer-motion";
import { Brain, UserCheck, Mail, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Classification",
    desc: "Gemini API reads messy, multi-lingual input — extracts intent, category, and priority. No lookup tables needed.",
    color: "text-violet-accent",
    bg: "bg-violet-accent/8",
    border: "border-violet-accent/15",
    tag: "GEMINI",
    tagColor: "text-violet-accent bg-violet-accent/10",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-Loop",
    desc: "Risky decisions pause for human approval inside Notion. Admin approves, rejects, or overrides with full context.",
    color: "text-amber-accent",
    bg: "bg-amber-accent/8",
    border: "border-amber-accent/15",
    tag: "NOTION",
    tagColor: "text-amber-accent bg-amber-accent/10",
  },
  {
    icon: Mail,
    title: "Real-World Actions",
    desc: "System generates PDF certificates, sends transactional emails, and calls external APIs — not just dashboard numbers.",
    color: "text-crimson-accent",
    bg: "bg-crimson-accent/8",
    border: "border-crimson-accent/15",
    tag: "EMAIL + PDF",
    tagColor: "text-crimson-accent bg-crimson-accent/10",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Proof Audit Log",
    desc: "Every execution writes a timestamped row via bot API token. Judges can verify — rows typed by hand are detected.",
    color: "text-emerald-accent",
    bg: "bg-emerald-accent/8",
    border: "border-emerald-accent/15",
    tag: "RUN LOG",
    tagColor: "text-emerald-accent bg-emerald-accent/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="orb orb-cyan w-[300px] h-[300px] top-0 right-0 animate-pulse-glow" />
      <div className="orb orb-violet w-[250px] h-[250px] bottom-20 -left-20 animate-float-slow" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-amber-accent bg-amber-accent/10 px-3 py-1 rounded-full border border-amber-accent/20">
            CORE FEATURES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gold mt-4 mb-4 text-glow-gold">
            Built to Actually Work
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Not a dashboard. Not a chatbot. A real automation engine with proof.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative p-8 rounded-2xl bg-panel border border-border-subtle hover:border-[rgba(255,255,255,0.14)] transition-all duration-300`}
            >
              {/* Tag */}
              <span
                className={`absolute top-5 right-5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${f.tagColor}`}
              >
                {f.tag}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${f.bg} border ${f.border} flex items-center justify-center mb-5`}
              >
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold ${f.color} mb-3`}>{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-8 right-8 h-[2px] rounded-full ${f.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
