import React from 'react';
import { User, Building2, Code, Globe, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function RoleSelectionScreen({ onSelectRole, onGoBack }) {
  const roles = [
    {
      id: 'citizen',
      title: 'Citizen Portal',
      icon: User,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/40',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description: 'Access government schemes, healthcare, education, green jobs, AI recommendations, and sustainability services.',
      buttonText: 'Continue as Citizen'
    },
    {
      id: 'ngo',
      title: 'NGO Portal',
      icon: Building2,
      color: 'from-purple-500 to-indigo-500',
      borderColor: 'border-purple-500/40',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description: 'Manage NGO field activities, volunteers, donations, relief campaigns, and citizen service requests across 17 SDGs.',
      buttonText: 'Continue as NGO'
    },
    {
      id: 'developer',
      title: 'Developer Hub',
      icon: Code,
      color: 'from-cyan-500 to-blue-500',
      borderColor: 'border-cyan-500/40',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      description: 'Create SDG applications, access REST APIs, build AI integrations, and deploy smart rural tech solutions.',
      buttonText: 'Continue as Developer'
    },
    {
      id: 'sdg_admin',
      title: 'SDG Administration Portal',
      icon: Globe,
      color: 'from-amber-500 to-yellow-500',
      borderColor: 'border-amber-500/40',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description: 'Manage 17 SDG analytics, monitoring dashboards, government policy compliance reports, and sustainability insights.',
      buttonText: 'Continue as SDG Administrator'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl w-full space-y-8 relative z-10 my-auto py-8">
        
        {/* Header & Go Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Multi-Portal Authentication OS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Choose Your User Portal</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Select your role to access independent tools, AI recommendation engines, and role-specific dashboards.
            </p>
          </div>

          <button
            onClick={onGoBack}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center space-x-2 shrink-0 self-start sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Go Back to Welcome</span>
          </button>
        </div>

        {/* 4 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`p-6 sm:p-8 rounded-3xl glass-panel border-2 ${role.borderColor} hover:border-emerald-400 transition-all space-y-6 shadow-xl flex flex-col justify-between group hover:-translate-y-1 duration-200`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${role.color} p-0.5 shadow-lg flex items-center justify-center`}>
                      <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${role.badgeColor}`}>
                      Role Portal
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-2">
                      {role.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectRole(role.id)}
                  className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${role.color} text-slate-950 font-extrabold text-xs sm:text-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2 group-hover:scale-[1.02]`}
                >
                  <span>{role.buttonText}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
