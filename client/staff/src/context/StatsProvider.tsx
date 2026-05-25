import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getStats, getRecentScans, getAnimalsForPanel } from '../services/statsService';
import { StatsContext } from './useStats';
import type { DashboardStats, Animal } from '../types';
import type { FeedEvent } from '../components/LiveActivityFeed';
import { useRealtime } from '../hooks/useRealtime';

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

  const handleNewScan = useCallback((data: unknown) => {
    const event = data as { animal_id: string; user_id: string; scanned_at: string };
    setLiveEvents(prev => [
      {
        animal: {
          id: Number(event.animal_id) || 0,
          name: 'Nuevo escaneo',
          category: '',
          image_url: '',
        },
        user: {
          id: 0,
          name: 'Visitante',
        },
        timestamp: event.scanned_at ?? new Date().toISOString(),
      },
      ...prev.slice(0, 29),
    ]);
    void refresh();
  }, [refresh]);

  useRealtime(handleNewScan);

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
