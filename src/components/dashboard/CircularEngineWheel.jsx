"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Brain,
  Database,
  Mail,
  FileCheck,
  Play,
  Pause,
  RotateCw,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function CircularEngineWheel({
  stages,
  activeStage,
  setActiveStage,
  selectedEvent,
}) {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(32); // seconds per full 360deg
  const [isHovered, setIsHovered] = useState(false);

  // 5 orbital node positions spaced equally around 360 degrees (0, 72, 144, 216, 288)
  // Generous radius to prevent any overlap between nodes, connecting lines, and central hub (Issue 10)
  const radius = 160;
  const viewBoxCenter = 220;

  return (
    <div className="flex flex-col items-center justify-center relative select-none py-2 w-full overflow-hidden">
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between px-2 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isRotating && !isHovered ? "bg-[#059669] opacity-75" : "bg-[#71717a] opacity-40"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isRotating && !isHovered ? "bg-[#059669]" : "bg-[#71717a]"
              }`}
            />
          </span>
          <span className="font-bold text-[var(--text-primary)]">Autonomous Orbit Engine</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Play/Pause Rotation Toggle */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRotating(!isRotating)}
            className="btn-secondary btn-secondary-sm text-[11px] font-mono flex items-center gap-1 cursor-pointer"
            title={isRotating ? "Pause Orbit Wheel" : "Resume Orbit Wheel"}
          >
            {isRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#dc2626]" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#059669]" aria-hidden="true" />
                <span>Rotate</span>
              </>
            )}
          </motion.button>

          {/* Speed Toggle */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRotationSpeed((prev) => (prev === 32 ? 18 : prev === 18 ? 48 : 32))}
            className="btn-secondary btn-secondary-sm text-[11px] font-mono cursor-pointer"
            title="Cycle Orbit Wheel Speed"
          >
            {rotationSpeed === 48 ? "0.5x" : rotationSpeed === 32 ? "1x" : "2x"}
          </motion.button>
        </div>
      </div>

      {/* Main Wheel Viewport - Increased container size for spacious layout (Issue 10) */}
      <div className="w-full flex items-center justify-center overflow-visible py-2">
        <div
          className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] flex items-center justify-center scale-[0.92] xs:scale-100 transition-transform origin-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Radar Rings & Crosshairs */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 440 440"
            fill="none"
            aria-hidden="true"
          >
            {/* Outer Dashed Orbit Track */}
            <circle
              cx={viewBoxCenter}
              cy={viewBoxCenter}
              r={radius}
              stroke="currentColor"
              className="text-[var(--border-charcoal)]"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              opacity="0.3"
            />

            {/* Inner Secondary Ring */}
            <circle
              cx={viewBoxCenter}
              cy={viewBoxCenter}
              r={radius * 0.55}
              stroke="currentColor"
              className="text-[var(--border-charcoal)]"
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity="0.2"
            />

            {/* Subtle Crosshairs */}
            <line
              x1={viewBoxCenter}
              y1="20"
              x2={viewBoxCenter}
              y2="420"
              stroke="currentColor"
              className="text-[var(--border-charcoal)]"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.15"
            />
            <line
              x1="20"
              y1={viewBoxCenter}
              x2="420"
              y2={viewBoxCenter}
              stroke="currentColor"
              className="text-[var(--border-charcoal)]"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.15"
            />
          </svg>

          {/* Pulsing Core Ambient Glow */}
          <div className="absolute w-44 h-44 rounded-full bg-[#dc2626]/15 dark:bg-[#dc2626]/20 blur-2xl pointer-events-none animate-pulse" />

          {/* ROTATING ORBIT CONTAINER */}
          <motion.div
            animate={
              isRotating
                ? { rotate: 360 }
                : {}
            }
            transition={
              isRotating
                ? {
                    repeat: Infinity,
                    duration: isHovered ? rotationSpeed * 2.5 : rotationSpeed,
                    ease: "linear",
                  }
                : { duration: 0 }
            }
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto"
          >
            {/* Orbit Nodes placed radially with centered coordinates (Issue 10) */}
            {stages.map((stage, idx) => {
              const angleDeg = idx * 72 - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = Math.round(radius * Math.cos(angleRad));
              const y = Math.round(radius * Math.sin(angleRad));
              const isSelected = activeStage === stage.id;

              return (
                <div
                  key={stage.id}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  className="absolute z-20"
                >
                  {/* Counter-Rotate so labels & icons stay upright while wheel spins */}
                  <motion.div
                    animate={
                      isRotating
                        ? { rotate: -360 }
                        : {}
                    }
                    transition={
                      isRotating
                        ? {
                            repeat: Infinity,
                            duration: isHovered ? rotationSpeed * 2.5 : rotationSpeed,
                            ease: "linear",
                          }
                        : { duration: 0 }
                    }
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStage(stage.id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStage(stage.id);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_var(--border-charcoal)] focus-visible:outline-2 focus-visible:outline-[var(--border-charcoal)] ${
                      isSelected
                        ? "bg-[var(--bg-panel)] border-[var(--border-charcoal)] shadow-[3px_3px_0px_#dc2626] dark:shadow-[0_0_15px_rgba(220,38,38,0.4),2px_2px_0px_#dc2626] scale-105"
                        : "bg-[var(--bg-panel-elevated)] border-[var(--border-charcoal)] hover:bg-[var(--bg-panel)] hover:shadow-[3px_3px_0px_var(--border-charcoal)]"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-md text-white flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_var(--border-charcoal)]"
                      style={{ backgroundColor: stage.color || "#18181b" }}
                    >
                      <stage.icon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </div>

                    <div className="text-left font-mono">
                      <div className="text-xs font-bold text-[var(--text-primary)] leading-tight whitespace-nowrap">
                        {stage.title}
                      </div>
                      <div className="text-[10px] font-semibold text-[var(--text-secondary)] whitespace-nowrap">
                        {stage.sub}
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse flex-shrink-0 shadow-[0_0_6px_#dc2626]" />
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* STATIC CENTER HUB - Streamlined to prevent crowding (Issue 10) */}
          <div className="relative z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[3px_3px_0px_var(--border-charcoal)] dark:shadow-[0_0_25px_rgba(220,38,38,0.3)] flex flex-col items-center justify-center text-center p-2">
            <div className="w-6 h-6 rounded-md bg-[#18181b] dark:bg-[#dc2626] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626] mb-0.5">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tight">
              AutoDesk<span className="text-[#dc2626]">.AI</span>
            </span>
            <span className="text-[8px] font-mono font-bold text-[var(--text-muted)] px-1.5 py-0.2 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] mt-0.5">
              STAGE {activeStage}/5
            </span>
            <span className="text-[9px] font-mono font-bold text-[#059669] dark:text-[#10b981] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse shadow-[0_0_6px_#059669]" />
              <span>AUTONOMOUS</span>
            </span>
          </div>
        </div>
      </div>

      {/* Helper text on wheel interaction - Minimum 12-14px for readability (Issue 6) */}
      <div className="text-center mt-3 text-xs sm:text-sm font-mono text-[var(--text-secondary)] flex items-center justify-center gap-2 px-2">
        <span>💡 Hover on wheel to inspect stages • Click any node to select</span>
      </div>
    </div>
  );
}
