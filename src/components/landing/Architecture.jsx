"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Globe,
  ShieldCheck,
  Brain,
  Database,
  UserCheck,
  Send,
  FileCheck,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowDown,
  Terminal,
  Clock,
  Code2,
  ChevronRight,
  ShieldAlert,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";

// Pipeline steps with technical payload inspect details
const pipelineSteps = [
  {
    id: "user",
    stepNum: "01",
    label: "Student / User",
    sub: "Submits raw complaint or ticket",
    category: "INPUT",
    type: "input",
    icon: User,
    latency: "< 1ms",
    accent: "#3b82f6",
    details: {
      description: "Student submits issue via Web Form, Slack, or direct API call.",
      samplePayload: {
        userName: "Aarav Sharma",
        userEmail: "aarav.s@college.edu",
        rawMessage: "I attended the GenAI workshop yesterday but haven't received my certificate yet. Please help!",
        eventId: "automate-india-2026",
      },
      auditGuarantee: "Client-side sanitized, RFC-compliant email verification.",
    },
  },
  {
    id: "webhook",
    stepNum: "02",
    label: "Webhook Gateway",
    sub: "POST /api/pipeline (Ingress & Auth)",
    category: "INGRESS",
    type: "input",
    icon: Globe,
    latency: "~12ms",
    accent: "#2563eb",
    details: {
      description: "Next.js Edge API Gateway validates HTTP method, headers, rate limits, and JSON schema payload.",
      samplePayload: {
        endpoint: "/api/pipeline",
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "103.21.244.1" },
        status: 200,
      },
      auditGuarantee: "Strict runtime schema check prevents malformed or poisoned payloads.",
    },
  },
  {
    id: "validate",
    stepNum: "03",
    label: "Sanitize & Deduplicate",
    sub: "MD5 24h Persistent Anti-Replay Guard",
    category: "SECURITY",
    type: "guard",
    icon: ShieldCheck,
    latency: "~4ms",
    accent: "#7c3aed",
    details: {
      description: "Computes MD5 hash from (email + message). Blocks spam, script-kiddie loops, and accidental double-clicks.",
      samplePayload: {
        hash: "e99a18c428cb38d5f260853678922e03",
        windowDuration: "86400s (24 Hours)",
        status: "PASSED (Unique Submission)",
        duplicateCountTotal: 42,
      },
      auditGuarantee: "Zero duplicate DB entries or spam email storms.",
    },
  },
  {
    id: "ai",
    stepNum: "04",
    label: "Gemini 3.6 Flash AI",
    sub: "Semantic Intent & Entity Extraction",
    category: "CORE AI",
    type: "ai",
    icon: Brain,
    latency: "~650ms",
    accent: "#dc2626",
    isCore: true,
    details: {
      description: "Extracts intent category, urgency priority, student entity, sentiment, and cross-checks attendance confidence.",
      samplePayload: {
        category: "CERTIFICATE_MISSING",
        confidence: 94,
        attendanceVerified: true,
        priority: "MEDIUM",
        sentiment: "ANXIOUS",
        suggestedAction: "GENERATE_AND_DISPATCH",
      },
      auditGuarantee: "Deterministic structured JSON generation strictly adhering to TypeScript schema.",
    },
  },
  {
    id: "router",
    stepNum: "05",
    label: "Smart Risk & Policy Router",
    sub: "Policy: Confidence ≥ 90% & Attendance Verified",
    category: "DECISION GATE",
    type: "router",
    icon: GitBranch,
    latency: "~2ms",
    accent: "#d97706",
    details: {
      description: "Deterministic gate evaluating AI confidence score and security risk flags to pick branch path.",
      samplePayload: {
        evaluation: {
          hasValidEmail: true,
          confidenceThreshold: ">= 90% (Actual: 94%)",
          attendanceVerified: true,
          riskLevel: "LOW",
          chosenPath: "BRANCH_RIGHT (AUTO_EXECUTE)",
        },
      },
      auditGuarantee: "No unverified request can bypass human approval.",
    },
  },
];

