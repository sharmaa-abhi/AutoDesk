"use client";

import { motion } from "framer-motion";
import { Code2, Link, Globe } from "lucide-react";

export default function TeamCard({ name, role, bio, links = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative p-8 rounded-2xl glass-card hover:border-gold/20 transition-all duration-300"
    >
      {/* Avatar Placeholder */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-accent/20 to-violet-accent/20 border border-border-subtle flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] transition-shadow duration-300">
        <span className="text-3xl font-black gradient-text-gold">
          {name ? name.charAt(0) : "?"}
        </span>
      </div>

      {/* Info */}
      <h3 className="text-xl font-bold text-gold mb-1">{name || "Team Member"}</h3>
      <p className="text-cyan-accent text-sm font-medium mb-3">{role || "Developer"}</p>
      <p className="text-text-secondary text-sm leading-relaxed mb-5">
        {bio || "A passionate developer building the future of automation."}
      </p>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-panel border border-border-subtle flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/20 transition-all duration-200"
          >
            <Code2 className="w-4 h-4" />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-panel border border-border-subtle flex items-center justify-center text-text-secondary hover:text-cyan-accent hover:border-cyan-accent/20 transition-all duration-200"
          >
            <Link className="w-4 h-4" />
          </a>
        )}
        {links.website && (
          <a
            href={links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-panel border border-border-subtle flex items-center justify-center text-text-secondary hover:text-amber-accent hover:border-amber-accent/20 transition-all duration-200"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
