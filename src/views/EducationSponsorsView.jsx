import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Laptop, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Search, 
  UserCheck,
  Send
} from 'lucide-react';
import { SAMPLE_EDUCATION_SPONSORS } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';

export default function EducationSponsorsView({ currentUser, onCheckEligibility, currentLanguage }) {
  const [sponsors] = useState(SAMPLE_EDUCATION_SPONSORS);
  const [selectedSponsorForModal, setSelectedSponsorForModal] = useState(null);
  const [studentPhone, setStudentPhone] = useState('+91 98450 99887');
  const [statement, setStatement] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedSponsorForModal(null);
      setStatement('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>{t.sponsorsTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.sponsorsTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            {t.sponsorsSub}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Active Sponsor Programs</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">{sponsors.length} Verified Foundations</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Students Sponsored So Far</span>
          <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">435 Rural Students</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Max Sponsorship Value</span>
          <p className="text-xl font-extrabold text-blue-700 dark:text-blue-400">100% Tuition + Laptop</p>
        </div>
      </div>

      {/* Sponsors Grid */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span>Available Educational Philanthropic Sponsorship Programs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((spon) => (
            <div key={spon.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                    {spon.sponsorType}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Deadline: {spon.deadline}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{spon.programTitle}</h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">{spon.sponsorName}</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-medium">{spon.description}</p>

                <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Sponsorship Coverage:</span>
                    <strong className="text-emerald-700 dark:text-emerald-300 font-bold text-xs">{spon.fundingAmount}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Target Applicants:</span>
                    <span className="text-slate-800 dark:text-slate-300 font-medium text-[11px]">{spon.targetBeneficiaries}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{spon.totalSponsoredStudents} Students Funded</span>

                <button
                  onClick={() => setSelectedSponsorForModal(spon)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all"
                >
                  {t.applySponsorshipBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SPONSORSHIP APPLICATION MODAL */}
      {selectedSponsorForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 text-slate-900 dark:text-white-force shadow-2xl">
            <button onClick={() => setSelectedSponsorForModal(null)} className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">✕</button>

            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <GraduationCap className="h-4 w-4" />
              <span>Direct Sponsorship Application</span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{selectedSponsorForModal.programTitle}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Sponsor: <strong className="text-slate-900 dark:text-slate-200">{selectedSponsorForModal.sponsorName}</strong></p>

            {appliedSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mx-auto text-xl">
                  ✓
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Sponsorship Application Submitted!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">The sponsor team will review your student credentials and get in touch within 3 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Applicant Name</label>
                  <input
                    type="text"
                    disabled
                    value={currentUser?.name || 'Arun Kumar'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Statement of Need / Why You Deserve Sponsorship</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly explain your academic background, family financial need, and career goal..."
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button type="button" onClick={() => setSelectedSponsorForModal(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded-xl font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-slate-950 font-extrabold rounded-xl flex items-center space-x-1">
                    <Send className="h-4 w-4" />
                    <span>Submit Sponsorship Application</span>
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
