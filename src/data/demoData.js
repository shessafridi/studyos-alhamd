// Fictional demonstration dataset for StudyOS
// Tailored for Matric (BISE/FBISE) and Cambridge O-Level students in Pakistan.
// Dates are generated relative to the current date so live countdowns always work reliably.

function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const INITIAL_STUDENT_PROFILE = {
  name: 'Shayan Khan',
  grade: 'Matric Science & O-Level Track',
  school: 'Exhibition Demo Academy (Islamabad)',
  track: 'Matric / O-Level Science',
  targetGoal: 'Target: A* / 90%+ in Board Finals'
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Solve Chapter 3 Review Questions (Newton’s Laws of Motion)',
    subject: 'Physics',
    dueDate: offsetDate(-2), // Overdue to demonstrate overdue alert
    priority: 'high',
    completed: false,
    notes: 'Complete numericals 3.1 to 3.8 and draw free-body diagrams in neat homework copy.'
  },
  {
    id: 'task-2',
    title: 'Memorize Balancing Redox Reactions & Practice 5 Equations',
    subject: 'Chemistry',
    dueDate: offsetDate(0), // Due Today
    priority: 'high',
    completed: false,
    notes: 'Focus on oxidation state method from Chapter 7.'
  },
  {
    id: 'task-3',
    title: 'Exercise 2.4 Quadratic Formula Proof & Applications',
    subject: 'Mathematics',
    dueDate: offsetDate(1), // Tomorrow
    priority: 'medium',
    completed: false,
    notes: 'Solve questions 4 through 9 on page 48.'
  },
  {
    id: 'task-4',
    title: 'Write Essay Outline on "Renewable Energy in Pakistan"',
    subject: 'English',
    dueDate: offsetDate(3),
    priority: 'low',
    completed: true,
    notes: 'Include solar potential in Punjab, Thar coal comparison, and hydel dams.'
  },
  {
    id: 'task-5',
    title: 'Draw and Label the Human Alveolar Gas Exchange Diagram',
    subject: 'Biology',
    dueDate: offsetDate(4),
    priority: 'medium',
    completed: false,
    notes: 'Label capillary endothelium, alveolar epithelial layer, and diffusion gradients.'
  },
  {
    id: 'task-6',
    title: 'Binary to Hexadecimal Conversion Practice Worksheet',
    subject: 'Computer Science',
    dueDate: offsetDate(5),
    priority: 'low',
    completed: true,
    notes: 'Verified against teacher answer sheet.'
  }
];

export const INITIAL_EXAMS = [
  {
    id: 'exam-1',
    subject: 'Physics',
    paperName: 'Theory & Structured Questions (Paper 1)',
    board: 'FBISE / CAIE O-Level 5054',
    date: offsetDate(4),
    time: '09:00 AM - 11:30 AM',
    hall: 'Hall A - Science Block',
    notes: 'Section A: Short answers; Section B: Numericals & derivations.'
  },
  {
    id: 'exam-2',
    subject: 'Mathematics',
    paperName: 'Pure Mathematics & Algebra (Paper 2)',
    board: 'FBISE / CAIE O-Level 4024',
    date: offsetDate(7),
    time: '09:00 AM - 11:30 AM',
    hall: 'Examination Hall 2',
    notes: 'Scientific calculator and geometry instruments required.'
  },
  {
    id: 'exam-3',
    subject: 'Chemistry',
    paperName: 'Inorganic & Physical Chemistry (Paper 1)',
    board: 'FBISE / CAIE O-Level 5070',
    date: offsetDate(12),
    time: '02:00 PM - 04:30 PM',
    hall: 'Chemistry Lab Hall',
    notes: 'Focus on Stoichiometry, Periodic Trends, and Salt Preparation.'
  },
  {
    id: 'exam-4',
    subject: 'Biology',
    paperName: 'Theory & ATP (Paper 1 & 6)',
    board: 'FBISE / CAIE O-Level 5090',
    date: offsetDate(18),
    time: '09:00 AM - 11:00 AM',
    hall: 'Main Auditorium',
    notes: 'Review Enzyme temperature graphs and Genetics Punnett squares.'
  },
  {
    id: 'exam-past-1',
    subject: 'English Language',
    paperName: 'Directed Writing & Composition',
    board: 'FBISE / CAIE O-Level 1123',
    date: offsetDate(-4), // Passed exam to demonstrate past exam handling
    time: '09:00 AM - 11:00 AM',
    hall: 'Hall B',
    notes: 'First paper concluded successfully.'
  }
];

