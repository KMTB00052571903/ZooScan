import { supabase } from './supabase';
import type { DashboardStats, TopAnimal, ScanByHour, ActiveVisitor, Animal } from '../types';
import type { FeedEvent } from '../components/LiveActivityFeed';
import type { Announcement } from '../context/useAnnouncements';

// Explicit FK hints required because scans.animal_id → animals and scans.user_id → profiles
const SCAN_SELECT_TODAY = `
  user_id,
  animal_id,
  created_at,
  animals:animal_id(id, name, category, image_url),
  profiles:user_id(name)
`;

type RawScan = {
  user_id: string;
  animal_id: string;
  created_at: string;
  animals: { id: string; name: string; category: string; image_url: string } | null;
  profiles: { name: string } | null;
};

function todayStart(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function hourAgo(): string {
  return new Date(Date.now() - 60 * 60 * 1000).toISOString();
}

export async function getStats(): Promise<DashboardStats> {
  const today = todayStart();
  const lastHour = hourAgo();

  const { data: rawToday, error: errToday } = await supabase
    .from('scans')
    .select(SCAN_SELECT_TODAY)
    .gte('created_at', today)
    .order('created_at', { ascending: false });

  if (errToday) console.error('[statsService] scans today error:', errToday.message);
  const todayScans = (rawToday ?? []) as unknown as RawScan[];

  const scans_today = todayScans.length;
  const unique_visitors_today = new Set(todayScans.map(s => s.user_id)).size;
  const scans_last_hour = todayScans.filter(s => s.created_at >= lastHour).length;

  // scans_by_hour — 24 slots
  const hourMap = new Map<string, number>();
  for (let i = 0; i < 24; i++) hourMap.set(String(i).padStart(2, '0') + ':00', 0);
  for (const s of todayScans) {
    const key = String(new Date(s.created_at).getHours()).padStart(2, '0') + ':00';
    hourMap.set(key, (hourMap.get(key) ?? 0) + 1);
  }
  const scans_by_hour: ScanByHour[] = Array.from(hourMap.entries()).map(([hour, count]) => ({ hour, count }));

  // top_animal_today
  const todayMap = new Map<string, { name: string; image_url: string; count: number }>();
  for (const s of todayScans) {
    const a = s.animals;
    if (!a) continue;
    const prev = todayMap.get(a.id) ?? { name: a.name, image_url: a.image_url, count: 0 };
    todayMap.set(a.id, { ...prev, count: prev.count + 1 });
  }
  const topToday = Array.from(todayMap.values()).sort((a, b) => b.count - a.count);
  const top_animal_today = topToday[0] ?? null;

  // active_visitors
  const visitorMap = new Map<string, { name: string; count: number }>();
  for (const s of todayScans) {
    const name = s.profiles?.name ?? 'Visitante';
    const prev = visitorMap.get(s.user_id) ?? { name, count: 0 };
    visitorMap.set(s.user_id, { name: prev.name, count: prev.count + 1 });
  }
  const active_visitors: ActiveVisitor[] = Array.from(visitorMap.values())
    .sort((a, b) => b.count - a.count)
    .map((v, i) => ({ id: i + 1, name: v.name, scans_hoy: v.count }));

  // top_animals (all time)
  const { data: rawAll, error: errAll } = await supabase
    .from('scans')
    .select('animal_id, animals:animal_id(id, name, category, image_url)');

  if (errAll) console.error('[statsService] scans all error:', errAll.message);
  const allScans = (rawAll ?? []) as unknown as Pick<RawScan, 'animal_id' | 'animals'>[];

  const allMap = new Map<string, { animal: TopAnimal; count: number }>();
  for (const s of allScans) {
    const a = s.animals;
    if (!a) continue;
    const prev = allMap.get(a.id);
    if (!prev) {
      allMap.set(a.id, {
        animal: { id: Number(a.id), name: a.name, category: a.category, image_url: a.image_url, scan_count: 0 },
        count: 1,
      });
    } else {
      prev.count++;
    }
  }
  const top_animals: TopAnimal[] = Array.from(allMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(({ animal, count }) => ({ ...animal, scan_count: count }));

  return {
    top_animals,
    scans_by_hour,
    unique_visitors_today,
    scans_today,
    top_animal_today,
    scans_last_hour,
    active_visitors,
  };
}

export async function getRecentScans(limit = 30): Promise<FeedEvent[]> {
  const { data: raw, error } = await supabase
    .from('scans')
    .select(SCAN_SELECT_TODAY)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) console.error('[statsService] getRecentScans error:', error.message);

  return ((raw ?? []) as unknown as RawScan[]).map((s, i) => ({
    animal: {
      id: Number(s.animals?.id ?? i),
      name: s.animals?.name ?? 'Animal desconocido',
      category: s.animals?.category ?? '',
      image_url: s.animals?.image_url ?? '',
    },
    user: {
      id: i + 1,
      name: s.profiles?.name ?? 'Visitante',
    },
    timestamp: s.created_at,
  }));
}

export async function getAnimalsForPanel(): Promise<Animal[]> {
  const { data } = await supabase
    .from('animals')
    .select('id, name, category')
    .order('name');
  return (data ?? []) as Animal[];
}

export async function getRecentAnnouncements(limit = 5): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('id, message, created_at, animal_id')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) console.error('[statsService] getRecentAnnouncements error:', error.message);
  return (data ?? []) as Announcement[];
}
