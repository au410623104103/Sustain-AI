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
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ArunKumar',
  impactScore: 840,
  schemesSaved: ['SCH-001', 'SCH-002', 'SCH-004', 'SCH-006'],
  servicesAccessed: 14,
  civicReportsSubmitted: 4,
  role: 'citizen'
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
    fieldOfficersCount: 18,
    activeProjects: ['IoT Water Leakage Sensor Grid', 'Solar Microgrid Station', 'Ration Kit Distribution'],
    clearedIssuesCount: 42
  },
  {
    id: 'NGO-102',
    name: 'Clean Water & Eco Relief',
    registrationNo: 'NGO-KAR-2023-1102',
    headquarters: 'Mandya District',
    operatingDistricts: ['Mandya Rural District', 'Tumakuru North District'],
    primarySdgs: [6, 12, 13, 14],
    impactScore: 1890,
    fieldOfficersCount: 12,
    activeProjects: ['Canal Filtration System', 'Zero Plastic Drive'],
    clearedIssuesCount: 28
  },
  {
    id: 'NGO-103',
    name: 'Vidya Rural Shiksha Mission',
    registrationNo: 'NGO-KAR-2025-4491',
    headquarters: 'Chikballapur District',
    operatingDistricts: ['Chikballapur East District', 'Raichur South District'],
    primarySdgs: [4, 5, 8, 10],
    impactScore: 3120,
    fieldOfficersCount: 24,
    activeProjects: ['Digital Learning Kiosks', 'Girls STEM Fellowship'],
    clearedIssuesCount: 64
  }
];

export const SAMPLE_SCHEMES = [
  {
    id: 'SCH-001',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    category: ['Clean Energy', 'SDG 7', 'Subsidies'],
    provider: 'Ministry of New & Renewable Energy (MNRE)',
    description: 'Provides up to 300 units of free electricity per month to rural households through a 40% to 60% direct subsidy for installing rooftop solar panels.',
    benefits: 'Up to ₹78,000 direct bank grant for 3kW rooftop solar setup + 300 units free monthly power.',
    eligibility: {
      incomeMax: 'Below ₹3.5 Lakhs / Year',
      occupation: ['Farmer', 'Student', 'Low Income Household', 'Unemployed'],
      state: 'All States (Priority Karnataka)'
    },
    matchScore: 98,
    sdgs: [7, 11, 13],
    deadline: 'December 31, 2026'
  },
  {
    id: 'SCH-002',
    name: 'Vidya Samriddhi Post-Graduate Scholarship 2026',
    category: ['Education', 'SDG 4', 'Scholarship'],
    provider: 'Karnataka State Higher Education Council',
    description: 'Full college tuition fee reimbursement + ₹5,000 monthly living allowance for meritorious undergraduate and post-graduate students from rural areas.',
    benefits: '100% Fee Waiver + ₹60,000 annual direct bank stipend + free laptop.',
    eligibility: {
      incomeMax: 'Below ₹2.5 Lakhs / Year',
      occupation: ['Student'],
      state: 'Karnataka'
    },
    matchScore: 96,
    sdgs: [4, 5, 10],
    deadline: 'August 30, 2026'
  },
  {
    id: 'SCH-003',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    category: ['Healthcare', 'SDG 3', 'Insurance'],
    provider: 'National Health Authority (NHA)',
    description: 'Provides free health coverage up to ₹5.0 Lakhs per family per year for secondary and tertiary care hospitalization across empanelled hospitals.',
    benefits: 'Cashless hospital treatment up to ₹5 Lakhs per family + free post-surgery medicine.',
    eligibility: {
      incomeMax: 'Below ₹3.0 Lakhs / Year',
      occupation: ['Low Income Household', 'Farmer', 'Unemployed', 'Student'],
      state: 'All India'
    },
    matchScore: 94,
    sdgs: [3, 10],
    deadline: 'Ongoing Scheme'
  },
  {
    id: 'SCH-004',
    name: 'PM-KUSUM Solar Agricultural Pump Subsidy',
    category: ['Agriculture', 'Clean Energy', 'SDG 7'],
    provider: 'Ministry of Agriculture & MNRE',
    description: 'Provides 60% government subsidy for installing off-grid solar water pumps for rural farmers to eliminate diesel costs.',
    benefits: '60% Subsidy on 5HP to 7.5HP Solar Water Pumps + 30% Bank Loan Support.',
    eligibility: {
      incomeMax: 'Open to All Small & Marginal Farmers',
      occupation: ['Farmer'],
      state: 'All States'
    },
    matchScore: 92,
    sdgs: [2, 7, 13],
    deadline: 'November 15, 2026'
  }
];

