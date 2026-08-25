"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Clock, Award, Zap } from "lucide-react";

const stats = [
  {
    icon: Activity,
    value: 1247,
    suffix: "",
    label: "Requests Processed",
    color: "text-cyan-accent",
    bg: "bg-cyan-accent/10",
  },
  {
    icon: Clock,
    value: 99.2,
    suffix: "%",
    label: "System Uptime",
    color: "text-emerald-accent",
    bg: "bg-emerald-accent/10",
  },
  {
    icon: Award,
    value: 342,
    suffix: "",
    label: "Certificates Sent",
    color: "text-amber-accent",
    bg: "bg-amber-accent/10",
  },
  {
    icon: Zap,
    value: 1.8,
    suffix: "s",
    label: "Avg Response Time",
    color: "text-violet-accent",
    bg: "bg-violet-accent/10",
  },
];

function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const isDecimal = value % 1 !== 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono font-black text-3xl sm:text-4xl">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group p-6 rounded-xl bg-panel border border-border-subtle hover:border-[rgba(255,255,255,0.14)] transition-all duration-300 text-center"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" focusable="false" />
              </div>
              <div className={stat.color}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-text-secondary text-xs mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
