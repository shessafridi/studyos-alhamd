import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import FocusTimer from '../components/FocusTimer';
import {
  TasksIcon,
  ExamsIcon,
  SyllabusIcon,
  QuizIcon,
  ProgressIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  GraduationCapIcon
} from '../components/Icons';
import { calculateSyllabusStats, generateRecommendations } from '../utils/recommendations';
import { getCountdownBadge, getDaysRemaining } from '../utils/dateUtils';

export default function Dashboard({
  profile,
  tasks = [],
  exams = [],
  syllabus = [],
  quizHistory = [],
  onNavigate,
  onToggleTask,
  onOpenProfile,
  onOpenLesson,
  onOpenZenFocus,
  onNotify
}) {
  const [focusedTopic, setFocusedTopic] = useState(null);

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const overdueTasks = tasks.filter(t => !t.completed && getDaysRemaining(t.dueDate) < 0);

  const upcomingExams = exams
    .map(e => ({ ...e, daysRemaining: getDaysRemaining(e.date) }))
    .filter(e => e.daysRemaining >= 0)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const nearestExam = upcomingExams[0];

  const syllabusStats = calculateSyllabusStats(syllabus);

  // Recommendations
  const studyQueue = generateRecommendations({
    tasks,
    exams,
    syllabus,
    quizHistory
  }).slice(0, 4);

  const handleStartSprintOnQueueItem = (item) => {
    setFocusedTopic(`${item.subject}: ${item.title}`);
    if (onNotify) onNotify(`Focus timer loaded with "${item.subject}: ${item.title}"`);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '24px 28px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="/alhamdia-logo.png"
            alt="Alhamdia Logo"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              padding: '2px',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.4)',
              flexShrink: 0
            }}
          />
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#fef08a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d4af37' }} />
              Alhamdia International School & College • {profile.rollNo || 'ALH-1042'}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#f8fafc' }}>
              Welcome back, {profile.name}! 👋
            </h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>
              {profile.grade} • {profile.targetGoal}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {onOpenZenFocus && (
            <button
              onClick={onOpenZenFocus}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
              }}
            >
              <span>🧘</span>
              Enter Zen Focus Room
            </button>
          )}

          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                fontSize: '13px',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <GraduationCapIcon className="w-4 h-4" />
              Edit Profile / Track
            </button>
          )}

          <button
            onClick={() => onNavigate('lessons')}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid #334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <SparklesIcon className="w-4 h-4" />
            Search Topics & Q&A
          </button>

          <button
            onClick={() => onNavigate('pastpapers')}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              backgroundColor: '#064e3b',
              color: '#6ee7b7',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid #047857',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <GraduationCapIcon className="w-4 h-4" />
            Past Papers (2021-2024)
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            style={{
              padding: '9px 16px',
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <QuizIcon className="w-4 h-4" />
            Take Diagnostic Quiz
          </button>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          subtitle={overdueTasks.length > 0 ? `${overdueTasks.length} assignment overdue` : 'On track with deadlines'}
          variant={overdueTasks.length > 0 ? 'rose' : 'blue'}
          icon={TasksIcon}
          badgeText={overdueTasks.length > 0 ? 'Urgent' : 'Active'}
          onClick={() => onNavigate('tasks')}
        />

        <StatCard
          title="Completed Tasks"
          value={completedTasks.length}
          subtitle={`Total assignments: ${tasks.length}`}
          variant="emerald"
          icon={CheckCircle2Icon}
          badgeText={tasks.length > 0 ? `${Math.round((completedTasks.length / tasks.length) * 100)}% done` : '0%'}
          onClick={() => onNavigate('tasks')}
        />

        <StatCard
          title="Nearest Exam"
          value={nearestExam ? getCountdownBadge(nearestExam.date).text : 'None'}
          subtitle={nearestExam ? `${nearestExam.subject} (${nearestExam.paperName})` : 'No upcoming exams'}
          variant="amber"
          icon={ExamsIcon}
          badgeText={nearestExam ? nearestExam.board.split('/')[0].trim() : ''}
          onClick={() => onNavigate('exams')}
        />

        <StatCard
          title="Syllabus Progress"
          value={`${syllabusStats.percentage}%`}
          subtitle={`${syllabusStats.completedTopics} of ${syllabusStats.totalTopics} topics mastered`}
          variant="violet"
          icon={SyllabusIcon}
          badgeText="Verified"
          onClick={() => onNavigate('syllabus')}
        />
      </div>

      {/* Focus Timer Sprint Widget */}
      <div style={{ marginBottom: '24px' }}>
        <FocusTimer
          activeTopic={focusedTopic}
          onClearTopic={() => setFocusedTopic(null)}
          onCompleteSession={(mins) => {
            if (onNotify) onNotify(`Completed a ${mins}-minute focused study block!`);
          }}
        />
      </div>

      {/* Two Column Layout: Smart Study Queue & Upcoming Exams */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Smart Study Queue */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SparklesIcon className="w-4 h-4" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Today's Suggested Study Tasks
              </h3>
            </div>
            <button
              onClick={() => onNavigate('progress')}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#2563eb',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              See All Rules <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 16px' }}>
            Generated deterministically by pairing your quiz mistakes, impending exam dates, and incomplete syllabus chapters:
          </p>

          {studyQueue.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
              All caught up! No urgent revision tasks detected.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {studyQueue.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.15s ease'
                  }}
                  className="studyos-queue-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: item.badgeColor === 'rose' ? '#ffe4e6' : item.badgeColor === 'amber' ? '#fef3c7' : item.badgeColor === 'violet' ? '#f3e8ff' : '#dbeafe',
                        color: item.badgeColor === 'rose' ? '#be123c' : item.badgeColor === 'amber' ? '#92400e' : item.badgeColor === 'violet' ? '#6b21a8' : '#1e40af'
                      }}
                    >
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                      {item.subject}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    {item.title}
                  </div>

                  <div style={{ fontSize: '12.5px', color: '#475569', marginBottom: '8px' }}>
                    {item.action}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#64748b', fontStyle: 'italic', borderTop: '1px dashed #e2e8f0', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span>💡 {item.reason}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {onOpenLesson && (
                        <button
                          onClick={() => onOpenLesson(item.subject + ' ' + item.title)}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#f5f3ff',
                            color: '#7c3aed',
                            border: '1px solid #ddd6fe',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          📖 Lesson
                        </button>
                      )}
                      <button
                        onClick={() => handleStartSprintOnQueueItem(item)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#eff6ff',
                          color: '#1d4ed8',
                          border: '1px solid #bfdbfe',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        ⚡ Focus Sprint
                      </button>
                      <button
                        onClick={() => onNavigate(item.linkTab)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          color: '#475569',
                          border: '1px solid #cbd5e1',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Examination Timetable Glance */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ExamsIcon className="w-4 h-4" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Upcoming Examinations
              </h3>
            </div>
            <button
              onClick={() => onNavigate('exams')}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#2563eb',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Full Schedule <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {upcomingExams.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
              No exams scheduled in timetable.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingExams.slice(0, 4).map(exam => {
                const badge = getCountdownBadge(exam.date);
                return (
                  <div
                    key={exam.id}
                    onClick={() => onNavigate('exams')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          {exam.subject}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          • {exam.board}
                        </span>
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                        {exam.paperName}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
                        🕒 {exam.time}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          display: 'inline-block',
                          backgroundColor: badge.color === 'critical' ? '#fee2e2' : badge.color === 'warning' ? '#fef3c7' : '#eff6ff',
                          color: badge.color === 'critical' ? '#991b1b' : badge.color === 'warning' ? '#92400e' : '#1e40af'
                        }}
                      >
                        {badge.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Syllabus Progress Overview */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Syllabus Completion Glance
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>
              Percentages reflect actual chapter checkboxes ({syllabusStats.completedTopics} of {syllabusStats.totalTopics} completed)
            </p>
          </div>
          <button
            onClick={() => onNavigate('syllabus')}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#2563eb',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Manage Topics <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {syllabusStats.bySubject.map(sub => (
            <div
              key={sub.subject}
              onClick={() => onNavigate('syllabus')}
              style={{
                padding: '14px',
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                  {sub.subject}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>
                  {sub.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '7px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', marginBottom: '6px' }}>
                <div
                  style={{
                    width: `${sub.percentage}%`,
                    height: '100%',
                    backgroundColor: sub.percentage >= 70 ? '#10b981' : sub.percentage >= 40 ? '#2563eb' : '#f59e0b',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                <span>{sub.completed} of {sub.total} topics</span>
                <span>{sub.inProgress} in progress</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
