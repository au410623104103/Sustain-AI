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
    operatingDistricts: ['Chikballapur East District', 'Bengaluru Rural'],
    primarySdgs: [4, 5, 8, 10],
    impactScore: 3120,
    fieldOfficersCount: 24,
    activeProjects: ['CSR Laptop Grant Distribution', '100% College Fee Waiver Helpdesk'],
    clearedIssuesCount: 65
  }
];

export const SAMPLE_RURAL_ISSUES = [
  {
    id: 'RISS-2026-001',
    title: 'Main Drinking Water Pipeline Burst Causing Flooding',
    ruralDistrict: 'Ramanagara Rural District',
    village: 'Ramanagara Village Ward 4',
    sdgId: 6,
    sdgName: 'SDG 6 - Clean Water & Sanitation',
    category: 'Water Leakage',
    severity: 'Critical',
    description: 'The main 8-inch drinking water supply line burst near the primary school. 1,200 households have no clean drinking water and sewage overflow risk is high.',
    reportedByNgo: 'Gram Vikas Rural Foundation (Citizen Grievance #402)',
    fieldOfficer: 'Suresh Patil (Field Lead)',
    status: 'Tech Solution Submitted',
    dateLogged: '2026-08-04',
    targetClearanceDate: '2026-08-08',
    evidencePhotos: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=500&auto=format&fit=crop&q=80'],
    developerSolutionsCount: 2,
    clearanceNotes: 'IoT telemetry app deployed by Tech Developer Priya Sharma. Pipe repair scheduled.'
  },
  {
    id: 'RISS-2026-002',
    title: 'Primary Health Clinic Frequent Power Blackouts Endangering Vaccines',
    ruralDistrict: 'Tumakuru North District',
    village: 'Gubbi Village Ward 2',
    sdgId: 7,
    sdgName: 'SDG 7 - Affordable & Clean Energy',
    category: 'Clean Energy',
    severity: 'High',
    description: 'The village health center suffers 6-hour daily power cuts. Child immunization vaccines and insulin stocks are spoiling due to lack of solar battery backup.',
    reportedByNgo: 'Seva Arogya Rural Health Trust',
    fieldOfficer: 'Dr. Ramesh Gowda',
    status: 'Open',
    dateLogged: '2026-08-05',
    targetClearanceDate: '2026-08-10',
    evidencePhotos: ['https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=80'],
    developerSolutionsCount: 1,
    clearanceNotes: 'Solar microgrid proposal submitted. Awaiting NGO funding approval.'
  },
  {
    id: 'RISS-2026-003',
    title: 'High Dropout Rate Among Rural Girl Students Due to Fee Shortfall',
    ruralDistrict: 'Chikballapur East District',
    village: 'Sidlaghatta Hamlet',
    sdgId: 4,
    sdgName: 'SDG 4 - Quality Education',
    category: 'Education',
    severity: 'Medium',
    description: '35 low-income female students in Sidlaghatta hamlet cannot pay ₹12,000 annual high school tuition fees. CSR sponsorship needed.',
    reportedByNgo: 'Vidya Rural Shiksha Mission',
    fieldOfficer: 'Lakshmi Devi (Community Volunteer)',
    status: 'Cleared',
    dateLogged: '2026-08-01',
    targetClearanceDate: '2026-08-06',
    evidencePhotos: ['https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80'],
    developerSolutionsCount: 3,
    clearanceNotes: '100% fee waiver granted through Vidya CSR Sponsor Portal.'
  }
];

export const SAMPLE_CIVIC_REPORTS = SAMPLE_RURAL_ISSUES;

export const SAMPLE_DEVELOPER_SOLUTIONS = [
  {
    id: 'SOL-201',
    issueId: 'RISS-2026-001',
    title: 'SustainAqua: IoT Water Leakage Detection & Pressure Telemetry Dashboard',
    developerName: 'Priya Sharma (Tech Innovator)',
    githubUrl: 'https://github.com/priyasharma/sustain-aqua-iot',
    demoUrl: 'https://sustain-aqua.vercel.app',
    techStack: ['React', 'Node.js', 'MQTT IoT', 'TailwindCSS'],
    solutionReport: 'Deploys low-cost ultrasonic water flow sensors connected to an ESP32 micro-controller. Reports real-time pipe bursts and alerts NGO field officers within 30 seconds.',
    status: 'Approved & Deployed',
    submittedDate: '2026-08-05',
    impactScoreEarned: 400
  },
  {
    id: 'SOL-202',
    issueId: 'RISS-2026-002',
    title: 'SolarGrid-Watch: Remote Battery & Vaccine Temperature Telemetry App',
    developerName: 'Karthik Raja (Full-Stack Dev)',
    githubUrl: 'https://github.com/karthik/solar-grid-watch',
    demoUrl: 'https://solargrid-watch.vercel.app',
    techStack: ['Python', 'FastAPI', 'Recharts', 'TailwindCSS'],
    solutionReport: 'Monitors clinic solar battery charge levels and sends automated WhatsApp alerts to health officers if vaccine fridge temperature drops.',
    status: 'Under NGO Field Evaluation',
    submittedDate: '2026-08-06',
    impactScoreEarned: 350
  }
];

