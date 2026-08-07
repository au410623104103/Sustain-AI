import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, CheckCircle2, Info } from 'lucide-react';

export default function AiRiskCard({ risk, onMitigate }) {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-red-500/40 transition-all space-y-3 shadow-sm">
      
      {/* Category & Risk Level */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {risk.category}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${risk.badgeColor}`}>
          {risk.riskLevel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
        <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />
        <span>{risk.title}</span>
      </h3>

      {/* Cause / Reason */}
      <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-semibold block">AI Risk Assessment Reason:</span>
        <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug">{risk.reason}</p>
      </div>

      {/* Suggested Mitigation Action */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="truncate max-w-[220px] sm:max-w-xs">{risk.suggestedAction}</span>
        </div>

        <button
          onClick={() => onMitigate && onMitigate(risk)}
          className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-[11px] hover:bg-emerald-500 hover:text-slate-950 transition-all shrink-0"
        >
          Mitigate →
        </button>
      </div>

    </div>
  );
}
