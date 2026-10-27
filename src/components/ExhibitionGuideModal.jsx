import React, { useState } from 'react';
import { XIcon, GraduationCapIcon, SparklesIcon, CheckCircle2Icon, InfoIcon } from './Icons';

export default function ExhibitionGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('demo-script');

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          border: '1px solid #cbd5e1',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(37, 99, 235, 0.25)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <GraduationCapIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
                StudyOS Exhibition & Presenter Guide
              </h2>
              <p style={{ fontSize: '12px', margin: 0, color: '#94a3b8' }}>
                Science & Arts Exhibition Demonstration Handout for Students & Judges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '0 24px' }}>
          {[
            { id: 'demo-script', label: '5-Min Booth Script' },
            { id: 'architecture', label: 'Architecture & Rules' },
            { id: 'judge-qna', label: 'Judge Q&A Prep' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 18px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#64748b'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
          {activeTab === 'demo-script' && (
            <div>
              <div style={{ backgroundColor: '#eff6ff', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1e40af' }}>Exhibition Booth Mission:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#1e3a8a' }}>
                  Deliver a smooth, convincing 5-minute walkthrough for science fair judges, teachers, and visiting students.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Minute 1: The Student Problem</span>
                  <p style={{ margin: '4px 0', fontWeight: 600, color: '#0f172a' }}>
                    Show Landing Page & Tagline: "Your studies. One clear plan."
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    "Good morning judges! Matric and O-Level students in Pakistan juggle school homework, exam dates, syllabus notes, and past papers across multiple registers and WhatsApp groups. Nobody shows them what needs attention first."
                  </p>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Minute 2: The Unified Dashboard</span>
                  <p style={{ margin: '4px 0', fontWeight: 600, color: '#0f172a' }}>
                    Click "Open Dashboard" & point to the Metric Cards
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    "StudyOS aggregates everything into one view: 6 pending assignments, the countdown to Physics Paper 1 in 4 days, and real 46% syllabus coverage calculated directly from verified chapters."
                  </p>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Minute 3: Interactive Diagnostic Quiz</span>
                  <p style={{ margin: '4px 0', fontWeight: 600, color: '#0f172a' }}>
                    Go to Quiz, answer 2 questions (get one right, one wrong deliberately)
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    "Watch what happens when a student takes a quick 5-question checkup. StudyOS doesn't just calculate a score—it immediately flags the specific concepts missed, like Ohm's Law or Matrices."
                  </p>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Minute 4: The Smart Revision Engine</span>
                  <p style={{ margin: '4px 0', fontWeight: 600, color: '#0f172a' }}>
                    Navigate to "Progress & Recommendations"
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    "Here is the core innovation: StudyOS connects that quiz mistake with the upcoming exam calendar and uncompleted syllabus topics to build an automatic, transparent daily revision plan with exact reasons explained."
                  </p>
                </div>

                <div style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Minute 5: Demo Reliability & Offline Persistence</span>
                  <p style={{ margin: '4px 0', fontWeight: 600, color: '#0f172a' }}>
                    Add a quick homework task, refresh the page, and show the "Reset Demo Data" safety button
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    "Everything is saved securely in the browser localStorage—zero internet dependency required at the exhibition stall, 100% offline-ready, with a one-click reset for the next judge!"
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Architecture & Data Flow
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                StudyOS is engineered with clean modular JavaScript and React principles so secondary school students can inspect, understand, and explain the code.
              </p>

              <div style={{ backgroundColor: '#f1f5f9', padding: '14px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#1e293b', marginBottom: '16px' }}>
                [ User Action / Inputs ]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                [ React State & Page Components (Tasks, Exams, Quiz, Syllabus) ]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                [ Storage Service (`storage.js`) ] → [ Browser localStorage ]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;↓ (Reactive Event Trigger)<br />
                [ Deterministic Rules Engine (`recommendations.js`) ]<br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── Rule 1: Overdue Task Scanner<br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── Rule 2: Exam Countdown + Syllabus Gap Matcher<br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── Rule 3: Diagnostic Quiz Missed Topic Analyzer<br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── Rule 4: Syllabus Progress Balancer<br />
                &nbsp;&nbsp;&nbsp;&nbsp;↓<br />
                [ Prioritized Study Queue on Student Dashboard ]
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '16px', marginBottom: '6px' }}>
                Honest, Transparent Engineering:
              </h4>
              <p style={{ fontSize: '13px', color: '#475569' }}>
                Unlike applications that falsely claim "AI deep learning" for simple if-else decisions, StudyOS proudly features a deterministic, verifiable rule engine. Every suggestion has an explicit audit trail explaining why it was triggered.
              </p>
            </div>
          )}

          {activeTab === 'judge-qna' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>Q1: "Is this connected to a live school database?"</strong>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#475569' }}>
                  <em>Answer:</em> "No. For privacy, security, and offline booth reliability, this exhibition build stores data in local browser storage. No student credentials or personal IDs are transmitted over the cloud."
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>Q2: "How does StudyOS support both Matric and O-Level students?"</strong>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#475569' }}>
                  <em>Answer:</em> "Matric (FBISE/BISE) and O-Level (Cambridge CAIE) share core scientific principles in Physics, Chemistry, Biology, and Math, but have different examination styles. StudyOS includes dual syllabus tracks, paper codes (e.g., CAIE 5054 / FBISE), and customized topics."
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>Q3: "What happens if a student resets the demonstration?"</strong>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#475569' }}>
                  <em>Answer:</em> "The 'Reset Demo Data' button safely reloads our pre-verified demonstration dataset with relative dates, ensuring every judge gets a fresh, fully functioning walkthrough in seconds."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Ready to Demonstrate
          </button>
        </div>
      </div>
    </div>
  );
}
