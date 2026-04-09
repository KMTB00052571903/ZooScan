import "./styles/theme.css";
import "./styles/styles.css";
import "./layout/AppLayout.js";
import "./components/ui/StatCard.js";
import "./components/ui/FavoriteCard.js";
import "./components/ui/SectionCard.js";
import "./pages/ProfileScreen.js";
import "./pages/SettingsScreen.js";
import "./pages/QRScreen.js";
import { router } from "./router/index.js"; // ← Importa tu router

const app = document.querySelector("#app");
if (app) {
  router.navigate('profile'); // ← Usa tu router para iniciar
}