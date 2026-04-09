import { Species } from "../models/Species.js";

export class SpeciesService {

  private speciesList: Species[] = [

    new Species(
      "1",
      "León",
      "Sabana",
      "Alto",
      "El león es conocido como el rey de la selva.",
      "https://biblioteca.acropolis.org/wp-content/uploads/2017/02/simbolo-leon.jpg"
    ),

    new Species(
      "2",
      "Elefante",
      "Sabana",
      "Medio",
      "El elefante es el mamífero terrestre más grande.",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK88uw5sxwztlDdrq7r309BjUttNCGBpCZ4A&s"
    ),

    new Species(
      "3",
      "Jirafa",
      "Sabana",
      "Bajo",
      "La jirafa es el animal más alto del mundo.",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Giraffa_camelopardalis_reticulata_01.JPG"
    )

  ];

  getSpeciesById(id: string): Species | undefined {

    return this.speciesList.find(
      species => species.id === id
    );

  }

  getAllSpecies(): Species[] {

    return this.speciesList;

  }

}