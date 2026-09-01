"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventStreamTimeline from "@/components/dashboard/EventStreamTimeline";
import TacticalEngineCanvas from "@/components/dashboard/TacticalEngineCanvas";
import BentoMetrics from "@/components/dashboard/BentoMetrics";

const initialEvents = [
  {
    id: "REQ-108",
    minute: "67",
    time: "13:45:02",
    userName: "Rahul Sharma",
    userEmail: "rahul.sharma24@gmail.com",
    title: "GenAI Workshop Certificate Missing",
    rawMessage: "Sir, I attended both Day 1 and Day 2 of the GenAI & Agentic AI Workshop. My attendance was marked at the venue, but I have not received my completion certificate email yet. Please verify and issue.",
    category: "CERTIFICATE_ISSUE",
    confidence: 98,
    status: "WAITING_APPROVAL",
    attendanceVerified: true,
    priority: "HIGH",
    actionPreview: "Generate PDF + Email",
  },
  {
    id: "REQ-107",
    minute: "54",
    time: "13:32:18",
    userName: "Priya Verma",
    userEmail: "priya.verma.cse@iitd.ac.in",
    title: "Hackathon Finalist Certificate Delivery",
    rawMessage: "Hello team, our team 'NeuralCoders' secured 2nd position in the National Hackathon 2026 track. Requesting official merit certificate dispatch to registered team email.",
    category: "CERTIFICATE_ISSUE",
    confidence: 99,
    status: "SUCCESS",
    attendanceVerified: true,
    priority: "HIGH",
    actionPreview: "PDF Dispatched",
  },
  {
    id: "REQ-106",
    minute: "41",
    time: "13:19:45",
    userName: "Sneha Patel",
    userEmail: "sneha.patel@dtu.ac.in",
    title: "Web3 Bootcamp Attendance Discrepancy",
    rawMessage: "Respected organizers, I attended the complete Web3 Smart Contracts track yesterday. During the closing session, the QR attendance scanner timed out. Kindly verify my attendance via the submitted project link and issue the verified badge.",
    category: "ATTENDANCE_FIX",
    confidence: 95,
    status: "WAITING_APPROVAL",
    attendanceVerified: true,
    priority: "HIGH",
    actionPreview: "Notion Review",
  },
  {
    id: "REQ-105",
    minute: "28",
    time: "13:06:10",
    userName: "Arjun Nair",
    userEmail: "arjun.nair@bits-pilani.ac.in",
    title: "Cloud DevOps Workshop Certificate Re-issue",
    rawMessage: "Hi, my certificate download link from last week's Kubernetes & Cloud DevOps hands-on session expired. Could you please re-send the verified PDF certificate to my college email?",
    category: "CERTIFICATE_ISSUE",
    confidence: 97,
    status: "SUCCESS",
    attendanceVerified: true,
    priority: "MEDIUM",
    actionPreview: "PDF Dispatched",
  },
  {
    id: "REQ-104",
    minute: "12",
    time: "12:50:33",
    userName: "Ananya Roy",
    userEmail: "ananya.roy@nitk.edu.in",
    title: "Full-Stack Track Merit Verification",
    rawMessage: "Greetings, I completed the 4-week Full-Stack Next.js 16 development bootcamp and submitted the final capstone project on GitHub. Requesting verified certificate with project title embedded.",
    category: "CERTIFICATE_ISSUE",
    confidence: 98,
    status: "SUCCESS",
    attendanceVerified: true,
    priority: "HIGH",
    actionPreview: "PDF Dispatched",
  },
];

const initialRunLogs = [
  {
    runId: "RUN-20260822-0045",
    timestamp: "13:45:10",
    action: "Generated & Dispatched Verified Certificate to priya.verma.cse@iitd.ac.in",
    trigger: "Notion Human Approval",
    duration: "1,240",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0044",
    timestamp: "13:32:25",
    action: "AI Classified & Synced Attendance Verification to Notion for sneha.patel@dtu.ac.in",
    trigger: "Webhook Ingest Gateway",
    duration: "980",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0043",
    timestamp: "13:19:50",
    action: "Re-issued Kubernetes PDF Certificate to arjun.nair@bits-pilani.ac.in",
    trigger: "Direct Request Ingestion",
    duration: "1,150",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0042",
    timestamp: "13:06:18",
    action: "Dispatched Full-Stack Capstone Certificate to ananya.roy@nitk.edu.in",
    trigger: "Notion Human Approval",
    duration: "1,380",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0041",
    timestamp: "12:50:40",
    action: "Ingested GenAI Workshop Request for rahul.sharma24@gmail.com into Notion Queue",
    trigger: "Webhook Ingest Gateway",
    duration: "890",
    status: "SUCCESS",
  },
];

export default function DashboardPage() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState("REQ-108");
  const [filterTab, setFilterTab] = useState("ALL");
  const [runLogs, setRunLogs] = useState(initialRunLogs);
  const [stats, setStats] = useState({
    completed: 248,
    pending: 3,
    logged: 251,
  });

  const [isProcessing, setIsProcessing] = useState(false);

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
          userEmail: target?.userEmail || 'sharmaa24434@gmail.com',
          requestId: eventId,
          eventName: 'Automate India',
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
      };
    } else if (type === 'GARBAGE_INPUT') {
      payload = {
        action: 'ingest',
        requestId: newId,
        userName: 'Unknown Sender',
        userEmail: 'invalid-payload-format',
        rawMessage: '??? $$$ --DROP TABLE requests;',
      };
    } else {
      payload = {
        action: 'ingest',
        requestId: newId,
        userName: 'Aman Dixit',
        userEmail: 'sharmaa24434@gmail.com',
        rawMessage: 'Attended full day AI workshop yesterday, need verified certificate urgently for scholarship submission.',
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
    <div className="min-h-screen bg-[#f7f6f2] text-[#18181b] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Top Header with semantic, visible H1 (Fix 15) */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#e2dfd6]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black text-[#18181b] tracking-tight">
                Live Automation Cockpit
              </h1>
              <span className="badge-live">
                <span className="badge-live-dot" aria-hidden="true" />
                <span>LIVE ENGINE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#52525b] mt-1">
              Autonomous request triage, human-in-the-loop approvals, and real-time execution telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#52525b] bg-white px-3 py-1.5 rounded-lg border border-[#e2dfd6] shadow-[1px_1px_0px_#18181b]">
              Queue: <strong className="text-[#18181b]">{events.length} Active</strong>
            </span>
            <span className="text-xs font-mono text-[#059669] bg-[#ecfdf5] px-3 py-1.5 rounded-lg border border-[#059669]/40 font-bold">
              Uptime: 99.8%
            </span>
          </div>
        </div>

        {/* 3-Column Desktop Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
