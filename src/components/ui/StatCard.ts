class StatCard extends HTMLElement {
  connectedCallback() {
    const value = this.getAttribute("value");
    const label = this.getAttribute("label");

    this.innerHTML = `
      <div class="
        bg-[#DCE7E3]
        rounded-2xl
        px-5 py-4
        text-center
        w-24
      ">
        <p class="text-xl font-bold text-[#1F3A33]">
          ${value}
        </p>

        <p class="text-sm text-[#6B7C76]">
          ${label}
        </p>
      </div>
    `;
  }
}

customElements.define("stat-card", StatCard);
export default StatCard;