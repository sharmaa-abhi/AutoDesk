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
      className="border-t-2 border-[var(--border-charcoal)] bg-[var(--bg-panel)] mt-auto transition-colors duration-200 shadow-[0_-4px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center md:text-left">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-6 h-6 rounded-md bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626] dark:shadow-[0_0_8px_#dc2626]">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} aria-hidden="true" focusable="false" />
              </div>
              <span className="text-sm font-black text-[var(--text-primary)]">
                AutoDesk<span className="text-[#dc2626]">.Engine</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-xs font-mono">
              © 2026 AutoDesk Engine. Built for Automate India Hackathon.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav aria-label="Footer navigation" className="flex items-center justify-center gap-6 flex-wrap font-mono text-xs">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/#how-it-works"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors"
            >
              Pipeline
            </Link>
            <Link
              href="/dashboard"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors"
            >
              Live Cockpit
            </Link>
            <Link
              href="/about"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors"
            >
              About Team
            </Link>
          </nav>

          {/* Right: Status & External Links */}
          <div className="flex items-center justify-center md:justify-end gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--text-primary)] bg-[var(--bg-card-hover)] px-3 py-1.5 rounded-md border border-[var(--border-subtle)] shadow-[1px_1px_0px_var(--border-charcoal)]">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse shadow-[0_0_6px_#059669]" aria-hidden="true" />
              <span>Status: <strong className="text-[#059669] dark:text-[#10b981] font-bold">100% Uptime</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/sharmaa-abhi/Notion.AI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-lg bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] shadow-[1px_1px_0px_var(--border-charcoal)] transition-all"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" focusable="false" />
              </a>
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Notion Workspace"
                className="w-8 h-8 rounded-lg bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] shadow-[1px_1px_0px_var(--border-charcoal)] transition-all"
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
