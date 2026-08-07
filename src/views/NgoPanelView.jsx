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
  Download,
  Send,
  Wrench
} from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';
import { RURAL_DISTRICTS, SAMPLE_NGOS, SAMPLE_DISASTER_ZONES, SAMPLE_CLEAN_ENERGY_REQUESTS } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';
import { apiService } from '../services/apiService';
import { storageService } from '../services/storageService';
import { realtimeService, REALTIME_EVENTS } from '../services/realtimeService';

export default function NgoPanelView({ ruralIssues, setRuralIssues, developerSolutions, cleanEnergyRequests, setCleanEnergyRequests, currentLanguage }) {
  const [selectedSdgFilter, setSelectedSdgFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // Local state for clean energy requests
  const [energyRequests, setEnergyRequests] = useState(() => {
    const stored = storageService.getCleanEnergyRequests();
    return (stored && stored.length > 0) ? stored : SAMPLE_CLEAN_ENERGY_REQUESTS;
  });

  // Sync state if props update from realtime BroadcastChannel
  React.useEffect(() => {
    const stored = storageService.getCleanEnergyRequests();
    if (stored && stored.length > 0) setEnergyRequests(stored);
  }, [cleanEnergyRequests]);

  // Disaster Zones State for Working Migration Tracker
  const [disasterZones, setDisasterZones] = useState(SAMPLE_DISASTER_ZONES);
  const [selectedDisaster, setSelectedDisaster] = useState(SAMPLE_DISASTER_ZONES[0]);
  const [migrationStage, setMigrationStage] = useState(2); // Stage 2 Active

  // NGO Field Inspection Visit Schedule State
  const [visitSchedule, setVisitSchedule] = useState([
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
    
    // Broadcast notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: '📌 New NGO Field Issue Logged',
      message: `Field issue "${newTitle}" logged in ${newDistrict}. Escalated to NGO Field Team.`,
      timestamp: 'Just now',
      read: false,
      type: 'issue',
      link: 'ngo-panel'
    };
    storageService.addNotification(newNotif);
    realtimeService.broadcast(REALTIME_EVENTS.ISSUE_CREATED, newIssueObj);

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
    
    // Broadcast notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: '✅ Issue Cleared by NGO',
      message: `Issue "${selectedIssueForClearance.title}" has been cleared and verified by Gram Vikas NGO.`,
      timestamp: 'Just now',
      read: false,
      type: 'clearance',
      link: 'ngo-panel'
    };
    storageService.addNotification(newNotif);
    realtimeService.broadcast(REALTIME_EVENTS.ISSUE_CLEARED, selectedIssueForClearance);

    setSelectedIssueForClearance(null);
    setClearanceNotesInput('');
  };

  // NGO ➔ DEVELOPER HUB ISSUE ESCALATION HANDLER
  const handleEscalateToDeveloper = (issue) => {
    const existingSols = storageService.getDeveloperSolutions();
    const newEscalatedSolution = {
      id: `DSOL-${Date.now()}`,
      issueId: issue.id,
      issueTitle: issue.title,
      developerName: 'Awaiting Developer Assignment',
      solutionTitle: `Tech Clearance Request: ${issue.title}`,
      repoUrl: 'https://github.com/au410623104103/Sustain-AI',
      techStack: ['React', 'Node.js', 'IoT Sensor', 'GIS Mapping'],
      description: `Escalated by NGO Officer (${issue.fieldOfficer || 'Gram Vikas NGO'}). Problem: ${issue.description}`,
      status: 'Escalated to Dev Hub - Tech Fix Pending',
      district: issue.ruralDistrict,
      village: issue.village,
      dateSubmitted: new Date().toISOString().split('T')[0]
    };

    const updatedSols = [newEscalatedSolution, ...existingSols];
    storageService.saveDeveloperSolutions(updatedSols);

    // Update Issue Status in ruralIssues
    const updatedIssues = ruralIssues.map(iss => {
      if (iss.id === issue.id) {
        return { ...iss, status: 'Escalated to Dev Hub', developerSolutionsCount: (iss.developerSolutionsCount || 0) + 1 };
      }
      return iss;
    });
    setRuralIssues(updatedIssues);
    storageService.saveRuralIssues(updatedIssues);

    // Broadcast live notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '💻 NGO Escalated Issue to Developer Hub',
      message: `Issue "${issue.title}" escalated to Developer Hub for open-source code fix!`,
      timestamp: 'Just now',
      read: false,
      type: 'escalation',
      link: 'developer-hub'
    };
    storageService.addNotification(notif);
    realtimeService.broadcast(REALTIME_EVENTS.ISSUE_CREATED, newEscalatedSolution);

    alert(`Issue "${issue.title}" successfully escalated to Developer Hub! Developers can now deploy code fixes.`);
  };

  // CLEAN ENERGY FUNDING & SITE VISIT MANAGEMENT HANDLERS
  const handleScheduleSolarVisit = (reqId) => {
    const updated = energyRequests.map(r => {
      if (r.id === reqId) {
        return { ...r, status: 'Rural Site Visit Scheduled (Aug 10, 2026)', inspectionDate: '2026-08-10' };
      }
      return r;
    });
    setEnergyRequests(updated);
    storageService.saveCleanEnergyRequests(updated);
    if (setCleanEnergyRequests) setCleanEnergyRequests(updated);

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '📅 Solar Rural Site Visit Scheduled',
      message: 'NGO field inspection team scheduled rooftop solar site survey for Aug 10, 2026.',
      timestamp: 'Just now',
      read: false,
      type: 'solar',
      link: 'clean-energy'
    };
    storageService.addNotification(notif);
    realtimeService.broadcast(REALTIME_EVENTS.SOLAR_APPROVED, { reqId });
  };

  const handleApproveSolarGrant = (reqId) => {
    const updated = energyRequests.map(r => {
      if (r.id === reqId) {
        return { ...r, status: '₹78,000 Grant Transferred & Bank Credit Verified' };
      }
      return r;
    });
    setEnergyRequests(updated);
    storageService.saveCleanEnergyRequests(updated);
    if (setCleanEnergyRequests) setCleanEnergyRequests(updated);

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '☀️ Solar Grant Subsidy Approved',
      message: 'NGO verified PM Surya Ghar ₹78,000 direct bank grant transfer.',
      timestamp: 'Just now',
      read: false,
      type: 'solar',
      link: 'clean-energy'
    };
    storageService.addNotification(notif);
    realtimeService.broadcast(REALTIME_EVENTS.SOLAR_APPROVED, { reqId });
  };

  const handleDispatchSolarTeam = (reqId) => {
    const updated = energyRequests.map(r => {
      if (r.id === reqId) {
        return { ...r, status: 'Solar Installation Team Dispatched to Village' };
      }
      return r;
    });
    setEnergyRequests(updated);
    storageService.saveCleanEnergyRequests(updated);
    if (setCleanEnergyRequests) setCleanEnergyRequests(updated);

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '🚚 Solar Installation Team Dispatched',
      message: 'Gram Vikas Field Solar Installation van en route to village location.',
      timestamp: 'Just now',
      read: false,
      type: 'solar',
      link: 'clean-energy'
    };
    storageService.addNotification(notif);
    realtimeService.broadcast(REALTIME_EVENTS.SOLAR_APPROVED, { reqId });
  };

  const handleExportCSV = () => {
    apiService.exportIssuesToCSV(filteredIssues);
  };

  const clearedCount = ruralIssues.filter(i => i.status === 'Cleared' || i.status.includes('Approved') || i.status.includes('Deployed')).length;
  const openCount = ruralIssues.filter(i => i.status === 'Open' || i.status.includes('Escalated')).length;
  const totalNgoImpact = 1450 + (clearedCount * 250);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>NGO Field Operations & Management Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">NGO Operations & Solar Management Hub</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Manage rural field visits, grant funding dispatch, rooftop solar queues, and escalate tech issues directly to Developer Hub.
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
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Log Rural Field Issue</span>
          </button>
        </div>
      </div>

      {/* METRICS HUD BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Active Solar Applications</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{energyRequests.length} Applications</p>
        </div>
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Open Field Issues</span>
          <p className="text-2xl font-black text-red-600 dark:text-red-400">{openCount} Issues</p>
        </div>
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Cleared & Deployed</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{clearedCount} Cleared</p>
        </div>
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">NGO Impact Score</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{totalNgoImpact} PTS</p>
        </div>
      </div>

      {/* SDG 7 CLEAN ENERGY & SOLAR APPLICATION QUEUE SECTION (FEATURE 1) */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-amber-500/40 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sun className="h-5 w-5 text-amber-500 animate-spin-slow" />
              <span>SDG 7 Rooftop Solar Application Queue ({energyRequests.length})</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Streamed live from Citizen Clean Energy Portal. Manage site inspection visits, subsidy funding grants, and field installation dispatch.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-bold shrink-0">
            Live Solar Queue Active
          </span>
        </div>

        {/* Solar Queue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {energyRequests.map((req) => (
            <div key={req.id} className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  {req.schemeName}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">{req.subsidyGrant}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{req.applicantName}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{req.village} ({req.district})</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mt-1">Solar Plant: {req.solarCapacity}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Phone: {req.applicantPhone}</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Current Process Status:</span>
                <strong className="text-slate-900 dark:text-white font-extrabold block text-xs">{req.status}</strong>
              </div>

              {/* 3 Management Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <button
                  onClick={() => handleScheduleSolarVisit(req.id)}
                  className="w-full py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center space-x-1"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Schedule Rural Site Visit</span>
                </button>

                <button
                  onClick={() => handleApproveSolarGrant(req.id)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold hover:shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>Approve & Transfer Subsidy Grant</span>
                </button>

                <button
                  onClick={() => handleDispatchSolarTeam(req.id)}
                  className="w-full py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center space-x-1"
                >
                  <Bus className="h-3.5 w-3.5" />
                  <span>Dispatch Installation Team</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RURAL FIELD ISSUES QUEUE & DEVELOPER ESCALATION SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <span>Rural Field Issues Queue & Developer Escalations ({filteredIssues.length})</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Verify field issues, log new reports, or escalate tech problems to the Developer Hub.</p>
          </div>
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
                    issue.status === 'Cleared' || issue.status.includes('Deployed') ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
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
                  
                  <div className="flex items-center space-x-2">
                    {/* ESCALATE TO DEVELOPER HUB BUTTON */}
                    <button
                      onClick={() => handleEscalateToDeveloper(issue)}
                      className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-extrabold text-xs hover:bg-cyan-500/30 transition-all flex items-center space-x-1"
                    >
                      <Code className="h-3.5 w-3.5" />
                      <span>Escalate to Dev Hub</span>
                    </button>

                    <button
                      onClick={() => setSelectedIssueForClearance(issue)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:shadow-lg transition-all"
                    >
                      {t.clearIssueBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
