// Authentic Past Paper Questions & Marking Schemes for StudyOS
// Covering Federal Board (FBISE Islamabad), Punjab Boards (BISE), and Cambridge O-Level (CAIE)
// Years: 2024, 2023, 2022, 2021

export const PAST_PAPERS_DATABASE = [
  // ==========================================
  // PHYSICS
  // ==========================================
  {
    id: 'pp-phy-2024-fbise-1',
    subject: 'Physics',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2024,
    session: 'Annual Examination',
    paperType: 'Section B (Short Answers)',
    topic: 'Kinematics & Dynamics',
    chapter: 'Unit 2: Kinematics',
    marks: 4,
    questionText: 'A car starts from rest and accelerates uniformly at 2.5 m/s² for 12 seconds. Calculate: (i) The final velocity acquired by the car, (ii) The total distance travelled during this time.',
    markingScheme: [
      '1 mark: Correct formula for final velocity (v_f = v_i + at)',
      '1 mark: Substitution and correct calculation: v_f = 0 + (2.5 × 12) = 30 m/s',
      '1 mark: Correct formula for distance (S = v_i*t + 0.5*a*t² or v_f² - v_i² = 2aS)',
      '1 mark: Substitution and correct calculation: S = 0 + 0.5(2.5)(144) = 180 m with proper units'
    ],
    modelAnswer: `(i) Given:
v_i = 0 m/s (starts from rest)
a = 2.5 m/s²
t = 12 s

Using 1st equation of motion:
v_f = v_i + at
v_f = 0 + (2.5 × 12) = 30 m/s.

(ii) Using 2nd equation of motion:
S = v_i × t + 0.5 × a × t²
S = (0 × 12) + 0.5 × 2.5 × (12)²
S = 0 + 0.5 × 2.5 × 144
S = 1.25 × 144 = 180 m.

Result:
Final velocity = 30 m/s
Total distance = 180 m.`,
    examinerTip: 'Federal Board deducts 0.5 marks if final units (m/s or m) are omitted.'
  },
  {
    id: 'pp-phy-2023-caie-1',
    subject: 'Physics',
    board: 'Cambridge O-Level (CAIE 5054)',
    curriculum: 'O-Level',
    year: 2023,
    session: 'May / June',
    paperType: 'Paper 2 (Theory)',
    topic: 'Current Electricity',
    chapter: 'Unit 14: Direct Current Circuits',
    marks: 5,
    questionText: 'Two resistors of resistance 6.0 Ω and 12.0 Ω are connected in parallel across a 12.0 V battery of negligible internal resistance. (a) Calculate the combined equivalent resistance of the circuit. (b) Calculate the total current drawn from the battery.',
    markingScheme: [
      '1 mark: Stating 1/R_p = 1/R_1 + 1/R_2',
      '2 marks: Correct substitution and calculation: 1/R_p = 1/6 + 1/12 = 3/12 => R_p = 4.0 Ω',
      '1 mark: Stating Ohm’s law I = V / R',
      '1 mark: Final current calculation: I = 12.0 / 4.0 = 3.0 A'
    ],
    modelAnswer: `(a) For resistors in parallel:
1 / R_equivalent = 1 / R₁ + 1 / R₂
1 / R_equivalent = 1 / 6.0 + 1 / 12.0
1 / R_equivalent = (2 + 1) / 12.0 = 3.0 / 12.0
R_equivalent = 12.0 / 3.0 = 4.0 Ω.

(b) Total current using Ohm's Law:
I = V / R_equivalent
I = 12.0 V / 4.0 Ω = 3.0 A.`,
    examinerTip: 'Cambridge examiners look for the reciprocal inversion step. Many candidates calculate 3/12 and write 0.25 Ω as equivalent resistance.'
  },
  {
    id: 'pp-phy-2022-fbise-1',
    subject: 'Physics',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2022,
    session: 'Annual Examination',
    paperType: 'Section C (Long Questions)',
    topic: 'Work, Power & Energy',
    chapter: 'Unit 4: Work and Energy',
    marks: 6,
    questionText: 'Define Kinetic Energy and derive its mathematical formula K.E = 1/2 mv² when a body of mass m is brought to rest by an opposing force F over a distance S.',
    markingScheme: [
      '1 mark: Complete definition of Kinetic Energy as the energy possessed by a body due to its motion.',
      '1 mark: Stating Work done against opposing force: W = F × S',
      '1 mark: Applying Newton’s 2nd Law F = ma => a = -F/m (deceleration)',
      '1 mark: Applying 3rd equation of motion: 2aS = v_f² - v_i²',
      '2 marks: Substitution of v_f = 0, v_i = v and final derivation K.E = 1/2 mv²'
    ],
    modelAnswer: `Definition:
Kinetic energy is the energy possessed by an object on account of its motion.

Derivation:
Consider a body of mass 'm' moving with initial velocity 'v'. Let a constant opposing force 'F' act on it, bringing it to rest after covering distance 'S'.

Final velocity: v_f = 0
Initial velocity: v_i = v
Opposing force: F = ma  => a = -F / m (retardation)

Using third equation of motion:
2 a S = v_f² - v_i²
2 (-F / m) S = 0 - v²
- (2 F S) / m = - v²
2 F S = m v²
F S = 1/2 m v²

Since Work Done = Kinetic Energy (K.E = W = F × S):
K.E = 1/2 m v² (Proved).`,
    examinerTip: 'Always mention that final velocity v_f = 0 because the opposing force halts the body.'
  },
  {
    id: 'pp-phy-2021-bise-1',
    subject: 'Physics',
    board: 'Punjab Board (BISE Lahore)',
    curriculum: 'Matric',
    year: 2021,
    session: 'Annual Examination',
    paperType: 'Section B (Conceptual)',
    topic: 'Wave Motion & Sound',
    chapter: 'Unit 10: Simple Harmonic Motion',
    marks: 3,
    questionText: 'Why does sound travel faster in solids than in liquids and gases? Explain on the basis of elasticity and density.',
    markingScheme: [
      '1 mark: Mentioning particle packing and intermolecular distance',
      '1 mark: Explaining modulus of elasticity in solids vs liquids/gases',
      '1 mark: Conclusion that high elasticity overrules density difference'
    ],
    modelAnswer: `Sound is a mechanical longitudinal wave that propagates through particle collisions.
1. In solids, atoms are tightly packed with very strong intermolecular forces and high elasticity (bulk modulus).
2. When a solid particle vibrates, it immediately transfers kinetic energy to adjacent particles with minimal delay.
3. Although solids are denser, their elasticity is vastly higher than gases, resulting in sound speeds around 5000 m/s in steel versus ~340 m/s in air.`,
    examinerTip: 'Do not simply say "solids are hard." Use scientific terms like elastic modulus and atomic packing.'
  },

  // ==========================================
  // MATHEMATICS
  // ==========================================
  {
    id: 'pp-math-2024-fbise-1',
    subject: 'Mathematics',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2024,
    session: 'Annual Examination',
    paperType: 'Section B (Algebra)',
    topic: 'Quadratic Equations',
    chapter: 'Chapter 1: Quadratic Equations',
    marks: 4,
    questionText: 'Solve the equation by completing the square method: 2x² - 5x - 3 = 0.',
    markingScheme: [
      '1 mark: Dividing equation by 2: x² - (5/2)x - 3/2 = 0 and shifting constant',
      '1 mark: Adding (b/2a)² = (5/4)² = 25/16 to both sides',
      '1 mark: Writing as complete square (x - 5/4)² = 49/16',
      '1 mark: Taking square root and arriving at solution set { -1/2, 3 }'
    ],
    modelAnswer: `Given: 2x² - 5x - 3 = 0

Step 1: Divide by 2:
x² - (5/2)x - 3/2 = 0
x² - (5/2)x = 3/2

Step 2: Add [1/2 × (5/2)]² = (5/4)² = 25/16 to both sides:
x² - 2(x)(5/4) + (5/4)² = 3/2 + 25/16
(x - 5/4)² = (24 + 25) / 16
(x - 5/4)² = 49 / 16

Step 3: Take square root on both sides:
x - 5/4 = ± √(49/16)
x - 5/4 = ± 7/4

Step 4: Solve for x:
Case 1: x = 5/4 + 7/4 = 12/4 = 3
Case 2: x = 5/4 - 7/4 = -2/4 = -1/2

Solution Set = { -1/2, 3 }.`,
    examinerTip: 'Ensure both ± cases are shown clearly; omitting the minus root loses 1 whole mark.'
  },
  {
    id: 'pp-math-2023-caie-1',
    subject: 'Mathematics',
    board: 'Cambridge O-Level (CAIE 4024)',
    curriculum: 'O-Level',
    year: 2023,
    session: 'May / June',
    paperType: 'Paper 2 (Calculator)',
    topic: 'Matrices & Determinants',
    chapter: 'Chapter 2: Matrices',
    marks: 5,
    questionText: 'Given the matrix M = [[4, -2], [3, 1]]: (a) Find the determinant of M. (b) Write down the inverse matrix M⁻¹. (c) Hence solve the simultaneous equations: 4x - 2y = 10, 3x + y = 15.',
    markingScheme: [
      '1 mark: Determinant calculation: (4)(1) - (-2)(3) = 4 + 6 = 10',
      '1 mark: Adjoint matrix: [[1, 2], [-3, 4]]',
      '1 mark: M⁻¹ = 1/10 × [[1, 2], [-3, 4]]',
      '2 marks: Matrix multiplication [[x], [y]] = M⁻¹ × [[10], [15]] yielding x = 4, y = 3'
    ],
    modelAnswer: `(a) Determinant:
det(M) = (4 × 1) - (-2 × 3) = 4 - (-6) = 10.

(b) Inverse M⁻¹:
adj(M) = [[1, 2], [-3, 4]]
M⁻¹ = (1 / 10) × [[1, 2], [-3, 4]]

(c) Matrix equation:
[[4, -2], [3, 1]] [[x], [y]] = [[10], [15]]
[[x], [y]] = M⁻¹ × [[10], [15]]
[[x], [y]] = (1 / 10) × [ [(1×10) + (2×15)], [(-3×10) + (4×15)] ]
[[x], [y]] = (1 / 10) × [ [10 + 30], [-30 + 60] ]
[[x], [y]] = (1 / 10) × [ [40], [30] ]
[[x], [y]] = [[4], [3]]

Solution: x = 4, y = 3.`,
    examinerTip: 'The keyword "Hence" means candidates MUST use the inverse matrix found in part (b), not standard algebraic substitution.'
  },
  {
    id: 'pp-math-2022-fbise-1',
    subject: 'Mathematics',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2022,
    session: 'Annual Examination',
    paperType: 'Section C (Trigonometry)',
    topic: 'Trigonometry',
    chapter: 'Chapter 7: Trigonometry',
    marks: 4,
    questionText: 'Prove the fundamental trigonometric identity: (sin θ / (1 + cos θ)) + ((1 + cos θ) / sin θ) = 2 cosec θ.',
    markingScheme: [
      '1 mark: Taking Left Hand Side (LHS) and finding common denominator sin θ(1 + cos θ)',
      '1 mark: Expanding numerator: sin²θ + (1 + cos θ)² = sin²θ + 1 + 2cos θ + cos²θ',
      '1 mark: Grouping sin²θ + cos²θ = 1 to get 2 + 2cos θ = 2(1 + cos θ)',
      '1 mark: Cancelling (1 + cos θ) and simplifying to 2/sin θ = 2 cosec θ (RHS)'
    ],
    modelAnswer: `LHS = (sin θ / (1 + cos θ)) + ((1 + cos θ) / sin θ)

Step 1: Take common denominator:
= [ sin²θ + (1 + cos θ)² ] / [ sin θ (1 + cos θ) ]

Step 2: Expand numerator:
= [ sin²θ + 1 + 2 cos θ + cos²θ ] / [ sin θ (1 + cos θ) ]

Step 3: Use Pythagorean identity sin²θ + cos²θ = 1:
= [ (sin²θ + cos²θ) + 1 + 2 cos θ ] / [ sin θ (1 + cos θ) ]
= [ 1 + 1 + 2 cos θ ] / [ sin θ (1 + cos θ) ]
= [ 2 + 2 cos θ ] / [ sin θ (1 + cos θ) ]

Step 4: Factor out 2:
= [ 2 (1 + cos θ) ] / [ sin θ (1 + cos θ) ]
= 2 / sin θ
= 2 cosec θ = RHS (Proved).`,
    examinerTip: 'Keep LHS and RHS separate during a proof; do not cross-multiply terms across the equality sign.'
  },

  // ==========================================
  // CHEMISTRY
  // ==========================================
  {
    id: 'pp-chem-2024-fbise-1',
    subject: 'Chemistry',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2024,
    session: 'Annual Examination',
    paperType: 'Section B (Stoichiometry)',
    topic: 'Stoichiometry & Mole Concept',
    chapter: 'Chapter 1: Fundamentals of Chemistry',
    marks: 4,
    questionText: 'Calculate the number of moles and molecules present in 9.0 grams of pure water (H₂O). (Molar mass of H = 1 g/mol, O = 16 g/mol, N_A = 6.022 × 10²³).',
    markingScheme: [
      '1 mark: Calculation of molar mass of H₂O = (2×1) + 16 = 18 g/mol',
      '1 mark: Calculation of moles = mass / molar mass = 9.0 / 18 = 0.50 moles',
      '1 mark: Stating formula: Number of molecules = moles × N_A',
      '1 mark: Correct calculation: 0.50 × 6.022 × 10²³ = 3.011 × 10²³ molecules'
    ],
    modelAnswer: `Given:
Mass of H₂O = 9.0 g

1. Molar mass of H₂O:
= (2 × 1.0) + (1 × 16.0) = 18.0 g/mol

2. Number of moles (n):
n = Mass in grams / Molar mass
n = 9.0 g / 18.0 g/mol = 0.50 moles

3. Number of molecules (N):
N = n × Avogadro's Number (N_A)
N = 0.50 × 6.022 × 10²³
N = 3.011 × 10²³ molecules.

Final Answer:
Moles = 0.50 mol
Molecules = 3.011 × 10²³ molecules.`,
    examinerTip: 'Ensure scientific notation is retained (10²³). Do not convert to raw decimals.'
  },
  {
    id: 'pp-chem-2023-caie-1',
    subject: 'Chemistry',
    board: 'Cambridge O-Level (CAIE 5070)',
    curriculum: 'O-Level',
    year: 2023,
    session: 'May / June',
    paperType: 'Paper 2 (Theory)',
    topic: 'Acids, Bases & Salts',
    chapter: 'Chapter 8: Acids, Bases and Salts',
    marks: 4,
    questionText: 'Describe the preparation of pure, dry crystals of zinc sulfate (ZnSO₄) starting from insoluble zinc carbonate (ZnCO₃) and dilute sulfuric acid (H₂SO₄).',
    markingScheme: [
      '1 mark: Adding excess zinc carbonate powder to warm dilute sulfuric acid until effervescence stops',
      '1 mark: Filtering the reaction mixture to remove unreacted excess zinc carbonate',
      '1 mark: Heating the filtrate to point of crystallization and letting it cool slowly to crystallize',
      '1 mark: Filtering crystals and drying between sheets of filter paper'
    ],
    modelAnswer: `Step 1 (Reaction):
Add excess solid zinc carbonate (ZnCO₃) to a beaker of warm dilute sulfuric acid (H₂SO₄) with continuous stirring until fizzing (effervescence of CO₂) stops and excess powder remains at the bottom.
Equation: ZnCO₃(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂O(l) + CO₂(g)

Step 2 (Filtration):
Filter the warm mixture through filter paper in a funnel to remove unreacted insoluble excess ZnCO₃. Collect the zinc sulfate solution as filtrate.

Step 3 (Crystallization):
Heat the clear filtrate in an evaporating dish until the crystallization point is reached (tested by a glass rod forming crystals). Allow the saturated solution to cool slowly at room temperature to form large crystals.

Step 4 (Drying):
Filter off the crystals and dry them gently between two sheets of filter paper (do not bake in high heat, or anhydrous powder forms).`,
    examinerTip: 'Always mention adding "excess" carbonate to ensure all acid is neutralized, and specify drying between filter papers.'
  },

  // ==========================================
  // BIOLOGY
  // ==========================================
  {
    id: 'pp-bio-2024-fbise-1',
    subject: 'Biology',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2024,
    session: 'Annual Examination',
    paperType: 'Section B (Short Answers)',
    topic: 'Respiration & Gas Exchange',
    chapter: 'Chapter 10: Gaseous Exchange',
    marks: 4,
    questionText: 'Enumerate four structural adaptations of human alveoli that facilitate efficient gaseous exchange between air and pulmonary blood capillaries.',
    markingScheme: [
      '1 mark: Extremely large surface area (millions of microscopic alveoli)',
      '1 mark: Extremely thin diffusion barrier (one cell thick epithelial wall)',
      '1 mark: Dense surrounding network of capillaries providing rich blood supply',
      '1 mark: Moist inner lining to allow gases to dissolve before diffusing'
    ],
    modelAnswer: `Four structural adaptations of human alveoli:
1. **Large Surface Area**: Humans possess roughly 700 million alveoli, providing a massive surface area (~70-90 m²) for gaseous exchange.
2. **One-Cell Thin Walls**: The alveolar wall consists of a single layer of squamous epithelial cells (~0.1 μm), minimizing diffusion distance for O₂ and CO₂.
3. **Extensive Capillary Network**: Each alveolus is wrapped in an abundant network of pulmonary capillaries, maintaining a steep concentration gradient.
4. **Moist Surface**: The inner surface is lined with a thin film of moisture containing surfactant; gases dissolve in this liquid film before rapid diffusion.`,
    examinerTip: 'State the adaptation AND explain how it assists diffusion (e.g., thin wall reduces diffusion distance).'
  },
  {
    id: 'pp-bio-2023-caie-1',
    subject: 'Biology',
    board: 'Cambridge O-Level (CAIE 5090)',
    curriculum: 'O-Level',
    year: 2023,
    session: 'May / June',
    paperType: 'Paper 2 (Structured)',
    topic: 'Cell Biology & Enzymes',
    chapter: 'Chapter 5: Enzymes',
    marks: 4,
    questionText: 'Explain why human salivary amylase functions optimally at 37 °C but becomes completely inactive when heated to 70 °C.',
    markingScheme: [
      '1 mark: Amylase is a globular protein with a specific 3D active site complementary to starch',
      '1 mark: At 37 °C, kinetic energy gives optimal collisions between enzyme and substrate',
      '1 mark: At 70 °C, high thermal energy breaks hydrogen and ionic bonds stabilizing tertiary structure',
      '1 mark: Active site alters shape permanently (denaturation); substrate can no longer bind to form enzyme-substrate complex'
    ],
    modelAnswer: `1. **At 37 °C (Optimum Temperature)**:
Amylase and its substrate (starch) possess sufficient kinetic energy for frequent successful collisions. The complementary active site binds starch molecules rapidly to form enzyme-substrate complexes.

2. **At 70 °C (Denaturation)**:
Excessive thermal energy causes intense vibrations that rupture the delicate hydrogen and ionic bonds maintaining the enzyme's specific 3-dimensional tertiary structure.
The active site permanently loses its complementary shape (the enzyme is **denatured**). Starch can no longer fit into the deformed active site, halting catalytic activity permanently.`,
    examinerTip: 'Never say the enzyme "dies" or "is killed"; enzymes are non-living biological catalysts, so the correct scientific term is "denatured".'
  },

  // ==========================================
  // COMPUTER SCIENCE
  // ==========================================
  {
    id: 'pp-cs-2024-fbise-1',
    subject: 'Computer Science',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2024,
    session: 'Annual Examination',
    paperType: 'Section B (Number Systems)',
    topic: 'Number Systems & Boolean Logic',
    chapter: 'Unit 1: Systems Architecture',
    marks: 4,
    questionText: 'Convert the decimal number 142 into: (i) Binary (8-bit representation), (ii) Hexadecimal.',
    markingScheme: [
      '2 marks: Step-by-step division by 2 showing remainders yielding 10001110_2',
      '2 marks: Division by 16 showing 142 / 16 = 8 remainder 14 (E), yielding 8E_16'
    ],
    modelAnswer: `(i) Decimal to Binary Conversion:
142 ÷ 2 = 71, Remainder = 0 (LSB)
71 ÷ 2  = 35, Remainder = 1
35 ÷ 2  = 17, Remainder = 1
17 ÷ 2  = 8,  Remainder = 1
8 ÷ 2   = 4,  Remainder = 0
4 ÷ 2   = 2,  Remainder = 0
2 ÷ 2   = 1,  Remainder = 0
1 ÷ 2   = 0,  Remainder = 1 (MSB)

Reading remainders from bottom to top:
Binary = 10001110₂ (8-bit byte).

(ii) Decimal to Hexadecimal Conversion:
142 ÷ 16 = 8 with a remainder of 14.
In Hexadecimal, remainder 14 is represented as 'E'.
8 ÷ 16 = 0 with a remainder of 8.

Reading remainders from bottom to top:
Hexadecimal = 8E₁₆.`,
    examinerTip: 'Remember that remainder 10=A, 11=B, 12=C, 13=D, 14=E, 15=F in hexadecimal.'
  },

  // ==========================================
  // ENGLISH LANGUAGE
  // ==========================================
  {
    id: 'pp-eng-2023-fbise-1',
    subject: 'English',
    board: 'FBISE (Federal Board)',
    curriculum: 'Matric',
    year: 2023,
    session: 'Annual Examination',
    paperType: 'Section B (Grammar)',
    topic: 'Direct & Indirect Speech',
    chapter: 'Grammar & Mechanics',
    marks: 4,
    questionText: 'Change the narration of the following sentences into Indirect Speech: (a) He said to me, "Are you preparing for the final exams?" (b) The teacher said, "Water boils at 100 degrees Celsius."',
    markingScheme: [
      '2 marks: Sentence (a): Changing reporting verb to asked, using if/whether, changing tense and pronouns: He asked me if I was preparing for the final exams.',
      '2 marks: Sentence (b): Recognizing universal scientific truth (tense remains present): The teacher said that water boils at 100 degrees Celsius.'
    ],
    modelAnswer: `(a) Direct: He said to me, "Are you preparing for the final exams?"
Indirect: He asked me if (or whether) I was preparing for the final exams.
Explanation: Reporting verb becomes 'asked', interrogative structure becomes assertive, present continuous 'are preparing' shifts to past continuous 'was preparing'.

(b) Direct: The teacher said, "Water boils at 100 degrees Celsius."
Indirect: The teacher said that water boils at 100 degrees Celsius.
Explanation: Since the reported clause expresses a universal scientific fact, its tense does NOT change to past tense.`,
    examinerTip: 'Students frequently make the mistake of changing universal scientific truths into past tense ("boiled"). Watch out for this trap!'
  }
];

