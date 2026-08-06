import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  Globe, 
  ArrowRight,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import { querySustainAI } from '../services/aiService';

export default function AiAssistantView({ currentUser, initialQuery, apiKey, onCheckEligibility }) {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Default hackathon demonstration prompt
  const HACKATHON_DEMO_PROMPT = "I am a college student from a low-income family. I need financial support for my education and want internship opportunities.";

  useEffect(() => {
    // Initial welcome message + optional auto-trigger from dashboard search
    const initialWelcome = {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Hello ${currentUser?.name || 'Citizen'}! I am SustainAI, your intelligent public service and SDG gateway. Tell me about your background and what support you need today.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([initialWelcome]);

    if (initialQuery && initialQuery.trim().length > 0) {
      handleProcessQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleProcessQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const responseData = await querySustainAI(queryText, currentUser, apiKey);
      
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        data: responseData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProcessQuery(inputQuery);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0 mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-950 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>SustainAI Assistant</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                Active Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400">Understands citizen needs & recommends matching schemes with SDG impact</p>
          </div>
        </div>

        {/* Preset Button for Judges */}
        <button
          onClick={() => handleProcessQuery(HACKATHON_DEMO_PROMPT)}
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-all shadow-lg"
        >
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Run Demo Query →</span>
        </button>
      </div>

      {/* Chat Conversation Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div className={`max-w-3xl rounded-3xl p-5 ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 font-semibold text-xs sm:text-sm rounded-tr-none shadow-lg' 
                : 'glass-panel border border-slate-800 text-slate-200 rounded-tl-none space-y-4'
            }`}>
              
              {/* Message Timestamp */}
              <div className="flex items-center justify-between text-[10px] opacity-75 mb-1">
                <span>{msg.sender === 'user' ? 'You' : 'SustainAI Gateway'}</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Simple Text Content */}
              {msg.text && <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>}

              {/* Structured AI Recommendation Output */}
              {msg.data && (
                <div className="space-y-6">
                  
                  {/* Needs Detected Pill Group */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Target Citizen Need Identified:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.data.detectedNeeds.map((need, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{need}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Summary Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {msg.data.summary}
                  </p>

                  {/* Structured Recommendation Cards */}
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                      <span>Recommended Opportunities & Schemes</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {msg.data.recommendations.map((rec) => (
                        <div 
                          key={rec.id}
                          className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {rec.type}
                            </span>
                            <span className="text-xs font-extrabold text-emerald-400">{rec.matchScore}% Match</span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                            <p className="text-[11px] text-slate-400">{rec.provider}</p>
                            <p className="text-xs text-slate-300 mt-2">{rec.description}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-900">
                            <div>
                              <span className="text-slate-400 font-medium">Eligibility: </span>
                              <span className="text-slate-200">{rec.eligibility}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-medium">Benefits/Skills: </span>
                              <span className="text-emerald-300 font-semibold">{rec.benefits}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <button
                              onClick={() => onCheckEligibility && onCheckEligibility(rec)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center space-x-1"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>{rec.actionButtonText || 'Check Eligibility'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SDG Impact Banner */}
                  {msg.data.sdgImpact && msg.data.sdgImpact.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
                      <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                        <Globe className="h-4 w-4" />
                        <span>SDG Impact Mapping</span>
                      </div>
                      <p className="text-[11px] text-slate-400">By accessing these recommendations, your profile actively supports:</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {msg.data.sdgImpact.map((sdg) => (
                          <div 
                            key={sdg.id}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white border flex items-center space-x-1.5"
                            style={{ backgroundColor: `${sdg.color}20`, borderColor: `${sdg.color}50`, color: sdg.color }}
                          >
                            <span>{sdg.number} - {sdg.shortTitle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

            {msg.sender === 'user' && (
              <div className="h-8 w-8 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {/* Loading skeleton */}
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="h-4 w-4" />
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
              <span>SustainAI is analyzing citizen profile & matching official government databases...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your need in plain language... (e.g., 'I need financial help for college and internship opportunities')"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:shadow-lg disabled:opacity-50 transition-all flex items-center space-x-1"
          >
            <span>Send</span>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