const branchNodes = {
  left: [
    {
      id: "notion",
      stepNum: "06A",
      label: "Notion Incident Database",
      sub: "Creates live incident page with triage tags",
      category: "INCIDENT DB",
      type: "process",
      icon: Database,
      accent: "#dc2626",
      details: {
        description: "Low-confidence or disputed tickets are synced to Notion workspace with priority color tags.",
        samplePayload: {
          notionPageId: "page_9f82d17c4a11",
          status: "WAITING_APPROVAL",
          assignedReviewer: "Lead Ops Admin",
        },
      },
    },
    {
      id: "human",
      stepNum: "06B",
      label: "Human-in-the-Loop Cockpit",
      sub: "1-Click Admin Approve / Reject Cockpit",
      category: "HUMAN AUDIT",
      type: "process",
      icon: UserCheck,
      accent: "#ef4444",
      details: {
        description: "Admin reviews student evidence in cockpit. Approving triggers instant certificate generation and log sealing.",
        samplePayload: {
          decision: "APPROVED",
          reviewer: "admin@autodesk.engine",
          overrideReason: "Manual verification confirmed",
        },
      },
    },
  ],
  right: [
    {
      id: "action",
      stepNum: "06-AUTO",
      label: "Action Dispatcher",
      sub: "HTML Certificate + Resend/SMTP Email",
      category: "AUTO-EXECUTE",
      type: "output",
      icon: Send,
      accent: "#059669",
      details: {
        description: "Generates tamper-resistant SVG/HTML certificate with unique hash and sends transactional email.",
        samplePayload: {
          certificateId: "CERT-2026-X89K9",
          deliveryMethod: "Resend API / SMTP",
          deliveredTo: "aarav.s@college.edu",
          status: "DELIVERED (HTTP 200)",
        },
      },
    },
  ],
};

const outputNodes = [
  {
    id: "runlog",
    stepNum: "07",
    label: "Tamper-Proof Notion Run Log",
    sub: "SHA-256 HMAC Sealed Audit Trail",
    category: "AUDIT LOG",
    type: "output",
    icon: FileCheck,
    latency: "~45ms",
    accent: "#059669",
    details: {
      description: "Permanently records Run ID, execution duration, payload digest, trigger source, and cryptographic verification hash.",
      samplePayload: {
        runId: "RUN-1741359870",
        hashProof: "sha256:7e8a93bf82...",
        totalDuration: "782ms",
        auditStatus: "SEALED_IMMUTABLE",
      },
      auditGuarantee: "Every automated or human execution is immutable and tamper-evident.",
    },
  },
];

