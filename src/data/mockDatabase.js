export const DEFAULT_DEMO_USER = {
  id: 'usr_demo_2026',
  name: 'Arun Kumar',
  email: 'arun.kumar@student.edu.in',
  age: 20,
  gender: 'Male',
  state: 'Karnataka',
  city: 'Bengaluru Urban',
  ruralDistrict: 'Ramanagara Rural District',
  village: 'Ramanagara Village Ward 4',
  occupation: 'Student',
  educationLevel: 'Undergraduate',
  incomeRange: 'Below ₹2.5 Lakhs / Year (Low Income)',
  incomeCategory: 'Low Income',
  skills: ['Python Basics', 'Data Entry', 'Web Development', 'Community Volunteering'],
  needs: ['Education', 'Financial Assistance', 'Employment', 'Healthcare', 'Environment'],
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  impactScore: 840,
  schemesSaved: ['SCH-001', 'SCH-002', 'SCH-004', 'SCH-006'],
  servicesAccessed: 14,
  civicReportsSubmitted: 4
};

export const RURAL_DISTRICTS = [
  { id: 'RD-1', name: 'Ramanagara Rural District', villageCount: 24, mainNgo: 'Gram Vikas Rural Foundation' },
  { id: 'RD-2', name: 'Mandya Rural District', villageCount: 32, mainNgo: 'Clean Water & Eco Relief' },
  { id: 'RD-3', name: 'Tumakuru North District', villageCount: 18, mainNgo: 'Seva Arogya Rural Health Trust' },
  { id: 'RD-4', name: 'Chikballapur East District', villageCount: 29, mainNgo: 'Vidya Rural Shiksha Mission' },
  { id: 'RD-5', name: 'Raichur South District', villageCount: 40, mainNgo: 'Kisan Samriddhi Farmer Guild' }
];

export const SAMPLE_NGOS = [
  {
    id: 'NGO-101',
    name: 'Gram Vikas Rural Foundation',
    registrationNo: 'NGO-KAR-2024-8841',
    headquarters: 'Ramanagara District',
    operatingDistricts: ['Ramanagara Rural District', 'Mandya Rural District'],
    primarySdgs: [1, 6, 7, 9, 11, 15],
    impactScore: 2450,
    issuesCleared: 48,
    activeProjects: ['Rural Drinking Water Pipeline Restoration', 'Solar Streetlight Installation'],
    contactEmail: 'contact@gramvikasrural.org',
    phone: '+91 98450 11223',
    leaderName: 'Dr. Ramesh Gowda'
  },
  {
    id: 'NGO-102',
    name: 'Seva Arogya Rural Health Trust',
    registrationNo: 'NGO-KAR-2023-5510',
    headquarters: 'Tumakuru District',
    operatingDistricts: ['Tumakuru North District', 'Chikballapur East District'],
    primarySdgs: [3, 2, 5, 7, 10],
    impactScore: 1980,
    issuesCleared: 36,
    activeProjects: ['Mobile Tele-Health Diagnostics Van', 'Maternal Nutrition Distribution'],
    contactEmail: 'helpline@sevaarogya.org',
    phone: '+91 98860 44332',
    leaderName: 'Dr. Sunita Rao'
  },
  {
    id: 'NGO-103',
    name: 'Vidya Rural Shiksha Mission',
    registrationNo: 'NGO-KAR-2022-9901',
    headquarters: 'Chikballapur District',
    operatingDistricts: ['Chikballapur East District', 'Ramanagara Rural District'],
    primarySdgs: [4, 8, 5, 7, 10, 17],
    impactScore: 3120,
    issuesCleared: 62,
    activeProjects: ['Digital Computer Labs in Rural Schools', 'Girl Student STEM Scholarships'],
    contactEmail: 'info@vidyarural.org',
    phone: '+91 94480 77112',
    leaderName: 'Prof. Ananth Kumar'
  }
];

export const SAMPLE_RURAL_ISSUES = [
  {
    id: 'RISS-2026-001',
    title: 'Severe Drinking Water Pipeline Burst & Contamination',
    ruralDistrict: 'Ramanagara Rural District',
    village: 'Ramanagara Village Ward 4',
    sdgId: 6,
    sdgName: 'SDG 6 - Clean Water & Sanitation',
    category: 'Clean Water',
    severity: 'High',
    description: 'Main underground drinking water pipeline cracked near village water tank. Over 1,200 villagers lack safe drinking water and sewage water is mixing in pipes.',
    reportedByNgo: 'Gram Vikas Rural Foundation',
    fieldOfficer: 'Suresh Patil (Field Reg #402)',
    status: 'In Progress',
    dateLogged: '2026-08-01',
    targetClearanceDate: '2026-08-10',
    evidencePhotos: ['https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&auto=format&fit=crop&q=80'],
    developerSolutionsCount: 2,
    clearanceNotes: 'Developer submitted IoT Smart Leak Detection Web App. NGO engineering team deployed main valve patch kit.'
  }
];

