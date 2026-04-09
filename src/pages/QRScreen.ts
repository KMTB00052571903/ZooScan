import "../layout/AppLayout.js";
import "../components/ui/PrimaryButton.js";

class QRScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout>
        <section class="scan-screen">

          <!-- Título -->
          <h1 class="scan-title">QR scanning</h1>

          <!-- Descripción -->
          <p class="scan-description">
            When you approach an exhibit, make sure to scan its respective QR code for special information.
          </p>

          <!-- Marco del escáner -->
          <div class="scanner-frame">
            <div class="scanner-corner top-left"></div>
            <div class="scanner-corner top-right"></div>
            <div class="scanner-corner bottom-left"></div>
            <div class="scanner-corner bottom-right"></div>

            <div class="qr-box">⌁</div>
          </div>

          <!-- Botón -->
          <primary-button label="Scan QR Code" color="#7fa3d4"></primary-button>

        </section>
      </app-layout>
    `;
  }
}

customElements.define("qr-screen", QRScreen);
export default QRScreen;
