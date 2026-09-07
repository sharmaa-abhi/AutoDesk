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
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Left: Brand & Copyright */}
          <div className="footer-brand flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
            >
              <div className="w-6 h-6 rounded-md bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626] dark:shadow-[0_0_8px_#dc2626]">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} aria-hidden="true" focusable="false" />
              </div>
              <span className="text-sm font-black text-[var(--text-primary)]">
                AutoDesk<span className="text-[#dc2626]">.Engine</span>
              </span>
            </Link>
            <span className="hidden sm:inline text-[var(--border-mid)]" aria-hidden="true">•</span>
            <p className="text-[var(--text-muted)] text-xs font-mono">
              © 2026 AutoDesk Engine. Built for Automate India.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav aria-label="Footer navigation" className="footer-nav flex items-center justify-center gap-5 sm:gap-6 flex-wrap font-mono text-xs">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
            >
              Overview
            </Link>
            <Link
              href="/#pipeline"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
            >
              Pipeline
            </Link>
            <Link
              href="/dashboard"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
            >
              Live Cockpit
            </Link>
            <Link
              href="/about"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
            >
              About Team
            </Link>
          </nav>

          {/* Right: Status & External Links */}
          <div className="footer-social flex items-center justify-center md:justify-end gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--text-primary)] bg-[var(--bg-card-hover)] px-3 py-1.5 rounded-md border border-[var(--border-subtle)] shadow-[1px_1px_0px_var(--border-charcoal)]">
              <span className="status-dot status-dot-live status-dot-pulse" aria-hidden="true" />
              <span>Status: <strong className="text-[var(--text-success)] font-bold">100% Uptime</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/sharmaa-abhi/Notion.AI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-lg bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] shadow-[1px_1px_0px_var(--border-charcoal)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" focusable="false" />
              </a>
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Notion Workspace"
                className="w-8 h-8 rounded-lg bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] shadow-[1px_1px_0px_var(--border-charcoal)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)]"
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
