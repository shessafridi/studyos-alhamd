// Curriculum-authentic lesson content and knowledge repository
// Covering core topics for Matric (FBISE / BISE) and Cambridge O-Level (CAIE) in Pakistan.

export const LESSON_KNOWLEDGE_BASE = [
  // --- MATHEMATICS ---
  {
    id: 'les-math-1',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    chapter: 'Chapter 1 / Algebraic Methods',
    readingMinutes: 4,
    summary: 'A quadratic equation is a second-order polynomial equation of the standard form ax² + bx + c = 0, where a ≠ 0.',
    coreTheory: `A quadratic equation has at most two roots (solutions). It can be solved by three main techniques:
1. **Factorization**: Expressing the quadratic expression as a product of two linear factors (x - p)(x - q) = 0.
2. **Completing the Square**: Transforming the equation into the form (x + k)² = d.
3. **Quadratic Formula**: Universal formula x = (-b ± √(b² - 4ac)) / (2a).

The term (b² - 4ac) is the **Discriminant (D)**:
- If D > 0: Two distinct real roots.
- If D = 0: Two equal (repeated) real roots.
- If D < 0: No real roots (roots are complex).`,
    keyFormulas: [
      'Standard Form: ax² + bx + c = 0 (a ≠ 0)',
      'Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a',
      'Discriminant: Δ = b² - 4ac'
    ],
    workedExample: {
      problem: 'Solve the equation 2x² - 7x + 3 = 0 using the quadratic formula.',
      solution: `Step 1: Identify coefficients: a = 2, b = -7, c = 3.
Step 2: Calculate discriminant:
  Δ = (-7)² - 4(2)(3) = 49 - 24 = 25.
Step 3: Apply the formula:
  x = (-(-7) ± √25) / (2 × 2)
  x = (7 ± 5) / 4
Step 4: Branch into two solutions:
  x₁ = (7 + 5) / 4 = 12 / 4 = 3
  x₂ = (7 - 5) / 4 = 2 / 4 = 0.5
Answer: Solution set = { 0.5, 3 }.`
    },
    commonTraps: [
      'Careless sign errors with -b when b is already negative (e.g., -(-7) becomes +7, not -7).',
      'Forgetting to divide the ENTIRE numerator by 2a, not just the square root part.',
      'Forgetting to rearrange the equation to standard form (= 0) before identifying a, b, and c.'
    ],
    selfTest: {
      question: 'What is the nature of the roots of 3x² - 2x + 5 = 0?',
      answer: 'No real roots (Complex roots). Discriminant Δ = (-2)² - 4(3)(5) = 4 - 60 = -56 < 0.'
    }
  },
  {
    id: 'les-math-2',
    subject: 'Mathematics',
    topic: 'Matrices & Determinants',
    chapter: 'Chapter 2 / Linear Algebra',
    readingMinutes: 3,
    summary: 'A matrix is a rectangular array of numbers arranged in rows and columns enclosed in brackets.',
    coreTheory: `Matrices allow us to solve systems of linear equations simultaneously using Cramer\'s Rule or Matrix Inversion Method.
- **Order of Matrix**: m × n (m rows by n columns).
- **Multiplication Rule**: Matrices A and B can only be multiplied (A × B) if columns of A equal rows of B.
- **Determinant of 2×2 Matrix**: |A| = ad - bc for A = [[a, b], [c, d]].
- **Singular Matrix**: A matrix whose determinant |A| = 0 (an inverse does NOT exist).`,
    keyFormulas: [
      'Determinant |A|: (a × d) - (b × c)',
      'Adjoint adj(A): Swap main diagonal elements (a and d), negate off-diagonal elements (-b and -c)',
      'Inverse Matrix: A⁻¹ = (1 / |A|) × adj(A), provided |A| ≠ 0'
    ],
    workedExample: {
      problem: 'Find the inverse of matrix A = [[3, 2], [1, 4]].',
      solution: `Step 1: Calculate determinant |A|:
  |A| = (3 × 4) - (2 × 1) = 12 - 2 = 10. Since |A| ≠ 0, A⁻¹ exists.
Step 2: Find adjoint adj(A):
  Swap diagonal: 3 and 4 -> 4 and 3.
  Negate off-diagonal: 2 and 1 -> -2 and -1.
  adj(A) = [[4, -2], [-1, 3]].
Step 3: Multiply by 1/|A|:
  A⁻¹ = 1/10 × [[4, -2], [-1, 3]] = [[0.4, -0.2], [-0.1, 0.3]].`
    },
    commonTraps: [
      'Matrix multiplication is generally NOT commutative: A × B ≠ B × A.',
      'Attempting to find an inverse for a singular matrix where |A| = 0.',
      'Mixing up row index and column index when describing matrix dimensions (Order is Row × Column).'
    ],
    selfTest: {
      question: 'Is matrix M = [[6, 4], [3, 2]] singular or non-singular?',
      answer: 'Singular, because |M| = (6 × 2) - (4 × 3) = 12 - 12 = 0.'
    }
  },
  {
    id: 'les-math-3',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    chapter: 'Chapter 3 / Practical Geometry & Trigonometry',
    readingMinutes: 4,
    summary: 'Trigonometry studies the mathematical relationships between side lengths and angles in triangles.',
    coreTheory: `In a right-angled triangle relative to reference angle θ:
- **Sine**: sin(θ) = Opposite / Hypotenuse (Perpendicular / Hypotenuse)
- **Cosine**: cos(θ) = Adjacent / Hypotenuse (Base / Hypotenuse)
- **Tangent**: tan(θ) = Opposite / Adjacent = sin(θ) / cos(θ)

Remember the classic mnemonic: **SOH CAH TOA** (Some People Have, Curly Brown Hair, Through Proper Brushing).`,
    keyFormulas: [
      'sin²(θ) + cos²(θ) = 1 (Pythagorean Identity)',
      'tan(θ) = sin(θ) / cos(θ)',
      '1 + tan²(θ) = sec²(θ)'
    ],
    workedExample: {
      problem: 'A ladder 10 meters long leans against a wall, making an angle of 60° with the ground. How high up the wall does it reach?',
      solution: `Step 1: Hypotenuse = 10 m, Angle θ = 60°, Wall height = Opposite (h).
Step 2: Use sin(θ) = Opposite / Hypotenuse:
  sin(60°) = h / 10
Step 3: Since sin(60°) = √3 / 2 ≈ 0.866:
  h = 10 × 0.866 = 8.66 meters.
Answer: The ladder reaches 8.66 meters high.`
    },
    commonTraps: [
      'Using wrong opposite and adjacent sides by confusing the reference angle with the other acute angle.',
      'Having the scientific calculator in Radian (R) mode instead of Degree (D) mode during board examinations.'
    ],
    selfTest: {
      question: 'If cos(θ) = 0.6, find sin(θ) for an acute angle θ.',
      answer: 'sin(θ) = √(1 - 0.6²) = √(1 - 0.36) = √0.64 = 0.8.'
    }
  },

  // --- PHYSICS ---
  {
    id: 'les-phy-1',
    subject: 'Physics',
    topic: 'Kinematics & Dynamics',
    chapter: 'Units 2 & 3 / Mechanics',
    readingMinutes: 5,
    summary: 'Dynamics studies how forces cause bodies to change velocity and accelerate according to Newton\'s laws.',
    coreTheory: `**Newton\'s Three Laws of Motion**:
1. **First Law (Inertia)**: A body remains at rest or continues moving with uniform velocity unless acted upon by a net external force.
2. **Second Law (Momentum & Force)**: Net force produces acceleration directly proportional to force and inversely proportional to mass: F = ma.
3. **Third Law (Action & Reaction)**: To every action there is always an equal and opposite reaction acting on two DIFFERENT bodies.

**Friction**: Opposes relative motion between two contacting surfaces: f = μR.`,
    keyFormulas: [
      'Second Law: F = m × a (Force in Newtons, mass in kg, acc in m/s²)',
      'Equations of Motion: v = u + at | s = ut + ½at² | 2as = v² - u²',
      'Linear Momentum: p = m × v'
    ],
    workedExample: {
      problem: 'A 1200 kg car traveling at 20 m/s brakes uniformly to a stop over a distance of 40 m. Find the braking force.',
      solution: `Step 1: Given: mass m = 1200 kg, initial velocity u = 20 m/s, final velocity v = 0, distance s = 40 m.
Step 2: Use 3rd equation of motion to find acceleration a:
  2as = v² - u²
  2 × a × 40 = 0² - 20²
  80a = -400  =>  a = -5 m/s² (deceleration)
Step 3: Calculate braking force using F = ma:
  F = 1200 kg × (-5 m/s²) = -6000 N.
Answer: The braking force is 6000 Newtons in the direction opposite to motion.`
    },
    commonTraps: [
      'Forgetting that Action and Reaction forces NEVER act on the same object (they act on two different bodies).',
      'Failing to convert grams to kilograms (kg) before calculating force in Newtons.'
    ],
    selfTest: {
      question: 'What is the net force on an object moving with a constant velocity of 50 m/s in a straight line?',
      answer: 'Zero Newtons. Constant velocity means acceleration a = 0, therefore net force F = ma = 0.'
    }
  },
  {
    id: 'les-phy-2',
    subject: 'Physics',
    topic: 'Current Electricity',
    chapter: 'Unit 14 / Electricity & Magnetism',
    readingMinutes: 4,
    summary: 'Current electricity is the flow of electric charge (electrons) through conductors driven by a potential difference.',
    coreTheory: `**Ohm\'s Law**: The electric current flowing through a conductor is directly proportional to the potential difference across its terminals, provided temperature remains constant.
- **Formula**: V = I × R.

**Circuit Configurations**:
- **Series Circuit**: Same current passes through each component: R_total = R₁ + R₂ + ...
- **Parallel Circuit**: Same voltage across each branch: 1/R_total = 1/R₁ + 1/R₂ + ...`,
    keyFormulas: [
      'Ohm\'s Law: V = I × R (Volts = Amperes × Ohms)',
      'Electric Power: P = V × I = I²R = V² / R',
      'Electrical Energy: E = P × t = V × I × t'
    ],
    workedExample: {
      problem: 'Two resistors of 6 Ω and 3 Ω are connected in parallel to a 12 V power supply. Calculate the total equivalent resistance and total current drawn.',
      solution: `Step 1: Parallel resistance formula:
  1/R_eq = 1/R₁ + 1/R₂ = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2.
  Therefore, R_eq = 2 Ω.
Step 2: Total current drawn from battery by Ohm's Law:
  I_total = V / R_eq = 12 V / 2 Ω = 6 Amperes.
Answer: Equivalent resistance is 2 Ω and total current is 6 A.`
    },
    commonTraps: [
      'In parallel circuits, students frequently calculate 1/R_total = 3/6 and forget to invert it to get R = 2 Ω!',
      'Connecting an ammeter in parallel or a voltmeter in series in experimental exam papers.'
    ],
    selfTest: {
      question: 'If voltage across a fixed resistor is doubled, what happens to the power dissipated?',
      answer: 'Power quadruples (becomes 4 times), because P = V² / R (power is proportional to the square of voltage).'
    }
  },

  // --- CHEMISTRY ---
  {
    id: 'les-chem-1',
    subject: 'Chemistry',
    topic: 'Stoichiometry & Mole Concept',
    chapter: 'Chapter 1 / Fundamentals of Chemistry',
    readingMinutes: 5,
    summary: 'Stoichiometry is the quantitative calculation of reactants and products involved in balanced chemical reactions.',
    coreTheory: `**The Mole**: A mole is the amount of substance containing Avogadro\'s number of elementary entities (particles):
- **Avogadro\'s Number (N_A)** = 6.022 × 10²³ particles/mol.
- **Molar Mass**: Mass in grams of 1 mole of a substance (equal to relative molecular mass Mr).
- **Molar Volume of Gas at RTP**: 1 mole of any ideal gas occupies 24 dm³ (or 24,000 cm³) at room temperature and pressure.`,
    keyFormulas: [
      'Number of moles (n) = Mass (g) / Molar Mass (g/mol)',
      'Number of particles = n × 6.022 × 10²³',
      'Gas volume at RTP (dm³) = moles (n) × 24 dm³',
      'Concentration (mol/dm³) = moles / volume in dm³'
    ],
    workedExample: {
      problem: 'How many grams of CO₂ are produced when 12 grams of carbon burn completely in excess oxygen? (C = 12, O = 16)',
      solution: `Step 1: Write balanced equation: C + O₂ -> CO₂.
Step 2: Mole ratio from equation: 1 mole C produces 1 mole CO₂.
Step 3: Calculate moles of C used:
  n(C) = mass / molar mass = 12 g / 12 g/mol = 1.0 mol.
Step 4: Moles of CO₂ produced = 1.0 mol.
Step 5: Convert moles of CO₂ to mass:
  Molar mass of CO₂ = 12 + (2 × 16) = 44 g/mol.
  Mass(CO₂) = 1.0 mol × 44 g/mol = 44 grams.`
    },
    commonTraps: [
      'Forgetting to balance the chemical equation before using mole ratios.',
      'Confusing cm³ with dm³ when calculating gas volumes (1 dm³ = 1000 cm³).'
    ],
    selfTest: {
      question: 'What volume does 0.5 moles of Oxygen gas (O₂) occupy at RTP?',
      answer: '12 dm³ (or 12,000 cm³), because Volume = 0.5 mol × 24 dm³/mol = 12 dm³.'
    }
  },
  {
    id: 'les-chem-2',
    subject: 'Chemistry',
    topic: 'Acids, Bases & Salts',
    chapter: 'Chapter 10 / Chemical Equilibrium & Salts',
    readingMinutes: 4,
    summary: 'Acids produce hydrogen ions (H⁺) in aqueous solution, while bases accept protons or release hydroxide ions (OH⁻).',
    coreTheory: `**pH Scale**: Logarithmic measure of hydrogen ion concentration from 0 to 14:
- pH < 7: Acidic solution.
- pH = 7: Neutral pure water at 25°C.
- pH > 7: Basic (alkaline) solution.

**Methods of Salt Preparation**:
1. **Titration**: Acid + Soluble Alkali -> Soluble Salt + Water (for Sodium, Potassium, Ammonium salts).
2. **Excess Insoluble Base/Metal**: Acid + Insoluble Oxide/Carbonate -> Soluble Salt (e.g., Copper Sulfate).
3. **Precipitation**: Mixing two soluble salts -> Insoluble Salt precipitate (e.g., Barium Sulfate).`,
    keyFormulas: [
      'Acid + Base -> Salt + Water (Neutralization)',
      'Acid + Metal -> Salt + Hydrogen gas (H₂)',
      'Acid + Carbonate -> Salt + Water + Carbon Dioxide (CO₂)'
    ],
    workedExample: {
      problem: 'Which method should be used to prepare pure, dry crystals of insoluble Barium Sulfate (BaSO₄)?',
      solution: `Step 1: Identify that BaSO₄ is an INSOLUBLE salt.
Step 2: Recall that insoluble salts must be prepared by Ionic Precipitation (mixing two soluble salts).
Step 3: Choose two soluble salts: Barium Chloride solution BaCl₂(aq) and Sodium Sulfate solution Na₂SO₄(aq).
Step 4: Mix solutions: BaCl₂(aq) + Na₂SO₄(aq) -> BaSO₄(s) + 2NaCl(aq).
Step 5: Filter the precipitate, wash with distilled water to remove soluble NaCl, and dry between filter papers.`
    },
    commonTraps: [
      'Attempting to prepare an insoluble salt using acid-carbonate reaction instead of precipitation.',
      'Claiming that all bases are alkalis (Alkalis are only the subset of bases that dissolve in water).'
    ],
    selfTest: {
      question: 'What gas is evolved when dilute Hydrochloric acid reacts with Calcium Carbonate?',
      answer: 'Carbon Dioxide (CO₂) gas, which turns limewater milky.'
    }
  },

  // --- BIOLOGY ---
  {
    id: 'les-bio-1',
    subject: 'Biology',
    topic: 'Cell Biology & Enzymes',
    chapter: 'Chapters 1 & 2 / Cellular Organization',
    readingMinutes: 4,
    summary: 'Cells are the fundamental units of life; enzymes are biological catalysts that accelerate biochemical reactions without being consumed.',
    coreTheory: `**Enzyme Action (Lock and Key Hypothesis)**:
- The **Active Site** of an enzyme has a specific complementary 3D shape matching its substrate.
- Factors affecting enzyme activity:
  1. **Temperature**: Rate rises to an optimum (usually 37°C in humans). Beyond optimum, thermal kinetic vibration breaks hydrogen bonds, **denaturing** the enzyme permanently.
  2. **pH**: Each enzyme has an optimum pH (e.g. Pepsin in stomach = pH 2, Trypsin in duodenum = pH 8).
  3. **Substrate Concentration**: Increases rate until all active sites become saturated.`,
    keyFormulas: [
      'Substrate + Enzyme -> [Enzyme-Substrate Complex] -> Enzyme + Product',
      'Optimum Temp: Peak reaction rate before denaturation occurs'
    ],
    workedExample: {
      problem: 'Explain why boiling an enzyme solution reduces the rate of substrate breakdown to zero permanently.',
      solution: `Step 1: High temperatures cause excessive molecular kinetic vibration.
Step 2: This heat vibration breaks the delicate hydrogen and ionic bonds stabilizing the tertiary protein structure.
Step 3: The active site loses its specific complementary 3D shape.
Step 4: The substrate can no longer fit or bind to form an Enzyme-Substrate complex.
Step 5: The enzyme is permanently denatured.`
    },
    commonTraps: [
      'Saying that an enzyme is "killed" by boiling (Enzymes are protein molecules, not living organisms, so they are "denatured", not killed).',
      'Confusing plant cell wall (freely permeable cellulose) with cell membrane (partially permeable lipid bilayer).'
    ],
    selfTest: {
      question: 'Which organelle is responsible for aerobic cellular respiration and ATP synthesis?',
      answer: 'Mitochondria (often described as the powerhouse of the cell).'
    }
  },
  {
    id: 'les-bio-2',
    subject: 'Biology',
    topic: 'Respiration & Gas Exchange',
    chapter: 'Chapter 10 / Gas Exchange in Humans',
    readingMinutes: 4,
    summary: 'Gaseous exchange occurs across specialized alveolar surfaces to supply oxygen for cellular respiration and remove carbon dioxide.',
    coreTheory: `**Alveoli Adaptations for Rapid Diffusion**:
1. **Large Surface Area**: Millions of microscopic spherical alveoli in human lungs create an enormous surface area (~70 m²).
2. **Thin Diffusion Distance**: Alveolar wall and surrounding blood capillary wall are each only one cell thick.
3. **Moist Surface**: Dissolves gases so oxygen and carbon dioxide diffuse in aqueous solution.
4. **Rich Blood Supply & Ventilation**: Continuous capillary blood flow maintains steep concentration gradients.`,
    keyFormulas: [
      'Aerobic Respiration: C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O + Energy (38 ATP)',
      'Anaerobic in Humans: Glucose -> Lactic Acid + Energy (2 ATP)'
    ],
    workedExample: {
      problem: 'Describe what happens to the diaphragm and ribcage during human inhalation (breathing in).',
      solution: `1. The external intercostal muscles contract, pulling the ribs upwards and outwards.
2. The diaphragm contracts and flattens downwards.
3. The volume of the thorax increases.
4. The internal air pressure inside the lungs drops below atmospheric pressure.
5. Air rushes into the lungs from high to low pressure.`
    },
    commonTraps: [
      'Confusing "Respiration" (biochemical energy release inside cells) with "Breathing / Ventilation" (mechanical airflow in lungs).',
      'Forgetting that anaerobic respiration in human muscle generates lactic acid without carbon dioxide, whereas yeast fermentation produces ethanol AND carbon dioxide.'
    ],
    selfTest: {
      question: 'What is the main chemical difference between inspired air and expired air in human breathing?',
      answer: 'Expired air contains less Oxygen (~16% vs ~21%), more Carbon Dioxide (~4% vs ~0.04%), and more water vapor.'
    }
  },

  // --- COMPUTER SCIENCE ---
  {
    id: 'les-cs-1',
    subject: 'Computer Science',
    topic: 'Number Systems & Boolean Logic',
    chapter: 'Unit 1 / Data Representation',
    readingMinutes: 4,
    summary: 'Computers represent all forms of data in binary digits (bits: 0 and 1) and manipulate them using Boolean logic gates.',
    coreTheory: `**Number Bases**:
- **Binary (Base 2)**: Digits 0, 1. Place values: 1, 2, 4, 8, 16, 32, 64, 128.
- **Denary / Decimal (Base 10)**: Standard counting numbers (0-9).
- **Hexadecimal (Base 16)**: Digits 0-9, A(10), B(11), C(12), D(13), E(14), F(15). Hexadecimal is used by programmers because 1 hex digit represents exactly 4 binary bits (a nibble).

**Core Logic Gates**:
- **AND**: Output 1 only if BOTH inputs are 1 (A ∧ B).
- **OR**: Output 1 if AT LEAST ONE input is 1 (A ∨ B).
- **NOT**: Inverts the single input (¬A).`,
    keyFormulas: [
      '1 Byte = 8 bits',
      '1 Hex Digit = 4 bits (1 nibble)',
      'De Morgan\'s Law: NOT (A AND B) = (NOT A) OR (NOT B)'
    ],
    workedExample: {
      problem: 'Convert the binary byte 11010110 into Hexadecimal representation.',
      solution: `Step 1: Split into two 4-bit nibbles:
  Left nibble:  1 1 0 1
  Right nibble: 0 1 1 0
Step 2: Convert left nibble to denary:
  (1×8) + (1×4) + (0×2) + (1×1) = 8 + 4 + 0 + 1 = 13.
  In hexadecimal, 13 = 'D'.
Step 3: Convert right nibble to denary:
  (0×8) + (1×4) + (1×2) + (0×1) = 0 + 4 + 2 + 0 = 6.
  In hexadecimal, 6 = '6'.
Step 4: Combine the digits: D6.
Answer: 11010110 in binary = D6 in Hexadecimal.`
    },
    commonTraps: [
      'Writing hexadecimal 10 as two separate digits instead of \'A\'.',
      'Confusing the place values of binary from left-to-right instead of starting with 1 on the far right.'
    ],
    selfTest: {
      question: 'What is the binary representation of decimal number 25?',
      answer: '00011001 (16 + 8 + 1 = 25).'
    }
  },

  // --- ENGLISH ---
  {
    id: 'les-eng-1',
    subject: 'English',
    topic: 'Direct & Indirect Speech',
    chapter: 'Module 2 / Reported Speech Rules',
    readingMinutes: 3,
    summary: 'Direct speech quotes the exact words spoken; indirect (reported) speech reports words without quotes with necessary tense and pronoun shifts.',
    coreTheory: `When changing direct statements into indirect speech in the past:
1. **Remove inverted commas / quotation marks**: Replace with conjunction **that** (for statements).
2. **Backshift of Tenses**:
   - Present Simple -> Past Simple (*"I work"* -> *he worked*)
   - Present Continuous -> Past Continuous (*"I am working"* -> *he was working*)
   - Past Simple -> Past Perfect (*"I worked"* -> *he had worked*)
   - Will -> Would | Can -> Could | May -> Might
3. **Pronoun & Time Shifts**:
   - *Now* -> *then* | *Today* -> *that day* | *Tomorrow* -> *the next day* | *Here* -> *there*.`,
    keyFormulas: [
      'Said to + Object -> Told + Object (e.g., He said to me -> He told me)',
      'For Questions: Use asked + if/whether (for yes/no) or question word (for wh-questions)'
    ],
    workedExample: {
      problem: 'Change to indirect speech: "I cannot submit my Physics assignment today," Ali told the teacher.',
      solution: `Step 1: Reporting verb is in past: "told".
Step 2: Shift pronoun "I" to third person masculine "he".
Step 3: Shift modal "cannot" to past "could not".
Step 4: Shift possessive pronoun "my" to "his".
Step 5: Shift time word "today" to "that day".
Step 6: Form sentence:
  Ali told the teacher that he could not submit his Physics assignment that day.`
    },
    commonTraps: [
      'Writing "He told to me" (incorrect: told never takes "to"; say "He told me" or "He said to me").',
      'Forgetting to invert question word order in reported questions (e.g., "She asked where was I" is WRONG; write "She asked where I was").'
    ],
    selfTest: {
      question: 'Report this speech: The teacher said, "The Earth orbits the Sun."',
      answer: 'The teacher said that the Earth orbits the Sun. (Tense does NOT backshift for universal scientific truths).'
    }
  }
];
