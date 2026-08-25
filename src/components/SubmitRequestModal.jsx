"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, AlertCircle, Loader2, Database, Mail, Brain } from "lucide-react";

export default function SubmitRequestModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ingest",
          userName: name || "Student Participant",
          userEmail: email || "sharmaa24434@gmail.com",
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
    "Sir I attended the 2-day GenAI workshop but didn't receive my certificate yet. Please verify attendance.",
    "Hey, I accidentally submitted the form twice with different emails, please merge.",
    "Completed all modules for Web3 track, requesting verified completion certificate.",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md"
          role="presentation"
        >
          <motion.div
            id="ticket-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-panel border border-border-subtle rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-panel-elevated/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-accent" aria-hidden="true" focusable="false" />
                </div>
                <div>
                  <h3 id="ticket-modal-title" className="text-lg font-bold text-gold">Submit Student Ticket</h3>
                  <p className="text-xs text-text-secondary">Triggers real Gemini AI ➔ Notion DB ➔ Email Pipeline</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="p-2 rounded-lg text-text-secondary hover:text-text-white hover:bg-canvas transition-colors focus-visible:outline-2 focus-visible:outline-cyan-accent"
              >
                <X className="w-5 h-5" aria-hidden="true" focusable="false" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {!result ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student-name-input" className="block text-xs font-mono text-text-secondary mb-1.5">
                        STUDENT NAME
                      </label>
                      <input
                        id="student-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-canvas border border-border-subtle text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-cyan-accent/50 focus-visible:ring-1 focus-visible:ring-cyan-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="student-email-input" className="block text-xs font-mono text-text-secondary mb-1.5">
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="student-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-canvas border border-border-subtle text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-cyan-accent/50 focus-visible:ring-1 focus-visible:ring-cyan-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="student-message-input" className="block text-xs font-mono text-text-secondary mb-1.5">
                      RAW MESSAGE / COMPLAINT (HINDI / ENGLISH)
                    </label>
                    <textarea
                      id="student-message-input"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Sir I attended AI workshop yesterday but didn't get certificate..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-canvas border border-border-subtle text-sm text-text-white placeholder:text-text-muted focus:outline-none focus:border-cyan-accent/50 focus-visible:ring-1 focus-visible:ring-cyan-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Sample Quick Fill */}
                  <div>
                    <span className="text-xs font-mono text-text-muted block mb-1.5">
                      QUICK TEST PRESETS:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sampleMessages.map((msg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setMessage(msg)}
                          className="text-xs px-2.5 py-1 rounded-md bg-panel-elevated border border-border-subtle text-text-secondary hover:text-cyan-accent hover:border-cyan-accent/30 text-left transition-colors truncate max-w-full focus-visible:outline-2 focus-visible:outline-cyan-accent"
                        >
                          Preset {i + 1}: {msg.substring(0, 32)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-crimson-accent/10 border border-crimson-accent/30 text-crimson-accent text-xs flex items-center gap-2" role="alert">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" focusable="false" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="btn-primary w-full py-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" focusable="false" />
                        <span>Processing Live Pipeline (Gemini AI + Notion)...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" focusable="false" />
                        <span>Launch Automated Pipeline</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success View */
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-lg bg-emerald-accent/10 border border-emerald-accent/30 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-accent flex-shrink-0" aria-hidden="true" focusable="false" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-accent">Pipeline Executed Successfully!</h4>
                      <p className="text-xs text-text-secondary">
                        Ticket <span className="font-mono text-gold font-bold">{result.requestId}</span> processed in{" "}
                        <span className="font-mono text-cyan-accent">{result.durationMs}ms</span>.
                      </p>
                    </div>
                  </div>

                  {/* AI Extraction Breakdown */}
                  {result.ai && (
                    <div className="p-4 rounded-lg bg-canvas border border-border-subtle space-y-2.5 font-mono text-xs">
                      <div className="flex items-center gap-2 text-violet-accent font-bold pb-1 border-b border-border-subtle">
                        <Brain className="w-4 h-4" aria-hidden="true" focusable="false" />
                        <span>GEMINI AI CLASSIFICATION</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-text-secondary">
                        <div>CATEGORY: <span className="text-gold font-bold">{result.ai.category}</span></div>
                        <div>CONFIDENCE: <span className="text-cyan-accent font-bold">{result.ai.confidence}%</span></div>
                        <div>PRIORITY: <span className="text-crimson-accent font-bold">{result.ai.priority}</span></div>
                        <div>STATUS: <span className="text-emerald-accent font-bold">{result.status}</span></div>
                      </div>
                      <div className="text-xs text-text-muted pt-1">
                        Reasoning: {result.ai.reasoning}
                      </div>
                    </div>
                  )}

                  {/* Action Steps Completed */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-panel-elevated border border-border-subtle flex items-center gap-2 text-text-secondary">
                      <Database className="w-4 h-4 text-amber-accent" aria-hidden="true" focusable="false" />
                      <span>Notion DB Synced</span>
                    </div>
                    <div className="p-3 rounded-lg bg-panel-elevated border border-border-subtle flex items-center gap-2 text-text-secondary">
                      <Mail className="w-4 h-4 text-cyan-accent" aria-hidden="true" focusable="false" />
                      <span>{result.email ? "Email Dispatched" : "Queued in Cockpit"}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setResult(null);
                        setMessage("");
                      }}
                      className="flex-1 py-2.5 rounded-lg border border-border-subtle text-text-secondary hover:text-text-white text-xs font-semibold focus-visible:outline-2 focus-visible:outline-cyan-accent"
                    >
                      Submit Another Ticket
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent text-xs font-semibold hover:bg-cyan-accent/20 focus-visible:outline-2 focus-visible:outline-cyan-accent"
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

