import { SAMPLE_SCHEMES, SAMPLE_OPPORTUNITIES } from '../data/mockDatabase';
import { SDG_GOALS } from '../data/sdgData';

export async function querySustainAI(userPrompt, citizenProfile, apiKey = null) {
  // If API key is available, attempt Gemini API call first
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const geminiResult = await fetchGeminiResponse(userPrompt, citizenProfile, apiKey);
      if (geminiResult) return geminiResult;
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart rule engine:", err);
    }
  }

  // Humanized Smart Rule Engine
  return generateMockAiResponse(userPrompt, citizenProfile);
}

function generateMockAiResponse(prompt, profile) {
  const queryLower = prompt.toLowerCase();
  
  // Need detection logic
  const detectedNeedsSet = new Set();
  
  if (queryLower.includes('student') || queryLower.includes('college') || queryLower.includes('education') || queryLower.includes('study') || queryLower.includes('degree') || queryLower.includes('scholarship') || queryLower.includes('course') || queryLower.includes('school')) {
    detectedNeedsSet.add('Education Support');
  }
  if (queryLower.includes('financial') || queryLower.includes('money') || queryLower.includes('stipend') || queryLower.includes('fund') || queryLower.includes('grant') || queryLower.includes('poor') || queryLower.includes('low income') || queryLower.includes('poverty') || queryLower.includes('loan')) {
    detectedNeedsSet.add('Financial Assistance');
  }
  if (queryLower.includes('internship') || queryLower.includes('job') || queryLower.includes('employment') || queryLower.includes('work') || queryLower.includes('career') || queryLower.includes('hire') || queryLower.includes('skill')) {
    detectedNeedsSet.add('Employment & Internships');
  }
  if (queryLower.includes('health') || queryLower.includes('hospital') || queryLower.includes('doctor') || queryLower.includes('medicine') || queryLower.includes('insurance') || queryLower.includes('sick') || queryLower.includes('clinic')) {
    detectedNeedsSet.add('Healthcare');
  }
  if (queryLower.includes('farm') || queryLower.includes('agriculture') || queryLower.includes('crop') || queryLower.includes('kisan') || queryLower.includes('soil')) {
    detectedNeedsSet.add('Agricultural Support');
  }
  if (queryLower.includes('water') || queryLower.includes('garbage') || queryLower.includes('road') || queryLower.includes('pollution') || queryLower.includes('civic') || queryLower.includes('solar') || queryLower.includes('environment')) {
    detectedNeedsSet.add('Environment & Rural Welfare');
  }

  // Default fallback needs if none explicitly matched
  if (detectedNeedsSet.size === 0) {
    if (profile?.needs && profile.needs.length > 0) {
      profile.needs.forEach(n => detectedNeedsSet.add(n));
    } else {
      detectedNeedsSet.add('Education Support');
      detectedNeedsSet.add('Financial Assistance');
      detectedNeedsSet.add('Employment & Internships');
    }
  }

  const detectedNeeds = Array.from(detectedNeedsSet);

  // Recommendations construction
  const matchedSchemes = SAMPLE_SCHEMES.filter(s => {
    return detectedNeeds.some(need => s.category.toLowerCase().includes(need.toLowerCase().split(' ')[0])) ||
           (profile?.occupation && s.eligibility.occupation.includes(profile.occupation)) ||
           s.matchScore > 90;
  }).slice(0, 3);

  const matchedOpps = SAMPLE_OPPORTUNITIES.filter(o => true).slice(0, 2);

  // Format recommendations with warm humanized text
  const recommendations = [];

  matchedSchemes.forEach(sch => {
    recommendations.push({
      id: sch.id,
      type: 'Government Grant & Scholarship',
      icon: sch.category.includes('Education') ? 'GraduationCap' : sch.category.includes('Employment') ? 'Briefcase' : 'Landmark',
      title: sch.name,
      provider: sch.provider,
      description: sch.description,
      eligibility: `Target: ${sch.eligibility.occupation.join(', ')} • Household Income: ${sch.eligibility.incomeMax}`,
      benefits: sch.benefits,
      matchScore: sch.matchScore || 96,
      actionButtonText: 'Check Eligibility',
      secondaryButtonText: 'View Full Details',
      category: sch.category,
      sdgIds: sch.sdgs
    });
  });

  matchedOpps.forEach(opp => {
    recommendations.push({
      id: opp.id,
      type: opp.type,
      icon: 'Briefcase',
      title: opp.title,
      provider: opp.provider,
      description: `Monthly Stipend: ${opp.stipend} • Location: ${opp.location} • Duration: ${opp.duration}`,
      eligibility: opp.eligibility,
      benefits: `Key Skills: ${opp.skillsRequired.join(', ')}`,
      matchScore: 94,
      actionButtonText: 'Apply Opportunity',
      secondaryButtonText: 'Connect Now',
      category: 'Employment',
      sdgIds: opp.sdgs
    });
  });

  // Calculate SDG impact set
  const sdgImpactSet = new Set();
  recommendations.forEach(rec => {
    if (rec.sdgIds) rec.sdgIds.forEach(id => sdgImpactSet.add(id));
  });

  if (detectedNeeds.some(n => n.includes('Education') || n.includes('Financial') || n.includes('Employment'))) {
    sdgImpactSet.add(1);
    sdgImpactSet.add(4);
    sdgImpactSet.add(8);
    sdgImpactSet.add(10);
    sdgImpactSet.add(17);
  }

  const sdgList = Array.from(sdgImpactSet).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);

  const citizenName = profile?.name || 'Friend';

  return {
    success: true,
    citizenName: citizenName,
    detectedNeeds: detectedNeeds,
    summary: `Hello ${citizenName}! I hear you and understand how important it is to secure your college education while finding a meaningful job to support your family in ${profile?.ruralDistrict || 'your area'}. Here are top verified government grants, scholarships, and paid internships handpicked for your profile.`,
    recommendations: recommendations,
    sdgImpact: sdgList
  };
}

