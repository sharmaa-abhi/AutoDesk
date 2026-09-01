"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Code2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="border-t-2 border-[#18181b] bg-white mt-auto"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center md:text-left">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-6 h-6 rounded-md bg-[#18181b] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626]">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} aria-hidden="true" focusable="false" />
              </div>
              <span className="text-sm font-black text-[#18181b]">
                AutoDesk<span className="text-[#dc2626]">.Engine</span>
              </span>
            </Link>
            <p className="text-[#71717a] text-xs font-mono">
              © 2026 AutoDesk Engine. Built for Automate India Hackathon.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav aria-label="Footer navigation" className="flex items-center justify-center gap-6 flex-wrap font-mono text-xs">
            <Link
              href="/"
              className="text-[#52525b] hover:text-[#18181b] font-bold transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/#how-it-works"
              className="text-[#52525b] hover:text-[#18181b] font-bold transition-colors"
            >
              Pipeline
            </Link>
            <Link
              href="/dashboard"
              className="text-[#52525b] hover:text-[#18181b] font-bold transition-colors"
            >
              Live Cockpit
            </Link>
            <Link
              href="/about"
              className="text-[#52525b] hover:text-[#18181b] font-bold transition-colors"
            >
              About Team
            </Link>
          </nav>

          {/* Right: Status & External Links */}
          <div className="flex items-center justify-center md:justify-end gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#18181b] bg-[#f4f3ef] px-3 py-1.5 rounded-md border border-[#e2dfd6]">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" aria-hidden="true" />
              <span>Status: <strong className="text-[#059669] font-bold">100% Uptime</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/sharmaa-abhi/Notion.AI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" focusable="false" />
              </a>
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Notion Workspace"
                className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" focusable="false" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
