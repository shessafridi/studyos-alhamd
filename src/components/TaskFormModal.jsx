import React, { useState, useEffect } from 'react';
import { XIcon, AlertCircleIcon } from './Icons';
import { getTodayString } from '../utils/dateUtils';

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'Urdu',
  'Islamiat',
  'Pakistan Studies'
];

export default function TaskFormModal({
  isOpen,
  initialData = null,
  onSave,
  onClose
}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [dueDate, setDueDate] = useState(getTodayString());
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSubject(initialData.subject || SUBJECT_OPTIONS[0]);
      setDueDate(initialData.dueDate || getTodayString());
      setPriority(initialData.priority || 'medium');
      setNotes(initialData.notes || '');
    } else {
      setTitle('');
      setSubject(SUBJECT_OPTIONS[0]);
      setDueDate(getTodayString());
      setPriority('medium');
      setNotes('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Assignment title is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    if (!subject) {
      newErrors.subject = 'Please select a subject.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...(initialData || {}),
      title: title.trim(),
      subject,
      dueDate,
      priority,
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
              {initialData ? 'Edit Homework Assignment' : 'Add Homework Assignment'}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Keep your homework organized and tracked with clear priorities.
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
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Assignment Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Solve Chapter 3 Numericals 1 to 5"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: `1px solid ${errors.title ? '#ef4444' : '#cbd5e1'}`,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.title && (
              <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.title}
              </span>
            )}
          </div>

          {/* Subject & Due Date Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Subject <span style={{ color: '#ef4444' }}>*</span>
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
                Due Date <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${errors.dueDate ? '#ef4444' : '#cbd5e1'}`,
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.dueDate && (
                <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircleIcon className="w-3.5 h-3.5" /> {errors.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Priority Level
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { value: 'high', label: 'High', color: '#e11d48', bg: '#ffe4e6' },
                { value: 'medium', label: 'Medium', color: '#d97706', bg: '#fef3c7' },
                { value: 'low', label: 'Low', color: '#059669', bg: '#d1fae5' }
              ].map(p => {
                const isSelected = priority === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: isSelected ? `2px solid ${p.color}` : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? p.bg : '#ffffff',
                      color: isSelected ? p.color : '#64748b',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Additional Instructions / Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Include formula steps, consult textbook page 72."
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Action Buttons */}
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
              {initialData ? 'Save Changes' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
