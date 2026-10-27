// Topic Question & Answer Generator Bank for StudyOS
// Generates syllabus-authentic Short Questions, Conceptual Questions, and Long Problems with Marking Schemes

export const CURATED_TOPIC_QA = {
  'Quadratic Equations': {
    subject: 'Mathematics',
    curriculum: 'Matric & O-Level',
    chapter: 'Algebraic Methods',
    shortQuestions: [
      {
        id: 'sq-quad-1',
        type: 'Definition (2 Marks)',
        question: 'Define a quadratic equation and write its standard general algebraic form.',
        marks: 2,
        modelAnswer: 'A quadratic equation is a second-degree polynomial equation where the highest power of the variable is 2. Its standard general form is:\nax² + bx + c = 0, where a, b, c ∈ ℝ and a ≠ 0.',
        markingPoints: ['1 mark for definition as a 2nd degree polynomial', '1 mark for stating ax² + bx + c = 0 with condition a ≠ 0']
      },
      {
        id: 'sq-quad-2',
        type: 'Formula (2 Marks)',
        question: 'State the Discriminant formula of a quadratic equation and explain what Δ > 0 indicates about its roots.',
        marks: 2,
        modelAnswer: 'The Discriminant is given by: Δ = b² - 4ac.\nWhen Δ > 0, the equation possesses two distinct, real (unequal) roots.',
        markingPoints: ['1 mark for formula Δ = b² - 4ac', '1 mark for identifying two distinct real roots']
      }
    ],
    conceptualQuestions: [
      {
        id: 'cq-quad-1',
        type: 'Conceptual Reasoning (3 Marks)',
        question: 'Why must the leading coefficient "a" never equal zero in the standard quadratic form ax² + bx + c = 0?',
        marks: 3,
        modelAnswer: 'If the leading coefficient a = 0, the squared term ax² disappears: 0·x² + bx + c = 0 becomes bx + c = 0. This reduces the equation to a first-degree (linear) equation with only one root instead of a second-degree quadratic equation with two roots.',
        markingPoints: ['1 mark: showing that ax² vanishes', '1 mark: showing it reduces to linear equation bx + c = 0', '1 mark: stating root count drops from 2 to 1']
      }
    ],
    longQuestions: [
      {
        id: 'lq-quad-1',
        type: 'Extensive Problem (5 Marks)',
        question: 'Solve the equation 3x² + 5x - 2 = 0 by applying the quadratic formula. State all steps clearly.',
        marks: 5,
        modelAnswer: `Given: 3x² + 5x - 2 = 0
Step 1: Identify coefficients: a = 3, b = 5, c = -2.
Step 2: Calculate discriminant:
  Δ = b² - 4ac = (5)² - 4(3)(-2) = 25 - (-24) = 25 + 24 = 49.
Step 3: Apply the Quadratic Formula:
  x = (-b ± √Δ) / (2a)
  x = (-5 ± √49) / (2 × 3)
  x = (-5 ± 7) / 6
Step 4: Branch into two roots:
  x₁ = (-5 + 7) / 6 = 2 / 6 = 1/3
  x₂ = (-5 - 7) / 6 = -12 / 6 = -2
Solution Set = { -2, 1/3 }.`,
        markingPoints: [
          '1 mark: Extracting coefficients a=3, b=5, c=-2',
          '1 mark: Calculating discriminant Δ = 49',
          '1 mark: Correct quadratic formula substitution',
          '2 marks: Correct calculation of roots x = 1/3 and x = -2'
        ]
      }
    ]
  },

  'Kinematics & Dynamics': {
    subject: 'Physics',
    curriculum: 'Matric & O-Level',
    chapter: 'Motion & Forces',
    shortQuestions: [
      {
        id: 'sq-kin-1',
        type: 'Definition (2 Marks)',
        question: 'Differentiate between speed and velocity. Mention whether each is scalar or vector.',
        marks: 2,
        modelAnswer: 'Speed is the distance travelled by an object per unit time (scalar quantity, magnitude only).\nVelocity is the rate of change of displacement in a specific direction (vector quantity, possessing both magnitude and direction).',
        markingPoints: ['1 mark: distance/time vs displacement/time', '1 mark: speed=scalar, velocity=vector']
      },
      {
        id: 'sq-kin-2',
        type: 'Law Statement (2 Marks)',
        question: "State Newton's Second Law of Motion and write its mathematical equation.",
        marks: 2,
        modelAnswer: 'Newton’s Second Law states that when a net external force acts on a body, it produces acceleration in the direction of the force which is directly proportional to the force and inversely proportional to its mass.\nFormula: F = m × a.',
        markingPoints: ['1 mark: accurate statement of proportionalities', '1 mark: mathematical formula F = ma']
      }
    ],
    conceptualQuestions: [
      {
        id: 'cq-kin-1',
        type: 'Conceptual Reasoning (3 Marks)',
        question: 'Explain why seatbelts in vehicles protect passengers during sudden braking using the concept of Inertia.',
        marks: 3,
        modelAnswer: 'According to Newton’s First Law (Law of Inertia), a moving body tends to continue moving in a straight line at constant velocity unless acted upon by an external unbalanced force. When brakes are abruptly applied, the vehicle halts, but passengers’ bodies continue moving forward due to inertia. Seatbelts exert a backward opposing force, safely restraining passengers and preventing violent impact against the windscreen.',
        markingPoints: ['1 mark: referencing Newton\'s First Law / Inertia', '1 mark: explaining passenger bodies continue forward', '1 mark: explaining seatbelt provides counter-force']
      }
    ],
    longQuestions: [
      {
        id: 'lq-kin-1',
        type: 'Extensive Problem (5 Marks)',
        question: 'A stone is dropped from the top of a 45-meter-high tower. Assuming acceleration due to gravity g = 10 m/s² and negligible air resistance: (i) Find the time taken to reach the ground. (ii) Calculate the velocity with which it strikes the ground.',
        marks: 5,
        modelAnswer: `Given:
Initial velocity (dropped): v_i = 0 m/s
Height / distance: h = 45 m
Acceleration: g = 10 m/s²

(i) Time to reach the ground:
Using 2nd equation of motion:
h = v_i × t + 0.5 × g × t²
45 = (0 × t) + 0.5 × 10 × t²
45 = 5 t²
t² = 45 / 5 = 9
t = √9 = 3.0 seconds.

(ii) Striking velocity:
Using 1st equation of motion:
v_f = v_i + g × t
v_f = 0 + (10 × 3.0) = 30 m/s.

Results: Time = 3.0 s, Final Velocity = 30 m/s.`,
        markingPoints: [
          '1 mark: identifying initial velocity v_i = 0',
          '2 marks: substitution into h = 0.5gt² and calculating t = 3.0 s',
          '2 marks: calculating final velocity v_f = 30 m/s with units'
        ]
      }
    ]
  },

  'Current Electricity': {
    subject: 'Physics',
    curriculum: 'Matric & O-Level',
    chapter: 'Direct Current & Circuits',
    shortQuestions: [
      {
        id: 'sq-elec-1',
        type: 'Law Definition (2 Marks)',
        question: "State Ohm's Law and state the condition under which it remains valid.",
        marks: 2,
        modelAnswer: "Ohm’s Law states that the current flowing through a conductor is directly proportional to the potential difference across its terminals (V ∝ I), provided the physical state and temperature of the conductor remain constant.\nFormula: V = I × R.",
        markingPoints: ['1 mark: stating V directly proportional to I', '1 mark: condition of constant temperature and physical state']
      }
    ],
    conceptualQuestions: [
      {
        id: 'cq-elec-1',
        type: 'Circuit Reasoning (3 Marks)',
        question: 'Why are domestic electrical household appliances connected in parallel rather than in series?',
        marks: 3,
        modelAnswer: 'Household appliances are wired in parallel because:\n1. **Independent Operation**: If one appliance breaks or is switched off, the other circuits remain complete and functional.\n2. **Full Voltage Supply**: Every appliance receives the full mains supply voltage (220 V in Pakistan), allowing optimal power output.\n3. **Lower Overall Resistance**: Parallel connection reduces total equivalent resistance, preventing excessive voltage drops.',
        markingPoints: ['1 mark: independent switching/fault tolerance', '1 mark: full supply voltage across each appliance', '1 mark: total resistance behavior']
      }
    ],
    longQuestions: [
      {
        id: 'lq-elec-1',
        type: 'Structured Problem (4 Marks)',
        question: 'A 60 W electric lamp operates on a 240 V mains power supply. Calculate: (a) The current drawn by the lamp, (b) The electrical resistance of the lamp filament.',
        marks: 4,
        modelAnswer: `Given:
Power P = 60 W
Voltage V = 240 V

(a) Current drawn:
Formula: P = V × I  =>  I = P / V
I = 60 / 240 = 0.25 A.

(b) Filament resistance:
Method 1: R = V / I = 240 / 0.25 = 960 Ω.
Method 2: P = V² / R  =>  R = V² / P = (240)² / 60 = 57600 / 60 = 960 Ω.

Result: Current = 0.25 A, Resistance = 960 Ω.`,
        markingPoints: [
          '1 mark: Formula I = P/V',
          '1 mark: Calculation I = 0.25 A',
          '1 mark: Formula R = V/I or V²/P',
          '1 mark: Calculation R = 960 Ω'
        ]
      }
    ]
  },

  'Stoichiometry & Mole Concept': {
    subject: 'Chemistry',
    curriculum: 'Matric & O-Level',
    chapter: 'Fundamentals of Chemistry',
    shortQuestions: [
      {
        id: 'sq-st-1',
        type: 'Definition (2 Marks)',
        question: 'Define Avogadro’s Number and state its numerical value.',
        marks: 2,
        modelAnswer: 'Avogadro’s number is the exact number of particles (atoms, molecules, or ions) present in one mole of any pure substance.\nValue: 6.022 × 10²³ particles/mol.',
        markingPoints: ['1 mark: definition as particles in 1 mole', '1 mark: value 6.022 × 10²³']
      }
    ],
    conceptualQuestions: [
      {
        id: 'cq-st-1',
        type: 'Conceptual Reasoning (3 Marks)',
        question: 'Why does 1 mole of Hydrogen gas (H₂) have the same number of molecules as 1 mole of Oxygen gas (O₂), despite having a vastly different mass?',
        marks: 3,
        modelAnswer: 'A mole is an absolute counting unit defined by particle count, not by mass. One mole of ANY substance contains exactly Avogadro’s number (6.022 × 10²³) of fundamental particles. Oxygen molecules (32 g/mol) are heavier because each oxygen atom has 8 protons and 8 neutrons, whereas hydrogen (2 g/mol) has only 1 proton per atom. Thus, while both contain identical molecule counts (6.022 × 10²³), each individual oxygen molecule weighs 16 times more than a hydrogen molecule.',
        markingPoints: ['1 mark: mole is a fixed particle counter', '1 mark: both contain 6.022 × 10²³ molecules', '1 mark: mass difference due to individual atomic weights']
      }
    ],
    longQuestions: [
      {
        id: 'lq-st-1',
        type: 'Numerical Problem (5 Marks)',
        question: 'Calculate the volume occupied by 88 grams of Carbon Dioxide (CO₂) gas at Standard Temperature and Pressure (STP). (C = 12 g/mol, O = 16 g/mol, Molar volume at STP = 22.4 dm³).',
        marks: 5,
        modelAnswer: `Given:
Mass of CO₂ = 88 g

Step 1: Calculate Molar Mass of CO₂:
Molar Mass = 12 + (2 × 16) = 12 + 32 = 44 g/mol.

Step 2: Calculate Moles of CO₂:
Moles (n) = Mass in g / Molar Mass
n = 88 g / 44 g/mol = 2.0 moles.

Step 3: Calculate Volume at STP:
Volume = Moles × Molar Gas Volume (22.4 dm³/mol)
Volume = 2.0 × 22.4 = 44.8 dm³ (or litres).

Final Answer: Volume of CO₂ at STP = 44.8 dm³.`,
        markingPoints: [
          '1 mark: Molar mass of CO₂ = 44 g/mol',
          '2 marks: Calculation of moles = 2.0 mol',
          '2 marks: Multiplication by 22.4 dm³ yielding 44.8 dm³'
        ]
      }
    ]
  },

  'Respiration & Gas Exchange': {
    subject: 'Biology',
    curriculum: 'Matric & O-Level',
    chapter: 'Gaseous Exchange',
    shortQuestions: [
      {
        id: 'sq-bio-1',
        type: 'Definition (2 Marks)',
        question: 'Distinguish between breathing (ventilation) and cellular respiration.',
        marks: 2,
        modelAnswer: 'Breathing is the mechanical physical process of inhaling oxygen-rich air and exhaling carbon dioxide via lungs and diaphragm. Cellular respiration is the biochemical oxidation of glucose inside mitochondria to release energy in the form of ATP.',
        markingPoints: ['1 mark: physical/mechanical ventilation vs biochemical reaction', '1 mark: cellular ATP release in mitochondria']
      }
    ],
    conceptualQuestions: [
      {
        id: 'cq-bio-1',
        type: 'Conceptual Reasoning (3 Marks)',
        question: 'Explain why smoking cigarettes severely damages the respiratory system and impairs oxygen transport.',
        marks: 3,
        modelAnswer: 'Cigarette smoke contains harmful agents:\n1. **Tar**: Destroys epithelial cilia and stimulates excess mucus production, trapping pathogens and leading to chronic bronchitis.\n2. **Carbon Monoxide (CO)**: Binds irreversibly with hemoglobin to form carboxyhemoglobin, drastically diminishing the blood’s oxygen-carrying capacity.\n3. **Smoke Particles**: Breakdown alveolar septa over time, leading to irreversible emphysema with severely reduced gas exchange surface area.',
        markingPoints: ['1 mark: Tar paralyzing cilia', '1 mark: CO forming carboxyhemoglobin', '1 mark: breakdown of alveolar walls (emphysema)']
      }
    ],
    longQuestions: [
      {
        id: 'lq-bio-1',
        type: 'Mechanism & Diagram (5 Marks)',
        question: 'Describe the mechanical process of inhalation (inspiration) in humans, detailing the roles of the diaphragm, intercostal muscles, thorax volume, and air pressure.',
        marks: 5,
        modelAnswer: `The mechanism of inhalation occurs in four synchronized steps:
1. **Diaphragm Contraction**: The dome-shaped diaphragm contracts and flattens downwards.
2. **Intercostal Muscle Action**: External intercostal muscles contract, pulling the ribs upwards and outwards.
3. **Thoracic Volume Increase**: These dual movements significantly expand the internal volume of the chest (thoracic) cavity.
4. **Pressure Differential**: As thoracic volume increases, internal pressure in the lungs falls below external atmospheric pressure.
5. **Air Inflow**: Atmospheric air rushes down the pressure gradient through trachea and bronchi into the expanding lungs.`,
        markingPoints: [
          '1 mark: Diaphragm flattening downwards',
          '1 mark: External intercostal muscles pulling ribs up and out',
          '1 mark: Increase in thoracic cavity volume',
          '1 mark: Drop in pulmonary pressure below atmospheric pressure',
          '1 mark: Air rushing inward along pressure gradient'
        ]
      }
    ]
  }
};

