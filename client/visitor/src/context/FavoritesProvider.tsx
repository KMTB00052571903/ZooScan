import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import { FavoritesContext } from './useFavorites';
import type { Species } from '../models/Species';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Species[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { setFavorites([]); return; }

    let mounted = true;
    setLoading(true);

    supabase.auth.getUser().then(async ({ data: { user: authUser } }) => {
      if (!mounted || !authUser) { setLoading(false); return; }

      const { data, error } = await supabase
        .from('favorites')
        .select('animals(id, name, species, habitat, description, image_url, qr_code_id, danger_level, category, fun_facts)')
        .eq('user_id', authUser.id);

      if (!mounted) return;
      if (!error && data) {
        const animals = (data as unknown[])
          .map((row) => {
            const raw = (row as Record<string, unknown>).animals;
            const a = (Array.isArray(raw) ? raw[0] : raw) as Record<string, unknown> | null;
            if (!a) return null;
            return {
              ...a,
              dangerLevel: (a.danger_level ?? '') as string,
            } as Species;
          })
          .filter((a): a is Species => a != null);
        setFavorites(animals);
      }
      setLoading(false);
    });

    return () => { mounted = false; };
  }, [isAuthenticated, user]);

  const isFavorite = useCallback(
    (animalId: number | string) => favorites.some(f => String(f.id) === String(animalId)),
    [favorites]
  );

  const toggleFavorite = useCallback(async (animal: Species) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    // Always send animal_id as a string — the favorites table uses UUID/text type.
    const animalId = String(animal.id);

    if (isFavorite(animal.id)) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', authUser.id)
        .eq('animal_id', animalId);
      setFavorites(prev => prev.filter(f => String(f.id) !== animalId));
    } else {
      await supabase
        .from('favorites')
        .insert({ user_id: authUser.id, animal_id: animalId });
      setFavorites(prev => [...prev, animal]);
    }
  }, [isFavorite]);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
