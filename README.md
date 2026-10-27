# StudyOS — “Your studies. One clear plan.”

**StudyOS** is an educational dashboard designed for **Matric (FBISE / BISE)** and **Cambridge O-Level (CAIE)** students in Pakistan. Built for presentation at a Science & Arts Exhibition, StudyOS unifies daily homework, examination countdowns, honest syllabus tracking, and diagnostic practice questions into a single student-friendly interface.

---

## 1. Product Vision & Problem Statement

### The Problem
Matric and O-Level students prepare for demanding high-stakes board examinations across 6 to 9 subjects. In practice, students track homework on loose registers, examination timetables on paper photocopies or WhatsApp groups, syllabus coverage in textbooks, and past-paper mistakes in disparate notebooks. It is difficult for a student to answer the critical daily question:
> *"I have 2 hours tonight. What should I study first?"*

### The Solution
StudyOS bridges this gap by centralizing tasks, deadlines, and syllabus chapters. It features a **transparent, rule-based recommendation engine** that connects recent quiz errors with upcoming exam dates to tell students exactly what requires attention first, providing a clear explanation for every recommendation.

---

## 2. Key Working Features

### A. Professional Landing Page
- StudyOS branding and tagline.
- Problem and solution summary with dual-track (Matric / O-Level) focus.
- One-click navigation to the student dashboard or the built-in Exhibition Guide.
- Sample demonstration statistics clearly labeled as verified demo metrics.

### B. Student Dashboard
- Student profile banner (Shayan Khan, Grade 10 Matric Science & O-Level Track).
- Key operational metric cards: Pending Tasks, Completed Tasks, Nearest Exam Countdown, and Verified Syllabus Progress.
- **Today's Suggested Study Tasks (Smart Queue)**: Top recommendations generated deterministically by pairing overdue work, imminent exam dates, and quiz mistakes.
- Glanceable exam timetable and per-subject syllabus progress bars.

### C. Homework & Assignment Manager
- Create assignments with Title, Subject (Math, Physics, Chemistry, Biology, Computer Science, English, etc.), Due Date, Priority (High, Medium, Low), and optional notes.
- In-place editing and checkbox toggle for immediate completion status.
- Safe deletion with a double-confirmation modal.
- Real-time search filter and subject category dropdown.
- Automated overdue detection (highlights tasks past deadline with day counts).
- Instant persistence in `localStorage`.

### D. Examination Planner & Countdown
- Timetable for upcoming FBISE / BISE and Cambridge O-Level sessions.
- Displays subject, paper code/name, date, time session, and examination center.
- Dynamic countdown calculation: "Today!", "Tomorrow", "In 4 days", or "Passed X days ago".
- Past examinations handled gracefully without negative time bugs.
- Add, edit, and delete examination entries.

### E. Subject & Syllabus Tracker
- 6 core curriculum subjects (Mathematics, Physics, Chemistry, Biology, Computer Science, English) with 28 detailed chapters/topics.
- Multi-state topic checkboxes: **Not Started**, **In Progress**, and **Mastered (Completed)**.
- **Accurate progress calculation**: Percentages represent actual chapter completions. No fake or hardcoded progress bars.

### F. Interactive Diagnostic Quiz
- 15 original, curriculum-accurate MCQs across Mathematics, Physics, Chemistry, Biology, and English.
- Choice between **Full Diagnostic (15 Qs)** and **Quick Demo (5 Qs)** for fast 2-minute booth demonstrations.
- One question at a time with instant score calculation.
- Question-by-question review with pedagogical rationale and correct answer explanations.
- Auto-saves quiz attempt records and logs incorrect topics into local storage.
- Explicit classroom demonstration notice avoiding claims of being an official board examination.

### G. Smart Progress & Rule-Based Revision Engine
- Unified progress statistics (homework rate, syllabus coverage, quiz attempts, concept gap count).
- Identifies weak concepts across all past quiz attempts.
- **Transparent Rule Engine**:
  1. *Rule 1 (Urgent Homework)*: Flags overdue assignments.
  2. *Rule 2 (Exam-Syllabus Alignment)*: Cross-references exams occurring within 10 days with uncompleted syllabus topics.
  3. *Rule 3 (Concept Remediation)*: Recommends reviewing topics missed in diagnostic quizzes.
  4. *Rule 4 (Syllabus Balancer)*: Suggests advancing topics in the subject with the lowest completion rate.
- Clear audit trail explaining the exact rule and trigger reason for every recommendation.

### H. Exhibition Demo Controls & Booth Guide
- Pre-seeded with realistic, date-relative sample data on initial launch.
- **Reset Demo Data**: One-click restore with confirmation modal to reset the clean demonstration state for the next judge.
- **Clear All Data**: Allows demonstrating fresh empty states.
- **Built-in Exhibition Guide Modal**: Minute-by-minute demonstration script, system architecture diagram, and judge Q&A prep accessible directly from the top navigation bar.

### I. Lesson Studio & Universal Topic Search
- Universal search across 28 syllabus chapters with real-time filtering by subject and keyword.
- Concise 3-minute summaries, governing scientific laws, and complete theoretical breakdowns.
- Step-by-step worked board numericals and examiner traps.