export default function Architecture() {
  const [selectedNode, setSelectedNode] = useState(pipelineSteps[3]); // Default select Gemini AI
  const [activeSimulation, setActiveSimulation] = useState("all"); // 'all' | 'auto' | 'human' | 'spam'

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_var(--border-charcoal)]">
            <Sparkles className="w-3.5 h-3.5 text-[#dc2626] animate-spin" style={{ animationDuration: "6s" }} />
            <span className="font-bold tracking-wider">Enterprise System Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            End-to-End Pipeline Architecture
          </h2>
          
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            The complete lifecycle of every inbound ticket — from ingestion and AI reasoning to policy routing, 
            Human-in-the-Loop review, and tamper-proof audit proof sealing.
          </p>

          {/* Interactive Simulation Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-xs font-mono font-bold text-[var(--text-muted)] mr-1 flex items-center gap-1">
              <Play className="w-3.5 h-3.5 text-[#dc2626]" /> Flow Simulator:
            </span>

            <button
              onClick={() => setActiveSimulation("auto")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border-2 ${
                activeSimulation === "auto"
                  ? "bg-[#ecfdf5] dark:bg-emerald-950/50 border-[#059669] text-[#065f46] dark:text-emerald-400 shadow-[2px_2px_0px_#059669]"
                  : "bg-[var(--bg-panel)] border-[var(--border-charcoal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-success)]" />
              <span>Path A: Verified Auto-Dispatch</span>
            </button>

            <button
              onClick={() => setActiveSimulation("human")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border-2 ${
                activeSimulation === "human"
                  ? "bg-[#fee2e2] dark:bg-red-950/50 border-[#dc2626] text-[#991b1b] dark:text-red-400 shadow-[2px_2px_0px_#dc2626]"
                  : "bg-[var(--bg-panel)] border-[var(--border-charcoal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[var(--text-danger)]" />
              <span>Path B: High-Risk Human Review</span>
            </button>

            <button
              onClick={() => setActiveSimulation("spam")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border-2 ${
                activeSimulation === "spam"
                  ? "bg-purple-50 dark:bg-purple-950/50 border-purple-600 text-purple-700 dark:text-purple-300 shadow-[2px_2px_0px_#7c3aed]"
                  : "bg-[var(--bg-panel)] border-[var(--border-charcoal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#7c3aed]" />
              <span>Path C: Anti-Spam Guard Block</span>
            </button>

            <button
              onClick={() => setActiveSimulation("all")}
              title="Reset view"
              className="p-1.5 rounded-lg border-2 border-[var(--border-charcoal)] bg-[var(--bg-panel)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Main Grid: Flowchart Left/Center + Live Inspector Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Flowchart Diagram Canvas with Responsive Safety */}
          <div className="lg:col-span-7 dev-card bg-[var(--bg-panel)] p-5 sm:p-8 relative rounded-2xl border-2 border-[var(--border-charcoal)] shadow-[4px_4px_0px_var(--border-charcoal)] overflow-x-auto">
            
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 grid-paper opacity-50 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center min-w-[320px] py-1">
              
              {/* STAGE 1: Student User */}
              <FlowCard
                step={pipelineSteps[0]}
                selected={selectedNode?.id === pipelineSteps[0].id}
                onClick={() => setSelectedNode(pipelineSteps[0])}
                isDimmed={false}
              />
              <ConnectorArrow color="#3b82f6" active={true} />

              {/* STAGE 2: Webhook Gateway */}
              <FlowCard
                step={pipelineSteps[1]}
                selected={selectedNode?.id === pipelineSteps[1].id}
                onClick={() => setSelectedNode(pipelineSteps[1])}
                isDimmed={false}
              />
              <ConnectorArrow color="#2563eb" active={true} />

              {/* STAGE 3: Sanitize & Deduplicate */}
              <FlowCard
                step={pipelineSteps[2]}
                selected={selectedNode?.id === pipelineSteps[2].id}
                onClick={() => setSelectedNode(pipelineSteps[2])}
                isDimmed={false}
                highlightBorder={activeSimulation === "spam" ? "#7c3aed" : null}
              />

              {activeSimulation === "spam" ? (
                <div className="my-5 px-4 py-3 rounded-xl bg-purple-100 dark:bg-purple-950/60 border-2 border-purple-600 text-purple-800 dark:text-purple-300 font-mono text-xs font-bold flex items-center gap-2 animate-bounce shadow-[2px_2px_0px_#7c3aed]">
                  <ShieldAlert className="w-4 h-4 text-purple-600" />
                  <span>24h MD5 Guard: Duplicate detected! Request blocked immediately & logged.</span>
                </div>
              ) : (
                <>
                  <ConnectorArrow color="#7c3aed" active={true} />

                  {/* STAGE 4: Gemini 3.6 Flash AI */}
                  <FlowCard
                    step={pipelineSteps[3]}
                    selected={selectedNode?.id === pipelineSteps[3].id}
                    onClick={() => setSelectedNode(pipelineSteps[3])}
                    isDimmed={false}
                    isCore
                  />
                  <ConnectorArrow color="#dc2626" active={true} />

                  {/* STAGE 5: Smart Risk Router */}
                  <FlowCard
                    step={pipelineSteps[4]}
                    selected={selectedNode?.id === pipelineSteps[4].id}
                    onClick={() => setSelectedNode(pipelineSteps[4])}
                    isDimmed={false}
                  />

                  {/* Branching SVG Pipeline Connectors */}
                  <div className="w-full relative my-3 sm:my-4">
                    <svg className="w-full h-10 overflow-visible" viewBox="0 0 400 36" fill="none">
                      {/* Center to Left Branch Line */}
                      <path
                        d="M 200 0 L 200 14 Q 200 26 100 26 L 100 36"
                        stroke={activeSimulation === "auto" ? "var(--border-subtle)" : "#dc2626"}
                        strokeWidth={activeSimulation === "human" ? "3" : "2"}
                        strokeDasharray={activeSimulation === "auto" ? "4 4" : "none"}
                      />
                      {/* Center to Right Branch Line */}
                      <path
                        d="M 200 0 L 200 14 Q 200 26 300 26 L 300 36"
                        stroke={activeSimulation === "human" ? "var(--border-subtle)" : "#059669"}
                        strokeWidth={activeSimulation === "auto" ? "3" : "2"}
                        strokeDasharray={activeSimulation === "human" ? "4 4" : "none"}
                      />
                      {/* Flowing animated pulse dots */}
                      <circle cx="200" cy="0" r="3.5" fill="#d97706" className="animate-ping" />
                    </svg>
                  </div>

                  {/* Two Parallel Branches with Enhanced Spacing & Clarity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full mt-2">
                    
                    {/* LEFT BRANCH: High Risk & Human Review */}
                    <div
                      className={`flex flex-col items-center gap-3.5 p-4 sm:p-5 rounded-xl border-2 transition-all ${
                        activeSimulation === "human"
                          ? "bg-red-50/50 dark:bg-red-950/20 border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                          : activeSimulation === "auto"
                          ? "opacity-35 border-dashed border-[var(--border-subtle)]"
                          : "border-[var(--border-charcoal)] bg-[var(--bg-card-hover)]/30"
                      }`}
                    >
                      <div className="text-[var(--text-danger)] text-xs font-mono font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                        <span>Needs Approval (High Risk)</span>
                      </div>
                      <span className="text-xs font-mono text-[var(--text-muted)] -mt-2">
                        Confidence &lt; 90% or Ambiguous
                      </span>

                      <FlowCard
                        step={branchNodes.left[0]}
                        selected={selectedNode?.id === branchNodes.left[0].id}
                        onClick={() => setSelectedNode(branchNodes.left[0])}
                        isCompact
                      />

                      <ConnectorArrow color="#dc2626" active={activeSimulation !== "auto"} />

                      <FlowCard
                        step={branchNodes.left[1]}
                        selected={selectedNode?.id === branchNodes.left[1].id}
                        onClick={() => setSelectedNode(branchNodes.left[1])}
                        isCompact
                      />
                      
                      <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
                        Admin Action Required
                      </div>
                    </div>

                    {/* RIGHT BRANCH: Low Risk Auto Execution */}
                    <div
                      className={`flex flex-col items-center gap-3.5 p-4 sm:p-5 rounded-xl border-2 transition-all ${
                        activeSimulation === "auto"
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.25)]"
                          : activeSimulation === "human"
                          ? "opacity-35 border-dashed border-[var(--border-subtle)]"
                          : "border-[var(--border-charcoal)] bg-[var(--bg-card-hover)]/30"
                      }`}
                    >
                      <div className="text-[var(--text-success)] text-xs font-mono font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>Verified (Auto Execute)</span>
                      </div>
                      <span className="text-xs font-mono text-[var(--text-muted)] -mt-2">
                        Confidence ≥ 90% &amp; Attendance OK
                      </span>

                      <FlowCard
                        step={branchNodes.right[0]}
                        selected={selectedNode?.id === branchNodes.right[0].id}
                        onClick={() => setSelectedNode(branchNodes.right[0])}
                        isCompact
                      />

                      <ConnectorArrow color="#059669" active={activeSimulation !== "human"} />

                      <div className="py-2.5 px-3 rounded-lg border border-dashed border-[#059669] text-xs font-mono text-[var(--text-success)] flex items-center gap-1.5 bg-emerald-50/30 dark:bg-emerald-950/20">
                        <Zap className="w-3.5 h-3.5 text-[var(--text-success)]" />
                        <span>Instant Resend Dispatch (&lt; 150ms)</span>
                      </div>
                    </div>

                  </div>

                  {/* Convergence Bridge */}
                  <div className="my-5 px-4 py-2 rounded-full bg-[var(--bg-card-hover)] border-2 border-[var(--border-charcoal)] text-[var(--text-primary)] text-xs font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_var(--border-charcoal)]">
                    <span className="status-dot status-dot-live status-dot-pulse" />
                    <span>Both Execution Paths Converge &amp; Audit Seal</span>
                  </div>

                  <ConnectorArrow color="#059669" active={true} />

                  {/* STAGE 7: Notion Run Log */}
                  <FlowCard
                    step={outputNodes[0]}
                    selected={selectedNode?.id === outputNodes[0].id}
                    onClick={() => setSelectedNode(outputNodes[0])}
                    isDimmed={false}
                  />

                  {/* Final Proof Banner */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mt-6 w-full max-w-md px-4 py-3 rounded-xl bg-[#ecfdf5] dark:bg-emerald-950/50 border-2 border-[#059669] text-[#065f46] dark:text-emerald-300 text-xs font-mono font-bold shadow-[3px_3px_0px_var(--border-charcoal)] dark:shadow-[0_0_18px_rgba(5,150,105,0.35)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="status-dot status-dot-live status-dot-pulse" />
                      <span>🏁 Tamper-Proof Run Log Proof Sealed</span>
                    </div>
                    <span className="text-xs bg-[#059669] text-white px-2 py-0.5 rounded font-mono font-semibold">
                      HMAC-SHA256
                    </span>
                  </motion.div>
                </>
              )}

            </div>
          </div>

          {/* Right Column: Step Inspector & Explanation Card */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* Live Step Inspector */}
            <div className="dev-card bg-[var(--bg-panel)] p-6 rounded-2xl border-2 border-[var(--border-charcoal)] shadow-[4px_4px_0px_var(--border-charcoal)] space-y-5">
              
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--bg-card-hover)] border border-[var(--border-charcoal)] text-[#dc2626]">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Pipeline Inspector
                    </h3>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      Click any node on the left to inspect
                    </span>
                  </div>
                </div>

                {selectedNode && (
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold border" style={{ borderColor: selectedNode.accent, color: selectedNode.accent }}>
                    {selectedNode.stepNum}
                  </span>
                )}
              </div>

              {selectedNode ? (
                <div className="space-y-4">
                  {/* Node Header */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg text-white font-bold" style={{ backgroundColor: selectedNode.accent }}>
                        <selectedNode.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[var(--text-primary)]">
                          {selectedNode.label}
                        </h4>
                        <p className="text-xs font-mono text-[var(--text-secondary)]">
                          {selectedNode.sub}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Latency & Category Badges */}
                  <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                      Latency: {selectedNode.latency || "< 10ms"}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold">
                      Category: {selectedNode.category}
                    </span>
                  </div>

                  {/* What Happens Here */}
                  <div className="space-y-1 text-xs">
                    <span className="font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                      Description &amp; Role:
                    </span>
                    <p className="text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-panel-elevated)] p-3 rounded-lg border border-[var(--border-subtle)]">
                      {selectedNode.details?.description}
                    </p>
                  </div>

                  {/* Sample Payload Data JSON */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[var(--text-muted)] flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5 text-[#dc2626]" /> Live Payload / Telemetry:
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">JSON</span>
                    </div>

                    <div className="bg-[#0f1117] text-[#38bdf8] p-3.5 rounded-xl text-xs font-mono border border-slate-800 overflow-x-auto max-h-56 shadow-inner">
                      <pre className="text-xs leading-snug">
                        {JSON.stringify(selectedNode.details?.samplePayload, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Audit & Security Guarantee */}
                  {selectedNode.details?.auditGuarantee && (
                    <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-[#059669]/30 text-xs font-mono text-[#065f46] dark:text-emerald-300 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block">Security &amp; Audit Guarantee:</strong>
                        <span>{selectedNode.details.auditGuarantee}</span>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-10 text-[var(--text-muted)] text-sm font-mono">
                  Select any component in the flowchart to view live parameters and schema.
                </div>
              )}

            </div>

            {/* Quick Summary / Key Highlights */}
            <div className="dev-card bg-[var(--bg-panel)] p-5 rounded-2xl border-2 border-[var(--border-charcoal)] shadow-[3px_3px_0px_var(--border-charcoal)] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" /> 3 Core Architectural Pillars
              </h4>

              <div className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-[var(--text-primary)]">Anti-Spam 24h Guard:</strong> Client request MD5 hash banata hai, duplicate payload 24 ghante tak engine ko touch nahi kar sakte.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-[var(--text-primary)]">Smart Risk Router:</strong> Agar AI confidence 90% se kam ya unverified ho toh automation direct dispatch nahi karta — Human Cockpit me escalate hota hai.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-[var(--text-primary)]">Tamper-Proof Run Log:</strong> Har action ka cryptographic run ID aur verification status Notion database me seal ho jata hai.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function FlowCard({
  step,
  selected = false,
  onClick,
  isCore = false,
  isCompact = false,
  highlightBorder = null,
  isDimmed = false,
}) {
  const Icon = step.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={`w-full ${
        isCompact ? "max-w-xs px-3.5 py-3" : "max-w-md px-4 sm:px-5 py-3.5"
      } rounded-xl border-2 text-left transition-all relative overflow-hidden group cursor-pointer ${
        selected
          ? "border-[#dc2626] bg-[var(--bg-panel-elevated)] shadow-[4px_4px_0px_#dc2626] dark:shadow-[0_0_20px_rgba(220,38,38,0.35)]"
          : highlightBorder
          ? `border-[${highlightBorder}] bg-[var(--bg-panel-elevated)] shadow-[3px_3px_0px_var(--border-charcoal)]`
          : "border-[var(--border-charcoal)] bg-[var(--bg-panel-elevated)] shadow-[2.5px_2.5px_0px_var(--border-charcoal)] hover:shadow-[4px_4px_0px_var(--border-charcoal)]"
      } ${isDimmed ? "opacity-40" : "opacity-100"}`}
    >
      {/* Core AI Glow Badge */}
      {isCore && (
        <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#dc2626] text-white text-xs font-mono font-bold rounded-bl-lg shadow-[0_0_10px_#dc2626]">
          Core AI
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-black/10"
            style={{ backgroundColor: `${step.accent}15`, color: step.accent }}
          >
            <Icon className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                {step.stepNum}
              </span>
              <span
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded border"
                style={{
                  borderColor: `${step.accent}50`,
                  backgroundColor: `${step.accent}10`,
                  color: step.accent,
                }}
              >
                {step.category}
              </span>
            </div>

            <div className="font-bold text-sm sm:text-base text-[var(--text-primary)] truncate mt-0.5">
              {step.label}
            </div>

            <div className="text-[var(--text-secondary)] text-xs font-mono truncate mt-0.5">
              {step.sub}
            </div>
          </div>
        </div>

        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-transform ${
            selected ? "text-[#dc2626] translate-x-1" : "text-[var(--text-muted)] group-hover:translate-x-0.5"
          }`}
        />
      </div>
    </motion.button>
  );
}

function ConnectorArrow({ color = "#dc2626", active = true }) {
  return (
    <div className="relative w-[2px] h-8 bg-[var(--border-subtle)] my-2 sm:my-2.5 overflow-hidden rounded-full flex justify-center">
      {active && (
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
}
