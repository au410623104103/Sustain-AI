import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EligibilityModal from './components/EligibilityModal';
import ApiKeyModal from './components/ApiKeyModal';

// Multi-Portal Onboarding & Authentication Engine
import SplashScreen from './components/auth/SplashScreen';
import WelcomeScreen from './components/auth/WelcomeScreen';
import RoleSelectionScreen from './components/auth/RoleSelectionScreen';
import AuthScreen from './components/auth/AuthScreen';

// Core Dashboard & Portal Views
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

import { storageService } from './services/storageService';
import { realtimeService, REALTIME_EVENTS } from './services/realtimeService';
import { apiService } from './services/apiService';
import { DEFAULT_DEMO_USER } from './data/mockDatabase';

export default function App() {
  // Initialize storage seeds if empty
  storageService.init();

  // Onboarding Stage Control: 'splash' -> 'welcome' -> 'role-selection' -> 'auth' -> 'app'
  const [onboardingStage, setOnboardingStage] = useState(() => {
    const user = storageService.getCurrentUser();
    return user ? 'app' : 'splash';
  });

  const [selectedRole, setSelectedRole] = useState('citizen');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Persistent React State from storageService
  const [currentUser, setCurrentUser] = useState(() => storageService.getCurrentUser());
  const [activeView, setActiveView] = useState(() => {
    const user = storageService.getCurrentUser();
    if (!user) return 'dashboard';
    if (user.role === 'ngo') return 'ngo-panel';
    if (user.role === 'developer') return 'developer-hub';
    if (user.role === 'sdg_admin') return 'sdg-impact';
    return 'dashboard';
  });

  const [notifications, setNotifications] = useState(() => storageService.getNotifications());
  
  // Theme & Language Persistence
  const [isDarkMode, setIsDarkMode] = useState(() => storageService.getDarkMode());
  const [currentLanguage, setCurrentLanguage] = useState(() => storageService.getLanguage());

  // Ecosystem Data Persistence
  const [ruralIssues, setRuralIssues] = useState(() => storageService.getRuralIssues());
  const [developerSolutions, setDeveloperSolutions] = useState(() => storageService.getDeveloperSolutions());
  const [cleanEnergyRequests, setCleanEnergyRequests] = useState(() => storageService.getCleanEnergyRequests());
  const [ruralDistrict, setRuralDistrict] = useState(() => storageService.getRuralDistrict());

  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);
  const [initialAiQuery, setInitialAiQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync dark theme class to root html element & storage
  useEffect(() => {
    storageService.setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    storageService.setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    storageService.setRuralDistrict(ruralDistrict);
  }, [ruralDistrict]);

  // Real-Time Cross-Tab Live Event Subscriber
  useEffect(() => {
    const unsubscribe = realtimeService.subscribe((event) => {
      console.log('[App RealTime Sync] Event Received:', event);
      setRuralIssues(storageService.getRuralIssues());
      setDeveloperSolutions(storageService.getDeveloperSolutions());
      setCleanEnergyRequests(storageService.getCleanEnergyRequests());
      setNotifications(storageService.getNotifications());
    });

    return () => unsubscribe();
  }, []);

  // Multi-Portal Role Auth Success Handler
  const handleAuthSuccess = (userPayload) => {
    const fullUser = {
      ...DEFAULT_DEMO_USER,
      ...userPayload,
      role: selectedRole,
      isAuthenticated: true
    };

    setCurrentUser(fullUser);
    storageService.setCurrentUser(fullUser);

    // Route to Role-Specific Dashboard
    if (selectedRole === 'ngo') setActiveView('ngo-panel');
    else if (selectedRole === 'developer') setActiveView('developer-hub');
    else if (selectedRole === 'sdg_admin') setActiveView('sdg-impact');
    else setActiveView('dashboard');

    setOnboardingStage('app');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storageService.setCurrentUser(null);
    setOnboardingStage('role-selection');
  };

  const handleSaveProfile = (updatedProfile) => {
    setCurrentUser(prev => {
      const merged = { ...prev, ...updatedProfile };
      storageService.setCurrentUser(merged);
      return merged;
    });
  };

  const handleDashboardSearchSubmit = (queryText) => {
    setInitialAiQuery(queryText);
    setActiveView('ai-assistant');
  };

  const handleOpenEligibilityModal = (scheme) => {
    setSelectedSchemeForModal(scheme);
  };

  const handleApplyCleanEnergy = async (newReq) => {
    const res = await apiService.applySolarGrant(newReq);
    setCleanEnergyRequests(res.data);
    setNotifications(storageService.getNotifications());
  };

  const handleAddRuralIssue = async (newIssue) => {
    const res = await apiService.createRuralIssue(newIssue);
    setRuralIssues(res.data);
    setNotifications(storageService.getNotifications());
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
    const updated = storageService.addNotification(newNotif);
    setNotifications(updated);
  };

  const handleResetDatabase = () => {
    if (window.confirm('Reset persistent database to fresh seed data?')) {
      storageService.resetToSeeds();
      setRuralIssues(storageService.getRuralIssues());
      setDeveloperSolutions(storageService.getDeveloperSolutions());
      setCleanEnergyRequests(storageService.getCleanEnergyRequests());
      setNotifications(storageService.getNotifications());
      realtimeService.broadcast(REALTIME_EVENTS.DATABASE_RESET);
    }
  };

  // MULTI-PORTAL ONBOARDING FLOW RENDERERS
  if (onboardingStage === 'splash') {
    return <SplashScreen onFinish={() => setOnboardingStage('welcome')} />;
  }

  if (onboardingStage === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setOnboardingStage('role-selection')} />;
  }

  if (onboardingStage === 'role-selection') {
    return (
      <RoleSelectionScreen
        onSelectRole={(role) => {
          setSelectedRole(role);
          setAuthMode('login');
          setOnboardingStage('auth');
        }}
        onGoBack={() => setOnboardingStage('welcome')}
      />
    );
  }

  if (onboardingStage === 'auth') {
    return (
      <AuthScreen
        selectedRole={selectedRole}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
        onGoBack={() => setOnboardingStage('role-selection')}
      />
    );
  }

  // AUTHENTICATED ROLE DASHBOARD APP SYSTEM
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'dark dark-theme bg-slate-950 text-slate-100' : 'light-theme bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navigation Bar with Active Role Badge & Logout Button */}
      <Navbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        notifications={notifications}
        setNotifications={(notifs) => {
          setNotifications(notifs);
          storageService.saveNotifications(notifs);
        }}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        onResetDatabase={handleResetDatabase}
        onLogout={handleLogout}
        onSwitchRole={() => setOnboardingStage('role-selection')}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          currentUser={currentUser}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          currentLanguage={currentLanguage}
        />

        {/* Dynamic Page Views Container */}
        <main className="flex-1 overflow-x-hidden">
          {activeView === 'profile' && (
            <ProfileView
              currentUser={currentUser}
              onSaveProfile={handleSaveProfile}
              onContinue={() => setActiveView('dashboard')}
              currentLanguage={currentLanguage}
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
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'clean-energy' && (
            <CleanEnergyView
              currentUser={currentUser}
              onApplyCleanEnergy={handleApplyCleanEnergy}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'disaster-support' && (
            <DisasterSupportView
              currentUser={currentUser}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'food-donation' && (
            <FoodDonationView
              currentUser={currentUser}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'education-sponsors' && (
            <EducationSponsorsView
              currentUser={currentUser}
              onCheckEligibility={handleOpenEligibilityModal}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'ngo-panel' && (
            <NgoPanelView
              ruralIssues={ruralIssues}
              setRuralIssues={(issues) => {
                setRuralIssues(issues);
                storageService.saveRuralIssues(issues);
              }}
              developerSolutions={developerSolutions}
              cleanEnergyRequests={cleanEnergyRequests}
              setCleanEnergyRequests={(reqs) => {
                setCleanEnergyRequests(reqs);
                storageService.saveCleanEnergyRequests(reqs);
              }}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'developer-hub' && (
            <DeveloperHubView
              ruralIssues={ruralIssues}
              developerSolutions={developerSolutions}
              setDeveloperSolutions={(sols) => {
                setDeveloperSolutions(sols);
                storageService.saveDeveloperSolutions(sols);
              }}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'ai-assistant' && (
            <AiAssistantView
              currentUser={currentUser}
              initialQuery={initialAiQuery}
              apiKey={apiKey}
              onCheckEligibility={handleOpenEligibilityModal}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'schemes' && (
            <SchemeFinderView
              citizenProfile={currentUser}
              onCheckEligibility={handleOpenEligibilityModal}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'education-jobs' && (
            <EducationJobsView
              onCheckEligibility={handleOpenEligibilityModal}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'healthcare' && (
            <HealthcareView 
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'civic-reporting' && (
            <CivicReportingView
              currentUser={currentUser}
              onAddRuralIssue={handleAddRuralIssue}
              currentLanguage={currentLanguage}
            />
          )}

          {activeView === 'sdg-impact' && (
            <SdgDashboardView
              currentUser={currentUser}
              onCheckEligibility={handleOpenEligibilityModal}
              currentLanguage={currentLanguage}
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
