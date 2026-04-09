import "../layout/AppLayout.js";
import "../components/ui/PrimaryButton.js";
import "../components/ui/SectionCard.js";
import "../components/ui/ToggleSwitch.js";

class SettingsScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout>
        <div class="space-y-6">

          <!-- Encabezado -->
          <div>
            <h1 class="text-2xl font-bold text-[var(--text-main)]">
              Settings
            </h1>
            <p class="text-[var(--text-secondary)]">
              Configure your app experience
            </p>
          </div>

          <!-- Preferencias -->
          <section-card title="Preferences">
            <div class="flex items-center justify-between p-2">
              <span>Notifications</span>
              <toggle-switch></toggle-switch>
            </div>
            <div class="flex items-center justify-between p-2">
              <span>Language</span>
              <span class="text-[var(--text-secondary)]">English</span>
            </div>
            <div class="flex items-center justify-between p-2">
              <span>Dark mode</span>
              <toggle-switch></toggle-switch>
            </div>
          </section-card>

          <!-- Cuenta -->
          <section-card title="Account">
            <div class="flex justify-between p-2">
              <span>Privacy and security</span>
              →
            </div>
            <div class="flex justify-between p-2">
              <span>Help and support</span>
              →
            </div>
          </section-card>

          <!-- Acerca de -->
          <section-card title="About">
            <div class="flex justify-between p-2">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div class="flex justify-between p-2">
              <span>Terms and conditions</span>
              →
            </div>
          </section-card>

          <!-- Botón Sign out -->
          <primary-button label="Sign out" color="red"></primary-button>

        </div>
      </app-layout>
    `;
  }
}

customElements.define("settings-screen", SettingsScreen);
export default SettingsScreen;
