import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './useAuth';
import { FavoritesContext } from './useFavorites';
import type { Species } from '../models/Species';
import apiClient from '../services/apiClient';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Species[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { setFavorites([]); return; }

    let mounted = true;
    setLoading(true);

    const load = async () => {
      try {
        const { data } = await apiClient.get<(Species & { danger_level?: string })[]>('/favorites');
        if (mounted) {
          setFavorites(
            data.map(a => ({ ...a, dangerLevel: a.danger_level ?? a.dangerLevel ?? '' }))
          );
        }
      } catch (err) {
        console.error('[FavoritesProvider] load error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [isAuthenticated]);

  const isFavorite = useCallback(
    (animalId: number | string) => favorites.some(f => String(f.id) === String(animalId)),
    [favorites]
  );

  const toggleFavorite = useCallback(async (animal: Species) => {
    const animalId = String(animal.id);

    if (isFavorite(animal.id)) {
      await apiClient.delete(`/favorites/${animalId}`);
      setFavorites(prev => prev.filter(f => String(f.id) !== animalId));
    } else {
      await apiClient.post('/favorites', { animal_id: animalId });
      setFavorites(prev => [...prev, animal]);
    }
  }, [isFavorite]);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
