class PrimaryButton extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <button class="
        w-full
        bg-[#4C8C7A]
        text-white
        py-6
        rounded-2xl
        text-lg
        font-semibold
      ">
        <slot></slot>
      </button>
    `;
  }

}

customElements.define("primary-button", PrimaryButton);
export default PrimaryButton;