"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js 16", category: "App Router" },
  { name: "Tailwind CSS v4", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Node.js", category: "Backend Engine" },
  { name: "Gemini AI", category: "Flash Classifier" },
  { name: "Notion API", category: "Human Cockpit" },
  { name: "Resend", category: "Transactional Mail" },
  { name: "HTML Engine", category: "Verified Certs" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function TechStack() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {techStack.map((tech) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          className="dev-card bg-white px-4 py-2.5 flex flex-col items-center gap-0.5 min-w-[120px] text-center"
        >
          <span className="text-xs font-black text-[#18181b]">{tech.name}</span>
          <span className="text-[10px] text-[#71717a] font-mono font-bold">
            {tech.category}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
