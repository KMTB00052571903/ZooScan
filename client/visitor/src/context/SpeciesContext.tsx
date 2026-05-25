import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Species } from '../models/Species';
import { SpeciesContext } from './useSpecies';
import { useAuth } from './useAuth';
import apiClient from '../services/apiClient';
import { supabase } from '../services/supabase';

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
      // ── Intento 1: backend Express ────────────────────────────────────────
      try {
        const response = await apiClient.get<(Species & { danger_level?: string })[]>('/animals');
        console.log('[SpeciesContext] backend response status:', response.status);
        console.log('[SpeciesContext] backend data length:', response.data?.length ?? 'null');
        console.log('[SpeciesContext] backend data[0]:', response.data?.[0]);

        if (mounted && response.data && response.data.length > 0) {
          setAnimals(response.data.map(a => ({
            ...a,
            dangerLevel: a.danger_level ?? a.dangerLevel ?? '',
          })));
          console.log('[SpeciesContext] animales cargados desde backend:', response.data.length);
          return;
        }

        console.warn('[SpeciesContext] backend devolvió array vacío, usando fallback Supabase');
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status: number; data: unknown }; message?: string };
        console.error('[SpeciesContext] error llamando backend:', {
          status: axiosErr?.response?.status,
          data: axiosErr?.response?.data,
          message: axiosErr?.message,
        });
        console.warn('[SpeciesContext] usando fallback Supabase');
      }

      // ── Fallback: Supabase directo ────────────────────────────────────────
      if (!mounted) return;
      try {
        const { data, error } = await supabase.from('animals').select('*');
        console.log('[SpeciesContext] Supabase fallback:', data?.length ?? 0, 'animales', error?.message ?? 'ok');
        if (data && data.length > 0 && mounted) {
          setAnimals(
            (data as (Species & { danger_level?: string })[]).map(a => ({
              ...a,
              dangerLevel: a.danger_level ?? a.dangerLevel ?? '',
            }))
          );
        }
      } catch (fallbackErr) {
        console.error('[SpeciesContext] fallback Supabase también falló:', fallbackErr);
      }
    };

    load().finally(() => { if (mounted) setLoadingAnimals(false); });
    return () => { mounted = false; };
  }, [isAuthenticated]);

  return (
    <SpeciesContext.Provider value={{ animals, loadingAnimals, selectedSpecies, setSelectedSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
};
