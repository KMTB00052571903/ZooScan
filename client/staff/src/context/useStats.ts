import { createContext, useContext } from 'react';
import type { DashboardStats, Animal } from '../types';
import type { FeedEvent } from '../components/LiveActivityFeed';

export interface StatsContextType {
  stats: DashboardStats | null;
  liveEvents: FeedEvent[];
  animals: Animal[];
  loading: boolean;
  lastUpdate: Date;
  refresh: () => void;
}

export const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = () => {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error('useStats must be used within a StatsProvider');
  return ctx;
};
