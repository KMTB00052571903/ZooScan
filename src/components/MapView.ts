import { SpeciesService } from "../services/speciesService";
import { Species } from "../models/Species";

class MapView extends HTMLElement {

  private speciesService = new SpeciesService();

  private speciesList: Species[] = [];

  connectedCallback(): void {

    this.speciesList = this.speciesService.getAllSpecies();

    this.render();

  }

  private render(): void {

    const animalsHTML = this.speciesList.map(species => {

      return `
        <li>
          <strong>${species.name}</strong>
          <br/>
          Hábitat: ${species.habitat}
        </li>
      `;

    }).join("");

    this.innerHTML = `
      <section class="card">
        <h2>Mapa del Zoológico</h2>
        <p>Animales disponibles:</p>

        <ul>
          ${animalsHTML}
        </ul>

      </section>
    `;

  }

}

customElements.define("map-view", MapView);