import React, { useState, useEffect } from 'react';
import { XIcon, GraduationCapIcon, CheckIcon } from './Icons';
import { exportAllData, importAllData } from '../utils/storage';

export default function ProfileModal({
  isOpen,
  profile,
  curriculumTrack,
  onSaveProfile,
  onSaveTrack,
  onClose,
  onNotify
}) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [track, setTrack] = useState('all');
  const [importJson, setImportJson] = useState('');
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setGrade(profile.grade || '');
      setSchool(profile.school || '');
      setTargetGoal(profile.targetGoal || '');
    }
    setTrack(curriculumTrack || 'all');
    setShowImport(false);
    setImportJson('');
  }, [profile, curriculumTrack, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name: name.trim() || 'Student',
      grade: grade.trim(),
      school: school.trim(),
      targetGoal: targetGoal.trim()
    });
    onSaveTrack(track);
    if (onNotify) onNotify('Student profile & curriculum preferences updated!');
    onClose();
  };

  const handleExport = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyos-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('Demo data exported successfully as JSON file!');
  };

  const handleImport = () => {
    if (!importJson.trim()) return;
    const success = importAllData(importJson);
    if (success) {
      if (onNotify) onNotify('Backup restored successfully!');
      onClose();
    } else {
      alert('Invalid JSON backup file. Please check formatting.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(3px)',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCapIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Student Profile & Curriculum
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                Personalize the exhibition demonstration in real-time.
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Student Name */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              Student / Visitor Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Shayan Khan or Judge Name"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Curriculum Track Switcher */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Curriculum Examination Focus
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'all', label: 'Dual Track (Both)' },
                { id: 'matric', label: 'Matric (FBISE/BISE)' },
                { id: 'olevel', label: 'O-Level (CAIE)' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTrack(t.id)}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: track === t.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    backgroundColor: track === t.id ? '#eff6ff' : '#ffffff',
                    color: track === t.id ? '#1d4ed8' : '#64748b',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Institution */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
              School / College
            </label>
            <input
              type="text"
              value={school}
              onChange={e => setSchool(e.target.value)}
              placeholder="Alhamdia International School & College"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Grade / Target */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Class / Grade
              </label>
              <input
                type="text"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="e.g. Grade 10 / Science"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Academic Target
              </label>
              <input
                type="text"
                value={targetGoal}
                onChange={e => setTargetGoal(e.target.value)}
                placeholder="e.g. Target: 90%+ in Finals"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Backup & Restore Controls */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                Demonstration Data Backup & Portability
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleExport}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  Export JSON
                </button>
                <button
                  type="button"
                  onClick={() => setShowImport(!showImport)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  Import JSON
                </button>
              </div>
            </div>

            {showImport && (
              <div style={{ marginTop: '8px' }}>
                <textarea
                  rows={3}
                  value={importJson}
                  onChange={e => setImportJson(e.target.value)}
                  placeholder="Paste JSON backup text here..."
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11.5px', fontFamily: 'monospace', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={handleImport}
                  style={{ marginTop: '6px', padding: '6px 14px', borderRadius: '6px', backgroundColor: '#059669', color: '#ffffff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Load & Apply Backup
                </button>
              </div>
            )}
          </div>

          {/* Save Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '9px 16px', borderRadius: '8px', fontSize: '13.5px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 20px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, backgroundColor: '#2563eb', color: '#ffffff', border: 'none', cursor: 'pointer' }}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
