// Tipos del dashboard del staff ZooControl

export interface TopAnimal {
  id: number;
  name: string;
  category: string;
  image_url: string;
  scan_count: number;
}

export interface ScanByHour {
  hour: string;
  count: number;
}

export interface ActiveVisitor {
  id: number;
  name: string;
  scans_hoy: number;
}

export interface DashboardStats {
  top_animals: TopAnimal[];
  scans_by_hour: ScanByHour[];
  unique_visitors_today: number;
  scans_today: number;
  top_animal_today: { name: string; image_url: string; count: number } | null;
  scans_last_hour: number;
  active_visitors: ActiveVisitor[];
}

export interface Animal {
  id: number;
  name: string;
  category: string;
}
