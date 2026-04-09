import { Species } from "../models/Species.js";

class ResultsCard extends HTMLElement {

  private data: Species | null = null;

  connectedCallback(): void {

    this.render();

    window.addEventListener("scan-complete", (e: Event) => {

      const customEvent = e as CustomEvent<Species>;

      this.data = customEvent.detail;

      this.render();

    });

  }

  private render(): void {

    if (!this.data) {

      this.innerHTML = `
        <section class="card">
          <h2>Resultados</h2>
          <p>No hay datos aún</p>
        </section>
      `;

      return;

    }

    this.innerHTML = `
      <section class="card">
        <h2>${this.data.name}</h2>
        <p>Hábitat: ${this.data.habitat}</p>
        <p>Nivel de peligro: ${this.data.dangerLevel}</p>
        <p>${this.data.description}</p>
      </section>
    `;

  }

}

customElements.define("results-card", ResultsCard);