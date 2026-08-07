import React from 'react';
import { Sparkles, Globe, ArrowRight, ShieldCheck, HeartHandshake, GraduationCap, Zap, Activity } from 'lucide-react';

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full text-center space-y-8 relative z-10 my-auto py-12">
        
        {/* Header Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>UN 17 SDGs Citizen Intelligence Platform</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">SustainAI</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            An AI Operating System that unifies Healthcare, Education, Employment, Government Schemes, Disaster Management, NGOs, and Civic Services to empower citizens across all 17 Sustainable Development Goals.
          </p>
        </div>

        {/* Sustainability Feature Illustration Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto py-4">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2 text-center shadow-lg">
            <GraduationCap className="h-6 w-6 text-blue-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">Scholarships & Education</h4>
            <p className="text-[10px] text-slate-400">100% Tuition Fee Waivers</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2 text-center shadow-lg">
            <Activity className="h-6 w-6 text-rose-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">Free Medical Camps</h4>
            <p className="text-[10px] text-slate-400">Specialist OPD & OPD Checkups</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2 text-center shadow-lg">
            <Zap className="h-6 w-6 text-amber-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">Clean Solar Grants</h4>
            <p className="text-[10px] text-slate-400">PM Surya Ghar Subsidies</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2 text-center shadow-lg">
            <HeartHandshake className="h-6 w-6 text-purple-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">NGO Operations</h4>
            <p className="text-[10px] text-slate-400">17 SDG Field Networks</p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="pt-4">
          <button
            onClick={onGetStarted}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm sm:text-base hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all flex items-center space-x-3 mx-auto shadow-xl"
          >
            <span>Get Started & Choose Portal</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

      </div>

    </div>
  );
}
