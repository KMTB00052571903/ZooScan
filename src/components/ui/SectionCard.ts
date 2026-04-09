class SectionCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    
    this.innerHTML = `
      <div class="section-card">
        <h3 class="section-title">${title}</h3>
        <div class="section-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("section-card", SectionCard);
export default SectionCard;