export const SAMPLE_DEVELOPER_SOLUTIONS = [
  {
    id: 'SOL-101',
    issueId: 'RISS-2026-001',
    title: 'SustainAqua: IoT Water Leakage & Pressure Telemetry App',
    developerName: 'Team CodeForGood (Lead: Priya Sharma)',
    githubUrl: 'https://github.com/sustain-ai/aqua-monitor',
    demoUrl: 'https://aqua-monitor.sustainai.dev',
    techStack: ['React', 'Node.js', 'MQTT IoT', 'Tailwind'],
    solutionReport: 'Built a lightweight web dashboard that connects to low-cost ultrasonic flow sensors installed at village water valves. Automatically alerts NGO field officers when pressure drops below 1.2 Bar, pinpointing leak locations on Google Maps.',
    status: 'Approved & Deployed',
    submittedDate: '2026-08-04',
    impactScoreEarned: 350
  }
];

// DISASTER & CLIMATE WEATHER MAP DATASET (SDG 11 & SDG 13)
export const SAMPLE_DISASTER_ZONES = [
  {
    id: 'DIS-2026-01',
    district: 'Ramanagara Rural District',
    village: 'Ramanagara Low-Lying Ward 4 & River Basin',
    hazardType: 'Flash Flood & Reservoir Overflow',
    alertLevel: 'Red Alert (Critical Emergency)',
    lossPercentage: 65,
    affectedCitizens: 1240,
    evacuatedCitizens: 890,
    requiredFunding: '₹15,00,000',
    allocatedFunding: '₹9,80,000 (65% Funded)',
    touristWarning: 'AVOID ROUTE: Highway NH-275 Blocked. Divert to Elevated State Highway 17.',
    safeShelter: 'Ramanagara District Higher Secondary Relief Camp (Capacity: 1,500 people)',
    migrationStatus: 'Evacuation Bus Shuttles Operating (8 Buses En Route)',
    coordinateX: 42,
    coordinateY: 38,
    sdgs: [1, 3, 11, 13]
  },
  {
    id: 'DIS-2026-02',
    district: 'Mandya Rural District',
    village: 'Pandavapura Agri & Canal Zone',
    hazardType: 'Agricultural Drought & Heatwave (43°C)',
    alertLevel: 'Amber Watch (High Severity)',
    lossPercentage: 40,
    affectedCitizens: 850,
    evacuatedCitizens: 310,
    requiredFunding: '₹8,50,000',
    allocatedFunding: '₹6,00,000 (70% Funded)',
    touristWarning: 'HEAT ADVISORY: Carry hydration packs. Hydration centers active at Bus Depot.',
    safeShelter: 'Pandavapura Community Air-Cooled Relief Shelter (Capacity: 600 people)',
    migrationStatus: 'Voluntary Farm Worker Evacuation Active',
    coordinateX: 68,
    coordinateY: 55,
    sdgs: [1, 2, 3, 13]
  },
  {
    id: 'DIS-2026-03',
    district: 'Tumakuru North District',
    village: 'Gubbi Hill Slopes & Quarry Area',
    hazardType: 'Monsoon Soil Erosion & Landslide Risk',
    alertLevel: 'Yellow Caution',
    lossPercentage: 25,
    affectedCitizens: 420,
    evacuatedCitizens: 180,
    requiredFunding: '₹5,00,000',
    allocatedFunding: '₹4,20,000 (84% Funded)',
    touristWarning: 'SAFE: Hill trekking path closed. Main town road open.',
    safeShelter: 'Gubbi Town Govt College Indoor Stadium (Capacity: 800 people)',
    migrationStatus: 'Slopes Evacuation Completed',
    coordinateX: 25,
    coordinateY: 72,
    sdgs: [11, 13, 15]
  }
];

