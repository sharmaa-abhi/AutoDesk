"use client";

import { motion } from "framer-motion";
import { Code2, Link, Globe } from "lucide-react";

export default function TeamCard({ name, role, bio, links = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 280, damping: 20, delay: delay * 0.1 }}
      className="dev-card bg-white p-7 relative flex flex-col justify-between shadow-[3.5px_3.5px_0px_#18181b] hover:shadow-[6px_6px_0px_#18181b] transition-all group overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#dc2626] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Avatar Box with spring rotation */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="w-16 h-16 rounded-xl bg-[#18181b] text-white flex items-center justify-center mb-5 shadow-[2.5px_2.5px_0px_#dc2626] cursor-default"
        >
          <span className="text-2xl font-black">
            {name ? name.charAt(0) : "?"}
          </span>
        </motion.div>

        {/* Info */}
        <h3 className="text-xl font-bold text-[#18181b] mb-1 group-hover:text-[#dc2626] transition-colors">{name || "Team Member"}</h3>
        <p className="text-[#dc2626] text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
          <span>{role || "Developer"}</span>
        </p>
        <p className="text-[#52525b] text-sm leading-relaxed mb-5">
          {bio || "A passionate developer building the future of autonomous workflows."}
        </p>
      </div>

      {/* Social Links with magnetic hover */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#f0eee6]">
        {links.github && (
          <motion.a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${name || "Team Member"} GitHub Profile`}
            className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
          >
            <Code2 className="w-4 h-4" aria-hidden="true" focusable="false" />
          </motion.a>
        )}
        {links.linkedin && (
          <motion.a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${name || "Team Member"} LinkedIn Profile`}
            className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
          >
            <Link className="w-4 h-4" aria-hidden="true" focusable="false" />
          </motion.a>
        )}
        {links.website && (
          <motion.a
            href={links.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${name || "Team Member"} Personal Website`}
            className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
          >
            <Globe className="w-4 h-4" aria-hidden="true" focusable="false" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
