import { Species } from "../models/Species";

export class SpeciesService {

  private speciesList: Species[] = [

    new Species(
      "1",
      "Leon",
      "Sabana",
      "Alto",
      "El león es un mamífero carnívoro de la familia de los félidos."
    ),

    new Species(
      "2",
      "Elefante",
      "Sabana",
      "Medio",
      "El elefante es el mamífero terrestre más grande."
    ),

    new Species(
      "3",
      "Jirafa",
      "Sabana",
      "Bajo",
      "La jirafa es el animal más alto del mundo."
    )

  ];

  getSpeciesById(id: string): Species | undefined {

    return this.speciesList.find(species => species.id === id);

  }

  getAllSpecies(): Species[] {

    return this.speciesList;

  }

}