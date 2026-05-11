import { useEffect, useState } from 'react';

export interface RealtimeEvent {
  id: string;
  type: 'scan' | 'announcement' | 'visitor_join';
  payload: Record<string, unknown>;
  timestamp: string;
}

// TODO: wire Supabase Realtime subscription when backend channel is ready
export const useRealtime = (): RealtimeEvent[] => {
  const [events, setEvents] = useState<RealtimeEvent[]>([]);

  useEffect(() => {
    // Placeholder — no active subscription
    return () => { setEvents([]); };
  }, []);

  return events;
};
