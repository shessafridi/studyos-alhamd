// Curriculum-aligned demonstration quiz questions for Matric and O-Level students
// Covering Mathematics, Physics, Chemistry, Biology, and English.
// Topics are mapped to the syllabus tracker to enable smart revision recommendations.

export const QUIZ_QUESTIONS = [
  // --- MATHEMATICS ---
  {
    id: 'math-1',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    gradeLevel: 'Matric / O-Level',
    question: 'What are the roots of the quadratic equation x² - 5x + 6 = 0?',
    options: ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = 5'],
    correctIndex: 0,
    explanation: 'Factoring the quadratic: (x - 2)(x - 3) = 0. Therefore, x = 2 or x = 3. Both values satisfy the equation 2² - 5(2) + 6 = 0 and 3² - 5(3) + 6 = 0.'
  },
  {
    id: 'math-2',
    subject: 'Mathematics',
    topic: 'Matrices & Determinants',
    gradeLevel: 'Matric / O-Level',
    question: 'For a 2×2 matrix A = [[3, 2], [1, 4]], what is the determinant |A|?',
    options: ['10', '14', '12', '7'],
    correctIndex: 0,
    explanation: 'For matrix [[a, b], [c, d]], the determinant is calculated as (a × d) - (b × c). Here: (3 × 4) - (2 × 1) = 12 - 2 = 10.'
  },
  {
    id: 'math-3',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    gradeLevel: 'Matric / O-Level',
    question: 'In a right-angled triangle, if sin(θ) = 3/5, what is the value of cos(θ) for an acute angle θ?',
    options: ['4/5', '3/4', '5/4', '1/5'],
    correctIndex: 0,
    explanation: 'Using the fundamental identity sin²(θ) + cos²(θ) = 1: cos²(θ) = 1 - (3/5)² = 1 - 9/25 = 16/25. Taking the square root gives cos(θ) = 4/5.'
  },

  // --- PHYSICS ---
  {
    id: 'phy-1',
    subject: 'Physics',
    topic: 'Kinematics & Dynamics',
    gradeLevel: 'Matric / O-Level',
    question: 'According to Newton’s Second Law of Motion (F = ma), what net force is required to accelerate a 4 kg cart at 3 m/s²?',
    options: ['12 N', '7 N', '1.33 N', '0.75 N'],
    correctIndex: 0,
    explanation: 'Force equals mass multiplied by acceleration: F = 4 kg × 3 m/s² = 12 Newtons (N).'
  },
  {
    id: 'phy-2',
    subject: 'Physics',
    topic: 'Current Electricity',
    gradeLevel: 'Matric / O-Level',
    question: 'A 12 V accumulator is connected across a fixed resistor of 4 Ω. What is the electric current flowing through the circuit?',
    options: ['3 A', '48 A', '8 A', '0.33 A'],
    correctIndex: 0,
    explanation: 'By Ohm’s Law, V = I × R, which rearranges to I = V / R. Here, I = 12 V / 4 Ω = 3 Amperes (A).'
  },
  {
    id: 'phy-3',
    subject: 'Physics',
    topic: 'Wave Motion & Sound',
    gradeLevel: 'Matric / O-Level',
    question: 'Which property of a sound wave directly determines its perceived loudness to the human ear?',
    options: ['Amplitude', 'Frequency', 'Speed of sound', 'Wavelength'],
    correctIndex: 0,
    explanation: 'Loudness is primarily determined by the amplitude of sound wave oscillations. Greater amplitude transfers higher acoustic energy.'
  },

  // --- CHEMISTRY ---
  {
    id: 'chem-1',
    subject: 'Chemistry',
    topic: 'Atomic Structure & Chemical Bonding',
    gradeLevel: 'Matric / O-Level',
    question: 'How many valence electrons does a neutral Carbon atom (Atomic Number = 6) possess in its outermost shell?',
    options: ['4', '2', '6', '8'],
    correctIndex: 0,
    explanation: 'Carbon has electron configuration 1s² 2s² 2p² (or 2, 4 in K, L shells). The outermost shell (L) contains 4 valence electrons.'
  },
  {
    id: 'chem-2',
    subject: 'Chemistry',
    topic: 'Stoichiometry & Mole Concept',
    gradeLevel: 'Matric / O-Level',
    question: 'What is the molar mass of pure water (H₂O), given atomic masses H = 1 g/mol and O = 16 g/mol?',
    options: ['18 g/mol', '17 g/mol', '33 g/mol', '34 g/mol'],
    correctIndex: 0,
    explanation: 'Molar mass of H₂O = (2 × 1) + 16 = 2 + 16 = 18 g/mol.'
  },
  {
    id: 'chem-3',
    subject: 'Chemistry',
    topic: 'Acids, Bases & Salts',
    gradeLevel: 'Matric / O-Level',
    question: 'What is the pH value of a pure neutral aqueous solution at standard room temperature (25°C)?',
    options: ['7', '0', '14', '1'],
    correctIndex: 0,
    explanation: 'At 25°C, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, which yields pH = -log(10⁻⁷) = 7 (neutral).'
  },

  // --- BIOLOGY ---
  {
    id: 'bio-1',
    subject: 'Biology',
    topic: 'Cell Biology & Enzymes',
    gradeLevel: 'Matric / O-Level',
    question: 'Which cellular organelle is known as the "powerhouse of the cell" because it synthesizes ATP via cellular respiration?',
    options: ['Mitochondria', 'Ribosome', 'Golgi apparatus', 'Endoplasmic reticulum'],
    correctIndex: 0,
    explanation: 'Mitochondria produce most of the chemical energy needed to power the cell’s biochemical reactions, stored in adenosine triphosphate (ATP).'
  },
  {
    id: 'bio-2',
    subject: 'Biology',
    topic: 'Respiration & Gas Exchange',
    gradeLevel: 'Matric / O-Level',
    question: 'In the human respiratory system, in which microscopic air sacs does gaseous exchange (oxygen and carbon dioxide) take place?',
    options: ['Alveoli', 'Bronchioles', 'Trachea', 'Larynx'],
    correctIndex: 0,
    explanation: 'Alveoli are tiny grape-like clusters with one-cell-thick walls surrounded by capillaries, providing a large surface area for rapid gas diffusion.'
  },
  {
    id: 'bio-3',
    subject: 'Biology',
    topic: 'Genetics & Inheritance',
    gradeLevel: 'Matric / O-Level',
    question: 'In a monohybrid cross between two heterozygous organisms (Bb × Bb), what is the expected phenotypic ratio of dominant to recessive traits?',
    options: ['3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1', '1 : 1'],
    correctIndex: 0,
    explanation: 'The genotypes produced are 1 BB, 2 Bb, and 1 bb. Because B is dominant, 3 show the dominant phenotype and 1 shows the recessive phenotype (3:1).'
  },

  // --- ENGLISH ---
  {
    id: 'eng-1',
    subject: 'English',
    topic: 'Direct & Indirect Speech',
    gradeLevel: 'Matric / O-Level',
    question: 'Convert into indirect speech: The teacher said, "I am pleased with your progress."',
    options: [
      'The teacher said that she was pleased with our progress.',
      'The teacher says that she is pleased with our progress.',
      'The teacher told that she had been pleased with our progress.',
      'The teacher said I am pleased with your progress.'
    ],
    correctIndex: 0,
    explanation: 'When reporting present continuous/simple statements in the past, "said" remains the reporting verb, pronouns shift to third person, and "am pleased" shifts to the past tense "was pleased".'
  },
  {
    id: 'eng-2',
    subject: 'English',
    topic: 'Grammar & Composition',
    gradeLevel: 'Matric / O-Level',
    question: 'Identify the sentence written in the Present Perfect Continuous tense:',
    options: [
      'Ahmad has been revising his chemistry notes since morning.',
      'Ahmad is revising his chemistry notes right now.',
      'Ahmad had revised his chemistry notes before dinner.',
      'Ahmad will be revising his chemistry notes tomorrow.'
    ],
    correctIndex: 0,
    explanation: 'The present perfect continuous formula is [has/have + been + present participle (-ing)], indicating an action that started in the past and is still ongoing.'
  },
  {
    id: 'eng-3',
    subject: 'English',
    topic: 'Comprehension & Vocabulary',
    gradeLevel: 'Matric / O-Level',
    question: 'Choose the correct subordinating conjunction: "Zainab passed the examination with flying colours _______ she prepared systematically."',
    options: ['because', 'although', 'unless', 'despite'],
    correctIndex: 0,
    explanation: '"Because" introduces the cause-and-effect relationship explaining why Zainab succeeded through systematic preparation.'
  }
];
