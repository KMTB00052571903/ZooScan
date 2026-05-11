import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Species } from '../models/Species';
import { SpeciesContext } from './useSpecies';

export const SpeciesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  return (
    <SpeciesContext.Provider value={{ selectedSpecies, setSelectedSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
};
