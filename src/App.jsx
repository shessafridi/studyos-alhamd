import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExhibitionGuideModal from './components/ExhibitionGuideModal';
import ProfileModal from './components/ProfileModal';
import MobileBottomNav from './components/MobileBottomNav';
import ZenFocusModal from './components/ZenFocusModal';
import CommandPaletteModal from './components/CommandPaletteModal';
import Toast from './components/Toast';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Exams from './pages/Exams';
import Syllabus from './pages/Syllabus';
import Lessons from './pages/Lessons';
import PastPapers from './pages/PastPapers';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';

// Storage & Utilities
import {
  initStorage,
  subscribeToDataChanges,
  getProfile,
  saveProfile,
  getCurriculumTrack,
  setCurriculumTrack,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  getExams,
  addExam,
  updateExam,
  deleteExam,
  getSyllabus,
  updateTopicStatus,
  getQuizHistory,
  saveQuizAttempt,
  resetDemoData,
  clearAllData
} from './utils/storage';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExhibitionGuideOpen, setIsExhibitionGuideOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isZenFocusOpen, setIsZenFocusOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [zenFocusTopic, setZenFocusTopic] = useState('Physics: Newton’s Laws & Numericals');
  const [targetLessonTopic, setTargetLessonTopic] = useState(null);
  const [toast, setToast] = useState(null);

  // Authentication State for Alhamdia Student Portal
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('alhamdia_student_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!currentUser;

  const handleLogin = (account) => {
    setCurrentUser(account);
    try {
      localStorage.setItem('alhamdia_student_auth', JSON.stringify(account));
    } catch {}
    saveProfile({
      name: account.name,
      rollNo: account.rollNo,
      grade: account.grade,
      school: account.school || 'Alhamdia International School & College',
      track: account.track,
      targetGoal: account.targetGoal
    });
    syncState();
    showNotification(`Welcome back, ${account.name}! Signed into Alhamdia Student Planner. 🎓`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('alhamdia_student_auth');
    } catch {}
    showNotification('Signed out of Alhamdia Student Planner.');
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // App State synced with localStorage
  const [profile, setProfile] = useState(() => getProfile());
  const [curriculumTrack, setTrack] = useState(() => getCurriculumTrack());
  const [tasks, setTasks] = useState(() => getTasks());
  const [exams, setExams] = useState(() => getExams());
  const [syllabus, setSyllabus] = useState(() => getSyllabus());
  const [quizHistory, setQuizHistory] = useState(() => getQuizHistory());

  // Reload state from storage
  const syncState = () => {
    setProfile(getProfile());
    setTrack(getCurriculumTrack());
    setTasks(getTasks());
    setExams(getExams());
    setSyllabus(getSyllabus());
    setQuizHistory(getQuizHistory());
  };

  useEffect(() => {
    // Seed initial demo data if needed
    initStorage();
    syncState();

    // Subscribe to storage changes
    const unsubscribe = subscribeToDataChanges(() => {
      syncState();
    });

    return () => unsubscribe();
  }, []);

  const showNotification = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(current => (current && current.message === message ? null : current));
    }, 3500);
  };

  // Handlers for Profile
  const handleSaveProfile = (newProfile) => {
    saveProfile(newProfile);
    syncState();
  };

  const handleSaveTrack = (newTrack) => {
    setCurriculumTrack(newTrack);
    syncState();
  };

  // Handlers for Tasks
  const handleAddTask = (taskData) => {
    addTask(taskData);
    syncState();
  };

  const handleUpdateTask = (taskData) => {
    updateTask(taskData);
    syncState();
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    syncState();
  };

  const handleToggleTask = (taskId) => {
    toggleTask(taskId);
    syncState();
  };

  // Handlers for Exams
  const handleAddExam = (examData) => {
    addExam(examData);
    syncState();
    showNotification('Examination paper added to schedule!');
  };

  const handleUpdateExam = (examData) => {
    updateExam(examData);
    syncState();
    showNotification('Examination entry updated!');
  };

  const handleDeleteExam = (examId) => {
    deleteExam(examId);
    syncState();
    showNotification('Examination paper removed.');
  };

  // Handlers for Syllabus
  const handleUpdateTopicStatus = (subjectName, topicId, newStatus) => {
    updateTopicStatus(subjectName, topicId, newStatus);
    syncState();
    showNotification(`Updated ${subjectName} topic status to ${newStatus.replace('-', ' ')}.`);
  };

  // Handlers for Quiz
  const handleSaveQuizAttempt = (attemptRecord) => {
    saveQuizAttempt(attemptRecord);
    syncState();
  };

  // Demo Reset
  const handleResetDemoData = () => {
    resetDemoData();
    syncState();
    showNotification('Demonstration dataset restored to original state!');
  };

  // Clear all for empty states testing
  const handleClearAllData = () => {
    clearAllData();
    syncState();
    showNotification('All records cleared. Displaying fresh empty states.', 'info');
  };

  const pendingTasksCount = tasks.filter(t => !t.completed).length;
  const upcomingExamsCount = exams.length;

  // If not authenticated, render Alhamdia Student Portal Login
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="studyos-app-shell">
      {/* Sidebar (Desktop sticky / Mobile drawer) */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        tasks={tasks}
        exams={exams}
        currentUser={currentUser}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenExhibitionGuide={() => setIsExhibitionGuideOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="studyos-main-wrapper">
        <Header
          activePage={activePage}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onResetData={handleResetDemoData}
          onClearData={handleClearAllData}
          onOpenExhibitionGuide={() => setIsExhibitionGuideOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenZenFocus={(topic) => { if (topic) setZenFocusTopic(topic); setIsZenFocusOpen(true); }}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onLogout={handleLogout}
        />

        <main className="studyos-main-content">
          {activePage === 'home' && (
            <Home
              onNavigate={setActivePage}
              onOpenExhibitionGuide={() => setIsExhibitionGuideOpen(true)}
            />
          )}

          {activePage === 'dashboard' && (
            <Dashboard
              profile={profile}
              tasks={tasks}
              exams={exams}
              syllabus={syllabus}
              quizHistory={quizHistory}
              onNavigate={setActivePage}
              onToggleTask={handleToggleTask}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              onOpenLesson={(topic) => { setTargetLessonTopic(topic); setActivePage('lessons'); }}
              onOpenZenFocus={(topic) => { if (topic) setZenFocusTopic(topic); setIsZenFocusOpen(true); }}
              onNotify={showNotification}
            />
          )}

          {activePage === 'tasks' && (
            <Tasks
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              onNotify={showNotification}
            />
          )}

          {activePage === 'exams' && (
            <Exams
              exams={exams}
              onAddExam={handleAddExam}
              onUpdateExam={handleUpdateExam}
              onDeleteExam={handleDeleteExam}
            />
          )}

          {activePage === 'syllabus' && (
            <Syllabus
              syllabus={syllabus}
              onUpdateTopicStatus={handleUpdateTopicStatus}
              onOpenLesson={(topic) => { setTargetLessonTopic(topic); setActivePage('lessons'); }}
            />
          )}

          {activePage === 'lessons' && (
            <Lessons
              initialTopic={targetLessonTopic}
              onNavigate={setActivePage}
              onAddTask={handleAddTask}
              onNotify={showNotification}
            />
          )}

          {activePage === 'pastpapers' && (
            <PastPapers
              onAddTask={handleAddTask}
              onNotify={showNotification}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'quiz' && (
            <Quiz
              onSaveQuizAttempt={handleSaveQuizAttempt}
              onNavigate={setActivePage}
              onOpenLesson={(topic) => { setTargetLessonTopic(topic); setActivePage('lessons'); }}
              onNotify={showNotification}
            />
          )}

          {activePage === 'progress' && (
            <Progress
              tasks={tasks}
              exams={exams}
              syllabus={syllabus}
              quizHistory={quizHistory}
              onNavigate={setActivePage}
              onOpenLesson={(topic) => { setTargetLessonTopic(topic); setActivePage('lessons'); }}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom App Navigation Bar (Tablets & Smartphones) */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={setActivePage}
        pendingTasksCount={pendingTasksCount}
        upcomingExamsCount={upcomingExamsCount}
      />

      {/* Exhibition Demonstration Guide Modal */}
      <ExhibitionGuideModal
        isOpen={isExhibitionGuideOpen}
        onClose={() => setIsExhibitionGuideOpen(false)}
      />

      {/* Student Profile & Curriculum Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        profile={profile}
        curriculumTrack={curriculumTrack}
        onSaveProfile={handleSaveProfile}
        onSaveTrack={handleSaveTrack}
        onClose={() => setIsProfileModalOpen(false)}
        onNotify={showNotification}
      />

      {/* Zen Focus Room Modal (Distraction-Free Deep Work) */}
      <ZenFocusModal
        isOpen={isZenFocusOpen}
        activeTopic={zenFocusTopic}
        onClose={() => setIsZenFocusOpen(false)}
        onCompleteSprint={(mins) => showNotification(`Completed ${mins}m Focus Sprint! Awesome work! 🎉`)}
      />

      {/* Quick Command Launcher (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActivePage}
        onOpenZenFocus={() => setIsZenFocusOpen(true)}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
