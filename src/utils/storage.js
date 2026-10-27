// LocalStorage data management service for StudyOS
// Handles persistence, demo seeding, export/import, and reset operations with memory fallback

import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_TASKS,
  INITIAL_EXAMS,
  INITIAL_SYLLABUS,
  INITIAL_QUIZ_HISTORY
} from '../data/demoData.js';

const KEYS = {
  PROFILE: 'studyos_profile_v1',
  TASKS: 'studyos_tasks_v1',
  EXAMS: 'studyos_exams_v1',
  SYLLABUS: 'studyos_syllabus_v1',
  QUIZ_HISTORY: 'studyos_quiz_history_v1',
  TRACK: 'studyos_track_v1',
  INITIALIZED: 'studyos_initialized_v1'
};

const EVENT_NAME = 'studyos_data_updated';

// In-memory fallback in case of strict browser privacy settings
const memoryStorage = {};

function safeGet(key, defaultVal) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      return val !== null ? val : defaultVal;
    }
  } catch {
    // Fallback to memory
  }
  return key in memoryStorage ? memoryStorage[key] : defaultVal;
}

function safeSet(key, val) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, val);
      return;
    }
  } catch {
    // Fallback to memory
  }
  memoryStorage[key] = val;
}

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

/**
 * Initializes storage with sample demonstration dataset if not yet seeded
 */
export function initStorage() {
  if (typeof window === 'undefined') return;

  const isInit = safeGet(KEYS.INITIALIZED, null);
  if (!isInit) {
    resetDemoData();
  }
}

