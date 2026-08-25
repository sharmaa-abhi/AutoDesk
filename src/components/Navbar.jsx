"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Activity, Sparkles } from "lucide-react";
import SubmitRequestModal from "@/components/SubmitRequestModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard", badge: "LIVE" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-subtle"
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded-lg">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-accent to-[#006994] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-shadow duration-300">
            <Zap className="w-5 h-5 text-canvas" strokeWidth={2.5} aria-hidden="true" focusable="false" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gold tracking-tight leading-none">
              Auto<span className="text-cyan-accent">Desk</span>{" "}
              <span className="text-text-secondary font-normal text-xs uppercase tracking-wider">
                Engine
              </span>
            </span>
            <span className="text-xs leading-4 font-mono text-emerald-accent flex items-center gap-1.5 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse"
                aria-hidden="true"
              />
              MATCH CENTER & COCKPIT
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded-md ${
                  isActive ? "text-gold font-semibold" : "text-text-secondary hover:text-gold"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="badge-live">
                    <span className="badge-live-dot animate-pulse" aria-hidden="true" />
                    <span>{link.badge}</span>
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-accent to-gold"
                  />
                )}
              </Link>
            );
          })}

          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls="ticket-dialog"
            aria-expanded={modalOpen}
            onClick={() => setModalOpen(true)}
            className="btn-primary btn-primary-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-canvas" aria-hidden="true" focusable="false" />
            <span>Submit Ticket</span>
          </button>

          <Link
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-lg bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/30 hover:bg-cyan-accent/20 hover:border-cyan-accent/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 text-xs font-mono font-semibold flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-accent"
          >
            <Activity className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
            <span>Launch Cockpit</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-lg text-text-secondary hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-cyan-accent"
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <SubmitRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-border-subtle bg-panel/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-gold transition-colors text-sm font-medium flex items-center justify-between py-1 focus-visible:outline-2 focus-visible:outline-cyan-accent focus-visible:rounded"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="badge-live">
                      <span className="badge-live-dot animate-pulse" aria-hidden="true" />
                      <span>{link.badge}</span>
                    </span>
                  )}
                </Link>
              ))}
              <button
                type="button"
                aria-haspopup="dialog"
                aria-controls="ticket-dialog"
                aria-expanded={modalOpen}
                onClick={() => {
                  setMobileOpen(false);
                  setModalOpen(true);
                }}
                className="btn-primary w-full py-2.5 text-xs font-mono"
              >
                <Sparkles className="w-3.5 h-3.5 text-canvas" aria-hidden="true" focusable="false" />
                <span>Submit Student Ticket ✨</span>
              </button>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-lg bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 text-xs font-mono font-semibold text-center flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-accent"
              >
                <Activity className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
                <span>Launch Cockpit ⚡</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

