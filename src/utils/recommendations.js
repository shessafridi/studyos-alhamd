// Transparent Rule-Based Study & Revision Recommendation Engine
// Connects quiz mistakes, upcoming exam countdowns, syllabus progress, and task deadlines.
// Pure deterministic logic with clear educational explanations (No opaque AI).

import { getDaysRemaining } from './dateUtils.js';

/**
 * Calculates overall syllabus completion percentage
 */
export function calculateSyllabusStats(syllabus) {
  if (!syllabus || syllabus.length === 0) {
    return { totalTopics: 0, completedTopics: 0, inProgressTopics: 0, percentage: 0, bySubject: [] };
  }

  let totalTopics = 0;
  let completedTopics = 0;
  let inProgressTopics = 0;

  const bySubject = syllabus.map(sub => {
    const subTotal = sub.topics.length;
    const subCompleted = sub.topics.filter(t => t.status === 'completed').length;
    const subInProgress = sub.topics.filter(t => t.status === 'in-progress').length;
    const pct = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;

    totalTopics += subTotal;
    completedTopics += subCompleted;
    inProgressTopics += subInProgress;

    return {
      subject: sub.subject,
      code: sub.code,
      total: subTotal,
      completed: subCompleted,
      inProgress: subInProgress,
      percentage: pct,
      remainingTopics: sub.topics.filter(t => t.status !== 'completed')
    };
  });

  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    totalTopics,
    completedTopics,
    inProgressTopics,
    percentage,
    bySubject
  };
}

/**
 * Aggregates all incorrect topics recorded across quiz attempts
 */
export function getWeakTopicsFromQuiz(quizHistory) {
  if (!quizHistory || quizHistory.length === 0) return [];

  const topicCountMap = new Map();

  quizHistory.forEach(attempt => {
    if (attempt.incorrectTopicList && Array.isArray(attempt.incorrectTopicList)) {
      attempt.incorrectTopicList.forEach(item => {
        const key = `${item.subject}:::${item.topic}`;
        if (!topicCountMap.has(key)) {
          topicCountMap.set(key, {
            subject: item.subject,
            topic: item.topic,
            mistakeCount: 0,
            lastMissedDate: attempt.date
          });
        }
        const record = topicCountMap.get(key);
        record.mistakeCount += 1;
      });
    }
  });

  return Array.from(topicCountMap.values()).sort((a, b) => b.mistakeCount - a.mistakeCount);
}

/**
 * Generates prioritized study and revision recommendations
 * Each recommendation includes an explicit explanation of why it was triggered.
 */
