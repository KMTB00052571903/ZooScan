class FavoriteCard extends HTMLElement {
  connectedCallback() {

    const name = this.getAttribute("name");
    const type = this.getAttribute("type");

    this.innerHTML = `
      <div class="
        flex items-center
        justify-between
        bg-white
        rounded-2xl
        px-4 py-3
        shadow-sm
        border
      ">

        <div class="flex gap-3 items-center">

          <div class="
            w-12 h-12
            bg-[#DCE7E3]
            rounded-xl
          ">
          </div>

          <div>
            <p class="font-semibold text-[#1F3A33]">
              ${name}
            </p>

            <p class="text-sm text-[#6B7C76]">
              ${type}
            </p>
          </div>

        </div>

        ❤️

      </div>
    `;
  }
}

customElements.define("favorite-card", FavoriteCard);
export default FavoriteCard;