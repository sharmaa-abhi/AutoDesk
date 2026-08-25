"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Cpu,
  Brain,
  Database,
  UserCheck,
  Mail,
  FileText,
  ScrollText,
} from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Trigger",
    desc: "Webhook / Form / Cron fires automatically",
    color: "text-cyan-accent",
    bg: "bg-cyan-accent/10",
    border: "border-cyan-accent/20",
    glow: "group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
  },
  {
    icon: Cpu,
    title: "Backend Engine",
    desc: "Your Node.js service validates & processes input",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]",
  },
  {
    icon: Brain,
    title: "AI Classification",
    desc: "Gemini extracts intent, category & priority",
    color: "text-violet-accent",
    bg: "bg-violet-accent/10",
    border: "border-violet-accent/20",
    glow: "group-hover:shadow-[0_0_20px_rgba(124,77,255,0.15)]",
  },
  {
    icon: Database,
    title: "Notion Database",
    desc: "Request card created via API automatically",
    color: "text-amber-accent",
    bg: "bg-amber-accent/10",
    border: "border-amber-accent/20",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,179,0,0.15)]",
  },
  {
    icon: UserCheck,
    title: "Human Approval",
    desc: "Admin reviews & approves in Notion workspace",
    color: "text-emerald-accent",
    bg: "bg-emerald-accent/10",
    border: "border-emerald-accent/20",
    glow: "group-hover:shadow-[0_0_20px_rgba(0,230,118,0.15)]",
  },
  {
    icon: Mail,
    title: "Real Action",
    desc: "Email sent, PDF generated, API called",
    color: "text-crimson-accent",
    bg: "bg-crimson-accent/10",
    border: "border-crimson-accent/20",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,42,85,0.15)]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-full border border-cyan-accent/20">
            SYSTEM PIPELINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gold mt-4 mb-4 text-glow-gold">
            How It Works
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            From trigger to proof — every step is automated, audited, and human-controlled.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className={`group relative p-6 rounded-xl bg-panel border border-border-subtle hover:border-[rgba(255,255,255,0.16)] transition-all duration-300 ${step.glow}`}
            >
              {/* Step Number Badge */}
              <span className="card-label absolute top-4 right-4">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center mb-4`}
              >
                <step.icon className={`w-5 h-5 ${step.color}`} aria-hidden="true" focusable="false" />
              </div>

              {/* Content */}
              <h3 className={`text-lg font-bold ${step.color} mb-2`}>
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Connector Arrow (except last in row) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-text-muted z-10" aria-hidden="true">
                  {(i + 1) % 3 !== 0 && <span className="text-lg">→</span>}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Run Log Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 mx-auto max-w-2xl p-5 rounded-xl bg-panel border border-emerald-accent/20 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center flex-shrink-0">
            <ScrollText className="w-5 h-5 text-emerald-accent" aria-hidden="true" focusable="false" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-accent text-sm flex items-center gap-2">
              <svg
                className="w-4 h-4 text-emerald-accent flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Tamper-Proof Run Log</span>
            </h4>
            <p className="text-text-secondary text-xs mt-1">
              Every action automatically writes a timestamped row to Notion — written by your bot token, not by hand.
            </p>
          </div>
          <div className="ml-auto px-3 py-1 rounded-md bg-emerald-accent/10 text-emerald-accent text-xs font-mono font-bold flex-shrink-0 border border-emerald-accent/20">
            PROOF ✓
          </div>
        </motion.div>
      </div>
    </section>
  );
}
