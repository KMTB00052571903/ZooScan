import { Species } from "../models/Species";

export class SpeciesService {

  private speciesList: Species[] = [

    new Species(
      "1",
      "Leon",
      "Sabana",
      "Alto",
      "El león es un mamífero carnívoro de la familia de los félidos. Es conocido por su melena y su rugido poderoso."
    ),

    new Species(
      "2",
      "Elefante",
      "Sabana",
      "Medio",
      "El elefante es el mamífero terrestre más grande. Se caracteriza por su trompa larga y sus colmillos de marfil."
    ),

    new Species(
      "3",
      "Jirafa",
      "Sabana",
      "Bajo",
      "La jirafa es el animal más alto del mundo. Tiene un cuello largo que le permite alcanzar las hojas de los árboles altos."
    )

  ];

  getSpeciesById(id: string): Species | undefined {

    return this.speciesList.find(species => species.id === id);

  }

}