export function subscribeToDataChanges(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

// --- PROFILE ---
export function getProfile() {
  try {
    const raw = safeGet(KEYS.PROFILE, null);
    return raw ? JSON.parse(raw) : INITIAL_STUDENT_PROFILE;
  } catch {
    return INITIAL_STUDENT_PROFILE;
  }
}

export function saveProfile(profile) {
  safeSet(KEYS.PROFILE, JSON.stringify(profile));
  notifyChange();
}

// --- CURRICULUM TRACK ---
export function getCurriculumTrack() {
  return safeGet(KEYS.TRACK, 'all'); // 'all' | 'matric' | 'olevel'
}

export function setCurriculumTrack(track) {
  safeSet(KEYS.TRACK, track);
  notifyChange();
}

// --- TASKS ---
export function getTasks() {
  try {
    const raw = safeGet(KEYS.TASKS, null);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  safeSet(KEYS.TASKS, JSON.stringify(tasks));
  notifyChange();
}

export function addTask(taskData) {
  const current = getTasks();
  const newTask = {
    ...taskData,
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    completed: false
  };
  const updated = [newTask, ...current];
  saveTasks(updated);
  return newTask;
}

export function updateTask(updatedTask) {
  const current = getTasks();
  const updated = current.map(t => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(updated);
}

export function toggleTask(taskId) {
  const current = getTasks();
  const updated = current.map(t =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );
  saveTasks(updated);
}

export function deleteTask(taskId) {
  const current = getTasks();
  const updated = current.filter(t => t.id !== taskId);
  saveTasks(updated);
}

// --- EXAMINATIONS ---
export function getExams() {
  try {
    const raw = safeGet(KEYS.EXAMS, null);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveExams(exams) {
  safeSet(KEYS.EXAMS, JSON.stringify(exams));
  notifyChange();
}

export function addExam(examData) {
  const current = getExams();
  const newExam = {
    ...examData,
    id: `exam-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
  };
  const updated = [...current, newExam].sort((a, b) => new Date(a.date) - new Date(b.date));
  saveExams(updated);
  return newExam;
}

export function updateExam(updatedExam) {
  const current = getExams();
  const updated = current
    .map(e => (e.id === updatedExam.id ? updatedExam : e))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  saveExams(updated);
}

export function deleteExam(examId) {
  const current = getExams();
  const updated = current.filter(e => e.id !== examId);
  saveExams(updated);
}

// --- SYLLABUS ---
export function getSyllabus() {
  try {
    const raw = safeGet(KEYS.SYLLABUS, null);
    return raw ? JSON.parse(raw) : INITIAL_SYLLABUS;
  } catch {
    return INITIAL_SYLLABUS;
  }
}

export function saveSyllabus(syllabus) {
  safeSet(KEYS.SYLLABUS, JSON.stringify(syllabus));
  notifyChange();
}

export function updateTopicStatus(subjectName, topicId, newStatus) {
  const current = getSyllabus();
  const updated = current.map(sub => {
    if (sub.subject === subjectName) {
      return {
        ...sub,
        topics: sub.topics.map(t => (t.id === topicId ? { ...t, status: newStatus } : t))
      };
    }
    return sub;
  });
  saveSyllabus(updated);
}

// --- QUIZ HISTORY ---
export function getQuizHistory() {
  try {
    const raw = safeGet(KEYS.QUIZ_HISTORY, null);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuizAttempt(attemptRecord) {
  const current = getQuizHistory();
  const newRecord = {
    ...attemptRecord,
    id: `attempt-${Date.now()}`
  };
  const updated = [newRecord, ...current];
  safeSet(KEYS.QUIZ_HISTORY, JSON.stringify(updated));
  notifyChange();
  return newRecord;
}

// --- BACKUP & EXPORT/IMPORT ---

/**
 * Exports complete application database as structured JSON
 */
export function exportAllData() {
  const data = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    profile: getProfile(),
    tasks: getTasks(),
    exams: getExams(),
    syllabus: getSyllabus(),
    quizHistory: getQuizHistory(),
    track: getCurriculumTrack()
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Imports and validates an external JSON backup
 */
export function importAllData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') return false;

    if (parsed.profile) safeSet(KEYS.PROFILE, JSON.stringify(parsed.profile));
    if (parsed.tasks && Array.isArray(parsed.tasks)) safeSet(KEYS.TASKS, JSON.stringify(parsed.tasks));
    if (parsed.exams && Array.isArray(parsed.exams)) safeSet(KEYS.EXAMS, JSON.stringify(parsed.exams));
    if (parsed.syllabus && Array.isArray(parsed.syllabus)) safeSet(KEYS.SYLLABUS, JSON.stringify(parsed.syllabus));
    if (parsed.quizHistory && Array.isArray(parsed.quizHistory)) safeSet(KEYS.QUIZ_HISTORY, JSON.stringify(parsed.quizHistory));
    if (parsed.track) safeSet(KEYS.TRACK, parsed.track);

    safeSet(KEYS.INITIALIZED, 'true');
    notifyChange();
    return true;
  } catch {
    return false;
  }
}

// --- RESET & CLEAR CONTROLS ---

export function resetDemoData() {
  safeSet(KEYS.PROFILE, JSON.stringify(INITIAL_STUDENT_PROFILE));
  safeSet(KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  safeSet(KEYS.EXAMS, JSON.stringify(INITIAL_EXAMS));
  safeSet(KEYS.SYLLABUS, JSON.stringify(INITIAL_SYLLABUS));
  safeSet(KEYS.QUIZ_HISTORY, JSON.stringify(INITIAL_QUIZ_HISTORY));
  safeSet(KEYS.TRACK, 'all');
  safeSet(KEYS.INITIALIZED, 'true');
  notifyChange();
}

export function clearAllData() {
  safeSet(KEYS.TASKS, JSON.stringify([]));
  safeSet(KEYS.EXAMS, JSON.stringify([]));
  const resetSyllabus = INITIAL_SYLLABUS.map(s => ({
    ...s,
    topics: s.topics.map(t => ({ ...t, status: 'not-started' }))
  }));
  safeSet(KEYS.SYLLABUS, JSON.stringify(resetSyllabus));
  safeSet(KEYS.QUIZ_HISTORY, JSON.stringify([]));
  safeSet(KEYS.INITIALIZED, 'true');
  notifyChange();
}
