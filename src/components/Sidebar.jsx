import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Landmark, 
  GraduationCap, 
  Activity, 
  FileText, 
  Globe, 
  User, 
  LogOut,
  Building2,
  Code,
  ChevronRight,
  ShieldCheck,
  UtensilsCrossed,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Sidebar({ activeView, setActiveView, currentUser, onLogout, isMobileMenuOpen, setIsMobileMenuOpen, currentLanguage }) {
  if (!currentUser) return null;

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;
  const role = currentUser.role || 'citizen';

  const defaultAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name || 'User')}`;

  // Role-Specific Authorized Navigation Items (Strict Role Isolation)
  let navItems = [];

  if (role === 'ngo') {
    navItems = [
      { id: 'ngo-panel', label: '🤝 NGO Field Panel', icon: Building2, badge: '17 SDGs' },
      { id: 'sdg-impact', label: '🌍 SDG Analytics', icon: Globe, badge: 'Monitoring' },
      { id: 'profile', label: '👤 NGO Profile', icon: User, badge: null }
    ];
  } else if (role === 'developer') {
    navItems = [
      { id: 'developer-hub', label: '💻 Developer Hub', icon: Code, badge: 'APIs & AI' },
      { id: 'sdg-impact', label: '🌍 SDG Impact Data', icon: Globe, badge: 'Analytics' },
      { id: 'profile', label: '👤 Dev Profile', icon: User, badge: null }
    ];
  } else if (role === 'sdg_admin') {
    navItems = [
      { id: 'sdg-impact', label: '🌍 SDG Monitoring OS', icon: Globe, badge: '17 SDGs' },
      { id: 'profile', label: '👤 Admin Profile', icon: User, badge: null }
    ];
  } else {
    // Default Citizen Role Navigation
    navItems = [
      { id: 'dashboard', label: t.navDashboard || 'Citizen OS', icon: LayoutDashboard, badge: null },
      { id: 'ai-assistant', label: t.navAskAi || 'SustainAI Assistant', icon: Sparkles, badge: 'AI' },
      { id: 'schemes', label: t.navSchemeFinder || 'Smart Scheme Finder', icon: Landmark, badge: 'Schemes' },
      { id: 'education-jobs', label: t.navEduCareer || 'Education & Career', icon: GraduationCap, badge: null },
      { id: 'healthcare', label: t.navHealthCamps || 'Healthcare Camps', icon: Activity, badge: 'Free Camps' },
      { id: 'clean-energy', label: t.navCleanEnergy || 'Clean Solar Grants', icon: Zap, badge: 'Solar & LPG' },
      { id: 'disaster-support', label: t.navDisasterMap || 'Disaster Climate Map', icon: AlertTriangle, badge: 'Radar Map' },
      { id: 'food-donation', label: t.navFoodDonation || 'Excess Food Hub', icon: UtensilsCrossed, badge: 'Zero Waste' },
      { id: 'civic-reporting', label: t.navCivicReporting || 'Civic Issue Reporting', icon: FileText, badge: 'Report' },
      { id: 'sdg-impact', label: t.navSdgImpact || '17 SDGs Analytics', icon: Globe, badge: 'Analytics' },
      { id: 'profile', label: t.navProfile || 'My Profile', icon: User, badge: null }
    ];
  }

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 h-[calc(100vh-4rem)] sticky top-16 shrink-0 p-4">
        
        {/* Citizen Quick Profile Badge */}
        <div 
          onClick={() => setActiveView('profile')}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer mb-6 group"
        >
          <div className="flex items-center space-x-3">
            <img 
              src={currentUser.avatar || defaultAvatar} 
              alt={currentUser.name} 
              className="h-10 w-10 rounded-xl object-cover border border-emerald-500/30 group-hover:scale-105 transition-transform" 
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{currentUser.name}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentUser.ruralDistrict || `${currentUser.city}, ${currentUser.state}`}</p>
              <div className="flex items-center space-x-1 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {role.toUpperCase()} PORTAL ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-2">Authorized Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'} transition-colors`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Impact Summary */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-center space-x-1 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>{t.universalScore}: {currentUser.impactScore || 840}</span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">Strict Role Isolation Enabled for {role.toUpperCase()}.</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full mt-3 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-900/30"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{t.signOut}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-6 animate-in fade-in text-white-force">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span className="text-lg font-bold text-white">SustainAI Menu</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                    activeView === item.id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-300 bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-emerald-400" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-red-950/40 text-red-400 border border-red-900/50 font-semibold text-sm"
          >
            {t.signOut}
          </button>
        </div>
      )}
    </>
  );
}