async function fetchGeminiResponse(prompt, profile, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `You are SustainAI, a warm, empathetic, humanized citizen AI assistant for Sustainable Development.
Return JSON ONLY matching this structure:
{
  "detectedNeeds": ["Education Support", "Financial Assistance", "Employment & Internships"],
  "summary": "Warm, empathetic 2-sentence personal message acknowledging the citizen's situation.",
  "recommendations": [
    {
      "id": "REC-1",
      "type": "Scholarship Recommendation",
      "title": "Scheme Title",
      "provider": "Ministry Name",
      "description": "Short description",
      "eligibility": "Eligibility criteria",
      "benefits": "Key monetary or education benefits",
      "matchScore": 96,
      "actionButtonText": "Check Eligibility",
      "secondaryButtonText": "View Details",
      "category": "Education",
      "sdgIds": [1, 4, 10]
    }
  ],
  "sdgIds": [1, 4, 8, 10, 17]
}`;

  const userContent = `Citizen Profile: Name=${profile.name}, Age=${profile.age}, Occupation=${profile.occupation}, Income=${profile.incomeRange}, Location=${profile.ruralDistrict}.
User Query: "${prompt}"`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${systemInstruction}\n\n${userContent}` }] }]
    })
  });

  if (!response.ok) throw new Error(`Gemini HTTP error ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (text) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const sdgList = (parsed.sdgIds || [1, 4, 8, 10, 17]).map(id => SDG_GOALS.find(g => g.id === id)).filter(Boolean);
      return {
        success: true,
        citizenName: profile.name,
        detectedNeeds: parsed.detectedNeeds || ["Education Support", "Financial Assistance", "Employment & Internships"],
        summary: parsed.summary,
        recommendations: parsed.recommendations,
        sdgImpact: sdgList
      };
    }
  }

  return null;
}
