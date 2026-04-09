import { router } from "../router/index.js";

class AppLayout extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `

      <div class="max-w-sm mx-auto h-screen flex flex-col bg-[#F6F8F7]">

        <!-- HEADER -->

        <header class="flex items-center justify-between px-5 py-4">

          <button id="backBtn">
            ←
          </button>

          <div class="flex gap-4">

            <button id="settingsBtn">
              ⚙️
            </button>

            <button id="profileHeaderBtn">
              👤
            </button>

          </div>

        </header>


        <!-- MAIN CONTENT -->

        <main class="flex-1 overflow-y-auto px-5">

          <slot></slot>

        </main>


        <!-- BOTTOM NAV -->

        <nav class="bg-[#DCE7E3] rounded-t-3xl p-3 flex justify-around">

          <button id="homeBtn">
            🦎
          </button>

          <button id="scanBtn">
            📷
          </button>

          <button id="profileBtn">
            👤
          </button>

        </nav>

      </div>
    `;


    /* NAVIGATION EVENTS */

    this.querySelector("#homeBtn")?.addEventListener(
      "click",
      () => router.navigate("animal")
    );


    this.querySelector("#scanBtn")?.addEventListener(
      "click",
      () => router.navigate("qr")
    );


    this.querySelector("#profileBtn")?.addEventListener(
      "click",
      () => router.navigate("profile")
    );


    this.querySelector("#settingsBtn")?.addEventListener(
      "click",
      () => router.navigate("settings")
    );


    this.querySelector("#profileHeaderBtn")?.addEventListener(
      "click",
      () => router.navigate("profile")
    );


    this.querySelector("#backBtn")?.addEventListener(
      "click",
      () => window.history.back()
    );

  }

}

customElements.define("app-layout", AppLayout);

export default AppLayout;