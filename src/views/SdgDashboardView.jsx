import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  BarChart2,
  Zap,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SDG_GOALS } from '../data/sdgData';
import { SAMPLE_SCHEMES } from '../data/mockDatabase';

export default function SdgDashboardView({ currentUser, onCheckEligibility }) {
  // Toggle for activating all 17 SDGs for full demo showcase
  const [activateAllSdgs, setActivateAllSdgs] = useState(true);
  const [selectedSdgFilter, setSelectedSdgFilter] = useState(null);

  // Default active SDGs derived from profile + saved schemes + civic reports + active state
  const baseActiveSdgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  
  // Custom set of active SDGs
  const [activeSdgSet, setActiveSdgSet] = useState(
    new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])
  );

  const toggleSdgActivation = (sdgId) => {
    setActiveSdgSet(prev => {
      const updated = new Set(prev);
      if (updated.has(sdgId)) {
        updated.delete(sdgId);
      } else {
        updated.add(sdgId);
      }
      return updated;
    });
  };

  const handleToggleAll = () => {
    if (activateAllSdgs) {
      setActivateAllSdgs(false);
      // Keep primary profile SDGs active
      setActiveSdgSet(new Set([1, 3, 4, 8, 10, 17]));
    } else {
      setActivateAllSdgs(true);
      setActiveSdgSet(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]));
    }
  };

  // Recharts complete 17 SDG data array
  const chartData = SDG_GOALS.map((sdg) => {
    const isActive = activeSdgSet.has(sdg.id);
    const matchedCount = SAMPLE_SCHEMES.filter(s => s.sdgs.includes(sdg.id)).length;
    return {
      name: sdg.number,
      fullName: sdg.shortTitle,
      score: isActive ? 70 + (sdg.id * 1.5) % 28 : 20,
      color: sdg.color,
      matchedCount: matchedCount
    };
  });

  const activeCount = activeSdgSet.size;

  // Filter schemes when an SDG is selected
  const selectedSdgObj = selectedSdgFilter ? SDG_GOALS.find(g => g.id === selectedSdgFilter) : null;
  const filteredSchemesForSdg = selectedSdgFilter 
    ? SAMPLE_SCHEMES.filter(s => s.sdgs.includes(selectedSdgFilter))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Globe className="h-4 w-4" />
            <span>United Nations Agenda 2030 Intelligence Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Complete 17 UN SDG Impact Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every public service, scholarship, emergency hotline, and civic report is mapped directly to the 17 United Nations SDGs.
          </p>
        </div>

        {/* Global 17 SDG Fast Activation Switch */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleAll}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center space-x-2 ${
              activateAllSdgs 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-950' 
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Zap className="h-4 w-4 text-amber-400" />
            <span>{activateAllSdgs ? 'All 17 SDGs Fully Integrated (Active)' : 'Activate All 17 SDGs for Demo'}</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Services & Schemes</span>
          <p className="text-xl font-extrabold text-white">17 Schemes</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Civic & Eco Reports</span>
          <p className="text-xl font-extrabold text-emerald-400">4 Active</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Impact Score</span>
          <p className="text-xl font-extrabold text-teal-400">{currentUser?.impactScore || 780} PTS</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">SDGs Integrated</span>
          <p className="text-xl font-extrabold text-purple-400">17 / 17 Goals</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-xs text-slate-400 font-medium">Active Goal Coverage</span>
          <p className="text-xl font-extrabold text-amber-400">{activeCount} / 17 Active</p>
        </div>
      </div>

      {/* Recharts 17 UN SDG Bar Visualization */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-emerald-400" />
            <span>Complete 17 UN SDG Impact Distribution</span>
          </h2>
          <span className="text-xs text-slate-400">Bar height indicates public service & scheme alignment index per goal</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                formatter={(value, name, item) => [`${value} Index Points (${item.payload.matchedCount} Schemes)`, item.payload.fullName]}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All 17 UN SDG Interactive Goal Cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Globe className="h-5 w-5 text-emerald-400" />
              <span>Complete 17 UN SDG Framework Alignment</span>
            </h2>
            <p className="text-xs text-slate-400">Click any SDG card to inspect matched government schemes & activate its impact badge.</p>
          </div>

          {selectedSdgFilter && (
            <button
              onClick={() => setSelectedSdgFilter(null)}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              Clear Filter (Show All 17)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SDG_GOALS.map((sdg) => {
            const isActive = activeSdgSet.has(sdg.id);
            const matchedSchemes = SAMPLE_SCHEMES.filter(s => s.sdgs.includes(sdg.id));
            const isSelected = selectedSdgFilter === sdg.id;

            return (
              <div 
                key={sdg.id}
                onClick={() => setSelectedSdgFilter(isSelected ? null : sdg.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                  isSelected 
                    ? 'bg-slate-900 border-2 border-emerald-400 shadow-xl shadow-emerald-950/50 scale-[1.02]' 
                    : isActive 
                      ? 'bg-slate-900/80 border-slate-700 hover:border-emerald-500/50' 
                      : 'bg-slate-950/40 border-slate-800/80 opacity-70 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-xs font-extrabold px-2.5 py-0.5 rounded text-white shadow-md"
                      style={{ backgroundColor: sdg.color }}
                    >
                      {sdg.number}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSdgActivation(sdg.id);
                      }}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all flex items-center space-x-1 ${
                        isActive 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{isActive ? 'Active Impact' : 'Enable'}</span>
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {sdg.title}
                  </h3>

                  <p className="text-[11px] text-slate-300 leading-snug mb-3">
                    {sdg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[10px] font-semibold text-slate-400">
                    <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Target Priority</span>
                    <span className="text-slate-200">{sdg.targetFocus}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {matchedSchemes.length} Matched Schemes
                    </span>

                    <span className="text-[10px] font-semibold text-slate-400 flex items-center space-x-0.5 group-hover:text-white transition-colors">
                      <span>Inspect</span>
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Selected SDG Matched Schemes Drill-Down Section */}
      {selectedSdgObj && (
        <div className="p-6 rounded-3xl glass-panel border-2 border-emerald-500/40 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded text-xs font-extrabold text-white" style={{ backgroundColor: selectedSdgObj.color }}>
                {selectedSdgObj.number}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Matched Schemes for {selectedSdgObj.title}</h3>
                <p className="text-xs text-slate-400">{selectedSdgObj.description}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSdgFilter(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close Drilldown ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemesForSdg.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No specific scheme mapped to this goal in demo filters.</p>
            ) : (
              filteredSchemesForSdg.map((sch) => (
                <div key={sch.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {sch.type}
                      </span>
                      <span className="text-[10px] text-slate-400">{sch.provider}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white">{sch.name}</h4>
                    <p className="text-[11px] text-slate-300 mt-1">{sch.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-300 font-semibold">{sch.benefits}</span>
                    <button
                      onClick={() => onCheckEligibility && onCheckEligibility(sch)}
                      className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-bold text-[11px] hover:bg-emerald-400 transition-colors"
                    >
                      Check Eligibility
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