export const SAMPLE_DOS_AND_DONTS = [
  {
    category: 'Flash Flood & River Overflow',
    dos: [
      'Immediately move to higher ground or designated District Relief Camps.',
      'Keep emergency battery torch, drinking water, and identity documents ready.',
      'Follow instructions broadcast on SustainAI emergency alert ticker.'
    ],
    donts: [
      'Do NOT walk or drive through moving floodwaters (even 6 inches can knock you down).',
      'Do NOT touch fallen electric power cables or submerged transformers.',
      'Do NOT drink unboiled flood water.'
    ]
  },
  {
    category: 'Extreme Heatwave (AQI > 300 / Temp > 40°C)',
    dos: [
      'Stay indoors between 11:00 AM and 4:00 PM.',
      'Drink ORS hydration fluids, coconut water, and wear loose light cotton clothing.',
      'Visit local mobile ORS hydration kiosks located at bus depots.'
    ],
    donts: [
      'Do NOT leave children or pets inside parked vehicles.',
      'Do NOT engage in heavy outdoor physical labor during peak heat hours.',
      'Do NOT consume alcoholic or sugary dehydrating drinks.'
    ]
  }
];

// SDG 7 AFFORDABLE & CLEAN ENERGY DATASET
export const SAMPLE_CLEAN_ENERGY_SCHEMES = [
  {
    id: 'SOL-701',
    name: 'PM Surya Ghar: Muft Bijli Yojana (Subsidized Rooftop Solar)',
    category: 'Rooftop Solar Subsidy',
    provider: 'Ministry of New & Renewable Energy (MNRE)',
    description: 'Providing up to 300 units of free electricity per month for residential households by installing subsidized 1 kW to 3 kW rooftop solar power systems.',
    subsidyAmount: '₹78,000 Direct Subsidy for 3 kW Solar System',
    estimatedMonthlySavings: '₹2,500 - ₹3,200 / month (Up to 100% Bill Reduction)',
    eligibility: 'Residential Households with suitable rooftop space & low/middle income',
    sdgId: 7
  },
  {
    id: 'SOL-702',
    name: 'PM-KUSUM Scheme: Solar Agricultural Pump Subsidy',
    category: 'Solar Irrigation Pump',
    provider: 'National Solar Agriculture Board',
    description: '60% to 90% government subsidy grant for farmers to replace old diesel irrigation pumpsets with off-grid 5HP / 7.5HP solar pumpsets.',
    subsidyAmount: '90% Government & State Subsidy Grant',
    estimatedMonthlySavings: 'Saves ₹4,500/mo on diesel fuel + 100% reliable day irrigation',
    eligibility: 'Agricultural farmers, water user associations & village cooperatives',
    sdgId: 7
  },
  {
    id: 'SOL-703',
    name: 'Pradhan Mantri Ujjwala 2.0: Clean Cooking LPG Grant',
    category: 'Clean Cooking Energy',
    provider: 'Ministry of Petroleum & Natural Gas',
    description: 'Free LPG gas connection, stove, and first refill cylinder for low-income women to eliminate hazardous firewood indoor smoke.',
    subsidyAmount: '100% Free LPG Connection + ₹300/cylinder refill subsidy',
    estimatedMonthlySavings: 'Eliminates 100% firewood indoor air toxicity',
    eligibility: 'Adult women belonging to BPL / Low-Income households',
    sdgId: 7
  }
];

export const SAMPLE_FOOD_DONATIONS = [
  {
    id: 'FOOD-2026-101',
    title: 'Surplus Fresh Meals from Community Hall Event',
    donorName: 'Annapurna Community Kitchen',
    donorType: 'Community Event Hall',
    location: 'Ramanagara Main Town Center',
    village: 'Ramanagara Ward 2',
    quantity: '45 Fresh Meals (Rice, Sambar, Vegetable Curry)',
    foodType: 'Pure Vegetarian',
    cookedTime: 'Prepared 2 hours ago (Today at 1:30 PM)',
    expiryHours: '6 Hours Remaining',
    status: 'Available for Pickup',
    contactPhone: '+91 98450 33445',
    sdgId: 2
  }
];

export const SAMPLE_EDUCATION_SPONSORS = [
  {
    id: 'SPON-401',
    sponsorName: 'Dr. APJ Abdul Kalam Rural Tech Trust',
    sponsorType: 'Philanthropic Foundation',
    programTitle: 'Free Laptop & Digital Learning Grant',
    description: 'Providing refurbished Dell/HP core i5 laptops and 1-year high-speed internet data packs to rural undergraduate STEM students.',
    fundingAmount: '₹45,000 / Laptop Workstation + Wi-Fi Voucher',
    targetBeneficiaries: 'Undergraduate Students in Engineering, CS, AI or Data Science from Low-Income background',
    deadline: '2026-09-15',
    totalSponsoredStudents: 140,
    contactEmail: 'grants@kalamruraltrust.org',
    sdgId: 4
  }
];

