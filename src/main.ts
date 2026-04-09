import "./layout/AppLayout.js";
import "./screens/ScanScreen.js";
import "./styles/styles.css";

const app = document.querySelector("#app");

if (app) {
  app.innerHTML = `
    <app-layout>
      <scan-screen></scan-screen>
    </app-layout>
  `;
}