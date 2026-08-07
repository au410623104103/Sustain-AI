import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

export default function CaptchaWidget({ onCaptchaChange, userCaptcha, captchaError }) {
  const [captchaCode, setCaptchaCode] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    if (onCaptchaChange) onCaptchaChange(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="space-y-2 text-xs">
      <label className="block font-semibold text-slate-300">Security CAPTCHA Verification</label>
      
      <div className="flex items-center space-x-3">
        {/* CAPTCHA Display Box */}
        <div className="px-4 py-2.5 rounded-xl bg-slate-950 border-2 border-emerald-500/40 text-emerald-400 font-mono text-lg font-black tracking-widest select-none flex items-center space-x-2 shadow-inner">
          <span className="skew-x-6 tracking-[0.2em]">{captchaCode}</span>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={generateCaptcha}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all shrink-0"
          title="Refresh CAPTCHA"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <p className="text-[10px] text-slate-400">Type the exact 6-character code shown above (case-sensitive).</p>
      
      {captchaError && (
        <p className="text-[11px] font-bold text-red-400">✕ Incorrect CAPTCHA code. Please try again.</p>
      )}
    </div>
  );
}
