import './components/Header.js';
import './components/ScannerView.js';
import './components/ResultsCard.js';
import './components/MapView.js';

import { router } from "./router";

// pantalla inicial
window.addEventListener("DOMContentLoaded", () => {
  router.navigate("qr");
});