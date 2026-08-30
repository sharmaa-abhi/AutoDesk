"use client";

import { motion } from "framer-motion";
import { Brain, UserCheck, Mail, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Classification",
    desc: "Gemini API reads raw multi-lingual natural language input and extracts structured intent, category, and priority. Zero hardcoded regex.",
    tag: "GEMINI 2.5/3.5 FLASH",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-Loop Cockpit",
    desc: "Ambiguous or sensitive actions automatically pause for human clearance inside Notion. Operators approve, reject, or resolve with full context.",
    tag: "NOTION HQ",
  },
  {
    icon: Mail,
    title: "Real-World Execution",
    desc: "The engine produces dynamic, tamper-proof HTML/SVG certificates and dispatches them via Resend or Gmail SMTP directly to students.",
    tag: "EMAIL + CERT DISPATCH",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Proof Run Log",
    desc: "Every automated cycle writes a timestamped record via bot integration token. Anyone can verify in Notion — manual spoofing is strictly prevented.",
    tag: "NOTION AUDIT PROOF",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#18181b] text-xs font-mono text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
            Engineered For True Autonomy
          </h2>
          <p className="text-sm sm:text-base text-[#52525b] max-w-xl mx-auto">
            Not a mockup or chatbot. A robust, audited production automation system with live backend dispatching.
          </p>
        </div>

        {/* 2x2 Feature Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="dev-card bg-white p-7 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#18181b] text-white flex items-center justify-center shadow-[2px_2px_0px_#dc2626]">
                    <f.icon className="w-6 h-6 text-white" aria-hidden="true" focusable="false" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#f4f3ef] border border-[#18181b] text-[#18181b]">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#18181b] mb-2.5">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
