import { supabase } from './supabase';
import type { Species } from "../models/Species";

export const speciesList: Species[] = [
  {
    id: 1,
    name: "León",
    species: "Panthera leo",
    habitat: "Sabana",
    description: "El león es un mamífero carnívoro de la familia de los félidos. Es conocido por su melena y su rugido poderoso.",
    image_url: "",
    qr_code_id: "ANIMAL_LEON_01",
    danger_level: "High",
    dangerLevel: "High",
    category: "mammals",
    fun_facts: [],
  },
  {
    id: 2,
    name: "Elefante",
    species: "Loxodonta africana",
    habitat: "Sabana",
    description: "El elefante es el mamífero terrestre más grande. Se caracteriza por su trompa larga y sus colmillos de marfil.",
    image_url: "",
    qr_code_id: "ANIMAL_ELEFANTE_01",
    danger_level: "Medium",
    dangerLevel: "Medium",
    category: "mammals",
    fun_facts: [],
  },
  {
    id: 3,
    name: "Jirafa",
    species: "Giraffa camelopardalis",
    habitat: "Sabana",
    description: "La jirafa es el animal más alto del mundo. Tiene un cuello largo que le permite alcanzar las hojas de los árboles altos.",
    image_url: "",
    qr_code_id: "ANIMAL_JIRAFA_01",
    danger_level: "Low",
    dangerLevel: "Low",
    category: "mammals",
    fun_facts: [],
  },
];

export const getSpeciesById = (id: number): Species | undefined => {
  return speciesList.find(species => species.id === id);
};

export async function getAnimalsFromDB(): Promise<Species[]> {
  const { data, error } = await supabase
    .from('animals')
    .select('id, name, species, habitat, description, image_url, qr_code_id, danger_level, category, fun_facts')
    .order('name');
  if (error) {
    console.error('getAnimalsFromDB:', error.message);
    return speciesList;
  }
  return (data ?? []) as Species[];
}
