class FavoriteCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "";
    const type = this.getAttribute("type") || "";
    const emoji = this.getAttribute("emoji") || "🐾";

    this.innerHTML = `
      <div class="favorite-card">
        <div class="favorite-icon">${emoji}</div>
        <div class="favorite-info">
          <p class="favorite-name">${name}</p>
          <p class="favorite-type">${type}</p>
        </div>
        <div class="favorite-heart">❤️</div>
      </div>
    `;
  }
}

customElements.define("favorite-card", FavoriteCard);
export default FavoriteCard;