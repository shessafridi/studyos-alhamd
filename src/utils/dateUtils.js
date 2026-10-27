// Utility functions for date calculations, comparisons, and formatting

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats an ISO date string (YYYY-MM-DD) into a friendly presentation string
 * Example: "2026-10-30" -> "30 Oct 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return 'No date';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Calculates whole days remaining until target date (relative to today).
 * Negative means in the past. 0 means today.
 */
export function getDaysRemaining(dateStr) {
  if (!dateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = dateStr.split('-');
  let target;
  if (parts.length === 3) {
    target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  } else {
    target = new Date(dateStr);
  }
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Returns a human-friendly countdown label:
 * e.g., "Today", "Tomorrow", "In 3 days", "Exam passed 2 days ago"
 */
export function getCountdownBadge(dateStr) {
  const days = getDaysRemaining(dateStr);
  if (days < 0) {
    const abs = Math.abs(days);
    return {
      text: abs === 1 ? 'Passed 1 day ago' : `Passed ${abs} days ago`,
      isPast: true,
      isUrgent: false,
      color: 'past'
    };
  }
  if (days === 0) {
    return { text: 'Today!', isPast: false, isUrgent: true, color: 'critical' };
  }
  if (days === 1) {
    return { text: 'Tomorrow', isPast: false, isUrgent: true, color: 'critical' };
  }
  if (days <= 3) {
    return { text: `In ${days} days`, isPast: false, isUrgent: true, color: 'warning' };
  }
  if (days <= 7) {
    return { text: `In ${days} days`, isPast: false, isUrgent: false, color: 'info' };
  }
  return { text: `In ${days} days`, isPast: false, isUrgent: false, color: 'normal' };
}

/**
 * Checks whether an uncompleted task is past its due date
 */
export function isTaskOverdue(dueDate, isCompleted) {
  if (isCompleted || !dueDate) return false;
  return getDaysRemaining(dueDate) < 0;
}
