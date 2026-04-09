import "../pages/ProfileScreen";
import "../pages/SettingsScreen";
import "../pages/QRScreen";
import "../pages/AnimalDetailScreen";

type Route =
  | "profile"
  | "settings"
  | "qr"
  | "animal";

class AppRouter {

  private routes: Record<Route, string> = {

    profile: "profile-screen",
    settings: "settings-screen",
    qr: "qr-screen",
    animal: "animal-detail-screen"

  };

  public navigate(route: Route) {

    const app = document.querySelector("#app");

    if (!app) return;

    const elementName = this.routes[route];

    app.innerHTML = `<${elementName}></${elementName}>`;

  }

}

export const router = new AppRouter();