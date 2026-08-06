import React, { useState } from 'react';
import { 
  FileText, 
  Trash2, 
  Droplets, 
  CloudRain, 
  Milestone, 
  Trees, 
  Lightbulb, 
  MapPin, 
  Upload, 
  CheckCircle2, 
  Globe, 
  Clock,
  Sparkles,
  Building2,
  Send
} from 'lucide-react';
import { SAMPLE_CIVIC_REPORTS } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';
import { TRANSLATIONS } from '../data/translations';

export default function CivicReportingView({ currentUser, onAddRuralIssue, currentLanguage }) {
  const [reports, setReports] = useState(SAMPLE_CIVIC_REPORTS);
  const [issueType, setIssueType] = useState('Water Leakage');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(currentUser?.ruralDistrict || 'Ramanagara Rural District');
  const [village, setVillage] = useState(currentUser?.village || 'Ramanagara Village Ward 4');
  const [imagePreview, setImagePreview] = useState(null);

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const issueCategories = [
    { key: 'Water Leakage', label: t.catWaterLeakage, icon: Droplets, color: 'text-blue-400', sdgId: 6 },
    { key: 'Garbage & Waste', label: t.catGarbageWaste, icon: Trash2, color: 'text-amber-400', sdgId: 12 },
    { key: 'Pollution', label: t.catPollution, icon: CloudRain, color: 'text-purple-400', sdgId: 13 },
    { key: 'Road Damage', label: t.catRoadDamage, icon: Milestone, color: 'text-orange-400', sdgId: 9 },
    { key: 'Environmental Damage', label: t.catEnvironmental, icon: Trees, color: 'text-emerald-400', sdgId: 15 },
    { key: 'Streetlight Issue', label: t.catStreetlight, icon: Lightbulb, color: 'text-yellow-400', sdgId: 11 },
  ];

  const selectedCategoryObj = issueCategories.find(c => c.key === issueType) || issueCategories[0];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTicketId = `CIV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const sdgObj = SDG_GOALS.find(g => g.id === selectedCategoryObj.sdgId) || SDG_GOALS[5];

    const newReport = {
      id: newTicketId,
      category: issueType,
      title: title || `${issueType} Issue Reported by Citizen`,
      location: location,
      village: village,
      description: description,
      status: 'Submitted to NGO',
      statusStep: 1,
      submittedDate: new Date().toISOString().split('T')[0],
      estimatedResolution: 'Within 48 Hours',
      sdgs: [selectedCategoryObj.sdgId],
      upvotes: 1,
      department: 'Assigned to Local Rural NGO Field Team',
      evidencePhoto: imagePreview || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&auto=format&fit=crop&q=80'
    };

    setReports([newReport, ...reports]);
    setSubmittedTicket(newReport);

    // Stream issue to NGO Dashboard & Developer Hub via global state!
    if (onAddRuralIssue) {
      onAddRuralIssue({
        id: newTicketId,
        title: title || `${issueType} Issue Reported by Citizen`,
        ruralDistrict: location,
        village: village,
        sdgId: sdgObj.id,
        sdgName: `${sdgObj.number} - ${sdgObj.shortTitle}`,
        category: issueType,
        severity: 'High',
        description: `[CITIZEN REPORT]: ${description}`,
        reportedByNgo: `Citizen (${currentUser?.name || 'Local Resident'})`,
        fieldOfficer: 'Citizen Direct Submission',
        status: 'Open',
        dateLogged: new Date().toISOString().split('T')[0],
        targetClearanceDate: 'Within 48 Hours',
        evidencePhotos: [imagePreview || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&auto=format&fit=crop&q=80'],
        developerSolutionsCount: 0,
        clearanceNotes: 'Citizen grievance submitted directly from Citizen Portal. Awaiting NGO field officer inspection.'
      });
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setImagePreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileText className="h-4 w-4" />
            <span>{t.civicEngineTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.civicPageTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t.civicPageSub}
          </p>
        </div>
      </div>

      {/* SUCCESS TICKET SUBMISSION BANNER */}
      {submittedTicket && (
        <div className="p-6 rounded-3xl bg-emerald-950/90 border-2 border-emerald-500 text-white space-y-4 animate-in fade-in text-white-force">
          <div className="flex items-center justify-between text-white-force">
            <div className="flex items-center space-x-3 text-white-force">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-white-force">
                ✓
              </div>
              <div className="text-white-force">
                <h3 className="text-base font-bold text-white text-white-force">Report Successfully Submitted & Routed to Local NGO!</h3>
                <p className="text-xs text-emerald-300 text-white-force">Tracking Ticket Generated: <strong className="font-mono text-white text-white-force">{submittedTicket.id}</strong></p>
              </div>
            </div>

            <button onClick={() => setSubmittedTicket(null)} className="text-xs text-slate-400 hover:text-white">
              Dismiss
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white-force">
            <div className="text-white-force">
              <span className="text-slate-400 block text-white-force">Assigned Destination:</span>
              <span className="font-semibold text-emerald-400 text-white-force">{submittedTicket.department}</span>
            </div>
            <div className="text-white-force">
              <span className="text-slate-400 block text-white-force">Location Tagged:</span>
              <span className="font-semibold text-slate-200 text-white-force">{submittedTicket.village}, {submittedTicket.location}</span>
            </div>
            <div className="text-white-force">
              <span className="text-slate-400 block text-white-force">Target Resolution:</span>
              <span className="font-semibold text-slate-200 text-white-force">{submittedTicket.estimatedResolution}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Form + Tracked Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <span>{t.postProblemCardTitle}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Category selector grid */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{t.selectCategoryLabel}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {issueCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = issueType === cat.key;
                    return (
                      <div
                        key={cat.key}
                        onClick={() => setIssueType(cat.key)}
                        className={`p-3 rounded-2xl cursor-pointer border text-xs font-bold flex items-center space-x-2 transition-all ${
                          isSelected 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-md font-extrabold' 
                            : 'bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-400'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${cat.color}`} />
                        <span className="truncate">{cat.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.issueTitleLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.issueTitlePlaceholder}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.ruralDistrictLabel}</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.villageWardLabel}</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t.descLabel}</label>
                <textarea
                  rows={3}
                  required
                  placeholder={t.descPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Photo Upload area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Upload Photo Evidence (Photo sent to NGO)</label>
                <label className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-colors">
                  <Upload className="h-6 w-6 text-slate-500 mb-1" />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Click to select photo or take picture</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {imagePreview && (
                  <div className="mt-2 relative h-24 w-36 rounded-xl overflow-hidden border border-emerald-500/40">
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{t.submitCivicReportBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Existing Tracked Reports Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Clock className="h-5 w-5 text-emerald-500" />
                <span>{t.activeTrackedCardTitle} ({reports.length})</span>
              </h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {reports.map((rpt) => {
                const rptSdgs = (rpt.sdgs || []).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
                return (
                  <div key={rpt.id} className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {rpt.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rpt.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      }`}>
                        {rpt.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rpt.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{rpt.description}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-900 font-semibold">
                      <span>{rpt.location}</span>
                      <span>Dept: {rpt.department}</span>
                    </div>

                    {/* SDG Tags */}
                    <div className="flex items-center space-x-1 pt-1">
                      <span className="text-[10px] text-slate-500 mr-1">SDGs:</span>
                      {rptSdgs.map(sdg => (
                        <span key={sdg.id} className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: sdg.color }}>
                          {sdg.number}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
