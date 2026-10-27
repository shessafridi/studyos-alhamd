import React from 'react';
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon, XIcon } from './Icons';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const config = {
    success: {
      bg: '#ecfdf5',
      border: '#a7f3d0',
      text: '#065f46',
      icon: CheckCircle2Icon,
      iconColor: '#059669'
    },
    error: {
      bg: '#fff1f2',
      border: '#fecdd3',
      text: '#9f1239',
      icon: AlertCircleIcon,
      iconColor: '#e11d48'
    },
    info: {
      bg: '#eff6ff',
      border: '#bfdbfe',
      text: '#1e40af',
      icon: InfoIcon,
      iconColor: '#2563eb'
    }
  }[type] || {
    bg: '#ffffff',
    border: '#cbd5e1',
    text: '#0f172a',
    icon: InfoIcon,
    iconColor: '#2563eb'
  };

  const Icon = config.icon;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: '12px',
        padding: '12px 18px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '420px',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: config.iconColor }} />
      <span style={{ fontSize: '13.5px', fontWeight: 600, color: config.text, flex: 1 }}>
        {message}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
