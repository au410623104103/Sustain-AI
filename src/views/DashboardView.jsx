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
  Sun
} from 'lucide-react';
import { SAMPLE_SCHEMES, RURAL_DISTRICTS, SAMPLE_NGOS, SAMPLE_RURAL_ISSUES } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';
import { TRANSLATIONS } from '../data/translations';

export default function DashboardView({ currentUser, setActiveView, onSearchSubmit, onCheckEligibility, setRuralDistrict, ruralDistrict, currentLanguage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(ruralDistrict || currentUser?.ruralDistrict || 'Ramanagara Rural District');

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

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

  // Filter active NGOs and issues for selected rural district
  const activeNgosInDistrict = SAMPLE_NGOS.filter(ngo => ngo.operatingDistricts.includes(selectedDistrict));
  const ruralIssuesInDistrict = SAMPLE_RURAL_ISSUES.filter(iss => iss.ruralDistrict === selectedDistrict);

  // Top personalized recommendations
  const recommendedSchemes = SAMPLE_SCHEMES.filter(s => s.matchScore > 88).slice(0, 4);

  const quickActionCards = [
    { id: 'ai-assistant', label: t.askAi || 'Ask SustainAI', icon: Sparkles, color: 'from-emerald-500 to-teal-500', desc: 'AI Assistant Chat' },
    { id: 'clean-energy', label: t.cleanEnergyTitle || 'Clean Energy', icon: Zap, color: 'from-amber-500 to-yellow-500', desc: 'SDG 7 Solar & LPG Grants' },
    { id: 'food-donation', label: t.foodDonationTitle || 'Food Donation', icon: UtensilsCrossed, color: 'from-orange-500 to-amber-500', desc: 'SDG 2 Excess Food Hub' },
    { id: 'education-sponsors', label: t.educationSponsorsTitle || 'Education Sponsors', icon: GraduationCap, color: 'from-blue-500 to-indigo-500', desc: 'SDG 4 Laptop & Fee Grants' },
    { id: 'healthcare', label: t.medicalCampsTitle || 'Medical Camps', icon: Activity, color: 'from-rose-500 to-red-500', desc: 'SDG 3 Free Eye & Health Camps' },
    { id: 'ngo-panel', label: t.ngoPanel || 'NGO Rural Panel', icon: Building2, color: 'from-purple-500 to-indigo-500', desc: '17 SDG Field Operations' },
    { id: 'developer-hub', label: t.developerHub || 'Developer Hub', icon: Code, color: 'from-cyan-500 to-blue-500', desc: 'Build Rural Tech Apps' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Welcome Banner & Greeting */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden text-white-force">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 text-white-force">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 text-white-force">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>SustainAI Platform</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white text-white-force">
              {t.greeting}, {currentUser?.name || 'Citizen'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 text-white-force mt-1">
              {t.platformSubtitle}
            </p>
          </div>

          {/* Universal Impact Counter */}
          <div className="flex items-center space-x-3 text-white-force">
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center text-white-force">
              <p className="text-[10px] text-emerald-400 uppercase tracking-wider text-white-force">{t.universalScore}</p>
              <p className="text-base font-extrabold flex items-center justify-center space-x-1 text-white-force">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-white-force">{currentUser?.impactScore || 840} PTS</span>
              </p>
            </div>
          </div>
        </div>

        {/* Large AI Search/Chat Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-6 relative text-white-force">
          <div className="relative flex items-center">
            <Sparkles className="absolute left-4 h-5 w-5 text-emerald-400 animate-pulse" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
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

      {/* INTEGRATED CITIZEN SDG FEATURE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Clean Energy & Rooftop Solar (SDG 7) */}
        <div 
          onClick={() => setActiveView('clean-energy')}
          className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                SDG 7 - Clean Energy
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Solar & LPG</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform shadow-md">
                ☀️
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{t.cleanEnergyTitle}</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-medium">
              {t.cleanEnergyDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
            <span>{t.calcSolarSubsidy}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Excess Food Share (SDG 2) */}
        <div 
          onClick={() => setActiveView('food-donation')}
          className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20">
                SDG 2 - Zero Hunger
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Donor & Recipient</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-orange-500 text-slate-950 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform shadow-md">
                🍲
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t.foodDonationTitle}</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-medium">
              {t.foodDonationDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-orange-700 dark:text-orange-400">
            <span>{t.exploreFood}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Education Sponsors (SDG 4) */}
        <div 
          onClick={() => setActiveView('education-sponsors')}
          className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                SDG 4 - Quality Education
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Philanthropy Grants</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-500 text-slate-950 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform shadow-md">
                🎓
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t.educationSponsorsTitle}</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-medium">
              {t.educationSponsorsDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-400">
            <span>{t.findSponsors}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Free Rural Medical Camps (SDG 3) */}
        <div 
          onClick={() => setActiveView('healthcare')}
          className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
                SDG 3 - Good Health
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Free Health Checkup</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-rose-500 text-slate-950 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform shadow-md">
                🩺
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{t.medicalCampsTitle}</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-medium">
              {t.medicalCampsDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-400">
            <span>{t.bookCampSlot}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* RURAL AREA NGO HELPING WIDGET */}
      <div className="p-6 rounded-3xl glass-panel border-2 border-emerald-500/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
              🏡
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <span>{t.activeNgosHeading}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                  Live District Tracker
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{t.activeNgosSub}</p>
            </div>
          </div>

          {/* Rural District Selector */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setRuralDistrict && setRuralDistrict(e.target.value);
              }}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-emerald-500/40 text-slate-900 dark:text-white font-bold text-xs focus:outline-none"
            >
              {RURAL_DISTRICTS.map(rd => (
                <option key={rd.id} value={rd.name}>{rd.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Helping NGOs & Active Field Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeNgosInDistrict.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 col-span-full">No registered NGOs for this rural district yet.</p>
          ) : (
            activeNgosInDistrict.map((ngo) => (
              <div 
                key={ngo.id} 
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {t.verifiedNgo}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">{ngo.impactScore} PTS</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{ngo.name}</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-3">Headquarters: {ngo.headquarters} (Leader: {ngo.leaderName})</p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold block text-[11px]">{t.activeProjects}</span>
                    {ngo.activeProjects.map((proj, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-200 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{t.clearedIssues} <strong className="text-emerald-700 dark:text-emerald-400">{ngo.issuesCleared} Issues</strong></span>
                  <button 
                    onClick={() => setActiveView('ngo-panel')}
                    className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                  >
                    <span>{t.viewNgoPanel}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Active Rural Issues in this District */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Field NGO Issues & Status in {selectedDistrict} ({ruralIssuesInDistrict.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ruralIssuesInDistrict.map((iss) => (
              <div key={iss.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between shadow-sm">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">{iss.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">{iss.village} • {iss.sdgName}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                  iss.status === 'Cleared' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                }`}>
                  {iss.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK SERVICE & ROLE PORTALS */}
      <div>
        <h2 className="text-base font-bold mb-4">Quick Service & Role Portals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {quickActionCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveView(card.id)}
                className="glass-panel glass-panel-hover p-4 rounded-2xl cursor-pointer group text-center flex flex-col items-center justify-center space-y-2 border border-slate-200 dark:border-slate-800"
              >
                <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${card.color} shadow-md flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white text-white-force group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xs font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{card.label}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block font-medium">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended For You Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold flex items-center space-x-2">
              <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>Recommended Government Schemes & Scholarships</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Matched 95%+ against your citizen profile & rural location.</p>
          </div>

          <button
            onClick={() => setActiveView('schemes')}
            className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center space-x-1"
          >
            <span>View All Schemes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendedSchemes.map((scheme) => {
            const schemeSdgs = (scheme.sdgs || []).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
            return (
              <div key={scheme.id} className="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {scheme.matchScore}% Profile Match
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{scheme.provider}</span>
                  </div>

                  <h3 className="text-sm font-bold mb-1.5">{scheme.name}</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">{scheme.description}</p>
                  
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Benefits: </span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold">{scheme.benefits}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {schemeSdgs.map(sdg => (
                      <span key={sdg.id} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: sdg.color }}>
                        {sdg.number}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onCheckEligibility(scheme)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center space-x-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{t.checkEligibility}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
