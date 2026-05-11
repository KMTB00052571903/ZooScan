import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Species } from '../models/Species';
import { SpeciesContext } from './useSpecies';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';

export const SpeciesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [animals, setAnimals] = useState<Species[]>([]);
  const [loadingAnimals, setLoadingAnimals] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    let mounted = true;
    setLoadingAnimals(true);

    const load = async () => {
      const { data, error } = await supabase.from('animals').select('*');

      console.log('[SpeciesContext] animals loaded:', data?.length ?? 0, error?.message ?? 'ok');

      if (!error && data && data.length > 0) {
        if (mounted) setAnimals(data as Species[]);
      } else if (error) {
        console.error('[SpeciesContext] fetch error:', error.message);
      }

      if (mounted) setLoadingAnimals(false);
    };

    load().catch(err => {
      console.error('[SpeciesContext] unexpected error:', err);
      if (mounted) setLoadingAnimals(false);
    });

    return () => { mounted = false; };
  }, [isAuthenticated]);

  return (
    <SpeciesContext.Provider value={{ animals, loadingAnimals, selectedSpecies, setSelectedSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
};
