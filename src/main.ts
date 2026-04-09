import "./layout/AppLayout.js";
import "./pages/ProfileScreen.js";
import "./styles/styles.css";

const app = document.querySelector("#app");

if (app) {
  app.innerHTML = `
    <app-layout>
      <profile-screen></profile-screen>
    </app-layout>
  `;
}
