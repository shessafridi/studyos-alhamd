import React, { useState, useEffect } from 'react';
import { ClockIcon, XIcon, CheckIcon, SparklesIcon } from './Icons';

export default function ZenFocusModal({
  isOpen,
  activeTopic = 'General Chapter Revision',
  onClose,
  onCompleteSprint
}) {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [scratchpadText, setScratchpadText] = useState(() => {
    return localStorage.getItem('studyos_zen_scratchpad') || '';
  });

  useEffect(() => {
    setSecondsRemaining(durationMinutes * 60);
    setIsActive(false);
  }, [durationMinutes, activeTopic]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(sec => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      if (onCompleteSprint) onCompleteSprint(durationMinutes);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining, durationMinutes, onCompleteSprint]);

  // Persist scratchpad
  const handleScratchpadChange = (e) => {
    const val = e.target.value;
    setScratchpadText(val);
    localStorage.setItem('studyos_zen_scratchpad', val);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = ((durationMinutes * 60 - secondsRemaining) / (durationMinutes * 60)) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🧘</span>
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#38bdf8' }}>
            Zen Study Space • Deep Work Mode
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#f8fafc',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <XIcon className="w-4 h-4" />
          Exit Focus Mode
        </button>
      </div>

      {/* Main Workspace: Timer on Left, Scratchpad on Right */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {/* LEFT CARD: Minimalist Sprint Timer */}
        <div
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '20px',
            border: '1px solid #334155',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Active Topic Banner */}
          <div
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '20px',
              maxWidth: '90%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            🎯 Focus Goal: {activeTopic}
          </div>

          {/* Big Digital Display */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '-0.03em',
              color: isActive ? '#38bdf8' : '#f8fafc',
              marginBottom: '12px',
              textShadow: isActive ? '0 0 24px rgba(56, 189, 248, 0.4)' : 'none'
            }}
          >
            {formattedTime}
          </div>

          {/* Duration Pills */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {[15, 25, 45, 60].map(mins => (
              <button
                key={mins}
                onClick={() => setDurationMinutes(mins)}
                disabled={isActive}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: durationMinutes === mins ? '1px solid #38bdf8' : '1px solid #475569',
                  backgroundColor: durationMinutes === mins ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: durationMinutes === mins ? '#38bdf8' : '#94a3b8',
                  cursor: isActive ? 'not-allowed' : 'pointer'
                }}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Timer Controls */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setIsActive(!isActive)}
              style={{
                padding: '12px 32px',
                borderRadius: '10px',
                backgroundColor: isActive ? '#f59e0b' : '#2563eb',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                minWidth: '130px'
              }}
            >
              {isActive ? 'Pause' : 'Start Focus'}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setSecondsRemaining(durationMinutes * 60);
              }}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid #475569',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>

          <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', margin: '20px 0 0' }}>
            💡 Tip: Put your phone away and work on a single topic without switching tabs.
          </p>
        </div>

        {/* RIGHT CARD: Rough Work & Scratchpad */}
        <div
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '20px',
            border: '1px solid #334155',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
              <span>📝</span>
              <span>Rough Work & Formula Scratchpad</span>
            </div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              Auto-saved locally
            </span>
          </div>

          <textarea
            value={scratchpadText}
            onChange={handleScratchpadChange}
            placeholder="Type rough calculations, formula notes, or key concepts to remember during your study session...
e.g.
• K.E = 1/2 mv²
• Quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)
• Step 1: Calculate moles = mass / molar mass"
            style={{
              flex: 1,
              width: '100%',
              minHeight: '260px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '13px',
              color: '#e2e8f0',
              fontFamily: 'JetBrains Mono, monospace',
              lineHeight: '1.6',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              {scratchpadText.length} characters written
            </span>
            <button
              onClick={() => {
                if (window.confirm('Clear your rough work scratchpad?')) {
                  setScratchpadText('');
                  localStorage.removeItem('studyos_zen_scratchpad');
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '11px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
