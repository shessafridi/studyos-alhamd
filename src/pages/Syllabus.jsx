import React, { useState } from 'react';
import {
  SyllabusIcon,
  CheckIcon,
  ClockIcon,
  AlertCircleIcon,
  SparklesIcon
} from '../components/Icons';
import { calculateSyllabusStats } from '../utils/recommendations';

export default function Syllabus({
  syllabus = [],
  onUpdateTopicStatus,
  onOpenLesson
}) {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const stats = calculateSyllabusStats(syllabus);

  const displayedSubjects = selectedSubject === 'all'
    ? syllabus
    : syllabus.filter(s => s.subject === selectedSubject);

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Subject & Syllabus Tracker
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>
          Matric & O-Level curriculum checklists. Every progress bar is calculated in real-time from topic statuses.
        </p>
      </div>

      {/* Overview Stat Banner */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px 24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div style={{ minWidth: '220px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Overall Syllabus Completion
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>
              {stats.percentage}%
            </span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              ({stats.completedTopics} of {stats.totalTopics} topics mastered)
            </span>
          </div>

          <div style={{ width: '280px', maxWidth: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', marginTop: '8px' }}>
            <div
              style={{
                width: `${stats.percentage}%`,
                height: '100%',
                backgroundColor: '#2563eb',
                borderRadius: '999px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', padding: '10px 16px', backgroundColor: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669' }}>{stats.completedTopics}</div>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#065f46' }}>Completed</div>
          </div>

          <div style={{ textAlign: 'center', padding: '10px 16px', backgroundColor: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb' }}>{stats.inProgressTopics}</div>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#1e40af' }}>In Progress</div>
          </div>

          <div style={{ textAlign: 'center', padding: '10px 16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#64748b' }}>{stats.totalTopics - stats.completedTopics - stats.inProgressTopics}</div>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569' }}>Not Started</div>
          </div>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedSubject('all')}
          style={{
            padding: '7px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            border: selectedSubject === 'all' ? '1px solid #2563eb' : '1px solid #e2e8f0',
            backgroundColor: selectedSubject === 'all' ? '#eff6ff' : '#ffffff',
            color: selectedSubject === 'all' ? '#1d4ed8' : '#64748b',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          All Subjects ({syllabus.length})
        </button>

        {syllabus.map(sub => {
          const subTotal = sub.topics.length;
          const subDone = sub.topics.filter(t => t.status === 'completed').length;
          const pct = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

          return (
            <button
              key={sub.subject}
              onClick={() => setSelectedSubject(sub.subject)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedSubject === sub.subject ? '1px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: selectedSubject === sub.subject ? '#eff6ff' : '#ffffff',
                color: selectedSubject === sub.subject ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {sub.subject} ({pct}%)
            </button>
          );
        })}
      </div>

      {/* Subjects & Topics List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {displayedSubjects.map(sub => {
          const total = sub.topics.length;
          const completed = sub.topics.filter(t => t.status === 'completed').length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <div
              key={sub.subject}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
              }}
            >
              {/* Subject Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {sub.subject}
                    </h3>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                      {sub.code}
                    </span>
                  </div>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                    {completed} of {total} chapters mastered
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: pct >= 70 ? '#059669' : pct >= 40 ? '#2563eb' : '#d97706' }}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{ width: '120px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        backgroundColor: pct >= 70 ? '#10b981' : pct >= 40 ? '#2563eb' : '#f59e0b',
                        borderRadius: '999px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Topics Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sub.topics.map(topic => {
                  const isCompleted = topic.status === 'completed';
                  const isInProgress = topic.status === 'in-progress';

                  return (
                    <div
                      key={topic.id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        backgroundColor: isCompleted ? '#f0fdf4' : isInProgress ? '#f8fafc' : '#ffffff',
                        border: `1px solid ${isCompleted ? '#bbf7d0' : isInProgress ? '#cbd5e1' : '#e2e8f0'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748b', minWidth: '70px' }}>
                          {topic.chapter}
                        </span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: isCompleted ? '#166534' : '#0f172a' }}>
                            {topic.name}
                          </div>
                          {topic.notes && (
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              {topic.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Selector Pills & Lesson Shortcut */}
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {onOpenLesson && (
                          <button
                            type="button"
                            onClick={() => onOpenLesson(sub.subject + ' ' + topic.name)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              border: '1px solid #ddd6fe',
                              backgroundColor: '#f5f3ff',
                              color: '#7c3aed',
                              cursor: 'pointer'
                            }}
                            title="Generate structured revision lesson"
                          >
                            📖 Lesson
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onUpdateTopicStatus(sub.subject, topic.id, 'not-started')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            border: topic.status === 'not-started' ? '1px solid #94a3b8' : '1px solid #e2e8f0',
                            backgroundColor: topic.status === 'not-started' ? '#f1f5f9' : '#ffffff',
                            color: topic.status === 'not-started' ? '#334155' : '#94a3b8',
                            cursor: 'pointer'
                          }}
                        >
                          Not Started
                        </button>

                        <button
                          type="button"
                          onClick={() => onUpdateTopicStatus(sub.subject, topic.id, 'in-progress')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            border: topic.status === 'in-progress' ? '1px solid #93c5fd' : '1px solid #e2e8f0',
                            backgroundColor: topic.status === 'in-progress' ? '#eff6ff' : '#ffffff',
                            color: topic.status === 'in-progress' ? '#1d4ed8' : '#94a3b8',
                            cursor: 'pointer'
                          }}
                        >
                          In Progress
                        </button>

                        <button
                          type="button"
                          onClick={() => onUpdateTopicStatus(sub.subject, topic.id, 'completed')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            border: topic.status === 'completed' ? '1px solid #86efac' : '1px solid #e2e8f0',
                            backgroundColor: topic.status === 'completed' ? '#dcfce7' : '#ffffff',
                            color: topic.status === 'completed' ? '#15803d' : '#94a3b8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckIcon className="w-3 h-3" />
                          Mastered
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
