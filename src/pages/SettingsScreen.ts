import "../layout/AppLayout.js";
import "../components/ui/PrimaryButton.js";
import "../components/ui/SectionCard.js";
import "../components/ui/ToggleSwitch.js";

class SettingsScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout>
        <div class="settings-container">

          <!-- Encabezado -->
          <div class="settings-header">
            <h1 class="settings-title">Settings</h1>
            <p class="settings-subtitle">Configure your app experience</p>
          </div>

          <!-- Preferencias -->
          <section-card title="Preferences">
            <div class="settings-item">
              <span>Notifications</span>
              <toggle-switch></toggle-switch>
            </div>
            <div class="settings-item">
              <span>Language</span>
              <span class="settings-value">English</span>
            </div>
            <div class="settings-item">
              <span>Dark mode</span>
              <toggle-switch></toggle-switch>
            </div>
          </section-card>

          <!-- Cuenta -->
          <section-card title="Account">
            <div class="settings-item">
              <span>Privacy and security</span>
              <span class="settings-arrow">→</span>
            </div>
            <div class="settings-item">
              <span>Help and support</span>
              <span class="settings-arrow">→</span>
            </div>
          </section-card>

          <!-- Acerca de -->
          <section-card title="About">
            <div class="settings-item">
              <span>Version</span>
              <span class="settings-value">1.0.0</span>
            </div>
            <div class="settings-item">
              <span>Terms and conditions</span>
              <span class="settings-arrow">→</span>
            </div>
          </section-card>

          <!-- Botón Sign out -->
          <primary-button>Sign out</primary-button>

        </div>
      </app-layout>
    `;
  }
}

customElements.define("settings-screen", SettingsScreen);
export default SettingsScreen;
