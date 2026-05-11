import { createContext, useContext } from 'react';

export interface Announcement {
  id: number;
  message: string;
  created_at: string;
  animal_id: number | null;
}

export interface AnnouncementsContextType {
  recentAnnouncements: Announcement[];
  createAnnouncement: (message: string, animalId: number | null) => Promise<void>;
}

export const AnnouncementsContext = createContext<AnnouncementsContextType | undefined>(undefined);

export const useAnnouncements = () => {
  const ctx = useContext(AnnouncementsContext);
  if (!ctx) throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  return ctx;
};