export const SAMPLE_OPPORTUNITIES = [
  {
    id: 'OPP-301',
    title: 'Junior AI Data Annotator & Community Survey Lead',
    type: 'Paid Internship',
    provider: 'SustainAI Rural Tech Collective',
    location: 'Ramanagara District / Remote Kiosk',
    duration: '6 Months',
    stipend: '₹12,000 / month',
    eligibility: 'Undergraduate or Diploma Students with basic computer literacy',
    description: 'Lead village household surveys and annotate rural civic issue data for UN SDG impact mapping.',
    sdgs: [8, 9, 10]
  },
  {
    id: 'OPP-302',
    title: 'Solar Microgrid Field Maintenance Trainee',
    type: 'Skill Apprenticeship',
    provider: 'Gram Vikas Solar Energy Wing',
    location: 'Mandya & Ramanagara Rural',
    duration: '3 Months',
    stipend: '₹10,000 / month',
    eligibility: 'ITI / Diploma in Electrical or Electronics',
    description: 'Hands-on training in solar panel cleaning, inverter diagnostics, and battery storage maintenance.',
    sdgs: [7, 8, 13]
  }
];

export const SAMPLE_MEDICAL_CAMPS = [
  {
    id: 'CAMP-201',
    title: 'Free Eye Checkup & Cataract Surgery Camp',
    location: 'Ramanagara Primary School Hall, Ward 4',
    date: 'August 14, 2026',
    timing: '09:00 AM - 04:00 PM',
    organizer: 'Minto Ophthalmic Hospital & Gram Vikas NGO',
    specialties: ['Free Spectacles Distribution', 'Cataract Screening', 'Glaucoma Checkup'],
    doctorsCount: 6,
    slotsAvailable: 140,
    fee: '100% Free'
  },
  {
    id: 'CAMP-202',
    title: 'Maternal Health & Pediatric Immunization Clinic',
    location: 'Mandya Primary Health Center, Pandavapura',
    date: 'August 18, 2026',
    timing: '10:00 AM - 03:00 PM',
    organizer: 'District Health Society & UNICEF Partner',
    specialties: ['Ultrasound Scan', 'Iron & Folic Supplementation', 'Child Vaccination'],
    doctorsCount: 8,
    slotsAvailable: 95,
    fee: '100% Free'
  }
];

export const SAMPLE_HEALTHCARE_SERVICES = [
  {
    id: 'HSER-101',
    title: 'Ayushman Bharat Golden Health Card Kiosk',
    category: 'Free Cashless Health Insurance (Up to ₹5 Lakhs)',
    provider: 'National Health Authority & Karnataka Health Dept',
    location: 'Ramanagara District Hospital Ward 2',
    benefits: '100% Cashless Medical Treatment at Empanelled Hospitals',
    timing: '09:00 AM - 05:00 PM (Daily)',
    contact: '+91 1800 11 4477'
  },
  {
    id: 'HSER-102',
    title: 'Mobile Tele-Medicine & Diagnostic Van',
    category: 'Primary Healthcare & Diagnostics',
    provider: 'Gram Vikas Mobile Health Unit',
    location: 'Visiting Ramanagara Villages (Tuesdays & Fridays)',
    benefits: 'Free Blood Sugar Test, ECG & Tele-Consultation with Doctors',
    timing: '10:00 AM - 02:00 PM',
    contact: '+91 98450 11223'
  }
];

