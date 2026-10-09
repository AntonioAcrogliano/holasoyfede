import { useEffect, useMemo, useRef, useState } from "react";
import type { Game } from "../types";
import { allCategories, games } from "../data/games";
import { difficultyClass, heroStyle, playersLabel } from "../lib/ui";
import { Dice } from "./Dice";
import { Icon } from "./Icon";

type Sort = "fit" | "az" | "dur";
type Filters = {
  n: number | null;
  q: string;
  types: string[];
  diffs: string[];
  durs: string[];
  cats: string[];
  scorer: boolean;
  sort: Sort;
};

const EMPTY: Filters = { n: null, q: "", types: [], diffs: [], durs: [], cats: [], scorer: false, sort: "fit" };
// Se recuerda mientras la pestaña esté abierta, para que al volver de una ficha no se pierdan los filtros.
let remembered: Filters = EMPTY;

const TYPES = ["Cooperativo", "Competitivo", "Por equipos", "Equipos ocultos", "Uno contra todos"];
const DIFFS = ["Fácil", "Media", "Difícil"];
const DURS: { id: string; label: string; test: (m: number) => boolean }[] = [
  { id: "20", label: "Hasta 20′", test: (m) => m <= 20 },
  { id: "45", label: "20–45′", test: (m) => m >= 20 && m <= 45 },
  { id: "90", label: "45–90′", test: (m) => m >= 45 && m <= 90 },
  { id: "90+", label: "90′ o más", test: (m) => m >= 90 },
];
const QUICK = [2, 4, 5, 10];

// Estantes temáticos del inicio: cada uno es un filtro guardado.
const SHELVES: { title: string; sub: string; preset: Partial<Filters> }[] = [
  { title: "Para romper el hielo", sub: "Party, fáciles de explicar", preset: { cats: ["party"], diffs: ["Fácil"] } },
  { title: "Cortitos", sub: "Hasta 20 minutos", preset: { durs: ["20"] } },
  { title: "Somos un montón", sub: "Aguantan 8 o más", preset: { n: 8 } },
  { title: "Todos contra el juego", sub: "Cooperativos", preset: { types: ["Cooperativo"] } },
  { title: "Para pensar un rato", sub: "Más de 45 minutos, con vuelta", preset: { diffs: ["Media", "Difícil"], durs: ["90", "90+"] } },
];

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const toggle = (xs: string[], x: string) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x]);

