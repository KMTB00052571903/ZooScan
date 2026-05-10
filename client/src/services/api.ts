// Servicio de comunicación con el backend ZooScan
// Todas las llamadas pasan por el proxy de Vite → localhost:4000

import type { Species } from '../models/Species';

const API_BASE = '/api';

// Obtiene el token JWT del localStorage
function getToken(): string | null {
  return localStorage.getItem('zooscan_token');
}

// Construye los headers de autenticación
function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Transforma la respuesta del backend al formato que usa la App
function toSpecies(animal: Record<string, unknown>): Species {
  return {
    id: animal.id as number,
    name: animal.name as string,
    species: animal.species as string,
    habitat: animal.habitat as string,
    description: animal.description as string,
    image_url: animal.image_url as string,
    qr_code_id: animal.qr_code_id as string,
    danger_level: animal.danger_level as Species['danger_level'],
    category: animal.category as Species['category'],
    fun_facts: (animal.fun_facts as string[]) ?? [],
    dangerLevel: animal.danger_level as string // alias para componentes legacy
  };
}

// ── AUTH ────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
  return data as { token: string; role: 'visitor' | 'staff'; name: string };
}

export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al crear la cuenta');
  return data as { token: string; role: 'visitor' | 'staff'; name: string };
}

// ── ANIMALES ─────────────────────────────────────────────────────────────────

export async function getAnimals(): Promise<Species[]> {
  const res = await fetch(`${API_BASE}/animals`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al cargar animales');
  return (data as Record<string, unknown>[]).map(toSpecies);
}

export async function getAnimalByQrCode(qrCode: string): Promise<Species> {
  const res = await fetch(`${API_BASE}/animals/${qrCode}`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Código QR no reconocido');
  return toSpecies(data as Record<string, unknown>);
}

// ── ESCANEOS ──────────────────────────────────────────────────────────────────

export async function registerScan(qrCodeId: string) {
  const res = await fetch(`${API_BASE}/scans`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ qr_code_id: qrCodeId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al registrar escaneo');
  return data as { success: boolean; animal_id: number; scan_count: number; badge: string | null };
}

// ── FAVORITOS ─────────────────────────────────────────────────────────────────

export async function getFavorites(): Promise<Species[]> {
  const res = await fetch(`${API_BASE}/favorites`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al cargar favoritos');
  return (data as Record<string, unknown>[]).map(toSpecies);
}

export async function addFavorite(animalId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/favorites`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ animal_id: animalId })
  });
  const data = await res.json();
  if (!res.ok && res.status !== 409) throw new Error(data.error || 'Error al agregar favorito');
}

export async function removeFavorite(animalId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/favorites/${animalId}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Error al quitar favorito');
  }
}

// ── PERFIL ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
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

export async function getProfile(): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/users/me`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al cargar perfil');
  return data as UserProfile;
}