export const SAMPLE_CLEAN_ENERGY_SCHEMES = [
  {
    id: 'CES-101',
    name: 'PM Surya Ghar Rooftop Solar Scheme',
    category: ['Rooftop Solar', 'SDG 7'],
    provider: 'MNRE & Bescom Karnataka',
    description: 'Up to ₹78,000 grant subsidy for 3 kW rooftop solar installation. Saves up to 90% monthly power bill.',
    subsidyAmount: 'Up to ₹78,000 Direct Bank Credit',
    estimatedMonthlySavings: 'Save ₹2,200 - ₹3,500 / month',
    deadline: 'Dec 31, 2026'
  },
  {
    id: 'CES-102',
    name: 'PM-KUSUM Solar Irrigation Pump Subsidy',
    category: ['Agricultural Solar', 'SDG 7'],
    provider: 'Ministry of Agriculture',
    description: '60% subsidy for 5 HP solar water pumps replacing diesel generators for farmers.',
    subsidyAmount: '60% Govt Subsidy (Up to ₹1,25,000)',
    estimatedMonthlySavings: 'Save ₹4,500 / month on diesel',
    deadline: 'Nov 15, 2026'
  },
  {
    id: 'CES-103',
    name: 'Pradhan Mantri Ujjwala Free LPG Connection',
    category: ['Clean Cooking LPG', 'SDG 7'],
    provider: 'Ministry of Petroleum & Natural Gas',
    description: '100% free LPG gas stove and first 14.2kg cylinder refill for rural BPL households.',
    subsidyAmount: '100% Free Connection + ₹1,600 Subsidy',
    estimatedMonthlySavings: 'Clean Smokeless Cooking Access',
    deadline: 'Ongoing'
  }
];

export const SAMPLE_CLEAN_ENERGY_REQUESTS = [
  {
    id: 'SOLAR-REQ-101',
    schemeName: 'PM Surya Ghar Rooftop Solar Scheme',
    applicantName: 'Arun Kumar',
    applicantPhone: '+91 98450 11223',
    district: 'Ramanagara Rural District',
    village: 'Ramanagara Village Ward 4',
    solarCapacity: '3.0 kW Rooftop Solar Plant',
    subsidyGrant: '₹78,000 Direct Bank Subsidy',
    monthlyBill: '₹2,500 / month',
    rooftopArea: '350 sq ft (Sufficient for 3 kW)',
    status: 'Pending NGO Rural Inspection',
    submittedDate: '2026-08-06',
    inspectionDate: null
  },
  {
    id: 'SOLAR-REQ-102',
    schemeName: 'PM-KUSUM Solar Agricultural Pump Grant',
    applicantName: 'Lakshmi Devi',
    applicantPhone: '+91 94481 22334',
    district: 'Mandya Rural District',
    village: 'Pandavapura Hamlet Ward 2',
    solarCapacity: '5.0 HP Solar Pump Set',
    subsidyGrant: '₹1,25,000 Govt Grant',
    monthlyBill: '₹4,200 / month',
    rooftopArea: '500 sq ft Field Open Shed',
    status: 'Rural Site Visit Scheduled',
    submittedDate: '2026-08-05',
    inspectionDate: '2026-08-09'
  },
  {
    id: 'SOLAR-REQ-103',
    schemeName: 'Pradhan Mantri Ujjwala Free LPG Connection',
    applicantName: 'Ramesh Gowda',
    applicantPhone: '+91 97312 99881',
    district: 'Tumakuru North District',
    village: 'Gubbi Village Ward 1',
    solarCapacity: '2-Burner Gas Stove + 14.2kg LPG Cylinder',
    subsidyGrant: '100% Free Stove & First Refill',
    monthlyBill: '₹850 / month',
    rooftopArea: 'Standard Kitchen Space',
    status: 'Grant Transferred & Verified',
    submittedDate: '2026-08-03',
    inspectionDate: '2026-08-04'
  }
];

