import { useEffect, useState } from "react";
import { keysWithPrefix, load, remove, save } from "./storage";

// Datos chicos compartidos entre pantallas (favoritos, historial, colores de jugadores).
// Al guardar se avisa con un evento para que lo que esté en pantalla se actualice.
const EVT = "ludoteca:store";

export function setStored(key: string, value: unknown) {
  save(key, value);
  window.dispatchEvent(new CustomEvent(EVT, { detail: key }));
}

export function useStored<T>(key: string, fallback: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => load(key, fallback));
  useEffect(() => {
    const on = (e: Event) => {
      if ((e as CustomEvent).detail === key) setValue(load(key, fallback));
    };
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return [value, (v) => setStored(key, v)];
}

// ───────── favoritos ─────────

const FAVS = "ludoteca:favoritos";
export function useFavs(): [string[], (slug: string) => void] {
  const [favs, setFavs] = useStored<string[]>(FAVS, []);
  return [favs, (slug) => setFavs(favs.includes(slug) ? favs.filter((s) => s !== slug) : [slug, ...favs])];
}

// ───────── historial de partidas terminadas ─────────

export type HistEntry = {
  id: string;
  slug: string;
  at: number;
  names: string[];
  winners?: string[]; // sin ganadores = cooperativo o partida sin puntaje
  title: string;
  lines: string[];
};
const HIST = "ludoteca:historial";
export const useHistory = () => useStored<HistEntry[]>(HIST, [])[0];
export const addHistory = (e: HistEntry) => setStored(HIST, [e, ...load<HistEntry[]>(HIST, [])].slice(0, 300));
export const removeHistory = (id: string) => setStored(HIST, load<HistEntry[]>(HIST, []).filter((e) => e.id !== id));
export const clearHistory = () => setStored(HIST, []);

// ───────── partidas en curso ─────────

export type SavedMatch = { slug: string; names: string[]; data: unknown; at: number };
const MATCH_PREFIX = "ludoteca:partida:";
type RawMatch = { names?: string[]; data?: unknown; hist?: unknown[]; finished?: boolean; at?: number };

export function listMatches(): SavedMatch[] {
  return keysWithPrefix(MATCH_PREFIX)
    .map((k) => ({ slug: k.slice(MATCH_PREFIX.length), m: load<RawMatch | null>(k, null) }))
    .filter(({ m }) => m && Array.isArray(m.hist) && m.hist.length > 0 && !m.finished)
    .map(({ slug, m }) => ({ slug, names: m!.names ?? [], data: m!.data, at: m!.at ?? 0 }))
    .sort((a, b) => b.at - a.at);
}
export const discardMatch = (slug: string) => {
  remove(MATCH_PREFIX + slug);
  window.dispatchEvent(new CustomEvent(EVT, { detail: MATCH_PREFIX }));
};
export const notifyMatches = () => window.dispatchEvent(new CustomEvent(EVT, { detail: MATCH_PREFIX }));
export function useMatches(): SavedMatch[] {
  const [list, setList] = useState(listMatches);
  useEffect(() => {
    const on = (e: Event) => {
      if ((e as CustomEvent).detail === MATCH_PREFIX) setList(listMatches());
    };
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);
  return list;
}

// ───────── jugadores: cada nombre tiene su color de ficha ─────────

export const PLAYER_COLORS = ["#C8643B", "#7A8450", "#E0A92E", "#4E8F8A", "#8C5E58", "#3F6C8C", "#B5568A", "#6B4FA0", "#D98E3F", "#4F8F5B"];
const PLAYERS = "ludoteca:jugadores";
export const playerKey = (name: string) => name.trim().toLowerCase();

function hashIndex(name: string) {
  let h = 0;
  for (const c of playerKey(name)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % PLAYER_COLORS.length;
}
export function usePlayerColors() {
  const [map, setMap] = useStored<Record<string, number>>(PLAYERS, {});
  const indexOf = (name: string) => map[playerKey(name)] ?? hashIndex(name);
  return {
    colorOf: (name: string) => PLAYER_COLORS[indexOf(name)],
    cycle: (name: string) => name.trim() && setMap({ ...map, [playerKey(name)]: (indexOf(name) + 1) % PLAYER_COLORS.length }),
  };
}

export function timeAgo(at: number): string {
  if (!at) return "";
  const min = Math.round((Date.now() - at) / 60000);
  if (min < 2) return "recién";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  if (d === 1) return "ayer";
  if (d < 30) return `hace ${d} días`;
  return new Date(at).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
}
