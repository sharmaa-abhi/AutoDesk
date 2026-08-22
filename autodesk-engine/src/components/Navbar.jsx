"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Activity, Users, Home } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard", badge: "LIVE" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-accent to-[#006994] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-shadow duration-300">
            <Zap className="w-5 h-5 text-canvas" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gold tracking-tight leading-none">
              Auto<span className="text-cyan-accent">Desk</span>{" "}
              <span className="text-text-secondary font-normal text-xs uppercase tracking-wider">
                Engine
              </span>
            </span>
            <span className="text-[10px] font-mono text-emerald-accent flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse" />
              MATCH CENTER & COCKPIT
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                  isActive ? "text-gold font-semibold" : "text-text-secondary hover:text-gold"
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-accent/15 text-emerald-accent text-[9px] font-mono font-bold tracking-wide border border-emerald-accent/30 animate-pulse">
                    {link.badge}
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
          
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/30 hover:bg-cyan-accent/20 hover:border-cyan-accent/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 text-xs font-mono font-semibold flex items-center gap-2"
          >
            <Activity className="w-3.5 h-3.5" />
            Launch Cockpit
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary hover:text-gold transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
                  className="text-text-secondary hover:text-gold transition-colors text-sm font-medium flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-accent/15 text-emerald-accent text-[10px] font-mono">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-lg bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 text-xs font-mono font-semibold text-center"
              >
                Launch Cockpit ⚡
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
