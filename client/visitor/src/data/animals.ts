import type { Species } from '../models/Species';

// Correct Unsplash URLs matching the animals seeded in Supabase.
// AnimalDetailScreen and AnimalListScreen use image_url from useSpecies()
// (fetched from Supabase) — this file is a local fallback only.
export const animals = [
  { name: 'Iguana',  img: 'https://images.unsplash.com/photo-1535338454770-8be927b5a00b?w=800' },
  { name: 'Lion',    img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800' },
  { name: 'Eagle',   img: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800' },
  { name: 'Panda',   img: 'https://images.unsplash.com/photo-1598439251412-5b08d2ed5298?w=800' },
  { name: 'Chimp',   img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800' },
  { name: 'Toucan',  img: 'https://images.unsplash.com/photo-1611605645802-c21be743c321?w=800' },
];

// Legacy catalog used by gamification (QRScreen, UserContext).
// image_url intentionally omitted — real images come from Supabase via useSpecies().
export const ZOO_CATALOG: Species[] = [
  {
    id: 'iguana',
    name: 'Green iguana',
    habitat: 'Tropical rainforest',
    dangerLevel: 'Low',
    description: 'The green iguana is a large, arboreal, mostly herbivorous species of lizard native to the Caribbean.',
  },
  {
    id: 'lion',
    name: 'African lion',
    habitat: 'Savannah',
    dangerLevel: 'High',
    description: 'The lion is a large cat of the genus Panthera native to Africa and India.',
  },
  {
    id: 'eagle',
    name: 'Golden eagle',
    habitat: 'Mountains',
    dangerLevel: 'Medium',
    description: 'The golden eagle is a bird of prey living in the Northern Hemisphere.',
  },
  {
    id: 'elephant',
    name: 'African Elephant',
    habitat: 'Savannah & Forests',
    dangerLevel: 'High',
    description: 'African elephants are the largest land animals on Earth.',
  },
  {
    id: 'penguin',
    name: 'Emperor Penguin',
    habitat: 'Antarctica',
    dangerLevel: 'Low',
    description: 'The emperor penguin is the tallest and heaviest of all living penguin species.',
  },
  {
    id: 'tiger',
    name: 'Bengal Tiger',
    habitat: 'Forests & Mangroves',
    dangerLevel: 'High',
    description: 'The Bengal tiger is native to the Indian subcontinent.',
  },
];
