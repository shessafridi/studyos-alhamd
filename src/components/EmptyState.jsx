import React from 'react';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary
}) {
  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px dashed #cbd5e1',
        margin: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {Icon && (
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '420px', lineHeight: 1.5, marginBottom: '20px' }}>
        {description}
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="studyos-btn-primary"
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {actionLabel}
          </button>
        )}
        {secondaryLabel && onSecondary && (
          <button
            onClick={onSecondary}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '14px',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: '1px solid #cbd5e1',
              cursor: 'pointer'
            }}
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
