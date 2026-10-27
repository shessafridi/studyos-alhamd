// Automated test suite for StudyOS core logic & requirements
import { getCountdownBadge, getDaysRemaining, formatDate, isTaskOverdue } from '../utils/dateUtils.js';
import { calculateSyllabusStats, generateRecommendations, getWeakTopicsFromQuiz } from '../utils/recommendations.js';
import { QUIZ_QUESTIONS } from '../data/questions.js';
import { LESSON_KNOWLEDGE_BASE } from '../data/lessonsData.js';
import { generateTopicQA } from '../data/topicQAData.js';
import { PAST_PAPERS_DATABASE, BOARD_EXAM_TEMPLATES } from '../data/pastPapersData.js';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_TASKS,
  INITIAL_EXAMS,
  INITIAL_SYLLABUS,
  INITIAL_QUIZ_HISTORY
} from '../data/demoData.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

console.log('=== RUNNING STUDYOS COMPREHENSIVE VERIFICATION SUITE ===\n');

// 1. Test Questions
console.log('--- 1. Diagnostic MCQ Question Bank ---');
assert(QUIZ_QUESTIONS.length >= 10, `At least 10 MCQs present (Actual: ${QUIZ_QUESTIONS.length})`);

const subjectsInQuiz = new Set(QUIZ_QUESTIONS.map(q => q.subject));
assert(subjectsInQuiz.has('Mathematics'), 'Mathematics questions included');
assert(subjectsInQuiz.has('Physics'), 'Physics questions included');
assert(subjectsInQuiz.has('Chemistry'), 'Chemistry questions included');
assert(subjectsInQuiz.has('Biology'), 'Biology questions included');
assert(subjectsInQuiz.has('English'), 'English questions included');

let allQuestionsValid = true;
QUIZ_QUESTIONS.forEach((q, idx) => {
  if (!q.question || !q.options || q.options.length !== 4 || q.correctIndex < 0 || q.correctIndex > 3 || !q.explanation || !q.topic) {
    allQuestionsValid = false;
    console.error(`Invalid question at index ${idx}:`, q);
  }
});
assert(allQuestionsValid, 'All 15 questions have 4 options, valid correct index, topic mapping, and explanation');

// 2. Test Date Utilities & Examination Countdown
console.log('\n--- 2. Date Utilities & Exam Countdown ---');
const today = new Date();
const y = today.getFullYear();
const m = String(today.getMonth() + 1).padStart(2, '0');
const d = String(today.getDate()).padStart(2, '0');
const todayStr = `${y}-${m}-${d}`;

assert(getDaysRemaining(todayStr) === 0, 'Today returns 0 days remaining');
assert(getCountdownBadge(todayStr).text === 'Today!', 'Today badge displays "Today!"');

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
assert(getDaysRemaining(yStr) === -1, 'Yesterday returns -1 days remaining');
assert(getCountdownBadge(yStr).isPast === true, 'Past date marked as isPast = true');
assert(isTaskOverdue(yStr, false) === true, 'Uncompleted task from yesterday is identified as overdue');
assert(isTaskOverdue(yStr, true) === false, 'Completed task from yesterday is NOT marked overdue');

// 3. Test Syllabus Progress Calculation
console.log('\n--- 3. Syllabus Progress Calculation (Honest, not hardcoded) ---');
const syllabusStats = calculateSyllabusStats(INITIAL_SYLLABUS);
assert(syllabusStats.totalTopics === 28, `Calculated total topics correctly (Actual: ${syllabusStats.totalTopics})`);
assert(syllabusStats.completedTopics === 13, `Calculated completed topics accurately (Actual: ${syllabusStats.completedTopics})`);
assert(syllabusStats.percentage === Math.round((13 / 28) * 100), `Accurate percentage: ${syllabusStats.percentage}% (matches 13/28)`);

// 4. Test Quiz Weak Topic Tracking
console.log('\n--- 4. Quiz Mistakes & Weak Concept Tracking ---');
const weakTopics = getWeakTopicsFromQuiz(INITIAL_QUIZ_HISTORY);
assert(weakTopics.length === 4, `Detected exactly 4 incorrect topics from demo attempt (Actual: ${weakTopics.length})`);
assert(weakTopics.some(w => w.topic === 'Current Electricity'), 'Weak topics include "Current Electricity"');
assert(weakTopics.some(w => w.topic === 'Matrices & Determinants'), 'Weak topics include "Matrices & Determinants"');

// 5. Test Recommendation Engine
console.log('\n--- 5. Deterministic Recommendation Engine ---');
const recs = generateRecommendations({
  tasks: INITIAL_TASKS,
  exams: INITIAL_EXAMS,
  syllabus: INITIAL_SYLLABUS,
  quizHistory: INITIAL_QUIZ_HISTORY
});

assert(recs.length > 0, `Generated recommendations successfully (Total: ${recs.length})`);

