import { Species } from "../models/Species";

export class SpeciesService {

  private speciesList: Species[] = [

    new Species(
      "1",
      "León",
      "Sabana",
      "Alto",
      "El león es conocido como el rey de la selva."
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