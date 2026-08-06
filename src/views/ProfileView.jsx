import React, { useState } from 'react';
import { User, MapPin, Briefcase, GraduationCap, DollarSign, CheckCircle2, Save, Sparkles, HeartHandshake } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function ProfileView({ currentUser, onSaveProfile, onContinue, currentLanguage }) {
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Arun Kumar',
    age: currentUser?.age || 20,
    gender: currentUser?.gender || 'Male',
    state: currentUser?.state || 'Karnataka',
    city: currentUser?.city || 'Bengaluru Urban',
    occupation: currentUser?.occupation || 'Student',
    educationLevel: currentUser?.educationLevel || 'Undergraduate',
    incomeRange: currentUser?.incomeRange || 'Below ₹2.5 Lakhs / Year (Low Income)',
    incomeCategory: currentUser?.incomeCategory || 'Low Income',
    skills: currentUser?.skills || ['Python Basics', 'Data Entry', 'Web Development'],
    needs: currentUser?.needs || ['Education', 'Financial Assistance', 'Employment']
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const assistanceCategories = [
    'Education',
    'Employment',
    'Healthcare',
    'Financial Assistance',
    'Government Schemes',
    'Agriculture',
    'Emergency Support',
    'Environment'
  ];

  const handleNeedToggle = (category) => {
    setProfile(prev => {
      const exists = prev.needs.includes(category);
      const updated = exists 
        ? prev.needs.filter(c => c !== category)
        : [...prev.needs, category];
      return { ...prev, needs: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onContinue && onContinue();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            <span>{t.profileTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.profileTitle}</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">{t.profileSub}</p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Profile Saved!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{t.saveProfileBtn}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Demographics */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{t.sectionBasicInfo}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelFullName}</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelAge}</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 20 })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelGender}</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Non-Binary / Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Economic Details */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{t.sectionLocation}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelState}</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelCityDistrict}</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelOccupation}</label>
              <select
                value={profile.occupation}
                onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              >
                <option>Student</option>
                <option>Employed</option>
                <option>Unemployed</option>
                <option>Farmer</option>
                <option>Entrepreneur</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelEducation}</label>
              <select
                value={profile.educationLevel}
                onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
              >
                <option>High School (10th / 12th)</option>
                <option>Diploma</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Ph.D. / Doctorate</option>
                <option>No Formal Education</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.labelIncome}</label>
            <select
              value={profile.incomeRange}
              onChange={(e) => setProfile({ ...profile, incomeRange: e.target.value, incomeCategory: e.target.value.includes('Below') ? 'Low Income' : 'Middle Income' })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:border-emerald-500 outline-none font-medium"
            >
              <option>Below ₹2.5 Lakhs / Year (Low Income)</option>
              <option>₹2.5 Lakhs - ₹5.0 Lakhs / Year</option>
              <option>₹5.0 Lakhs - ₹8.0 Lakhs / Year</option>
              <option>Above ₹8.0 Lakhs / Year</option>
            </select>
          </div>
        </div>

        {/* Section 3: Assistance Categories */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <HeartHandshake className="h-4 w-4" />
            <span>3. Primary Assistance Areas Required</span>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Select all categories where you currently seek government support, scholarships, or services:</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {assistanceCategories.map((cat) => {
              const isSelected = profile.needs.includes(cat);
              return (
                <div
                  key={cat}
                  onClick={() => handleNeedToggle(cat)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-center justify-between font-bold ${
                    isSelected 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <span className="text-xs">{cat}</span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>{t.saveProfileBtn}</span>
            <CheckCircle2 className="h-4 w-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
