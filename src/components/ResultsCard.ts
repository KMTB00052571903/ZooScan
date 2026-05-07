interface ScanResult {
  name: string;
  habitat: string;
  danger: string;
}

class ResultsCard extends HTMLElement {
  private data: ScanResult | null = null;

  connectedCallback(): void {
    this.render();

    window.addEventListener('scan-complete', (e: Event) => {
      const customEvent = e as CustomEvent<ScanResult>;
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
        <p>Peligro: ${this.data.danger}</p>
      </section>
    `;
  }
}

customElements.define('results-card', ResultsCard);