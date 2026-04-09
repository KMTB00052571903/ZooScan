import "../layout/AppLayout.js";
import "../components/ui/StatCard.js";
import "../components/ui/PrimaryButton.js";

class ProfileScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout>
        <div class="profile-container">

          <!-- Avatar -->
          <div class="profile-avatar">
            U
          </div>

          <!-- Nombre y correo -->
          <h2 class="profile-name">User</h2>
          <p class="profile-email">user@email.com</p>

          <!-- Estadísticas -->
          <div class="profile-stats">
            <stat-card value="24" label="Visited"></stat-card>
            <stat-card value="12" label="Favorites"></stat-card>
            <stat-card value="8" label="Hours"></stat-card>
          </div>

          <!-- Botones -->
          <div class="profile-actions">
            <primary-button>Edit profile</primary-button>
            <primary-button>View history</primary-button>
          </div>

        </div>
      </app-layout>
    `;
  }
}

customElements.define("profile-screen", ProfileScreen);
export default ProfileScreen;
