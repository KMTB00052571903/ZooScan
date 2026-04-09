import "../layout/AppLayout.js";
import "../components/ui/StatCard.js";
import "../components/ui/FavoriteCard.js";

class ProfileScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout title="Profile">
        <div class="profile-container">
          
          <!-- Avatar -->
          <div class="profile-avatar">U</div>

          <!-- Nombre y correo -->
          <h2 class="profile-name">User</h2>
          <p class="profile-email">user@email.com</p>

          <!-- Estadísticas -->
          <div class="profile-stats">
            <stat-card value="24" label="Visited"></stat-card>
            <stat-card value="12" label="Favorites"></stat-card>
            <stat-card value="8" label="Hours"></stat-card>
          </div>

          <!-- My favorites -->
          <div class="favorites-header">
            <h3 class="favorites-title">My favorites</h3>
          </div>

          <!-- Lista de favoritos -->
          <div class="favorites-list">
            <favorite-card 
              name="Green iguana" 
              type="Reptiles" 
              emoji="🦎">
            </favorite-card>
            
            <favorite-card 
              name="African lion" 
              type="Mammals" 
              emoji="🦁">
            </favorite-card>
            
            <favorite-card 
              name="Golden eagle" 
              type="Birds" 
              emoji="🦅">
            </favorite-card>
          </div>

          <!-- Acciones -->
          <div class="profile-actions">
            <div class="action-item">
              <span>Edit profile</span>
              <span class="action-arrow">›</span>
            </div>
            <div class="action-item">
              <span>View history</span>
              <span class="action-arrow">›</span>
            </div>
          </div>

        </div>
      </app-layout>
    `;
  }
}

customElements.define("profile-screen", ProfileScreen);
export default ProfileScreen;