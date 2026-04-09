class ProfileScreen extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <app-layout>

        <div class="flex flex-col items-center">

          <div class="
            w-24
            h-24
            rounded-full
            bg-[#DCE7E3]
            flex
            items-center
            justify-center
            text-2xl
          ">
            U
          </div>

          <h2 class="mt-3 font-bold">
            User
          </h2>

          <p class="text-sm text-gray-500">
            user@email.com
          </p>

        </div>


        <div class="flex gap-3 mt-6 justify-center">

          <stat-card value="24" label="Visited"></stat-card>
          <stat-card value="12" label="Favorites"></stat-card>
          <stat-card value="8" label="Hours"></stat-card>

        </div>


      </app-layout>
    `;
  }

}

customElements.define("profile-screen", ProfileScreen);
export default ProfileScreen;