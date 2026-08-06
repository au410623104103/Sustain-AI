import React, { useState } from 'react';
import { GraduationCap, Briefcase, BookOpen, Award, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { SAMPLE_OPPORTUNITIES, SAMPLE_SCHEMES } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';

export default function EducationJobsView({ onCheckEligibility }) {
  const [activeTab, setActiveTab] = useState('scholarships');

  const scholarships = SAMPLE_SCHEMES.filter(s => s.category.includes('Education'));
  const opportunities = SAMPLE_OPPORTUNITIES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>Youth & Citizen Development</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Education & Career Empowerment Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Discover scholarships, green internships, digital skill bootcamps, and career grants.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('scholarships')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'scholarships' 
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950' 
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>🎓 Scholarships & Grants ({scholarships.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('internships')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'internships' 
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950' 
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>💼 Internships & Jobs ({opportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'courses' 
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950' 
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>📚 Skill Bootcamps</span>
        </button>
      </div>

      {/* Scholarships Tab Content */}
      {activeTab === 'scholarships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((sch) => {
            const schSdgs = (sch.sdgs || []).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
            return (
              <div key={sch.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Scholarship Grant
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Deadline: {sch.deadline}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{sch.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{sch.provider}</p>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">{sch.description}</p>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                    <span className="text-slate-400 font-semibold">Stipend / Benefit: </span>
                    <span className="text-emerald-300 font-bold">{sch.benefits}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {schSdgs.map(sdg => (
                      <span key={sdg.id} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: sdg.color }}>
                        {sdg.number}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onCheckEligibility(sch)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
                  >
                    Check Scholarship Eligibility
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Internships & Jobs Tab Content */}
      {(activeTab === 'internships' || activeTab === 'courses') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => {
            const oppSdgs = (opp.sdgs || []).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
            return (
              <div key={opp.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {opp.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">{opp.stipend}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{opp.title}</h3>
                  <p className="text-xs text-slate-400 mb-2">{opp.provider}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-300 mb-3">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      <span>{opp.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>{opp.duration}</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                    <div><span className="text-slate-400 font-semibold">Eligibility: </span><span className="text-slate-200">{opp.eligibility}</span></div>
                    <div><span className="text-slate-400 font-semibold">Skills: </span><span className="text-emerald-300 font-bold">{opp.skillsRequired.join(', ')}</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {oppSdgs.map(sdg => (
                      <span key={sdg.id} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: sdg.color }}>
                        {sdg.number}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onCheckEligibility({ ...opp, name: opp.title, benefits: opp.stipend })}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:shadow-lg transition-all"
                  >
                    Apply Opportunity
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
