import { storageService } from './storageService';
import { realtimeService, REALTIME_EVENTS } from './realtimeService';

// Simulated API Latency (ms)
const API_LATENCY = 150;

const delay = (ms = API_LATENCY) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // GET /api/issues
  async getRuralIssues() {
    await delay();
    return {
      status: 200,
      success: true,
      data: storageService.getRuralIssues()
    };
  },

  // POST /api/issues/create
  async createRuralIssue(issueData) {
    await delay();
    const updated = storageService.addRuralIssue(issueData);

    // Create Notification
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '📩 New Citizen Grievance Posted',
      message: `${issueData.title} in ${issueData.village} routed to NGO Operations Dashboard for clearance.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'ngo-panel'
    };
    storageService.addNotification(notif);

    // Broadcast Real-time event across tabs
    realtimeService.broadcast(REALTIME_EVENTS.ISSUE_CREATED, { issue: issueData, notification: notif });

    return {
      status: 201,
      success: true,
      message: 'Rural civic report created & broadcasted to NGO panel.',
      data: updated
    };
  },

  // PUT /api/issues/:id/clear
  async clearRuralIssue(issueId, status, notes) {
    await delay();
    const current = storageService.getRuralIssues();
    const updated = current.map(iss => {
      if (iss.id === issueId) {
        return {
          ...iss,
          status: status || 'Cleared',
          clearanceNotes: notes || 'Verified by NGO field team & marked cleared.'
        };
      }
      return iss;
    });

    storageService.saveRuralIssues(updated);

    const clearedIssue = updated.find(i => i.id === issueId);
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '✅ Citizen Grievance Cleared',
      message: `Issue "${clearedIssue?.title}" in ${clearedIssue?.village} was approved and marked CLEARED by NGO field team.`,
      timestamp: 'Just now',
      read: false,
      type: 'clearance',
      link: 'civic-reporting'
    };
    storageService.addNotification(notif);

    realtimeService.broadcast(REALTIME_EVENTS.ISSUE_CLEARED, { issueId, updatedIssue: clearedIssue, notification: notif });

    return {
      status: 200,
      success: true,
      data: updated
    };
  },

  // POST /api/solar/apply
  async applySolarGrant(reqData) {
    await delay();
    const updated = storageService.addCleanEnergyRequest(reqData);

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '☀️ New Solar Subsidy Application Streamed',
      message: `${reqData.applicantName} applied for ${reqData.solarCapacity} grant in ${reqData.village}. NGO field site inspection required.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'ngo-panel'
    };
    storageService.addNotification(notif);

    realtimeService.broadcast(REALTIME_EVENTS.SOLAR_APPLIED, { request: reqData, notification: notif });

    return {
      status: 201,
      success: true,
      message: 'PM Surya Ghar rooftop solar application submitted!',
      data: updated
    };
  },

  // PUT /api/solar/:id/approve
  async approveSolarRequest(reqId) {
    await delay();
    const current = storageService.getCleanEnergyRequests();
    const updated = current.map(r => r.id === reqId ? { ...r, status: 'Site Survey Approved & Solar Dispatched' } : r);
    
    storageService.saveCleanEnergyRequests(updated);

    const reqObj = updated.find(r => r.id === reqId);
    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '⚡ Solar Site Survey Approved!',
      message: `Rooftop solar grant application for ${reqObj?.applicantName} was approved for dispatch.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'clean-energy'
    };
    storageService.addNotification(notif);

    realtimeService.broadcast(REALTIME_EVENTS.SOLAR_APPROVED, { reqId, updatedRequest: reqObj, notification: notif });

    return {
      status: 200,
      success: true,
      data: updated
    };
  },

  // POST /api/solutions/submit
  async submitDevSolution(solutionData) {
    await delay();
    const updatedSolutions = storageService.addDeveloperSolution(solutionData);

    // Update Issue status
    const currentIssues = storageService.getRuralIssues();
    const updatedIssues = currentIssues.map(iss => {
      if (iss.id === solutionData.issueId) {
        return {
          ...iss,
          developerSolutionsCount: (iss.developerSolutionsCount || 0) + 1,
          status: 'Tech Solution Submitted'
        };
      }
      return iss;
    });
    storageService.saveRuralIssues(updatedIssues);

    const notif = {
      id: `NOTIF-${Date.now()}`,
      title: '💻 Tech Solution Code Submitted',
      message: `${solutionData.developerName} submitted GitHub code for "${solutionData.title}". 400 Dev PTS awarded.`,
      timestamp: 'Just now',
      read: false,
      type: 'opportunity',
      link: 'developer-hub'
    };
    storageService.addNotification(notif);

    realtimeService.broadcast(REALTIME_EVENTS.DEV_SOLUTION_SUBMITTED, { solution: solutionData, notification: notif });

    return {
      status: 201,
      success: true,
      data: { solutions: updatedSolutions, issues: updatedIssues }
    };
  },

  // Export NGO Field Report to CSV Download
  exportIssuesToCSV(issuesList) {
    const headers = ['Issue ID', 'Title', 'Village', 'District', 'SDG', 'Severity', 'Status', 'Date Logged', 'Clearance Notes'];
    const rows = issuesList.map(i => [
      `"${i.id}"`,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.village.replace(/"/g, '""')}"`,
      `"${i.ruralDistrict.replace(/"/g, '""')}"`,
      `"${i.sdgName || i.sdgId}"`,
      `"${i.severity}"`,
      `"${i.status}"`,
      `"${i.dateLogged}"`,
      `"${(i.clearanceNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SustainAI_NGO_Field_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
