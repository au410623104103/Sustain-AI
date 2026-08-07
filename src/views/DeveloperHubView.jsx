import React, { useState } from 'react';
import { 
  Code, 
  Terminal, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  GitBranch, 
  Plus, 
  Award,
  Layers,
  Search,
  Check,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';
import { SAMPLE_DEVELOPER_SOLUTIONS } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';
import { apiService } from '../services/apiService';
import { storageService } from '../services/storageService';
import { realtimeService, REALTIME_EVENTS } from '../services/realtimeService';

export default function DeveloperHubView({ ruralIssues, developerSolutions, setDeveloperSolutions, currentLanguage }) {
  const [selectedIssueForSolution, setSelectedIssueForSolution] = useState(null);
  const [solutionTitle, setSolutionTitle] = useState('');
  const [developerName, setDeveloperName] = useState('Priya Sharma (Tech Innovator)');
  const [githubUrl, setGithubUrl] = useState('https://github.com/au410623104103/Sustain-AI');
  const [demoUrl, setDemoUrl] = useState('https://sustainai.dev');
  const [techStackInput, setTechStackInput] = useState('React, Node.js, Tailwind, IoT');
  const [reportSummary, setReportSummary] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  // Local state synced with storageService for escalated NGO issues
  const [solutionsList, setSolutionsList] = useState(() => {
    const stored = storageService.getDeveloperSolutions();
    return (stored && stored.length > 0) ? stored : SAMPLE_DEVELOPER_SOLUTIONS;
  });

  React.useEffect(() => {
    const stored = storageService.getDeveloperSolutions();
    if (stored && stored.length > 0) setSolutionsList(stored);
    else if (developerSolutions) setSolutionsList(developerSolutions);
  }, [developerSolutions]);

  // DEVELOPER ISSUE CLEARANCE & CODE DEPLOYMENT HANDLER
  const handleDeployCodeFix = (solutionId) => {
    const updatedSols = solutionsList.map(s => {
      if (s.id === solutionId) {
        return { ...s, status: 'Issue Cleared & Code Deployed', dateSubmitted: new Date().toISOString().split('T')[0] };
      }
      return s;
    });

    setSolutionsList(updatedSols);
    storageService.saveDeveloperSolutions(updatedSols);
    if (setDeveloperSolutions) setDeveloperSolutions(updatedSols);

    // Find associated issue and mark cleared
    const targetSol = solutionsList.find(s => s.id === solutionId);
    if (targetSol) {
      const issues = storageService.getRuralIssues();
      const updatedIssues = issues.map(iss => {
        if (iss.id === targetSol.issueId || iss.title === targetSol.issueTitle) {
          return { ...iss, status: 'Cleared', clearanceNotes: 'Code fix deployed live by Developer Hub.' };
        }
        return iss;
      });
      storageService.saveRuralIssues(updatedIssues);
    }

    // Broadcast live notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '✅ Tech Issue Cleared by Developer Hub',
      message: `Developer deployed code fix for "${targetSol?.issueTitle || 'Escalated Tech Issue'}". Live deployment verified!`,
      timestamp: 'Just now',
      read: false,
      type: 'clearance',
      link: 'developer-hub'
    };
    storageService.addNotification(notif);
    realtimeService.broadcast(REALTIME_EVENTS.SOLUTION_SUBMITTED, { solutionId });

    alert(`Code fix successfully deployed live! Issue "${targetSol?.issueTitle}" is now cleared.`);
  };

  const handleCreateSolution = async (e) => {
    e.preventDefault();
    if (!selectedIssueForSolution || !solutionTitle.trim() || !reportSummary.trim()) return;

    const newSolution = {
      id: `DSOL-${Date.now()}`,
      issueId: selectedIssueForSolution.id,
      issueTitle: selectedIssueForSolution.title,
      title: solutionTitle,
      developerName: developerName,
      githubUrl: githubUrl,
      demoUrl: demoUrl,
      techStack: techStackInput.split(',').map(s => s.trim()),
      description: reportSummary,
      status: 'Issue Cleared & Code Deployed',
      submittedDate: new Date().toISOString().split('T')[0],
      impactScoreEarned: 400
    };

    const res = await apiService.submitDevSolution(newSolution);
    setSolutionsList(res.data.solutions);
    if (setDeveloperSolutions) setDeveloperSolutions(res.data.solutions);
    
    // Broadcast notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '💻 New Tech Solution Deployed',
      message: `Developer ${developerName} deployed solution "${solutionTitle}"!`,
      timestamp: 'Just now',
      read: false,
      type: 'clearance',
      link: 'developer-hub'
    };
    storageService.addNotification(notif);
    realtimeService.broadcast(REALTIME_EVENTS.SOLUTION_SUBMITTED, newSolution);

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSelectedIssueForSolution(null);
      setSolutionTitle('');
      setReportSummary('');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Code className="h-4 w-4" />
            <span>Developer Hub & Open-Source Tech Clearance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Developer Hub & Tech Escalation Center</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Inspect NGO tech escalations, deploy open-source code fixes, and clear village hardware/software issues.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold text-center">
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 block uppercase tracking-wider">Submitted Solutions</span>
            <span className="text-lg font-extrabold">{solutionsList.length} Tech Reports</span>
          </div>
        </div>
      </div>

      {/* Developer Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Open NGO Challenges</span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">{ruralIssues.length} SDG Problems</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Solutions Deployed in Field</span>
          <p className="text-xl font-extrabold text-purple-700 dark:text-purple-400">{solutionsList.length} Apps & Web Tools</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Developer Impact Badges</span>
          <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">1,250 Dev PTS</p>
        </div>
      </div>

      {/* NGO TECH ESCALATIONS & CLEARANCE REQUESTS SECTION (FEATURE 2) */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-cyan-500/40 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>NGO Tech Escalations & Clearance Requests ({solutionsList.length})</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Hardware/Software issues escalated directly by NGO field teams. Review code requests and deploy live clearances.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-bold shrink-0">
            Live Escalations Active
          </span>
        </div>

        {/* Escalated Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutionsList.map((sol) => (
            <div key={sol.id} className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                  {sol.issueTitle || 'NGO Tech Escalation'}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  sol.status.includes('Cleared') ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                }`}>
                  {sol.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{sol.solutionTitle || sol.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Dev Lead: {sol.developerName}</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-2 font-medium">{sol.description || sol.solutionReport}</p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(sol.techStack || ['React', 'Node.js', 'IoT']).map((tech, idx) => (
                  <span key={idx} className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={sol.repoUrl || 'https://github.com/au410623104103/Sustain-AI'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>

                {/* DEPLOY CODE FIX & CLEAR ISSUE BUTTON */}
                <button
                  onClick={() => handleDeployCodeFix(sol.id)}
                  disabled={sol.status.includes('Cleared')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:shadow-lg disabled:opacity-50 transition-all flex items-center space-x-1"
                >
                  <Wrench className="h-3.5 w-3.5" />
                  <span>{sol.status.includes('Cleared') ? 'Issue Cleared ✓' : 'Deploy Code Fix & Clear Issue ✓'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
