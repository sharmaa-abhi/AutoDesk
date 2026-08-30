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
    highlight: "text-[#18181b]",
  },
  {
    icon: Clock,
    value: 99.8,
    suffix: "%",
    label: "Autonomous Uptime",
    highlight: "text-[#059669]",
  },
  {
    icon: Award,
    value: 342,
    suffix: "",
    label: "Certificates Dispatched",
    highlight: "text-[#dc2626]",
  },
  {
    icon: Zap,
    value: 1.4,
    suffix: "s",
    label: "Average Latency",
    highlight: "text-[#18181b]",
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
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="dev-card bg-white p-5 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-[#18181b] text-white flex items-center justify-center mx-auto mb-3 shadow-[1.5px_1.5px_0px_#dc2626]">
                <stat.icon className="w-5 h-5 text-white" aria-hidden="true" focusable="false" />
              </div>
              <div className={stat.highlight}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-[#52525b] text-xs font-mono font-bold mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
