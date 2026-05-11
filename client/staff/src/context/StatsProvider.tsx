import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getStats, getRecentScans, getAnimalsForPanel } from '../services/statsService';
import { StatsContext } from './useStats';
import type { DashboardStats, Animal } from '../types';
import type { FeedEvent } from '../components/LiveActivityFeed';

const POLL_INTERVAL = 30_000;

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats]           = useState<DashboardStats | null>(null);
  const [liveEvents, setLiveEvents] = useState<FeedEvent[]>([]);
  const [animals, setAnimals]       = useState<Animal[]>([]);
  const [loading, setLoading]       = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const refresh = useCallback(async () => {
    try {
      const [data, events] = await Promise.all([getStats(), getRecentScans(30)]);
      setStats(data);
      setLiveEvents(events);
      setLastUpdate(new Date());
    } catch {
      // mantener datos anteriores si falla la actualización
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    getAnimalsForPanel().then(setAnimals).catch(() => {});
    const interval = setInterval(refresh, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <StatsContext.Provider value={{ stats, liveEvents, animals, loading, lastUpdate, refresh }}>
      {children}
    </StatsContext.Provider>
  );
};
