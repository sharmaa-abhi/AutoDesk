"use client";

import Link from "next/link";
import { Zap, Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-panel">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-accent to-[#006994] flex items-center justify-center">
                <Zap className="w-4 h-4 text-canvas" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-gold">
                Auto<span className="text-cyan-accent">Desk</span>{" "}
                <span className="text-text-secondary font-normal text-sm">
                  Engine
                </span>
              </span>
            </div>
            <p className="text-text-muted text-xs max-w-xs text-center md:text-left">
              An autonomous backend automation service built for the Notion Track hackathon.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-text-secondary hover:text-gold transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-text-secondary hover:text-gold transition-colors text-sm"
            >
              About
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-gold transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-gold transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © 2026 AutoDesk Engine. Built with 🔥 for the Notion Track Hackathon.
          </p>
          <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
            System Status: <span className="text-emerald-accent">Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
