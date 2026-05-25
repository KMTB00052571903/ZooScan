import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Species } from '../models/Species';
import { SpeciesContext } from './useSpecies';
import { useAuth } from './useAuth';
import apiClient from '../services/apiClient';

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
      try {
        const { data } = await apiClient.get<(Species & { danger_level?: string })[]>('/animals');
        if (mounted && data && data.length > 0) {
          setAnimals(data.map(a => ({ ...a, dangerLevel: a.danger_level ?? a.dangerLevel ?? '' })));
        }
      } catch (err) {
        console.error('[SpeciesContext] fetch error:', err);
      } finally {
        if (mounted) setLoadingAnimals(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [isAuthenticated]);

  return (
    <SpeciesContext.Provider value={{ animals, loadingAnimals, selectedSpecies, setSelectedSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
};
