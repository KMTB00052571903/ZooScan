import { SpeciesService } from "../services/speciesService.js";
import { Species } from "../models/Species.js";
import { appStore } from "../store/appStore.js";
import { router } from "../router/index.js";

class ScannerView extends HTMLElement {

  private speciesService = new SpeciesService();

  connectedCallback(): void {

    this.render();

  }

  private render(): void {

    this.innerHTML = `
      <section class="card">

        <h2>Escanear QR</h2>

        <button id="scanBtn">
          Simular Escaneo
        </button>

      </section>
    `;

    this.querySelector("#scanBtn")?.addEventListener(
      "click",
      () => this.simulateScan()
    );

  }

  private simulateScan(): void {

    // genera ID aleatorio entre 1 y 3
    const randomId = Math.floor(Math.random() * 3) + 1;

    const species: Species | undefined =
      this.speciesService.getSpeciesById(
        randomId.toString()
      );

    if (!species) return;


    // dispara evento global (ResultsCard lo escucha)
    const event = new CustomEvent<Species>(
      "scan-complete",
      {
        detail: species
      }
    );

    window.dispatchEvent(event);


    // guarda especie en store global
    appStore.setSelectedSpecies(species);


    // navega automáticamente a pantalla detalle
    router.navigate("animal");

  }

}

customElements.define("scanner-view", ScannerView);

export default ScannerView;