export const SAMPLE_FOOD_DONATIONS = [
  {
    id: 'FOOD-401',
    donorName: 'Sri Sai Caterers & Marriages',
    foodType: 'Fresh Cooked Vegetarian Meals (Rice, Sambar, Vegetable Curry)',
    quantity: '120 Portions',
    location: 'Ramanagara Ward 2 Shelter Kiosk',
    preparedTime: 'Today, 01:00 PM',
    expiryTime: 'Today, 09:00 PM',
    status: 'Available for Pick-up',
    ngoAssigned: 'Gram Vikas Rural Foundation'
  },
  {
    id: 'FOOD-402',
    donorName: 'Mandya Supermarket Surplus',
    foodType: 'Packed Wheat Flour, Rice Bags & Milk Packets',
    quantity: '45 Ration Packets',
    location: 'Pandavapura Community Relief Shelter',
    preparedTime: 'Yesterday',
    expiryTime: 'Aug 12, 2026',
    status: 'Assigned to NGO Shuttles',
    ngoAssigned: 'Clean Water & Eco Relief'
  }
];

export const SAMPLE_EDUCATION_SPONSORS = [
  {
    id: 'SPON-501',
    programTitle: 'CSR Engineering & Tech Laptop Grant 2026',
    sponsorName: 'Infosys Foundation & Rotary Education CSR',
    sponsorType: 'Corporate Philanthropy',
    fundingAmount: 'Free High-Performance Laptop + ₹15,000 Study Grant',
    targetBeneficiaries: 'Undergraduate STEM & IT Students with income below ₹3 Lakhs',
    totalSponsoredStudents: 180,
    deadline: 'August 30, 2026',
    description: 'Provides free brand-new laptops with pre-installed Linux/Python coding environments to low-income college students in Karnataka.'
  },
  {
    id: 'SPON-502',
    programTitle: '100% Rural Girl Student College Tuition Waiver',
    sponsorName: 'Azim Premji Philanthropic Trust',
    sponsorType: 'Educational Foundation',
    fundingAmount: '100% Tuition Fee Waiver (Up to ₹50,000/year)',
    targetBeneficiaries: 'Female Students in B.Sc, B.A, B.Com degree programs',
    totalSponsoredStudents: 255,
    deadline: 'September 10, 2026',
    description: 'Covers full college tuition fees directly paid to accredited degree colleges for meritorious female students from rural villages.'
  }
];

export const SAMPLE_CIVIC_REPORTS = [
  {
    id: 'CIVIC-101',
    title: 'Overhead Drinking Water Pipe Fracture & Leakage',
    category: 'Water Sanitation',
    district: 'Ramanagara Rural District',
    village: 'Ramanagara Village Ward 4',
    severity: 'High',
    status: 'Assigned to Plumber Team',
    reportedDate: 'August 5, 2026',
    reporterName: 'Arun Kumar',
    description: 'Main overhead drinking water pipe fractured near primary school. Potable water leaking into open drainage.'
  },
  {
    id: 'CIVIC-102',
    title: 'Solar Street Light Battery Telemetry Failure',
    category: 'Clean Energy Hardware',
    district: 'Mandya Rural District',
    village: 'Pandavapura Hamlet Ward 2',
    severity: 'Medium',
    status: 'Escalated to Developer Hub',
    reportedDate: 'August 6, 2026',
    reporterName: 'Lakshmi Devi',
    description: 'Solar street light battery charging controller stopped sending telemetry data packets.'
  }
];

export const SAMPLE_RURAL_ISSUES = [
  {
    id: 'RISS-101',
    title: 'Drinking Water Pipeline Burst & Canal Contamination',
    ruralDistrict: 'Ramanagara Rural District',
    village: 'Ramanagara Village Ward 4',
    sdgId: 6,
    sdgName: '6 - Clean Water & Sanitation',
    category: 'Water Sanitation',
    severity: 'High',
    description: 'Main overhead drinking water pipe fractured near school. Contaminated runoff entering drinking taps.',
    reportedByNgo: 'Citizen Report (Arun Kumar)',
    fieldOfficer: 'Suresh Patil (Field Officer)',
    status: 'Open',
    dateLogged: '2026-08-04',
    targetClearanceDate: 'Within 5 Days',
    evidencePhotos: ['https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&auto=format&fit=crop&q=80'],
    developerSolutionsCount: 2,
    clearanceNotes: 'Awaiting field plumber replacement parts.'
  },
  {
    id: 'RISS-102',
    title: 'River Arkavathi Flash Flood Bridge Road Submersion',
    ruralDistrict: 'Ramanagara Rural District',
    village: 'Kanakapura River Basin',
    sdgId: 11,
    sdgName: '11 - Sustainable Cities & Communities',
    category: 'Disaster Relief',
    severity: 'Critical',
    description: 'Flash floods flooded NH-275 bridge. 8 evacuation shuttle buses currently active.',
    reportedByNgo: 'Gram Vikas Rural Foundation',
    fieldOfficer: 'Ramesh Gowda (Disaster Cell)',
    status: 'Under Verification',
    dateLogged: '2026-08-05',
    targetClearanceDate: 'Within 48 Hours',
    evidencePhotos: ['https://images.unsplash.com/photo-1547683905-f686c993aae5?w=500&auto=format&fit=crop&q=80'],
    developerSolutionsCount: 1,
    clearanceNotes: 'NDMA boats deployed.'
  }
];

