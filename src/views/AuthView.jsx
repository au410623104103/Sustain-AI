import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { DEFAULT_DEMO_USER } from '../data/mockDatabase';

export default function AuthView({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Hackathon Quick Gateway</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isRegister ? 'Create Citizen Account' : 'Welcome to SustainAI'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access personalized public services, schemes & SDG impact tracking.
          </p>
        </div>

        {/* PROMINENT DEMO CITIZEN FAST PASS BANNER */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Judge Fast Pass</h3>
              <p className="text-xs text-slate-300">Instant login as default demo citizen: <strong className="text-emerald-400">Arun Kumar</strong> (20yo Low-Income Student seeking education & internship)</p>
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
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Or Sign In Manually</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleCustomAuth} className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800">
          
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required={isRegister}
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="citizen@domain.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{isRegister ? 'Register & Continue' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register Here"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
