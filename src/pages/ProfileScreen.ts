import "../layout/AppLayout.js";
import "../components/ui/StatCard.js";
import "../components/ui/PrimaryButton.js";

class ProfileScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <app-layout>

        <!-- Perfil -->
        <div class="flex flex-col items-center">
          <div class="
            w-24
            h-24
            rounded-full
            bg-[var(--primary-soft)]
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            text-[var(--text-main)]
          ">
            U
          </div>

          <h2 class="mt-3 font-bold text-[var(--text-main)]">
            User
          </h2>

          <p class="text-sm text-[var(--text-secondary)]">
            user@email.com
          </p>
        </div>

        <!-- Estadísticas -->
        <div class="flex gap-3 mt-6 justify-center">
          <stat-card value="24" label="Visited"></stat-card>
          <stat-card value="12" label="Favorites"></stat-card>
          <stat-card value="8" label="Hours"></stat-card>
        </div>

        <!-- Botones -->
        <div class="space-y-4 mt-8">
          <primary-button label="Edit profile"></primary-button>
          <primary-button label="View history"></primary-button>
        </div>

      </app-layout>
    `;
  }
}

customElements.define("profile-screen", ProfileScreen);
export default ProfileScreen;
