import "../layout/AppLayout.js";
import "../components/ui/PrimaryButton.js";

class QRScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout>
        <section class="qr-container">

          <!-- Título -->
          <h1 class="qr-title">QR Scanning</h1>

          <!-- Descripción -->
          <p class="qr-description">
            When you approach an exhibit, make sure to scan its respective QR code for special information.
          </p>

          <!-- Marco del escáner -->
          <div class="qr-frame">
            <div class="qr-corner top-left"></div>
            <div class="qr-corner top-right"></div>
            <div class="qr-corner bottom-left"></div>
            <div class="qr-corner bottom-right"></div>

            <div class="qr-box">⌁</div>
          </div>

          <!-- Botón -->
          <primary-button>Scan QR Code</primary-button>

        </section>
      </app-layout>
    `;
  }
}

customElements.define("qr-screen", QRScreen);
export default QRScreen;
