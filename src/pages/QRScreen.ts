import "../layout/AppLayout.js";

class QRScreen extends HTMLElement {

connectedCallback(){

this.innerHTML = `

<app-layout>

<section class="qr-container">

<h1 class="qr-title">

QR scanning

</h1>

<p class="qr-description">

When you approach an exhibit, make sure to scan its respective QR code for special information.

</p>


<div class="scan-wrapper">

<div class="corner top-left"></div>

<div class="corner top-right"></div>

<div class="corner bottom-left"></div>

<div class="corner bottom-right"></div>


<div class="qr-icon">

⌁

</div>

</div>


<button class="scan-btn">

Scan QR Code

</button>

</section>

</app-layout>

`;

}

}

customElements.define("qr-screen", QRScreen);

export default QRScreen;