import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { UserContext } from './useUser';

const XP_PER_SCAN = 50;
const XP_PER_LEVEL = 150;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [scannedAnimals, setScannedAnimals] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const newLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
    if (newLevel > level) setLevel(newLevel);
  }, [xp, level]);

  useEffect(() => {
    const newBadges = [...badges];
    if (scannedAnimals.length >= 1 && !newBadges.includes('First Discovery'))
      newBadges.push('First Discovery');
    if (scannedAnimals.length >= 5 && !newBadges.includes('Avid Explorer'))
      newBadges.push('Avid Explorer');
    if (scannedAnimals.includes('lion') && scannedAnimals.includes('tiger') && !newBadges.includes('Feline Friend'))
      newBadges.push('Feline Friend');
    if (newBadges.length !== badges.length) setBadges(newBadges);
  }, [scannedAnimals, badges]);

  const addXp = (amount: number) => setXp(prev => prev + amount);

  const scanAnimal = (animalId: string) => {
    if (!scannedAnimals.includes(animalId)) {
      setScannedAnimals(prev => [...prev, animalId]);
      addXp(XP_PER_SCAN);
      return true;
    }
    return false;
  };

  const resetProgress = () => {
    setXp(0);
    setLevel(1);
    setScannedAnimals([]);
    setBadges([]);
  };

  return (
    <UserContext.Provider value={{ xp, level, scannedAnimals, badges, addXp, scanAnimal, resetProgress }}>
      {children}
    </UserContext.Provider>
  );
};
