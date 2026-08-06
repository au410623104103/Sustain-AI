import React, { useState } from 'react';
import { 
  Landmark, 
  Search, 
  Filter, 
  CheckCircle2, 
  Globe, 
  ChevronRight, 
  Sparkles, 
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { SAMPLE_SCHEMES } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';

export default function SchemeFinderView({ citizenProfile, onCheckEligibility }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOccupation, setSelectedOccupation] = useState('All');
  const [selectedSdg, setSelectedSdg] = useState('All');

  const categories = ['All', 'Education & Financial', 'Employment & Skills', 'Healthcare', 'Agriculture & Support', 'Environment & Energy', 'Disaster Support'];

  const filteredSchemes = SAMPLE_SCHEMES.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || scheme.category.includes(selectedCategory);
    
    const matchesOccupation = selectedOccupation === 'All' || 
                              scheme.eligibility.occupation.includes(selectedOccupation) || 
                              scheme.eligibility.occupation.includes('Any');

    const matchesSdg = selectedSdg === 'All' || scheme.sdgs.includes(parseInt(selectedSdg));

    return matchesSearch && matchesCategory && matchesOccupation && matchesSdg;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Landmark className="h-4 w-4" />
            <span>National Public Services Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Government Scheme Finder</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Discover, filter and verify eligibility for government welfare programs, subsidies & grants mapped to 17 UN SDGs.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
            {filteredSchemes.length} Schemes Available
          </span>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by keyword, ministry, or benefit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Occupation Filter */}
          <div>
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Occupations</option>
              <option value="Student">Students</option>
              <option value="Unemployed">Unemployed Youth</option>
              <option value="Farmer">Farmers</option>
              <option value="Entrepreneur">Entrepreneurs</option>
            </select>
          </div>

          {/* UN SDG Goal Filter */}
          <div>
            <select
              value={selectedSdg}
              onChange={(e) => setSelectedSdg(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All 17 UN SDGs</option>
              {SDG_GOALS.map((sdg) => (
                <option key={sdg.id} value={sdg.id}>
                  {sdg.number}: {sdg.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-2 scrollbar-none">
          <SlidersHorizontal className="h-4 w-4 text-slate-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950' 
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-panel rounded-3xl border border-slate-800 text-slate-400">
            <p className="text-sm font-semibold">No schemes match your filter criteria.</p>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedOccupation('All'); setSelectedSdg('All'); }} className="mt-3 text-xs text-emerald-400 underline font-bold">
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredSchemes.map((scheme) => {
            const schemeSdgs = (scheme.sdgs || []).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
            return (
              <div 
                key={scheme.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {scheme.type}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-400">{scheme.matchScore}% Match Score</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 leading-snug">{scheme.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{scheme.provider}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{scheme.description}</p>

                  <div className="space-y-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold">Eligibility: </span>
                      <span className="text-slate-200">Income limit {scheme.eligibility.incomeMax} | Age {scheme.eligibility.minAge}-{scheme.eligibility.maxAge}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold">Benefits: </span>
                      <span className="text-emerald-300 font-bold">{scheme.benefits}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1">
                    {schemeSdgs.map(sdg => (
                      <span 
                        key={sdg.id}
                        title={sdg.title}
                        className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white shadow-sm" 
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.number}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onCheckEligibility(scheme)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-1 shrink-0"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Check Eligibility</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
