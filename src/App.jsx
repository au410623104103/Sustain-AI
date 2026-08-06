import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EligibilityModal from './components/EligibilityModal';
import ApiKeyModal from './components/ApiKeyModal';

import LandingView from './views/LandingView';
import AuthView from './views/AuthView';
import ProfileView from './views/ProfileView';
import DashboardView from './views/DashboardView';
import AiAssistantView from './views/AiAssistantView';
import SchemeFinderView from './views/SchemeFinderView';
import EducationJobsView from './views/EducationJobsView';
import HealthcareView from './views/HealthcareView';
import CivicReportingView from './views/CivicReportingView';
import SdgDashboardView from './views/SdgDashboardView';
import NgoPanelView from './views/NgoPanelView';
import DeveloperHubView from './views/DeveloperHubView';
import FoodDonationView from './views/FoodDonationView';
import EducationSponsorsView from './views/EducationSponsorsView';
import DisasterSupportView from './views/DisasterSupportView';
import CleanEnergyView from './views/CleanEnergyView';

import { 
  DEFAULT_DEMO_USER, 
  SAMPLE_NOTIFICATIONS, 
  SAMPLE_RURAL_ISSUES, 
  SAMPLE_DEVELOPER_SOLUTIONS 
} from './data/mockDatabase';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('landing');
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  
  // Theme State: Dark Mode (default true) or Light Mode (false)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Ecosystem Multi-Role State
  const [ruralIssues, setRuralIssues] = useState(SAMPLE_RURAL_ISSUES);
  const [developerSolutions, setDeveloperSolutions] = useState(SAMPLE_DEVELOPER_SOLUTIONS);
  const [ruralDistrict, setRuralDistrict] = useState('Ramanagara Rural District');

  // SDG 7 Clean Energy Requests State (Streams to NGO Panel)
  const [cleanEnergyRequests, setCleanEnergyRequests] = useState([
    {
      id: 'SOLAR-REQ-101',
      schemeName: 'PM Surya Ghar: Subsidized Rooftop Solar',
      applicantName: 'Ramesh Patel',
      applicantPhone: '+91 98450 66778',
      district: 'Ramanagara Rural District',
      village: 'Ramanagara Village Ward 4',
      solarCapacity: '3.0 kW Rooftop Solar',
      subsidyGrant: '₹78,000',
      status: 'Awaiting NGO Field Site Inspection',
      submittedDate: '2026-08-05'
    }
  ]);

  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);
  
  const [initialAiQuery, setInitialAiQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handlers
  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj || DEFAULT_DEMO_USER);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('landing');
  };

  const handleSaveProfile = (updatedProfile) => {
    setCurrentUser(prev => ({ ...prev, ...updatedProfile }));
  };

  const handleDashboardSearchSubmit = (queryText) => {
    setInitialAiQuery(queryText);
    setActiveView('ai-assistant');
  };

  const handleOpenEligibilityModal = (scheme) => {
    setSelectedSchemeForModal(scheme);
  };

  // Stream Clean Energy Grant Request to NGO Queue
  const handleApplyCleanEnergy = (newReq) => {
    setCleanEnergyRequests(prev => [newReq, ...prev]);

    // Send notification to NGO panel
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '☀️ New Solar Subsidy Application Streamed',
      message: `${newReq.applicantName} applied for ${newReq.solarCapacity} grant in ${newReq.village}. NGO field site inspection required.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'ngo-panel'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Add rural issue (from NGO upload or Citizen Civic Report)
  const handleAddRuralIssue = (newIssue) => {
    setRuralIssues(prev => [newIssue, ...prev]);

    // Send notification to NGO dashboard
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '📩 New Citizen Grievance Posted',
      message: `${newIssue.title} in ${newIssue.village} routed to NGO Operations Dashboard for clearance.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'ngo-panel'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleApplySuccess = (scheme) => {
    setSelectedSchemeForModal(null);
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: '🎉 Application Connected!',
      message: `Your profile was submitted for ${scheme.name || scheme.title}. Status updates will be sent to your village field dashboard.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'schemes'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'dark-theme bg-slate-950 text-slate-100' : 'light-theme bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navigation Bar with Role Switcher & Theme Toggle */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar (Only visible when logged in) */}
        {currentUser && (
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            currentUser={currentUser}
            onLogout={handleLogout}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        )}

        {/* Dynamic Page Views Container */}
        <main className="flex-1 overflow-x-hidden">
          {activeView === 'landing' && (
            <LandingView
              onGetStarted={() => {
                if (currentUser) setActiveView('dashboard');
                else setActiveView('auth');
              }}
              onExploreServices={() => {
                if (currentUser) setActiveView('schemes');
                else setActiveView('auth');
              }}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'auth' && (
            <AuthView onLoginSuccess={handleLoginSuccess} />
          )}

          {activeView === 'profile' && (
            <ProfileView
              currentUser={currentUser}
              onSaveProfile={handleSaveProfile}
              onContinue={() => setActiveView('dashboard')}
            />
          )}

          {activeView === 'dashboard' && (
            <DashboardView
              currentUser={currentUser}
              setActiveView={setActiveView}
              onSearchSubmit={handleDashboardSearchSubmit}
              onCheckEligibility={handleOpenEligibilityModal}
              ruralDistrict={ruralDistrict}
              setRuralDistrict={setRuralDistrict}
            />
          )}

          {activeView === 'clean-energy' && (
            <CleanEnergyView
              currentUser={currentUser}
              onApplyCleanEnergy={handleApplyCleanEnergy}
            />
          )}

          {activeView === 'disaster-support' && (
            <DisasterSupportView
              currentUser={currentUser}
            />
          )}

          {activeView === 'food-donation' && (
            <FoodDonationView
              currentUser={currentUser}
            />
          )}

          {activeView === 'education-sponsors' && (
            <EducationSponsorsView
              currentUser={currentUser}
              onCheckEligibility={handleOpenEligibilityModal}
            />
          )}

          {activeView === 'ngo-panel' && (
            <NgoPanelView
              ruralIssues={ruralIssues}
              setRuralIssues={setRuralIssues}
              developerSolutions={developerSolutions}
              cleanEnergyRequests={cleanEnergyRequests}
              setCleanEnergyRequests={setCleanEnergyRequests}
            />
          )}

          {activeView === 'developer-hub' && (
            <DeveloperHubView
              ruralIssues={ruralIssues}
              developerSolutions={developerSolutions}
              setDeveloperSolutions={setDeveloperSolutions}
            />
          )}

          {activeView === 'ai-assistant' && (
            <AiAssistantView
              currentUser={currentUser}
              initialQuery={initialAiQuery}
              apiKey={apiKey}
              onCheckEligibility={handleOpenEligibilityModal}
            />
          )}

          {activeView === 'schemes' && (
            <SchemeFinderView
              citizenProfile={currentUser}
              onCheckEligibility={handleOpenEligibilityModal}
            />
          )}

          {activeView === 'education-jobs' && (
            <EducationJobsView
              onCheckEligibility={handleOpenEligibilityModal}
            />
          )}

          {activeView === 'healthcare' && (
            <HealthcareView />
          )}

          {activeView === 'civic-reporting' && (
            <CivicReportingView
              currentUser={currentUser}
              onAddRuralIssue={handleAddRuralIssue}
            />
          )}

          {activeView === 'sdg-impact' && (
            <SdgDashboardView
              currentUser={currentUser}
              onCheckEligibility={handleOpenEligibilityModal}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <EligibilityModal
        scheme={selectedSchemeForModal}
        citizenProfile={currentUser || DEFAULT_DEMO_USER}
        onClose={() => setSelectedSchemeForModal(null)}
        onApplySuccess={handleApplySuccess}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* Global Footer */}
      <footer className="glass-panel border-t border-slate-200 dark:border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500">
        <p>SustainAI – Multi-Role Citizen, Rural NGO & Developer Platform | Supporting UN Sustainable Development Goals (SDGs 1–17)</p>
      </footer>

    </div>
  );
}
