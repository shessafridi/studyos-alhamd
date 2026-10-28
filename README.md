# ALHAMDIA STUDENT PLANNER
### Official Student Study Operating System & Daily Focus Dashboard
**Alhamdia International School & College**  
*“Your studies. One clear plan.”*

Designed and engineered for **Matric (FBISE Science)** and **Cambridge O-Level (CAIE)** students for presentation at the Science & Arts Exhibition and for daily academic excellence.

---

## 1. Overview & Institution Branding

**ALHAMDIA STUDENT PLANNER** is a student-first personal study operating system. It eliminates chaos for secondary and higher-secondary students preparing for high-stakes board examinations by unifying homework, exam timetables, syllabus completion tracking, diagnostic quizzes, past board papers, and Pomodoro study sprints into a single offline-ready portal.

- **Institution:** Alhamdia International School & College
- **Motto / Tagline:** *“Your studies. One clear plan.”*
- **Official Crest:** Alhamdia Golden Lion Circular Insignia
- **Target Curricula:** Federal Board (FBISE SSC & HSSC) and Cambridge Assessment International Education (CAIE O-Level)

---

## 2. Key Architecture & Features

### 🔐 1. Student Authentication & Account Creation
- **New Student Registration:** Students create their own personal account by entering their Full Name, Roll Number / ID (e.g., `ALH-1055`), Grade/Class, Curriculum Track, Academic Target Goal, and Password/PIN.
- **Instant Activation:** Immediately activates and configures the student's personal study dashboard.
- **Local Persistence:** Credentials and progress are safely stored in browser `localStorage`.
- **1-Click Exhibition Demonstration Accounts:** Pre-configured accounts for rapid judge demonstrations:
  - *Zainab Tariq* (`ALH-1042`, PIN: `123`) — Matric FBISE Science Candidate
  - *Rayan Farooq* (`ALH-1088`, PIN: `123`) — Cambridge O-Level CAIE Candidate

### ⚡ 2. Quick Command Launcher (`Ctrl + K`)
- Press `Ctrl + K` (or click **"⚡ Commands"** in the top navigation bar) to open a spotlight search modal.
- Jump directly to any subject, past paper vault, diagnostic quiz, lesson notes, or Zen study room with zero clicks.

### 🧘 3. Zen Focus Study Sprint Room
- Distraction-free Pomodoro study sprint timer (15 min, 25 min, 45 min, 60 min).
- Built-in live **Formula & Scratchpad** for working through numericals and derivations during timed sprints.
- Auto-saves scratch notes locally per study session.

### 📚 4. Board Past Papers Vault & Mock Generator
- 2021–2024 genuine board examination questions covering Mathematics, Physics, Chemistry, Biology, and Computer Science.
- Covers both **Federal Board (FBISE)** and **Cambridge O-Level (CAIE)**.
- Official step-by-step marking schemes and examiner rubrics for every question.
- **A4 Printable Mock Exam Generator:** Generates formatted mock papers with instructions, marks distribution, and print layout for timed self-testing.

### 💡 5. Topic Q&A Active Recall Generator
- 3-tier structured practice packs generated dynamically for any curriculum topic:
  - **Tier 1: Definitions & Core Formulas (2 Marks)** with key keywords.
  - **Tier 2: Conceptual & Scientific Reasoning (3 Marks)** with cause-and-effect explanations.
  - **Tier 3: Long Numerical / Derivation (5 Marks)** with complete step-by-step working.
- **Flashcard Active Recall Mode:** Students can test their recall before flipping to reveal model answers.

### 🎯 6. Honest Syllabus & Exam Countdown Tracker
- 6 core curriculum subjects with 28 detailed chapters/topics.
- Multi-state topic tracking: *Not Started*, *In Progress*, and *Mastered*.
- Honest, calculated progress percentages — no hardcoded progress bars.
- Dynamic exam countdowns ("Today!", "Tomorrow", "In 4 days") with past-exam handling.

### 🧠 7. Deterministic Recommendation Engine
- Analyzes quiz mistakes, overdue homework assignments, and imminent exam deadlines.
- Automatically generates prioritized study recommendations with transparent explanations (*"Triggered by: Quiz mistake in Current Electricity"*).

---

## 3. Quick Start (Running Locally)

### Option A: 1-Click Launcher (Windows)
Double-click `Start_StudyOS_Local.bat` in the root folder. It starts the server and opens `http://localhost:5173/` in your browser.

