import { SpeciesService } from "../services/speciesService";
import { Species } from "../models/Species";

class ScannerView extends HTMLElement {

  private speciesService = new SpeciesService();

  connectedCallback(): void {

    this.innerHTML = `
      <section class="card">
        <h2>Escanear QR</h2>
        <button id="scanBtn">Simular Escaneo</button>
      </section>
    `;

    const button = this.querySelector('#scanBtn') as HTMLButtonElement;

    button.addEventListener('click', () => {

      // Simula lectura QR → ID animal
      const randomId = Math.floor(Math.random() * 3) + 1;

      const species: Species | undefined =
        this.speciesService.getSpeciesById(randomId.toString());

      if (!species) return;

      const event = new CustomEvent<Species>('scan-complete', {

        detail: species

      });

      window.dispatchEvent(event);

    });

  }

}

customElements.define('scanner-view', ScannerView);