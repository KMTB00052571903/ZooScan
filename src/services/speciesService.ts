import type { Species } from "../models/Species"; // Importamos la interfaz que creamos

export const speciesList: Species[] = [
  {
    id: "1",
    name: "León",
    habitat: "Sabana",
    dangerLevel: "Alto",
    description: "El león es un mamífero carnívoro de la familia de los félidos. Es conocido por su melena y su rugido poderoso."
  },
  {
    id: "2",
    name: "Elefante",
    habitat: "Sabana",
    dangerLevel: "Medio",
    description: "El elefante es el mamífero terrestre más grande. Se caracteriza por su trompa larga y sus colmillos de marfil."
  },
  {
    id: "3",
    name: "Jirafa",
    habitat: "Sabana",
    dangerLevel: "Bajo",
    description: "La jirafa es el animal más alto del mundo. Tiene un cuello largo que le permite alcanzar las hojas de los árboles altos."
  }
];

export const getSpeciesById = (id: string): Species | undefined => {
  return speciesList.find(species => species.id === id);
};