import React, { useState } from 'react';
import { Sparkles, Bell, Key, User, Menu, X, Building2, Code, Globe, CheckCircle2, Sun, Moon, Heart, Home } from 'lucide-react';

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
  setIsDarkMode
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView(currentUser ? 'dashboard' : 'landing')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/30 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">Sustain<span className="gradient-text-emerald">AI</span></span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                  <Heart className="h-2.5 w-2.5 text-emerald-400 fill-emerald-400" />
                  <span>Human-Centric SDG 2030</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Empowering Citizens • Rural Field NGOs • Developers</p>
            </div>
          </div>

          {/* Desktop Multi-Role Switcher Pills (Clean Single Icons) */}
          <nav className="hidden md:flex items-center space-x-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
            <button 
              onClick={() => setActiveView(currentUser ? 'dashboard' : 'landing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeView === 'landing' || activeView === 'dashboard'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="h-3.5 w-3.5 text-slate-950" />
              <span>Citizen Portal</span>
            </button>

            <button 
              onClick={() => {
                if (!currentUser) setActiveView('auth');
                else setActiveView('ngo-panel');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeView === 'ngo-panel'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>NGO Field Panel</span>
            </button>

            <button 
              onClick={() => {
                if (!currentUser) setActiveView('auth');
                else setActiveView('developer-hub');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeView === 'developer-hub'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code className="h-3.5 w-3.5 text-purple-400" />
              <span>Developer Hub</span>
            </button>

            <button 
              onClick={() => setActiveView('sdg-impact')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeView === 'sdg-impact'
                  ? 'bg-slate-800 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="h-3.5 w-3.5 text-amber-400" />
              <span>17 UN SDGs</span>
            </button>
          </nav>

          {/* Right Action Controls: Light/Dark Theme Switch + AI Settings + Notifications + Profile */}
          <div className="flex items-center space-x-2">
            
            {/* LIGHT / DARK THEME TOGGLE BUTTON */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:scale-105 transition-all text-xs flex items-center space-x-1 shadow-sm"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
                  <span className="hidden lg:inline text-[11px] font-bold text-slate-200">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-indigo-500 fill-indigo-500/20" />
                  <span className="hidden lg:inline text-[11px] font-bold text-slate-800">Dark Mode</span>
                </>
              )}
            </button>

            {/* Gemini API Key Toggle */}
            <button
              onClick={onOpenApiKeyModal}
              title="Configure AI API Key"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-xs flex items-center space-x-1"
            >
              <Key className="h-4 w-4" />
              <span className="hidden lg:inline font-mono text-[11px]">AI Settings</span>
            </button>

            {/* Notification Dropdown Button */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all relative"
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
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-emerald-400" />
                        <span className="font-semibold text-sm text-white">Community Updates</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-emerald-400 hover:underline flex items-center space-x-1"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto my-2">
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
                              !n.read ? 'bg-slate-900/80 border-l-2 border-emerald-500' : 'hover:bg-slate-900/40 opacity-75'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <h4 className="text-xs font-semibold text-white">{n.title}</h4>
                              <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 leading-snug">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Avatar / Auth Button */}
            {currentUser ? (
              <div 
                onClick={() => setActiveView('profile')}
                className="flex items-center space-x-2 pl-2 border-l border-slate-800 cursor-pointer group"
              >
                <div className="h-9 w-9 rounded-full bg-slate-800 border border-emerald-500/40 p-0.5 overflow-hidden group-hover:border-emerald-400 transition-all">
                  <img 
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                    alt={currentUser.name} 
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-400 font-medium">{currentUser.ruralDistrict || 'Ramanagara District'}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveView('auth')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold text-xs hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
