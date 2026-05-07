// Modelo que representa un animal tal como lo devuelve el backend
export interface Species {
  id: number;
  name: string;
  species: string;        // nombre científico
  habitat: string;
  description: string;
  image_url: string;
  qr_code_id: string;
  danger_level: 'Low' | 'Medium' | 'High';
  category: 'reptiles' | 'mammals' | 'birds';
  fun_facts: string[];
  // Alias para compatibilidad con los componentes existentes
  dangerLevel: string;
}
