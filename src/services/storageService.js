import { 
  SAMPLE_RURAL_ISSUES, 
  SAMPLE_DEVELOPER_SOLUTIONS, 
  SAMPLE_NOTIFICATIONS, 
  SAMPLE_MEDICAL_CAMPS 
} from '../data/mockDatabase';

const STORAGE_KEYS = {
  CURRENT_USER: 'sustainai_current_user',
  RURAL_ISSUES: 'sustainai_rural_issues',
  DEVELOPER_SOLUTIONS: 'sustainai_dev_solutions',
  CLEAN_ENERGY_REQUESTS: 'sustainai_clean_energy_reqs',
  NOTIFICATIONS: 'sustainai_notifications',
  FOOD_ITEMS: 'sustainai_food_items',
  MEDICAL_CAMPS: 'sustainai_medical_camps',
  LANGUAGE: 'sustainai_language',
  DARK_MODE: 'sustainai_dark_mode',
  RURAL_DISTRICT: 'sustainai_rural_district'
};

const SAMPLE_FOOD_SEED = [
  {
    id: 'FOOD-101',
    donorName: 'Bengaluru Convention Hall CSR',
    foodType: 'Cooked Veg Rice & Gravy (120 Servings)',
    quantity: '120 Meals',
    cookedTime: 'Today 1:00 PM',
    expiryTime: 'Tonight 10:00 PM',
    location: 'Ramanagara Ward 2 Shelter Kiosk',
    contactPhone: '+91 98450 33445',
    status: 'Available'
  },
  {
    id: 'FOOD-102',
    donorName: 'Gram Samriddhi Wedding Caterers',
    foodType: 'Fresh Roti, Dal & Sabzi (80 Servings)',
    quantity: '80 Meals',
    cookedTime: 'Today 2:30 PM',
    expiryTime: 'Tonight 11:30 PM',
    location: 'Mandya Hamlet Field Kitchen',
    contactPhone: '+91 98450 55667',
    status: 'Available'
  }
];

// Helper: Safe getItem from localStorage
const getItem = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`[storageService] Error loading key ${key}:`, e);
    return fallback;
  }
};