export const SAMPLE_DISASTER_ZONES = [
  {
    id: 'DIS-101',
    district: 'Ramanagara Rural District',
    lossPercentage: 65,
    affectedCitizens: 1240,
    evacuatedCitizens: 890,
    requiredFunding: '₹15,000,000',
    allocatedFunding: '₹9,800,000',
    hazardType: 'Flash Flood & Reservoir Overflow',
    sheltersActive: 4
  },
  {
    id: 'DIS-102',
    district: 'Mandya Rural District',
    lossPercentage: 40,
    affectedCitizens: 780,
    evacuatedCitizens: 520,
    requiredFunding: '₹9,000,000',
    allocatedFunding: '₹6,200,000',
    hazardType: 'Heavy Rainfall & Agricultural Submergence',
    sheltersActive: 3
  }
];

export const SAMPLE_DOS_AND_DONTS = [
  {
    type: 'Do',
    title: 'Keep Emergency Kit Ready',
    desc: 'Keep drinking water bottles, dry rations, flashlight, and essential medicines sealed in waterproof bags.'
  },
  {
    type: 'Don’t',
    title: 'Do Not Cross Flooded Streams',
    desc: 'Never walk, swim, or drive through fast-flowing flood water or breached canal banks.'
  }
];

export const SAMPLE_FOOD_DONATIONS = [
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

export const SAMPLE_SCHEMES = [
  {
    id: 'SCH-001',
    name: 'PM Surya Ghar: Subsidized Rooftop Solar Scheme',
    category: ['Environment & Energy', 'Government Schemes'],
    sdgs: [7, 11, 13],
    provider: 'Ministry of New & Renewable Energy (MNRE)',
    description: 'Provides up to ₹78,000 direct bank grant subsidy for installing 3 kW rooftop solar power plants in rural households. Grants up to 300 units free electricity per month.',
    eligibility: {
      minAge: 18,
      maxAge: 75,
      incomeMax: 'Below ₹8.0 Lakhs',
      occupation: ['Student', 'Unemployed', 'Farmer', 'Entrepreneur', 'Any']
    },
    benefits: '₹78,000 Direct Bank Grant + 300 Free Electricity Units/Month',
    type: 'Subsidy / Grant',
    matchScore: 98,
    deadline: '2026-12-31'
  },
  {
    id: 'SCH-002',
    name: 'Post-Matric National Education Scholarship & Laptop Grant',
    category: ['Education & Financial'],
    sdgs: [4, 5, 8],
    provider: 'Ministry of Education & Social Empowerment',
    description: 'Direct 100% college tuition fee waiver + ₹3,000/month living stipend + free laptop grant for undergraduate students from low-income families.',
    eligibility: {
      minAge: 17,
      maxAge: 25,
      incomeMax: 'Below ₹3.0 Lakhs',
      occupation: ['Student']
    },
    benefits: '100% Tuition Fee Waiver + ₹3,000 Monthly Stipend + Free Laptop',
    type: 'Scholarship / Grant',
    matchScore: 96,
    deadline: '2026-09-15'
  },
  {
    id: 'SCH-003',
    name: 'PM Kisan Samman Nidhi & Organic Farming Subsidy',
    category: ['Agriculture & Support'],
    sdgs: [1, 2, 12, 15],
    provider: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Direct financial transfer of ₹6,000/year to small farmers + 80% subsidy on solar water pumps and organic bio-fertilizer kits.',
    eligibility: {
      minAge: 18,
      maxAge: 70,
      incomeMax: 'Below ₹5.0 Lakhs',
      occupation: ['Farmer']
    },
    benefits: '₹6,000 Cash Support + 80% Solar Pump Subsidy',
    type: 'Financial Entitlement',
    matchScore: 90,
    deadline: 'Ongoing'
  },
  {
    id: 'SCH-004',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    category: ['Healthcare'],
    sdgs: [3, 10],
    provider: 'National Health Authority (NHA)',
    description: 'Health insurance coverage of up to ₹5.0 Lakhs per family per year for secondary and tertiary hospitalization across 28,000+ empanelled hospitals.',
    eligibility: {
      minAge: 0,
      maxAge: 100,
      incomeMax: 'Below ₹5.0 Lakhs',
      occupation: ['Any']
    },
    benefits: '₹5.0 Lakhs Free Annual Health Insurance Cover',
    type: 'Health Protection',
    matchScore: 95,
    deadline: 'Ongoing'
  },
  {
    id: 'SCH-005',
    name: 'Green Youth Internship & AI Skill Voucher Scheme',
    category: ['Employment & Skills'],
    sdgs: [8, 9, 13],
    provider: 'Ministry of Skill Development & Entrepreneurship',
    description: 'Paid 6-month government internships in renewable energy, AI data entry, and climate resilience with a monthly stipend of ₹10,000 + skill certificate.',
    eligibility: {
      minAge: 18,
      maxAge: 29,
      incomeMax: 'Below ₹6.0 Lakhs',
      occupation: ['Student', 'Unemployed']
    },
    benefits: '₹10,000 Monthly Stipend + Govt Skill Certification',
    type: 'Paid Internship',
    matchScore: 92,
    deadline: '2026-10-01'
  },
  {
    id: 'SCH-006',
    name: 'PM Ujjwala Yojana 2.0: Free LPG Cooking Connection',
    category: ['Environment & Energy', 'Healthcare'],
    sdgs: [3, 5, 7],
    provider: 'Ministry of Petroleum & Natural Gas',
    description: 'Deposit-free LPG gas connection + free first refill and hotplate stove for adult women from low-income rural households.',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      incomeMax: 'Below ₹2.5 Lakhs',
      occupation: ['Any']
    },
    benefits: 'Free LPG Connection + First Refill Stove Kit',
    type: 'Social Entitlement',
    matchScore: 88,
    deadline: 'Ongoing'
  }
];