/**
 * Universal Topic Q&A Generator Function
 * Searches curated bank or builds a structured high-yield Q&A pack dynamically for any searched topic.
 */
export function generateTopicQA(topicName, subject = 'General Science') {
  if (!topicName) return null;

  // Check exact or partial match in curated bank
  const normalized = topicName.trim().toLowerCase();
  const matchedKey = Object.keys(CURATED_TOPIC_QA).find(k =>
    k.toLowerCase().includes(normalized) || normalized.includes(k.toLowerCase())
  );

  if (matchedKey) {
    return CURATED_TOPIC_QA[matchedKey];
  }

  // Dynamic Generator for any other secondary school topic
  return {
    subject: subject || 'Curriculum Science',
    curriculum: 'Matric & O-Level',
    chapter: `Module on ${topicName}`,
    shortQuestions: [
      {
        id: `dyn-sq-${Date.now()}-1`,
        type: 'Key Definition (2 Marks)',
        question: `Define the fundamental scientific/mathematical principle behind "${topicName}".`,
        marks: 2,
        modelAnswer: `"${topicName}" refers to the foundational secondary curriculum concept governing related quantitative and qualitative relationships in ${subject}. In board examinations, questions test exact standard textbook definitions, correct SI units, and governing laws.`,
        markingPoints: [
          '1 mark: Precise technical definition matching board textbook terminology',
          '1 mark: Stating governing conditions, units, or fundamental equations'
        ]
      },
      {
        id: `dyn-sq-${Date.now()}-2`,
        type: 'Important Distinction (2 Marks)',
        question: `State two key features that distinguish "${topicName}" from related concepts in ${subject}.`,
        marks: 2,
        modelAnswer: `1. Primary Characteristic: It addresses specific operational behavior and governing constraints.\n2. Diagnostic Application: Used systematically in examination problems to determine unknown parameters.`,
        markingPoints: [
          '1 mark: Stating the primary operational principle',
          '1 mark: Clear comparison or distinguishing criterion'
        ]
      }
    ],
    conceptualQuestions: [
      {
        id: `dyn-cq-${Date.now()}-1`,
        type: 'Conceptual Reasoning (3 Marks)',
        question: `Explain why a thorough understanding of "${topicName}" is critical for solving multi-step board problems.`,
        marks: 3,
        modelAnswer: `Mastery of "${topicName}" connects theoretical definitions with analytical problem solving:\n1. It provides the mathematical or physical framework required to interpret given exam data.\n2. It prevents common algebraic and sign errors identified by board examiners.\n3. It allows candidates to verify whether their calculated answers are physically and dimensionally reasonable.`,
        markingPoints: [
          '1 mark: Theoretical framework and formula identification',
          '1 mark: Avoiding common board examiner traps',
          '1 mark: Dimensional consistency and logical verification'
        ]
      }
    ],
    longQuestions: [
      {
        id: `dyn-lq-${Date.now()}-1`,
        type: 'Structured Examination Problem (5 Marks)',
        question: `Construct a comprehensive examination response analyzing "${topicName}": (a) State the governing principle, (b) Detail the mathematical or experimental procedure, (c) Highlight common examiner traps.`,
        marks: 5,
        modelAnswer: `(a) Governing Principle:\nState the official board definition and conditions of applicability.\n\n(b) Step-by-Step Procedure:\n1. Write the given parameters with appropriate units.\n2. State the primary formula and rearrange for the target variable.\n3. Show complete substitution and intermediate working.\n4. Box the final answer and include correct SI units.\n\n(c) Examiner Traps:\n- Always avoid skipping working lines.\n- Check whether rounding to 3 significant figures is required in O-Level papers.`,
        markingPoints: [
          '1 mark: Clear statement of principle',
          '2 marks: Methodical step-by-step working and formula substitution',
          '1 mark: Correct units and significant figures',
          '1 mark: Identification of boundary conditions and examiner traps'
        ]
      }
    ]
  };
}
