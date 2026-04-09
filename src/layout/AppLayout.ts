// ===== src/layout/AppLayout.ts =====
import { router } from "../router/index.js";

class AppLayout extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'ZooScan';
    
    this.innerHTML = `
      <div class="app-container">
        <header class="app-header">
          ${this.renderHeaderContent(title)}
        </header>
        
        <main class="app-main">
          <slot></slot>
        </main>
      </div>
    `;

    this.setupHeaderListeners(title);
  }

  private renderHeaderContent(title: string): string {
    if (title === 'Profile') {
      return `
        <button class="icon-btn" id="goToQR">📷</button>
        <h1 class="header-title">${title}</h1>
        <button class="icon-btn" id="goToSettings">⚙️</button>
      `;
    } else if (title === 'Settings') {
      return `
        <button class="icon-btn" id="goBack">←</button>
        <h1 class="header-title">${title}</h1>
        <div style="width: 40px;"></div>
      `;
    } else if (title === 'QR scanning') {
      return `
        <button class="icon-btn" id="goBack">←</button>
        <h1 class="header-title">${title}</h1>
        <div style="width: 40px;"></div>
      `;
    } else if (title === 'Animal Detail') {
      return `
        <button class="icon-btn" id="goBack">←</button>
        <h1 class="header-title">${title}</h1>
        <div style="width: 40px;"></div>
      `;
    }
    
    return `<h1 class="header-title">${title}</h1>`;
  }

  private setupHeaderListeners(title: string) {
    // Navegación a QR Scanner
    const qrBtn = this.querySelector('#goToQR');
    if (qrBtn) {
      qrBtn.addEventListener('click', () => {
        router.navigate('qr');
      });
    }

    // Navegación a Settings
    const settingsBtn = this.querySelector('#goToSettings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        router.navigate('settings');
      });
    }

    // Botón de regresar
    const backBtn = this.querySelector('#goBack');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        router.navigate('profile');
      });
    }
  }
}

customElements.define("app-layout", AppLayout);
export default AppLayout;