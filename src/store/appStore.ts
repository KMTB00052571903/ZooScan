import { Species } from "../models/Species";

class AppStore {

  private selectedSpecies: Species | null = null;

  setSelectedSpecies(species: Species) {

    this.selectedSpecies = species;

  }

  getSelectedSpecies() {

    return this.selectedSpecies;

  }

}

export const appStore = new AppStore();