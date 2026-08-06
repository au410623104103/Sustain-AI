# SustainAI – AI-Powered Citizen Intelligence Platform for Sustainable Development

> **Tagline:** “One Platform. Every Citizen. Every Service. Every SDG.”

SustainAI is an AI-powered citizen intelligence web application built for sustainable development. It addresses the challenge of fragmented public services by acting as a single, unified gateway. SustainAI understands a citizen's demographic profile and stated needs in natural language, matching them with relevant government welfare schemes, scholarships, paid internships, healthcare services, emergency hotlines, and civic reporting tools—all mapped directly to the 17 United Nations Sustainable Development Goals (SDGs).

---

## 🚀 Key Innovation & Highlights

1. **Natural Language Citizen Intent Understanding:**
   Citizens don't need to search across 30+ government websites or understand technical legal criteria. They can type their situation in natural human language (e.g. *"I am a college student from a low-income family seeking financial assistance and internship opportunities"*).

2. **Smart Need & Category Extraction:**
   The platform identifies targeted need pillars (*Education + Financial Support + Employment*) and surfaces verified matched schemes with match percentages.

3. **Integrated 17 UN SDG Framework:**
   Every opportunity, scholarship, and civic report calculates and visualizes its direct contribution toward United Nations SDGs (such as SDG 1 - No Poverty, SDG 4 - Quality Education, SDG 8 - Decent Work, SDG 10 - Reduced Inequalities, and SDG 17 - Partnerships).

4. **Interactive Scheme Match Evaluator:**
   Citizens can click **"Check Eligibility"** on any scheme card to view a breakdown comparing their age, income tier, education, state, and occupation against the scheme criteria.

5. **Civic & Climate Incident Reporting:**
   Citizens can submit civic issues (water pipe leakages, uncollected garbage, road damage, pollution) with photo upload simulation and instantly receive a tracking ticket (e.g., `CIV-2026-1042`).

6. **Hackathon Zero-Downtime Guarantee:**
   Supports live Google Gemini AI API integration alongside an intelligent rule-based offline engine. If no API key is provided or external networks drop, SustainAI continues to run smoothly.

---

## 🌟 Core Demo Scenario Walkthrough (For Hackathon Judges)

Follow these steps to evaluate the prototype in under 2 minutes:

1. **Launch App & Landing Page:**
   - Open the web application. View the landing page hero, 7 service categories, and the 17 UN SDGs grid.
   - Click **"Get Started"** or **"Demo Login"**.

2. **One-Click Demo Citizen Login:**
   - On the Auth screen, click **"Continue as Demo Citizen (Recommended)"**.
   - This pre-fills the evaluator profile as **Arun Kumar** (20-year-old Undergraduate Student from a Low-Income family seeking Education, Financial Support & Employment).

3. **Explore Dashboard & Run AI Query:**
   - The Citizen Dashboard welcomes Arun Kumar.
   - Click the preset demo query pill: *"I am a college student from a low-income family. I need financial support for my education and want internship opportunities."*
   - Click **"Ask AI"**.

4. **Review AI Recommendations & SDG Impact:**
   - SustainAI extracts citizen needs: **Education**, **Financial Assistance**, **Employment**.
   - Review structured cards:
     - 🎓 **National Higher Education Support Grant** (100% Tuition Fee Waiver + Monthly Stipend).
     - 💼 **PM National Youth Internship Program** (₹5,000/month stipend + Skill Voucher).
   - Review SDG Impact mapping: **SDG 1**, **SDG 4**, **SDG 8**, **SDG 10**, **SDG 17**.

5. **Test Interactive Eligibility Checker:**
   - Click **"Check Eligibility"** on any scheme card to open the live match score popup.
   - Click **"Apply / Connect Now"** to submit.

6. **Test Civic & Environmental Reporting:**
   - Navigate to **Civic & Environment** from the sidebar.
   - Select issue (e.g. *Water Leakage*), type a title & description, and click **Submit Grievance**.
   - Observe tracking ticket generation (`CIV-2026-XXXX`) and assigned municipal department.

---

## 🛠 Tech Stack

- **Frontend Framework:** React + Vite
- **Styling:** Tailwind CSS v4 (Glassmorphism design, vibrant dark palette, custom micro-animations)
- **Icons:** Lucide React (`lucide-react`)
- **Data Analytics Charts:** Recharts (`recharts`)
- **AI Integration:** Google Gemini API adapter (`fetch`) with intelligent offline rule-based fallback
- **State Management:** React Hooks & Context

---

## ⚡ Local Setup & Execution Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Quick Start Commands

```bash
# 1. Clone or navigate into project directory
cd "Sustain-AI Prototype"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

After running `npm run dev`, open your browser at the local URL (usually `http://localhost:5173`).

### Production Build Verification

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
Sustain-AI Prototype/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top header navigation & notification drawer
│   │   ├── Sidebar.jsx          # Responsive side menu
│   │   ├── EligibilityModal.jsx # Interactive scheme match popup
│   │   └── ApiKeyModal.jsx      # Gemini API key settings drawer
│   ├── data/
│   │   ├── sdgData.js           # 17 UN SDGs metadata, colors & icons
│   │   └── mockDatabase.js      # Demo citizen, 10+ schemes, jobs, civic reports
│   ├── services/
│   │   └── aiService.js         # Gemini API handler & smart mock rule engine
│   ├── views/
│   │   ├── LandingView.jsx      # Hero, problem comparison, 7 pillars, 17 SDGs
│   │   ├── AuthView.jsx         # Auth & "Continue as Demo Citizen" fast pass
│   │   ├── ProfileView.jsx      # Demographic profiler & needs selector
│   │   ├── DashboardView.jsx    # Citizen hub with quick action cards
│   │   ├── AiAssistantView.jsx  # Conversational ChatGPT-style assistant
│   │   ├── SchemeFinderView.jsx # Multi-filter government scheme discovery
│   │   ├── EducationJobsView.jsx# Scholarships, courses & internship portal
│   │   ├── HealthcareView.jsx   # Free UPHC clinic finder & SOS 108 trigger
│   │   ├── CivicReportingView.jsx# Ticketed civic grievance submitter
│   │   └── SdgDashboardView.jsx # Recharts analytics for 17 UN SDGs
│   ├── App.jsx                  # Main layout & app state
│   ├── index.css                # Tailwind directives & design tokens
│   └── main.jsx                 # Entry point
├── package.json
├── vite.config.js
└── README.md
```

---

*Built with ❤️ for Sustainable Development and Citizen Empowerment.*