export function generateRecommendations({ tasks = [], exams = [], syllabus = [], quizHistory = [] }) {
  const recommendations = [];

  // --- RULE 1: Overdue Homework Tasks (Immediate Urgent Action) ---
  const overdueTasks = tasks.filter(t => !t.completed && getDaysRemaining(t.dueDate) < 0);
  overdueTasks.slice(0, 2).forEach(task => {
    const daysAgo = Math.abs(getDaysRemaining(task.dueDate));
    recommendations.push({
      id: `rec-overdue-${task.id}`,
      priorityLevel: 'High',
      priorityRank: 1,
      badge: 'Overdue Homework',
      badgeColor: 'rose',
      title: `Submit Pending Task: "${task.title}"`,
      subject: task.subject,
      action: `Complete and submit this assignment.`,
      reason: `Rule: Overdue task detection. Due date passed ${daysAgo === 1 ? 'yesterday' : `${daysAgo} days ago`}. Priority is ${task.priority.toUpperCase()}.`,
      linkTab: 'tasks'
    });
  });

  // --- RULE 2: Imminent Exam + Incomplete Syllabus Topic ---
  const upcomingExams = exams
    .map(e => ({ ...e, daysLeft: getDaysRemaining(e.date) }))
    .filter(e => e.daysLeft >= 0 && e.daysLeft <= 10)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  upcomingExams.forEach(exam => {
    const subjectData = syllabus.find(s => s.subject.toLowerCase() === exam.subject.toLowerCase());
    if (subjectData) {
      const incompleteTopics = subjectData.topics.filter(t => t.status !== 'completed');
      if (incompleteTopics.length > 0) {
        const targetTopic = incompleteTopics[0];
        recommendations.push({
          id: `rec-exam-syllabus-${exam.id}-${targetTopic.id}`,
          priorityLevel: exam.daysLeft <= 4 ? 'Critical' : 'High',
          priorityRank: exam.daysLeft <= 4 ? 0 : 2,
          badge: exam.daysLeft <= 4 ? 'Exam Alert' : 'Targeted Revision',
          badgeColor: exam.daysLeft <= 4 ? 'rose' : 'amber',
          title: `Study "${targetTopic.name}" for ${exam.subject}`,
          subject: exam.subject,
          action: `Read textbook theory, solve 3 past paper numericals, and mark topic complete.`,
          reason: `Rule: Exam-Syllabus alignment. ${exam.subject} exam (${exam.paperName}) is in ${exam.daysLeft === 0 ? 'today' : exam.daysLeft === 1 ? '1 day' : `${exam.daysLeft} days`} and topic is still ${targetTopic.status.replace('-', ' ')}.`,
          linkTab: 'syllabus'
        });
      }
    }
  });

  // --- RULE 3: Remedial Review for Quiz Mistakes ---
  const weakTopics = getWeakTopicsFromQuiz(quizHistory);
  weakTopics.slice(0, 3).forEach(weak => {
    recommendations.push({
      id: `rec-quiz-${weak.subject}-${weak.topic}`,
      priorityLevel: 'Medium',
      priorityRank: 3,
      badge: 'Concept Remediation',
      badgeColor: 'violet',
      title: `Review Core Concept: ${weak.topic}`,
      subject: weak.subject,
      action: `Read the generated study note, practice key numericals, and re-attempt the quiz question to reinforce understanding.`,
      reason: `Rule: Quiz diagnostic feedback. You answered questions in "${weak.topic}" incorrectly during practice (${weak.mistakeCount} missed question${weak.mistakeCount > 1 ? 's' : ''}).`,
      linkTab: 'lessons'
    });
  });

  // --- RULE 4: Tasks Due Soon (Today or Tomorrow) ---
  const dueSoonTasks = tasks.filter(t => {
    if (t.completed) return false;
    const days = getDaysRemaining(t.dueDate);
    return days >= 0 && days <= 1;
  });

  dueSoonTasks.slice(0, 2).forEach(task => {
    const days = getDaysRemaining(task.dueDate);
    recommendations.push({
      id: `rec-due-${task.id}`,
      priorityLevel: 'Medium',
      priorityRank: 4,
      badge: days === 0 ? 'Due Today' : 'Due Tomorrow',
      badgeColor: 'blue',
      title: `Finish Homework: "${task.title}"`,
      subject: task.subject,
      action: `Dedicate 25 minutes to complete remaining work.`,
      reason: `Rule: Deadline proximity. Assignment deadline is ${days === 0 ? 'today' : 'tomorrow'}.`,
      linkTab: 'tasks'
    });
  });

  // --- RULE 5: Lowest Syllabus Progress Balancer ---
  const syllabusStats = calculateSyllabusStats(syllabus);
  if (syllabusStats.bySubject.length > 0) {
    const sortedByLowest = [...syllabusStats.bySubject].sort((a, b) => a.percentage - b.percentage);
    const lowest = sortedByLowest[0];
    if (lowest && lowest.remainingTopics && lowest.remainingTopics.length > 0) {
      const nextTopic = lowest.remainingTopics[0];
      recommendations.push({
        id: `rec-balance-${lowest.subject}`,
        priorityLevel: 'Low',
        priorityRank: 5,
        badge: 'Syllabus Balancer',
        badgeColor: 'emerald',
        title: `Catch Up on ${lowest.subject}: "${nextTopic.name}"`,
        subject: lowest.subject,
        action: `Start reading ${nextTopic.chapter || 'the introductory chapter'} to raise subject syllabus coverage.`,
        reason: `Rule: Subject balancing. ${lowest.subject} has your lowest syllabus coverage at ${lowest.percentage}%.`,
        linkTab: 'syllabus'
      });
    }
  }

  // Sort strictly by priority rank
  recommendations.sort((a, b) => a.priorityRank - b.priorityRank);

  return recommendations;
}
