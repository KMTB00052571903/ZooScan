class Header extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <header class="card">
        <h1>ZooScan Explorer</h1>
      </header>
    `;
  }
}

customElements.define('app-header', Header);