import React, { useState } from 'react';
import { X, Key, ShieldCheck, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, setApiKey }) {
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setApiKey(tempKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleUseMock = () => {
    setTempKey('');
    setApiKey('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Key className="h-4 w-4" />
          <span>Gemini AI Engine Settings</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Configure AI Provider</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          SustainAI supports live integration with the Google Gemini API as well as an internal offline rule-based citizen engine.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono"
            />
            <p className="text-[10px] text-slate-500 mt-1">Key is kept only in local browser memory.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Hackathon Guarantee:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-normal">
              If left blank or if external API connection drops, SustainAI automatically switches to the built-in citizen intelligence engine so your demo never fails.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleUseMock}
              className="text-xs text-slate-400 hover:text-emerald-400 underline font-medium"
            >
              Use Built-In Mock Engine
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save API Settings</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
