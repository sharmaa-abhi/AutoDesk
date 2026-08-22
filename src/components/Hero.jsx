"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid pt-20">
      {/* Floating Orbs */}
      <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-32 animate-float-slow" />
      <div className="orb orb-amber w-[300px] h-[300px] top-1/3 -right-20 animate-float" style={{ animationDelay: "-3s" }} />
      <div className="orb orb-violet w-[350px] h-[350px] bottom-10 left-1/4 animate-float-slow" style={{ animationDelay: "-5s" }} />
      <div className="orb orb-crimson w-[200px] h-[200px] top-20 right-1/3 animate-pulse-glow" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel border border-border-subtle text-text-secondary text-xs font-mono mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-accent" />
          <span>Hackathon MVP — Notion Track</span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-accent/10 text-cyan-accent text-[10px] font-semibold">
            LIVE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-gold text-glow-gold">Kill One Boring Job.</span>
          <br />
          <span className="gradient-text-cyan">Completely.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          An <span className="text-amber-accent font-semibold">autonomous automation engine</span> that
          eliminates repetitive college tasks — from certificate requests to
          attendance tracking.{" "}
          <span className="text-text-white">Notion is your cockpit.</span>{" "}
          <span className="text-cyan-accent">AI is your brain.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-accent to-[#006994] text-canvas font-bold text-sm hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 transform hover:scale-105"
          >
            See How It Works
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border-subtle text-gold font-semibold text-sm hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
          >
            Meet the Team
          </a>
        </motion.div>

        {/* Bottom Formula */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center px-6 py-3 rounded-xl bg-panel/60 border border-border-subtle font-mono text-xs sm:text-sm"
        >
          <span className="text-cyan-accent">⚡ Trigger</span>
          <span className="text-text-muted">→</span>
          <span className="text-gold">💻 Your Code</span>
          <span className="text-text-muted">→</span>
          <span className="text-violet-accent">🧠 AI</span>
          <span className="text-text-muted">→</span>
          <span className="text-amber-accent">🙋 Approval</span>
          <span className="text-text-muted">→</span>
          <span className="text-emerald-accent">🌍 Action</span>
          <span className="text-text-muted">→</span>
          <span className="text-crimson-accent">📜 Run Log</span>
        </motion.div>
      </div>
    </section>
  );
}
