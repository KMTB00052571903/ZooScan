import { useEffect } from 'react';
import { supabase } from '../services/supabase';

export const useRealtime = (onNewScan: (data: unknown) => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('scans-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'scans' },
        (payload) => {
          onNewScan(payload.new);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [onNewScan]);
};
