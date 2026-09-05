"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js 16", category: "App Router", color: "#6366f1" },
  { name: "Tailwind CSS v4", category: "Styling", color: "#0ea5e9" },
  { name: "Framer Motion", category: "Animation", color: "#ec4899" },
  { name: "Node.js", category: "Backend Engine", color: "#10b981" },
  { name: "Gemini AI", category: "Flash Classifier", color: "#8b5cf6" },
  { name: "Notion API", category: "Human Cockpit", color: "#f59e0b" },
  { name: "Resend", category: "Transactional Mail", color: "#dc2626" },
  { name: "HTML Engine", category: "Verified Certs", color: "#2563eb" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function TechStack() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-wrap items-center justify-center gap-3.5"
    >
      {techStack.map((tech) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          whileHover={{ scale: 1.08, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="dev-card bg-[var(--bg-panel)] px-4 py-2.5 flex flex-col items-center gap-1 min-w-[130px] text-center shadow-[2px_2px_0px_var(--border-charcoal)] hover:shadow-[3.5px_3.5px_0px_var(--border-charcoal)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.8),0_0_12px_rgba(220,38,38,0.2)] transition-all cursor-default"
        >
          <span className="text-xs font-black text-[var(--text-primary)]">{tech.name}</span>
          <span
            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
            style={{ color: tech.color, borderColor: `${tech.color}44`, backgroundColor: `${tech.color}15` }}
          >
            {tech.category}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
