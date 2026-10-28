import React, { useState, useEffect } from 'react';
import { XIcon, AlertCircleIcon } from './Icons';
import { getTodayString } from '../utils/dateUtils';

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English Language',
  'Urdu',
  'Islamiat',
  'Pakistan Studies'
];

export default function ExamFormModal({
  isOpen,
  initialData = null,
  onSave,
  onClose
}) {
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [paperName, setPaperName] = useState('');
  const [board, setBoard] = useState('FBISE / Cambridge O-Level');
  const [date, setDate] = useState(getTodayString());
  const [time, setTime] = useState('09:00 AM - 11:30 AM');
  const [hall, setHall] = useState('Main Exam Hall');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setSubject(initialData.subject || SUBJECT_OPTIONS[0]);
      setPaperName(initialData.paperName || '');
      setBoard(initialData.board || 'FBISE / Cambridge O-Level');
      setDate(initialData.date || getTodayString());
      setTime(initialData.time || '09:00 AM - 11:30 AM');
      setHall(initialData.hall || 'Main Exam Hall');
      setNotes(initialData.notes || '');
    } else {
      setSubject(SUBJECT_OPTIONS[0]);
      setPaperName('');
      setBoard('FBISE / Cambridge O-Level');
      setDate(getTodayString());
      setTime('09:00 AM - 11:30 AM');
      setHall('Main Exam Hall');
      setNotes('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!paperName.trim()) {
      newErrors.paperName = 'Paper title/type is required.';
    }
    if (!date) {
      newErrors.date = 'Exam date is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...(initialData || {}),
      subject,
      paperName: paperName.trim(),
      board: board.trim(),
      date,
      time: time.trim(),
      hall: hall.trim(),
      notes: notes.trim()
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              {initialData ? 'Edit Examination Entry' : 'Schedule Examination'}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Add upcoming board or school examination dates to activate timetable countdowns.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Subject & Board */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Subject
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box'
                }}
              >
                {SUBJECT_OPTIONS.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Board / Curriculum
              </label>
              <input
                type="text"
                value={board}
                onChange={e => setBoard(e.target.value)}
                placeholder="e.g. FBISE / CAIE O-Level"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Paper Name */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Paper Name & Code <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={paperName}
              onChange={e => setPaperName(e.target.value)}
              placeholder="e.g. Theory & Structured Questions (Paper 1)"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: `1px solid ${errors.paperName ? '#ef4444' : '#cbd5e1'}`,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            {errors.paperName && (
              <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.paperName}
              </span>
            )}
          </div>

          {/* Date & Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Exam Date <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${errors.date ? '#ef4444' : '#cbd5e1'}`,
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.date && (
                <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.date}
                </span>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Session Timing
              </label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="e.g. 09:00 AM - 11:30 AM"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Readiness / Target Status */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Revision Readiness / Target Status (Optional)
            </label>
            <input
              type="text"
              value={hall}
              onChange={e => setHall(e.target.value)}
              placeholder="e.g. Target: A* • Practice 2 more past papers"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Materials / Preparation Focus
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Bring scientific calculator and transparent pencil pouch."
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(37, 99, 235, 0.3)'
              }}
            >
              {initialData ? 'Save Changes' : 'Schedule Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
