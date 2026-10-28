import React, { useState, useEffect } from 'react';
import { SearchIcon, XIcon, SparklesIcon, ClockIcon, GraduationCapIcon } from './Icons';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigate,
  onOpenZenFocus
}) {
  const [query, setQuery] = useState('');

  const COMMANDS = [
    { id: 'focus', title: 'Start 25m Zen Focus Session', category: 'Study Tool', action: () => { onClose(); onOpenZenFocus(); } },
    { id: 'pastpapers', title: 'Open Past Papers Vault (2021-2024)', category: 'Board Practice', action: () => { onClose(); onNavigate('pastpapers'); } },
    { id: 'mock', title: 'Generate Authentic Board Mock Exam', category: 'Board Practice', action: () => { onClose(); onNavigate('pastpapers'); } },
    { id: 'quiz', title: 'Launch Active Recall Diagnostic Quiz', category: 'Self-Testing', action: () => { onClose(); onNavigate('quiz'); } },
    { id: 'lessons', title: 'Browse Revision Studio & Formulas', category: 'Study Notes', action: () => { onClose(); onNavigate('lessons'); } },
    { id: 'tasks', title: 'View My Daily Study Tasks & Goals', category: 'Planning', action: () => { onClose(); onNavigate('tasks'); } },
    { id: 'exams', title: 'Check Examination Countdowns', category: 'Planning', action: () => { onClose(); onNavigate('exams'); } },
    { id: 'syllabus', title: 'Track Syllabus Mastery (28 Topics)', category: 'Curriculum', action: () => { onClose(); onNavigate('syllabus'); } },
    { id: 'progress', title: 'Check Study Intelligence & Weak Topics', category: 'Analytics', action: () => { onClose(); onNavigate('progress'); } },
    
    // Quick subject jumps
    { id: 'math', title: 'Mathematics: Quadratic Equations & Matrices', category: 'Subject Jump', action: () => { onClose(); onNavigate('lessons'); } },
    { id: 'phy', title: 'Physics: Kinematics & Electricity Formulas', category: 'Subject Jump', action: () => { onClose(); onNavigate('lessons'); } },
    { id: 'chem', title: 'Chemistry: Stoichiometry & Mole Calculations', category: 'Subject Jump', action: () => { onClose(); onNavigate('lessons'); } },
    { id: 'bio', title: 'Biology: Cell Biology & Gas Exchange', category: 'Subject Jump', action: () => { onClose(); onNavigate('lessons'); } },
    { id: 'cs', title: 'Computer Science: Number Systems & Logic', category: 'Subject Jump', action: () => { onClose(); onNavigate('lessons'); } }
  ];

  useEffect(() => {
    setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCommands = COMMANDS.filter(cmd =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingLeft: '16px',
        paddingRight: '16px',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #e2e8f0' }}>
          <SearchIcon className="w-5 h-5 text-blue-600 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, subjects, formulas, or past papers..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: '#0f172a',
              backgroundColor: 'transparent'
            }}
          />
          <kbd style={{ fontSize: '11px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
              No commands found for "{query}". Try "physics", "focus", or "past papers".
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <div
                key={cmd.id}
                onClick={cmd.action}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  color: '#1e293b',
                  transition: 'background-color 0.1s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px' }}>⚡</span>
                  <span style={{ fontWeight: 500 }}>{cmd.title}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', backgroundColor: '#f8fafc', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  {cmd.category}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '10px 16px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
          <span>Navigation Quick Launcher</span>
          <span>Press <strong>ESC</strong> to exit</span>
        </div>
      </div>
    </div>
  );
}
