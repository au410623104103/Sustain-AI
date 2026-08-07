import React, { useState } from 'react';
import { GraduationCap, Briefcase, BookOpen, Award, CheckCircle2, Clock, MapPin, Sparkles, ExternalLink, Laptop, ShieldCheck } from 'lucide-react';
import { SAMPLE_OPPORTUNITIES, SAMPLE_SCHEMES } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';
import { TRANSLATIONS } from '../data/translations';

export default function EducationJobsView({ onCheckEligibility, currentLanguage }) {
  const [activeTab, setActiveTab] = useState('scholarships');

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // Rich Extended Scholarships Array (Guarantees zero blank pages!)
  const scholarships = [
    ...SAMPLE_SCHEMES.filter(s => s.category.some(c => c.includes('Education'))),
    {
      id: 'SCH-EDU-101',
      name: 'Vidya Samriddhi Post-Graduate Fellowship 2026',
      category: ['Education & Financial'],
      sdgs: [4, 5, 8],
      provider: 'Karnataka State Higher Education Council',
      description: '100% tuition coverage + ₹5,000/month research stipend for students from low-income rural households pursuing M.Sc, M.Tech, and M.A degrees.',
      benefits: '100% Tuition Waiver + ₹5,000 Monthly Research Stipend',
      type: 'Government Fellowship',
      deadline: '2026-10-15',
      eligibility: { minAge: 20, maxAge: 30, incomeMax: 'Below ₹3.5 Lakhs' }
    },
    {
      id: 'SCH-EDU-102',
      name: 'STEM Rural Girl Student Education Grant',
      category: ['Education & Financial'],
      sdgs: [4, 5, 10],
      provider: 'Infosys Science Foundation & Department of Science & Tech',
      description: 'Provides free laptop + ₹25,000 annual education grant for female students pursuing Diploma or B.E/B.Tech engineering programs.',
      benefits: 'Free High-Spec Laptop + ₹25,000 Annual Study Allowance',
      type: 'CSR Education Grant',
      deadline: '2026-11-01',
      eligibility: { minAge: 17, maxAge: 24, incomeMax: 'Below ₹4.0 Lakhs' }
    },
    {
      id: 'SCH-EDU-103',
      name: 'Dr. B.R. Ambedkar Overseas Education Scholarship',
      category: ['Education & Financial'],
      sdgs: [4, 10],
      provider: 'Social Welfare Department',
      description: 'Financial assistance of up to ₹20.0 Lakhs for meritorious SC/ST and rural students admitted to accredited foreign universities.',
      benefits: 'Up to ₹20.0 Lakhs Full Overseas Academic Subsidy',
      type: 'International Grant',
      deadline: '2026-12-01',
      eligibility: { minAge: 21, maxAge: 35, incomeMax: 'Below ₹6.0 Lakhs' }
    },
    {
      id: 'SCH-EDU-104',
      name: 'National Means-cum-Merit High School Scholarship (NMMSS)',
      category: ['Education & Financial'],
      sdgs: [4, 1],
      provider: 'Ministry of Human Resource Development (MHRD)',
      description: '₹12,000 per annum scholarship awarded to meritorious students from Class IX to XII to prevent high school dropouts.',
      benefits: '₹12,000 Yearly High School Education Cash Entitlement',
      type: 'Merit Scholarship',
      deadline: 'Ongoing',
      eligibility: { minAge: 13, maxAge: 18, incomeMax: 'Below ₹2.5 Lakhs' }
    }
  ];

  // Rich Extended Internships & Jobs Array
  const opportunities = [
    ...SAMPLE_OPPORTUNITIES,
    {
      id: 'OPP-103',
      title: 'Rural Clean Water IoT Sensor Maintenance Lead',
      provider: 'Gram Vikas Rural Water Foundation',
      type: 'Paid Apprenticeship',
      location: 'Ramanagara District',
      stipend: '₹14,000 / month',
      duration: '6 Months',
      eligibility: 'Diploma in Electrical / Mechanical / ITI Graduates'
    },
    {
      id: 'OPP-104',
      title: 'Solar Microgrid Field Operations Associate',
      provider: 'Clean Energy Farmers Guild',
      type: 'Full-Time Job',
      location: 'Mandya & Tumakuru Rural',
      stipend: '₹18,000 / month',
      duration: '1 Year Contract',
      eligibility: 'Pass 12th / ITI / Any Graduate'
    },
    {
      id: 'OPP-105',
      title: 'Digital Health & Tele-Medicine Assistant',
      provider: 'Seva Arogya Rural Health Trust',
      type: 'Paid Internship',
      location: 'Chikballapur Health Center',
      stipend: '₹11,500 / month',
      duration: '3 Months',
      eligibility: 'B.Sc Nursing / Life Sciences / General Graduates'
    },
    {
      id: 'OPP-106',
      title: 'AI Data Entry & Local Survey Annotator',
      provider: 'SustainAI Youth Skills Wing',
      type: 'Remote Work',
      location: 'Work From Home / Village Kiosk',
      stipend: '₹15,000 / month',
      duration: 'Ongoing',
      eligibility: 'Basic Computer & Laptop Literacy'
    }
  ];

  // Rich Skill Courses Array
  const courses = [
    {
      id: 'CRS-201',
      title: 'Python for Environmental Data Analysis & AI',
      duration: '6 Weeks (Self-Paced)',
      level: 'Beginner to Intermediate',
      certifiedBy: 'SustainAI & IIT Madras NPTEL',
      fee: '100% Free (Government Subsidized)',
      skills: ['Python Basics', 'Pandas', 'Climate Data Visualization', 'AI Prompts']
    },
    {
      id: 'CRS-202',
      title: 'Solar Rooftop Installation & Inverter Technician Certification',
      duration: '4 Weeks (Practical Workshops)',
      level: 'Hands-on Vocational',
      certifiedBy: 'National Skill Development Corporation (NSDC)',
      fee: '100% Free + ₹2,000 Kit Allowance',
      skills: ['Solar Panel Wiring', 'Inverter Calibration', 'Battery Safety']
    },
    {
      id: 'CRS-203',
      title: 'Digital Literacy, Tally Prime & Office Data Entry',
      duration: '8 Weeks',
      level: 'Foundation',
      certifiedBy: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
      fee: '100% Free',
      skills: ['MS Excel', 'Tally ERP', 'E-Governance Portals', 'Cyber Hygiene']
    },
    {
      id: 'CRS-204',
      title: 'Organic Sustainable Farming & Drone Crop Surveying',
      duration: '3 Weeks',
      level: 'Agri-Tech Certification',
      certifiedBy: 'University of Agricultural Sciences',
      fee: '100% Free',
      skills: ['Bio-Pesticides', 'Drone Mapping', 'Soil Health Analytics']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>Youth & Citizen Development</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Education & Career Empowerment Hub</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">Discover scholarships, green internships, digital skill bootcamps, and career grants.</p>
        </div>

        <div className="flex items-center space-x-2 p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
          <Award className="h-4 w-4 text-emerald-500" />
          <span>SDG 4 Quality Education & SDG 8 Decent Work</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('scholarships')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'scholarships' 
              ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>🎓 Scholarships & Education Grants ({scholarships.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('internships')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'internships' 
              ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>💼 Internships & Job Openings ({opportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 shrink-0 ${
            activeTab === 'courses' 
              ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>📚 UN SDG Skill Bootcamps ({courses.length})</span>
        </button>
      </div>

      {/* Scholarships Tab Content */}
      {activeTab === 'scholarships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((sch) => {
            const schSdgs = (sch.sdgs || [4, 5]).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
            return (
              <div key={sch.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {sch.type || 'Scholarship Grant'}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Deadline: {sch.deadline}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{sch.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-semibold">{sch.provider}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed font-medium">{sch.description}</p>

                  <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">Stipend / Benefit Granted:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{sch.benefits}</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {schSdgs.map(sdg => (
                      <span key={sdg.id} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: sdg.color }}>
                        {sdg.number} - {sdg.shortTitle}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onCheckEligibility && onCheckEligibility(sch)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Check Eligibility</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Internships & Jobs Tab Content */}
      {activeTab === 'internships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <div key={opp.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                    {opp.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{opp.location}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{opp.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-semibold">{opp.provider}</p>

                <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Monthly Stipend / Salary:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{opp.stipend}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Contract Duration:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{opp.duration}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Eligibility: {opp.eligibility}</span>
                <button
                  onClick={() => alert(`Application registered for ${opp.title}! Confirmation notification sent to your dashboard.`)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-extrabold text-xs hover:shadow-lg transition-all"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Courses & Bootcamps Tab Content */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((crs) => (
            <div key={crs.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
                    {crs.fee}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Duration: {crs.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{crs.title}</h3>
                <p className="text-xs text-purple-700 dark:text-purple-400 mb-3 font-semibold">Certified By: {crs.certifiedBy}</p>

                <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-semibold uppercase tracking-wider block">Key Modules Covered:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {crs.skills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[10px] font-bold border border-slate-200 dark:border-slate-800">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Level: {crs.level}</span>
                <button
                  onClick={() => alert(`Enrolled in ${crs.title}! Access course materials on your portal dashboard.`)}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-extrabold text-xs hover:bg-purple-500 transition-all flex items-center space-x-1"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Start Free Bootcamp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
