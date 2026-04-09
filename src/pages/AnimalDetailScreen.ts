import "../layout/AppLayout.js";
import { appStore } from "../store/appStore.js";
import "../components/ui/PrimaryButton.js";
import "../components/ui/SectionCard.js";

class AnimalDetailScreen extends HTMLElement {
  connectedCallback() {
    const species = appStore.getSelectedSpecies();

    if (!species) {
      this.innerHTML = `
        <app-layout>
          <p class="detail-empty">No animal selected</p>
        </app-layout>
      `;
      return;
    }

    this.innerHTML = `
      <app-layout>
        <div class="detail-container">

          <!-- Nombre -->
          <h1 class="detail-name">${species.name}</h1>

          <!-- Imagen -->
          <img
            src="${species.image || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Iguana_iguana_Portoviejo_02.jpg"}"
            class="detail-image"
          />

          <!-- Descripción -->
          <p class="detail-description">
            ${species.description}
          </p>

          <!-- Botón AR -->
          <primary-button>View AR Model</primary-button>

          <!-- Secciones -->
          <section-card title="Habitat">
            ${species.habitat}
          </section-card>

          <section-card title="Danger level">
            ${species.dangerLevel}
          </section-card>

        </div>
      </app-layout>
    `;
  }
}

customElements.define("animal-detail-screen", AnimalDetailScreen);
export default AnimalDetailScreen;
