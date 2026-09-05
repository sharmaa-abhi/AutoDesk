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
  const radius = 135; // Radius in pixels for orbit nodes

  return (
    <div className="flex flex-col items-center justify-center relative select-none py-2">
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
          <span className="font-bold text-[#18181b]">Autonomous Orbit Engine</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Play/Pause Rotation Toggle */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsRotating(!isRotating)}
            className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-[#18181b] text-[#18181b] font-bold text-[11px] flex items-center gap-1 shadow-[1px_1px_0px_#18181b] hover:bg-white transition-all cursor-pointer"
            title={isRotating ? "Pause Orbit Wheel" : "Resume Orbit Wheel"}
          >
            {isRotating ? (
              <>
                <Pause className="w-3 h-3 text-[#dc2626]" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#059669]" aria-hidden="true" />
                <span>Rotate</span>
              </>
            )}
          </motion.button>

          {/* Speed Toggle (Slow / Normal) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setRotationSpeed((prev) => (prev === 32 ? 18 : prev === 18 ? 48 : 32))}
            className="px-2 py-1 rounded-md bg-[#f4f3ef] border border-[#e2dfd6] text-[#52525b] font-bold text-[11px] hover:border-[#18181b] hover:text-[#18181b] transition-all cursor-pointer"
            title="Cycle Orbit Wheel Speed"
          >
            {rotationSpeed === 48 ? "0.5x" : rotationSpeed === 32 ? "1x" : "2x"}
          </motion.button>
        </div>
      </div>

      {/* Main Wheel Viewport */}
      <div
        className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Radar Rings & Crosshairs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 380 380"
          fill="none"
          aria-hidden="true"
        >
          {/* Outer Dashed Orbit Track */}
          <circle
            cx="190"
            cy="190"
            r={radius}
            stroke="#18181b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.25"
          />

          {/* Inner Secondary Ring */}
          <circle
            cx="190"
            cy="190"
            r={radius * 0.55}
            stroke="#18181b"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.15"
          />

          {/* Subtle Crosshairs */}
          <line
            x1="190"
            y1="20"
            x2="190"
            y2="360"
            stroke="#18181b"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.1"
          />
          <line
            x1="20"
            y1="190"
            x2="360"
            y2="190"
            stroke="#18181b"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.1"
          />
        </svg>

        {/* Pulsing Core Ambient Glow */}
        <div className="absolute w-44 h-44 rounded-full bg-[#dc2626]/10 blur-2xl pointer-events-none animate-pulse" />

        {/* ROTATING ORBIT CONTAINER */}
        <motion.div
          animate={
            isRotating && !isHovered
              ? { rotate: 360 }
              : isRotating && isHovered
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
          {/* Orbit Nodes placed radially */}
          {stages.map((stage, idx) => {
            const angleDeg = idx * 72 - 90; // Start top (-90deg) and step 72deg for 5 nodes
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.round(radius * Math.cos(angleRad));
            const y = Math.round(radius * Math.sin(angleRad));
            const isSelected = activeStage === stage.id;

            return (
              <div
                key={stage.id}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className="absolute z-20"
              >
                {/* Counter-Rotate so labels & icons stay upright while wheel spins */}
                <motion.div
                  animate={
                    isRotating && !isHovered
                      ? { rotate: -360 }
                      : isRotating && isHovered
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
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
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
                  className={`px-3 py-2 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_#18181b] ${
                    isSelected
                      ? "bg-white border-[#18181b] shadow-[4px_4px_0px_#dc2626] scale-105"
                      : "bg-[#fcfbfa] border-[#18181b] hover:bg-white hover:shadow-[3px_3px_0px_#18181b]"
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg text-white flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_#18181b]"
                    style={{ backgroundColor: stage.color || "#18181b" }}
                  >
                    <stage.icon className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  </div>

                  <div className="text-left font-mono min-w-0 max-w-[90px] sm:max-w-[100px]">
                    <div className="text-[11px] font-bold text-[#18181b] truncate leading-tight">
                      {stage.title}
                    </div>
                    <div className="text-[9px] font-semibold text-[#71717a] truncate">
                      {stage.sub}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse flex-shrink-0" />
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* STATIC CENTER HUB (Does not rotate, serves as anchor) */}
        <div className="relative z-30 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-[#18181b] shadow-[3.5px_3.5px_0px_#18181b] flex flex-col items-center justify-center text-center p-2">
          {/* Animated subtle border beacon ring */}
          <div className="w-7 h-7 rounded-lg bg-[#18181b] text-white flex items-center justify-center shadow-[1px_1px_0px_#dc2626] mb-1">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="text-[10px] font-black text-[#18181b] uppercase tracking-tight">
            AutoDesk<span className="text-[#dc2626]">.AI</span>
          </span>
          <span className="text-[8px] font-mono font-bold text-[#71717a] px-1.5 py-0.2 rounded bg-[#f4f3ef] border border-[#e2dfd6] mt-0.5">
            STAGE {activeStage}/5
          </span>
          <span className="text-[9px] font-mono font-bold text-[#059669] flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
            <span>AUTONOMOUS</span>
          </span>
        </div>
      </div>

      {/* Helper text on wheel interaction */}
      <div className="text-center mt-2 text-[11px] font-mono text-[#71717a] flex items-center justify-center gap-2">
        <span>💡 Hover on wheel to inspect stages • Click any node to select</span>
      </div>
    </div>
  );
}
