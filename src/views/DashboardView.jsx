import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Landmark, 
  GraduationCap, 
  Briefcase, 
  Activity, 
  AlertTriangle, 
  FileText, 
  Globe, 
  CheckCircle2, 
  Award,
  Zap,
  Building2,
  MapPin,
  HeartHandshake,
  ShieldCheck,
  Code,
  UtensilsCrossed,
  Calendar,
  Gift,
  Sun,
  ShieldAlert,
  Clock,
  ChevronDown,
  ChevronUp,
  UserCheck,
  BarChart3,
  TreePine,
  Trash2,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { SAMPLE_SCHEMES, RURAL_DISTRICTS, SAMPLE_NGOS, SAMPLE_RURAL_ISSUES } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';
import { aiEngine } from '../services/aiEngine';
import AiExplainableCard from '../components/AiExplainableCard';
import AiRiskCard from '../components/AiRiskCard';
import SdgAnalyticsGrid from '../components/SdgAnalyticsGrid';

export default function DashboardView({ currentUser, setActiveView, onSearchSubmit, onCheckEligibility, setRuralDistrict, ruralDistrict, currentLanguage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(ruralDistrict || currentUser?.ruralDistrict || 'Ramanagara Rural District');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // AI OS Engines Computation
  const dailyBriefing = aiEngine.generateAiDailyBriefing(currentUser || {});
  const aiRecommendations = aiEngine.generateExplainableRecommendations(currentUser || {});
  const citizenPersonaBadges = aiEngine.generateCitizenPersona(currentUser || {});
  const aiRisks = aiEngine.generateAiRiskAnalysis(currentUser || {});
  const impactBreakdown = aiEngine.generateUniversalImpactBreakdown(currentUser || {});

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearchSubmit(searchQuery);
  };

  const setDemoPrompt = () => {
    const demo = "I am a college student from a low-income family. I need financial support for my education and want internship opportunities.";
    setSearchQuery(demo);
    onSearchSubmit(demo);
  };

  // Filter recommendations by category
  const filteredRecommendations = activeCategoryFilter === 'All'
    ? aiRecommendations
    : aiRecommendations.filter(r => r.category.includes(activeCategoryFilter));

  // Dynamic Activity Timeline Log
  const activityTimeline = [
    { dateGroup: 'Today', title: 'Applied for Post-Matric Education Scholarship', category: 'Education', status: 'Under Verification', icon: GraduationCap, time: '10:15 AM' },
    { dateGroup: 'Today', title: 'Booked Free Appointment at Multi-Specialty Health Camp', category: 'Healthcare', status: 'Confirmed Ticket', icon: Activity, time: '09:30 AM' },
    { dateGroup: 'Today', title: 'Reported Main Drinking Water Pipeline Burst', category: 'Civic', status: 'NGO Field Assigned', icon: FileText, time: '08:45 AM' },
    { dateGroup: 'Yesterday', title: 'Saved PM Surya Ghar Solar Subsidy to Profile', category: 'Clean Energy', status: 'Eligible', icon: Zap, time: '04:20 PM' },
    { dateGroup: 'Yesterday', title: 'Completed AI Citizen Intelligence Assessment', category: 'AI Readiness', status: '94% Score', icon: Sparkles, time: '02:10 PM' }
  ];

  // AI Ecosystem Admin Analytics Metrics
  const ecosystemAnalytics = [
    { label: 'Total Citizens Empowered', value: '48,250', icon: UserCheck, color: 'text-emerald-500' },
    { label: 'Rural NGOs Connected', value: '184', icon: Building2, color: 'text-purple-500' },
    { label: 'Schemes & Grants Applied', value: '12,490', icon: Landmark, color: 'text-blue-500' },
    { label: 'Free Medical Camps Hosted', value: '340', icon: Activity, color: 'text-rose-500' },
    { label: 'Trees Planted & Geo-Tagged', value: '8,920', icon: TreePine, color: 'text-teal-500' },
    { label: 'Excess Meals Distributed', value: '14,600', icon: UtensilsCrossed, color: 'text-orange-500' },
    { label: 'Solar Rooftops Dispatched', value: '1,820', icon: Zap, color: 'text-amber-500' },
    { label: 'Disaster Telemetry Alerts', value: '92', icon: AlertTriangle, color: 'text-red-500' },
    { label: 'UN SDGs Impacted', value: '17 / 17', icon: Globe, color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* FEATURE 9 & 14: DASHBOARD HERO SECTION + AI DAILY BRIEFING OS COMMAND CENTER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden text-white-force">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 text-white-force">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 text-white-force">
              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>SustainAI Operating System • Real-Time AI Engine Active</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white text-white-force">
              {dailyBriefing.greeting}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 text-white-force mt-2 max-w-2xl font-medium leading-relaxed">
              {dailyBriefing.briefingSummary}
            </p>

            {/* AI Daily Briefing Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {dailyBriefing.items.map((item, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-white-force shadow-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Citizen Impact Score & AI Readiness Ring */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 text-white-force shrink-0">
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center text-white-force shadow-xl min-w-[180px]">
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest text-white-force mb-0.5">{t.universalScore}</p>
              <p className="text-xl font-black text-white text-white-force flex items-center justify-center space-x-1">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-white-force">{currentUser?.impactScore || 840} PTS</span>
              </p>
              <span className="text-[9px] text-slate-400 text-white-force block mt-1">Level 4 Citizen Innovator</span>
            </div>
          </div>
        </div>

        {/* AI Natural Language Search & Router (Feature 7) */}
        <form onSubmit={handleSearchSubmit} className="mt-6 relative text-white-force">
          <div className="relative flex items-center">
            <Sparkles className="absolute left-4 h-5 w-5 text-emerald-400 animate-pulse" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your need in plain language... (e.g., 'I need financial support for college' or 'My village has water leakage')"
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/40 text-white text-white-force placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 text-xs sm:text-sm shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-1.5"
            >
              <span>{t.askAi}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Preset Shortcut Pill */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] flex items-center space-x-1 text-white-force">
              <Zap className="h-3 w-3 text-amber-400" />
              <span>{t.tryDemo}</span>
            </span>
            <button
              type="button"
              onClick={setDemoPrompt}
              className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-white-force hover:text-emerald-400 hover:border-emerald-500/40 text-[11px] transition-colors"
            >
              "I am a college student looking for financial assistance and internship opportunities." →
            </button>
          </div>
        </form>
      </div>

      {/* FEATURE 4 & 11: 360° CITIZEN PERSONA & AI SUMMARY WIDGET */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>AI Citizen 360° Persona & Eligibility Summary</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Automatic intelligence classification synthesized from your profile demographics.</p>
          </div>

          {/* Citizen Persona Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            {citizenPersonaBadges.map((badge, idx) => (
              <span key={idx} className={`px-3 py-1 rounded-full border text-xs ${badge.color}`}>
                {badge.icon} {badge.title}
              </span>
            ))}
          </div>
        </div>

        {/* 360 Grid Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Health Status</span>
            <strong className="text-slate-900 dark:text-white font-extrabold">Good • Eye Camp Booked</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Education Level</span>
            <strong className="text-blue-600 dark:text-blue-400 font-extrabold">{currentUser?.educationLevel || 'Undergraduate'}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Employment Fit</span>
            <strong className="text-purple-600 dark:text-purple-400 font-extrabold">6 Jobs Matched</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Income Category</span>
            <strong className="text-amber-600 dark:text-amber-400 font-extrabold">{currentUser?.incomeCategory || 'Low Income'}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Climate Threat</span>
            <strong className="text-red-600 dark:text-red-400 font-extrabold">High Flood Risk</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Overall AI Readiness</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">94% (Active OS)</strong>
          </div>
        </div>
      </div>

      {/* FEATURE 1, 2, 3: EXPLAINABLE AI RECOMMENDATION DASHBOARD CAROUSEL */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Personalized Intelligence Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Today's AI Explainable Recommendation Cards</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Scholarships', 'Healthcare', 'Clean Energy', 'Employment', 'Food Security', 'Environment'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
                  activeCategoryFilter === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Explainable AI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((rec) => (
            <AiExplainableCard
              key={rec.id}
              recommendation={rec}
              onAction={(targetView) => setActiveView(targetView)}
              onCheckEligibility={onCheckEligibility}
            />
          ))}
        </div>
      </div>

      {/* FEATURE 12: AI RISK ANALYSIS MATRIX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <span>AI Risk Assessment & Mitigation Engine</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Live Threat Telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiRisks.map((risk) => (
            <AiRiskCard
              key={risk.id}
              risk={risk}
              onMitigate={() => {
                if (risk.category.includes('Climate')) setActiveView('disaster-support');
                else if (risk.category.includes('Education')) setActiveView('education-jobs');
                else setActiveView('healthcare');
              }}
            />
          ))}
        </div>
      </div>

      {/* FEATURE 5: 17 UN SDG IMPACT ANALYTICS GRID */}
      <SdgAnalyticsGrid onSelectSdg={() => setActiveView('sdg-impact')} />

      {/* FEATURE 18 & 6: UNIVERSAL IMPACT SCORE BREAKDOWN & CITIZEN ACTIVITY TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Universal Impact Score 6-Category Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="h-4 w-4 text-emerald-500" />
              <span>Universal Impact Score Breakdown ({impactBreakdown.totalScore} PTS)</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {impactBreakdown.breakdown.map((b, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                <span className="text-xs">{b.icon}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold truncate">{b.title}</span>
                <strong className="text-base font-black text-emerald-600 dark:text-emerald-400">+{b.score} PTS</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Citizen Activity Timeline (Feature 6) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              <span>Citizen Activity Timeline</span>
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Real-Time Sync</span>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {activityTimeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.dateGroup} • {item.time} ({item.category})</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 shrink-0">
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FEATURE 10: AI ECOSYSTEM ADMIN ANALYTICS */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              <span>SustainAI Ecosystem Analytics & Impact Metrics</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Aggregated real-time metrics across all 17 UN Sustainable Development Goals.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {ecosystemAnalytics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div key={i} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs text-center">
                <Icon className={`h-4 w-4 mx-auto ${metric.color}`} />
                <strong className="text-sm font-black text-slate-900 dark:text-white block">{metric.value}</strong>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold block leading-tight">{metric.label}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
