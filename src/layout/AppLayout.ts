class AppLayout extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="app-container">

        <!-- HEADER -->
        <header class="app-header">

          <button class="icon-btn">
            ⚙️
          </button>

          <h1 class="header-title">
            ZooScan
          </h1>

          <button class="icon-btn">
            👤
          </button>

        </header>


        <!-- MAIN CONTENT -->
        <main class="app-main">
          <slot></slot>
        </main>


        <!-- BOTTOM NAV -->
        <nav class="bottom-nav">

          <button class="nav-btn">
            🏠
          </button>

          <button class="camera-btn active">
            📷
          </button>

          <button class="nav-btn">
            🏅
          </button>

        </nav>

      </div>
    `;
  }
}

customElements.define("app-layout", AppLayout);

export default AppLayout;