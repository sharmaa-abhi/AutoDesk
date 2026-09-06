"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl border-2 transition-colors duration-200 cursor-pointer ${
        isDark
          ? "bg-[#181b22] border-[#323745] text-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.25),2px_2px_0px_#101216] hover:border-[#fbbf24]/50"
          : "bg-white border-[#18181b] text-[#18181b] shadow-[2px_2px_0px_#18181b] hover:bg-[#f4f3ef]"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Sun className="w-4 h-4 text-amber-400" strokeWidth={2.5} aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Moon className="w-4 h-4 text-[#18181b]" strokeWidth={2.5} aria-hidden="true" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
