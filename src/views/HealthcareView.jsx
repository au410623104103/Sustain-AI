import React, { useState } from 'react';
import { 
  Activity, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Stethoscope, 
  Ambulance, 
  Calendar, 
  CheckCircle2, 
  Heart,
  Award,
  Users,
  Search
} from 'lucide-react';
import { SAMPLE_HEALTHCARE_SERVICES, SAMPLE_MEDICAL_CAMPS } from '../data/mockDatabase';
import { TRANSLATIONS } from '../data/translations';

export default function HealthcareView({ currentLanguage }) {
  const [camps, setCamps] = useState(SAMPLE_MEDICAL_CAMPS);
  const [bookedCampTicket, setBookedCampTicket] = useState(null);
  const [patientName, setPatientName] = useState('Arun Kumar');
  const [patientPhone, setPatientPhone] = useState('+91 98450 11223');
  const [activeTab, setActiveTab] = useState('camps'); // 'camps' or 'clinics'

  const t = TRANSLATIONS[currentLanguage || 'English'] || TRANSLATIONS.English;

  const handleBookSlot = (camp) => {
    setBookedCampTicket(camp);
    // Decrease available slots
    setCamps(camps.map(c => c.id === camp.id ? { ...c, availableSlots: c.availableSlots - 1 } : c));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Activity className="h-4 w-4" />
            <span>{t.healthTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t.healthTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
            {t.healthSub}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('camps')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'camps' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>{t.medicalCampsTitle}</span>
          </button>

          <button
            onClick={() => setActiveTab('clinics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'clinics' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            <span>24/7 Clinics & OPD</span>
          </button>
        </div>
      </div>

      {/* Emergency Ambulance SOS Banner (Always White Text on Dark Red Banner) */}
      <div className="p-6 rounded-3xl bg-red-950 text-white-force border-2 border-red-500/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-red-900/50 animate-pulse shrink-0">
            <Ambulance className="h-8 w-8 text-white text-white-force" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-200 text-white-force">{t.emergencyHelplineTag}</span>
            <h3 className="text-xl sm:text-2xl font-black text-white text-white-force mt-0.5">{t.emergencyTitle}</h3>
            <p className="text-xs text-red-100 text-white-force mt-0.5 font-medium">{t.emergencySub}</p>
          </div>
        </div>

        <a 
          href="tel:108"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-white-force font-black text-sm shadow-xl transition-all text-center flex items-center justify-center space-x-2 shrink-0"
        >
          <Phone className="h-4 w-4 text-white text-white-force" />
          <span className="text-white text-white-force">{t.callEmergencyNowBtn}</span>
        </a>
      </div>

      {/* BOOKING CONFIRMATION MODAL */}
      {bookedCampTicket && (
        <div className="p-6 rounded-3xl bg-emerald-950 text-white-force border-2 border-emerald-500 text-white space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-white-force">
            <div className="flex items-center space-x-3 text-white-force">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl text-white-force">
                ✓
              </div>
              <div className="text-white-force">
                <h3 className="text-base font-bold text-white text-white-force">Medical Camp Free Appointment Booked!</h3>
                <p className="text-xs text-emerald-300 text-white-force">Registration Ticket Confirmed for <strong className="text-white text-white-force">{bookedCampTicket.title}</strong></p>
              </div>
            </div>

            <button onClick={() => setBookedCampTicket(null)} className="text-xs text-slate-300 hover:text-white">
              Dismiss
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white-force">
            <div>
              <span className="text-slate-400 block text-white-force">Date & Time:</span>
              <span className="font-semibold text-emerald-400 text-white-force">{bookedCampTicket.date} ({bookedCampTicket.time})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-white-force">Venue Address:</span>
              <span className="font-semibold text-slate-200 text-white-force">{bookedCampTicket.venue}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-white-force">Patient Registered:</span>
              <span className="font-semibold text-slate-200 text-white-force">{patientName} ({patientPhone})</span>
            </div>
          </div>
        </div>
      )}

      {/* RURAL MEDICAL CAMPS TAB */}
      {activeTab === 'camps' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold flex items-center space-x-2 text-slate-900 dark:text-white">
              <Calendar className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <span>{t.upcomingCampsTitle}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => (
              <div key={camp.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {camp.ruralDistrict}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{camp.availableSlots} {t.slotsAvailable}</span>
                  </div>

                  <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-white">{camp.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Organizer: <strong className="text-slate-900 dark:text-slate-200">{camp.organizer}</strong></p>

                  <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{camp.date} ({camp.time})</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>{camp.venue}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-900">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold mb-1">{t.specialtiesDiagnostics}</span>
                      <div className="flex flex-wrap gap-1">
                        {camp.specialties.map((spec, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{camp.doctorsCount}</span>

                  <button
                    onClick={() => handleBookSlot(camp)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-xs hover:shadow-lg transition-all"
                  >
                    {t.bookAppointmentBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLINICS & TELEMEDICINE TAB */}
      {activeTab === 'clinics' && (
        <div className="space-y-6">
          <h2 className="text-base font-bold flex items-center space-x-2 text-slate-900 dark:text-white">
            <Stethoscope className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            <span>Public Health Centers (PHC) & Tele-Consultation</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_HEALTHCARE_SERVICES.map((srv) => (
              <div key={srv.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    100% Free Public Care
                  </span>
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 font-mono">⭐ {srv.rating}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-white">{srv.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{srv.type} • {srv.distance}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3 font-medium">{srv.address}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Services Available:</span>
                  {srv.services.map((s, idx) => (
                    <div key={idx} className="flex items-center space-x-1 text-slate-800 dark:text-slate-200 text-[11px] font-medium">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{srv.timings}</span>
                  <a href={`tel:${srv.contact}`} className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
                    Call {srv.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
