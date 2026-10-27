import React from 'react';
import {
  LogoIcon,
  HomeIcon,
  DashboardIcon,
  TasksIcon,
  ExamsIcon,
  SyllabusIcon,
  QuizIcon,
  ProgressIcon,
  SparklesIcon,
  GraduationCapIcon,
  XIcon
} from './Icons';

export default function Sidebar({
  activePage,
  onNavigate,
  tasks = [],
  exams = [],
  isOpenMobile = false,
  onCloseMobile,
  onOpenExhibitionGuide
}) {
  const pendingTasksCount = tasks.filter(t => !t.completed).length;
  const upcomingExamsCount = exams.length;

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'tasks', label: 'Homework Tasks', icon: TasksIcon, badge: pendingTasksCount > 0 ? pendingTasksCount : null, badgeColor: 'blue' },
    { id: 'exams', label: 'Exam Timetable', icon: ExamsIcon, badge: upcomingExamsCount > 0 ? upcomingExamsCount : null, badgeColor: 'amber' },
    { id: 'syllabus', label: 'Syllabus Tracker', icon: SyllabusIcon },
    { id: 'lessons', label: 'Lesson Studio & Search', icon: SparklesIcon, badge: 'AI', badgeColor: 'blue' },
    { id: 'pastpapers', label: 'Past Papers & Mocks', icon: GraduationCapIcon, badge: 'Vault', badgeColor: 'emerald' },
    { id: 'quiz', label: 'Diagnostic Quiz', icon: QuizIcon },
    { id: 'progress', label: 'Smart Revision', icon: ProgressIcon, badge: 'Rules', badgeColor: 'violet' },
    { id: 'home', label: 'Home Page', icon: HomeIcon }
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 40,
            display: 'block'
          }}
          className="studyos-mobile-backdrop"
        />
      )}

      <aside
        style={{
          width: '260px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 50,
          borderRight: '1px solid #1e293b',
          transition: 'transform 0.3s ease'
        }}
        className={`studyos-sidebar ${isOpenMobile ? 'studyos-sidebar-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              <LogoIcon className="w-5 h-5" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Study<span style={{ color: '#38bdf8' }}>OS</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.01em' }}>
                Your studies. One clear plan.
              </div>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onCloseMobile}
            className="studyos-mobile-close-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px',
              display: 'none'
            }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 10px 8px' }}>
            Main Menu
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map(item => {
              const isActive = activePage === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#ffffff' : '#94a3b8',
                    backgroundColor: isActive ? '#2563eb' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                  className={`studyos-nav-link ${isActive ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '999px',
                        backgroundColor: isActive
                          ? 'rgba(255, 255, 255, 0.22)'
                          : item.badgeColor === 'amber'
                          ? '#78350f'
                          : item.badgeColor === 'violet'
                          ? '#4c1d95'
                          : item.badgeColor === 'emerald'
                          ? '#064e3b'
                          : '#1e3a8a',
                        color: isActive
                          ? '#ffffff'
                          : item.badgeColor === 'amber'
                          ? '#fef3c7'
                          : item.badgeColor === 'violet'
                          ? '#ddd6fe'
                          : item.badgeColor === 'emerald'
                          ? '#a7f3d0'
                          : '#bfdbfe'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Exhibition Guide Trigger Banner */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid #1e293b' }}>
          <button
            onClick={onOpenExhibitionGuide}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s ease'
            }}
          >
            <GraduationCapIcon className="w-4 h-4" />
            <div>
              <div style={{ color: '#f8fafc' }}>Exhibition Booth Guide</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>5-Min Script & Talking Points</div>
            </div>
          </button>
        </div>

        {/* Student Profile Card */}
        <div
          style={{
            padding: '14px 16px',
            borderTop: '1px solid #1e293b',
            backgroundColor: '#090d16',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1e40af',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            SK
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Shayan Khan
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Matric & O-Level Demo
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
