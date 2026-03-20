interface ScanResult {
  name: string;
  habitat: string;
  danger: string;
}

class ScannerView extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <section class="card">
        <h2>Escanear QR</h2>
        <button id="scanBtn">Simular Escaneo</button>
      </section>
    `;

    const button = this.querySelector('#scanBtn') as HTMLButtonElement;

    button.addEventListener('click', () => {
      const data: ScanResult = {
        name: 'León',
        habitat: 'Sabana',
        danger: 'Alto'
      };

      const event = new CustomEvent<ScanResult>('scan-complete', {
        detail: data
      });

      window.dispatchEvent(event);
    });
  }
}

customElements.define('scanner-view', ScannerView);