import React from 'react';
import {
  DashboardIcon,
  TasksIcon,
  ExamsIcon,
  QuizIcon,
  ProgressIcon
} from './Icons';

export default function MobileBottomNav({
  activePage,
  onNavigate,
  pendingTasksCount = 0,
  upcomingExamsCount = 0
}) {
  const ITEMS = [
    { id: 'dashboard', label: 'Home', icon: DashboardIcon },
    { id: 'tasks', label: 'Tasks', icon: TasksIcon, badge: pendingTasksCount > 0 ? pendingTasksCount : null },
    { id: 'exams', label: 'Exams', icon: ExamsIcon, badge: upcomingExamsCount > 0 ? upcomingExamsCount : null },
    { id: 'quiz', label: 'Quiz', icon: QuizIcon },
    { id: 'progress', label: 'Revision', icon: ProgressIcon }
  ];

  return (
    <nav
      className="studyos-mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '62px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 45,
        boxShadow: '0 -4px 12px rgba(15, 23, 42, 0.05)',
        padding: '0 8px'
      }}
    >
      {ITEMS.map(item => {
        const isActive = activePage === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              color: isActive ? '#2563eb' : '#64748b',
              cursor: 'pointer',
              flex: 1,
              height: '100%',
              position: 'relative',
              padding: '4px 0'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '999px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 500, marginTop: '2px' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
