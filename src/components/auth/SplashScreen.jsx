import React, { useEffect, useState } from 'react';
import { Sparkles, Globe } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish && onFinish(), 400);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 select-none animate-in fade-in duration-500">
      
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center max-w-md">
        
        {/* Animated Logo Icon */}
        <div className="relative h-20 w-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-2xl shadow-emerald-500/20 animate-pulse">
          <div className="h-full w-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Globe className="h-10 w-10 text-emerald-400 animate-spin-slow" />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            SustainAI
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-emerald-400 tracking-wide uppercase">
            Intelligent AI Operating System
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto italic font-medium pt-1">
            "One Platform. Every Citizen. Every Service. Every SDG."
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2 pt-4">
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-500">
            Initializing AI Engines... {progress}%
          </span>
        </div>

      </div>

    </div>
  );
}
