"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-accent to-[#006994] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-shadow duration-300">
            <Zap className="w-5 h-5 text-canvas" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-gold tracking-tight">
            Auto<span className="text-cyan-accent">Desk</span>{" "}
            <span className="text-text-secondary font-normal text-sm hidden sm:inline">
              Engine
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#how-it-works"
            className="px-5 py-2.5 rounded-lg bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 hover:bg-cyan-accent/20 hover:border-cyan-accent/40 transition-all duration-300 text-sm font-semibold"
          >
            Submit Request
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
            className="md:hidden overflow-hidden border-t border-border-subtle"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-gold transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 text-sm font-semibold text-center"
              >
                Submit Request
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
