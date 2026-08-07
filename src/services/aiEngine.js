import { SAMPLE_SCHEMES, SAMPLE_OPPORTUNITIES, SAMPLE_MEDICAL_CAMPS, SAMPLE_FOOD_DONATIONS, SAMPLE_RURAL_ISSUES } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';

export const aiEngine = {
  
  // 1. Generate Today's AI Daily Briefing
  generateAiDailyBriefing(profile) {
    const name = profile?.name || 'Arun Kumar';
    const district = profile?.ruralDistrict || 'Ramanagara Rural District';
    const isLowIncome = (profile?.incomeCategory === 'Low Income') || (profile?.incomeRange?.includes('Below'));
    
    const items = [];
    items.push('🎓 4 Scholarships & Fee Waivers Matched');
    items.push(`🏥 1 Free Eye & Health Camp in ${district} (2 km away)`);
    if (isLowIncome) items.push('☀️ Eligible for ₹78,000 PM Surya Ghar Solar Subsidy');
    items.push('💼 6 Green Internships & Data Entry Jobs Available');
    items.push('⚠ Flash Flood Warning: 48 mm/h rainfall in Ramanagara basin');
    items.push('🍛 120 Cooked Meals Available at Ward 2 Shelter');

    return {
      greeting: `Good Morning, ${name} 👋`,
      briefingSummary: `SustainAI OS has analyzed your profile (${profile?.occupation || 'Student'}, ${district}). You have 4 high-priority scheme matches, 1 nearby medical camp, and a climate alert today.`,
      items: items,
      aiReadinessScore: 94,
      personaRole: profile?.occupation === 'Student' ? 'Youth Scholar & Climate Contributor' : 'Community Leader'
    };
  },

  // 2. Generate Explainable AI Recommendation Cards (with Match Scores & Why Recommended)
  generateExplainableRecommendations(profile) {
    const isStudent = profile?.occupation === 'Student' || profile?.educationLevel?.includes('Undergraduate') || profile?.educationLevel?.includes('High School');
    const isLowIncome = profile?.incomeCategory === 'Low Income' || profile?.incomeRange?.includes('Below');
    const state = profile?.state || 'Karnataka';
    const age = profile?.age || 20;

    const recommendations = [
      {
        id: 'AI-REC-001',
        title: 'Post-Matric National Education Scholarship & Laptop Grant',
        category: 'Scholarships & Education',
        priority: 'High Priority',
        priorityColor: 'emerald',
        confidenceScore: 98,
        matchLabel: '98% Match - Highly Recommended',
        description: 'Provides 100% college tuition fee waiver + ₹3,000/month living stipend + free laptop for low-income undergraduate students.',
        reasons: [
          `✔ ${profile?.educationLevel || 'Undergraduate'} Student Status`,
          `✔ ${state} Resident Verification`,
          `✔ Annual Household Income ${profile?.incomeRange || 'Below ₹2.5 Lakhs'}`,
          `✔ Age Criteria (${age} years within 18–25 range)`,
          '✔ Verified Government Eligibility Criteria'
        ],
        sdgTags: [4, 5, 8],
        impactPts: 350,
        actionText: 'Check Scholarship Eligibility',
        targetView: 'education-jobs'
      },
      {
        id: 'AI-REC-002',
        title: 'Free Multi-Specialty Health & Eye Checkup Camp',
        category: 'Healthcare & Wellness',
        priority: 'High Priority',
        priorityColor: 'rose',
        confidenceScore: 96,
        matchLabel: '96% Match - Nearby Service',
        description: '100% free eye screening, prescription glasses, general OPD checkup, and ECG screening at Ramanagara Primary School.',
        reasons: [
          `✔ Located in ${profile?.ruralDistrict || 'Ramanagara Rural District'} (2 km away)`,
          '✔ Free Citizen Healthcare Entitlement',
          '✔ 12 Empanelled Specialist Doctors Attending',
          '✔ Priority Slot Reservation Active'
        ],
        sdgTags: [3, 10],
        impactPts: 200,
        actionText: 'Book Free Appointment',
        targetView: 'healthcare'
      },
      {
        id: 'AI-REC-003',
        title: 'PM Surya Ghar: Subsidized Rooftop Solar Scheme',
        category: 'Clean Energy & Savings',
        priority: 'Medium Priority',
        priorityColor: 'amber',
        confidenceScore: 94,
        matchLabel: '94% Match - Direct Bank Credit',
        description: 'Provides up to ₹78,000 direct bank grant subsidy for installing 3 kW rooftop solar power plants in rural households.',
        reasons: [
          `✔ Household Income (${profile?.incomeRange || 'Low Income'}) qualifies for 100% subsidy`,
          `✔ Located in ${profile?.ruralDistrict || 'Ramanagara Rural District'}`,
          '✔ Grants up to 300 units free electricity per month',
          '✔ NGO Field Site Survey Available'
        ],
        sdgTags: [7, 11, 13],
        impactPts: 400,
        actionText: 'Apply Solar Grant',
        targetView: 'clean-energy'
      },
      {
        id: 'AI-REC-004',
        title: 'Junior AI Data Annotator & Community Survey Lead',
        category: 'Employment & Skills',
        priority: 'Medium Priority',
        priorityColor: 'blue',
        confidenceScore: 92,
        matchLabel: '92% Match - Skill Fit',
        description: 'Paid 6-month green internship with ₹12,000/month stipend in AI data entry, telemetry, and community survey leadership.',
        reasons: [
          `✔ Matched Skills: ${Array.isArray(profile?.skills) ? profile.skills.slice(0, 2).join(', ') : 'Python, Web Basics'}`,
          `✔ Student / Youth Category Eligibility (${age} years old)`,
          '✔ Remote / Village Kiosk Flexibility',
          '✔ Direct Government Skill Certificate'
        ],
        sdgTags: [8, 9, 10],
        impactPts: 300,
        actionText: 'Apply Opportunity',
        targetView: 'education-jobs'
      },
      {
        id: 'AI-REC-005',
        title: 'Zero Waste Community Excess Food Assistance Hub',
        category: 'Food Security & Relief',
        priority: 'Medium Priority',
        priorityColor: 'orange',
        confidenceScore: 90,
        matchLabel: '90% Match - Local Relief',
        description: '120 fresh cooked vegetarian meals available for pick-up at Ramanagara Ward 2 Shelter Kiosk contributed by CSR caterers.',
        reasons: [
          `✔ Located in ${profile?.village || 'Ramanagara Ward 2'}`,
          '✔ 100% Free Food Assistance Entitlement',
          '✔ Prepared fresh today at 1:00 PM',
          '✔ Supported by Gram Vikas NGO Kitchen'
        ],
        sdgTags: [2, 12],
        impactPts: 150,
        actionText: 'Claim Meal Assistance',
        targetView: 'food-donation'
      },
      {
        id: 'AI-REC-006',
        title: 'Join Gram Samriddhi Tree Plantation & Canal Protection Drive',
        category: 'Environment & Climate',
        priority: 'Low Priority',
        priorityColor: 'teal',
        confidenceScore: 88,
        matchLabel: '88% Match - Volunteer Drive',
        description: 'Earn 100 Universal Impact PTS by participating in Saturday native tree planting along Arkavathi river canal banks.',
        reasons: [
          '✔ Environmental Interest Matched in Profile',
          `✔ Nearest Event in ${profile?.ruralDistrict || 'Ramanagara'}`,
          '✔ Free Volunteer Badge & Plants Provided'
        ],
        sdgTags: [13, 15],
        impactPts: 100,
        actionText: 'Join Plantation Drive',
        targetView: 'sdg-impact'
      }
    ];

    return recommendations;
  },

  // 3. Generate 360° AI Citizen Persona Badges
  generateCitizenPersona(profile) {
    const badges = [];
    
    if (profile?.occupation === 'Student') {
      badges.push({ title: 'Student Scholar', color: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30 font-extrabold', icon: '🎓' });
    } else if (profile?.occupation === 'Farmer') {
      badges.push({ title: 'Agri Innovator', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-extrabold', icon: '🌾' });
    } else {
      badges.push({ title: 'Active Citizen', color: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30 font-extrabold', icon: '👤' });
    }

    if (profile?.incomeCategory === 'Low Income' || profile?.incomeRange?.includes('Below')) {
      badges.push({ title: 'Low Income Household', color: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 font-extrabold', icon: '🏷️' });
    }

    badges.push({ title: 'Climate Contributor', color: 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30 font-extrabold', icon: '🌿' });
    badges.push({ title: 'Healthcare Priority', color: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30 font-extrabold', icon: '🩺' });

    return badges;
  },

  // 4. Generate AI Risk Analysis Cards & Mitigations
  generateAiRiskAnalysis(profile) {
    const district = profile?.ruralDistrict || 'Ramanagara Rural District';

    return [
      {
        id: 'RISK-01',
        category: 'Climate & Flood Risk',
        title: 'Flash Flood & River Canal Spillover Threat',
        riskLevel: 'High Risk',
        badgeColor: 'bg-red-600 text-white',
        district: district,
        reason: 'Doppler satellite radar shows 48 mm/h rainfall in Kanakapura basin. River Arkavathi water levels are +2.4m above warning threshold.',
        suggestedAction: 'Take State Highway 17 elevated bypass route. Keep emergency survival kit ready at home.',
        sdgTag: 'SDG 13 Climate Action'
      },
      {
        id: 'RISK-02',
        category: 'Education Dropout Risk',
        title: 'High School / Degree Tuition Fee Shortfall',
        riskLevel: 'Medium Risk',
        badgeColor: 'bg-amber-500 text-slate-950 font-bold',
        district: district,
        reason: 'Annual college tuition fee due date approaching in 30 days without registered scholarship grant.',
        suggestedAction: 'Apply immediately for Post-Matric National Education Scholarship & Infosys CSR Grant.',
        sdgTag: 'SDG 4 Quality Education'
      },
      {
        id: 'RISK-03',
        category: 'Healthcare Access Risk',
        title: 'Preventive Health & Eye Checkup Gap',
        riskLevel: 'Low Risk',
        badgeColor: 'bg-blue-600 text-white',
        district: district,
        reason: 'No general OPD health screening logged for household in the last 6 months.',
        suggestedAction: 'Book free slot at Ramanagara Primary School Multi-Specialty Health Camp.',
        sdgTag: 'SDG 3 Good Health'
      }
    ];
  },

  // 5. Universal Impact Score Breakdown (Citizen, Community, Environmental, Healthcare, Education, Governance)
  generateUniversalImpactBreakdown(profile) {
    const totalScore = profile?.impactScore || 840;
    
    return {
      totalScore: totalScore,
      breakdown: [
        { title: 'Citizen Contribution', score: Math.round(totalScore * 0.25), icon: '👤', color: 'emerald' },
        { title: 'Community & NGO Work', score: Math.round(totalScore * 0.20), icon: '🤝', color: 'teal' },
        { title: 'Environmental & Solar', score: Math.round(totalScore * 0.20), icon: '☀️', color: 'amber' },
        { title: 'Healthcare Access', score: Math.round(totalScore * 0.15), icon: '🩺', color: 'rose' },
        { title: 'Education & Skills', score: Math.round(totalScore * 0.12), icon: '🎓', color: 'blue' },
        { title: 'Governance & Civic', score: Math.round(totalScore * 0.08), icon: '🏛️', color: 'purple' }
      ]
    };
  },

  // 6. 17 UN SDG Impact Analytics Data Generator
  generate17SdgAnalytics() {
    return SDG_GOALS.map((goal, idx) => {
      // Create progress percentage and active recommendation count per SDG
      const progress = Math.min(100, Math.max(35, 95 - (idx * 3.5)));
      const activeCount = Math.floor(2 + ((17 - idx) % 5));
      const scorePts = Math.round(progress * 12);

      return {
        ...goal,
        progressPercentage: Math.round(progress),
        contributionScore: scorePts,
        activeRecommendationsCount: activeCount
      };
    });
  }
};
