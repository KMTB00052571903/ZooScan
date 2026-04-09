class ToggleSwitch extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <label class="relative inline-flex items-center cursor-pointer">

        <input type="checkbox" class="sr-only peer">

        <div class="
          w-11 h-6
          bg-gray-300
          rounded-full
          peer
          peer-checked:bg-[#4C8C7A]
        ">

        </div>

      </label>
    `;
  }

}

customElements.define("toggle-switch", ToggleSwitch);
export default ToggleSwitch;