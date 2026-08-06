import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Activity, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  AlertTriangle, 
  Trees, 
  HeartHandshake, 
  CheckCircle2, 
  Globe, 
  Users, 
  ShieldCheck,
  Zap,
  Target,
  FileCheck,
  Quote,
  Heart,
  MessageCircle,
  Building2,
  Code
} from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';

export default function LandingView({ onGetStarted, onExploreServices, setActiveView }) {
  const serviceCategories = [
    { icon: Activity, name: 'Healthcare', color: 'from-emerald-500 to-teal-500', desc: 'Free clinics, health insurance, emergency response & OPD', sdg: 'SDG 3' },
    { icon: GraduationCap, name: 'Education', color: 'from-blue-500 to-indigo-500', desc: 'Scholarships, tuition fee waivers, digital skill courses', sdg: 'SDG 4' },
    { icon: Briefcase, name: 'Employment', color: 'from-purple-500 to-pink-500', desc: 'Paid government internships, job matching & skill vouchers', sdg: 'SDG 8' },
    { icon: Landmark, name: 'Government Schemes', color: 'from-amber-500 to-orange-500', desc: 'Financial support, housing subsidies & welfare entitlements', sdg: 'SDG 1 & 10' },
    { icon: AlertTriangle, name: 'Disaster Support', color: 'from-red-500 to-rose-500', desc: 'Flood/heatwave warnings, emergency relief micro-insurance', sdg: 'SDG 11 & 13' },
    { icon: Trees, name: 'Environment', color: 'from-green-500 to-emerald-600', desc: 'Rooftop solar grants, eco-initiatives & recycling drives', sdg: 'SDG 7 & 13' },
    { icon: HeartHandshake, name: 'Civic Services', color: 'from-cyan-500 to-blue-600', desc: 'Water leak, road damage & garbage issue reporting with tracking', sdg: 'SDG 6 & 11' },
  ];

  const communityStories = [
    {
      quote: "SustainAI connected our village NGO with tech developers. Our drinking water pipeline burst was repaired and IoT monitored within 48 hours!",
      author: "Lakshmi Devi",
      role: "Villager & Community Volunteer",
      location: "Ramanagara Rural District",
      sdg: "SDG 6 - Clean Water",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "As a low-income college student, SustainAI found me a 100% tuition waiver scholarship and a paid AI research internship in minutes.",
      author: "Arun Kumar",
      role: "Undergraduate Student",
      location: "Bengaluru Urban",
      sdg: "SDG 4 & SDG 8",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "Our rural health clinic lost power frequently. An NGO posted the issue on SustainAI and a developer deployed a solar telemetry app to save our vaccines.",
      author: "Dr. Ramesh Gowda",
      role: "Rural Health Officer & NGO Leader",
      location: "Tumakuru District",
      sdg: "SDG 3 & SDG 7",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Humanized Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 animate-pulse">
          <Heart className="h-4 w-4 text-emerald-400 fill-emerald-400/20" />
          <span>Human-Centric AI Intelligence Platform for Sustainable Development</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Sustain<span className="gradient-text">AI</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl font-medium text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          “One Platform. Every Citizen. Every Service. Every SDG.”
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connecting rural citizens, field NGOs, and tech developers into one compassionate ecosystem. We understand who you are and what your community needs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-bold text-base hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Launch Citizen Gateway</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-600 font-semibold text-base transition-all flex items-center justify-center space-x-2"
          >
            <span>Explore 17 UN SDGs</span>
          </button>
        </div>

        {/* Demo Fast Pass */}
        <div className="mt-12 p-4 rounded-2xl glass-panel border border-slate-800 max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-left">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <p className="text-xs font-bold text-white">Hackathon Evaluator Fast Pass</p>
              <p className="text-[11px] text-slate-400">One-click demo login as Arun Kumar (20yo Low-Income Student)</p>
            </div>
          </div>
          <button
            onClick={onGetStarted}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-semibold text-xs border border-emerald-500/40 transition-colors"
          >
            Demo Login →
          </button>
        </div>
      </section>

      {/* Multi-Role Humanized Ecosystem Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Multi-Role Collaboration</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 mb-3">How SustainAI Connects People & Technology</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">Empowering rural citizens, field NGOs, and developers in a unified compassionate loop.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl mb-2">
              🏡
            </div>
            <h3 className="text-base font-bold text-white">1. Rural Citizens</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Select your village, discover local helping NGOs, ask AI for scholarships, and verify government scheme eligibility.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center font-bold text-xl mb-2">
              🤝
            </div>
            <h3 className="text-base font-bold text-white">2. NGO Field Officers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visit rural villages, upload field issues across all 17 SDGs, collaborate with tech developers, and clear community issues.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-3 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center font-bold text-xl mb-2">
              💻
            </div>
            <h3 className="text-base font-bold text-white">3. Tech Developers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Browse rural SDG problems, build AI models or web dashboards, submit solution reports, and earn developer impact scores.
            </p>
          </div>
        </div>
      </section>

      {/* Human Stories & Citizen Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Community Voices</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 mb-3">Real Stories & Human Impact</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">Hear from real villagers, students, and rural health officers benefiting from SustainAI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityStories.map((story, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div>
                <Quote className="h-8 w-8 text-emerald-400/40 mb-2" />
                <p className="text-xs text-slate-200 leading-relaxed italic">"{story.quote}"</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
                <img src={story.avatar} alt={story.author} className="h-10 w-10 rounded-full object-cover border border-emerald-500/40" />
                <div>
                  <h4 className="text-xs font-bold text-white">{story.author}</h4>
                  <p className="text-[10px] text-slate-400">{story.role} • {story.location}</p>
                  <span className="text-[9px] font-bold text-emerald-400">{story.sdg}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Essential Services Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">7 Essential Citizen Service Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">Explore all public services brought together under one intelligent AI roof.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {serviceCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                onClick={onGetStarted}
                className="glass-panel glass-panel-hover p-6 rounded-3xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${cat.color} p-0.5 shadow-lg flex items-center justify-center`}>
                      <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {cat.sdg}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{cat.desc}</p>
                </div>

                <div className="flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Opportunities</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 17 UN SDGs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">United Nations Framework</span>
            <h2 className="text-3xl font-extrabold text-white mt-1 mb-3">Mapped to 17 Sustainable Development Goals</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              SustainAI ties every scheme, scholarship, job opportunity, and rural civic report directly to official UN SDG targets.
            </p>
          </div>

          {/* 17 SDG Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {SDG_GOALS.map((sdg) => (
              <div 
                key={sdg.id}
                className="p-3 rounded-2xl border transition-all hover:scale-105 flex flex-col justify-between"
                style={{ 
                  backgroundColor: `${sdg.color}15`, 
                  borderColor: `${sdg.color}40` 
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: sdg.color }}>
                    {sdg.number}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight mb-1">{sdg.shortTitle}</h4>
                <p className="text-[9px] text-slate-300 line-clamp-2">{sdg.targetFocus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-4">Empowering Every Citizen. Leaving No One Behind.</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Experience the future of public service intelligence. Try the live 24-hour hackathon prototype today.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm hover:shadow-xl hover:shadow-emerald-500/30 transition-all inline-flex items-center space-x-2"
          >
            <span>Launch SustainAI Gateway</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
