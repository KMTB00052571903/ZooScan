// ===== src/pages/SettingsScreen.ts =====
import "../layout/AppLayout.js";
import "../components/ui/SectionCard.js";
import { router } from "../router/index.js";

class SettingsScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout title="Settings">
        <div class="settings-container">
          
          <!-- Subtitle -->
          <p class="settings-subtitle">Configure your app experience</p>

          <!-- Preferences Section -->
          <section-card title="Preferences">
            <div class="settings-item">
              <span>Notifications</span>
              <span>🔒</span>
            </div>
            <div class="settings-item">
              <span>Language</span>
              <span class="settings-value">English</span>
            </div>
            <div class="settings-item">
              <span>Dark mode</span>
              <span class="settings-value">🟢</span>
            </div>
          </section-card>

          <!-- Account Section -->
          <section-card title="Account">
            <div class="settings-item">
              <span>Privacy and security</span>
              <span class="settings-arrow">➡️</span>
            </div>
            <div class="settings-item">
              <span>Help and support</span>
              <span class="settings-arrow">➡️</span>
            </div>
          </section-card>

          <!-- About Section -->
          <section-card title="About">
            <div class="settings-item">
              <span>Version</span>
              <span class="settings-value">1.0.0</span>
            </div>
            <div class="settings-item">
              <span>Terms and conditions</span>
              <span class="settings-arrow">➡️</span>
            </div>
          </section-card>

          <!-- Sign Out Button -->
          <button class="signout-btn" id="signOutBtn">➡️ Sign out</button>

        </div>
      </app-layout>
    `;

    this.setupListeners();
  }

  private setupListeners() {
    const signOutBtn = this.querySelector('#signOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        console.log('Sign out clicked');
        router.navigate('profile');
      });
    }
  }
}

customElements.define("settings-screen", SettingsScreen);
export default SettingsScreen;