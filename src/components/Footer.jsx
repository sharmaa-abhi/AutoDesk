"use client";

import Link from "next/link";
import { Zap, Code2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-panel">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Main 3-section cohesive layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center md:text-left">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-accent to-[#006994] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-canvas" strokeWidth={2.5} aria-hidden="true" focusable="false" />
              </div>
              <span className="text-base font-bold text-gold">
                Auto<span className="text-cyan-accent">Desk</span>{" "}
                <span className="text-text-secondary font-normal text-xs uppercase tracking-wider">
                  Engine
                </span>
              </span>
            </Link>
            <p className="text-text-muted text-xs">
              © 2026 AutoDesk Engine. Built for Automate India.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav aria-label="Footer navigation" className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/"
              className="text-text-secondary hover:text-gold transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded"
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              className="text-text-secondary hover:text-gold transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded"
            >
              How It Works
            </Link>
            <Link
              href="/dashboard"
              className="text-text-secondary hover:text-gold transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-text-secondary hover:text-gold transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded"
            >
              About
            </Link>
          </nav>

          {/* Right: System Status & Social Links */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center md:justify-end gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-xs font-mono bg-panel-elevated px-3 py-1.5 rounded-md border border-border-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" aria-hidden="true" />
              <span>System: <strong className="text-emerald-accent font-semibold">Operational</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-lg bg-panel-elevated border border-border-subtle flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/20 transition-all focus-visible:outline-2 focus-visible:outline-cyan-accent"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" focusable="false" />
              </a>
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Notion Workspace"
                className="w-8 h-8 rounded-lg bg-panel-elevated border border-border-subtle flex items-center justify-center text-text-secondary hover:text-cyan-accent hover:border-cyan-accent/20 transition-all focus-visible:outline-2 focus-visible:outline-cyan-accent"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" focusable="false" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

