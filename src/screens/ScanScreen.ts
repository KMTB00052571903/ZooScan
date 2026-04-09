class ScanScreen extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    this.innerHTML = `
      <section class="scan-container">

        <!-- Título -->
        <h2 class="scan-title">QR Scanning</h2>

        <!-- Descripción -->
        <p class="scan-description">
          When you approach an exhibit, make sure to scan its respective QR code for special information.
        </p>

        <!-- Marco del escáner -->
        <div class="scan-frame">
          <div class="scan-corner top-left"></div>
          <div class="scan-corner top-right"></div>
          <div class="scan-corner bottom-left"></div>
          <div class="scan-corner bottom-right"></div>

          <div class="scan-box">⌁</div>
        </div>

      </section>
    `;
  }
}

customElements.define("scan-screen", ScanScreen);
export default ScanScreen;
