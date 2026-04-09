import "../layout/AppLayout";
import "../components/ui/ToggleSwitch";

class SettingsScreen extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <app-layout>

        <div class="space-y-6">

          <div>
            <h1 class="text-2xl font-bold text-[#1F3A33]">
              Settings
            </h1>

            <p class="text-[#6B7C76]">
              Configure your app experience
            </p>
          </div>


          <!-- Preferences -->

          <section class="bg-[#DCE7E3] rounded-2xl divide-y">

            <div class="flex items-center justify-between p-4">
              <span>Notifications</span>
              <toggle-switch></toggle-switch>
            </div>

            <div class="flex items-center justify-between p-4">
              <span>Language</span>
              <span class="text-[#6B7C76]">
                English
              </span>
            </div>

            <div class="flex items-center justify-between p-4">
              <span>Dark mode</span>
              <toggle-switch></toggle-switch>
            </div>

          </section>


          <!-- Account -->

          <section class="bg-[#DCE7E3] rounded-2xl divide-y">

            <div class="flex justify-between p-4">
              <span>Privacy and security</span>
              →
            </div>

            <div class="flex justify-between p-4">
              <span>Help and support</span>
              →
            </div>

          </section>


          <!-- About -->

          <section class="bg-[#DCE7E3] rounded-2xl divide-y">

            <div class="flex justify-between p-4">
              <span>Version</span>
              <span>1.0.0</span>
            </div>

            <div class="flex justify-between p-4">
              <span>Terms and conditions</span>
              →
            </div>

          </section>


          <!-- Sign out -->

          <button class="
            w-full
            border
            border-red-400
            text-red-500
            py-3
            rounded-xl
          ">
            Sign out
          </button>

        </div>

      </app-layout>
    `;
  }
}

customElements.define("settings-screen", SettingsScreen);
export default SettingsScreen;