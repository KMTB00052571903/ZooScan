import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import { UserContext } from './useUser';

const XP_PER_SCAN = 50;
const XP_PER_LEVEL = 150;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  const [email, setEmail]                 = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [xp, setXp]                       = useState(0);
  const [level, setLevel]                 = useState(1);
  const [scannedAnimals, setScannedAnimals] = useState<string[]>([]);
  const [badges, setBadges]               = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setEmail('');
      setFavoritesCount(0);
      setScannedAnimals([]);
      setXp(0);
      setLevel(1);
      setBadges([]);
      return;
    }

    let mounted = true;

    const loadUserData = async () => {
      // 1. Get session for email
      const { data: sessionData } = await supabase.auth.getSession();
      const sessionEmail = sessionData.session?.user?.email ?? '';
      if (mounted) setEmail(sessionEmail);

      const userId = sessionData.session?.user?.id;
      if (!userId) return;

      // 2. Scans — count and ids for XP/gamification
      const { data: scansData } = await supabase
        .from('scans')
        .select('animal_id')
        .eq('user_id', userId);

      if (scansData && mounted) {
        const ids = scansData.map((r: { animal_id: string | number }) => String(r.animal_id));
        setScannedAnimals(ids);
        setXp(ids.length * XP_PER_SCAN);
      }

      // 3. Favorites count
      const { count } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (mounted) setFavoritesCount(count ?? 0);
    };

    void loadUserData();
    return () => { mounted = false; };
  }, [isAuthenticated, user]);

  // Level up when XP increases
  useEffect(() => {
    const newLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
    if (newLevel > level) setLevel(newLevel);
  }, [xp, level]);

  // Badges
  useEffect(() => {
    const newBadges = [...badges];
    if (scannedAnimals.length >= 1 && !newBadges.includes('First Discovery'))
      newBadges.push('First Discovery');
    if (scannedAnimals.length >= 5 && !newBadges.includes('Avid Explorer'))
      newBadges.push('Avid Explorer');
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
    setXp(0); setLevel(1); setScannedAnimals([]); setBadges([]);
  };

  return (
    <UserContext.Provider value={{
      email, favoritesCount,
      xp, level, scannedAnimals, badges,
      addXp, scanAnimal, resetProgress,
    }}>
      {children}
    </UserContext.Provider>
  );
};