export const INITIAL_SYLLABUS = [
  {
    subject: 'Mathematics',
    code: 'MATH-10',
    topics: [
      { id: 'math-top-1', name: 'Quadratic Equations', chapter: 'Chapter 1', status: 'completed' },
      { id: 'math-top-2', name: 'Matrices & Determinants', chapter: 'Chapter 2', status: 'in-progress' },
      { id: 'math-top-3', name: 'Trigonometry', chapter: 'Chapter 3', status: 'completed' },
      { id: 'math-top-4', name: 'Coordinate Geometry & Circle Theorems', chapter: 'Chapter 4', status: 'not-started' },
      { id: 'math-top-5', name: 'Statistics & Probability Distributions', chapter: 'Chapter 5', status: 'not-started' }
    ]
  },
  {
    subject: 'Physics',
    code: 'PHY-10',
    topics: [
      { id: 'phy-top-1', name: 'Kinematics & Dynamics', chapter: 'Unit 2 & 3', status: 'completed' },
      { id: 'phy-top-2', name: 'Work, Power & Energy', chapter: 'Unit 4', status: 'completed' },
      { id: 'phy-top-3', name: 'Wave Motion & Sound', chapter: 'Unit 10', status: 'completed' },
      { id: 'phy-top-4', name: 'Current Electricity', chapter: 'Unit 14', status: 'in-progress' },
      { id: 'phy-top-5', name: 'Electromagnetism & Atomic Physics', chapter: 'Unit 15 & 18', status: 'not-started' }
    ]
  },
  {
    subject: 'Chemistry',
    code: 'CHEM-10',
    topics: [
      { id: 'chem-top-1', name: 'Atomic Structure & Chemical Bonding', chapter: 'Chapter 2 & 4', status: 'completed' },
      { id: 'chem-top-2', name: 'Stoichiometry & Mole Concept', chapter: 'Chapter 1', status: 'in-progress' },
      { id: 'chem-top-3', name: 'Periodic Table & Periodicity', chapter: 'Chapter 3', status: 'completed' },
      { id: 'chem-top-4', name: 'Acids, Bases & Salts', chapter: 'Chapter 10', status: 'in-progress' },
      { id: 'chem-top-5', name: 'Organic Chemistry & Hydrocarbons', chapter: 'Chapter 11', status: 'not-started' }
    ]
  },
  {
    subject: 'Biology',
    code: 'BIO-10',
    topics: [
      { id: 'bio-top-1', name: 'Cell Biology & Enzymes', chapter: 'Chapter 1 & 2', status: 'completed' },
      { id: 'bio-top-2', name: 'Respiration & Gas Exchange', chapter: 'Chapter 10', status: 'in-progress' },
      { id: 'bio-top-3', name: 'Transport in Living Organisms', chapter: 'Chapter 9', status: 'not-started' },
      { id: 'bio-top-4', name: 'Genetics & Inheritance', chapter: 'Chapter 15', status: 'completed' },
      { id: 'bio-top-5', name: 'Ecology & Environmental Biology', chapter: 'Chapter 16', status: 'not-started' }
    ]
  },
  {
    subject: 'Computer Science',
    code: 'CS-10',
    topics: [
      { id: 'cs-top-1', name: 'Number Systems & Boolean Logic', chapter: 'Unit 1', status: 'completed' },
      { id: 'cs-top-2', name: 'Algorithms & Flowcharts', chapter: 'Unit 2', status: 'completed' },
      { id: 'cs-top-3', name: 'Programming Basics (Control Structures)', chapter: 'Unit 3', status: 'in-progress' },
      { id: 'cs-top-4', name: 'Database Fundamentals', chapter: 'Unit 5', status: 'not-started' }
    ]
  },
  {
    subject: 'English',
    code: 'ENG-10',
    topics: [
      { id: 'eng-top-1', name: 'Grammar & Composition', chapter: 'Module 1', status: 'completed' },
      { id: 'eng-top-2', name: 'Direct & Indirect Speech', chapter: 'Module 2', status: 'completed' },
      { id: 'eng-top-3', name: 'Comprehension & Vocabulary', chapter: 'Module 3', status: 'in-progress' },
      { id: 'eng-top-4', name: 'Essay & Directed Formal Writing', chapter: 'Module 4', status: 'in-progress' }
    ]
  }
];

export const INITIAL_QUIZ_HISTORY = [
  {
    id: 'quiz-attempt-1',
    date: offsetDate(-1),
    score: 11,
    total: 15,
    percentage: 73,
    timeSpentSeconds: 245,
    incorrectTopicList: [
      { subject: 'Mathematics', topic: 'Matrices & Determinants', questionId: 'math-2' },
      { subject: 'Physics', topic: 'Current Electricity', questionId: 'phy-2' },
      { subject: 'Chemistry', topic: 'Acids, Bases & Salts', questionId: 'chem-3' },
      { subject: 'Biology', topic: 'Respiration & Gas Exchange', questionId: 'bio-2' }
    ]
  }
];
