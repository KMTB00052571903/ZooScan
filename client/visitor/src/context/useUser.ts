import { createContext, useContext } from 'react';

export interface UserContextType {
  email: string;
  favoritesCount: number;
  xp: number;
  level: number;
  scannedAnimals: string[];
  badges: string[];
  addXp: (amount: number) => void;
  scanAnimal: (animalId: string) => boolean;
  resetProgress: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  return context;
};