### J. Topic Question & Answer Generator (Active Recall)
- Generates 3 tiers of syllabus-authentic exam questions for any searched topic:
  - **Section 1**: 2-Mark Short Definitions & Formulas.
  - **Section 2**: 3-Mark Conceptual & Reasoning Questions.
  - **Section 3**: 5-Mark Structured Problems & Solved Board Numericals.
- **Active Recall Flashcard Mode**: Toggle "Reveal / Hide Answer" to quiz oneself before viewing model answers and mark schemes.
- One-click "Add Question to Study Tasks" to schedule it into homework.

### K. Past Papers Vault (2021–2024) & Mock Exam Generator
- Comprehensive question bank covering **Federal Board (FBISE Islamabad)** and **Cambridge O-Level (CAIE)** across 2021, 2022, 2023, and 2024.
- Official marking scheme rubrics breaking down where marks are scored (`[1 mark]`, `[2 marks]`, etc.) and examiner advice.
- **Smart Mock Paper Generator**: Creates full, authentic board examination papers in seconds complete with candidate instructions, time allowances, Section B & Section C layouts, and printable A4 formatting.

---

## 3. Technology Architecture & Data Flow

```
[ User Action / Inputs ]
          ↓
[ React Components (Vite Single Page Application) ]
          ↓
[ LocalStorage Service (`src/utils/storage.js`) ]
          ↓ (Synchronous Custom Event Dispatch)
[ Pure Deterministic Rule Engine (`src/utils/recommendations.js`) ]
          ↓
[ Reactive State Update across Dashboard & Progress Views ]
```

- **Framework**: React 19 + Vite 8
- **Styling**: Tailored CSS Design System (refined navy, royal blue, emerald, amber, rose)
- **Icons**: Custom inline zero-dependency scalable SVG icons (`src/components/Icons.jsx`)
- **Storage**: Browser `localStorage` (100% offline-ready, no cloud latency or network failures during the exhibition)

---

## 4. How to Run the Application

### Development Mode:
```powershell
# Navigate to the project directory
cd "C:\Users\Laptop Home\.gemini\antigravity\scratch\studyos"

# Start the Vite development server
npm.cmd run dev
```

### Production Build & Preview:
```powershell
# Run the optimized production build
npm.cmd run build

# Preview the production bundle locally
npm.cmd run preview
```

### Automated Logic Verification Suite:
```powershell
node src/test/verifyAllFeatures.test.js
```

---

## 5. 5-Minute Exhibition Demonstration Script (For Students)

1. **Minute 1: The Hook (Home Page)**
   - Introduce yourself: *"We are presenting StudyOS: Your studies. One clear plan."*
   - Explain the problem: *"Students in Matric and O-Level manage 8 subjects across scattered notebooks, WhatsApp class groups, and loose papers. We built StudyOS to give every student a clear, prioritized study roadmap."*
2. **Minute 2: The Unified Hub (Dashboard)**
   - Click **Open Dashboard**.
   - Show Shayan Khan’s student dashboard: 6 pending tasks, nearest board paper (Physics in 4 days), and genuine 46% syllabus coverage.
3. **Minute 3: Interactive Diagnostic Quiz (Quiz)**
   - Click **Diagnostic Quiz** and select **Quick Demo (5 Qs)**.
   - Answer questions on screen. Deliberately get one wrong (e.g., Ohm's law or Newton's law).
   - Click **Submit & Score** to demonstrate instant grading, question-by-question explanations, and automatic weak-topic recording.
4. **Minute 4: The Smart Revision Engine (Progress)**
   - Click **View Smart Revision Queue**.
   - Show how the rule engine immediately paired the quiz mistake with the upcoming exam to generate a revision item with an explicit explanation: *"Triggered by: Diagnostic quiz mistake in Current Electricity"*.
5. **Minute 5: Reliability & Reset (Demo Controls)**
   - Toggle a homework task complete, then click **Reset Demo** in the top header.
   - Show judges how the system restores the verified sample state in 1 second, ready for the next visitor.

---

## 6. Privacy, Security & Data Handling

- **No Remote Servers**: StudyOS operates locally in the browser storage. No student credentials, passwords, or personal identifying numbers are collected or transmitted.
- **Sample Data Integrity**: All student records (Shayan Khan) and marks are fictional and clearly marked as demonstration records.
- **Repeatable Demonstrations**: State resets are deterministic and self-contained.

---

## 7. Future Development Roadmap

1. **Multi-User Profiles**: Optional encrypted local profiles for siblings sharing a home computer.
2. **Teacher & Parent Portal**: Read-only export summaries formatted as PDF weekly study reports.
3. **Past Paper Question Bank Expansion**: Expanding the diagnostic MCQ bank from 15 demonstration items to 500+ categorized past paper questions for FBISE, BISE Lahore/Rawalpindi, and CAIE.
4. **Study Timer (Pomodoro)**: Integrated 25-minute study focus timer linked directly to queued tasks.
