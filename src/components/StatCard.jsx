import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'blue',
  badgeText,
  onClick
}) {
  const variantStyles = {
    blue: {
      border: 'border-blue-100',
      iconBg: 'bg-blue-50 text-blue-600',
      badge: 'bg-blue-50 text-blue-700'
    },
    emerald: {
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-50 text-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700'
    },
    amber: {
      border: 'border-amber-100',
      iconBg: 'bg-amber-50 text-amber-600',
      badge: 'bg-amber-50 text-amber-700'
    },
    rose: {
      border: 'border-rose-100',
      iconBg: 'bg-rose-50 text-rose-600',
      badge: 'bg-rose-50 text-rose-700'
    },
    violet: {
      border: 'border-purple-100',
      iconBg: 'bg-purple-50 text-purple-600',
      badge: 'bg-purple-50 text-purple-700'
    }
  }[variant] || {
    border: 'border-slate-100',
    iconBg: 'bg-slate-50 text-slate-600',
    badge: 'bg-slate-50 text-slate-700'
  };

  return (
    <div
      onClick={onClick}
      className={`studyos-stat-card ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginTop: '4px', letterSpacing: '-0.02em' }}>
            {value}
          </div>
        </div>
        {Icon && (
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: variant === 'emerald' ? '#ecfdf5' : variant === 'amber' ? '#fffbeb' : variant === 'rose' ? '#fff1f2' : variant === 'violet' ? '#f5f3ff' : '#eff6ff',
              color: variant === 'emerald' ? '#059669' : variant === 'amber' ? '#d97706' : variant === 'rose' ? '#e11d48' : variant === 'violet' ? '#7c3aed' : '#2563eb'
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '13px', color: '#64748b' }}>
          {subtitle}
        </span>
        {badgeText && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: variant === 'emerald' ? '#d1fae5' : variant === 'amber' ? '#fef3c7' : variant === 'rose' ? '#ffe4e6' : '#dbeafe',
              color: variant === 'emerald' ? '#065f46' : variant === 'amber' ? '#92400e' : variant === 'rose' ? '#9f1239' : '#1e40af'
            }}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
