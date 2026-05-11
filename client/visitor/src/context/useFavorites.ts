import { createContext, useContext } from 'react';
import type { Species } from '../models/Species';

export interface FavoritesContextType {
  favorites: Species[];
  loading: boolean;
  isFavorite: (animalId: number | string) => boolean;
  toggleFavorite: (animal: Species) => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
};
