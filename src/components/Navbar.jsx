import React, { useState } from 'react';
import { Sparkles, Bell, Key, User, Menu, X, CheckCircle2, Sun, Moon, Languages, RefreshCw, Radio, LogOut, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Navbar({ 
  currentUser, 
  activeView, 
  setActiveView, 
  notifications, 
  setNotifications, 
  onOpenApiKeyModal,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isDarkMode,
  setIsDarkMode,
  currentLanguage,
  setCurrentLanguage,
  onResetDatabase,
  onLogout
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const languages = [
    { code: 'English', label: 'English' },
    { code: 'Hindi', label: 'हिंदी (Hindi)' },
    { code: 'Telugu', label: 'తెలుగు (Telugu)' },
    { code: 'Tamil', label: 'தமிழ் (Tamil)' }
  ];

  const defaultAvatar = currentUser ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser.name)}` : '';

  const roleTitles = {
    citizen: '👤 Citizen Portal',
    ngo: '🤝 NGO Partner Network',
    developer: '💻 Developer Hub',
    sdg_admin: '🌍 SDG Administrator Command'
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Realtime Sync Indicator */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView(currentUser ? 'dashboard' : 'landing')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/30 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Sustain<span className="text-emerald-500">AI</span>
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {roleTitles[currentUser?.role || 'citizen'] || 'Portal'}
                </span>
              </div>
              
              {/* Real-time HTML5 BroadcastChannel status pill */}
              <div className="flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
                <span>Live Broadcast Bus Active</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Language, Theme, API Key, Notifications, Avatar & Logout */}
          <div className="flex items-center space-x-3">
            
            {/* Multilingual Selector */}
            <div className="relative flex items-center">
              <Languages className="h-4 w-4 text-emerald-600 dark:text-emerald-400 absolute left-2.5 pointer-events-none" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-all"
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {/* Reset Database Button */}
            <button
              onClick={onResetDatabase}
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-all"
              title="Reset Persistent Local Storage to Seed Defaults"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Reset DB</span>
            </button>

            {/* Gemini API Key Trigger */}
            <button
              onClick={onOpenApiKeyModal}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
            >
              <Key className="h-3.5 w-3.5" />
              <span>Gemini API</span>
            </button>

            {/* Notifications Icon & Drawer */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-all relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Drawer */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-emerald-500" />
                        <span className="font-bold text-sm">Community Updates</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1 font-bold"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-slate-200 dark:divide-slate-800/60 max-h-80 overflow-y-auto my-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 py-6 text-center">No community notifications yet.</p>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n.id} 
                            onClick={() => {
                              if (n.link === 'ngo-panel') setActiveView('ngo-panel');
                              else if (n.link === 'developer-hub') setActiveView('developer-hub');
                              else if (n.link === 'schemes') setActiveView('schemes');
                              else setActiveView('dashboard');
                              setShowNotifications(false);
                            }}
                            className={`py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                              !n.read ? 'bg-slate-100 dark:bg-slate-900/80 border-l-2 border-emerald-500' : 'hover:bg-slate-100 dark:hover:bg-slate-900/40 opacity-75'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h4>
                              <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-snug">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile Box & Logout Button */}
            {currentUser ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div 
                  onClick={() => setActiveView('profile')}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 border border-emerald-500/40 p-0.5 overflow-hidden group-hover:border-emerald-400 transition-all flex items-center justify-center">
                    <img 
                      src={currentUser.avatar || defaultAvatar} 
                      alt={currentUser.name} 
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{currentUser.ruralDistrict || 'Ramanagara District'}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 hover:border-red-500/40 transition-all"
                  title="Logout Session"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
