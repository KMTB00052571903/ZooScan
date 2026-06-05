import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { AnnouncementsContext } from './useAnnouncements';
import type { Announcement } from './useAnnouncements';
import { getRecentAnnouncements } from '../services/statsService';
import toast from 'react-hot-toast';

export const AnnouncementsProvider = ({ children }: { children: ReactNode }) => {
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);

  const loadRecent = useCallback(async () => {
    const data = await getRecentAnnouncements(5);
    setRecentAnnouncements(data);
  }, []);

  useEffect(() => { void loadRecent(); }, [loadRecent]);

  const createAnnouncement = async (message: string, animalId: number | null) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No autenticado');

    const { error } = await supabase.from('announcements').insert({
      message,
      staff_id: user.id,
      animal_id: animalId ?? null,
    });

    if (error) throw error;

    toast.success('Anuncio enviado a los visitantes 📣');
    await loadRecent();
  };

  return (
    <AnnouncementsContext.Provider value={{ recentAnnouncements, createAnnouncement }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
