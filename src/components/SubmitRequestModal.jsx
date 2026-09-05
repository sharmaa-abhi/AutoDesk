"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
  Mail,
  Brain,
  Calendar,
  Zap,
} from "lucide-react";
import { EVENT_CATALOG, DEFAULT_EVENT_ID } from "@/lib/events";

export default function SubmitRequestModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(DEFAULT_EVENT_ID);
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
      const selectedEvent = EVENT_CATALOG[selectedEventId] || EVENT_CATALOG[DEFAULT_EVENT_ID];

      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ingest",
          userName: name.trim(),
          userEmail: email.trim(),
          rawMessage: message,
          eventId: selectedEvent.id,
          eventName: selectedEvent.name,
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
      eventId: "ai-masterclass",
      msg: "Sir, I attended both Day 1 and Day 2 of the GenAI Workshop. My attendance was marked at the venue, but I have not received my certificate email yet.",
    },
    {
      title: "Hackathon Finalist Merit",
      eventId: "automate-india-2026",
      msg: "Hello team, our team 'NeuralCoders' secured 2nd position in the National Hackathon 2026 track. Requesting official merit certificate dispatch.",
    },
    {
      title: "Web3 Attendance Discrepancy",
      eventId: "web3-builders",
      msg: "Respected organizers, I attended the complete Web3 Smart Contracts track yesterday. Kindly verify my attendance via project submission and issue badge.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181b]/60 backdrop-blur-sm"
          role="presentation"
          onClick={onClose}
        >
          <motion.div
            id="ticket-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-xl bg-white border-2 border-[#18181b] rounded-2xl shadow-[5px_5px_0px_#18181b] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-5 border-b-2 border-[#18181b] flex items-center justify-between bg-[#fcfbfa]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#18181b] text-white flex items-center justify-center shadow-[1.5px_1.5px_0px_#dc2626]">
                  <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: "8s" }} aria-hidden="true" focusable="false" />
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
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close dialog"
                onClick={onClose}
                className="btn-icon w-8 h-8 rounded-lg"
              >
                <X className="w-4 h-4" aria-hidden="true" focusable="false" />
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto bg-[#faf9f6]">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Event Selector */}
                  <div>
                    <label htmlFor="event-selector-input" className="block text-xs font-mono font-bold text-[#18181b] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#dc2626]" aria-hidden="true" />
                      <span>SELECT EVENT / WORKSHOP TRACK</span>
                    </label>
                    <select
                      id="event-selector-input"
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="dev-input font-medium cursor-pointer"
                    >
                      {Object.values(EVENT_CATALOG).map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          {ev.name} ({ev.track})
                        </option>
                      ))}
                    </select>
                  </div>

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
                      className="dev-input resize-none text-xs sm:text-sm leading-relaxed"
                    />
                  </div>

                  {/* Preset Buttons */}
                  <div>
                    <span className="text-xs font-mono text-[#71717a] font-bold block mb-1.5">
                      QUICK TEST PRESETS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {sampleMessages.map((sample, i) => (
                        <motion.button
                          key={i}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setMessage(sample.msg);
                            if (sample.eventId) setSelectedEventId(sample.eventId);
                          }}
                          className="btn-secondary btn-secondary-sm text-xs font-mono text-left justify-start py-2 px-2.5 truncate"
                          title={sample.msg}
                        >
                          <span className="font-bold text-[#dc2626] mr-1">P{i + 1}:</span>
                          <span className="truncate">{sample.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-[#fee2e2] border-2 border-[#dc2626] text-[#991b1b] text-xs font-mono flex items-center gap-2"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#dc2626]" aria-hidden="true" focusable="false" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading || !message.trim()}
                    className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-[2px_2px_0px_#18181b]"
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
                  </motion.button>
                </form>
              ) : (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="space-y-4 py-1"
                >
                  <div className="p-4 rounded-xl bg-[#ecfdf5] border-2 border-[#059669] flex items-center gap-3 shadow-[2px_2px_0px_#059669]">
                    <CheckCircle2 className="w-6 h-6 text-[#059669] flex-shrink-0" aria-hidden="true" focusable="false" />
                    <div>
                      <h4 className="text-sm font-bold text-[#065f46]">Pipeline Ingested Successfully!</h4>
                      <p className="text-xs text-[#065f46]/90 font-mono mt-0.5">
                        Ticket <strong className="text-[#18181b]">{result.requestId}</strong> processed in{" "}
                        <strong>{result.durationMs}ms</strong>.
                      </p>
                    </div>
                  </div>

                  {/* AI Extraction Breakdown */}
                  {result.ai && (
                    <div className="p-4 rounded-xl bg-white border-2 border-[#18181b] space-y-2.5 font-mono text-xs shadow-[2.5px_2.5px_0px_#18181b]">
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
                    <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] flex items-center gap-2 text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                      <Database className="w-4 h-4 text-[#d97706]" aria-hidden="true" focusable="false" />
                      <span>Notion DB Synced ✓</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border-2 border-[#18181b] flex items-center gap-2 text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                      <Mail className="w-4 h-4 text-[#059669]" aria-hidden="true" focusable="false" />
                      <span>{result.email ? "Email Dispatched ✓" : "Queued in Cockpit"}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setResult(null);
                        setName("");
                        setEmail("");
                        setMessage("");
                        setError(null);
                      }}
                      className="btn-secondary flex-1 py-2.5 text-xs font-mono"
                    >
                      Submit Another Ticket
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="btn-primary flex-1 py-2.5 text-xs font-mono"
                    >
                      Close & View Cockpit
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
