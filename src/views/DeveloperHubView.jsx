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

export default function DeveloperHubView({ ruralIssues, developerSolutions, setDeveloperSolutions }) {
  const [selectedIssueForSolution, setSelectedIssueForSolution] = useState(null);
  const [solutionTitle, setSolutionTitle] = useState('');
  const [developerName, setDeveloperName] = useState('Priya Sharma (Tech Innovator)');
  const [githubUrl, setGithubUrl] = useState('https://github.com/developer/rural-sdg-app');
  const [demoUrl, setDemoUrl] = useState('https://rural-sdg-app.sustainai.dev');
  const [techStackInput, setTechStackInput] = useState('React, Node.js, Tailwind, IoT');
  const [reportSummary, setReportSummary] = useState('');

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleCreateSolution = (e) => {
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

    setDeveloperSolutions([newSolution, ...developerSolutions]);
    
    // Update rural issue developer solution count
    selectedIssueForSolution.developerSolutionsCount = (selectedIssueForSolution.developerSolutionsCount || 0) + 1;
    selectedIssueForSolution.status = 'Tech Solution Submitted';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Code className="h-4 w-4" />
            <span>Developer & Tech Innovator Challenge Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Rural SDG Tech Solution Hub</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Software engineers & innovators build AI models, web apps, and tech clearance reports to solve rural issues uploaded by field NGOs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold text-center">
            <span className="text-[10px] text-purple-400 block uppercase tracking-wider">Submitted Solutions</span>
            <span className="text-lg font-extrabold">{developerSolutions.length} Tech Reports</span>
          </div>
        </div>
      </div>

      {/* Developer Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Open NGO Challenges</span>
          <p className="text-xl font-extrabold text-white">{ruralIssues.length} SDG Problems</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Solutions Deployed in Field</span>
          <p className="text-xl font-extrabold text-purple-400">{developerSolutions.length} Apps & Web Tools</p>
        </div>
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Developer Impact Badges</span>
          <p className="text-xl font-extrabold text-emerald-400">1,250 Dev PTS</p>
        </div>
      </div>

      {/* Main Grid: NGO Issues needing Tech Solutions */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Terminal className="h-5 w-5 text-purple-400" />
          <span>Active NGO Rural Challenges Awaiting Tech Solutions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ruralIssues.map((issue) => {
            const sdgObj = SDG_GOALS.find(g => g.id === issue.sdgId) || SDG_GOALS[0];
            const issueSolutions = developerSolutions.filter(s => s.issueId === issue.id);

            return (
              <div 
                key={issue.id}
                className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-xs font-extrabold px-2.5 py-0.5 rounded text-white"
                      style={{ backgroundColor: sdgObj.color }}
                    >
                      {sdgObj.number} - {sdgObj.shortTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      {issue.ruralDistrict}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{issue.title}</h3>
                  <p className="text-xs text-purple-400 mb-2">Target Village: {issue.village} (NGO: {issue.reportedByNgo})</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{issue.description}</p>

                  {/* Submitted Developer Solutions for this Issue */}
                  {issueSolutions.length > 0 && (
                    <div className="space-y-2 mb-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        Submitted Solutions ({issueSolutions.length}):
                      </span>
                      {issueSolutions.map(sol => (
                        <div key={sol.id} className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{sol.title}</span>
                            <span className="text-[10px] text-emerald-400 font-semibold">{sol.status}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1">{sol.solutionReport}</p>
                          <div className="flex items-center space-x-3 text-[10px] text-purple-300 mt-2">
                            <a href={sol.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:underline">
                              <GitBranch className="h-3 w-3" />
                              <span>GitHub Code</span>
                            </a>
                            <a href={sol.demoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:underline">
                              <ExternalLink className="h-3 w-3" />
                              <span>Web App Demo</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Severity: <strong className="text-amber-400">{issue.severity}</strong></span>

                  <button
                    onClick={() => setSelectedIssueForSolution(issue)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs hover:shadow-lg transition-all flex items-center space-x-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Submit Tech Solution Report</span>
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
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8">
            <button 
              onClick={() => setSelectedIssueForSolution(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Code className="h-4 w-4" />
              <span>Developer Solution Clearance Form</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">Submit Application / Web Tool Solution</h2>
            <p className="text-xs text-slate-400 mb-4">Solving: <strong className="text-slate-200">{selectedIssueForSolution.title}</strong> ({selectedIssueForSolution.village})</p>

            <form onSubmit={handleCreateSolution} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Solution / App Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SustainAqua IoT Water Telemetry & Leak Tracker"
                  value={solutionTitle}
                  onChange={(e) => setSolutionTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Developer / Team Name</label>
                  <input
                    type="text"
                    required
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tech Stack Used</label>
                  <input
                    type="text"
                    required
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">GitHub Repository Link</label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Web / Mobile App Demo URL</label>
                  <input
                    type="url"
                    required
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Technical Solution & Clearance Report</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain how your web app / AI model solves the rural issue and enables NGO field clearance..."
                  value={reportSummary}
                  onChange={(e) => setReportSummary(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setSelectedIssueForSolution(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-extrabold flex items-center space-x-1">
                  {submittedSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Solution Report Deployed!</span>
                    </>
                  ) : (
                    <span>Submit Solution Report & Earn 400 Dev PTS</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
