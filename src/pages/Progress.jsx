import React from 'react';
import {
  ProgressIcon,
  SparklesIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  TasksIcon,
  ExamsIcon,
  SyllabusIcon,
  QuizIcon,
  InfoIcon,
  ArrowRightIcon
} from '../components/Icons';
import {
  calculateSyllabusStats,
  getWeakTopicsFromQuiz,
  generateRecommendations
} from '../utils/recommendations';
import { formatDate } from '../utils/dateUtils';

export default function Progress({
  tasks = [],
  exams = [],
  syllabus = [],
  quizHistory = [],
  onNavigate,
  onOpenLesson
}) {
  const syllabusStats = calculateSyllabusStats(syllabus);
  const weakTopics = getWeakTopicsFromQuiz(quizHistory);
  const recommendations = generateRecommendations({
    tasks,
    exams,
    syllabus,
    quizHistory
  });

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Progress & Smart Revision Recommendations
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>
          Deterministic decision engine combining quiz performance, examination deadlines, and syllabus gaps.
        </p>
      </div>

      {/* Transparent Logic Banner */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          padding: '14px 18px',
          border: '1px solid #bfdbfe',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}
      >
        <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0" style={{ marginTop: '2px' }} />
        <div style={{ fontSize: '13px', color: '#1e3a8a', lineHeight: 1.5 }}>
          <strong>Transparent Rule-Based Recommendation Engine:</strong> StudyOS does not pretend to use opaque artificial intelligence. Instead, it applies explicit educational rules:
          <span style={{ display: 'block', marginTop: '4px', fontSize: '12px', color: '#1e40af' }}>
            1. Scans quiz history for missed concepts → 2. Cross-references upcoming board exam dates with uncompleted chapters → 3. Alerts on overdue homework.
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Homework Completion</span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            {taskCompletionRate}%
          </div>
          <span style={{ fontSize: '12.5px', color: '#64748b' }}>
            {completedTasksCount} of {tasks.length} tasks completed
          </span>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Syllabus Mastered</span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>
            {syllabusStats.percentage}%
          </div>
          <span style={{ fontSize: '12.5px', color: '#64748b' }}>
            {syllabusStats.completedTopics} of {syllabusStats.totalTopics} topics verified
          </span>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Quiz Attempts Logged</span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {quizHistory.length}
          </div>
          <span style={{ fontSize: '12.5px', color: '#64748b' }}>
            Saved locally in browser
          </span>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Identified Concept Gaps</span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: weakTopics.length > 0 ? '#e11d48' : '#059669', marginTop: '4px' }}>
            {weakTopics.length}
          </div>
          <span style={{ fontSize: '12.5px', color: '#64748b' }}>
            Topics needing revision
          </span>
        </div>
      </div>

      {/* Main Section: Generated Recommendations */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Prioritized Revision & Study Plan ({recommendations.length} Active Rules)
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                Sorted by urgency (Overdue homework → Board exams &lt; 5 days → Quiz errors → Subject balance)
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="no-print"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🖨️ Print Study Plan
          </button>
        </div>

        {recommendations.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', color: '#64748b' }}>
            No pending revision items found. Take a diagnostic quiz or add homework assignments to populate your study queue.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recommendations.map(rec => (
              <div
                key={rec.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: rec.badgeColor === 'rose' ? '#ffe4e6' : rec.badgeColor === 'amber' ? '#fef3c7' : rec.badgeColor === 'violet' ? '#f3e8ff' : '#dbeafe',
                        color: rec.badgeColor === 'rose' ? '#be123c' : rec.badgeColor === 'amber' ? '#92400e' : rec.badgeColor === 'violet' ? '#6b21a8' : '#1e40af'
                      }}
                    >
                      {rec.badge}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                      {rec.subject}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      • Priority: {rec.priorityLevel}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                    {rec.title}
                  </h4>

                  <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 8px' }}>
                    <strong>Action:</strong> {rec.action}
                  </p>

                  <div style={{ fontSize: '12px', color: '#64748b', backgroundColor: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: '1px dashed #e2e8f0' }}>
                    <strong>Why this recommendation appeared:</strong> {rec.reason}
                  </div>
                </div>

                <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {onOpenLesson && (
                    <button
                      onClick={() => onOpenLesson(rec.subject + ' ' + rec.title)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#f5f3ff',
                        color: '#7c3aed',
                        border: '1px solid #ddd6fe',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      📖 Study Lesson
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate(rec.linkTab)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1px solid #bfdbfe',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Open {rec.linkTab.toUpperCase()}
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two Column Layout: Weak Concepts Table & Past Quiz History */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Weak Topics Table */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertCircleIcon className="w-5 h-5 text-rose-500" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Concepts Answered Incorrectly
            </h3>
          </div>

          <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 14px' }}>
            Automatically tracked from all recorded diagnostic quiz attempts:
          </p>

          {weakTopics.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              No quiz mistakes recorded yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {weakTopics.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#fff1f2',
                    border: '1px solid #fecdd3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#be123c', textTransform: 'uppercase' }}>
                      {item.subject}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      {item.topic}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#ffe4e6', color: '#9f1239' }}>
                      {item.mistakeCount} error{item.mistakeCount > 1 ? 's' : ''}
                    </span>
                    {onOpenLesson && (
                      <button
                        onClick={() => onOpenLesson(item.topic)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #fecdd3',
                          color: '#be123c',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        📖 Lesson
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quiz Attempts History */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <QuizIcon className="w-5 h-5 text-blue-600" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Diagnostic Quiz History
              </h3>
            </div>
            <button
              onClick={() => onNavigate('quiz')}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#2563eb',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Take Quiz +
            </button>
          </div>

          <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 14px' }}>
            Recent recorded attempts saved in localStorage:
          </p>

          {quizHistory.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              No quiz attempts logged yet. Complete a diagnostic test to see your history.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quizHistory.map(attempt => (
                <div
                  key={attempt.id}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      Diagnostic Attempt
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      Date: {formatDate(attempt.date)}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: attempt.percentage >= 70 ? '#059669' : '#d97706' }}>
                      {attempt.score} / {attempt.total} ({attempt.percentage}%)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {attempt.incorrectTopicList ? `${attempt.incorrectTopicList.length} weak areas` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
