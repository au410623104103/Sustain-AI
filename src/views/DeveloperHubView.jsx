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
  Check
} from 'lucide-react';
import { SDG_GOALS } from '../data/sdgData';
import { SAMPLE_DEVELOPER_SOLUTIONS } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';
import { apiService } from '../services/apiService';

export default function DeveloperHubView({ ruralIssues, developerSolutions, setDeveloperSolutions, currentLanguage }) {
  const [selectedIssueForSolution, setSelectedIssueForSolution] = useState(null);
  const [solutionTitle, setSolutionTitle] = useState('');
  const [developerName, setDeveloperName] = useState('Priya Sharma (Tech Innovator)');
  const [githubUrl, setGithubUrl] = useState('https://github.com/developer/rural-sdg-app');
  const [demoUrl, setDemoUrl] = useState('https://rural-sdg-app.sustainai.dev');
  const [techStackInput, setTechStackInput] = useState('React, Node.js, Tailwind, IoT');
  const [reportSummary, setReportSummary] = useState('');

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const handleCreateSolution = async (e) => {
    e.preventDefault();
    if (!selectedIssueForSolution || !solutionTitle.trim() || !reportSummary.trim()) return;

    const newSolution = {
      id: `SOL-${Math.floor(200 + Math.random() * 800)}`,
      issueId: selectedIssueForSolution.id,
      title: solutionTitle,
      developerName: developerName,
      githubUrl: githubUrl,
      demoUrl: demoUrl,
      techStack: techStackInput.split(',').map(s => s.trim()),
      solutionReport: reportSummary,
      status: 'Approved & Deployed',
      submittedDate: new Date().toISOString().split('T')[0],
      impactScoreEarned: 400
    };

    const res = await apiService.submitDevSolution(newSolution);
    setDeveloperSolutions(res.data.solutions);
    
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
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Code className="h-4 w-4" />
            <span>{t.devHubTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.devHubTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            {t.devHubSub}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold text-center">
            <span className="text-[10px] text-purple-600 dark:text-purple-400 block uppercase tracking-wider">Submitted Solutions</span>
            <span className="text-lg font-extrabold">{developerSolutions.length} Tech Reports</span>
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
          <p className="text-xl font-extrabold text-purple-700 dark:text-purple-400">{developerSolutions.length} Apps & Web Tools</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Developer Impact Badges</span>
          <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">1,250 Dev PTS</p>
        </div>
      </div>

      {/* Main Grid: NGO Issues needing Tech Solutions */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold flex items-center space-x-2 text-slate-900 dark:text-white">
          <Terminal className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <span>{t.activeChallenges}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ruralIssues.map((issue) => {
            const sdgObj = SDG_GOALS.find(g => g.id === issue.sdgId) || SDG_GOALS[0];
            const issueSolutions = developerSolutions.filter(s => s.issueId === issue.id);

            return (
              <div 
                key={issue.id}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-xs font-extrabold px-2.5 py-0.5 rounded text-white"
                      style={{ backgroundColor: sdgObj.color }}
                    >
                      {sdgObj.number} - {sdgObj.shortTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {issue.ruralDistrict}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{issue.title}</h3>
                  <p className="text-xs text-purple-700 dark:text-purple-400 font-bold mb-2">Target Village: {issue.village} (NGO: {issue.reportedByNgo})</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-medium">{issue.description}</p>

                  {/* Submitted Developer Solutions for this Issue */}
                  {issueSolutions.length > 0 && (
                    <div className="space-y-2 mb-3 p-3.5 rounded-2xl bg-purple-50 dark:bg-slate-950 border border-purple-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-widest block">
                        Submitted Solutions ({issueSolutions.length}):
                      </span>
                      {issueSolutions.map(sol => (
                        <div key={sol.id} className="p-3 rounded-xl bg-white dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-white">{sol.title}</span>
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold">{sol.status}</span>
                          </div>
                          <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-medium">{sol.solutionReport}</p>
                          <div className="flex items-center space-x-3 text-[10px] text-purple-700 dark:text-purple-300 mt-2 font-bold">
                            <a href={sol.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:underline">
                              <GitBranch className="h-3 w-3" />
                              <span>{t.githubCode}</span>
                            </a>
                            <a href={sol.demoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:underline">
                              <ExternalLink className="h-3 w-3" />
                              <span>{t.webDemo}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{t.severity} <strong className="text-amber-700 dark:text-amber-400">{issue.severity}</strong></span>

                  <button
                    onClick={() => setSelectedIssueForSolution(issue)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{t.submitDevSolution}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SUBMIT SOLUTION MODAL */}
      {selectedIssueForSolution && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white-force">
            <button 
              onClick={() => setSelectedIssueForSolution(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Code className="h-4 w-4" />
              <span>Developer Solution Clearance Form</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Submit Application / Web Tool Solution</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Solving: <strong className="text-slate-900 dark:text-slate-200">{selectedIssueForSolution.title}</strong> ({selectedIssueForSolution.village})</p>

            {submittedSuccess ? (
              <div className="p-8 text-center text-xs text-emerald-600 dark:text-emerald-400 font-bold space-y-2">
                <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-500" />
                <p className="text-base text-slate-900 dark:text-white">Developer Tech Solution Submitted & Approved!</p>
                <p className="text-slate-600 dark:text-slate-300 font-normal">NGO field officers notified. 400 Dev Impact PTS awarded to your profile.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateSolution} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tech Solution Title / Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SustainAqua: IoT Water Leakage Detection Web App"
                    value={solutionTitle}
                    onChange={(e) => setSolutionTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-purple-500 outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Developer / Team Name</label>
                    <input
                      type="text"
                      required
                      value={developerName}
                      onChange={(e) => setDeveloperName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-purple-500 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tech Stack Used</label>
                    <input
                      type="text"
                      required
                      placeholder="React, Node.js, MQTT IoT, Tailwind"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-purple-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub Code Repository URL</label>
                    <input
                      type="url"
                      required
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-purple-500 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Live Web App Demo Link</label>
                    <input
                      type="url"
                      required
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-purple-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Solution Architecture & Field Impact Summary</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how your code or web tool solves the rural issue..."
                    value={reportSummary}
                    onChange={(e) => setReportSummary(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-purple-500 outline-none font-medium"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button type="button" onClick={() => setSelectedIssueForSolution(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded-xl font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold rounded-xl">
                    Submit & Award 400 Dev PTS
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
