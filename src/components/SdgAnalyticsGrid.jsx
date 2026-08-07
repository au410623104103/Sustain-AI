import React from 'react';
import { Globe, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { aiEngine } from '../services/aiEngine';

export default function SdgAnalyticsGrid({ onSelectSdg }) {
  const sdgAnalytics = aiEngine.generate17SdgAnalytics();
  const overallSdgImpactScore = sdgAnalytics.reduce((acc, curr) => acc + curr.contributionScore, 0);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
      
      {/* Header & Overall Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Globe className="h-4 w-4" />
            <span>UN 17 SDGs Intelligence & Impact Analytics</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">SDG Contribution & Progress Engine</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Real-time analytics tracking your citizen profile alignment across all 17 Sustainable Development Goals.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Overall SDG Impact Score</span>
          <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1">
            <Award className="h-5 w-5 text-emerald-500" />
            <span>{overallSdgImpactScore.toLocaleString()} PTS</span>
          </strong>
        </div>
      </div>

      {/* 17 SDG Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {sdgAnalytics.map((sdg) => (
          <div
            key={sdg.id}
            onClick={() => onSelectSdg && onSelectSdg(sdg)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-2 group shadow-xs hover:-translate-y-1 duration-200"
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-[10px] font-extrabold px-2 py-0.5 rounded text-white shadow-xs"
                style={{ backgroundColor: sdg.color }}
              >
                SDG {sdg.number}
              </span>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {sdg.progressPercentage}%
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {sdg.shortTitle}
            </h4>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${sdg.progressPercentage}%`, backgroundColor: sdg.color }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium pt-1">
              <span>Score: <strong className="text-slate-800 dark:text-slate-200 font-bold">{sdg.contributionScore}</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{sdg.activeRecommendationsCount} Active</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
