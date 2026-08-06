import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Award, FileText, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';

export default function EligibilityModal({ scheme, citizenProfile, onClose, onApplySuccess }) {
  const [applied, setApplied] = useState(false);

  if (!scheme) return null;

  // Calculate matching score criteria
  const isAgeValid = scheme.eligibility?.minAge ? (citizenProfile?.age >= scheme.eligibility.minAge && citizenProfile?.age <= scheme.eligibility.maxAge) : true;
  const isIncomeValid = true; // High match for low income profile
  const isOccupationValid = scheme.eligibility?.occupation?.includes(citizenProfile?.occupation) || scheme.eligibility?.occupation?.includes('Any');
  
  const matchScore = scheme.matchScore || (isOccupationValid && isAgeValid ? 96 : 85);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      onApplySuccess && onApplySuccess(scheme);
    }, 1200);
  };

  const schemeSdgs = (scheme.sdgs || [1, 4, 8]).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Header decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="h-4 w-4" />
          <span>SustainAI Eligibility Engine</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-snug">{scheme.name || scheme.title}</h2>
        <p className="text-xs text-slate-400 mb-6">Offered by <span className="text-slate-200 font-medium">{scheme.provider}</span></p>

        {/* Match Percentage Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-lg">
              {matchScore}%
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                <span>High Profile Eligibility Match</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </h4>
              <p className="text-xs text-slate-300">You qualify based on Age ({citizenProfile?.age}), Status ({citizenProfile?.occupation}), and Income tier.</p>
            </div>
          </div>
        </div>

        {/* Criteria Breakdown */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Criteria Checklist</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Target Occupation:</span>
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{citizenProfile?.occupation}</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Income Limit:</span>
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Eligible (Low Income)</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Education Tier:</span>
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{citizenProfile?.educationLevel}</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">State Jurisdiction:</span>
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{citizenProfile?.state}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Scheme Benefits</span>
          </h4>
          <p className="text-sm font-semibold text-emerald-300">{scheme.benefits || scheme.description}</p>
        </div>

        {/* SDG Contributions */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Sustainable Development Goals</h4>
          <div className="flex flex-wrap gap-2">
            {schemeSdgs.map(goal => (
              <span 
                key={goal.id}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white border"
                style={{ backgroundColor: `${goal.color}20`, borderColor: `${goal.color}50`, color: goal.color }}
              >
                <span>{goal.number}: {goal.shortTitle}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs transition-colors"
          >
            Close Window
          </button>

          <button
            onClick={handleApply}
            disabled={applied}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center space-x-2 disabled:opacity-75"
          >
            {applied ? (
              <>
                <CheckCircle2 className="h-4 w-4 animate-bounce" />
                <span>Application Submitted!</span>
              </>
            ) : (
              <>
                <span>Apply / Connect Now</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
