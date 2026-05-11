import apiClient from './apiClient';
import type { Species } from '../models/Species';

// ── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'visitor' | 'staff';
  stats: {
    scans_total: number;
    favorites: number;
    unique_animals: number;
    scans_today: number;
  };
}

interface AnimalRaw {
  id: number | string;
  name: string;
  species: string;
  habitat: string;
  description: string;
  image_url: string;
  qr_code_id: string;
  danger_level?: string;
  category?: string;
  fun_facts?: string[];
}

interface ScanResponse {
  success: boolean;
  animal_id: number;
  scan_count: number;
  badge: string | null;
}

interface AuthResponse {
  token: string;
  role: 'visitor' | 'staff';
  name: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toSpecies(a: AnimalRaw): Species {
  return {
    id: a.id as number,
    name: a.name,
    species: a.species,
    habitat: a.habitat,
    description: a.description,
    image_url: a.image_url,
    qr_code_id: a.qr_code_id,
    danger_level: a.danger_level as Species['danger_level'],
    category: a.category as Species['category'],
    fun_facts: a.fun_facts ?? [],
    dangerLevel: a.danger_level ?? '',
  };
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
  return data;
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', { name, email, password });
  return data;
}

// ── Animals ──────────────────────────────────────────────────────────────────

export async function getAnimals(): Promise<Species[]> {
  const { data } = await apiClient.get<AnimalRaw[]>('/animals');
  return data.map(toSpecies);
}

export async function getAnimalByQrCode(qrCode: string): Promise<Species> {
  const { data } = await apiClient.get<AnimalRaw>(`/animals/${qrCode}`);
  return toSpecies(data);
}

// ── Scans ─────────────────────────────────────────────────────────────────────

export async function registerScan(qrCodeId: string): Promise<ScanResponse> {
  const { data } = await apiClient.post<ScanResponse>('/scans', { qr_code_id: qrCodeId });
  return data;
}

// ── Favorites ─────────────────────────────────────────────────────────────────

export async function getFavorites(): Promise<Species[]> {
  const { data } = await apiClient.get<AnimalRaw[]>('/favorites');
  return data.map(toSpecies);
}

export async function addFavorite(animalId: number): Promise<void> {
  await apiClient.post('/favorites', { animal_id: animalId });
}

export async function removeFavorite(animalId: number): Promise<void> {
  await apiClient.delete(`/favorites/${animalId}`);
}

// ── Profile ───────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<UserProfile> {
  const { data } = await apiClient.get<UserProfile>('/users/me');
  return data;
}