### Option B: Manual Terminal Execution
```powershell
# Navigate to the project directory
cd "C:\Users\Laptop Home\.gemini\antigravity\scratch\studyos"

# Install dependencies (only needed once)
npm install

# Start Vite dev server on port 5173
npm run dev
```

Visit in your browser:
- **Local PC:** [http://localhost:5173/](http://localhost:5173/)
- **Mobile / Tablet on same Wi-Fi:** `http://<your-local-ip>:5173/`

---

## 4. Production Build & Deployment

### Build for Production:
```powershell
npm run build
```
The optimized client bundle will be generated in `dist/`.

### Deployment Options:
1. **Netlify Drop:** Drag and drop the `dist/` folder or `studyos-dist-production.zip` directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. **GitHub Pages / Vercel:** Push repository to GitHub and connect to Vercel or enable GitHub Pages.
3. **Local Offline Standalone:** Host using any local static web server or launch with `Start_StudyOS_Local.bat`.

---

## 5. Automated Verification Suite

Run the comprehensive 56-point automated test suite:
```powershell
node src/test/verifyAllFeatures.test.js
```

All 56 assertions verify:
- Diagnostic MCQ question bank integrity
- Exam countdown date arithmetic
- Honest syllabus percentage calculation
- Quiz mistake and weak topic tracking
- Deterministic recommendation generation
- Lesson studio and curriculum search
- 3-tier Q&A generator
- Past paper vault data and marking schemes
- Alhamdia student accounts and registration persistence

---

## 6. Project Structure

```
studyos/
├── public/
│   ├── alhamdia-logo.png        # Official circular gold lion crest
│   ├── alhamdia-logo.jpg        # High-resolution crest asset
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Alhamdia branded sidebar navigation
│   │   ├── Header.jsx           # Top bar with streak, profile, and command launcher
│   │   ├── ZenFocusModal.jsx    # Pomodoro sprint timer & scratchpad
│   │   ├── CommandPaletteModal.jsx # Ctrl+K spotlight launcher
│   │   ├── ProfileModal.jsx     # Student profile & settings modal
│   │   └── ErrorBoundary.jsx    # Graceful error protection
│   ├── pages/
│   │   ├── Login.jsx            # Sign In & Student Account Creation tabs
│   │   ├── Home.jsx             # Exhibition landing presentation
│   │   ├── Dashboard.jsx        # Unified focus dashboard & smart queue
│   │   ├── Tasks.jsx            # Assignment manager & overdue detector
│   │   ├── Exams.jsx            # Board exam timetable & countdown
│   │   ├── Syllabus.jsx         # Chapter-by-chapter mastery tracker
│   │   ├── Lessons.jsx          # Lesson notes & dynamic Q&A active recall
│   │   ├── PastPapers.jsx       # Board past papers (2021-2024) & mock maker
│   │   ├── Quiz.jsx             # Diagnostic MCQs & mistake tracker
│   │   └── Progress.jsx         # Revision analytics & recommendation queue
│   ├── data/
│   │   ├── demoData.js          # Student accounts, syllabus & demo records
│   │   ├── questions.js         # Diagnostic MCQs with explanations
│   │   ├── lessonsData.js       # Curated study notes & worked examples
│   │   ├── topicQAData.js       # 3-tier Q&A generator
│   │   └── pastPapersData.js    # FBISE & Cambridge past board questions
│   ├── utils/
│   │   ├── storage.js           # LocalStorage engine & account manager
│   │   ├── dateUtils.js         # Countdown & deadline arithmetic
│   │   └── recommendations.js   # Deterministic recommendation algorithms
│   ├── test/
│   │   └── verifyAllFeatures.test.js # 56/56 automated test suite
│   ├── App.jsx                  # Main application orchestrator
│   └── main.jsx                 # Entry point
├── index.html                   # HTML entry with official Alhamdia title & meta
├── package.json                 # Dependencies & scripts
└── vite.config.js               # Vite build configuration
```

---

## 7. Privacy & Offline Guarantee

- **Zero Cloud Dependence:** Works 100% offline. Ideal for exhibition stalls and areas with spotty Wi-Fi.
- **Client-Side Storage:** All tasks, exams, progress, and student credentials remain inside the browser's `localStorage`. No data is uploaded to third-party tracking servers.

---
© 2026 Alhamdia International School & College. All rights reserved.
