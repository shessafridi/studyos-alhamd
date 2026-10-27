import React, { useState } from 'react';
import ExamFormModal from '../components/ExamFormModal';
import ConfirmationModal from '../components/ConfirmationModal';
import EmptyState from '../components/EmptyState';
import {
  ExamsIcon,
  PlusIcon,
  ClockIcon,
  EditIcon,
  TrashIcon,
  AlertCircleIcon,
  CheckCircle2Icon
} from '../components/Icons';
import { formatDate, getDaysRemaining, getCountdownBadge } from '../utils/dateUtils';

export default function Exams({
  exams = [],
  onAddExam,
  onUpdateExam,
  onDeleteExam
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'all'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [deletingExamId, setDeletingExamId] = useState(null);

  const enrichedExams = exams.map(exam => {
    const daysRemaining = getDaysRemaining(exam.date);
    const countdown = getCountdownBadge(exam.date);
    return {
      ...exam,
      daysRemaining,
      countdown,
      isPast: daysRemaining < 0
    };
  });

  const upcomingExams = enrichedExams
    .filter(e => !e.isPast)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const pastExams = enrichedExams
    .filter(e => e.isPast)
    .sort((a, b) => b.daysRemaining - a.daysRemaining);

  const displayedExams =
    activeTab === 'upcoming'
      ? upcomingExams
      : activeTab === 'past'
      ? pastExams
      : [...upcomingExams, ...pastExams];

  const handleEditClick = (exam) => {
    setEditingExam(exam);
    setIsFormOpen(true);
  };

  const handleCreateClick = () => {
    setEditingExam(null);
    setIsFormOpen(true);
  };

  const handleSave = (examData) => {
    if (editingExam) {
      onUpdateExam(examData);
    } else {
      onAddExam(examData);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Examination Timetable & Countdown
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>
            Board exam dates for Matric (FBISE / BISE) & Cambridge CAIE O-Level session.
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '9px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontSize: '13.5px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
          }}
        >
          <PlusIcon className="w-4 h-4" />
          Schedule Exam
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { id: 'upcoming', label: `Upcoming Papers (${upcomingExams.length})` },
          { id: 'past', label: `Concluded Papers (${pastExams.length})` },
          { id: 'all', label: `All Sessions (${exams.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              border: activeTab === tab.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
              backgroundColor: activeTab === tab.id ? '#eff6ff' : '#ffffff',
              color: activeTab === tab.id ? '#1d4ed8' : '#64748b',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {displayedExams.length === 0 ? (
        <EmptyState
          icon={ExamsIcon}
          title={exams.length === 0 ? 'No Examinations Scheduled' : `No ${activeTab} examinations found`}
          description={
            exams.length === 0
              ? 'Input your upcoming board exam schedule to calculate countdown days and trigger smart study plans.'
              : 'Switch to another tab to view your full examination timetable.'
          }
          actionLabel="Schedule Exam"
          onAction={handleCreateClick}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {displayedExams.map(exam => {
            const isCritical = !exam.isPast && exam.daysRemaining <= 3;
            const isWarning = !exam.isPast && exam.daysRemaining <= 7 && exam.daysRemaining > 3;

            return (
              <div
                key={exam.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  border: `1px solid ${isCritical ? '#fca5a5' : isWarning ? '#fde68a' : '#e2e8f0'}`,
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  opacity: exam.isPast ? 0.75 : 1
                }}
              >
                <div>
                  {/* Top Bar: Subject & Countdown Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e40af', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                        {exam.board}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
                        {exam.subject}
                      </h3>
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        backgroundColor: exam.countdown.color === 'critical' ? '#fee2e2' : exam.countdown.color === 'warning' ? '#fef3c7' : exam.isPast ? '#f1f5f9' : '#dbeafe',
                        color: exam.countdown.color === 'critical' ? '#991b1b' : exam.countdown.color === 'warning' ? '#92400e' : exam.isPast ? '#64748b' : '#1e40af'
                      }}
                    >
                      {exam.countdown.text}
                    </span>
                  </div>

                  {/* Paper Name */}
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
                    {exam.paperName}
                  </div>

                  {/* Date, Time, Room Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#64748b', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ClockIcon className="w-4 h-4 text-slate-400" />
                      <span><strong>Date:</strong> {formatDate(exam.date)}</span>
                    </div>

                    {exam.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🕒 <strong>Timing:</strong> {exam.time}</span>
                      </div>
                    )}

                    {exam.hall && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📍 <strong>Center:</strong> {exam.hall}</span>
                      </div>
                    )}
                  </div>

                  {exam.notes && (
                    <div style={{ backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '14px', border: '1px solid #f1f5f9' }}>
                      📝 {exam.notes}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <button
                    onClick={() => handleEditClick(exam)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      color: '#475569',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <EditIcon className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeletingExamId(exam.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      backgroundColor: '#ffffff',
                      color: '#e11d48',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Exam Form Modal */}
      <ExamFormModal
        isOpen={isFormOpen}
        initialData={editingExam}
        onSave={handleSave}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Delete Exam Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingExamId)}
        title="Delete Examination Entry?"
        message="Are you sure you want to remove this paper from your timetable? This will also remove any related exam revision countdowns."
        confirmLabel="Delete Exam"
        isDanger={true}
        onConfirm={() => {
          if (deletingExamId) {
            onDeleteExam(deletingExamId);
            setDeletingExamId(null);
          }
        }}
        onCancel={() => setDeletingExamId(null)}
      />
    </div>
  );
}
