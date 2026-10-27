import React, { useState } from 'react';
import TaskFormModal from '../components/TaskFormModal';
import ConfirmationModal from '../components/ConfirmationModal';
import EmptyState from '../components/EmptyState';
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  CheckIcon,
  EditIcon,
  TrashIcon,
  AlertCircleIcon,
  ClockIcon,
  TasksIcon
} from '../components/Icons';
import { formatDate, isTaskOverdue, getDaysRemaining } from '../utils/dateUtils';

export default function Tasks({
  tasks = [],
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
  onNotify
}) {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'pending' | 'overdue' | 'completed'
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'title'
  const [searchQuery, setSearchQuery] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Filter logic
  let filteredTasks = tasks.filter(task => {
    // Tab filter
    if (filterTab === 'pending' && task.completed) return false;
    if (filterTab === 'completed' && !task.completed) return false;
    if (filterTab === 'overdue' && !isTaskOverdue(task.dueDate, task.completed)) return false;

    // Subject filter
    if (subjectFilter !== 'all' && task.subject !== subjectFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchNotes = (task.notes || '').toLowerCase().includes(q);
      const matchSub = task.subject.toLowerCase().includes(q);
      if (!matchTitle && !matchNotes && !matchSub) return false;
    }

    return true;
  });

  // Sort logic
  filteredTasks.sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const weights = { high: 1, medium: 2, low: 3 };
      return (weights[a.priority] || 2) - (weights[b.priority] || 2);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const allSubjects = Array.from(new Set(tasks.map(t => t.subject)));

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleFormSave = (taskData) => {
    if (editingTask) {
      onUpdateTask(taskData);
      if (onNotify) onNotify('Assignment updated successfully!');
    } else {
      onAddTask(taskData);
      if (onNotify) onNotify('New homework assignment created!');
    }
  };

  const handleToggle = (taskId) => {
    const target = tasks.find(t => t.id === taskId);
    onToggleTask(taskId);
    if (onNotify && target) {
      onNotify(target.completed ? 'Assignment marked incomplete' : 'Assignment completed! Great job! 🎉');
    }
  };

  const pendingCount = tasks.filter(t => !t.completed).length;
  const overdueCount = tasks.filter(t => isTaskOverdue(t.dueDate, t.completed)).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Homework & Assignments
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>
            Manage daily school homework, lab write-ups, and past paper worksheets.
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '9px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontSize: '13.5px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
          }}
        >
          <PlusIcon className="w-4 h-4" />
          Add Assignment
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid #e2e8f0',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: `All Tasks (${tasks.length})` },
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'overdue', label: `Overdue (${overdueCount})`, isAlert: overdueCount > 0 },
            { id: 'completed', label: `Completed (${completedCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: filterTab === tab.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: filterTab === tab.id ? '#eff6ff' : '#ffffff',
                color: filterTab === tab.id ? '#1d4ed8' : tab.isAlert ? '#e11d48' : '#64748b',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search, Subject Dropdown, & Sorting */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assignments or notes..."
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ minWidth: '160px' }}>
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box'
              }}
            >
              <option value="all">All Subjects</option>
              {allSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div style={{ minWidth: '160px' }}>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box'
              }}
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={TasksIcon}
          title={tasks.length === 0 ? 'No Assignments Created Yet' : 'No Tasks Match Your Filters'}
          description={
            tasks.length === 0
              ? 'Stay ahead of your syllabus and homework by creating your first school assignment.'
              : 'Try clearing your search query or switching to the "All Tasks" tab.'
          }
          actionLabel="Add Assignment"
          onAction={handleCreateClick}
          secondaryLabel={tasks.length > 0 ? 'Reset Filters' : null}
          onSecondary={() => {
            setFilterTab('all');
            setSubjectFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredTasks.map(task => {
            const overdue = isTaskOverdue(task.dueDate, task.completed);
            const daysLeft = getDaysRemaining(task.dueDate);

            const priorityBadge = {
              high: { label: 'High Priority', bg: '#ffe4e6', color: '#be123c' },
              medium: { label: 'Medium Priority', bg: '#fef3c7', color: '#92400e' },
              low: { label: 'Low Priority', bg: '#d1fae5', color: '#065f46' }
            }[task.priority] || { label: 'Medium', bg: '#f1f5f9', color: '#475569' };

            return (
              <div
                key={task.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: `1px solid ${overdue ? '#fca5a5' : '#e2e8f0'}`,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Left: Checkbox + Content */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                  {/* Toggle Checkbox */}
                  <button
                    onClick={() => handleToggle(task.id)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: task.completed ? '2px solid #10b981' : '2px solid #cbd5e1',
                      backgroundColor: task.completed ? '#10b981' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      marginTop: '2px',
                      transition: 'all 0.15s ease'
                    }}
                    title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {task.completed && <CheckIcon className="w-3.5 h-3.5" />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                        {task.subject}
                      </span>

                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 7px', borderRadius: '6px', backgroundColor: priorityBadge.bg, color: priorityBadge.color }}>
                        {priorityBadge.label}
                      </span>

                      {overdue && (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <AlertCircleIcon className="w-3 h-3" /> Overdue by {Math.abs(daysLeft)} {Math.abs(daysLeft) === 1 ? 'day' : 'days'}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: task.completed ? '#94a3b8' : '#0f172a',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        marginBottom: '4px'
                      }}
                    >
                      {task.title}
                    </div>

                    {task.notes && (
                      <p style={{ fontSize: '13px', color: task.completed ? '#cbd5e1' : '#64748b', margin: '0 0 6px', lineHeight: 1.4 }}>
                        {task.notes}
                      </p>
                    )}

                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>Due: {formatDate(task.dueDate)}</span>
                      {!task.completed && !overdue && daysLeft >= 0 && (
                        <span style={{ color: daysLeft === 0 ? '#b45309' : '#64748b', fontWeight: daysLeft === 0 ? 700 : 400 }}>
                          ({daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `in ${daysLeft} days`})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={() => handleEditClick(task)}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                    title="Edit assignment"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingTaskId(task.id)}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      backgroundColor: '#ffffff',
                      color: '#e11d48',
                      cursor: 'pointer'
                    }}
                    title="Delete assignment"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isFormOpen}
        initialData={editingTask}
        onSave={handleFormSave}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingTaskId)}
        title="Delete Assignment?"
        message="Are you sure you want to remove this homework assignment from your study schedule? This action cannot be undone."
        confirmLabel="Delete Task"
        isDanger={true}
        onConfirm={() => {
          if (deletingTaskId) {
            onDeleteTask(deletingTaskId);
            setDeletingTaskId(null);
            if (onNotify) onNotify('Assignment deleted.');
          }
        }}
        onCancel={() => setDeletingTaskId(null)}
      />
    </div>
  );
}
