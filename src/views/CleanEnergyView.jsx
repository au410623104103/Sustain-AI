import React, { useState } from 'react';
import { 
  Zap, 
  Sun, 
  DollarSign, 
  Leaf, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Lightbulb, 
  ArrowRight, 
  Sparkles,
  Calculator,
  Building2,
  Phone
} from 'lucide-react';
import { SAMPLE_CLEAN_ENERGY_SCHEMES } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';

export default function CleanEnergyView({ currentUser, onApplyCleanEnergy, currentLanguage }) {
  const [monthlyBill, setMonthlyBill] = useState(2500); // ₹2500 per month default
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applicantName, setApplicantName] = useState(currentUser?.name || 'Arun Kumar');
  const [applicantPhone, setApplicantPhone] = useState('+91 98450 11223');
  const [rooftopArea, setRooftopArea] = useState('350 sq ft (Sufficient for 3 kW Solar)');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // Solar Calculations based on Monthly Bill
  const recommendedKw = Math.min(10, Math.max(1, (monthlyBill / 800))).toFixed(1);
  const governmentGrantSubsidy = Math.min(78000, Math.round(recommendedKw * 26000));
  const annualBillSavings = Math.round(monthlyBill * 12 * 0.92);
  const annualCo2Saved = (monthlyBill * 0.0012).toFixed(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    
    // Call parent handler to stream request to NGO Queue
    if (onApplyCleanEnergy && selectedScheme) {
      onApplyCleanEnergy({
        id: `SOLAR-REQ-${Date.now()}`,
        schemeName: selectedScheme.name,
        applicantName: applicantName,
        applicantPhone: applicantPhone,
        district: currentUser?.ruralDistrict || 'Ramanagara Rural District',
        village: currentUser?.village || 'Ramanagara Village Ward 4',
        solarCapacity: `${recommendedKw} kW Rooftop Solar`,
        subsidyGrant: `₹${governmentGrantSubsidy.toLocaleString()}`,
        status: 'Awaiting NGO Field Installation Inspection',
        submittedDate: new Date().toISOString().split('T')[0]
      });
    }

    setTimeout(() => {
      setApplicationSubmitted(false);
      setSelectedScheme(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Zap className="h-4 w-4" />
            <span>{t.cleanTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.cleanTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {t.cleanSub}
          </p>
        </div>

        <div className="flex items-center space-x-2 p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
          <Sun className="h-5 w-5 text-amber-500 animate-spin-slow" />
          <span>{t.pmSuryaBadge}</span>
        </div>
      </div>

      {/* INTERACTIVE ROOFTOP SOLAR & SUBSIDY SAVINGS CALCULATOR */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
              <Calculator className="h-6 w-6 text-white text-white-force" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.solarCalcTitle}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{t.solarCalcSub}</p>
            </div>
          </div>
        </div>

        {/* Bill Slider & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Slider Controls */}
          <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{t.monthlyBillLabel}</span>
              <strong className="text-xl font-black text-amber-600 dark:text-amber-400">₹{monthlyBill.toLocaleString()} / mo</strong>
            </div>

            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
              <span>₹500 / mo</span>
              <span>₹5,000 / mo</span>
              <span>₹10,000 / mo</span>
            </div>
          </div>

          {/* Calculated Output Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">{t.recommendedSolarSize}</span>
              <strong className="text-lg font-black text-slate-900 dark:text-white">{recommendedKw} kW</strong>
              <span className="text-[10px] text-slate-500 block">Rooftop Solar Plant</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">{t.govtGrantSubsidy}</span>
              <strong className="text-lg font-black text-emerald-700 dark:text-emerald-400">₹{governmentGrantSubsidy.toLocaleString()}</strong>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">{t.directBankCredit}</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">{t.annualSavings}</span>
              <strong className="text-lg font-black text-amber-700 dark:text-amber-400">₹{annualBillSavings.toLocaleString()} / yr</strong>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 block font-semibold">{t.billReduction}</span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-500/30 space-y-1 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">{t.co2Saved}</span>
              <strong className="text-lg font-black text-teal-700 dark:text-teal-400">{annualCo2Saved} Tons</strong>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 block font-semibold">{t.carbonFootprint}</span>
            </div>

          </div>

        </div>
      </div>

      {/* CLEAN RENEWABLE ENERGY SCHEME REGISTRY */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold flex items-center space-x-2 text-slate-900 dark:text-white">
            <Zap className="h-5 w-5 text-amber-500" />
            <span>{t.subsidizedSchemesHeading}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_CLEAN_ENERGY_SCHEMES.map((scheme) => (
            <div 
              key={scheme.id}
              className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">98% Eligible</span>
                </div>

                <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-white">{scheme.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Provider: <strong className="text-slate-900 dark:text-slate-200">{scheme.provider}</strong></p>

                <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Government Subsidy Benefit:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{scheme.subsidyAmount}</strong>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-900">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Estimated Monthly Savings:</span>
                    <span className="text-amber-700 dark:text-amber-300 font-bold">{scheme.estimatedMonthlySavings}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{scheme.eligibility}</span>

                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all"
                >
                  {t.applySolarGrantBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ONE-CLICK SOLAR SUBSIDY APPLICATION MODAL */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700 bg-slate-900 p-6 space-y-4 text-white-force">
            <button onClick={() => setSelectedScheme(null)} className="absolute top-4 right-4 text-slate-400">✕</button>

            <h3 className="text-base font-bold text-white text-white-force">Apply for {selectedScheme.name}</h3>
            <p className="text-xs text-slate-400 text-white-force">Application streams directly to NGO Operations Panel for field installation verification.</p>

            {applicationSubmitted ? (
              <div className="p-6 text-center text-xs text-emerald-400 font-bold space-y-2 text-white-force">
                <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-400" />
                <p className="text-sm">Solar Rooftop Subsidy Application Submitted!</p>
                <p className="text-slate-300 font-normal">Routed to Gram Vikas Rural NGO Field Inspection Team for site survey.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs text-white-force">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1 text-white-force">Applicant Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-white-force">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-white-force">Solar System Size</label>
                    <input
                      type="text"
                      disabled
                      value={`${recommendedKw} kW Rooftop Solar`}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1 text-white-force">Rooftop Area / Site Details</label>
                  <input
                    type="text"
                    required
                    value={rooftopArea}
                    onChange={(e) => setRooftopArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Calculated Subsidy Credit: ₹{governmentGrantSubsidy.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button type="button" onClick={() => setSelectedScheme(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold rounded-xl">
                    Submit Solar Grant Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