export const SAMPLE_DEVELOPER_SOLUTIONS = [
  {
    id: 'DSOL-301',
    issueId: 'RISS-101',
    issueTitle: 'Drinking Water Pipeline Burst & Canal Contamination',
    developerName: 'Priya Sharma (Full-Stack IoT Dev)',
    solutionTitle: 'Open-Source Ultrasonic Water Leakage Sensor & Telemetry API',
    repoUrl: 'https://github.com/au410623104103/Sustain-AI',
    techStack: ['Node.js', 'ESP32 IoT', 'MQTT', 'React'],
    description: 'Built low-cost ESP32 pressure drop sensor telemetry system that alerts village panchayat automatically when pressure drops below 1.2 bar.',
    status: 'Deployed & Operational',
    dateSubmitted: '2026-08-05'
  }
];

export const SAMPLE_DISASTER_ZONES = [
  {
    id: 'DIS-ZONE-1',
    district: 'Ramanagara Rural District',
    lossPercentage: 65,
    affectedCitizens: 1240,
    evacuatedCitizens: 890,
    requiredFunding: '₹15,000,000',
    allocatedFunding: '₹9,800,000',
    hazardType: 'Flash Flood & Reservoir Overflow',
    sheltersActive: 4,
    safeShelter: 'Ramanagara District Higher Secondary Relief Camp',
    touristWarning: 'Avoid NH-275 River Arkavathi bridge due to high water levels. Take State Highway 17 elevated bypass.',
    migrationStatus: '8 Emergency Bus Shuttles Active En Route'
  },
  {
    id: 'DIS-ZONE-2',
    district: 'Mandya Rural District',
    lossPercentage: 40,
    affectedCitizens: 3400,
    evacuatedCitizens: 0,
    requiredFunding: '₹8,500,000',
    allocatedFunding: '₹4,200,000',
    hazardType: 'Agricultural Heatwave & Drought Stress',
    sheltersActive: 2,
    safeShelter: 'Pandavapura Primary Community Cooling Center',
    touristWarning: 'Hydration kiosks active on Pandavapura Highway. Carry thermal sun protection.',
    migrationStatus: 'Hydration Stations Active'
  }
];

export const SAMPLE_DOS_AND_DONTS = [
  {
    dos: [
      'Keep emergency survival kit with bottled water and sealed rations.',
      'Evacuate immediately when red alert warning siren sounds.',
      'Move elderly citizens and children to designated relief shelters.'
    ],
    donts: [
      'Do not walk, swim, or drive through fast-flowing flood water.',
      'Do not touch fallen electric power lines or submerged transformers.',
      'Do not spread unverified rumors; follow official NDMA broadcasts.'
    ]
  },
  {
    dos: [
      'Drink plenty of oral rehydration fluids and clean water.',
      'Stay indoors during peak solar hours (12 PM - 3 PM).',
      'Wear loose-fitting, light-colored cotton clothing.'
    ],
    donts: [
      'Do not leave pets or livestock tied outdoors under direct heat.',
      'Do not consume stale or uncovered food items.',
      'Do not engage in strenuous physical labor during extreme heat hours.'
    ]
  }
];
