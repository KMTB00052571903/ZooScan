class StatCard extends HTMLElement {
  connectedCallback() {
    const value = this.getAttribute("value") || "";
    const label = this.getAttribute("label") || "";
    
    this.innerHTML = `
      <div class="stat-card">
        <p class="stat-value">${value}</p>
        <p class="stat-label">${label}</p>
      </div>
    `;
  }
}

customElements.define("stat-card", StatCard);
export default StatCard;