import React, { useState, useMemo } from 'react';
import { PAST_PAPERS_DATABASE, BOARD_EXAM_TEMPLATES } from '../data/pastPapersData';
import {
  SearchIcon,
  FilterIcon,
  SparklesIcon,
  ClockIcon,
  CheckIcon,
  GraduationCapIcon,
  AlertCircleIcon,
  PlusIcon
} from '../components/Icons';

export default function PastPapers({
  onAddTask,
  onNotify,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('vault'); // 'vault' | 'generator'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  
  // Expanded question answers tracker
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [expandedSchemes, setExpandedSchemes] = useState({});

  // Mock Generator State
  const [mockSubject, setMockSubject] = useState('Physics');
  const [mockCurriculum, setMockCurriculum] = useState('Matric');
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [showMarkingScheme, setShowMarkingScheme] = useState(false);

  const toggleAnswer = (id) => {
    setExpandedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleScheme = (id) => {
    setExpandedSchemes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered Past Paper Questions
  const filteredQuestions = useMemo(() => {
    return PAST_PAPERS_DATABASE.filter(q => {
      const matchSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchBoard = selectedBoard === 'all' || q.board.toLowerCase().includes(selectedBoard.toLowerCase());
      const matchYear = selectedYear === 'all' || String(q.year) === selectedYear;

      if (!searchQuery.trim()) {
        return matchSubject && matchBoard && matchYear;
      }

      const query = searchQuery.toLowerCase();
      const matchText = q.questionText.toLowerCase().includes(query) ||
                        q.topic.toLowerCase().includes(query) ||
                        q.board.toLowerCase().includes(query) ||
                        q.subject.toLowerCase().includes(query);

      return matchSubject && matchBoard && matchYear && matchText;
    });
  }, [searchQuery, selectedSubject, selectedBoard, selectedYear]);

  // Handle Generate Mock Exam Paper
  const handleGenerateMock = () => {
    const template = BOARD_EXAM_TEMPLATES[mockCurriculum] || BOARD_EXAM_TEMPLATES['Matric'];
    
    // Pick questions matching subject and curriculum, or related
    const relevantQuestions = PAST_PAPERS_DATABASE.filter(q => q.subject === mockSubject);
    
    const paperQuestions = relevantQuestions.length > 0 
      ? relevantQuestions 
      : PAST_PAPERS_DATABASE.slice(0, 4);

    setGeneratedPaper({
      id: `mock-${Date.now()}`,
      title: `${mockSubject} — ${template.title}`,
      boardName: template.boards[0],
      curriculum: mockCurriculum,
      subject: mockSubject,
      timeAllowed: template.standardTime,
      totalMarks: template.totalMarks,
      instructions: template.instructions,
      questions: paperQuestions,
      generatedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });

    setShowMarkingScheme(false);
    if (onNotify) onNotify(`Generated authentic ${mockSubject} past paper mock exam!`);
  };

  // Handle adding past paper problem to tasks
  const handleAddTaskFromQuestion = (q) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const d = String(tomorrow.getDate()).padStart(2, '0');

    if (onAddTask) {
      onAddTask({
        title: `Solve Past Question: ${q.topic} (${q.year})`,
        subject: q.subject,
        dueDate: `${y}-${m}-${d}`,
        priority: 'high',
        notes: `Solve ${q.board} ${q.year} (${q.marks} Marks):\n"${q.questionText.slice(0, 90)}..." Check marking scheme afterwards.`
      });
      if (onNotify) onNotify(`Added "${q.topic}" past paper task to your study planner!`);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Top Banner / Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
            <GraduationCapIcon className="w-4 h-4" />
            Official Board Vault • FBISE & Cambridge CAIE
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Past Examination Papers & Mock Generator
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0' }}>
            Browse authentic board questions (2021–2024) with step-by-step marking rubrics or generate custom practice papers.
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div style={{ display: 'flex', gap: '8px' }} className="no-print">
          <button
            onClick={() => setActiveTab('vault')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeTab === 'vault' ? '1px solid #2563eb' : '1px solid #cbd5e1',
              backgroundColor: activeTab === 'vault' ? '#eff6ff' : '#ffffff',
              color: activeTab === 'vault' ? '#1d4ed8' : '#475569',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>📁</span> Past Paper Vault ({filteredQuestions.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('generator');
              if (!generatedPaper) handleGenerateMock();
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeTab === 'generator' ? '1px solid #2563eb' : '1px solid #cbd5e1',
              backgroundColor: activeTab === 'generator' ? '#2563eb' : '#ffffff',
              color: activeTab === 'generator' ? '#ffffff' : '#475569',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>⚡</span> Mock Paper Generator
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: PAST PAPER VAULT & SEARCH */}
      {/* ============================================================ */}
      {activeTab === 'vault' && (
        <div>
          {/* Search & Filter Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              padding: '16px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
            className="no-print"
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {/* Keyword Search */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                  <SearchIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search questions by topic, formula, or concept..."
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  color: '#334155'
                }}
              >
                <option value="all">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English">English</option>
              </select>

              {/* Board Filter */}
              <select
                value={selectedBoard}
                onChange={e => setSelectedBoard(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  color: '#334155'
                }}
              >
                <option value="all">All Boards</option>
                <option value="FBISE">FBISE (Federal Board)</option>
                <option value="Cambridge">Cambridge O-Level (CAIE)</option>
                <option value="Punjab">Punjab Board (BISE)</option>
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  color: '#334155'
                }}
              >
                <option value="all">All Years (2021-2024)</option>
                <option value="2024">2024 Annual</option>
                <option value="2023">2023 Annual</option>
                <option value="2022">2022 Annual</option>
                <option value="2021">2021 Annual</option>
              </select>
            </div>
          </div>

          {/* Questions Stream */}
          {filteredQuestions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>
                No past paper questions found matching your filter
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Try clearing search terms or selecting "All Subjects" and "All Boards".
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredQuestions.map(q => {
                const isAnswerOpen = !!expandedAnswers[q.id];
                const isSchemeOpen = !!expandedSchemes[q.id];

                return (
                  <div
                    key={q.id}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '14px',
                      border: '1px solid #e2e8f0',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
                    }}
                  >
                    {/* Question Header Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: '#eff6ff',
                          color: '#1d4ed8',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {q.subject}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          🏛️ {q.board} • {q.year}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          color: '#64748b'
                        }}>
                          📌 {q.topic} ({q.chapter})
                        </span>
                      </div>

                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}>
                        {q.marks} Marks
                      </span>
                    </div>

                    {/* Question Statement */}
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a',
                      lineHeight: '1.6',
                      marginBottom: '16px',
                      backgroundColor: '#f8fafc',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      borderLeft: '4px solid #2563eb'
                    }}>
                      {q.questionText}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: isAnswerOpen || isSchemeOpen ? '16px' : '0' }}>
                      <button
                        onClick={() => toggleAnswer(q.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: isAnswerOpen ? '1px solid #2563eb' : '1px solid #cbd5e1',
                          backgroundColor: isAnswerOpen ? '#eff6ff' : '#ffffff',
                          color: isAnswerOpen ? '#1d4ed8' : '#334155',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {isAnswerOpen ? '▲ Hide Model Answer' : '▼ View Model Answer'}
                      </button>

                      <button
                        onClick={() => toggleScheme(q.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: isSchemeOpen ? '1px solid #10b981' : '1px solid #cbd5e1',
                          backgroundColor: isSchemeOpen ? '#ecfdf5' : '#ffffff',
                          color: isSchemeOpen ? '#047857' : '#334155',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {isSchemeOpen ? '▲ Hide Marking Scheme' : '📋 Marking Scheme Breakdown'}
                      </button>

                      <button
                        onClick={() => handleAddTaskFromQuestion(q)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          color: '#475569',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginLeft: 'auto'
                        }}
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                        Add to Study Tasks
                      </button>
                    </div>

                    {/* Collapsible Model Answer */}
                    {isAnswerOpen && (
                      <div style={{
                        marginTop: '12px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckIcon className="w-4 h-4 text-emerald-600" />
                          Step-by-Step Model Solution (Exam Standard):
                        </div>
                        <pre style={{
                          margin: 0,
                          fontFamily: 'inherit',
                          fontSize: '13px',
                          color: '#334155',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {q.modelAnswer}
                        </pre>

                        {q.examinerTip && (
                          <div style={{
                            marginTop: '12px',
                            backgroundColor: '#fffbeb',
                            border: '1px solid #fde68a',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            fontSize: '12px',
                            color: '#92400e',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px'
                          }}>
                            <AlertCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Pakistani Board Examiner Tip:</strong> {q.examinerTip}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collapsible Marking Scheme */}
                    {isSchemeOpen && (
                      <div style={{
                        marginTop: '12px',
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '10px',
                        padding: '16px'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>
                          Official Board Marking Rubric ({q.marks} Total Marks):
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#14532d', lineHeight: '1.6' }}>
                          {q.markingScheme.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: MOCK PAPER GENERATOR */}
      {/* ============================================================ */}
      {activeTab === 'generator' && (
        <div>
          {/* Generator Controls */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              padding: '18px 20px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
            className="no-print"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Select Subject
                  </label>
                  <select
                    value={mockSubject}
                    onChange={e => setMockSubject(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      backgroundColor: '#ffffff',
                      color: '#334155'
                    }}
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Curriculum Format
                  </label>
                  <select
                    value={mockCurriculum}
                    onChange={e => setMockCurriculum(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      backgroundColor: '#ffffff',
                      color: '#334155'
                    }}
                  >
                    <option value="Matric">Matric (FBISE / Punjab BISE)</option>
                    <option value="O-Level">Cambridge O-Level (CAIE)</option>
                  </select>
                </div>

                <div style={{ marginTop: '18px' }}>
                  <button
                    onClick={handleGenerateMock}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '8px',
                      backgroundColor: '#2563eb',
                      border: 'none',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <SparklesIcon className="w-4 h-4" />
                    Regenerate Mock Exam Paper
                  </button>
                </div>
              </div>

              {/* Print & Scheme Toggle Controls */}
              {generatedPaper && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                  <button
                    onClick={() => setShowMarkingScheme(prev => !prev)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: showMarkingScheme ? '1px solid #10b981' : '1px solid #cbd5e1',
                      backgroundColor: showMarkingScheme ? '#ecfdf5' : '#ffffff',
                      color: showMarkingScheme ? '#047857' : '#334155',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {showMarkingScheme ? 'Hide Model Solutions' : 'Show Model Solutions'}
                  </button>

                  <button
                    onClick={() => window.print()}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    🖨️ Print Exam Paper (A4)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Render Authentic Exam Paper */}
          {generatedPaper && (
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '2px solid #0f172a',
                padding: '36px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
                maxWidth: '900px',
                margin: '0 auto',
                fontFamily: 'serif'
              }}
              className="studyos-exam-paper-sheet"
            >
              {/* Paper Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
                  <img src="/alhamdia-logo.png" alt="Alhamdia Crest" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f172a' }}>
                      Alhamdia International School & College
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', letterSpacing: '0.05em' }}>
                      DEPARTMENT OF EXAMINATIONS & ACADEMIC PREPARATION
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#475569' }}>
                  {generatedPaper.boardName}
                </div>
                <h1 style={{ fontSize: '19px', fontWeight: 800, margin: '6px 0', color: '#0f172a', textTransform: 'uppercase' }}>
                  {generatedPaper.title}
                </h1>
                <div style={{ fontSize: '13px', color: '#334155', display: 'flex', justifyContent: 'space-around', marginTop: '12px', flexWrap: 'wrap', gap: '8px', fontFamily: 'sans-serif' }}>
                  <div><strong>Time Allowed:</strong> {generatedPaper.timeAllowed}</div>
                  <div><strong>Total Marks:</strong> {generatedPaper.totalMarks}</div>
                  <div><strong>Roll Number:</strong> [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div>
                </div>
              </div>

              {/* Instructions */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', fontFamily: 'sans-serif' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', textTransform: 'uppercase' }}>
                  General Instructions to Candidates:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
                  {generatedPaper.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>

              {/* Section B: Short Conceptual Questions */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ borderBottom: '1px solid #0f172a', paddingBottom: '6px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0f172a', textTransform: 'uppercase' }}>
                    Section B — Short Answer Questions
                  </h3>
                  <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'sans-serif' }}>
                    (Marks: 20)
                  </span>
                </div>
                <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#64748b', marginBottom: '14px', fontFamily: 'sans-serif' }}>
                  Note: Attempt all parts. Each question carries marks as indicated.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {generatedPaper.questions.slice(0, 3).map((q, idx) => (
                    <div key={q.id} style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                        <div style={{ fontSize: '14px', color: '#0f172a', lineHeight: '1.6' }}>
                          <strong>Q.{idx + 1}</strong> &nbsp; {q.questionText}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                          [{q.marks} Marks]
                        </span>
                      </div>

                      {/* Optional Model Solution for Mock */}
                      {showMarkingScheme && (
                        <div style={{ marginTop: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '10px 14px', fontFamily: 'sans-serif' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                            ✓ Model Solution & Marking Points:
                          </div>
                          <pre style={{ margin: 0, fontSize: '12px', color: '#14532d', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                            {q.modelAnswer}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section C: Structured / Long Questions */}
              <div>
                <div style={{ borderBottom: '1px solid #0f172a', paddingBottom: '6px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0f172a', textTransform: 'uppercase' }}>
                    Section C — Extensive Problems & Derivations
                  </h3>
                  <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'sans-serif' }}>
                    (Marks: 20)
                  </span>
                </div>
                <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#64748b', marginBottom: '14px', fontFamily: 'sans-serif' }}>
                  Note: Attempt the following problem in full. Show all necessary calculations and working lines.
                </p>

                {generatedPaper.questions.slice(3, 4).map((q, idx) => (
                  <div key={q.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                      <div style={{ fontSize: '14px', color: '#0f172a', lineHeight: '1.6' }}>
                        <strong>Q.4</strong> &nbsp; {q.questionText}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                        [{q.marks} Marks]
                      </span>
                    </div>

                    {showMarkingScheme && (
                      <div style={{ marginTop: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '10px 14px', fontFamily: 'sans-serif' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                          ✓ Model Solution & Marking Points:
                        </div>
                        <pre style={{ margin: 0, fontSize: '12px', color: '#14532d', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                          {q.modelAnswer}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Stamp */}
              <div style={{ textAlign: 'center', marginTop: '36px', paddingTop: '16px', borderTop: '1px solid #cbd5e1', fontSize: '11px', color: '#64748b', fontFamily: 'sans-serif' }}>
                *** END OF EXAMINATION PAPER • ALHAMDIA INTERNATIONAL SCHOOL & COLLEGE • ALHAMDIA STUDENT PLANNER ***
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