// Mock Exam Paper Generator Templates
export const BOARD_EXAM_TEMPLATES = {
  Matric: {
    title: 'Secondary School Certificate (SSC Part-II) Annual Examination',
    boards: ['Federal Board (FBISE Islamabad)', 'Punjab Board (BISE Lahore / Rawalpindi)'],
    standardTime: '2 Hours 15 Minutes',
    totalMarks: 50,
    instructions: [
      'Write your Roll Number clearly in the designated box.',
      'Answer all questions in Section A (Objective).',
      'Attempt any FIVE questions from Section B (Short Conceptual Questions).',
      'Attempt any TWO questions from Section C (Extensive / Numerical Problems).',
      'Calculators and geometric instruments are permitted where indicated.'
    ]
  },
  'O-Level': {
    title: 'Cambridge Assessment International Education (CAIE) O-Level',
    boards: ['Cambridge O-Level (CAIE 5054 / 4024 / 5070 / 5090)'],
    standardTime: '2 Hours 00 Minutes',
    totalMarks: 75,
    instructions: [
      'Write your Centre Number, Candidate Number, and Name in the spaces provided.',
      'Answer all questions in Section A and Section B.',
      'Give non-exact numerical answers to 3 significant figures, or 1 decimal place for angles in degrees.',
      'Show all necessary intermediate working; marks may be deducted for omitted steps.',
      'You are reminded of the need for good English and clear presentation.'
    ]
  }
};
