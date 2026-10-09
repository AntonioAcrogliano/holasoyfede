import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Game } from "../types";
import { allCategories, bySlug, games } from "../data/games";
import { difficultyClass, heroStyle, playersLabel } from "../lib/ui";
import { useFavs, useHistory, useMatches } from "../lib/store";
import { Art } from "./Art";
import { Dice } from "./Dice";
import { Icon } from "./Icon";
import { InProgress } from "./Matches";

type Sort = "fit" | "az" | "dur";
type Filters = {
  n: number | null;
  maxMin: number | null; // "tenemos X minutos"
  minMin: number | null; // solo lo usan los estantes
  q: string;
  types: string[];
  diffs: string[];
  cats: string[];
  scorer: boolean;
  favs: boolean;
  sort: Sort;
};

const EMPTY: Filters = { n: null, maxMin: null, minMin: null, q: "", types: [], diffs: [], cats: [], scorer: false, favs: false, sort: "fit" };
// Se recuerda mientras la pestaña esté abierta, para que al volver de una ficha no se pierdan los filtros.
let remembered: Filters = EMPTY;

const TYPES = ["Cooperativo", "Competitivo", "Por equipos", "Equipos ocultos", "Uno contra todos"];
const DIFFS = ["Fácil", "Media", "Difícil"];
const QUICK = [2, 4, 5, 10];
const TIMES: { min: number; label: string }[] = [
  { min: 15, label: "15′" },
  { min: 30, label: "30′" },
  { min: 60, label: "1 h" },
  { min: 90, label: "1 h 30" },
];
const timeLabel = (m: number) => TIMES.find((t) => t.min === m)?.label ?? `${m}′`;

// Estantes temáticos del inicio: cada uno es un filtro guardado.
const SHELVES: { title: string; sub: string; preset: Partial<Filters> }[] = [
  { title: "Para romper el hielo", sub: "Party, fáciles de explicar", preset: { cats: ["party"], diffs: ["Fácil"] } },
  { title: "Cortitos", sub: "Hasta 20 minutos", preset: { maxMin: 20 } },
  { title: "Somos un montón", sub: "Aguantan 8 o más", preset: { n: 8 } },
  { title: "Todos contra el juego", sub: "Cooperativos", preset: { types: ["Cooperativo"] } },
  { title: "Para pensar un rato", sub: "Más de 45 minutos, con vuelta", preset: { diffs: ["Media", "Difícil"], minMin: 45 } },
];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const toggle = (xs: string[], x: string) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);

function matches(g: Game, f: Filters, favs: string[]) {
  if (f.n != null && !(g.players.min != null && g.players.max != null && g.players.min <= f.n && f.n <= g.players.max)) return false;
  if (f.maxMin != null && !(g.minutes != null && g.minutes <= f.maxMin)) return false;
  if (f.minMin != null && !(g.minutes != null && g.minutes >= f.minMin)) return false;
  if (f.q && !norm(g.name).includes(norm(f.q))) return false;
  if (f.types.length && !(g.type && f.types.includes(g.type))) return false;
  if (f.diffs.length && !(g.difficulty && f.diffs.includes(g.difficulty))) return false;
  if (f.cats.length && !f.cats.some((c) => g.categories.includes(c))) return false;
  if (f.scorer && !g.scorer) return false;
  if (f.favs && !favs.includes(g.slug)) return false;
  return true;
}

// Mejor encaje: un juego pensado para un rango angosto que incluye a N le queda mejor que uno "para cualquier cantidad".
const span = (g: Game) => Math.min(30, (g.players.max ?? 99) - (g.players.min ?? 0));

function sortGames(list: Game[], f: Filters) {
  const order = new Map(games.map((g, i) => [g.slug, i]));
  const cmp: Record<Sort, (a: Game, b: Game) => number> = {
    fit: (a, b) => (f.n != null ? span(a) - span(b) : 0) || order.get(a.slug)! - order.get(b.slug)!,
    az: (a, b) => a.name.localeCompare(b.name, "es"),
    dur: (a, b) => (a.minutes ?? 999) - (b.minutes ?? 999) || a.name.localeCompare(b.name, "es"),
  };
  const info = (g: Game) => (g.status === "falta-info" ? 1 : 0); // los "falta info" siempre al final
  return [...list].sort((a, b) => info(a) - info(b) || cmp[f.sort](a, b));
}

