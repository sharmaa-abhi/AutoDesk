"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import {
  EventStreamTimeline,
  TacticalEngineCanvas,
  BentoMetrics,
  FullPageCircularCockpit,
} from "@/components/dashboard";
import { initialEvents, initialRunLogs } from "@/data";


export default function DashboardPage() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState("REQ-108");
  const [filterTab, setFilterTab] = useState("ALL");
  const [dashboardMode, setDashboardMode] = useState("CIRCULAR_WHEEL"); // "CIRCULAR_WHEEL" | "STANDARD_GRID"
  const [runLogs, setRunLogs] = useState(initialRunLogs);
  const [stats, setStats] = useState({
    completed: 248,
    pending: 3,
    logged: 251,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch real Notion records on mount
  useEffect(() => {
    async function loadLiveNotionData() {
      try {
        const res = await fetch('/api/pipeline');
        if (!res.ok) return;
        const data = await res.json();
        if (data.events && data.events.length > 0) {
          setEvents(data.events);
          setSelectedEventId(data.events[0].id);
          const completedCount = data.events.filter((e) => e.status === 'SUCCESS').length;
          const pendingCount = data.events.filter((e) => e.status === 'WAITING_APPROVAL').length;
          setStats((prev) => ({
            ...prev,
            completed: 240 + completedCount,
            pending: pendingCount,
            logged: 240 + data.events.length,
          }));
        }
        if (data.runLogs && data.runLogs.length > 0) {
          setRunLogs(data.runLogs);
        }
      } catch (err) {
        console.warn('Could not fetch live Notion data on dashboard load:', err.message);
      }
    }

    loadLiveNotionData();
  }, []);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleApproveEvent = async (eventId) => {
    const target = events.find((e) => e.id === eventId) || selectedEvent;
    if (!target || target.status === 'SUCCESS') return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          userName: target?.userName || 'Student',
          userEmail: target?.userEmail || null,
          requestId: eventId,
          eventId: target?.eventId || 'automate-india-2026',
          eventName: target?.eventName || 'Automate India',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Approval request failed');
      }

      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: 'SUCCESS' } : e))
      );

      setStats((prev) => ({
        ...prev,
        completed: prev.completed + 1,
        pending: target.status === 'WAITING_APPROVAL' ? Math.max(0, prev.pending - 1) : prev.pending,
        logged: prev.logged + 1,
      }));

      const newLog = {
        runId: data.runId || `RUN-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        action: `Live Approved: Certificate Dispatched to ${target?.userEmail || target?.userName}`,
        trigger: 'Notion HITL Cockpit',
        duration: `${data.durationMs || 1240}`,
        status: 'SUCCESS',
      };

      setRunLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectEvent = async (eventId) => {
    const target = events.find((e) => e.id === eventId) || selectedEvent;
    if (!target || target.status === 'FAILED') return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          requestId: eventId,
          eventId: target?.eventId || 'automate-india-2026',
          eventName: target?.eventName || 'Automate India',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Reject request failed');
      }

      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: 'FAILED' } : e))
      );

      setStats((prev) => ({
        ...prev,
        pending: target.status === 'WAITING_APPROVAL' ? Math.max(0, prev.pending - 1) : prev.pending,
        logged: prev.logged + 1,
      }));

      const newLog = {
        runId: data.runId || `RUN-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        action: `Operator Rejected Request ${eventId} (Attendance unverified)`,
        trigger: 'Notion HITL Cockpit',
        duration: `${data.durationMs || 420}`,
        status: 'REJECTED',
      };

      setRunLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Reject failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulateWebhook = async (type) => {
    setIsProcessing(true);
    const nextNum = events.length + 109;
    const newId = `REQ-${nextNum}`;

    let payload;
    if (typeof type === 'object' && type.custom) {
      payload = {
        action: 'ingest',
        requestId: newId,
        userName: type.userName || 'Student Participant',
        userEmail: type.userEmail || 'rahul.sharma24@gmail.com',
        rawMessage: type.rawMessage,
        eventId: type.eventId || 'automate-india-2026',
        eventName: type.eventName || 'Automate India',
      };
    } else if (type === 'GARBAGE_INPUT') {
      payload = {
        action: 'ingest',
        requestId: newId,
        userName: 'Unknown Sender',
        userEmail: 'invalid-payload-format',
        rawMessage: '??? $$$ --DROP TABLE requests;',
        eventId: 'automate-india-2026',
        eventName: 'Automate India',
      };
    } else {
      payload = {
        action: 'ingest',
        requestId: newId,
        userName: 'Aman Dixit',
        userEmail: 'aman.dixit@college.edu',
        rawMessage: 'Attended full day AI workshop yesterday, need verified certificate urgently for scholarship submission.',
        eventId: 'ai-masterclass',
        eventName: 'Next.js AI & Agentic Systems Masterclass',
      };
    }

    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Webhook simulation failed');
      }

      const formatAction = (raw) => {
        if (!raw) return 'Generate PDF + Email';
        if (raw === 'GENERATE_PDF + EMAIL') return 'Generate PDF + Email';
        if (raw === 'PDF_DISPATCHED') return 'PDF Dispatched';
        if (raw === 'NOTION_HITL_REVIEW') return 'Notion Review';
        return raw;
      };

      const newEvent = {
        id: newId,
        minute: `${Math.floor(Math.random() * 80 + 10)}`,
        time: new Date().toLocaleTimeString(),
        userName: payload.userName,
        userEmail: payload.userEmail,
        eventId: payload.eventId || 'automate-india-2026',
        eventName: payload.eventName || 'Automate India',
        title: data.ai?.title || 'Workshop Certificate Ingest',
        rawMessage: payload.rawMessage,
        category: data.ai?.category || (type === 'GARBAGE_INPUT' ? 'UNCLASSIFIED_DATA' : 'CERTIFICATE_ISSUE'),
        confidence: data.ai?.confidence || (type === 'GARBAGE_INPUT' ? 34 : 97),
        status: data.status || (type === 'GARBAGE_INPUT' ? 'NEEDS_FIX' : 'WAITING_APPROVAL'),
        attendanceVerified: data.ai?.attendanceVerified ?? (type !== 'GARBAGE_INPUT'),
        priority: data.ai?.priority || (type === 'GARBAGE_INPUT' ? 'CRITICAL' : 'HIGH'),
        actionPreview: formatAction(data.ai?.actionPreview),
      };

      setEvents((prev) => [newEvent, ...prev]);
      setSelectedEventId(newId);

      setStats((prev) => ({
        ...prev,
        pending: prev.pending + (newEvent.status === 'SUCCESS' ? 0 : 1),
        completed: prev.completed + (newEvent.status === 'SUCCESS' ? 1 : 0),
        logged: prev.logged + 1,
      }));

      const newLog = {
        runId: data.runId || `RUN-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        action: `Live Ingestion: Gemini Analyzed & Synced to Notion (${newId})`,
        trigger: 'Webhook Ingest Gateway',
        duration: `${data.durationMs || 1420}`,
        status: data.status === 'NEEDS_FIX' ? 'ALERT' : 'SUCCESS',
      };

      setRunLogs((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error('Webhook simulation failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Top Header with View Switcher */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                Live Automation Cockpit
              </h1>
              <span className="badge-live">
                <span className="badge-live-dot" aria-hidden="true" />
                <span>LIVE ENGINE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Autonomous request triage, human-in-the-loop approvals, and real-time execution telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-panel)] border-2 border-[var(--border-charcoal)] shadow-[2px_2px_0px_var(--border-charcoal)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.6)] text-xs font-mono">
              <button
                type="button"
                onClick={() => setDashboardMode("CIRCULAR_WHEEL")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  dashboardMode === "CIRCULAR_WHEEL"
                    ? "bg-[#18181b] dark:bg-[#dc2626] text-white shadow-[1px_1px_0px_#dc2626] dark:shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                🎡 Full-Page Circular Wheel
              </button>
              <button
                type="button"
                onClick={() => setDashboardMode("STANDARD_GRID")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  dashboardMode === "STANDARD_GRID"
                    ? "bg-[#18181b] dark:bg-[#dc2626] text-white shadow-[1px_1px_0px_#dc2626] dark:shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                🎛️ Standard Cockpit
              </button>
            </div>

            <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-panel)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] shadow-[1px_1px_0px_var(--border-charcoal)]">
              Queue: <strong className="text-[var(--text-primary)]">{events.length} Active</strong>
            </span>
          </div>
        </div>

        {/* Dynamic Mode Switcher Render */}
        <AnimatePresence mode="wait">
          {dashboardMode === "CIRCULAR_WHEEL" ? (
            <motion.div
              key="circular-wheel-page"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full"
            >
              <FullPageCircularCockpit
                events={events}
                selectedEvent={selectedEvent}
                selectedEventId={selectedEventId}
                onSelectEvent={setSelectedEventId}
                onApproveEvent={handleApproveEvent}
                onRejectEvent={handleRejectEvent}
                onSimulateWebhook={handleSimulateWebhook}
                stats={stats}
                runLogs={runLogs}
              />
            </motion.div>
          ) : (
            <motion.div
              key="standard-grid-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Column 1: Left Panel (Match Stream & Event Timeline) [3.5 cols] */}
              <div className="lg:col-span-3 h-full">
                <EventStreamTimeline
                  events={events}
                  selectedEventId={selectedEventId}
                  onSelectEvent={setSelectedEventId}
                  filterTab={filterTab}
                  setFilterTab={setFilterTab}
                />
              </div>

              {/* Column 2: Center Canvas (Tactical Field & Live Cockpit) [5.5 cols] */}
              <div className="lg:col-span-6 h-full">
                <TacticalEngineCanvas
                  selectedEvent={selectedEvent}
                  onApproveEvent={handleApproveEvent}
                  onRejectEvent={handleRejectEvent}
                  onSimulateWebhook={handleSimulateWebhook}
                />
              </div>

              {/* Column 3: Right Panel (Deep Metrics & Bento Breakdown) [3 cols] */}
              <div className="lg:col-span-3 h-full">
                <BentoMetrics stats={stats} runLogs={runLogs} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}


