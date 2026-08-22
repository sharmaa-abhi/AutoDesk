"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchScoreboard from "@/components/dashboard/MatchScoreboard";
import EventStreamTimeline from "@/components/dashboard/EventStreamTimeline";
import TacticalEngineCanvas from "@/components/dashboard/TacticalEngineCanvas";
import BentoMetrics from "@/components/dashboard/BentoMetrics";

const initialEvents = [
  {
    id: "REQ-108",
    minute: "67",
    time: "13:45:02",
    userName: "Rahul Sharma",
    userEmail: "rahul.sharma@college.edu",
    title: "AI Workshop Certificate Missing",
    rawMessage: "Sir I attended the 2-day GenAI workshop but didn't receive my certificate yet. Please verify attendance.",
    category: "CERTIFICATE_ISSUE",
    confidence: 94,
    status: "WAITING_APPROVAL",
    attendanceVerified: true,
    priority: "HIGH",
    actionPreview: "GENERATE_PDF + EMAIL",
  },
  {
    id: "REQ-107",
    minute: "54",
    time: "13:32:18",
    userName: "Priya Verma",
    userEmail: "priya.v@gmail.com",
    title: "Duplicate Registration Detected",
    rawMessage: "Hey I accidentally submitted the hackathon team form twice with different member emails.",
    category: "DUPLICATE_REGISTRATION",
    confidence: 98,
    status: "SUCCESS",
    attendanceVerified: true,
    priority: "LOW",
    actionPreview: "DEDUPLICATED",
  },
  {
    id: "REQ-106",
    minute: "41",
    time: "13:19:45",
    userName: "Ankit Gupta",
    userEmail: "ankit_invalid@",
    title: "Malformed Input Ingested",
    rawMessage: "abc12345 attendance fixed pls!!",
    category: "UNCLASSIFIED_DATA",
    confidence: 62,
    status: "NEEDS_FIX",
    attendanceVerified: false,
    priority: "MEDIUM",
    actionPreview: "FLAGGED_NOTION",
  },
  {
    id: "REQ-105",
    minute: "28",
    time: "13:06:10",
    userName: "Neha Singh",
    userEmail: "neha.singh@outlook.com",
    title: "Web3 Track Certificate Clearance",
    rawMessage: "Completed all 3 modules for Solidity bootcamp, requesting verified completion badge.",
    category: "CERTIFICATE_ISSUE",
    confidence: 96,
    status: "SUCCESS",
    attendanceVerified: true,
    priority: "HIGH",
    actionPreview: "PDF_DISPATCHED",
  },
  {
    id: "REQ-104",
    minute: "12",
    time: "12:50:33",
    userName: "Karan Johar",
    userEmail: "karan.j@tech.in",
    title: "Session Reschedule Inquiry",
    rawMessage: "Can we shift mentor slot from 4 PM to 6 PM tomorrow?",
    category: "CALENDAR_RESCHEDULE",
    confidence: 91,
    status: "SUCCESS",
    attendanceVerified: true,
    priority: "MEDIUM",
    actionPreview: "CALENDAR_SYNC",
  },
];

const initialRunLogs = [
  {
    runId: "RUN-20260822-0042",
    timestamp: "13:45:10",
    action: "Certificate PDF Generated + Email Sent to Neha",
    trigger: "Notion Human Approval",
    duration: "1,420",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0041",
    timestamp: "13:32:25",
    action: "MD5 Duplicate Request Filtered (REQ-107)",
    trigger: "Ingestion Webhook",
    duration: "340",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0040",
    timestamp: "13:19:50",
    action: "Push to 'Needs Human Data Fix' Queue (REQ-106)",
    trigger: "Validation Guardrail",
    duration: "410",
    status: "SUCCESS",
  },
  {
    runId: "RUN-20260822-0039",
    timestamp: "13:06:22",
    action: "Puppeteer Rendered Certificate #CERT-8842",
    trigger: "Notion Sync Poller",
    duration: "1,860",
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
    setIsProcessing(true);
    const target = events.find((e) => e.id === eventId) || selectedEvent;

    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          userName: target?.userName || 'Student',
          userEmail: target?.userEmail || 'sharmaa24434@gmail.com',
          requestId: eventId,
          eventName: 'National GenAI & Web3 Hackathon 2026',
        }),
      });
      const data = await res.json();

      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: 'SUCCESS' } : e))
      );

      setStats((prev) => ({
        ...prev,
        completed: prev.completed + 1,
        pending: Math.max(0, prev.pending - 1),
        logged: prev.logged + 1,
      }));

      const newLog = {
        runId: data.runId || `RUN-20260822-00${runLogs.length + 43}`,
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

      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: 'FAILED' } : e))
      );

      setStats((prev) => ({
        ...prev,
        pending: Math.max(0, prev.pending - 1),
        logged: prev.logged + 1,
      }));

      const newLog = {
        runId: data.runId || `RUN-20260822-00${runLogs.length + 43}`,
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
    if (type === 'GARBAGE_INPUT') {
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
        actionPreview: data.ai?.actionPreview || 'GENERATE_PDF + EMAIL',
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
        runId: data.runId || `RUN-20260822-00${runLogs.length + 43}`,
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
    <div className="min-h-screen bg-canvas text-text-gold font-sans flex flex-col dot-grid">
      <Navbar />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 pt-24 pb-12">
        {/* Top Scoreboard / Live Telemetry Header */}
        <MatchScoreboard activeEvent={selectedEvent} stats={stats} />

        {/* 3-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
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
