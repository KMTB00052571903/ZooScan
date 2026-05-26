import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AnnouncementsContext } from './useAnnouncements';
import type { Announcement } from './useAnnouncements';
import { getRecentAnnouncements } from '../services/statsService';
import apiClient from '../services/apiClient';

export const AnnouncementsProvider = ({ children }: { children: ReactNode }) => {
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);

  const loadRecent = useCallback(async () => {
    const data = await getRecentAnnouncements(5);
    setRecentAnnouncements(data);
  }, []);

  useEffect(() => { void loadRecent(); }, [loadRecent]);

  const createAnnouncement = async (message: string, animalId: number | null) => {
    await apiClient.post('/announcements', { message, animal_id: animalId ?? null });
    await loadRecent();
  };

  return (
    <AnnouncementsContext.Provider value={{ recentAnnouncements, createAnnouncement }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
