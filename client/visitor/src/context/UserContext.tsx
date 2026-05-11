import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import { UserContext } from './useUser';

const XP_PER_SCAN = 50;
const XP_PER_LEVEL = 150;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [scannedAnimals, setScannedAnimals] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setScannedAnimals([]); setXp(0); setLevel(1); setBadges([]);
      return;
    }
    let mounted = true;
    void supabase.auth.getUser().then(async ({ data: { user: authUser } }) => {
      if (!authUser || !mounted) return;
      const { data } = await supabase
        .from('scans').select('animal_id').eq('user_id', authUser.id);
      if (data && mounted) {
        const ids = data.map((r: { animal_id: string | number }) => String(r.animal_id));
        setScannedAnimals(ids);
        setXp(ids.length * XP_PER_SCAN);
      }
    });
    return () => { mounted = false; };
  }, [isAuthenticated, user]);

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

  const scanAnimal = (animalId: string): boolean => {
    if (scannedAnimals.includes(animalId)) return false;
    setScannedAnimals(prev => [...prev, animalId]);
    addXp(XP_PER_SCAN);
    void supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) void supabase.from('scans').insert({ user_id: u.id, animal_id: animalId });
    });
    return true;
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