// Helper: Safe setItem to localStorage
const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[storageService] Error saving key ${key}:`, e);
  }
};

export const storageService = {
  // Initialize storage with seeds if empty
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.RURAL_ISSUES)) {
      setItem(STORAGE_KEYS.RURAL_ISSUES, SAMPLE_RURAL_ISSUES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS)) {
      setItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, SAMPLE_DEVELOPER_SOLUTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      setItem(STORAGE_KEYS.NOTIFICATIONS, SAMPLE_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS)) {
      setItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, [
        {
          id: 'SOLAR-REQ-101',
          schemeName: 'PM Surya Ghar: Subsidized Rooftop Solar',
          applicantName: 'Ramesh Patel',
          applicantPhone: '+91 98450 66778',
          district: 'Ramanagara Rural District',
          village: 'Ramanagara Village Ward 4',
          solarCapacity: '3.0 kW Rooftop Solar',
          subsidyGrant: '₹78,000',
          status: 'Site Inspection Required',
          submittedDate: '2026-08-05'
        }
      ]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS)) {
      setItem(STORAGE_KEYS.FOOD_ITEMS, SAMPLE_FOOD_SEED);
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEDICAL_CAMPS)) {
      setItem(STORAGE_KEYS.MEDICAL_CAMPS, SAMPLE_MEDICAL_CAMPS);
    }
  },

  // Reset Storage to Fresh Seeds
  resetToSeeds() {
    setItem(STORAGE_KEYS.RURAL_ISSUES, SAMPLE_RURAL_ISSUES);
    setItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, SAMPLE_DEVELOPER_SOLUTIONS);
    setItem(STORAGE_KEYS.NOTIFICATIONS, SAMPLE_NOTIFICATIONS);
    setItem(STORAGE_KEYS.FOOD_ITEMS, SAMPLE_FOOD_SEED);
    setItem(STORAGE_KEYS.MEDICAL_CAMPS, SAMPLE_MEDICAL_CAMPS);
    setItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, [
      {
        id: 'SOLAR-REQ-101',
        schemeName: 'PM Surya Ghar: Subsidized Rooftop Solar',
        applicantName: 'Ramesh Patel',
        applicantPhone: '+91 98450 66778',
        district: 'Ramanagara Rural District',
        village: 'Ramanagara Village Ward 4',
        solarCapacity: '3.0 kW Rooftop Solar',
        subsidyGrant: '₹78,000',
        status: 'Site Inspection Required',
        submittedDate: '2026-08-05'
      }
    ]);
  },

  // User Auth & Profile
  getCurrentUser() {
    return getItem(STORAGE_KEYS.CURRENT_USER, null);
  },
  setCurrentUser(userObj) {
    setItem(STORAGE_KEYS.CURRENT_USER, userObj);
  },

  // Preferences
  getLanguage() {
    return getItem(STORAGE_KEYS.LANGUAGE, 'English');
  },
  setLanguage(lang) {
    setItem(STORAGE_KEYS.LANGUAGE, lang);
  },

  getDarkMode() {
    return getItem(STORAGE_KEYS.DARK_MODE, true);
  },
  setDarkMode(isDark) {
    setItem(STORAGE_KEYS.DARK_MODE, isDark);
  },

  getRuralDistrict() {
    return getItem(STORAGE_KEYS.RURAL_DISTRICT, 'Ramanagara Rural District');
  },
  setRuralDistrict(district) {
    setItem(STORAGE_KEYS.RURAL_DISTRICT, district);
  },

  // Rural Issues CRUD
  getRuralIssues() {
    return getItem(STORAGE_KEYS.RURAL_ISSUES, SAMPLE_RURAL_ISSUES);
  },
  saveRuralIssues(issues) {
    setItem(STORAGE_KEYS.RURAL_ISSUES, issues);
  },
  addRuralIssue(newIssue) {
    const current = this.getRuralIssues();
    const updated = [newIssue, ...current];
    this.saveRuralIssues(updated);
    return updated;
  },

  // Developer Solutions CRUD
  getDeveloperSolutions() {
    return getItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, SAMPLE_DEVELOPER_SOLUTIONS);
  },
  saveDeveloperSolutions(solutions) {
    setItem(STORAGE_KEYS.DEVELOPER_SOLUTIONS, solutions);
  },
  addDeveloperSolution(newSolution) {
    const current = this.getDeveloperSolutions();
    const updated = [newSolution, ...current];
    this.saveDeveloperSolutions(updated);
    return updated;
  },

  // Clean Energy Solar Requests CRUD
  getCleanEnergyRequests() {
    return getItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, []);
  },
  saveCleanEnergyRequests(reqs) {
    setItem(STORAGE_KEYS.CLEAN_ENERGY_REQUESTS, reqs);
  },
  addCleanEnergyRequest(newReq) {
    const current = this.getCleanEnergyRequests();
    const updated = [newReq, ...current];
    this.saveCleanEnergyRequests(updated);
    return updated;
  },

  // Notifications CRUD
  getNotifications() {
    return getItem(STORAGE_KEYS.NOTIFICATIONS, SAMPLE_NOTIFICATIONS);
  },
  saveNotifications(notifs) {
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifs);
  },
  addNotification(newNotif) {
    const current = this.getNotifications();
    const updated = [newNotif, ...current];
    this.saveNotifications(updated);
    return updated;
  },

  // Food Donation Items CRUD
  getFoodItems() {
    return getItem(STORAGE_KEYS.FOOD_ITEMS, SAMPLE_FOOD_SEED);
  },
  saveFoodItems(items) {
    setItem(STORAGE_KEYS.FOOD_ITEMS, items);
  },

  // Medical Camps CRUD
  getMedicalCamps() {
    return getItem(STORAGE_KEYS.MEDICAL_CAMPS, SAMPLE_MEDICAL_CAMPS);
  },
  saveMedicalCamps(camps) {
    setItem(STORAGE_KEYS.MEDICAL_CAMPS, camps);
  }
};
