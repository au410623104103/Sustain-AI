import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Globe, 
  FileText, 
  Upload, 
  Sparkles, 
  SlidersHorizontal,
  Award,
  Users,
  Code,
  ShieldCheck,
  Check,
  Search,
  Camera,
  HeartHandshake,
  Bus,
  Calendar,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Zap,
  Sun,
  Download
} from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';
import { RURAL_DISTRICTS, SAMPLE_NGOS, SAMPLE_DISASTER_ZONES } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';
import { apiService } from '../services/apiService';

export default function NgoPanelView({ ruralIssues, setRuralIssues, developerSolutions, cleanEnergyRequests, setCleanEnergyRequests, currentLanguage }) {
  const [selectedSdgFilter, setSelectedSdgFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // Local state for clean energy requests if props not passed
  const [energyRequests, setEnergyRequests] = useState(cleanEnergyRequests || []);

  // Sync state if props update from realtime BroadcastChannel
  React.useEffect(() => {
    if (cleanEnergyRequests) setEnergyRequests(cleanEnergyRequests);
  }, [cleanEnergyRequests]);

  // Disaster Zones State for Working Migration Tracker
  const [disasterZones, setDisasterZones] = useState(SAMPLE_DISASTER_ZONES);
  const [selectedDisaster, setSelectedDisaster] = useState(SAMPLE_DISASTER_ZONES[0]);

  // Migration Steps Workflow State (Stage 1: Registered, Stage 2: Shuttled, Stage 3: Camped, Stage 4: Rehabilitated)
  const [migrationStage, setMigrationStage] = useState(2); // Stage 2 Active

  // NGO Field Inspection Visit Schedule State
  const [visitSchedule] = useState([
    { id: 'VIS-101', date: 'Aug 8, 2026', time: '10:00 AM', location: 'Ramanagara Ward 4 & River Bank', team: 'Gram Vikas Field Inspection Team #1', focus: 'Flood Damage & Water Purification Setup' },
    { id: 'VIS-102', date: 'Aug 10, 2026', time: '11:30 AM', location: 'Pandavapura Hamlet, Mandya', team: 'Kaveri Rural Water Relief Team', focus: 'Solar Irrigation & Hydration Kiosk Setup' },
    { id: 'VIS-103', date: 'Aug 12, 2026', time: '02:00 PM', location: 'Gubbi Hill Pass, Tumakuru', team: 'Tumakuru Slope Safety Inspection Unit', focus: 'Landslide Clearance Inspection' }
  ]);

  // Inline Upload Rural Issue Form State
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDistrict, setNewDistrict] = useState('Ramanagara Rural District');
  const [newVillage, setNewVillage] = useState('Ramanagara Village Ward 4');
  const [newSdgId, setNewSdgId] = useState(6);
  const [newSeverity, setNewSeverity] = useState('High');
  const [newDescription, setNewDescription] = useState('');
  const [newNgoName, setNewNgoName] = useState('Gram Vikas Rural Foundation');
  const [newOfficer, setNewOfficer] = useState('Suresh Patil (Field Officer)');
  const [imagePreview, setImagePreview] = useState(null);

  // Clearance Modal state
  const [selectedIssueForClearance, setSelectedIssueForClearance] = useState(null);
  const [clearanceNotesInput, setClearanceNotesInput] = useState('');
  const [newStatusInput, setNewStatusInput] = useState('Cleared');

  // Filter issues
  const filteredIssues = ruralIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSdg = selectedSdgFilter === 'All' || issue.sdgId === parseInt(selectedSdgFilter);
    const matchesStatus = selectedStatusFilter === 'All' || issue.status === selectedStatusFilter;
    const matchesDistrict = selectedDistrictFilter === 'All' || issue.ruralDistrict === selectedDistrictFilter;

    return matchesSearch && matchesSdg && matchesStatus && matchesDistrict;
  });

  // Filter citizen-reported issues vs NGO-reported issues
  const citizenReportedIssues = ruralIssues.filter(iss => iss.reportedByNgo.includes('Citizen'));

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const sdgObj = SDG_GOALS.find(g => g.id === parseInt(newSdgId)) || SDG_GOALS[5];

    const newIssueObj = {
      id: `RISS-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      ruralDistrict: newDistrict,
      village: newVillage,
      sdgId: sdgObj.id,
      sdgName: `${sdgObj.number} - ${sdgObj.shortTitle}`,
      category: sdgObj.shortTitle,
      severity: newSeverity,
      description: newDescription,
      reportedByNgo: newNgoName,
      fieldOfficer: newOfficer,
      status: 'Open',
      dateLogged: new Date().toISOString().split('T')[0],
      targetClearanceDate: 'Within 14 Days',
      evidencePhotos: [imagePreview || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&auto=format&fit=crop&q=80'],
      developerSolutionsCount: 0,
      clearanceNotes: 'Newly logged by field officer with photo evidence. Awaiting developer tech solution or field team clearance.'
    };

    const res = await apiService.createRuralIssue(newIssueObj);
    setRuralIssues(res.data);
    setShowUploadForm(false);
    
    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setImagePreview(null);
  };

  const handleClearIssue = async (e) => {
    e.preventDefault();
    if (!selectedIssueForClearance) return;

    const res = await apiService.clearRuralIssue(
      selectedIssueForClearance.id,
      newStatusInput,
      clearanceNotesInput || 'Verified by NGO field team & marked cleared.'
    );

    setRuralIssues(res.data);
    setSelectedIssueForClearance(null);
    setClearanceNotesInput('');
  };

  const handleApproveSolarRequest = async (reqId) => {
    const res = await apiService.approveSolarRequest(reqId);
    setEnergyRequests(res.data);
    if (setCleanEnergyRequests) setCleanEnergyRequests(res.data);
  };

  const handleExportCSV = () => {
    apiService.exportIssuesToCSV(filteredIssues);
  };

  const clearedCount = ruralIssues.filter(i => i.status === 'Cleared' || i.status.includes('Approved')).length;
  const openCount = ruralIssues.filter(i => i.status === 'Open').length;
  const totalNgoImpact = 1450 + (clearedCount * 250);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>{t.ngoPanelTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.ngoPanelTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            {t.ngoPanelSub}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center space-x-2 border border-slate-300 dark:border-slate-700"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            <span>Export CSV Report</span>
          </button>

          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{t.uploadRuralIssue}</span>
          </button>
        </div>
      </div>

      {/* NGO Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Field & Citizen Issues</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">{ruralIssues.length} Total</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Citizen Direct Grievances</span>
          <p className="text-xl font-extrabold text-purple-700 dark:text-purple-400">{citizenReportedIssues.length} From Citizens</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">SDG 7 Solar Applications</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">{energyRequests.length} Requests</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">NGO Impact Score</span>
          <p className="text-xl font-extrabold text-teal-700 dark:text-teal-400">{totalNgoImpact} PTS</p>
        </div>
      </div>

      {/* SDG 7 CLEAN RENEWABLE ENERGY & SOLAR INSTALLATION QUEUE */}
      <div className="p-6 rounded-3xl glass-panel border-2 border-amber-500/40 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <Zap className="h-5 w-5" />
            <span>☀️ {t.solarSubsidyQueue} ({energyRequests.length})</span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Streamed live from Citizen Clean Energy Portal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {energyRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {req.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  {req.status}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{req.schemeName}</h4>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">Applicant: <strong className="text-slate-900 dark:text-white">{req.applicantName}</strong> ({req.applicantPhone})</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">Location: {req.village}, {req.district}</p>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-700 dark:text-slate-300 font-bold">{req.solarCapacity}</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">Grant: {req.subsidyGrant}</strong>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Submitted: {req.submittedDate}</span>
                {req.status.includes('Approved') ? (
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Site Survey Approved</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApproveSolarRequest(req.id)}
                    className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    {t.approveSolarBtn}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WORKING NGO DISASTER CONTROL PANEL & CITIZEN MIGRATION WORKFLOW */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-red-500/40 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="h-4 w-4" />
              <span>{t.disasterLossHeading}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Disaster Relief Operations & Citizen Migration Tracker</h2>
          </div>

          {/* Affected Area Focus Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">Disaster Zone:</span>
            <select
              value={selectedDisaster.id}
              onChange={(e) => setSelectedDisaster(disasterZones.find(z => z.id === e.target.value) || disasterZones[0])}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              {disasterZones.map(z => (
                <option key={z.id} value={z.id}>{z.district} ({z.lossPercentage}% Loss)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Affected Areas Loss Analytics & Relief Funding Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Disaster Area Loss Analytics Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <span className="text-[10px] font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider block">Estimated Area Loss %</span>
            <strong className="text-xl font-extrabold text-red-700 dark:text-red-400 leading-tight block">{selectedDisaster.lossPercentage}% Structural/Crop Loss</strong>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">Affected Population: <strong className="text-slate-900 dark:text-white">{selectedDisaster.affectedCitizens} Citizens</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 font-medium">
              Primary Hazard: <span className="text-amber-700 dark:text-amber-300 font-bold">{selectedDisaster.hazardType}</span>
            </div>
          </div>

          {/* Relief Funding for Affected Area */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Relief Funding Progress</span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Allocated:</span>
              <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">{selectedDisaster.allocatedFunding} / {selectedDisaster.requiredFunding}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 italic font-medium">Dispatched: Drinking water bags, ration kits & mobile diagnostic vans</p>
          </div>

          {/* NGO Field Inspection Visit Schedule */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <span className="text-[10px] font-extrabold text-purple-700 dark:text-purple-400 uppercase tracking-wider flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Upcoming Field Visit Dates</span>
            </span>
            {visitSchedule.map((vis) => (
              <div key={vis.id} className="text-[11px] text-slate-800 dark:text-slate-200 space-y-0.5 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-purple-700 dark:text-purple-400">{vis.date} ({vis.time})</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[10px]">{vis.location}</span>
                </div>
                <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium">{vis.focus}</p>
              </div>
            ))}
          </div>

        </div>

        {/* WORKING 4-STEP CITIZEN MIGRATION WORKFLOW SYSTEM */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center space-x-2">
              <Bus className="h-4 w-4" />
              <span>{t.migrationWorkflowHeading} for {selectedDisaster.district}</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              Evacuated: {selectedDisaster.evacuatedCitizens} / {selectedDisaster.affectedCitizens} Citizens
            </span>
          </div>

          {/* Interactive 4-Step Migration Progress Track */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            
            {/* Step 1 */}
            <div 
              onClick={() => setMigrationStage(1)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 1 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold' 
                  : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between font-extrabold">
                <span>{t.step1Reg}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-[10px] leading-tight text-slate-700 dark:text-slate-300 font-medium">Hazard ID & Evacuation List Formats Logged</p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setMigrationStage(2)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 2 
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 font-bold' 
                  : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between font-extrabold">
                <span>{t.step2Bus}</span>
                <Bus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[10px] leading-tight text-slate-700 dark:text-slate-300 font-medium">8 Free Emergency Bus Shuttles Active En Route</p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setMigrationStage(3)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 3 
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-900 dark:text-purple-200 font-bold' 
                  : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between font-extrabold">
                <span>{t.step3Camp}</span>
                <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-[10px] leading-tight text-slate-700 dark:text-slate-300 font-medium">Relief Camp Admission & Ration Kits Provided</p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => setMigrationStage(4)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 4 
                  ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-900 dark:text-teal-200 font-bold' 
                  : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between font-extrabold">
                <span>{t.step4Rehab}</span>
                <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-[10px] leading-tight text-slate-700 dark:text-slate-300 font-medium">Housing Reconstruction & Crop Relief Grant</p>
            </div>

          </div>

          {/* Controls to Update Stage */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-700 dark:text-slate-300 font-semibold">Current Field Migration Phase: <strong className="text-blue-700 dark:text-blue-400 font-extrabold">Stage {migrationStage} Active</strong></span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMigrationStage(Math.max(1, migrationStage - 1))}
                className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
              >
                Previous Stage
              </button>
              <button
                onClick={() => setMigrationStage(Math.min(4, migrationStage + 1))}
                className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold"
              >
                Advance Migration Phase →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RURAL FIELD ISSUES QUEUE SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.issuesQueue} ({filteredIssues.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredIssues.map((issue) => {
            const sdgObj = SDG_GOALS.find(g => g.id === issue.sdgId) || SDG_GOALS[0];
            return (
              <div key={issue.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded text-white" style={{ backgroundColor: sdgObj.color }}>
                    {sdgObj.number} - {sdgObj.shortTitle}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    issue.status === 'Cleared' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                  }`}>
                    {issue.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{issue.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Village: <strong className="text-slate-900 dark:text-slate-200">{issue.village}</strong> ({issue.ruralDistrict})</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-2 font-medium">{issue.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">{t.severity} <strong className="text-amber-700 dark:text-amber-400">{issue.severity}</strong></span>
                  <button
                    onClick={() => setSelectedIssueForClearance(issue)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all"
                  >
                    {t.clearIssueBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
