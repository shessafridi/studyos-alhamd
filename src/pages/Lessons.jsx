import React, { useState, useMemo, useEffect } from 'react';
import { LESSON_KNOWLEDGE_BASE } from '../data/lessonsData';
import { INITIAL_SYLLABUS } from '../data/demoData';
import { generateTopicQA } from '../data/topicQAData';
import {
  SearchIcon,
  SparklesIcon,
  ClockIcon,
  CheckIcon,
  AlertCircleIcon,
  GraduationCapIcon,
  SyllabusIcon,
  ArrowRightIcon
} from '../components/Icons';

export default function Lessons({
  initialTopic = null,
  onNavigate,
  onAddTask,
  onNotify
}) {
  const [searchQuery, setSearchQuery] = useState(initialTopic || '');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeLesson, setActiveLesson] = useState(() => {
    if (initialTopic) {
      const match = LESSON_KNOWLEDGE_BASE.find(l =>
        l.topic.toLowerCase().includes(initialTopic.toLowerCase())
      );
      if (match) return match;
    }
    return LESSON_KNOWLEDGE_BASE[0];
  });

  const [lessonDepth, setLessonDepth] = useState('standard'); // 'summary' | 'standard' | 'qa-pack' | 'exam-traps'
  const [showSelfTestAnswer, setShowSelfTestAnswer] = useState(false);
  const [revealedQA, setRevealedQA] = useState({});
  const [revealAllQA, setRevealAllQA] = useState(false);

  // Generate Topic Q&A Pack
  const topicQAPack = useMemo(() => {
    if (!activeLesson) return null;
    return generateTopicQA(activeLesson.topic, activeLesson.subject);
  }, [activeLesson]);

  const toggleQAReveal = (id) => {
    setRevealedQA(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleRevealAll = () => {
    setRevealAllQA(prev => !prev);
  };

  // Sync active lesson whenever initialTopic prop changes from another page
  useEffect(() => {
    if (initialTopic) {
      setSearchQuery(initialTopic);
      const matched = LESSON_KNOWLEDGE_BASE.find(l =>
        l.topic.toLowerCase().includes(initialTopic.toLowerCase()) ||
        initialTopic.toLowerCase().includes(l.topic.toLowerCase())
      );
      if (matched) {
        setActiveLesson(matched);
      } else {
        handleSelectTopic({ subject: 'Curriculum', topic: initialTopic, chapter: 'Revision Module', status: 'in-progress' });
      }
    }
  }, [initialTopic]);

  // Flatten all syllabus topics to enable universal search across all 28 syllabus chapters
  const allSyllabusTopics = useMemo(() => {
    const list = [];
    INITIAL_SYLLABUS.forEach(sub => {
      sub.topics.forEach(top => {
        list.push({
          subject: sub.subject,
          subjectCode: sub.code,
          topic: top.name,
          chapter: top.chapter,
          status: top.status
        });
      });
    });
    return list;
  }, []);

  // Filter topics in real time
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedSubject === 'all'
        ? allSyllabusTopics
        : allSyllabusTopics.filter(t => t.subject === selectedSubject);
    }
    const q = searchQuery.toLowerCase();
    return allSyllabusTopics.filter(t => {
      const matchSubject = selectedSubject === 'all' || t.subject === selectedSubject;
      const matchName = t.topic.toLowerCase().includes(q);
      const matchChapter = t.chapter.toLowerCase().includes(q);
      const matchSubName = t.subject.toLowerCase().includes(q);
      return matchSubject && (matchName || matchChapter || matchSubName);
    });
  }, [searchQuery, selectedSubject, allSyllabusTopics]);

  const handleSelectTopic = (topicItem) => {
    const matchedLesson = LESSON_KNOWLEDGE_BASE.find(l =>
      l.topic.toLowerCase() === topicItem.topic.toLowerCase() ||
      topicItem.topic.toLowerCase().includes(l.topic.toLowerCase())
    );

    if (matchedLesson) {
      setActiveLesson(matchedLesson);
    } else {
      // Generate a dynamic template lesson for topics not in the pre-written bank
      setActiveLesson({
        id: `dyn-${Date.now()}`,
        subject: topicItem.subject,
        topic: topicItem.topic,
        chapter: topicItem.chapter || 'Curriculum Module',
        readingMinutes: 4,
        summary: `A fundamental topic in secondary school ${topicItem.subject} curriculum focusing on core principles and analytical methods.`,
        coreTheory: `### Study Objectives for ${topicItem.topic}:
1. **Core Understanding**: Review the foundational definitions and scientific laws outlined in your textbook chapter (${topicItem.chapter}).
2. **Problem Solving**: Practice at least 3 standard numericals or analytical questions from past examination papers.
3. **Self-Assessment**: Verify your comprehension by defining all key terms from memory without looking at notes.`,
        keyFormulas: [
          `Key Principle: Master standard notations for ${topicItem.topic}`,
          `Formula Application: Follow SI units systematically`
        ],
        workedExample: {
          problem: `Explain the central importance of "${topicItem.topic}" in board examinations.`,
          solution: `Step 1: Identify key terminology and definitions.
Step 2: Relate theoretical equations to physical or mathematical principles.
Step 3: State assumptions and write complete units in numerical answers.`
        },
        commonTraps: [
          'Skipping intermediate calculation steps in board examinations (causes mark deductions).',
          'Not reviewing previous years\' 5-mark structured questions.'
        ],
        selfTest: {
          question: `State one key concept you must memorize regarding ${topicItem.topic}.`,
          answer: `Review the official board textbook definition and practice 2 past paper numericals.`
        }
      });
    }

    setShowSelfTestAnswer(false);
    if (onNotify) onNotify(`Generated high-yield lesson for "${topicItem.topic}"!`);
  };

  const handleAddLessonToTasks = () => {
    if (!activeLesson) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const d = String(tomorrow.getDate()).padStart(2, '0');

    onAddTask({
      title: `Revise Lesson: ${activeLesson.topic}`,
      subject: activeLesson.subject,
      dueDate: `${y}-${m}-${d}`,
      priority: 'high',
      notes: `Review generated summary, memorize formulas, and test common exam traps.`
    });

    if (onNotify) onNotify(`Added "${activeLesson.topic}" to your homework schedule!`);
  };

  const handleStartFocusSprint = () => {
    if (onNotify) onNotify(`Topic attached to Focus Timer! Heading to Dashboard...`);
    onNavigate('dashboard');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
            <SparklesIcon className="w-4 h-4" />
            Curriculum Knowledge Engine • Matric & O-Level
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Lesson Studio & Topic Search
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>
            Search 28 syllabus topics across 6 subjects and generate high-yield revision lessons.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="no-print"
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#334155',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          🖨️ Print Lesson Sheet
        </button>
      </div>

      {/* Two Column Layout: Search Explorer (Left) & Generated Lesson View (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* LEFT COLUMN: Universal Topic Explorer & Search */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
          }}
          className="no-print"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <SearchIcon className="w-4 h-4 text-blue-600" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Search Syllabus Topics
            </h3>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="e.g. Quadratic, Electricity, Mole, Alveoli..."
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
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '13px' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Subject Filter Chips */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
            {['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English'].map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  border: selectedSubject === sub ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  backgroundColor: selectedSubject === sub ? '#eff6ff' : '#ffffff',
                  color: selectedSubject === sub ? '#1d4ed8' : '#64748b',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {sub === 'all' ? 'All' : sub.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Search Result Topic List */}
          <div style={{ maxHeight: '520px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                No topics matching "{searchQuery}".
              </div>
            ) : (
              searchResults.map((item, idx) => {
                const isSelected = activeLesson && activeLesson.topic.toLowerCase() === item.topic.toLowerCase();

                const statusColor = {
                  completed: { bg: '#dcfce7', text: '#15803d', label: 'Mastered' },
                  'in-progress': { bg: '#eff6ff', text: '#1d4ed8', label: 'In Progress' },
                  'not-started': { bg: '#f1f5f9', text: '#475569', label: 'Not Started' }
                }[item.status] || { bg: '#f1f5f9', text: '#475569', label: 'Topic' };

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectTopic(item)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#eff6ff' : '#f8fafc',
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    className="studyos-queue-item"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e40af' }}>
                          {item.subject}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          • {item.chapter}
                        </span>
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#1e3a8a' : '#0f172a' }}>
                        {item.topic}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: statusColor.bg, color: statusColor.text }}>
                        {statusColor.label}
                      </span>
                      <ArrowRightIcon className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Generated Lesson View */}
        {activeLesson && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '28px',
              boxShadow: '0 2px 4px rgba(15, 23, 42, 0.04)'
            }}
          >
            {/* Lesson Depth Style Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }} className="no-print">
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'standard', label: 'Complete Theory' },
                  { id: 'summary', label: '3-Min Summary' },
                  { id: 'qa-pack', label: '❓ Generated Q&A Pack' },
                  { id: 'exam-traps', label: 'Exam Traps & Traps' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setLessonDepth(mode.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: lessonDepth === mode.id ? '1px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: lessonDepth === mode.id ? '#eff6ff' : '#ffffff',
                      color: lessonDepth === mode.id ? '#1d4ed8' : '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                <ClockIcon className="w-3.5 h-3.5" />
                <span>~{activeLesson.readingMinutes || 4} min read</span>
              </div>
            </div>

            {/* Title & Metadata */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                  {activeLesson.subject}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  {activeLesson.chapter}
                </span>
              </div>

              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                {activeLesson.topic}
              </h1>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0, backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '10px', borderLeft: '4px solid #2563eb' }}>
                <strong>Key Takeaway:</strong> {activeLesson.summary}
              </p>
            </div>

            {/* Q&A PACK SECTION */}
            {lessonDepth === 'qa-pack' && topicQAPack && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px 0' }}>
                      ⚡ Generated Examination Q&A Revision Pack
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      Based on FBISE & CAIE Secondary Standards • Practice active recall by revealing solutions
                    </p>
                  </div>
                  <button
                    onClick={handleToggleRevealAll}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: revealAllQA ? '#eff6ff' : '#ffffff',
                      color: revealAllQA ? '#1d4ed8' : '#334155',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {revealAllQA ? 'Hide All Answers' : 'Reveal All Answers'}
                  </button>
                </div>

                {/* Short Questions Section */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e40af', backgroundColor: '#eff6ff', padding: '6px 12px', borderRadius: '6px', marginBottom: '12px' }}>
                    Section 1: Key Definitions & Short Questions (2 Marks Each)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {topicQAPack.shortQuestions.map((q, idx) => {
                      const isRevealed = revealAllQA || !!revealedQA[q.id];
                      return (
                        <div key={q.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', backgroundColor: '#f8fafc' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>
                              <strong>Q{idx + 1}.</strong> {q.question}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                              {q.type}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                            <button
                              onClick={() => toggleQAReveal(q.id)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '5px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: isRevealed ? '#eff6ff' : '#ffffff',
                                color: isRevealed ? '#1d4ed8' : '#334155',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {isRevealed ? '▲ Hide Model Answer' : '▼ Reveal Answer & Mark Scheme'}
                            </button>
                          </div>

                          {isRevealed && (
                            <div style={{ marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px' }}>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                                ✓ Model Answer:
                              </div>
                              <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.5, whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
                                {q.modelAnswer}
                              </div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                                📋 Marking Points:
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11.5px', color: '#64748b' }}>
                                {q.markingPoints.map((mp, i) => (
                                  <li key={i}>{mp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conceptual Questions Section */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e', backgroundColor: '#fef3c7', padding: '6px 12px', borderRadius: '6px', marginBottom: '12px' }}>
                    Section 2: Conceptual & Reasoning Questions (3 Marks Each)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {topicQAPack.conceptualQuestions.map((q, idx) => {
                      const isRevealed = revealAllQA || !!revealedQA[q.id];
                      return (
                        <div key={q.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', backgroundColor: '#f8fafc' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>
                              <strong>Q{idx + 1}.</strong> {q.question}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                              {q.type}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                            <button
                              onClick={() => toggleQAReveal(q.id)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '5px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: isRevealed ? '#eff6ff' : '#ffffff',
                                color: isRevealed ? '#1d4ed8' : '#334155',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {isRevealed ? '▲ Hide Model Answer' : '▼ Reveal Answer & Mark Scheme'}
                            </button>
                          </div>

                          {isRevealed && (
                            <div style={{ marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px' }}>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                                ✓ Model Answer:
                              </div>
                              <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.5, whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
                                {q.modelAnswer}
                              </div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                                📋 Marking Points:
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11.5px', color: '#64748b' }}>
                                {q.markingPoints.map((mp, i) => (
                                  <li key={i}>{mp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Long Questions Section */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e3a8a', backgroundColor: '#e0e7ff', padding: '6px 12px', borderRadius: '6px', marginBottom: '12px' }}>
                    Section 3: Structured Problem & Numerical (5 Marks Each)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {topicQAPack.longQuestions.map((q, idx) => {
                      const isRevealed = revealAllQA || !!revealedQA[q.id];
                      return (
                        <div key={q.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', backgroundColor: '#f8fafc' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>
                              <strong>Q{idx + 1}.</strong> {q.question}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                              {q.type}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                            <button
                              onClick={() => toggleQAReveal(q.id)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '5px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: isRevealed ? '#eff6ff' : '#ffffff',
                                color: isRevealed ? '#1d4ed8' : '#334155',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {isRevealed ? '▲ Hide Model Solution' : '▼ Reveal Solution & Mark Scheme'}
                            </button>
                          </div>

                          {isRevealed && (
                            <div style={{ marginTop: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px' }}>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                                ✓ Step-by-Step Model Solution:
                              </div>
                              <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'monospace', marginBottom: '8px' }}>
                                {q.modelAnswer}
                              </div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                                📋 Marking Rubric Breakdown:
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11.5px', color: '#64748b' }}>
                                {q.markingPoints.map((mp, i) => (
                                  <li key={i}>{mp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Link to Past Papers */}
                {onNavigate && (
                  <div style={{ backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#334155' }}>
                      Looking for official past examination questions from 2021-2024?
                    </span>
                    <button
                      onClick={() => onNavigate('pastpapers')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Open Past Papers Vault ➔
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Core Theory Section */}
            {lessonDepth !== 'qa-pack' && lessonDepth !== 'exam-traps' && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                  Core Theoretical Principles
                </h3>
                <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {activeLesson.coreTheory}
                </div>
              </div>
            )}

            {/* Formulas / Rules Callout */}
            {lessonDepth !== 'qa-pack' && activeLesson.keyFormulas && activeLesson.keyFormulas.length > 0 && (
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#15803d', margin: '0 0 8px' }}>
                  📐 Formulas & Governing Principles to Memorize
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', color: '#166534', lineHeight: 1.6 }}>
                  {activeLesson.keyFormulas.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Worked Example */}
            {lessonDepth !== 'qa-pack' && activeLesson.workedExample && lessonDepth !== 'summary' && (
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <GraduationCapIcon className="w-4 h-4 text-blue-600" />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    Step-by-Step Worked Exam Problem
                  </h4>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b', marginBottom: '10px' }}>
                  Question: {activeLesson.workedExample.problem}
                </div>

                <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line', backgroundColor: '#ffffff', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'var(--font-mono)' }}>
                  {activeLesson.workedExample.solution}
                </div>
              </div>
            )}

            {/* Common Traps Alert */}
            {lessonDepth !== 'qa-pack' && activeLesson.commonTraps && activeLesson.commonTraps.length > 0 && (
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <AlertCircleIcon className="w-4 h-4 text-amber-600" />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#92400e', margin: 0 }}>
                    Top Examiner Traps & Common Student Mistakes
                  </h4>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#78350f', lineHeight: 1.5 }}>
                  {activeLesson.commonTraps.map((trap, i) => (
                    <li key={i}>{trap}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Self-Test Conceptual Check */}
            {lessonDepth !== 'qa-pack' && activeLesson.selfTest && (
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e40af', margin: '0 0 6px' }}>
                  🧠 Quick Self-Check Challenge
                </h4>
                <p style={{ fontSize: '13.5px', color: '#1e3a8a', margin: '0 0 10px' }}>
                  {activeLesson.selfTest.question}
                </p>

                {showSelfTestAnswer ? (
                  <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '13px', color: '#1e3a8a', lineHeight: 1.5 }}>
                    <strong>Answer & Rationale:</strong> {activeLesson.selfTest.answer}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSelfTestAnswer(true)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Reveal Solution
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0', paddingTop: '18px' }} className="no-print">
              <button
                onClick={handleStartFocusSprint}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
                }}
              >
                ⚡ Start 25m Focus Sprint
              </button>

              <button
                onClick={handleAddLessonToTasks}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ➕ Add to Study Tasks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
