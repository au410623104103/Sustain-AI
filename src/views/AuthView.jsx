import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { DEFAULT_DEMO_USER } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';

export default function AuthView({ onLoginSuccess, currentLanguage }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const handleCustomAuth = (e) => {
    e.preventDefault();
    const newUser = {
      ...DEFAULT_DEMO_USER,
      name: name || 'Citizen User',
      email: email || 'citizen@sustainai.gov.in'
    };
    onLoginSuccess(newUser);
  };

  const handleDemoLogin = () => {
    onLoginSuccess(DEFAULT_DEMO_USER);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Top Header Card */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SustainAI Gateway</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isRegister ? t.signUp : t.welcomeAuthTitle}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {t.welcomeAuthSub}
          </p>
        </div>

        {/* PROMINENT DEMO CITIZEN FAST PASS BANNER */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-2xl space-y-3 relative overflow-hidden text-white-force">
          <div className="flex items-center space-x-3 text-white-force">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-white-force">
              ⚡
            </div>
            <div className="text-white-force">
              <h3 className="text-sm font-extrabold text-white text-white-force">Judge Fast Pass</h3>
              <p className="text-xs text-slate-300 text-white-force">Instant login as default demo citizen: <strong className="text-emerald-400 text-white-force">Arun Kumar</strong></p>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>Continue as Demo Citizen (Recommended)</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Or Sign In Manually</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleCustomAuth} className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.fullName}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required={isRegister}
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.emailAddress}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="citizen@domain.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.password}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>{isRegister ? 'Register & Continue' : t.signIn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-bold"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register Here"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
