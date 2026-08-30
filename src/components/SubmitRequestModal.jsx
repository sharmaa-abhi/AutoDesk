"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, AlertCircle, Loader2, Database, Mail, Brain } from "lucide-react";

export default function SubmitRequestModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ingest",
          userName: name.trim(),
          userEmail: email.trim(),
          rawMessage: message,
          eventName: "Automate India",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process request");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const sampleMessages = [
    {
      title: "GenAI Workshop Missing",
      msg: "Sir, I attended both Day 1 and Day 2 of the GenAI Workshop. My attendance was marked at the venue, but I have not received my certificate email yet.",
    },
    {
      title: "Hackathon Finalist Merit",
      msg: "Hello team, our team 'NeuralCoders' secured 2nd position in the National Hackathon 2026 track. Requesting official merit certificate dispatch.",
    },
    {
      title: "Web3 Attendance Discrepancy",
      msg: "Respected organizers, I attended the complete Web3 Smart Contracts track yesterday. Kindly verify my attendance via project submission and issue badge.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181b]/50 backdrop-blur-sm"
          role="presentation"
          onClick={onClose}
        >
          <motion.div
            id="ticket-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-xl bg-white border-2 border-[#18181b] rounded-2xl shadow-[4px_4px_0px_#18181b] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-5 border-b-2 border-[#18181b] flex items-center justify-between bg-[#fcfbfa]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#18181b] text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_#dc2626]">
                  <Sparkles className="w-4 h-4 text-white" aria-hidden="true" focusable="false" />
                </div>
                <div>
                  <h3 id="ticket-modal-title" className="text-base font-bold text-[#18181b]">
                    Submit Incident Ticket
                  </h3>
                  <p className="text-xs text-[#52525b] font-mono mt-0.5">
                    Triggers live Gemini AI ➔ Notion DB ➔ Action Pipeline
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="btn-icon w-8 h-8 rounded-lg"
              >
                <X className="w-4 h-4" aria-hidden="true" focusable="false" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto bg-[#faf9f6]">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student-name-input" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5">
                        STUDENT / USER NAME
                      </label>
                      <input
                        id="student-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="dev-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="student-email-input" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5">
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="student-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul.sharma24@gmail.com"
                        className="dev-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="student-message-input" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5">
                      COMPLAINT / REQUEST MESSAGE (NATURAL LANGUAGE)
                    </label>
                    <textarea
                      id="student-message-input"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Sir I attended AI workshop yesterday but didn't get certificate..."
                      required
                      className="dev-input resize-none text-xs sm:text-sm"
                    />
                  </div>

                  {/* Preset Buttons */}
                  <div>
                    <span className="text-xs font-mono text-[#71717a] font-bold block mb-1.5">
                      QUICK TEST PRESETS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {sampleMessages.map((sample, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setMessage(sample.msg)}
                          className="btn-secondary btn-secondary-sm text-xs font-mono text-left justify-start py-2 px-2.5 truncate"
                          title={sample.msg}
                        >
                          <span className="font-bold text-[#dc2626] mr-1">P{i + 1}:</span>
                          <span className="truncate">{sample.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-[#fee2e2] border-2 border-[#dc2626] text-[#991b1b] text-xs font-mono flex items-center gap-2" role="alert">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#dc2626]" aria-hidden="true" focusable="false" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" focusable="false" />
                        <span>Processing with Gemini AI & Notion...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" aria-hidden="true" focusable="false" />
                        <span>Launch Automated Pipeline</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success View */
                <div className="space-y-4 py-1">
                  <div className="p-4 rounded-xl bg-[#ecfdf5] border-2 border-[#059669] flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#059669] flex-shrink-0" aria-hidden="true" focusable="false" />
                    <div>
                      <h4 className="text-sm font-bold text-[#065f46]">Pipeline Ingested Successfully!</h4>
                      <p className="text-xs text-[#065f46]/80 font-mono mt-0.5">
                        Ticket <strong className="text-[#18181b]">{result.requestId}</strong> processed in{" "}
                        <strong>{result.durationMs}ms</strong>.
                      </p>
                    </div>
                  </div>

                  {/* AI Extraction Breakdown */}
                  {result.ai && (
                    <div className="p-4 rounded-xl bg-white border-2 border-[#18181b] space-y-2.5 font-mono text-xs shadow-[2px_2px_0px_#18181b]">
                      <div className="flex items-center gap-2 text-[#18181b] font-bold pb-2 border-b border-[#e2dfd6]">
                        <Brain className="w-4 h-4 text-[#dc2626]" aria-hidden="true" focusable="false" />
                        <span>GEMINI AI INTENT EXTRACTION</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[#52525b]">
                        <div>CATEGORY: <strong className="text-[#18181b]">{result.ai.category}</strong></div>
                        <div>CONFIDENCE: <strong className="text-[#059669]">{result.ai.confidence}%</strong></div>
                        <div>PRIORITY: <strong className="text-[#dc2626]">{result.ai.priority}</strong></div>
                        <div>STATUS: <strong className="text-[#18181b]">{result.status}</strong></div>
                      </div>
                      <div className="text-xs text-[#71717a] pt-1 border-t border-[#f0eee6]">
                        Reasoning: {result.ai.reasoning}
                      </div>
                    </div>
                  )}

                  {/* Action Steps */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] flex items-center gap-2 text-[#18181b]">
                      <Database className="w-4 h-4 text-[#d97706]" aria-hidden="true" focusable="false" />
                      <span>Notion DB Synced ✓</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] flex items-center gap-2 text-[#18181b]">
                      <Mail className="w-4 h-4 text-[#059669]" aria-hidden="true" focusable="false" />
                      <span>{result.email ? "Email Dispatched ✓" : "Queued in Cockpit"}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setResult(null);
                        setMessage("");
                      }}
                      className="btn-secondary flex-1 py-2.5 text-xs font-mono"
                    >
                      Submit Another Ticket
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-primary flex-1 py-2.5 text-xs font-mono"
                    >
                      Close & View Cockpit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
