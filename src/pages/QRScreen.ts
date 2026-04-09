// ===== src/pages/QRScreen.ts =====
import "../layout/AppLayout.js";
import { router } from "../router/index.js";

class QRScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout title="QR scanning">
        <div class="qr-container">
          
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
            <div class="qr-box">📷</div>
          </div>

          <!-- Botón Scan -->
          <button class="scan-btn" id="scanBtn">Scan QR Code</button>

          <!-- Indicadores de pasos -->
          <div class="steps-indicator">
            <div class="step active">1</div>
            <div class="step-label active">Home</div>
            
            <div class="step-line"></div>
            
            <div class="step">2</div>
            <div class="step-label">QR Code Scanner</div>
            
            <div class="step-line"></div>
            
            <div class="step">3</div>
            <div class="step-label">Help</div>
          </div>

        </div>
      </app-layout>
    `;

    this.setupListeners();
  }

  private setupListeners() {
    const scanBtn = this.querySelector('#scanBtn');
    if (scanBtn) {
      scanBtn.addEventListener('click', () => {
        console.log('Scanning QR Code...');
        // Aquí puedes agregar la lógica de escaneo
        alert('Simulando escaneo de QR');
      });
    }
  }
}

customElements.define("qr-screen", QRScreen);
export default QRScreen;