function Chips({ label, options, selected, onToggle }: { label: string; options: { id: string; label: string }[]; selected: string[]; onToggle: (id: string) => void }) {
  return (
    <fieldset className="chips">
      <legend>{label}</legend>
      {options.map((o) => (
        <button key={o.id} type="button" className={`chip ${selected.includes(o.id) ? "on" : ""}`} aria-pressed={selected.includes(o.id)} onClick={() => onToggle(o.id)}>
          {o.label}
        </button>
      ))}
    </fieldset>
  );
}

/** La "tapa de la caja": el tema del juego a pleno, con su ilustración y el nombre como título de tapa. */
export function Cover({ game, fav = false }: { game: Game; fav?: boolean }) {
  const basic = game.status === "falta-info";
  return (
    <div className={`cover ${basic ? "cover-basic" : ""}`} style={heroStyle(game.theme)}>
      <Art slug={game.slug} className="cover-ghost" />
      <span className="cover-token">
        <Art slug={game.slug} />
      </span>
      <span className="cover-badges">
        {fav && (
          <span className="cover-badge fav" title="Favorito">
            <Icon name="heart" size={14} />
            <span className="sr">Favorito</span>
          </span>
        )}
        {game.scorer && (
          <span className="cover-badge" title="Tiene anotador">
            <Icon name="pencil" size={14} />
            <span className="sr">Tiene anotador</span>
          </span>
        )}
      </span>
      {basic && <span className="cover-sticker">Falta info</span>}
      <div className="cover-text">
        {game.type && <span className="cover-over">{game.type}</span>}
        <h3 className="cover-name">{game.name}</h3>
      </div>
    </div>
  );
}

export function GameCard({ game, mini = false, fav = false, index }: { game: Game; mini?: boolean; fav?: boolean; index?: number }) {
  const g = game;
  return (
    <a
      className={`gcard ${mini ? "gcard-mini" : ""}`}
      href={`#/juego/${g.slug}`}
      style={index != null ? ({ "--i": Math.min(index, 14) } as CSSProperties) : undefined}
      onClick={(e) => {
        // esta tapa es la que "crece" hasta ser la cabecera de la ficha
        const cover = e.currentTarget.querySelector<HTMLElement>(".cover");
        if (cover) cover.style.setProperty("view-transition-name", "game-cover");
      }}
    >
      <Cover game={g} fav={fav} />
      {!mini && (
        <div className="gcard-meta">
          {g.players.min != null && (
            <span>
              <Icon name="users" size={15} /> {playersLabel(g)}
            </span>
          )}
          {g.minutes != null && (
            <span>
              <Icon name="clock" size={15} /> {g.minutes}′
            </span>
          )}
          {g.difficulty && <span className={`diff ${difficultyClass(g.difficulty)}`}>{g.difficulty}</span>}
          {g.players.min == null && g.minutes == null && <span className="muted">Sin datos todavía</span>}
        </div>
      )}
    </a>
  );
}

