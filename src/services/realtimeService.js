// Real-Time Cross-Tab Live Sync Event Bus via BroadcastChannel
const CHANNEL_NAME = 'sustain_ai_realtime_events';

let channel = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
  } catch (e) {
    console.warn('[realtimeService] BroadcastChannel unavailable, fallback to window storage events.', e);
  }
}

export const REALTIME_EVENTS = {
  ISSUE_CREATED: 'ISSUE_CREATED',
  ISSUE_CLEARED: 'ISSUE_CLEARED',
  SOLAR_APPLIED: 'SOLAR_APPLIED',
  SOLAR_APPROVED: 'SOLAR_APPROVED',
  DEV_SOLUTION_SUBMITTED: 'DEV_SOLUTION_SUBMITTED',
  FOOD_DONATED: 'FOOD_DONATED',
  FOOD_CLAIMED: 'FOOD_CLAIMED',
  CAMP_BOOKED: 'CAMP_BOOKED',
  DATABASE_RESET: 'DATABASE_RESET'
};

export const realtimeService = {
  // Broadcast event to all open tabs / windows
  broadcast(eventType, payload = {}) {
    const eventObj = {
      type: eventType,
      payload,
      timestamp: Date.now()
    };

    if (channel) {
      channel.postMessage(eventObj);
    } else {
      // Fallback using localStorage item update to wake up window.onstorage
      localStorage.setItem('sustainai_last_event', JSON.stringify(eventObj));
    }
  },

  // Subscribe to real-time events in React components
  subscribe(callback) {
    if (channel) {
      const handler = (event) => {
        if (event.data) {
          callback(event.data);
        }
      };
      channel.addEventListener('message', handler);

      return () => {
        channel.removeEventListener('message', handler);
      };
    } else {
      const storageHandler = (e) => {
        if (e.key === 'sustainai_last_event' && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            callback(data);
          } catch (err) {
            console.error('[realtimeService] Error parsing storage event', err);
          }
        }
      };
      window.addEventListener('storage', storageHandler);

      return () => {
        window.removeEventListener('storage', storageHandler);
      };
    }
  }
};
