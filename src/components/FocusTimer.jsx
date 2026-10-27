import React, { useState, useEffect } from 'react';
import { ClockIcon, CheckIcon, XIcon, SparklesIcon } from './Icons';

export default function FocusTimer({
  activeTopic = null,
  onClearTopic,
  onCompleteSession
}) {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setSecondsRemaining(durationMinutes * 60);
    setIsActive(false);
    setIsFinished(false);
  }, [durationMinutes, activeTopic]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(sec => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      if (onCompleteSession) onCompleteSession(durationMinutes);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining, durationMinutes, onCompleteSession]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsRemaining(durationMinutes * 60);
    setIsFinished(false);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = ((durationMinutes * 60 - secondsRemaining) / (durationMinutes * 60)) * 100;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '20px 24px',
        boxShadow: '0 2px 4px rgba(15, 23, 42, 0.04)',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: isActive ? '#eff6ff' : '#f8fafc',
              color: isActive ? '#2563eb' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ClockIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Study Focus Timer (Pomodoro)
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {activeTopic ? `Target: ${activeTopic}` : 'Target: General Chapter Revision'}
            </span>
          </div>
        </div>

        {/* Duration Selectors */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[15, 25, 45].map(mins => (
            <button
              key={mins}
              onClick={() => { setDurationMinutes(mins); }}
              disabled={isActive}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: durationMinutes === mins ? '1px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: durationMinutes === mins ? '#eff6ff' : '#ffffff',
                color: durationMinutes === mins ? '#1d4ed8' : '#64748b',
                cursor: isActive ? 'not-allowed' : 'pointer'
              }}
            >
              {mins}m
            </button>
          ))}
          {activeTopic && onClearTopic && (
            <button
              onClick={onClearTopic}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              title="Clear attached topic"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Timer Display */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '42px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '-0.03em', color: isActive ? '#2563eb' : '#0f172a' }}>
            {formattedTime}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '-4px' }}>
            {isFinished ? '🎉 Focus session finished! Great study momentum.' : isActive ? 'Active uninterrupted study sprint' : 'Ready to start revision block'}
          </div>
        </div>

        {/* Progress Bar & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleTimer}
            style={{
              padding: '10px 22px',
              borderRadius: '9px',
              fontSize: '13.5px',
              fontWeight: 700,
              backgroundColor: isActive ? '#f59e0b' : '#2563eb',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isActive ? '0 2px 6px rgba(245, 158, 11, 0.3)' : '0 2px 6px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.15s ease'
            }}
          >
            {isActive ? 'Pause' : isFinished ? 'Restart' : 'Start Focus Sprint'}
          </button>

          <button
            onClick={resetTimer}
            style={{
              padding: '9px 14px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: '#f1f5f9',
              color: '#475569',
              border: '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Mini Progress Track */}
      <div style={{ width: '100%', height: '5px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginTop: '16px' }}>
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: isActive ? '#2563eb' : isFinished ? '#10b981' : '#94a3b8',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
}
