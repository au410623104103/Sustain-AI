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
  Sun
} from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';
import { RURAL_DISTRICTS, SAMPLE_NGOS, SAMPLE_DISASTER_ZONES } from '../data/mockDatabase';

export default function NgoPanelView({ ruralIssues, setRuralIssues, developerSolutions, cleanEnergyRequests, setCleanEnergyRequests }) {
  const [selectedSdgFilter, setSelectedSdgFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Local state for clean energy requests if props not passed
  const [energyRequests, setEnergyRequests] = useState(cleanEnergyRequests || [
    {
      id: 'SOLAR-REQ-101',
      schemeName: 'PM Surya Ghar: Subsidized Rooftop Solar',
      applicantName: 'Ramesh Patel',
      applicantPhone: '+91 98450 66778',
      district: 'Ramanagara Rural District',
      village: 'Ramanagara Village Ward 4',
      solarCapacity: '3.0 kW Rooftop Solar',
      subsidyGrant: '₹78,000',
      status: 'Site Inspection Required',
      submittedDate: '2026-08-05'
    }
  ]);

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

  const handleCreateIssue = (e) => {
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

    setRuralIssues([newIssueObj, ...ruralIssues]);
    setShowUploadForm(false);
    
    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setImagePreview(null);
  };

  const handleClearIssue = (e) => {
    e.preventDefault();
    if (!selectedIssueForClearance) return;

    const updated = ruralIssues.map(iss => {
      if (iss.id === selectedIssueForClearance.id) {
        return {
          ...iss,
          status: newStatusInput,
          clearanceNotes: clearanceNotesInput || `Status updated to ${newStatusInput} by field officer.`
        };
      }
      return iss;
    });

    setRuralIssues(updated);
    setSelectedIssueForClearance(null);
    setClearanceNotesInput('');
  };

  const handleApproveSolarRequest = (reqId) => {
    setEnergyRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Site Survey Approved & Solar Equipment Dispatched' } : r));
  };

  // Metrics
  const clearedCount = ruralIssues.filter(i => i.status === 'Cleared').length;
  const totalNgoImpact = 2450 + (clearedCount * 250);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>Dedicated NGO Operations Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">NGO Field & Rural Issue Clearance Center</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Upload field issues with photo evidence, manage SDG 7 clean energy solar installations, track citizen migration workflows, and schedule field visits.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center space-x-2"
          >
            <Camera className="h-4 w-4" />
            <span>{showUploadForm ? 'Close Upload Form' : 'Upload Rural Issue (With Photo)'}</span>
          </button>
        </div>
      </div>

      {/* NGO Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Field & Citizen Issues</span>
          <p className="text-xl font-extrabold">{ruralIssues.length} Total</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Citizen Direct Grievances</span>
          <p className="text-xl font-extrabold text-purple-700 dark:text-purple-400">{citizenReportedIssues.length} From Citizens</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">SDG 7 Solar Applications</span>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">{energyRequests.length} Requests</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">NGO Impact Score</span>
          <p className="text-xl font-extrabold text-teal-700 dark:text-teal-400">{totalNgoImpact} PTS</p>
        </div>
      </div>

      {/* SDG 7 CLEAN RENEWABLE ENERGY & SOLAR INSTALLATION QUEUE */}
      <div className="p-6 rounded-3xl glass-panel border-2 border-amber-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <Zap className="h-5 w-5" />
            <span>☀️ SDG 7 Solar & Clean Energy Subsidy Inspection Queue ({energyRequests.length})</span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400">Streamed live from Citizen Clean Energy Portal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {energyRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {req.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  {req.status}
                </span>
              </div>

              <h4 className="text-xs font-bold">{req.schemeName}</h4>
              <p className="text-[11px] text-slate-700 dark:text-slate-300">Applicant: <strong className="text-slate-900 dark:text-white">{req.applicantName}</strong> ({req.applicantPhone})</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Location: {req.village}, {req.district}</p>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-semibold">{req.solarCapacity}</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Grant: {req.subsidyGrant}</strong>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-semibold">Submitted: {req.submittedDate}</span>
                {req.status.includes('Approved') ? (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Site Survey Approved</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApproveSolarRequest(req.id)}
                    className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Approve Site Survey & Dispatch
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WORKING NGO DISASTER CONTROL PANEL & CITIZEN MIGRATION WORKFLOW */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-red-500/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="h-4 w-4" />
              <span>NGO Disaster Area Loss, Relief Funding & Migration Operations</span>
            </div>
            <h2 className="text-lg font-bold">Disaster Relief Operations & Citizen Migration Tracker</h2>
          </div>

          {/* Affected Area Focus Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">Disaster Zone:</span>
            <select
              value={selectedDisaster.id}
              onChange={(e) => setSelectedDisaster(disasterZones.find(z => z.id === e.target.value) || disasterZones[0])}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold"
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
          <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">Estimated Area Loss %</span>
            <strong className="text-2xl font-extrabold text-red-700 dark:text-red-400">{selectedDisaster.lossPercentage}% Structural/Crop Loss</strong>
            <p className="text-xs text-slate-600 dark:text-slate-400">Affected Population: <strong className="text-slate-900 dark:text-white">{selectedDisaster.affectedCitizens} Citizens</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-700 dark:text-slate-300 font-medium">
              Primary Hazard: <span className="text-amber-700 dark:text-amber-300 font-bold">{selectedDisaster.hazardType}</span>
            </div>
          </div>

          {/* Relief Funding for Affected Area */}
          <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Relief Funding Progress</span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Allocated:</span>
              <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedDisaster.allocatedFunding} / {selectedDisaster.requiredFunding}</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">Dispatched: Drinking water bags, ration kits & mobile diagnostic vans</p>
          </div>

          {/* NGO Field Inspection Visit Schedule */}
          <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Upcoming Field Visit Dates</span>
            </span>
            {visitSchedule.map((vis) => (
              <div key={vis.id} className="text-[11px] text-slate-700 dark:text-slate-300 space-y-0.5 pt-1 border-t border-slate-200 dark:border-slate-900">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-purple-700 dark:text-purple-400">{vis.date} ({vis.time})</span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">{vis.location}</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400">{vis.focus}</p>
              </div>
            ))}
          </div>

        </div>

        {/* WORKING 4-STEP CITIZEN MIGRATION WORKFLOW SYSTEM */}
        <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center space-x-2">
              <Bus className="h-4 w-4" />
              <span>Working Citizen Evacuation & Migration 4-Step Workflow for {selectedDisaster.district}</span>
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
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>Step 1: Registration</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-[10px] leading-tight">Hazard ID & Evacuation List Formats Logged</p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setMigrationStage(2)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 2 
                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-300' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>Step 2: Bus Shuttle</span>
                <Bus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[10px] leading-tight">8 Free Emergency Bus Shuttles Active En Route</p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setMigrationStage(3)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 3 
                  ? 'bg-purple-500/10 border-purple-500/40 text-purple-700 dark:text-purple-300' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>Step 3: Camp Check-in</span>
                <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-[10px] leading-tight">Relief Camp Admission & Ration Kits Provided</p>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => setMigrationStage(4)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                migrationStage >= 4 
                  ? 'bg-teal-500/10 border-teal-500/40 text-teal-700 dark:text-teal-300' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>Step 4: Rehabilitation</span>
                <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-[10px] leading-tight">Housing Reconstruction & Crop Relief Grant</p>
            </div>

          </div>

          {/* Controls to Update Stage */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-900 text-xs">
            <span className="text-slate-600 dark:text-slate-400">Current Field Migration Phase: <strong className="text-blue-700 dark:text-blue-400 font-extrabold">Stage {migrationStage} Active</strong></span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMigrationStage(Math.max(1, migrationStage - 1))}
                className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
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

      {/* PROMINENT INLINE FIELD ISSUE UPLOAD FORM (WITH PHOTO UPLOAD) */}
      {showUploadForm && (
        <div className="p-6 rounded-3xl glass-panel border-2 border-emerald-500/50 space-y-4 animate-in fade-in">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="h-4 w-4" />
            <span>NGO Field Officer Upload Section</span>
          </div>

          <h2 className="text-lg font-extrabold">Post New Rural Problem with Field Evidence Photo</h2>

          <form onSubmit={handleCreateIssue} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Issue Headline / Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Broken Water Pipeline in Rural Ward 4"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Rural District</label>
                <select
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 outline-none"
                >
                  {RURAL_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Village / Ward Name</label>
                <input
                  type="text"
                  required
                  value={newVillage}
                  onChange={(e) => setNewVillage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Map to 17 UN SDGs</label>
                <select
                  value={newSdgId}
                  onChange={(e) => setNewSdgId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-semibold focus:border-emerald-500 outline-none"
                >
                  {SDG_GOALS.map(sdg => (
                    <option key={sdg.id} value={sdg.id}>{sdg.number}: {sdg.shortTitle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Severity Level</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 outline-none"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Field Description & Problems Found</label>
              <textarea
                rows={3}
                required
                placeholder="Detail the exact community impact..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Photo Upload area */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Upload Photo Evidence (Required for Clearance Tracking)</label>
              <label className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/60 border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-colors">
                <Upload className="h-6 w-6 text-slate-400 mb-1" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Click to select field photo or take picture</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {imagePreview && (
                <div className="mt-2 relative h-24 w-36 rounded-xl overflow-hidden border border-emerald-500/40">
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => setShowUploadForm(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold">
                Post Rural Issue to Platform
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CITIZEN DIRECT GRIEVANCES QUEUE (CITIZEN TO NGO FLOW) */}
      {citizenReportedIssues.length > 0 && (
        <div className="p-6 rounded-3xl glass-panel border-2 border-purple-500/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400 font-bold text-sm">
              <HeartHandshake className="h-5 w-5" />
              <span>📩 Citizen Reported Grievances & Eco Issues ({citizenReportedIssues.length})</span>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Routed directly from Citizen Portal for NGO field clearance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {citizenReportedIssues.map((iss) => (
              <div key={iss.id} className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    {iss.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300">
                    {iss.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold">{iss.title}</h4>
                <p className="text-[11px] text-slate-700 dark:text-slate-300">{iss.description}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Location: {iss.village}, {iss.ruralDistrict}</p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">{iss.sdgName}</span>
                  <button
                    onClick={() => {
                      setSelectedIssueForClearance(iss);
                      setNewStatusInput(iss.status === 'Cleared' ? 'In Progress' : 'Cleared');
                    }}
                    className="px-3 py-1 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
                  >
                    Clear Citizen Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 17 SDG Category Filter & Search Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search rural issues by keyword or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* 17 UN SDGs Dropdown */}
          <div>
            <select
              value={selectedSdgFilter}
              onChange={(e) => setSelectedSdgFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 font-semibold"
            >
              <option value="All">Filter by 17 UN SDGs (All Goals)</option>
              {SDG_GOALS.map((sdg) => (
                <option key={sdg.id} value={sdg.id}>
                  {sdg.number}: {sdg.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open (Awaiting Developer/NGO Action)</option>
              <option value="Tech Solution Submitted">Tech Solution Submitted by Dev</option>
              <option value="In Progress">In Progress (Field Work)</option>
              <option value="Cleared">Cleared & Resolved</option>
            </select>
          </div>

        </div>
      </div>

      {/* All NGO Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIssues.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <p className="text-sm font-semibold">No rural issues match the selected filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedSdgFilter('All'); setSelectedStatusFilter('All'); }}
              className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const sdgObj = SDG_GOALS.find(g => g.id === issue.sdgId) || SDG_GOALS[0];
            const matchedSolutions = developerSolutions?.filter(s => s.issueId === issue.id) || [];

            return (
              <div 
                key={issue.id}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-xs font-extrabold px-2.5 py-0.5 rounded text-white shadow-sm"
                      style={{ backgroundColor: sdgObj.color }}
                    >
                      {sdgObj.number} - {sdgObj.shortTitle}
                    </span>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      issue.status === 'Cleared' 
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' 
                        : issue.status === 'Tech Solution Submitted'
                          ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30'
                          : issue.status === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                            : 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30'
                    }`}>
                      {issue.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{issue.id}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{issue.village}, {issue.ruralDistrict}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2 leading-snug">{issue.title}</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{issue.description}</p>

                  {/* Evidence & Developer Solution Counters */}
                  <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-semibold">
                      <span>Logged By: <strong className="text-slate-900 dark:text-slate-200">{issue.reportedByNgo}</strong></span>
                      <span>Severity: <strong className="text-amber-700 dark:text-amber-400">{issue.severity}</strong></span>
                    </div>

                    {matchedSolutions.length > 0 && (
                      <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300">
                        <span className="font-bold flex items-center space-x-1">
                          <Code className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                          <span>{matchedSolutions.length} Developer Tech Solution(s) Submitted</span>
                        </span>
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">Latest: {matchedSolutions[0].title}</p>
                      </div>
                    )}

                    {issue.clearanceNotes && (
                      <div className="text-[11px] text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-900 font-medium">
                        <span className="text-slate-500 font-semibold block">Field Resolution Notes:</span>
                        <span>{issue.clearanceNotes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                    Target Resolution: <span className="text-slate-900 dark:text-slate-200 font-bold">{issue.targetClearanceDate}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedIssueForClearance(issue);
                      setNewStatusInput(issue.status === 'Cleared' ? 'In Progress' : 'Cleared');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Manage / Clear Issue</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CLEAR / MANAGE ISSUE MODAL */}
      {selectedIssueForClearance && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700 bg-slate-900 p-6 text-white-force">
            <button onClick={() => setSelectedIssueForClearance(null)} className="absolute top-4 right-4 text-slate-400">✕</button>

            <h3 className="text-base font-bold text-white text-white-force mb-2">NGO Issue Management & Clearance</h3>
            <p className="text-xs text-slate-400 text-white-force mb-4">{selectedIssueForClearance.title} ({selectedIssueForClearance.village})</p>

            <form onSubmit={handleClearIssue} className="space-y-4 text-xs text-white-force">
              <div>
                <label className="block font-semibold text-slate-300 mb-1 text-white-force">Update Status</label>
                <select
                  value={newStatusInput}
                  onChange={(e) => setNewStatusInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress (Field Work)</option>
                  <option value="Cleared">Cleared & Issue Fixed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1 text-white-force">Clearance / Field Action Notes</label>
                <textarea
                  rows={3}
                  placeholder="Detail field clearance actions taken..."
                  value={clearanceNotesInput}
                  onChange={(e) => setClearanceNotesInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force placeholder:text-slate-600"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button type="button" onClick={() => setSelectedIssueForClearance(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl">
                  Save Clearance Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
