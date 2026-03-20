class MapView extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <section class="card">
        <h2>Mapa del Zoológico</h2>
        <p>(Aquí iría el mapa interactivo)</p>
      </section>
    `;
  }
}

customElements.define('map-view', MapView);