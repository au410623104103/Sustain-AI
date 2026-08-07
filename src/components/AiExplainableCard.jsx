import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';

export default function AiExplainableCard({ recommendation, onAction, onCheckEligibility }) {
  const [showReasons, setShowReasons] = useState(false);

  const priorityBadgeStyle = {
    emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    orange: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
    teal: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20'
  }[recommendation.priorityColor || 'emerald'];

  const sdgObjects = (recommendation.sdgTags || []).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm group">
      
      <div>
        {/* Header Badge & AI Confidence Ring */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${priorityBadgeStyle}`}>
            {recommendation.category} • {recommendation.priority}
          </span>

          {/* Match Score Indicator Ring */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="relative h-5 w-5 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-300 dark:text-slate-800"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${recommendation.confidenceScore}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 font-mono">
              {recommendation.confidenceScore}% Match
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
          {recommendation.title}
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-3">
          {recommendation.description}
        </p>

        {/* EXPLAINABLE AI DROPDOWN ("Recommended Because") */}
        <div className="rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setShowReasons(!showReasons)}
            className="w-full px-3.5 py-2.5 flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <span className="flex items-center space-x-1.5 text-[11px] text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Recommended Because: ({recommendation.reasons.length} Matching Criteria)</span>
            </span>
            {showReasons ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
          </button>

          {showReasons && (
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-900 space-y-1.5 bg-white dark:bg-slate-900/60">
              {recommendation.reasons.map((reason, i) => (
                <div key={i} className="flex items-center space-x-2 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer: SDG Tags + Impact PTS + CTA Button */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          {/* SDG Badges */}
          <div className="flex flex-wrap items-center gap-1">
            {sdgObjects.map(sdg => (
              <span 
                key={sdg.id} 
                className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white shadow-xs" 
                style={{ backgroundColor: sdg.color }}
              >
                {sdg.number} - {sdg.shortTitle}
              </span>
            ))}
          </div>

          {/* Impact PTS Earned */}
          <span className="text-xs font-black text-teal-700 dark:text-teal-400 flex items-center space-x-1">
            <Award className="h-3.5 w-3.5 text-teal-500" />
            <span>+{recommendation.impactPts} PTS</span>
          </span>
        </div>

        <button
          onClick={() => {
            if (onAction) onAction(recommendation.targetView);
            else if (onCheckEligibility) onCheckEligibility(recommendation);
          }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center justify-center space-x-2"
        >
          <span>{recommendation.actionText || 'Explore Recommendation'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
