import React, { useState } from 'react';
import {
  MenuIcon,
  RefreshCwIcon,
  GraduationCapIcon,
  TrashIcon,
  InfoIcon
} from './Icons';
import ConfirmationModal from './ConfirmationModal';

export default function Header({
  activePage,
  onOpenMobileMenu,
  onResetData,
  onClearData,
  onOpenExhibitionGuide,
  onOpenProfile
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const PAGE_TITLES = {
    home: { title: 'StudyOS Overview', subtitle: 'Product Vision & Exhibition Showcase' },
    dashboard: { title: 'Student Dashboard', subtitle: 'Welcome back! Here is your daily study overview.' },
    tasks: { title: 'Homework Manager', subtitle: 'Track assignments, deadlines, and submission status.' },
    exams: { title: 'Examination Planner', subtitle: 'Targeted countdowns for Matric & O-Level board sessions.' },
    syllabus: { title: 'Subject & Syllabus Tracker', subtitle: 'Monitor chapter completion across science and humanities.' },
    lessons: { title: 'Lesson Studio & Topic Search', subtitle: 'Search syllabus topics and generate structured revision notes.' },
    pastpapers: { title: 'Past Papers & Mock Generator', subtitle: 'Authentic FBISE & CAIE questions (2021–2024) with marking schemes.' },
    quiz: { title: 'Diagnostic MCQ Practice', subtitle: 'Curriculum-aligned questions to identify weak topics.' },
    progress: { title: 'Progress & Smart Recommendations', subtitle: 'Deterministic rule engine connecting mistakes and deadlines.' }
  };

  const currentMeta = PAGE_TITLES[activePage] || PAGE_TITLES.dashboard;

  return (
    <>
      <header
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          gap: '12px'
        }}
      >
        {/* Left: Mobile Menu Trigger + Page Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <button
            onClick={onOpenMobileMenu}
            className="studyos-mobile-menu-btn"
            style={{
              background: 'none',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '6px',
              color: '#334155',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <div style={{ overflow: 'hidden' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentMeta.title}
            </h1>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="studyos-subtitle">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Demo Controls & Exhibition Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Profile Switcher Quick Button */}
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Change student profile or curriculum track"
            >
              <GraduationCapIcon className="w-4 h-4 text-blue-600" />
              <span className="studyos-btn-text">Profile / Track</span>
            </button>
          )}

          {/* Exhibition Guide Button */}
          <button
            onClick={onOpenExhibitionGuide}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Open 5-minute exhibition demonstration script"
          >
            <span style={{ fontSize: '14px' }}>🎯</span>
            <span className="studyos-btn-text">Booth Guide</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Restore standard demonstration state"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span className="studyos-btn-text">Reset</span>
          </button>

          {/* Clear All Data Button */}
          <button
            onClick={() => setShowClearConfirm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 8px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #fecdd3',
              color: '#e11d48',
              fontSize: '12.5px',
              cursor: 'pointer'
            }}
            title="Clear all tasks and records to test empty states"
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showResetConfirm}
        title="Reset Demonstration Data?"
        message="This will reload the official sample dataset for Shayan Khan (Grade 10 Matric/O-Level), restoring sample assignments, board exam countdowns, syllabus status, and practice quiz history."
        confirmLabel="Reset to Demo State"
        onConfirm={() => {
          onResetData();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />

      <ConfirmationModal
        isOpen={showClearConfirm}
        isDanger={true}
        title="Clear All Sample Records?"
        message="This empties tasks, examination dates, and quiz logs to demonstrate how StudyOS presents clean, user-friendly empty states to new students."
        confirmLabel="Clear Everything"
        onConfirm={() => {
          onClearData();
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </>
  );
}
