import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/questions';
import {
  QuizIcon,
  CheckIcon,
  XIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  RefreshCwIcon,
  SparklesIcon,
  InfoIcon,
  AlertCircleIcon
} from '../components/Icons';
import { getTodayString } from '../utils/dateUtils';

export default function Quiz({
  onSaveQuizAttempt,
  onNavigate,
  onOpenLesson,
  onNotify
}) {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [quizMode, setQuizMode] = useState('full'); // 'full' or 'quick'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Filter pool by subject if selected
  const subjectFilteredPool = selectedSubject === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.subject === selectedSubject);

  // Filter questions according to mode
  const activeQuestions = quizMode === 'quick'
    ? subjectFilteredPool.slice(0, Math.min(5, subjectFilteredPool.length))
    : subjectFilteredPool;

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];

  // Keyboard shortcut support (1, 2, 3, 4 or a, b, c, d)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSubmitted || !currentQuestion) return;

      const key = e.key.toLowerCase();
      let pickedIdx = null;
      if (key === '1' || key === 'a') pickedIdx = 0;
      if (key === '2' || key === 'b') pickedIdx = 1;
      if (key === '3' || key === 'c') pickedIdx = 2;
      if (key === '4' || key === 'd') pickedIdx = 3;

      if (pickedIdx !== null && pickedIdx < currentQuestion.options.length) {
        handleSelectOption(pickedIdx);
      } else if (e.key === 'ArrowRight' && currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(c => c + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(c => c - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, currentIndex, isSubmitted, activeQuestions.length]);

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted || !currentQuestion) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    const incorrectTopicList = [];

    activeQuestions.forEach(q => {
      const userChoice = selectedAnswers[q.id];
      if (userChoice === q.correctIndex) {
        score += 1;
      } else {
        incorrectTopicList.push({
          subject: q.subject,
          topic: q.topic,
          questionId: q.id
        });
      }
    });

    const total = activeQuestions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    const resultRecord = {
      date: getTodayString(),
      score,
      total,
      percentage,
      incorrectTopicList,
      mode: quizMode,
      subjectFilter: selectedSubject
    };

    setQuizResult(resultRecord);
    setIsSubmitted(true);

    // Save to localStorage history
    onSaveQuizAttempt(resultRecord);
    if (onNotify) onNotify(`Quiz scored: ${score}/${total} (${percentage}%)! Saved to revision engine.`);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizResult(null);
    setCurrentIndex(0);
  };

  const answeredCount = Object.keys(selectedAnswers).filter(id =>
    activeQuestions.some(q => q.id === id)
  ).length;

  return (
    <div style={{ padding: '24px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Interactive Diagnostic Quiz
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0' }}>
          Evaluate concept mastery across Matric & O-Level curriculum subjects.
        </p>
      </div>

      {/* Honest Classroom Disclaimer Banner */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          padding: '12px 16px',
          border: '1px solid #bfdbfe',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <span style={{ fontSize: '12.5px', color: '#1e40af', lineHeight: 1.4 }}>
          <strong>Classroom Demonstration Notice:</strong> This diagnostic tool is designed for exhibition demonstration and personal concept revision. It is not an official examination board assessment.
        </span>
      </div>

      {/* Subject Filter Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
        {['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'].map(sub => (
          <button
            key={sub}
            type="button"
            disabled={isSubmitted}
            onClick={() => { setSelectedSubject(sub); handleRetry(); }}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              border: selectedSubject === sub ? '1px solid #2563eb' : '1px solid #e2e8f0',
              backgroundColor: selectedSubject === sub ? '#eff6ff' : '#ffffff',
              color: selectedSubject === sub ? '#1d4ed8' : '#64748b',
              cursor: isSubmitted ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {sub === 'all' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        /* QUIZ ACTIVE VIEW */
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Mode Selector and Question Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => { setQuizMode('full'); handleRetry(); }}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: quizMode === 'full' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  backgroundColor: quizMode === 'full' ? '#eff6ff' : '#ffffff',
                  color: quizMode === 'full' ? '#1d4ed8' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                Full Test ({subjectFilteredPool.length} Qs)
              </button>
              <button
                type="button"
                onClick={() => { setQuizMode('quick'); handleRetry(); }}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: quizMode === 'quick' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  backgroundColor: quizMode === 'quick' ? '#eff6ff' : '#ffffff',
                  color: quizMode === 'quick' ? '#1d4ed8' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                Quick Demo (5 Qs)
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }} className="studyos-keyboard-hint">
                Keyboard: 1-4 or A-D
              </span>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb' }}>
                Question {currentIndex + 1} of {activeQuestions.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '24px' }}>
            <div
              style={{
                width: `${((currentIndex + 1) / activeQuestions.length) * 100}%`,
                height: '100%',
                backgroundColor: '#2563eb',
                transition: 'width 0.2s ease'
              }}
            />
          </div>

          {/* Question Box */}
          {currentQuestion && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                    {currentQuestion.subject}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                    Topic: {currentQuestion.topic}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', lineHeight: 1.5, margin: 0 }}>
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? '#2563eb' : '#f1f5f9',
                          color: isSelected ? '#ffffff' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {optionLetters[idx]}
                      </div>

                      <span style={{ fontSize: '14px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#1e3a8a' : '#334155', flex: 1 }}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Bottom Nav Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: currentIndex === 0 ? '#cbd5e1' : '#334155',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Previous
            </button>

            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Answered: {answeredCount} / {activeQuestions.length}
            </span>

            {currentIndex === activeQuestions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)'
                }}
              >
                Submit & Score
                <CheckIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Next
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ REVIEW & RESULTS VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Score Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '32px 24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Diagnostic Quiz Results
            </span>

            <div style={{ fontSize: '52px', fontWeight: 800, color: quizResult.percentage >= 70 ? '#059669' : '#d97706', margin: '8px 0' }}>
              {quizResult.score} / {quizResult.total}
            </div>

            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Score: {quizResult.percentage}%
            </div>

            <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
              {quizResult.incorrectTopicList.length === 0
                ? 'Outstanding work! All concepts demonstrated complete mastery.'
                : `Identified ${quizResult.incorrectTopicList.length} concept area${quizResult.incorrectTopicList.length > 1 ? 's' : ''} to revisit. These have been sent to your Smart Revision planner.`}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleRetry}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <RefreshCwIcon className="w-4 h-4" />
                Retry Quiz
              </button>

              <button
                type="button"
                onClick={() => onNavigate('progress')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
                }}
              >
                <SparklesIcon className="w-4 h-4" />
                View Smart Revision Queue
              </button>
            </div>
          </div>

          {/* Question by Question Detailed Pedagogical Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '8px 0 0' }}>
              Question-by-Question Pedagogical Review
            </h3>

            {activeQuestions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <div
                  key={q.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecdd3'}`,
                    padding: '20px',
                    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                        {q.subject}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                        Topic: {q.topic}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: isCorrect ? '#dcfce7' : '#ffe4e6',
                          color: isCorrect ? '#166534' : '#be123c',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {isCorrect ? <CheckIcon className="w-3.5 h-3.5" /> : <XIcon className="w-3.5 h-3.5" />}
                        {isCorrect ? 'Correct' : 'Needs Review'}
                      </span>

                      {!isCorrect && onOpenLesson && (
                        <button
                          type="button"
                          onClick={() => onOpenLesson(q.subject + ' ' + q.topic)}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: '#f5f3ff',
                            color: '#7c3aed',
                            border: '1px solid #ddd6fe',
                            cursor: 'pointer'
                          }}
                        >
                          📖 Study Lesson
                        </button>
                      )}
                    </div>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.4 }}>
                    {idx + 1}. {q.question}
                  </h4>

                  {/* Options */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px', marginBottom: '14px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionChosen = optIdx === userChoice;

                      let bg = '#f8fafc';
                      let borderColor = '#e2e8f0';
                      let textColor = '#475569';

                      if (isOptionCorrect) {
                        bg = '#ecfdf5';
                        borderColor = '#86efac';
                        textColor = '#065f46';
                      } else if (isOptionChosen && !isCorrect) {
                        bg = '#fff1f2';
                        borderColor = '#fca5a5';
                        textColor = '#9f1239';
                      }

                      return (
                        <div
                          key={optIdx}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: bg,
                            border: `1px solid ${borderColor}`,
                            fontSize: '13px',
                            color: textColor,
                            fontWeight: isOptionCorrect || isOptionChosen ? 600 : 400,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span style={{ fontWeight: 700 }}>{optionLetters[optIdx]}.</span>
                          <span>{opt}</span>
                          {isOptionCorrect && <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#059669', fontWeight: 700 }}>✓ Correct</span>}
                          {isOptionChosen && !isCorrect && <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#e11d48', fontWeight: 700 }}>✗ Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#334155', border: '1px solid #e2e8f0' }}>
                    <strong>Pedagogical Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