function matches(g: Game, f: Filters) {
  if (f.n != null && !(g.players.min != null && g.players.max != null && g.players.min <= f.n && f.n <= g.players.max)) return false;
  if (f.q && !norm(g.name).includes(norm(f.q))) return false;
  if (f.types.length && !(g.type && f.types.includes(g.type))) return false;
  if (f.diffs.length && !(g.difficulty && f.diffs.includes(g.difficulty))) return false;
  if (f.durs.length && !(g.minutes != null && DURS.some((d) => f.durs.includes(d.id) && d.test(g.minutes!)))) return false;
  if (f.cats.length && !f.cats.some((c) => g.categories.includes(c))) return false;
  if (f.scorer && !g.scorer) return false;
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

/** La "tapa de la caja": el tema del juego a pleno, con su ficha-ícono y el nombre como título de tapa. */
export function Cover({ game }: { game: Game }) {
  const basic = game.status === "falta-info";
  return (
    <div className={`cover ${basic ? "cover-basic" : ""}`} style={heroStyle(game.theme)}>
      <span className="cover-ghost" aria-hidden="true">{game.theme.icon}</span>
      <span className="cover-token" aria-hidden="true">{game.theme.icon}</span>
      {game.scorer && (
        <span className="cover-badge" title="Tiene anotador">
          <Icon name="pencil" size={14} />
          <span className="sr">Tiene anotador</span>
        </span>
      )}
      {basic && <span className="cover-sticker">Falta info</span>}
      <div className="cover-text">
        {game.type && <span className="cover-over">{game.type}</span>}
        <h3 className="cover-name">{game.name}</h3>
      </div>
    </div>
  );
}

export function GameCard({ game, mini = false }: { game: Game; mini?: boolean }) {
  const g = game;
  return (
    <a className={`gcard ${mini ? "gcard-mini" : ""}`} href={`#/juego/${g.slug}`}>
      <Cover game={g} />
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

// Ilustración propia del encabezado: un estante con cajas, un dado y un meeple.
function ShelfArt() {
  return (
    <svg className="art" viewBox="0 0 220 170" aria-hidden="true">
      <ellipse cx="112" cy="158" rx="96" ry="7" className="art-shadow" />
      <g transform="rotate(-4 50 140)">
        <rect x="38" y="58" width="27" height="82" rx="6" className="a1" />
        <rect x="44" y="70" width="15" height="34" rx="4" className="art-label" />
      </g>
      <rect x="68" y="44" width="31" height="96" rx="6" className="a2" />
      <rect x="75" y="56" width="17" height="44" rx="4" className="art-label" />
      <circle cx="83.500" cy="122" r="5" className="art-label" />
      <rect x="101" y="68" width="23" height="72" rx="6" className="a3" />
      <rect x="107" y="78" width="11" height="26" rx="3" className="art-label" />
      <g transform="rotate(13 140 140)">
        <rect x="127" y="52" width="27" height="88" rx="6" className="a4" />
        <rect x="133" y="64" width="15" height="38" rx="4" className="art-label" />
      </g>
      <rect x="158" y="118" width="52" height="22" rx="6" className="a5" />
      <rect x="164" y="98" width="42" height="20" rx="6" className="a3" />
      <g transform="rotate(-12 184 84)">
        <rect x="171" y="71" width="26" height="26" rx="8" className="a1" />
        <circle cx="178" cy="78" r="2.4" className="art-label" />
        <circle cx="190" cy="90" r="2.400" className="art-label" />
        <circle cx="184" cy="84" r="2.4" className="art-label" />
      </g>
      <path d="M22 118a7 7 0 1 1 .1 0zM8 140c0-10 6-14 14-15 8 1 14 5 14 15z" className="a2" />
      <rect x="6" y="140" width="208" height="12" rx="6" className="art-plank" />
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

export function Catalog() {
  const [f, setF] = useState<Filters>(remembered);
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<{ game: Game; rolling: boolean; face: number } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const patch = (p: Partial<Filters>) => setF((prev) => (remembered = { ...prev, ...p }));

  const list = useMemo(() => sortGames(games.filter((g) => matches(g, f)), f), [f]);
  const advCount = f.types.length + f.diffs.length + f.durs.length + f.cats.length + (f.scorer ? 1 : 0);
  const filtered = f.n != null || f.q.trim() !== "" || advCount > 0;

  const shelves = useMemo(
    () =>
      SHELVES.map((s) => {
        const preset = { ...EMPTY, ...s.preset };
        return { ...s, items: sortGames(games.filter((g) => g.status === "completo" && matches(g, preset)), preset).slice(0, 14) };
      }),
    []
  );

  // Etiquetas de lo que está filtrando, cada una con su "sacar".
  const active: { label: string; off: () => void }[] = [
    ...(f.n != null ? [{ label: `Somos ${f.n}`, off: () => patch({ n: null }) }] : []),
    ...f.types.map((t) => ({ label: t, off: () => patch({ types: toggle(f.types, t) }) })),
    ...f.diffs.map((t) => ({ label: t, off: () => patch({ diffs: toggle(f.diffs, t) }) })),
    ...f.durs.map((t) => ({ label: DURS.find((d) => d.id === t)!.label, off: () => patch({ durs: toggle(f.durs, t) }) })),
    ...f.cats.map((t) => ({ label: t, off: () => patch({ cats: toggle(f.cats, t) }) })),
    ...(f.scorer ? [{ label: "Con anotador", off: () => patch({ scorer: false }) }] : []),
  ];

  const moods: { label: string; on: boolean; flip: () => void }[] = [
    { label: "Party", on: f.cats.includes("party"), flip: () => patch({ cats: toggle(f.cats, "party") }) },
    { label: "Cooperativos", on: f.types.includes("Cooperativo"), flip: () => patch({ types: toggle(f.types, "Cooperativo") }) },
    { label: "Cortitos", on: f.durs.includes("20"), flip: () => patch({ durs: toggle(f.durs, "20") }) },
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
    const spin = window.setInterval(() => setPick((p) => p && { ...p, face: 1 + Math.floor(Math.random() * 6) }), 110);
    const stop = window.setTimeout(() => setPick((p) => p && { ...p, rolling: false }), 950);
    return () => {
      window.clearInterval(spin);
      window.clearTimeout(stop);
    };
  }, [pick?.rolling, pick?.game]);

  const openShelf = (preset: Partial<Filters>) => {
    patch({ ...EMPTY, sort: f.sort, ...preset });
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="page home">
      <section className="hello">
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

      <section className="finder" aria-label="Buscar qué jugar">
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

        <div className="search-row">
          <label className="search">
            <Icon name="search" size={20} />
            <input type="search" placeholder="Buscar un juego…" aria-label="Buscar por nombre" value={f.q} onChange={(e) => patch({ q: e.target.value })} />
          </label>
          <button className={`btn ${open ? "primary" : ""}`} aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon name="sliders" />
            <span>Filtros{advCount ? ` · ${advCount}` : ""}</span>
          </button>
        </div>

        <div className="moods" role="group" aria-label="Atajos">
          {moods.map((m) => (
            <button key={m.label} className={`chip ${m.on ? "on" : ""}`} aria-pressed={m.on} onClick={m.flip}>
              {m.label}
            </button>
          ))}
        </div>

        {open && (
          <div className="filter-panel">
            <Chips label="Tipo" options={TYPES.map((t) => ({ id: t, label: t }))} selected={f.types} onToggle={(id) => patch({ types: toggle(f.types, id) })} />
            <Chips label="Dificultad" options={DIFFS.map((t) => ({ id: t, label: t }))} selected={f.diffs} onToggle={(id) => patch({ diffs: toggle(f.diffs, id) })} />
            <Chips label="Duración" options={DURS} selected={f.durs} onToggle={(id) => patch({ durs: toggle(f.durs, id) })} />
            <Chips label="Categoría" options={allCategories.map((t) => ({ id: t, label: t }))} selected={f.cats} onToggle={(id) => patch({ cats: toggle(f.cats, id) })} />
            <label className="switch">
              <input type="checkbox" checked={f.scorer} onChange={(e) => patch({ scorer: e.target.checked })} />
              <span>Tiene anotador</span>
            </label>
          </div>
        )}
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

      {!filtered &&
        shelves.map(
          (s) =>
            s.items.length > 0 && (
              <section className="shelf" key={s.title}>
                <header className="shelf-head">
                  <div>
                    <h2>{s.title}</h2>
                    <p>{s.sub}</p>
                  </div>
                  <button className="link" onClick={() => openShelf(s.preset)}>
                    Ver todos <Icon name="right" size={16} />
                  </button>
                </header>
                <div className="shelf-row">
                  {s.items.map((g) => (
                    <GameCard key={g.slug} game={g} mini />
                  ))}
                </div>
                <div className="plank" aria-hidden="true" />
              </section>
            )
        )}

      <section className="results">
        <header className="results-head">
          <h2 aria-live="polite">
            {filtered ? `${list.length} ${list.length === 1 ? "juego" : "juegos"}${f.n != null ? ` para ${f.n}` : ""}` : "Todo el estante"}
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
          <div className="grid">
            {list.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        ) : (
          <div className="card empty">
            <p className="big-emoji" aria-hidden="true">🫙</p>
            <h3>No hay nada en el estante con esos filtros</h3>
            <button className="btn primary" onClick={() => patch({ ...EMPTY, sort: f.sort })}>
              Ver todo
            </button>
          </div>
        )}
      </section>

      {pick && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Juego al azar" onClick={() => setPick(null)}>
          <div className="card picker" onClick={(e) => e.stopPropagation()}>
            <Dice face={pick.face} className={pick.rolling ? "rolling" : "landed"} />
            {pick.rolling ? (
              <p className="muted">Tirando el dado…</p>
            ) : (
              <>
                <p className="eyebrow">Hoy se juega a…</p>
                <GameCard game={pick.game} />
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
