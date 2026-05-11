import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { AnnouncementsContext } from './useAnnouncements';

export const AnnouncementsProvider = ({ children }: { children: ReactNode }) => {
  const createAnnouncement = async (message: string, animalId: number | null) => {
    const { error } = await supabase
      .from('announcements')
      .insert({ message, animal_id: animalId });
    if (error) throw error;
  };

  return (
    <AnnouncementsContext.Provider value={{ createAnnouncement }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