// Ilustración propia del encabezado: el rincón de los juegos, con su lámpara, su planta y un mate cocido.
function ShelfArt() {
  return (
    <svg className="art" viewBox="0 0 360 206" aria-hidden="true">
      <path className="art-glow" d="M262 62h76l46 144H216z" />
      <path className="art-cord" d="M300 0v34" />
      <path className="a3" d="M284 34h32l16 30h-64z" />
      <ellipse className="art-bulb" cx="300" cy="66" rx="14" ry="5" />

      <rect className="art-plank" x="14" y="158" width="332" height="14" rx="7" />
      <path className="art-bracket" d="M52 172h10v6c0 8-4 12-10 14zM298 172h10v20c-6-2-10-6-10-14z" />

      <path className="a2" d="M40 132c-15-9-18-28-9-38 7 8 11 23 9 38zM40 132c15-7 22-24 15-36-9 6-15 21-15 36zM40 132c-3-17 1-33 4-44 5 12 3 30-4 44z" />
      <path className="a1" d="M26 130h28l-4 28H30z" />

      <g transform="rotate(-4 80 158)">
        <rect className="a1" x="68" y="82" width="27" height="76" rx="6" />
        <rect className="art-label" x="74" y="92" width="15" height="32" rx="4" />
      </g>
      <rect className="a2" x="98" y="64" width="31" height="94" rx="6" />
      <rect className="art-label" x="105" y="76" width="17" height="42" rx="4" />
      <circle className="art-label" cx="113.500" cy="140" r="5" />
      <rect className="a3" x="131" y="90" width="23" height="68" rx="6" />
      <rect className="art-label" x="137" y="100" width="11" height="24" rx="3" />
      <g transform="rotate(13 172 158)">
        <rect className="a4" x="158" y="72" width="27" height="86" rx="6" />
        <rect className="art-label" x="164" y="84" width="15" height="36" rx="4" />
      </g>

      <rect className="a5" x="204" y="136" width="56" height="22" rx="6" />
      <rect className="a4" x="210" y="116" width="44" height="20" rx="6" />
      <g transform="rotate(-12 232 102)">
        <rect className="a1" x="219" y="89" width="26" height="26" rx="8" />
        <circle className="art-label" cx="226" cy="96" r="2.400" />
        <circle className="art-label" cx="238" cy="108" r="2.400" />
        <circle className="art-label" cx="232" cy="102" r="2.400" />
      </g>

      <path className="art-steam" d="M283 124c-4-5 4-7 0-12M292 124c-4-5 4-7 0-12" />
      <rect className="art-mug" x="274" y="130" width="28" height="28" rx="6" />
      <path className="art-mug-h" d="M302 137h4a6 6 0 010 12h-4" />
      <path className="a2" d="M326 132a6 6 0 11.100 0zM314 158c0-9 5-13 12-14 7 1 12 5 12 14z" />
    </svg>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "¿Trasnochando? Una más y nos vamos.";
  if (h < 13) return "Buen día. ¿Arrancamos con algo cortito?";
  if (h < 20) return "Linda tarde para sacar una caja del estante.";
  return "Noche de juegos. Elegí y a la mesa.";
}

function Shelf({ title, sub, items, favs, onAll }: { title: string; sub: string; items: Game[]; favs: string[]; onAll?: () => void }) {
  if (!items.length) return null;
  return (
    <section className="shelf">
      <header className="shelf-head">
        <div>
          <h2>{title}</h2>
          <p>{sub}</p>
        </div>
        {onAll && (
          <button className="link" onClick={onAll}>
            Ver todos <Icon name="right" size={16} />
          </button>
        )}
      </header>
      <div className="cubby">
        <div className="shelf-row">
          {items.map((g) => (
            <GameCard key={g.slug} game={g} mini fav={favs.includes(g.slug)} />
          ))}
        </div>
        <div className="plank" aria-hidden="true" />
      </div>
    </section>
  );
}

export function Catalog({ focusSearch = false }: { focusSearch?: boolean }) {
  const [f, setF] = useState<Filters>(remembered);
  const [sheet, setSheet] = useState(false);
  const [pick, setPick] = useState<{ game: Game; rolling: boolean; face: number } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [favs] = useFavs();
  const history = useHistory();
  const inProgress = useMatches();
  const patch = (p: Partial<Filters>) => setF((prev) => (remembered = { ...prev, ...p }));

  // La pestaña "Buscar" de la barra de abajo cae acá: foco directo al buscador.
  useEffect(() => {
    if (!focusSearch) return;
    searchRef.current?.focus();
    searchRef.current?.scrollIntoView({ block: "center" });
  }, [focusSearch]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [sheet]);

  const list = useMemo(() => sortGames(games.filter((g) => matches(g, f, favs)), f), [f, favs]);
  const advCount = f.types.length + f.diffs.length + f.cats.length + (f.scorer ? 1 : 0) + (f.favs ? 1 : 0);
  const filtered = f.n != null || f.maxMin != null || f.minMin != null || f.q.trim() !== "" || advCount > 0;

  const shelves = useMemo(
    () =>
      SHELVES.map((s) => {
        const preset = { ...EMPTY, ...s.preset };
        return { ...s, items: sortGames(games.filter((g) => g.status === "completo" && matches(g, preset, [])), preset).slice(0, 14) };
      }),
    []
  );
  const favGames = favs.map(bySlug).filter((g): g is Game => !!g);
  // "Jugados hace poco": lo que está en curso y lo que se terminó, lo más nuevo primero.
  const recent = useMemo(() => {
    const seen = new Set<string>();
    return [...inProgress.map((m) => ({ slug: m.slug, at: m.at })), ...history.map((e) => ({ slug: e.slug, at: e.at }))]
      .sort((a, b) => b.at - a.at)
      .filter((x) => !seen.has(x.slug) && seen.add(x.slug))
      .map((x) => bySlug(x.slug))
      .filter((g): g is Game => !!g)
      .slice(0, 12);
  }, [inProgress, history]);

  // Etiquetas de lo que está filtrando, cada una con su "sacar".
  const active: { label: string; off: () => void }[] = [
    ...(f.n != null ? [{ label: `Somos ${f.n}`, off: () => patch({ n: null }) }] : []),
    ...(f.maxMin != null ? [{ label: `Hasta ${timeLabel(f.maxMin)}`, off: () => patch({ maxMin: null }) }] : []),
    ...(f.minMin != null ? [{ label: `Más de ${f.minMin}′`, off: () => patch({ minMin: null }) }] : []),
    ...(f.favs ? [{ label: "Favoritos", off: () => patch({ favs: false }) }] : []),
    ...f.types.map((t) => ({ label: t, off: () => patch({ types: toggle(f.types, t) }) })),
    ...f.diffs.map((t) => ({ label: t, off: () => patch({ diffs: toggle(f.diffs, t) }) })),
    ...f.cats.map((t) => ({ label: t, off: () => patch({ cats: toggle(f.cats, t) }) })),
    ...(f.scorer ? [{ label: "Con anotador", off: () => patch({ scorer: false }) }] : []),
  ];

  const moods: { label: string; on: boolean; flip: () => void }[] = [
    { label: "Favoritos", on: f.favs, flip: () => patch({ favs: !f.favs }) },
    { label: "Party", on: f.cats.includes("party"), flip: () => patch({ cats: toggle(f.cats, "party") }) },
    { label: "Cooperativos", on: f.types.includes("Cooperativo"), flip: () => patch({ types: toggle(f.types, "Cooperativo") }) },
    { label: "Fáciles", on: f.diffs.includes("Fácil"), flip: () => patch({ diffs: toggle(f.diffs, "Fácil") }) },
    { label: "Con anotador", on: f.scorer, flip: () => patch({ scorer: !f.scorer }) },
  ];

  const roll = () => {
    const pool = list.filter((g) => g.status === "completo");
    const from = pool.length ? pool : list;
    if (!from.length) return;
    setPick({ game: from[Math.floor(Math.random() * from.length)], rolling: true, face: 1 });
  };
  useEffect(() => {
    if (!pick?.rolling) return;
    const spin = window.setInterval(() => setPick((p) => p && { ...p, face: 1 + Math.floor(Math.random() * 6) }), 120);
    const stop = window.setTimeout(() => setPick((p) => p && { ...p, rolling: false }), 1100);
    return () => {
      window.clearInterval(spin);
      window.clearTimeout(stop);
    };
  }, [pick?.rolling, pick?.game]);

  const openShelf = (preset: Partial<Filters>) => {
    patch({ ...EMPTY, sort: f.sort, ...preset });
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  // "Somos 5 y tenemos 30′": la frase que resume la búsqueda.
  const sentence = [f.n != null ? `para ${f.n}` : "", f.maxMin != null ? `en ${timeLabel(f.maxMin)} o menos` : ""].filter(Boolean).join(", ");

  return (
    <main className="page home">
      <section className="hello hello-home">
        <div className="hello-text">
          <p className="eyebrow">
            <b>{games.length}</b> juegos en el estante
          </p>
          <h1>
            Hola, soy la <em>Ludoteca de Fede</em>
          </h1>
          <p className="lead">{greeting()}</p>
        </div>
        <ShelfArt />
      </section>

      <InProgress limit={2} />

      <section className="finder" aria-label="Buscar qué jugar">
        <div className="finder-block">
          <h2 className="finder-q">¿Cuántos son hoy?</h2>
          <div className="somos">
            {QUICK.map((n) => (
              <button key={n} className={`somos-btn ${f.n === n ? "on" : ""}`} aria-pressed={f.n === n} onClick={() => patch({ n: f.n === n ? null : n })}>
                <small>Somos</small>
                {n}
              </button>
            ))}
            <label className={`somos-btn somos-free ${f.n != null && !QUICK.includes(f.n) ? "on" : ""}`}>
              <small>Somos</small>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                placeholder="__"
                aria-label="Otra cantidad de jugadores"
                value={f.n != null && !QUICK.includes(f.n) ? f.n : ""}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  patch({ n: Number.isNaN(v) || v < 1 ? null : Math.min(100, v) });
                }}
              />
            </label>
          </div>
        </div>

        <div className="finder-block">
          <h2 className="finder-q">¿Cuánto tiempo tienen?</h2>
          <div className="times" role="group" aria-label="Tiempo disponible">
            {TIMES.map((t) => (
              <button key={t.min} className={`time-btn ${f.maxMin === t.min ? "on" : ""}`} aria-pressed={f.maxMin === t.min} onClick={() => patch({ maxMin: f.maxMin === t.min ? null : t.min, minMin: null })}>
                <Icon name="clock" size={16} />
                {t.label}
              </button>
            ))}
            <button className={`time-btn ${f.maxMin == null ? "on" : ""}`} aria-pressed={f.maxMin == null} onClick={() => patch({ maxMin: null })}>
              Sin apuro
            </button>
          </div>
        </div>

        <div className="search-row">
          <label className="search">
            <Icon name="search" size={20} />
            <input ref={searchRef} type="search" placeholder="Buscar un juego…" aria-label="Buscar por nombre" value={f.q} onChange={(e) => patch({ q: e.target.value })} />
          </label>
          <button className={`btn ${advCount ? "primary" : ""}`} aria-haspopup="dialog" onClick={() => setSheet(true)}>
            <Icon name="sliders" />
            <span>Filtros{advCount ? ` · ${advCount}` : ""}</span>
          </button>
        </div>

        <div className="moods" role="group" aria-label="Atajos">
          {moods.map((m) => (
            <button key={m.label} className={`chip ${m.on ? "on" : ""}`} aria-pressed={m.on} onClick={m.flip}>
              {m.label === "Favoritos" && <Icon name="heart" size={15} />}
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <button className="lucky" onClick={roll} disabled={!list.length}>
        <Dice face={5} />
        <span>
          <strong>¿No sabés qué jugar?</strong>
          <small>Tirá el dado y que decida el azar{filtered ? " entre estos" : ""}.</small>
        </span>
        <Icon name="right" size={22} />
      </button>

      <div ref={resultsRef} className="anchor" />

      {!filtered && (
        <>
          <Shelf title="Tus favoritos" sub="Los que marcaste con el corazón" items={favGames} favs={favs} onAll={favGames.length > 4 ? () => openShelf({ favs: true }) : undefined} />
          <Shelf title="Jugados hace poco" sub="Lo último que pasó por la mesa" items={recent} favs={favs} />
          {shelves.map((s) => (
            <Shelf key={s.title} title={s.title} sub={s.sub} items={s.items} favs={favs} onAll={() => openShelf(s.preset)} />
          ))}
        </>
      )}

      <section className="results">
        <header className="results-head">
          <h2 aria-live="polite">
            {filtered ? `${list.length} ${list.length === 1 ? "juego" : "juegos"}${sentence ? ` ${sentence}` : ""}` : "Todo el estante"}
          </h2>
          <label className="sort">
            <span className="sr">Ordenar</span>
            <select value={f.sort} onChange={(e) => patch({ sort: e.target.value as Sort })}>
              <option value="fit">{f.n != null ? "Mejor encaje" : "Recomendados"}</option>
              <option value="az">A–Z</option>
              <option value="dur">Más cortos</option>
            </select>
          </label>
        </header>

        {active.length > 0 && (
          <div className="active">
            {active.map((a) => (
              <button key={a.label} className="chip on" onClick={a.off} aria-label={`Sacar filtro ${a.label}`}>
                {a.label} <Icon name="x" size={14} />
              </button>
            ))}
            <button className="link" onClick={() => patch({ ...EMPTY, sort: f.sort })}>
              Limpiar todo
            </button>
          </div>
        )}

        {list.length ? (
          <div className="grid" key={JSON.stringify([f.n, f.maxMin, f.minMin, f.types, f.diffs, f.cats, f.scorer, f.favs, f.sort])}>
            {list.map((g, i) => (
              <GameCard key={g.slug} game={g} fav={favs.includes(g.slug)} index={i} />
            ))}
          </div>
        ) : (
          <div className="card empty">
            <Art glyph="box" className="empty-art" />
            <h3>{f.favs && !favs.length ? "Todavía no marcaste favoritos" : "No hay nada en el estante con esos filtros"}</h3>
            {f.favs && !favs.length && <p>Entrá a un juego y tocá el corazón.</p>}
            <button className="btn primary" onClick={() => patch({ ...EMPTY, sort: f.sort })}>
              Ver todo
            </button>
          </div>
        )}
      </section>

      {sheet && (
        <div className="overlay sheet-wrap" role="dialog" aria-modal="true" aria-label="Filtros" onClick={() => setSheet(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-grab" aria-hidden="true" />
            <header className="between">
              <h2>Filtros</h2>
              <button className="navbtn" aria-label="Cerrar filtros" onClick={() => setSheet(false)}>
                <Icon name="x" />
              </button>
            </header>
            <div className="sheet-body">
              <Chips label="Tipo" options={TYPES.map((t) => ({ id: t, label: t }))} selected={f.types} onToggle={(id) => patch({ types: toggle(f.types, id) })} />
              <Chips label="Dificultad" options={DIFFS.map((t) => ({ id: t, label: t }))} selected={f.diffs} onToggle={(id) => patch({ diffs: toggle(f.diffs, id) })} />
              <Chips label="Categoría" options={allCategories.map((t) => ({ id: t, label: t }))} selected={f.cats} onToggle={(id) => patch({ cats: toggle(f.cats, id) })} />
              <label className="switch">
                <input type="checkbox" checked={f.scorer} onChange={(e) => patch({ scorer: e.target.checked })} />
                <span>Tiene anotador</span>
              </label>
              <label className="switch">
                <input type="checkbox" checked={f.favs} onChange={(e) => patch({ favs: e.target.checked })} />
                <span>Solo mis favoritos</span>
              </label>
            </div>
            <footer className="sheet-foot">
              <button className="btn" onClick={() => patch({ types: [], diffs: [], cats: [], scorer: false, favs: false })} disabled={!advCount}>
                Limpiar
              </button>
              <button
                className="btn primary grow"
                onClick={() => {
                  setSheet(false);
                  requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
                }}
              >
                Ver {list.length} {list.length === 1 ? "juego" : "juegos"}
              </button>
            </footer>
          </div>
        </div>
      )}

      {pick && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Juego al azar" onClick={() => setPick(null)}>
          <div className="card picker" onClick={(e) => e.stopPropagation()}>
            <div className="roll-stage">
              <Dice face={pick.face} className={pick.rolling ? "rolling" : "landed"} />
            </div>
            {pick.rolling ? (
              <p className="muted">Tirando el dado…</p>
            ) : (
              <>
                <p className="eyebrow">Hoy se juega a…</p>
                <GameCard game={pick.game} fav={favs.includes(pick.game.slug)} />
                <button className="btn big primary block" onClick={roll}>Tirar de nuevo</button>
                <button className="btn block" onClick={() => setPick(null)}>Cerrar</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
