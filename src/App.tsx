import { useEffect } from "react";
import { Catalog } from "./components/Catalog";
import { Dice } from "./components/Dice";
import { GamePage } from "./components/GamePage";
import { Icon } from "./components/Icon";
import type { IconName } from "./components/Icon";
import { MatchesPage } from "./components/Matches";
import { Tools } from "./components/Tools";
import { useMatches } from "./lib/store";
import { pageKeyOf, supportsVT, useDark, useRoute } from "./lib/ui";

const NAV: { id: string; href: string; label: string; icon: IconName }[] = [
  { id: "home", href: "#/", label: "Estante", icon: "shelf" },
  { id: "search", href: "#/buscar", label: "Buscar", icon: "search" },
  { id: "matches", href: "#/partidas", label: "Partidas", icon: "trophy" },
  { id: "tools", href: "#/herramientas", label: "Útiles", icon: "hourglass" },
];

export function App() {
  const route = useRoute();
  const [dark, toggleDark] = useDark();
  const pending = useMatches().length;
  const pageKey = pageKeyOf(route);
  const activeNav = route.page === "home" ? (route.search ? "search" : "home") : route.page === "game" ? "home" : route.page;

  useEffect(() => {
    document.documentElement.classList.toggle("vt", supportsVT());
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <a className="brand" href="#/" aria-label="Ludoteca de Fede, inicio">
            <Dice face={5} className="bounce" />
            <span>Ludoteca de Fede</span>
          </a>
          <nav className="topnav" aria-label="Secciones">
            {NAV.filter((n) => n.id !== "search").map((n) => (
              <a key={n.id} className={`navbtn wide-only ${activeNav === n.id ? "on" : ""}`} href={n.href} aria-current={activeNav === n.id ? "page" : undefined}>
                <Icon name={n.icon} />
                <span>{n.id === "tools" ? "Herramientas" : n.label}</span>
              </a>
            ))}
            <button className="navbtn" onClick={toggleDark} aria-label={dark ? "Pasar a modo día" : "Pasar a modo noche de juegos"} aria-pressed={dark}>
              <Icon name={dark ? "sun" : "moon"} />
            </button>
          </nav>
        </div>
      </header>

      <div key={pageKey} className="route">
        {route.page === "home" && <Catalog focusSearch={route.search} />}
        {route.page === "tools" && <Tools />}
        {route.page === "matches" && <MatchesPage />}
        {route.page === "game" && <GamePage slug={route.slug} tab={route.tab} dark={dark} />}
      </div>
      <footer className="foot">Hecho con cariño para las juntadas de Fede</footer>

      {/* En el celu, la navegación vive abajo, al alcance del pulgar. */}
      <nav className="tabbar" aria-label="Navegación">
        {NAV.map((n) => (
          <a key={n.id} className={`tabbar-item ${activeNav === n.id ? "on" : ""}`} href={n.href} aria-current={activeNav === n.id ? "page" : undefined}>
            <span className="tabbar-ico">
              <Icon name={n.icon} size={22} />
              {n.id === "matches" && pending > 0 && <i className="tabbar-dot">{pending}</i>}
            </span>
            <span>{n.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
