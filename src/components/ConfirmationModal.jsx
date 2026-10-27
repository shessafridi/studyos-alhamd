import React from 'react';
import { AlertCircleIcon, XIcon } from './Icons';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

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
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '440px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px'
          }}
          aria-label="Close"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: isDanger ? '#ffe4e6' : '#eff6ff',
              color: isDanger ? '#e11d48' : '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <AlertCircleIcon className="w-6 h-6" />
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              {title}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
              {message}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={onCancel}
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
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: isDanger ? '#e11d48' : '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: isDanger
                    ? '0 1px 2px rgba(225, 29, 72, 0.3)'
                    : '0 1px 2px rgba(37, 99, 235, 0.3)'
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
