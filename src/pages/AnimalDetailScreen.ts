import "../layout/AppLayout";
import { appStore } from "../store/appStore.js";

class AnimalDetailScreen extends HTMLElement {

  connectedCallback() {

    this.render();

  }

  render() {

    const species = appStore.getSelectedSpecies();

    if (!species) {

      this.innerHTML = `
        <app-layout>

          <p>No animal selected</p>

        </app-layout>
      `;

      return;

    }

    this.innerHTML = `
      <app-layout>

        <div class="space-y-5">

          <h1 class="text-2xl font-bold text-[#1F3A33]">

            ${species.name}

          </h1>


          <img
            src="${species.image || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Iguana_iguana_Portoviejo_02.jpg"}"
            class="rounded-2xl w-full"
          />


          <p class="text-[#6B7C76] leading-relaxed">

            ${species.description}

          </p>


          <button class="
            w-full
            bg-[#4C8C7A]
            text-white
            py-6
            rounded-2xl
            text-lg
            font-semibold
          ">
            AR Model
          </button>


          <section>

            <h2 class="text-xl font-bold text-[#1F3A33]">

              Habitat

            </h2>

            <p class="text-[#6B7C76]">

              ${species.habitat}

            </p>

          </section>


          <section>

            <h2 class="text-xl font-bold text-[#1F3A33]">

              Danger level

            </h2>

            <p class="text-[#6B7C76]">

              ${species.dangerLevel}

            </p>

          </section>


        </div>

      </app-layout>
    `;

  }

}

customElements.define("animal-detail-screen", AnimalDetailScreen);

export default AnimalDetailScreen;