"use client";

import { motion } from "framer-motion";
import { Code2, Link, Globe } from "lucide-react";

export default function TeamCard({ name, role, bio, links = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true, margin: "-40px" }}
      className="dev-card bg-white p-7 relative flex flex-col justify-between"
    >
      <div>
        {/* Avatar Box */}
        <div className="w-16 h-16 rounded-xl bg-[#18181b] text-white flex items-center justify-center mb-5 shadow-[2px_2px_0px_#dc2626]">
          <span className="text-2xl font-black">
            {name ? name.charAt(0) : "?"}
          </span>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold text-[#18181b] mb-1">{name || "Team Member"}</h3>
        <p className="text-[#dc2626] text-xs font-mono font-bold uppercase tracking-wider mb-3">
          {role || "Developer"}
        </p>
        <p className="text-[#52525b] text-sm leading-relaxed mb-5">
          {bio || "A passionate developer building the future of autonomous workflows."}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#f0eee6]">
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name || "Team Member"} GitHub Profile`}
            className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
          >
            <Code2 className="w-4 h-4" aria-hidden="true" focusable="false" />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name || "Team Member"} LinkedIn Profile`}
            className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
          >
            <Link className="w-4 h-4" aria-hidden="true" focusable="false" />
          </a>
        )}
        {links.website && (
          <a
            href={links.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name || "Team Member"} Personal Website`}
            className="w-8 h-8 rounded-lg bg-white border-2 border-[#18181b] flex items-center justify-center text-[#18181b] hover:bg-[#f4f3ef] shadow-[1px_1px_0px_#18181b] transition-all"
          >
            <Globe className="w-4 h-4" aria-hidden="true" focusable="false" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

