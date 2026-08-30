"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap, Activity, Plus, Database, ExternalLink } from "lucide-react";
import SubmitRequestModal from "@/components/SubmitRequestModal";

const navLinks = [
  { name: "Overview", href: "/" },
  { name: "Live Cockpit", href: "/dashboard", badge: "ACTIVE" },
  { name: "About Team", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#ffffff] border-b-2 border-[#18181b]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[#dc2626] focus-visible:rounded"
          >
            <div className="w-8 h-8 rounded-lg bg-[#18181b] border-2 border-[#18181b] flex items-center justify-center text-white shadow-[2px_2px_0px_#dc2626]">
              <Zap className="w-4 h-4 text-[#ffffff]" strokeWidth={2.5} aria-hidden="true" focusable="false" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black tracking-tight text-[#18181b]">
                AutoDesk<span className="text-[#dc2626]">.Engine</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#f4f3ef] text-[#52525b] border border-[#e2dfd6]">
                v0.1
              </span>
            </div>
          </Link>

          {/* Operational Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-[#e2dfd6] text-[11px] font-mono text-[#52525b]">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" aria-hidden="true" />
            <span>Notion Bot Engine: <strong className="text-[#059669] font-bold">READY (24/7)</strong></span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#18181b] text-[#ffffff]"
                    : "text-[#52525b] hover:text-[#18181b] hover:bg-[#f4f3ef]"
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                      isActive ? "bg-[#dc2626] text-white" : "bg-[#ecfdf5] text-[#065f46] border border-[#059669]/40"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border-2 border-[#18181b] bg-white text-[12px] font-mono font-bold text-[#18181b] hover:bg-[#f4f3ef] transition-colors flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#18181b]"
          >
            <Database className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
            <span>Notion HQ</span>
            <ExternalLink className="w-3 h-3 text-[#71717a]" aria-hidden="true" focusable="false" />
          </a>

          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls="ticket-dialog"
            aria-expanded={modalOpen}
            onClick={() => setModalOpen(true)}
            className="btn-primary btn-primary-sm text-xs font-mono"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" focusable="false" />
            <span>Submit Ticket</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-lg border-2 border-[#18181b] bg-white text-[#18181b] hover:bg-[#f4f3ef] transition-colors"
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <SubmitRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-[#18181b] bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold text-[#18181b] hover:bg-[#f4f3ef]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#e2dfd6] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setModalOpen(true);
              }}
              className="btn-primary w-full py-2.5 text-xs font-mono justify-center"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" focusable="false" />
              <span>Submit Student Ticket</span>
            </button>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary w-full py-2 text-xs font-mono justify-center"
            >
              <Activity className="w-3.5 h-3.5 text-[#dc2626]" aria-hidden="true" focusable="false" />
              <span>Launch Live Cockpit</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
