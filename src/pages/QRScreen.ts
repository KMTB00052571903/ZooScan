class QRScreen extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <app-layout>

        <h1 class="text-2xl font-bold text-[#1F3A33]">
          QR scanning
        </h1>

        <p class="text-[#6B7C76] mt-2">
          Scan exhibit QR code for info
        </p>

        <div class="
          flex
          flex-col
          items-center
          justify-center
          h-full
        ">

          <div class="
            w-44
            h-44
            border-4
            border-black
            rounded-3xl
          ">
          </div>

          <primary-button>
            Scan QR Code
          </primary-button>

        </div>

      </app-layout>
    `;
  }

}

customElements.define("qr-screen", QRScreen);
export default QRScreen;