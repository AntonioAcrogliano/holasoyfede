import { useEffect } from "react";
import { Catalog } from "./components/Catalog";
import { Dice } from "./components/Dice";
import { GamePage } from "./components/GamePage";
import { Icon } from "./components/Icon";
import { Tools } from "./components/Tools";
import { useDark, useRoute } from "./lib/ui";

export function App() {
  const route = useRoute();
  const [dark, toggleDark] = useDark();

  // Al cambiar de página (no de pestaña dentro de un juego) volvemos arriba.
  const pageKey = route.page === "game" ? `game:${route.slug}` : route.page;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageKey]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <a className="brand" href="#/" aria-label="Ludoteca de Fede, inicio">
            <Dice face={5} className="bounce" />
            <span>Ludoteca de Fede</span>
          </a>
          <nav className="topnav">
            <a className={`navbtn ${route.page === "tools" ? "on" : ""}`} href="#/herramientas" aria-label="Herramientas">
              <Icon name="hourglass" />
              <span className="lbl">Herramientas</span>
            </a>
            <button className="navbtn" onClick={toggleDark} aria-label={dark ? "Pasar a modo día" : "Pasar a modo noche de juegos"} aria-pressed={dark}>
              <Icon name={dark ? "sun" : "moon"} />
            </button>
          </nav>
        </div>
      </header>
      <div key={pageKey} className="route">
        {route.page === "home" && <Catalog />}
        {route.page === "tools" && <Tools />}
        {route.page === "game" && <GamePage slug={route.slug} tab={route.tab} dark={dark} />}
      </div>
      <footer className="foot">Hecho con cariño para las juntadas de Fede</footer>
    </>
  );
}
