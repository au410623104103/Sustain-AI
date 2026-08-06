import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  Compass, 
  Wind, 
  Droplets, 
  Building2, 
  Bus, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Navigation, 
  Layers, 
  DollarSign, 
  Users, 
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Zap,
  CloudRain,
  Sun,
  Globe,
  Map,
  Radio,
  FileText
} from 'lucide-react';
import { SAMPLE_DISASTER_ZONES, SAMPLE_DOS_AND_DONTS } from '../data/mockDatabase';

export default function DisasterSupportView({ currentUser }) {
  const [activeTab, setActiveTab] = useState('citizen'); // 'report', 'citizen', or 'ngo'
  const [selectedZone, setSelectedZone] = useState(SAMPLE_DISASTER_ZONES[0]);
  const [activeProtocol, setActiveProtocol] = useState(0); // 0 for Floods, 1 for Heatwave
  const [disasterFilter, setDisasterFilter] = useState('all'); // 'all', 'ongoing', 'upcoming', 'past'

  // View Mode: 'rain-radar' (Authentic Windy Live Radar) or 'google-maps' (Google Map Satellite/Roadmap)
  const [viewMode, setViewMode] = useState('rain-radar');

  // Google Map Type: 'k' (Satellite), 'm' (Roadmap), 'h' (Hybrid), 'p' (Terrain)
  const [googleMapType, setGoogleMapType] = useState('k');

  // NGO Fund Request Modal State
  const [showFundModal, setShowFundModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState('₹2,50,000');
  const [requestReason, setRequestReason] = useState('Emergency drinking water purification kits & medical tents');
  const [fundSuccess, setFundSuccess] = useState(false);

  const handleFundSubmit = (e) => {
    e.preventDefault();
    setFundSuccess(true);
    setTimeout(() => {
      setFundSuccess(false);
      setShowFundModal(false);
    }, 1500);
  };

  // District Coordinates Mappings for Authentic Live Radar & Google Maps
  const districtCoordinates = {
    'Ramanagara Rural District': { lat: 12.72, lng: 77.28 },
    'Mandya Rural District': { lat: 12.52, lng: 76.90 },
    'Tumakuru North District': { lat: 13.34, lng: 77.10 }
  };

  const coords = districtCoordinates[selectedZone.district] || { lat: 12.72, lng: 77.28 };

  // Authentic Windy Live Weather Radar Embed URL
  const windyRadarEmbedUrl = `https://embed.windy.com/embed2.html?lat=${coords.lat}&lon=${coords.lng}&detailLat=${coords.lat}&detailLon=${coords.lng}&width=650&height=450&zoom=9&level=surface&overlay=radar&product=radar&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;

  // Real Google Maps Embed URL
  const googleMapsIframeUrl = `https://maps.google.com/maps?q=${encodeURIComponent(selectedZone.district + ', Karnataka, India')}&t=${googleMapType}&z=12&ie=UTF8&iwloc=&output=embed`;

  // Weather Symptoms for selected location
  const weatherSymptoms = {
    'Ramanagara Rural District': {
      temp: '27°C',
      rainfall: '48 mm/h (Heavy Downpour)',
      rainProb: '96%',
      wind: '42 km/h SW (Gusty)',
      humidity: '92%',
      aqi: '38 (Good)',
      pressure: '1006 hPa',
      symptomDesc: 'Severe thunderstorm clouds with heavy precipitation and river overflow risk near Ramanagara Reservoir.'
    },
    'Mandya Rural District': {
      temp: '41°C',
      rainfall: '0 mm/h (Clear Dry Sky)',
      rainProb: '5%',
      wind: '18 km/h NW',
      humidity: '24%',
      aqi: '112 (Moderate)',
      pressure: '1012 hPa',
      symptomDesc: 'Extreme heatwave & dry solar radiation with agricultural moisture deficit across Pandavapura hamlets.'
    },
    'Tumakuru North District': {
      temp: '24°C',
      rainfall: '14 mm/h (Moderate Rain)',
      rainProb: '75%',
      wind: '26 km/h W',
      humidity: '84%',
      aqi: '42 (Good)',
      pressure: '1009 hPa',
      symptomDesc: 'Continuous monsoon rainfall with soil saturation on Gubbi hill slopes.'
    }
  };

  const currentWeather = weatherSymptoms[selectedZone.district] || weatherSymptoms['Ramanagara Rural District'];

  // Categorized Disasters Data for Intelligence Report Section
  const disasterReports = [
    {
      id: 'DIS-01',
      title: 'Ramanagara Flash Floods & River Arkavathi Breach',
      district: 'Ramanagara Rural District',
      status: 'Ongoing',
      severity: 'Red Alert',
      lossPercent: 65,
      cropDamage: '₹4.2 Crores (Rice & Mulberry)',
      affectedCitizens: 1240,
      evacuatedCount: 890,
      satelliteSummary: 'Satellite Doppler Radar shows 48 mm/h rainfall over Kanakapura basin. Water level +2.4m above danger mark.',
      recommendedDivert: 'NH-275 Highway Blocked. Divert to State Highway 17 elevated bypass.',
      shelter: 'Ramanagara District Higher Secondary Relief Camp',
      date: 'Aug 5, 2026 - Active'
    },
    {
      id: 'DIS-02',
      title: 'Mandya Agricultural Heatwave & Drought Stress',
      district: 'Mandya Rural District',
      status: 'Upcoming',
      severity: 'Amber Watch',
      lossPercent: 40,
      cropDamage: '₹2.8 Crores (Sugarcane moisture deficit)',
      affectedCitizens: 3400,
      evacuatedCount: 0,
      satelliteSummary: 'Infrared Thermal Satellite predicts +3.8°C temp spike next 48h with 5% soil moisture.',
      recommendedDivert: 'Hydration kiosks active on Pandavapura Highway. Carry thermal sun protection.',
      shelter: 'Pandavapura Primary Community Cooling Center',
      date: 'Forecast: Aug 7 - Aug 12, 2026'
    },
    {
      id: 'DIS-03',
      title: 'Gubbi Hillside Slope Landslide & Slope Clearance',
      district: 'Tumakuru North District',
      status: 'Past',
      severity: 'Resolved Archive',
      lossPercent: 25,
      cropDamage: '₹85 Lakhs (Coffee & Spice plantations)',
      affectedCitizens: 420,
      evacuatedCount: 420,
      satelliteSummary: 'Geospatial Radar confirms slope stabilization. Debris cleared by NDMA teams.',
      recommendedDivert: 'Gubbi Pass Highway reopened for light vehicles with 30 km/h speed limit.',
      shelter: 'Tumakuru Municipal Indoor Stadium (Cleared)',
      date: 'Jul 28 - Aug 2, 2026 (Resolved)'
    }
  ];

  const filteredDisasters = disasterFilter === 'all' 
    ? disasterReports 
    : disasterReports.filter(d => d.status.toLowerCase() === disasterFilter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* RED ALERT EMERGENCY BROADCAST TICKER (ALWAYS WHITE TEXT) */}
      <div className="p-4 rounded-2xl bg-red-950 text-white-force border-2 border-red-500 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black animate-pulse shadow-md">
            🚨
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-200 text-white-force">LIVE EMERGENCY BROADCAST</span>
            <h3 className="text-xs sm:text-sm font-black text-white text-white-force">RED ALERT: Flash Flood Warning in Ramanagara Low-Lying Wards</h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-red-100 text-white-force">
          <span>Evacuation Bus Shuttles Active • Dial 108 for Emergency Dispatch</span>
        </div>
      </div>

      {/* Header & 3 Navigation Perspective Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span>UN SDG 11 & SDG 13 Climate Resilience Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Disaster, Climate Weather Map & Migration Hub</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
            Authentic live Doppler rain radar weather maps, real Google Maps satellite layers, tourist safe routes, and NGO disaster loss analytics.
          </p>
        </div>

        {/* 3 Tab Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'report' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>📑 Disaster Intelligence Report</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'citizen' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>🏡 Citizen & Tourist Safety</span>
          </button>

          <button
            onClick={() => setActiveTab('ngo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'ngo' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>🤝 NGO Operations & Loss %</span>
          </button>
        </div>
      </div>

      {/* DISASTER & CLIMATE INTELLIGENCE REPORT SECTION (NEW!) */}
      {activeTab === 'report' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <FileText className="h-5 w-5 text-amber-500" />
                <span>Real-Time Disaster & Satellite Intelligence Reports</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">Live Satellite Radar briefings categorized by ongoing, upcoming forecasts, and resolved past disasters.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setDisasterFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold ${disasterFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-600 dark:text-slate-400'}`}
              >
                All Reports
              </button>
              <button
                onClick={() => setDisasterFilter('ongoing')}
                className={`px-3 py-1 rounded-lg font-bold ${disasterFilter === 'ongoing' ? 'bg-red-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                🔴 Ongoing (Active)
              </button>
              <button
                onClick={() => setDisasterFilter('upcoming')}
                className={`px-3 py-1 rounded-lg font-bold ${disasterFilter === 'upcoming' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                ⚠️ Upcoming (Forecast)
              </button>
              <button
                onClick={() => setDisasterFilter('past')}
                className={`px-3 py-1 rounded-lg font-bold ${disasterFilter === 'past' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                📜 Past (Resolved)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredDisasters.map((report) => (
              <div key={report.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      report.status === 'Ongoing' ? 'bg-red-600 text-white animate-pulse' : report.status === 'Upcoming' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                    }`}>
                      {report.status} • {report.severity}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{report.date}</span>
                  </div>

                  <span className="text-xs font-extrabold text-red-600 dark:text-red-400">
                    Est. Loss: {report.lossPercent}% ({report.cropDamage})
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">{report.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{report.district}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block text-[10px]">Satellite Radar Analysis:</span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{report.satelliteSummary}</p>
                  
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-amber-700 dark:text-amber-400 font-bold">
                    <span>Tourist & Traveler Advisory: </span>
                    <span>{report.recommendedDivert}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Affected Citizens</span>
                    <strong className="text-amber-700 dark:text-amber-300 font-bold">{report.affectedCitizens} People</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Evacuated / Safe</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{report.evacuatedCount} Evacuated</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Relief Shelter Haven</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{report.shelter}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUTHENTIC LIVE RAIN RADAR & GOOGLE MAPS ENGINE CANVAS */}
      <div className="glass-panel p-6 rounded-3xl border-2 border-emerald-500/40 space-y-6">
        
        {/* Map Header & Engine Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          
          {/* View Mode Switcher: Authentic Live Rain Radar vs Real Google Maps */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('rain-radar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                viewMode === 'rain-radar'
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white border-blue-400 shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Radio className="h-4 w-4 text-emerald-300 animate-pulse" />
              <span>Authentic Live Rain Radar Map</span>
            </button>

            <button
              onClick={() => setViewMode('google-maps')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                viewMode === 'google-maps'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Map className="h-4 w-4" />
              <span>Real Google Maps View</span>
            </button>
          </div>

          {/* District Pins Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-bold shrink-0">Focus District:</span>
            {SAMPLE_DISASTER_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedZone.id === zone.id
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {zone.district.split(' ')[0]} ({zone.lossPercentage}%)
              </button>
            ))}
          </div>

          {/* Google Maps Sub-Layers (when in google-maps mode) */}
          {viewMode === 'google-maps' && (
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setGoogleMapType('k')}
                className={`px-2.5 py-1 rounded-lg font-bold ${googleMapType === 'k' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Satellite
              </button>
              <button
                onClick={() => setGoogleMapType('m')}
                className={`px-2.5 py-1 rounded-lg font-bold ${googleMapType === 'm' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setGoogleMapType('h')}
                className={`px-2.5 py-1 rounded-lg font-bold ${googleMapType === 'h' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Hybrid
              </button>
              <button
                onClick={() => setGoogleMapType('p')}
                className={`px-2.5 py-1 rounded-lg font-bold ${googleMapType === 'p' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Terrain
              </button>
            </div>
          )}
        </div>

        {/* MAP & RADAR EMBEDDED ENGINE VIEWPORT */}
        <div className="relative h-96 sm:h-[520px] w-full rounded-2xl border-2 border-emerald-500/30 overflow-hidden shadow-2xl bg-slate-950">
          
          {viewMode === 'rain-radar' ? (
            /* AUTHENTIC LIVE WINDY DOPPLER RAIN RADAR IFRAME */
            <iframe
              title={`Authentic Live Rain Radar for ${selectedZone.district}`}
              src={windyRadarEmbedUrl}
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            ></iframe>
          ) : (
            /* REAL GOOGLE MAPS IFRAME VIEWPORT */
            <iframe
              title={`Google Map View for ${selectedZone.district}`}
              src={googleMapsIframeUrl}
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            ></iframe>
          )}

          {/* Active Status Badge */}
          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-white text-xs font-bold flex items-center space-x-2 z-10 shadow-lg">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>
              {viewMode === 'rain-radar' ? '🔴 Live Doppler Rain Radar Active: ' : '📍 Real Google Maps Active: '}
              <strong className="text-emerald-400">{selectedZone.district}</strong>
            </span>
          </div>

        </div>

        {/* REAL-TIME WEATHER REPORT & SYMPTOMS HUD (CLEAN ADAPTIVE LIGHT/DARK CONTAINERS) */}
        <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <CloudRain className="h-4 w-4" />
              <span>Real-Time Live Weather Symptoms Report for {selectedZone.district}</span>
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Doppler Weather Station #402</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Temperature</span>
              <strong className="text-base font-extrabold">{currentWeather.temp}</strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Rainfall Symptoms</span>
              <strong className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{currentWeather.rainfall}</strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Rain Probability</span>
              <strong className="text-base font-extrabold text-teal-600 dark:text-cyan-400">{currentWeather.rainProb}</strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Wind Speed</span>
              <strong className="text-base font-extrabold text-emerald-700 dark:text-teal-400">{currentWeather.wind}</strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Air Quality (AQI)</span>
              <strong className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{currentWeather.aqi}</strong>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-semibold">Humidity</span>
              <strong className="text-base font-extrabold text-purple-700 dark:text-purple-300">{currentWeather.humidity}</strong>
            </div>
          </div>

          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 italic pt-1 border-t border-slate-200 dark:border-slate-900">
            "{currentWeather.symptomDesc}"
          </p>
        </div>

      </div>

      {/* CITIZEN & TOURIST SAFETY VIEW */}
      {activeTab === 'citizen' && (
        <div className="space-y-8">
          
          {/* TOURIST SAFE ROUTE & MIGRATION ADVISORY CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tourist Safe Route Alert Card */}
            <div className="glass-panel p-6 rounded-3xl border-2 border-emerald-500/40 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Navigation className="h-5 w-5" />
                <span>🧭 Tourist & Traveler Safe Route Alert</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="text-amber-700 dark:text-amber-400 font-bold block text-[11px]">TRAVEL WARNING & ROUTE DIVERT:</span>
                <p className="text-slate-900 dark:text-slate-200 font-semibold">{selectedZone.touristWarning}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-slate-600 dark:text-slate-400">
                  <span>Designated Safe Tourist Haven: </span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">{selectedZone.safeShelter}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Google Maps & Live Radar Safe Navigation Active</span>
              </div>
            </div>

            {/* Citizen Evacuation & Migration Step Guide */}
            <div className="glass-panel p-6 rounded-3xl border-2 border-blue-500/40 space-y-4">
              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
                <Bus className="h-5 w-5" />
                <span>🚌 Citizen Evacuation & Migration Guide</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold">Active Migration Status:</span>
                <p className="text-emerald-700 dark:text-emerald-300 font-extrabold">{selectedZone.migrationStatus}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300">
                  <span>Designated Relief Camp: </span>
                  <strong className="block mt-0.5 font-bold">{selectedZone.safeShelter}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-slate-500 dark:text-slate-400 block text-[9px] font-semibold">Citizens Evacuated:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedZone.evacuatedCitizens} / {selectedZone.affectedCitizens}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-slate-500 dark:text-slate-400 block text-[9px] font-semibold">Emergency Shuttles:</span>
                  <strong className="text-blue-700 dark:text-blue-400 font-bold">8 Free Buses Active</strong>
                </div>
              </div>
            </div>

          </div>

          {/* INTERACTIVE DO'S AND DONTS CHECKLIST PROTOCOLS */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Official Emergency Do's & Don'ts Protocols</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Essential survival rules verified by National Disaster Management Authority (NDMA).</p>
              </div>

              {/* Protocol selector pills */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveProtocol(0)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeProtocol === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400'}`}
                >
                  Flash Floods
                </button>
                <button
                  onClick={() => setActiveProtocol(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeProtocol === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400'}`}
                >
                  Extreme Heatwave
                </button>
              </div>
            </div>

            {/* Protocol Do's & Don'ts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* DO'S */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 space-y-3">
                <h3 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>ALWAYS DO THESE PROTOCOLS:</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  {SAMPLE_DOS_AND_DONTS[activeProtocol].dos.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span className="font-medium">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DON'TS */}
              <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 space-y-3">
                <h3 className="text-xs font-extrabold text-red-800 dark:text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <XCircle className="h-4 w-4" />
                  <span>NEVER DO THESE HAZARDS:</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  {SAMPLE_DOS_AND_DONTS[activeProtocol].donts.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-red-600 dark:text-red-400 font-bold">✕</span>
                      <span className="font-medium">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* NGO OPERATIONS & DISASTER CONTROL VIEW */}
      {activeTab === 'ngo' && (
        <div className="space-y-8">
          
          {/* NGO DISASTER METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Affected District</span>
              <p className="text-sm font-extrabold">{selectedZone.district}</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Estimated Loss %</span>
              <p className="text-xl font-extrabold text-red-600 dark:text-red-400">{selectedZone.lossPercentage}% Loss</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Affected Population</span>
              <p className="text-xl font-extrabold text-amber-700 dark:text-amber-300">{selectedZone.affectedCitizens} People</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Relief Funding Status</span>
              <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">{selectedZone.allocatedFunding}</p>
            </div>
          </div>

          {/* RELIEF FUNDING & MIGRATION MANAGEMENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Funding Allocation & Supplies Progress Bar */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Relief Funding Allocation for Affected Area</span>
                </h3>

                <button
                  onClick={() => setShowFundModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
                >
                  Request Emergency Relief Grant
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Total Funding Required:</span>
                  <strong className="font-bold">{selectedZone.requiredFunding}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Allocated & Dispatched:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedZone.allocatedFunding}</strong>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 shadow-sm">
                <span className="text-slate-600 dark:text-slate-400 font-semibold block text-[11px]">Dispatched Relief Supplies:</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium">✓ 850 Drinking Water Packets • 400 Ration Kits • 2 Mobile Diagnostic Vans</p>
              </div>
            </div>

            {/* Evacuation & Migration Process Control Center */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>People Evacuation & Migration Management</span>
              </h3>

              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Evacuated to Relief Camps:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedZone.evacuatedCitizens} Citizens (72% Evacuated)</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Primary Relief Camp:</span>
                  <strong className="text-slate-900 dark:text-slate-200 text-right font-bold">{selectedZone.safeShelter}</strong>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-slate-800 dark:text-slate-300 font-medium">
                  <span>Transport Fleet: </span>
                  <strong className="text-blue-700 dark:text-blue-400 font-bold">8 Dedicated Government & NGO Evacuation Buses Active</strong>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* REQUEST EMERGENCY FUND MODAL */}
      {showFundModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700 bg-slate-900 p-6 space-y-4 text-white-force">
            <button onClick={() => setShowFundModal(false)} className="absolute top-4 right-4 text-slate-400">✕</button>

            <h3 className="text-base font-bold text-white text-white-force">Request Emergency Relief Funding</h3>
            <p className="text-xs text-slate-400 text-white-force">Request funds from Government Disaster Relief Board for {selectedZone.district}</p>

            {fundSuccess ? (
              <div className="p-4 text-center text-xs text-emerald-400 font-bold space-y-2 text-white-force">
                <CheckCircle2 className="h-8 w-8 mx-auto" />
                <p>Emergency Relief Grant Request Submitted to NDMA Board!</p>
              </div>
            ) : (
              <form onSubmit={handleFundSubmit} className="space-y-3 text-xs text-white-force">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1 text-white-force">Required Grant Amount</label>
                  <input
                    type="text"
                    required
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1 text-white-force">Justification & Supply Requirement</label>
                  <textarea
                    rows={3}
                    required
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-white-force"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button type="button" onClick={() => setShowFundModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-bold rounded-xl">
                    Submit Fund Request
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
