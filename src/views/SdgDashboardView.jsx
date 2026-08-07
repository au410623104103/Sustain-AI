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
import { TRANSLATIONS } from '../data/translations';

// Custom Bright Tooltip for SDG Bar Chart (100% Legible & High Contrast)
const CustomSdgTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3.5 rounded-2xl bg-slate-900 border-2 border-emerald-500 shadow-2xl space-y-1.5 z-50 text-white-force">
        <div className="flex items-center space-x-2">
          <span 
            className="text-[10px] font-extrabold px-2.5 py-0.5 rounded text-white shadow-sm" 
            style={{ backgroundColor: data.color }}
          >
            {data.name}
          </span>
          <span className="text-xs font-black text-white">{data.fullName}</span>
        </div>
        <div className="text-xs font-extrabold text-emerald-400">
          Impact Score: <span className="text-white font-bold">{data.score} PTS</span>
        </div>
        <p className="text-[11px] text-slate-200 font-semibold">
          Matched Schemes: <strong className="text-amber-400">{data.matchedCount} Active Schemes</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default function SdgDashboardView({ currentUser, onCheckEligibility, currentLanguage }) {
  // Toggle for activating all 17 SDGs for full demo showcase
  const [activateAllSdgs, setActivateAllSdgs] = useState(true);
  const [selectedSdgFilter, setSelectedSdgFilter] = useState(null);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

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
      score: isActive ? Math.round(70 + (sdg.id * 1.5) % 28) : 20,
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Globe className="h-4 w-4" />
            <span>{t.sdgImpactTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.sdgImpactTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            {t.sdgImpactSub}
          </p>
        </div>

        {/* Global 17 SDG Fast Activation Switch */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleAll}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center space-x-2 ${
              activateAllSdgs 
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-lg' 
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>{activateAllSdgs ? t.allSdgsActive : t.activateAll}</span>
          </button>
        </div>
      </div>

      {/* Recharts 17 UN SDG Distribution Graph */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold flex items-center space-x-2 text-slate-900 dark:text-white">
              <BarChart2 className="h-5 w-5 text-emerald-500" />
              <span>{t.scoreDistribution}</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Automated alignment index across public welfare schemes and rural issues.</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Active SDGs:</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs">
              {activeCount} / 17 Goals Active
            </span>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomSdgTooltip />} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 17 UN SDG GOALS INTERACTIVE GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.sdgRegistryTitle}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{t.sdgRegistrySub}</p>
          </div>
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
                    ? 'bg-emerald-50 dark:bg-slate-900 border-2 border-emerald-500 shadow-xl scale-[1.02]' 
                    : isActive 
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm' 
                      : 'bg-slate-100 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 opacity-70 hover:opacity-100'
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
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{isActive ? t.activeImpact : 'Enable'}</span>
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {sdg.title}
                  </h3>

                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug mb-3 font-medium">
                    {sdg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-between">
                    <span>Matched Govt Schemes:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{matchedSchemes.length} Schemes</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
