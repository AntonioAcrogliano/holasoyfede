import type { CustomScorerId, Game } from "../types";
import { ScorerFrame } from "./frame";
import type { ScorerDef } from "./frame";
import { counterDef, roundsDef } from "./generic";
import {
  avalonDef,
  cartografosDef,
  catanDef,
  clueDef,
  justoneDef,
  kingdominoDef,
  magicmazeDef,
  munchkinDef,
  pictionaryDef,
  sushigoDef,
  themindDef,
  trucoDef,
} from "./custom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDef = ScorerDef<any>;

const custom: Record<CustomScorerId, (slug: string) => AnyDef> = {
  truco: () => trucoDef,
  avalon: (slug) => avalonDef(slug === "la-resistencia" ? "resistencia" : "avalon"),
  catan: () => catanDef,
  cartografos: () => cartografosDef,
  toma6: () =>
    roundsDef({ target: 66, lowestWins: true, max: 10, note: "Anotá las cabezas de toro que se llevó cada uno en la ronda." }),
  sushigo: () => sushigoDef,
  kingdomino: () => kingdominoDef,
  munchkin: () => munchkinDef,
  carcassonne: () =>
    counterDef({ steps: [1, 2, 5, 10], lapAt: 50, min: 2, max: 6, def: 3, note: "Atajos: camino = 1 por loseta · ciudad cerrada = 2 por loseta y por escudo · monasterio completo = 9." }),
  flip7: () => roundsDef({ target: 200, min: 2, max: 18, note: "Si te pasaste (número repetido), anotá 0 en esa ronda." }),
  justone: () => justoneDef,
  themind: () => themindDef,
  clue: () => clueDef,
  pictionary: () => pictionaryDef,
  lasvegasbaby: () =>
    roundsDef({ fixed: 7, roundLabel: "Pregunta", min: 2, max: 7, note: "Anotá cuántas fichas ganó (o perdió, en negativo) cada jugador o equipo en cada pregunta." }),
  carreras: () =>
    roundsDef({ fixed: 4, roundLabel: "Carrera", min: 2, max: 9, note: "Anotá el resultado neto de cada carrera: lo que cobró menos las multas." }),
  magicmaze: () => magicmazeDef,
};

// Ajustes de los anotadores genéricos para juegos puntuales.
const counterTweaks: Record<string, Parameters<typeof counterDef>[0]> = {
  plunder: { target: 10, steps: [1], note: "Puntos de botín. Gana el primero en llegar a 10." },
  "happy-little-dinosaurs": { target: 50, note: "Ruta de escape. Gana el primero en llegar a 50." },
  "casting-shadows": { start: 18, note: "Contador de vida: todos arrancan en 18. El que llega a 0 queda afuera." },
  "casting-shadows-ice-storm": { start: 18, note: "Contador de vida: todos arrancan en 18. El que llega a 0 queda afuera." },
  "bienvenido-al-dungeon": { target: 2, steps: [1], note: "Cartas de éxito. Gana el primero en llegar a 2." },
  "fantasma-blitz": { steps: [1], note: "Cartas ganadas por cada uno." },
  "el-camarero": { steps: [1, 3], min: 2, max: 10, note: "Al final: +3 por carta de pedido, +1 por carta de comida y −2 por cada queja (usá el −1 dos veces)." },
  "el-erudito": { target: 4, steps: [1], min: 2, max: 4, note: "Monedas «El Erudito» de cada equipo. Gana el primero que llega a 4." },
  "jardin-japones": { min: 1, max: 8, note: "Cargá el total de cada jardín: decoraciones + estanques − penalidades." },
  yro: { target: 40, min: 1, max: 5, note: "Puntos de victoria. Al llegar a 40 (o a 9 cartas) se termina ese turno; después, 1 punto cada 3 de dinero." },
  "jurassic-park-digger": { target: 5, steps: [1], min: 2, max: 4, note: "Fichas de dinosaurio. Gana al instante el que junta las 5; si no, el que más tiene tras 3 rondas." },
  "tenka-meidou": { min: 2, max: 4, note: "Sumá los puntos de cada región a medida que se resuelven, del 2 al 12." },
};
const roundsTweaks: Record<string, Parameters<typeof roundsDef>[0]> = {
  odin: { target: 15, lowestWins: true, note: "Anotá las cartas que le quedaron en la mano a cada uno." },
  "polilla-tramposa": { lowestWins: true, note: "Anotá los puntos negativos de cada ronda (en positivo). Gana el que menos suma." },
  "unanimo-party": { fixed: 3, roundLabel: "Carta", min: 3, max: 12, note: "Anotá el total de cada carta. Son 3." },
  nessos: { note: "Anotá los puntos de ánforas de cada ronda. Objetivo según jugadores: 40 / 40 / 35 / 30 (a confirmar)." },
};

function defFor(game: Game): AnyDef | null {
  const s = game.scorer;
  if (!s) return null;
  switch (s.kind) {
    case "counter":
      return counterDef(counterTweaks[game.slug]);
    case "rounds":
      return roundsDef(roundsTweaks[game.slug]);
    case "target":
      return roundsDef({ target: s.target });
    case "teams":
      return counterDef({ mode: "teams" });
    case "custom":
      return custom[s.id](game.slug);
  }
}

const cache = new Map<string, AnyDef | null>();

export function Scorer({ game }: { game: Game }) {
  // el def se crea una sola vez por juego: si cambiara en cada render, el anotador se remontaría
  if (!cache.has(game.slug)) cache.set(game.slug, defFor(game));
  const def = cache.get(game.slug);
  if (!def) return null;
  return <ScorerFrame key={game.slug} slug={game.slug} def={def} />;
}
