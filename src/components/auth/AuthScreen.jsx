import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Mail, User, Phone, MapPin, Building2, Code, Globe, Sparkles } from 'lucide-react';
import CaptchaWidget from './CaptchaWidget';

export default function AuthScreen({ selectedRole, initialMode = 'login', onAuthSuccess, onGoBack, onSwitchMode }) {
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState(isSignup ? '' : 'Arun Kumar');
  const [email, setEmail] = useState(isSignup ? '' : 'arun.kumar@student.edu.in');
  const [phone, setPhone] = useState('+91 98450 11223');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Karnataka');
  const [district, setDistrict] = useState('Ramanagara Rural District');
  const [password, setPassword] = useState('SustainAI@2026');
  const [confirmPassword, setConfirmPassword] = useState('SustainAI@2026');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Role Specific Fields
  const [ngoOrgName, setNgoOrgName] = useState('Gram Vikas Rural Empowerment NGO');
  const [ngoRegNo, setNgoRegNo] = useState('KA-NGO-2024-8840');
  const [devOrgName, setDevOrgName] = useState('SustainTech Open Source Collective');
  const [devStack, setDevStack] = useState('React, Node.js, Python, GIS');
  const [adminDepartment, setAdminDepartment] = useState('Ministry of Environment & NITI Aayog');

  // CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsSignup(initialMode === 'signup');
  }, [initialMode]);

  // Live Password Validation Criteria
  const pwdValidation = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const isPasswordValid = Object.values(pwdValidation).every(Boolean);

  const roleTitles = {
    citizen: '👤 Citizen Portal Access',
    ngo: '🤝 NGO Partner Network',
    developer: '💻 Developer Hub Portal',
    sdg_admin: '🌍 SDG Administrator Command'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setCaptchaError(false);

    // Verify CAPTCHA
    if (!userCaptcha || userCaptcha.trim() !== captchaCode.trim()) {
      setCaptchaError(true);
      return;
    }

    if (isSignup) {
      if (!isPasswordValid) {
        setErrorMessage('Password does not meet security requirements.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      if (!acceptTerms) {
        setErrorMessage('You must accept the Terms of Service.');
        return;
      }
    }

    // Authenticate and return user payload
    const userPayload = {
      name: fullName || (selectedRole === 'ngo' ? ngoOrgName : 'Arun Kumar'),
      email: email,
      role: selectedRole,
      district: district,
      state: state,
      country: country,
      ngoRegNo: selectedRole === 'ngo' ? ngoRegNo : null,
      devStack: selectedRole === 'developer' ? devStack : null,
      adminDept: selectedRole === 'sdg_admin' ? adminDepartment : null,
      isAuthenticated: true
    };

    onAuthSuccess(userPayload);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-xl w-full space-y-6 relative z-10 my-auto py-6">
        
        {/* Header & Go Back Navigation (Feature 8) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => {
              if (isSignup) setIsSignup(false);
              else onGoBack();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Go Back</span>
          </button>

          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            {roleTitles[selectedRole] || 'Portal Access'}
          </span>
        </div>

        {/* Auth Form Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-white">
              {isSignup ? 'Create Your Account' : 'Login to Your Portal'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {isSignup ? 'Register your credentials for secure SDG platform access.' : 'Enter your email, password, and CAPTCHA to continue.'}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Full Name (Signup Only) */}
            {isSignup && (
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name / Primary Contact</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Role-Specific Fields */}
            {isSignup && selectedRole === 'ngo' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">NGO Organization Name</label>
                  <input
                    type="text"
                    required
                    value={ngoOrgName}
                    onChange={(e) => setNgoOrgName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Registration Reg. No.</label>
                  <input
                    type="text"
                    required
                    value={ngoRegNo}
                    onChange={(e) => setNgoRegNo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>
            )}

            {isSignup && selectedRole === 'developer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Developer Org / Collective</label>
                  <input
                    type="text"
                    required
                    value={devOrgName}
                    onChange={(e) => setDevOrgName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Primary Tech Stack</label>
                  <input
                    type="text"
                    required
                    value={devStack}
                    onChange={(e) => setDevStack(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>
            )}

            {isSignup && selectedRole === 'sdg_admin' && (
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Government Agency / NITI Aayog Dept.</label>
                <input
                  type="text"
                  required
                  value={adminDepartment}
                  onChange={(e) => setAdminDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            )}

            {/* Location Fields (Signup Only) */}
            {isSignup && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>
            )}

            {/* Password with Independent Eye Toggle (Feature 5) */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements Validator (Signup Only) */}
            {isSignup && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[10px]">
                <span className="text-slate-400 font-semibold block">Password Security Requirements:</span>
                <div className="grid grid-cols-2 gap-1 font-mono">
                  <span className={pwdValidation.minLength ? 'text-emerald-400' : 'text-slate-500'}>
                    {pwdValidation.minLength ? '✓' : '○'} Min 8 Chars
                  </span>
                  <span className={pwdValidation.uppercase ? 'text-emerald-400' : 'text-slate-500'}>
                    {pwdValidation.uppercase ? '✓' : '○'} Uppercase (A-Z)
                  </span>
                  <span className={pwdValidation.lowercase ? 'text-emerald-400' : 'text-slate-500'}>
                    {pwdValidation.lowercase ? '✓' : '○'} Lowercase (a-z)
                  </span>
                  <span className={pwdValidation.number ? 'text-emerald-400' : 'text-slate-500'}>
                    {pwdValidation.number ? '✓' : '○'} Number (0-9)
                  </span>
                  <span className={pwdValidation.specialChar ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {pwdValidation.specialChar ? '✓' : '○'} Special Symbol (!@#$)
                  </span>
                </div>
              </div>
            )}

            {/* Confirm Password (Signup Only) */}
            {isSignup && (
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* CAPTCHA Widget (Feature 6 - Before Signup & Login) */}
            <CaptchaWidget
              onCaptchaChange={(code) => setCaptchaCode(code)}
              userCaptcha={userCaptcha}
              captchaError={captchaError}
            />

            <div>
              <input
                type="text"
                required
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                placeholder="Enter CAPTCHA code..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 outline-none font-mono tracking-wider"
              />
            </div>

            {/* Terms Checkbox (Signup Only) */}
            {isSignup && (
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-400">
                  I accept the Terms of Service & Privacy Policy for SDG Platform Access.
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm hover:shadow-lg transition-all"
            >
              {isSignup ? 'Create Account' : 'Login to Portal'}
            </button>

          </form>

          {/* Toggle between Signup and Login */}
          <div className="text-center pt-2 border-t border-slate-800">
            {isSignup ? (
              <p className="text-xs text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="font-bold text-emerald-400 hover:underline ml-1"
                >
                  Login Instead
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                First time using SustainAI?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="font-bold text-emerald-400 hover:underline ml-1"
                >
                  Create New Account
                </button>
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