export const SAMPLE_CLEAN_ENERGY_SCHEMES = SAMPLE_SCHEMES.filter(s => s.category.includes('Environment & Energy'));

export const SAMPLE_OPPORTUNITIES = [
  {
    id: 'OPP-101',
    title: 'Junior AI Data Annotator & Community Survey Lead',
    provider: 'SustainAI Rural Tech Initiative',
    type: 'Paid Internship',
    location: 'Bengaluru Urban / Remote',
    stipend: '₹12,000 / month',
    duration: '6 Months',
    eligibility: 'Undergraduate Students in STEM / Humanities'
  },
  {
    id: 'OPP-102',
    title: 'Solar Microgrid Field Maintenance Trainee',
    provider: 'Gram Vikas Solar Energy Guild',
    type: 'Skill Apprenticeship',
    location: 'Ramanagara District',
    stipend: '₹10,000 / month',
    duration: '3 Months',
    eligibility: 'Diploma / ITI / High School Graduates'
  }
];

export const SAMPLE_HEALTHCARE_SERVICES = [
  {
    id: 'HCS-01',
    name: 'Ramanagara General Public Hospital (PHC)',
    type: 'Government Public Hospital',
    distance: '3.2 km away',
    address: 'Near Old Bus Stand, Ramanagara Town',
    contact: '+91 80 2727 1010',
    rating: 4.8,
    timings: '24/7 Emergency & OPD Open',
    services: ['Free General OPD', 'Free Maternal Care', '24/7 Pharmacy', 'Diagnostic Blood Tests']
  },
  {
    id: 'HCS-02',
    name: 'Seva Arogya Rural Diagnostic Clinic',
    type: 'NGO Supported Free Clinic',
    distance: '5.8 km away',
    address: 'Primary School Grounds, Ward 4, Ramanagara',
    contact: '+91 98450 77112',
    rating: 4.9,
    timings: 'Mon - Sat (9:00 AM - 5:00 PM)',
    services: ['Free Eye Screening & Glasses', 'Diabetes & BP Clinic', 'Free ECG Heart Check']
  },
  {
    id: 'HCS-03',
    name: 'Mandya Community Health Center & Tele-Medicine Hub',
    type: 'Government Public Hospital',
    distance: '8.1 km away',
    address: 'Main Road, Pandavapura, Mandya',
    contact: '+91 8232 251100',
    rating: 4.7,
    timings: '24/7 OPD & Emergency Unit',
    services: ['Free Tele-Specialist Consultation', 'Pediatric Vaccination', 'Free Blood Transfusion']
  }
];

