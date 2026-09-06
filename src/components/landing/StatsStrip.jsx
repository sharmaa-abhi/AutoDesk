"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Clock, Award, Zap } from "lucide-react";

const stats = [
  {
    icon: Activity,
    value: 1247,
    suffix: "",
    label: "Incidents Processed",
    highlight: "text-[var(--text-primary)]",
    accent: "#3b82f6",
    pill: "LIVE FEED",
  },
  {
    icon: Clock,
    value: 99.8,
    suffix: "%",
    label: "Autonomous Uptime",
    highlight: "text-[#059669] dark:text-[#10b981]",
    accent: "#059669",
    pill: "24/7 ACTIVE",
  },
  {
    icon: Award,
    value: 342,
    suffix: "",
    label: "Certificates Dispatched",
    highlight: "text-[#dc2626] dark:text-[#f87171]",
    accent: "#dc2626",
    pill: "VERIFIED",
  },
  {
    icon: Zap,
    value: 1.4,
    suffix: "s",
    label: "Average Latency",
    highlight: "text-[var(--text-primary)]",
    accent: "#eab308",
    pill: "OPTIMAL",
  },
];

function AnimatedCounter({ value, suffix, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const isDecimal = value % 1 !== 0;
    const totalFrames = duration * 60;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Exponential ease out
      const easeOutProgress = 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * easeOutProgress;

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.9 }}
      animate={isInView ? { scale: 1 } : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="font-mono font-black text-3xl sm:text-4xl inline-block"
    >
      {count}
      {suffix}
    </motion.span>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.94 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 280, damping: 20 },
                },
              }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="dev-card bg-[var(--bg-panel)] p-5 text-center relative group overflow-hidden transition-all hover:shadow-[5px_5px_0px_var(--border-charcoal)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(220,38,38,0.3)]"
            >
              {/* Subtle hover light glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                style={{ backgroundColor: stat.accent }}
              />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-charcoal)] text-[var(--text-primary)]">
                  {stat.pill}
                </span>
                <span className="w-2 h-2 rounded-full shadow-[0_0_6px_currentColor]" style={{ backgroundColor: stat.accent, color: stat.accent }} />
              </div>

              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="w-11 h-11 rounded-xl bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#dc2626] dark:shadow-[0_0_12px_rgba(220,38,38,0.5)] transition-transform"
              >
                <stat.icon className="w-5 h-5 text-white" aria-hidden="true" focusable="false" />
              </motion.div>

              <div className={stat.highlight}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-[var(--text-secondary)] text-xs font-mono font-bold mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