export const SAMPLE_MEDICAL_CAMPS = [
  {
    id: 'CAMP-301',
    title: 'Free Multi-Specialty Health & Eye Checkup Camp',
    organizer: 'Seva Arogya Trust & Rotary Club Bengaluru',
    date: 'August 14, 2026 (Sunday)',
    time: '9:00 AM - 4:00 PM',
    venue: 'Ramanagara Primary School Grounds, Ward 4',
    ruralDistrict: 'Ramanagara Rural District',
    specialties: ['Free Eye Screening & Glasses', 'General Medicine OPD', 'Blood Sugar & BP Test', 'ECG Heart Check'],
    doctorsCount: '12 Certified Doctors & Ophthalmologists',
    freeMedicines: 'Yes, Free Prescription Medicines Provided',
    availableSlots: 45,
    sdgId: 3
  }
];

export const SAMPLE_CIVIC_REPORTS = [
  {
    id: 'CIV-2026-1042',
    category: 'Water Leakage',
    icon: 'Droplets',
    title: 'Clean Water Pipe Burst on 8th Main Road',
    location: 'Indiranagar 100ft Road, Bengaluru Urban',
    description: 'Clean drinking water pipe leaking severely for 3 days, causing water wastage and road waterlogging.',
    status: 'In Progress',
    statusStep: 2,
    submittedDate: '2026-08-04',
    estimatedResolution: '2026-08-07',
    sdgs: [6, 11, 12],
    upvotes: 24,
    department: 'Bangalore Water Supply and Sewerage Board (BWSSB)'
  }
];

export const SAMPLE_SCHEMES = [
  {
    id: 'SCH-001',
    name: 'National Higher Education Financial Support Grant',
    category: 'Education & Financial',
    type: 'Scholarship / Grant',
    provider: 'Ministry of Education & Social Empowerment',
    description: 'Direct tuition fee waiver and monthly stipend for undergraduate students from families with income below ₹3 Lakhs.',
    eligibility: {
      minAge: 17,
      maxAge: 25,
      incomeMax: 'Below ₹3.0 Lakhs',
      education: ['Undergraduate', 'High School (12th)'],
      occupation: ['Student']
    },
    benefits: '100% Tuition Fee Waiver up to ₹60,000/year + ₹3,000 monthly living stipend.',
    deadline: '2026-09-30',
    sdgs: [1, 4, 10, 17],
    matchScore: 98,
    isPopular: true
  }
];

export const SAMPLE_OPPORTUNITIES = [
  {
    id: 'OPP-101',
    title: 'AI & Sustainable Tech Research Intern',
    provider: 'Bengaluru AI Innovation Lab & Govt Partner Network',
    type: 'Internship',
    location: 'Bengaluru / Hybrid',
    stipend: '₹15,000 / month',
    duration: '3 Months',
    skillsRequired: ['Python', 'Data Analytics', 'Basic Web Dev'],
    eligibility: 'Undergraduate Students in CS/IT/Data Science',
    deadline: '2026-08-25',
    sdgs: [4, 8, 9, 13, 17]
  }
];

export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'NOTIF-1',
    title: '🌾 New Rural Issue Uploaded by Field NGO',
    message: 'Gram Vikas Rural Foundation posted drinking water pipeline burst in Ramanagara Village (SDG 6). Developers can submit tech solutions.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'opportunity',
    link: 'ngo-panel'
  }
];

export const SAMPLE_HEALTHCARE_SERVICES = [
  {
    id: 'HLTH-1',
    name: 'Bengaluru District Urban & Rural Primary Health Centre (UPHC)',
    type: 'Public General Clinic & Diagnostics',
    distance: '1.2 km away',
    address: '14th Cross, Indiranagar UPHC Complex, Bengaluru',
    services: ['Free OPD Doctor Consultation', 'Essential Medicines', 'Blood & Urine Diagnostics', 'Vaccinations'],
    timings: '8:00 AM - 4:00 PM (Mon-Sat)',
    contact: '080-25251100',
    rating: 4.6,
    isFree: true,
    sdg: 3
  }
];
