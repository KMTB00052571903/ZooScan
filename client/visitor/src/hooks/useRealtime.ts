import { useEffect } from 'react';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

export const useRealtime = () => {
  useEffect(() => {
    const channel = supabase
      .channel('announcements-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'announcements' },
        (payload) => {
          const announcement = payload.new as { message: string; animal_id?: string };
          toast(`📣 Anuncio del zoo: ${announcement.message}`, {
            duration: 8000,
            style: {
              background: 'var(--accent-primary, #16a34a)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '15px',
              padding: '16px',
              borderRadius: '16px',
            },
            icon: '🦁',
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);
};
