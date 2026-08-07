import { 
  DEFAULT_DEMO_USER, 
  SAMPLE_SCHEMES, 
  SAMPLE_OPPORTUNITIES, 
  SAMPLE_MEDICAL_CAMPS, 
  SAMPLE_CLEAN_ENERGY_SCHEMES,
  SAMPLE_FOOD_DONATIONS, 
  SAMPLE_RURAL_ISSUES, 
  SAMPLE_DEVELOPER_SOLUTIONS, 
  SAMPLE_NGOS 
} from '../data/mockDatabase';

const STORAGE_KEYS = {
  CURRENT_USER: 'sustain_ai_current_user',
  REGISTERED_USERS: 'sustain_ai_registered_users',
  RURAL_ISSUES: 'sustain_ai_rural_issues',
  DEVELOPER_SOLUTIONS: 'sustain_ai_developer_solutions',
  CLEAN_ENERGY_REQUESTS: 'sustain_ai_clean_energy_requests',
  NOTIFICATIONS: 'sustain_ai_notifications',
  IS_DARK_MODE: 'sustain_ai_dark_mode',
  CURRENT_LANGUAGE: 'sustain_ai_language',
  RURAL_DISTRICT: 'sustain_ai_rural_district'
};

export const storageService = {
  // Initialize storage with seeds if empty
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.RURAL_ISSUES)) {
      localStorage.setItem(STORAGE_KEYS.RURAL_ISSUES, JSON.stringify(SAMPLE_RURAL_ISSUES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS)) {
      localStorage.setItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, JSON.stringify(SAMPLE_DEVELOPER_SOLUTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS)) {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify([DEFAULT_DEMO_USER]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      const initialNotifs = [
        {
          id: 'NOTIF-01',
          title: '🚨 RED ALERT: Flash Flood Warning',
          message: 'River Arkavathi water levels +2.4m above danger mark in Ramanagara. Emergency evacuation shuttles active.',
          timestamp: '10 mins ago',
          read: false,
          type: 'alert',
          link: 'disaster'
        },
        {
          id: 'NOTIF-02',
          title: '🏥 Free Medical Camp Tomorrow',
          message: 'Specialist eye checkup & OPD clinic at Ramanagara Primary School (2 km away).',
          timestamp: '1 hour ago',
          read: false,
          type: 'health',
          link: 'healthcare'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifs));
    }
  },

  // User Session & Registration Persistence
  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser(userObj) {
    if (userObj) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  // Registered Users Registry for Duplicate Email Prevention & Password Recovery
  getRegisteredUsers() {
    const data = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return data ? JSON.parse(data) : [DEFAULT_DEMO_USER];
  },

  registerUser(userObj) {
    const users = this.getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === userObj.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please login instead.' };
    }
    users.push(userObj);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
    return { success: true, user: userObj };
  },

  findUserByEmail(email) {
    const users = this.getRegisteredUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  updateUserPassword(email, newPassword) {
    const users = this.getRegisteredUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx !== -1) {
      users[idx].password = newPassword;
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));

      // Also update current user if logged in
      const current = this.getCurrentUser();
      if (current && current.email.toLowerCase() === email.toLowerCase()) {
        current.password = newPassword;
        this.setCurrentUser(current);
      }
      return true;
    }
    return false;
  },

  // Rural Issues CRUD
  getRuralIssues() {
    const data = localStorage.getItem(STORAGE_KEYS.RURAL_ISSUES);
    return data ? JSON.parse(data) : SAMPLE_RURAL_ISSUES;
  },

  saveRuralIssues(issues) {
    localStorage.setItem(STORAGE_KEYS.RURAL_ISSUES, JSON.stringify(issues));
  },

  addRuralIssue(newIssue) {
    const issues = this.getRuralIssues();
    const updated = [newIssue, ...issues];
    this.saveRuralIssues(updated);
    return updated;
  },

  // Developer Solutions CRUD
  getDeveloperSolutions() {
    const data = localStorage.getItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS);
    return data ? JSON.parse(data) : SAMPLE_DEVELOPER_SOLUTIONS;
  },

  saveDeveloperSolutions(sols) {
    localStorage.setItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, JSON.stringify(sols));
  },

  // Clean Energy Requests CRUD
  getCleanEnergyRequests() {
    const data = localStorage.getItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS);
    return data ? JSON.parse(data) : [];
  },

  saveCleanEnergyRequests(reqs) {
    localStorage.setItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, JSON.stringify(reqs));
  },

  // Notifications CRUD
  getNotifications() {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  },

  saveNotifications(notifs) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  addNotification(notif) {
    const notifs = this.getNotifications();
    const updated = [notif, ...notifs];
    this.saveNotifications(updated);
    return updated;
  },

  // Settings & Theme
  getDarkMode() {
    const val = localStorage.getItem(STORAGE_KEYS.IS_DARK_MODE);
    return val ? JSON.parse(val) : true;
  },

  setDarkMode(isDark) {
    localStorage.setItem(STORAGE_KEYS.IS_DARK_MODE, JSON.stringify(isDark));
  },

  getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_LANGUAGE) || 'English';
  },

  setLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_LANGUAGE, lang);
  },

  getRuralDistrict() {
    return localStorage.getItem(STORAGE_KEYS.RURAL_DISTRICT) || 'Ramanagara Rural District';
  },

  setRuralDistrict(district) {
    localStorage.setItem(STORAGE_KEYS.RURAL_DISTRICT, district);
  },

  resetToSeeds() {
    localStorage.setItem(STORAGE_KEYS.RURAL_ISSUES, JSON.stringify(SAMPLE_RURAL_ISSUES));
    localStorage.setItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, JSON.stringify(SAMPLE_DEVELOPER_SOLUTIONS));
    localStorage.setItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify([DEFAULT_DEMO_USER]));
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};
