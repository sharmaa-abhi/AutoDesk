"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js", category: "Frontend", color: "text-text-white", bg: "bg-text-white/8", border: "border-text-white/15" },
  { name: "Tailwind CSS", category: "Styling", color: "text-cyan-accent", bg: "bg-cyan-accent/8", border: "border-cyan-accent/15" },
  { name: "Framer Motion", category: "Animation", color: "text-violet-accent", bg: "bg-violet-accent/8", border: "border-violet-accent/15" },
  { name: "Node.js", category: "Backend", color: "text-emerald-accent", bg: "bg-emerald-accent/8", border: "border-emerald-accent/15" },
  { name: "Gemini AI", category: "Intelligence", color: "text-amber-accent", bg: "bg-amber-accent/8", border: "border-amber-accent/15" },
  { name: "Notion API", category: "Database", color: "text-gold", bg: "bg-gold/8", border: "border-gold/15" },
  { name: "Resend", category: "Email", color: "text-crimson-accent", bg: "bg-crimson-accent/8", border: "border-crimson-accent/15" },
  { name: "PDFKit", category: "PDF Gen", color: "text-orange-accent", bg: "bg-orange-accent/8", border: "border-orange-accent/15" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function TechStack() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {techStack.map((tech) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`px-5 py-3 rounded-xl ${tech.bg} border ${tech.border} flex flex-col items-center gap-1 min-w-[100px] cursor-default`}
        >
          <span className={`text-sm font-bold ${tech.color}`}>{tech.name}</span>
          <span className="text-text-muted text-[10px] font-mono">
            {tech.category}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
