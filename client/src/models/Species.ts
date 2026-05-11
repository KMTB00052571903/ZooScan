export interface Species {
  id: number | string;
  name: string;
  habitat: string;
  description: string;
  dangerLevel: string;
  // Optional backend fields
  species?: string;
  image_url?: string;
  qr_code_id?: string;
  danger_level?: 'Low' | 'Medium' | 'High';
  category?: 'reptiles' | 'mammals' | 'birds';
  fun_facts?: string[];
}
