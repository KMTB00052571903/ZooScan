class SectionCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    this.innerHTML = `
      <section class="bg-[var(--primary-soft)] rounded-2xl p-4 space-y-2">
        <h2 class="text-xl font-bold text-[var(--text-main)]">${title}</h2>
        <div class="text-[var(--text-secondary)]">
          ${this.innerHTML}
        </div>
      </section>
    `;
  }
}
customElements.define("section-card", SectionCard);
export default SectionCard;
