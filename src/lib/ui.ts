import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { CSSProperties } from "react";
import type { Game, Theme } from "../types";
import { load, save } from "./storage";

// ───────── ruteo por hash: #/juego/avalon/anotador ─────────

export type Route =
  | { page: "home"; search?: boolean }
  | { page: "tools" }
  | { page: "matches" }
  | { page: "game"; slug: string; tab?: string };

function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  if (parts[0] === "juego" && parts[1]) return { page: "game", slug: parts[1], tab: parts[2] };
  if (parts[0] === "herramientas") return { page: "tools" };
  if (parts[0] === "partidas") return { page: "matches" };
  return { page: "home", search: parts[0] === "buscar" };
}

export const pageKeyOf = (r: Route) => (r.page === "game" ? `game:${r.slug}` : r.page);

type VTDocument = Document & { startViewTransition?: (cb: () => void) => unknown };
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
export const supportsVT = () => typeof (document as VTDocument).startViewTransition === "function" && !reducedMotion();

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  const current = useRef(route);
  useEffect(() => {
    const on = () => {
      const next = parse(window.location.hash);
      const pageChanged = pageKeyOf(next) !== pageKeyOf(current.current);
      current.current = next;
      const apply = () => {
        flushSync(() => setRoute(next));
        if (pageChanged) window.scrollTo(0, 0); // al cambiar de página (no de pestaña) volvemos arriba
      };
      // Entre páginas, el navegador anima el cambio: la tapa que tocaste crece hasta ser la cabecera de la ficha.
      if (pageChanged && supportsVT()) {
        try {
          // si el navegador saltea la animación (pestaña oculta, otra en curso) el cambio se aplica igual
          const t = (document as VTDocument).startViewTransition!(apply) as { ready?: Promise<unknown>; finished?: Promise<unknown> } | undefined;
          t?.ready?.catch(() => {});
          t?.finished?.catch(() => {});
          return;
        } catch {
          /* sin transición */
        }
      }
      apply();
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

// ───────── modo oscuro "noche de juegos" ─────────

export function useDark(): [boolean, () => void] {
  const [dark, setDark] = useState(() =>
    load<boolean>("ludoteca:noche", window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false)
  );
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#1F1612" : "#F6EFE3");
  }, [dark]);
  return [
    dark,
    () => {
      save("ludoteca:noche", !dark);
      setDark(!dark);
    },
  ];
}

// ───────── colores de los temas ─────────

function rgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}
function luminance(hex: string) {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function mix(a: string, b: string, t: number) {
  const A = rgb(a);
  const B = rgb(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
}
/** Mueve la luminosidad (HSL) de un color sin tocarle el tono ni la saturación. */
function shiftL(hex: string, d: number) {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const diff = max - min;
  const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6;
    else if (max === g) h = (b - r) / diff + 2;
    else h = (r - g) / diff + 4;
  }
  const L = Math.min(0.96, Math.max(0.06, l + d));
  const c = (1 - Math.abs(2 * L - 1)) * s;
  const hh = ((h % 6) + 6) % 6;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = L - c / 2;
  const [R, G, B] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  return "#" + [R, G, B].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, "0")).join("");
}
const contrast = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const readableOn = (bg: string) => (contrast(bg, "#FFF9F0") >= contrast(bg, "#2B211C") ? "#FFF9F0" : "#2B211C");

// A igual tamaño, Caveat Brush dibuja chico y las de afiche (Bungee, Rye…) muy ancho: se compensa.
const FONT_SCALE: Record<string, number> = { "Caveat Brush": 1.3, Bungee: 0.78, Rye: 0.9, "Pixelify Sans": 0.9, "Special Elite": 0.92 };

/** La "cabecera" de un juego: usa su tema tal cual (fondo, patrón, tinta). */
export function heroStyle(t: Theme): CSSProperties {
  return {
    background: t.pattern ? `${t.pattern}, ${t.bg}` : t.bg,
    color: t.ink,
    // la ilustración se pinta con el acento; si el acento es casi negro, con el color de la tapa
    ["--art-a" as string]: luminance(t.accent) < 0.035 && luminance(t.bg) > 0.12 ? t.bg : t.accent,
    ...(t.accentFont ? { ["--accent-font" as string]: `"${t.accentFont}"`, ["--accent-scale" as string]: String(FONT_SCALE[t.accentFont] ?? 1) } : {}),
  };
}

/**
 * Variables que "tiñen" la base cozy en la página del juego sin reemplazarla:
 * el acento del sitio pasa a ser el del juego, ajustado para que se lea sobre el papel.
 */
export function tintVars(t: Theme, dark: boolean): Record<string, string> {
  const paper = dark ? "#2C211B" : "#FFF9F0";
  // Si el acento se pierde contra el papel (ámbar sobre crema, negro sobre marrón), se le corre
  // solo la luminosidad: así sigue siendo "su" color en vez de ensuciarse.
  const fit = (hex: string, min: number) => {
    let c = hex;
    for (let i = 0; i < 14 && contrast(c, paper) < min; i++) c = shiftL(c, dark ? 0.05 : -0.05);
    return c;
  };
  const accent = fit(t.accent, 3);
  return {
    "--accent": accent,
    "--on-accent": readableOn(accent),
    "--accent-text": fit(accent, 4.5),
    "--page-tint": mix(dark ? "#1F1612" : "#F6EFE3", t.accent, dark ? 0.09 : 0.07),
  };
}

// ───────── textos chicos compartidos ─────────

export const playersLabel = (g: Game) => {
  const { min, max } = g.players;
  if (min == null || max == null) return "?";
  if (min === max) return `${min}`;
  return max >= 100 ? `${min}+` : `${min}–${max}`;
};

export const difficultyClass = (d: Game["difficulty"]) =>
  d === "Fácil" ? "easy" : d === "Media" ? "mid" : d === "Difícil" ? "hard" : "";