export const SAMPLE_MEDICAL_CAMPS = [
  {
    id: 'CAMP-301',
    title: 'Free Multi-Specialty Health & Eye Checkup Camp',
    ruralDistrict: 'Ramanagara Rural District',
    venue: 'Ramanagara Primary School Grounds, Ward 4',
    date: 'August 14, 2026 (Sunday)',
    time: '9:00 AM - 4:00 PM',
    organizer: 'Seva Arogya Trust & Rotary Club Bengaluru',
    doctorsCount: '12 Specialist Doctors Attending',
    availableSlots: 45,
    specialties: ['Free Eye Screening & Glasses', 'General Medicine OPD', 'Blood Sugar & BP Test', 'ECG Heart Check']
  },
  {
    id: 'CAMP-302',
    title: 'Maternal Nutrition & Pediatric Child Immunization Camp',
    ruralDistrict: 'Mandya Rural District',
    venue: 'Pandavapura Community Hall',
    date: 'August 18, 2026 (Thursday)',
    time: '10:00 AM - 3:00 PM',
    organizer: 'Vidya Rural Health Mission & UNICEF Volunteer Wing',
    doctorsCount: '8 Pediatricians & Gynaecologists',
    availableSlots: 60,
    specialties: ['Free Immunization Vaccines', 'Maternal Iron Supplementation', 'Child Growth Monitoring']
  },
  {
    id: 'CAMP-303',
    title: 'Rural Diabetes & Cardiac Prevention Mega Screening',
    ruralDistrict: 'Tumakuru North District',
    venue: 'Gubbi Town Secondary School Campus',
    date: 'August 22, 2026 (Saturday)',
    time: '8:30 AM - 5:00 PM',
    organizer: 'Narayana Health Rural Outreach & CSR Guild',
    doctorsCount: '15 Cardiologists & Diabetologists',
    availableSlots: 85,
    specialties: ['Free Lipid Profile Test', '2D Echo Heart Scan', 'Diabetic Foot Screening']
  },
  {
    id: 'CAMP-304',
    title: 'Senior Citizen Free Dental & Joint Mobility Camp',
    ruralDistrict: 'Chikballapur East District',
    venue: 'Sidlaghatta Panchayat Grounds',
    date: 'August 28, 2026 (Friday)',
    time: '9:30 AM - 3:30 PM',
    organizer: 'Seva Arogya Trust & Manipal Dental Foundation',
    doctorsCount: '10 Dentists & Orthopedicians',
    availableSlots: 50,
    specialties: ['Free Denture Fitting', 'Arthritis Physiotherapy', 'Calcium Supplement Distribution']
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
  },
  {
    id: 'SPON-503',
    programTitle: 'TCS Digital Youth Employability & Coding Grant',
    sponsorName: 'Tata Consultancy Services Foundation',
    sponsorType: 'Corporate CSR',
    fundingAmount: 'Free 6-Month Full-Stack Certification + ₹12,000 Stipend',
    targetBeneficiaries: 'Rural Youth & Diploma Graduates in Karnataka',
    totalSponsoredStudents: 310,
    deadline: 'September 25, 2026',
    description: 'Guaranteed 6-month hands-on software development training with direct placement interviews upon completion.'
  }
];

export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    title: '☀️ PM Surya Ghar Solar Grant Approved',
    message: 'Your profile is matched for ₹78,000 rooftop solar subsidy. NGO field officer site survey scheduled.',
    timestamp: '2 hours ago',
    read: false,
    type: 'opportunity',
    link: 'clean-energy'
  },
  {
    id: 'NOTIF-002',
    title: '💻 Tech Developer Submitted Solution',
    message: 'Developer Priya Sharma submitted IoT water telemetry code for Ramanagara Ward 4 pipe burst issue.',
    timestamp: '1 day ago',
    read: false,
    type: 'clearance',
    link: 'developer-hub'
  },
  {
    id: 'NOTIF-003',
    title: '🏥 Medical Camp Appointment Confirmed',
    message: 'Free Eye Checkup Camp slot booked for August 14 at Ramanagara Primary School.',
    timestamp: '2 days ago',
    read: true,
    type: 'reminder',
    link: 'healthcare'
  }
];
