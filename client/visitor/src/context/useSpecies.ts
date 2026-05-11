import { createContext, useContext } from 'react';
import type { Species } from '../models/Species';

export interface SpeciesContextType {
  animals: Species[];
  loadingAnimals: boolean;
  selectedSpecies: Species | null;
  setSelectedSpecies: (species: Species | null) => void;
}

export const SpeciesContext = createContext<SpeciesContextType | undefined>(undefined);

export const useSpecies = () => {
  const context = useContext(SpeciesContext);
  if (context === undefined) throw new Error('useSpecies must be used within a SpeciesProvider');
  return context;
};