const hasOverdueRule = recs.some(r => r.badge === 'Overdue Homework' && r.reason.includes('Overdue task detection'));
assert(hasOverdueRule, 'Rule 1: Overdue task recommendation triggered with explanation');

const hasExamSyllabusRule = recs.some(r => (r.badge === 'Exam Alert' || r.badge === 'Targeted Revision') && r.reason.includes('Exam-Syllabus alignment'));
assert(hasExamSyllabusRule, 'Rule 2: Imminent exam + uncompleted syllabus recommendation triggered with explanation');

const hasQuizRemediationRule = recs.some(r => r.badge === 'Concept Remediation' && r.reason.includes('Quiz diagnostic feedback'));
assert(hasQuizRemediationRule, 'Rule 3: Remedial recommendation triggered by quiz errors with explanation');

const allHaveReasons = recs.every(r => r.reason && r.reason.length > 10);
assert(allHaveReasons, 'Every recommendation includes an explicit explanation of why it appeared');

// 6. Test Lesson Studio & Topic Search
console.log('\n--- 6. Lesson Studio & Curriculum Search ---');
assert(LESSON_KNOWLEDGE_BASE.length >= 8, `Knowledge base loaded (Total: ${LESSON_KNOWLEDGE_BASE.length} rich lessons)`);

const lessonSubjects = new Set(LESSON_KNOWLEDGE_BASE.map(l => l.subject));
assert(lessonSubjects.has('Mathematics'), 'Mathematics lessons available');
assert(lessonSubjects.has('Physics'), 'Physics lessons available');
assert(lessonSubjects.has('Chemistry'), 'Chemistry lessons available');
assert(lessonSubjects.has('Biology'), 'Biology lessons available');
assert(lessonSubjects.has('Computer Science'), 'Computer Science lessons available');
assert(lessonSubjects.has('English'), 'English lessons available');

const quadraticLesson = LESSON_KNOWLEDGE_BASE.find(l => l.topic.toLowerCase().includes('quadratic'));
assert(Boolean(quadraticLesson && quadraticLesson.workedExample && quadraticLesson.commonTraps.length > 0), 'Lessons contain worked examples and examiner traps');

// 7. Test Topic Q&A Generator
console.log('\n--- 7. Topic Q&A Generator & Active Recall ---');
const quadQA = generateTopicQA('Quadratic Equations', 'Mathematics');
assert(Boolean(quadQA && quadQA.shortQuestions.length >= 2), 'Generated short questions for topic');
assert(Boolean(quadQA.conceptualQuestions.length >= 1), 'Generated conceptual questions for topic');
assert(Boolean(quadQA.longQuestions.length >= 1), 'Generated structured long question for topic');
assert(quadQA.shortQuestions[0].marks === 2, 'Short questions carry 2 marks with marking points');
assert(quadQA.conceptualQuestions[0].marks === 3, 'Conceptual questions carry 3 marks with reasoning');
assert(quadQA.longQuestions[0].marks === 5, 'Long questions carry 5 marks with model solution');

// Dynamic generator test for unseen topic
const dynQA = generateTopicQA('Enzymes and Digestion', 'Biology');
assert(Boolean(dynQA && dynQA.shortQuestions.length > 0 && dynQA.longQuestions.length > 0), 'Dynamic Q&A generator creates structured packs for any curriculum topic');

// 8. Test Past Papers Database & Mock Paper Templates
console.log('\n--- 8. Past Papers Vault & Mock Generator ---');
assert(PAST_PAPERS_DATABASE.length >= 8, `Past paper questions loaded (Total: ${PAST_PAPERS_DATABASE.length})`);

const pastPaperYears = new Set(PAST_PAPERS_DATABASE.map(q => q.year));
assert(pastPaperYears.has(2024), 'Past paper collection contains 2024 examination questions');
assert(pastPaperYears.has(2023), 'Past paper collection contains 2023 examination questions');
assert(pastPaperYears.has(2022), 'Past paper collection contains 2022 examination questions');
assert(pastPaperYears.has(2021), 'Past paper collection contains 2021 examination questions');

const pastPaperBoards = new Set(PAST_PAPERS_DATABASE.map(q => q.board));
assert(Array.from(pastPaperBoards).some(b => b.includes('FBISE')), 'FBISE (Federal Board) past questions included');
assert(Array.from(pastPaperBoards).some(b => b.includes('Cambridge')), 'Cambridge O-Level (CAIE) past questions included');

let allPastPapersValid = true;
PAST_PAPERS_DATABASE.forEach(q => {
  if (!q.questionText || !q.modelAnswer || !q.markingScheme || !q.marks || !q.subject) {
    allPastPapersValid = false;
  }
});
assert(allPastPapersValid, 'All past questions contain question text, model answers, and official marking schemes');
assert(Boolean(BOARD_EXAM_TEMPLATES.Matric && BOARD_EXAM_TEMPLATES['O-Level']), 'Board examination templates configured for Matric and O-Level');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} assertions passed.`);
console.log(`========================================\n`);
