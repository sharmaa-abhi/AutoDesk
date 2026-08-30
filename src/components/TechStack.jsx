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

export default function TechStack() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {techStack.map((tech) => (
        <div
          key={tech.name}
          className="dev-card bg-white px-4 py-2.5 flex flex-col items-center gap-0.5 min-w-[120px] text-center"
        >
          <span className="text-xs font-black text-[#18181b]">{tech.name}</span>
          <span className="text-[10px] text-[#71717a] font-mono font-bold">
            {tech.category}
          </span>
        </div>
      ))}
    </div>
  );
}
