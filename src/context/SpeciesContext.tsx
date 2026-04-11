import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Species } from '../models/Species';

interface SpeciesContextType {
  selectedSpecies: Species | null;
  setSelectedSpecies: (species: Species | null) => void;
}

const SpeciesContext = createContext<SpeciesContextType | undefined>(undefined);

export const SpeciesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  return (
    <SpeciesContext.Provider value={{ selectedSpecies, setSelectedSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
};

export const useSpecies = () => {
  const context = useContext(SpeciesContext);
  if (context === undefined) {
    throw new Error('useSpecies must be used within a SpeciesProvider');
  }
  return context;
};
