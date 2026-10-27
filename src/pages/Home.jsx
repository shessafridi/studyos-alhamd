import React from 'react';
import {
  LogoIcon,
  DashboardIcon,
  TasksIcon,
  ExamsIcon,
  SyllabusIcon,
  QuizIcon,
  ProgressIcon,
  GraduationCapIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon
} from '../components/Icons';

export default function Home({ onNavigate, onOpenExhibitionGuide }) {
  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '48px 36px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25)',
          marginBottom: '40px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(15, 23, 42, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '12.5px',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            <SparklesIcon className="w-4 h-4" />
            Science & Arts Exhibition Prototype • Matric & O-Level Edition
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
            Study<span style={{ color: '#38bdf8' }}>OS</span>
          </h1>

          <p style={{ fontSize: '20px', fontWeight: 600, color: '#93c5fd', margin: '0 0 16px' }}>
            “Your studies. One clear plan.”
          </p>

          <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 28px' }}>
            Students in Pakistan often manage homework, board examination dates, syllabus coverage, and practice questions across scattered notebooks and chat groups. <strong>StudyOS</strong> brings everything into one student-friendly command center that turns deadlines and quiz mistakes into a clear study roadmap.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('dashboard')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                transition: 'transform 0.15s ease'
              }}
            >
              Open Dashboard
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenExhibitionGuide}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              <GraduationCapIcon className="w-4 h-4" />
              Exhibition Booth Script
            </button>
          </div>
        </div>
      </div>

      {/* Demonstration Metrics Banner (Clearly labeled as sample demonstration data) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px 24px',
          marginBottom: '36px',
          boxShadow: '0 2px 4px rgba(15, 23, 42, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Live Demonstration Statistics (Fictional Sample Profile)
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#1e40af' }}>
            Sample Data Verified
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>6 Subjects</div>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>Matric & O-Level Curriculums</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563eb' }}>15 MCQs</div>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>Original Diagnostic Bank</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>100% Offline</div>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>Zero Cloud Lag at Booth</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#7c3aed' }}>Rule Engine</div>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>Transparent Recommendations</div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
        Built for Real Student Workflows
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {/* Feature 1 */}
        <div
          onClick={() => onNavigate('tasks')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="studyos-feature-card"
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <TasksIcon className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            Homework & Assignment Manager
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Never miss a submission. Filter assignments by subject and status, flag urgent work, and detect overdue tasks automatically.
          </p>
        </div>

        {/* Feature 2 */}
        <div
          onClick={() => onNavigate('exams')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="studyos-feature-card"
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <ExamsIcon className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            Examination Planner & Countdown
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Visual timetable for FBISE / BISE and Cambridge CAIE papers. Calculates exact days remaining and handles past exams gracefully.
          </p>
        </div>

        {/* Feature 3 */}
        <div
          onClick={() => onNavigate('syllabus')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="studyos-feature-card"
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <SyllabusIcon className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            Honest Syllabus Tracker
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Every percentage is calculated from actual chapter status. Mark topics complete or in-progress without fake hard-coded progress bars.
          </p>
        </div>

        {/* Feature 4 */}
        <div
          onClick={() => onNavigate('quiz')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="studyos-feature-card"
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <QuizIcon className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            Diagnostic Practice Quiz
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            15 curriculum-aligned MCQs across Math, Physics, Chemistry, Biology, and English. Immediate scoring and pedagogical explanations.
          </p>
        </div>

        {/* Feature 5 */}
        <div
          onClick={() => onNavigate('progress')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="studyos-feature-card"
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <ProgressIcon className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            Smart Rule-Based Revision
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Identifies the exact questions you got wrong, pairs them with impending exams, and generates an honest revision queue with reasons shown.
          </p>
        </div>

        {/* Feature 6: Lesson Studio & Topic Search */}
        <div
          onClick={() => onNavigate('lessons')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          className="studyos-feature-card"
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <SparklesIcon className="w-5 h-5" />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
            Lesson Studio & Topic Search
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
            Instant search across 28 syllabus chapters. Generate structured revision notes complete with formulas, step-by-step numericals, and board exam traps.
          </p>
        </div>
      </div>
    </div>
  );
}
