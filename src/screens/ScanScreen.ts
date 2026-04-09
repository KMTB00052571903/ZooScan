class ScanScreen extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    this.innerHTML = `
      <section class="scan-screen">

        <h2 class="scan-title">
          QR scanning
        </h2>

        <p class="scan-description">
          When you approach an exhibit, make sure to scan its respective QR code for special information.
        </p>

      </section>
    `;
  }
}

customElements.define("scan-screen", ScanScreen);

export default ScanScreen;