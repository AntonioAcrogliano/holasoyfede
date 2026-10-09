import { useState } from "react";
import { NumInput, SandTimer, Stepper, leaderOf, ranking, sum } from "./frame";
import type { BodyProps, ScorerDef } from "./frame";
import { counterDef } from "./generic";

const setAt = <T,>(xs: T[], i: number, v: T) => xs.map((x, j) => (j === i ? v : x));

function PlayerTabs({ names, active, onPick, extra }: { names: string[]; active: number; onPick: (i: number) => void; extra?: (i: number) => string | number }) {
  return (
    <div className="pills" role="tablist" aria-label="Jugador">
      {names.map((n, i) => (
        <button key={i} role="tab" aria-selected={i === active} className={`pill ${i === active ? "on" : ""}`} onClick={() => onPick(i)}>
          {n}
          {extra && <b>{extra(i)}</b>}
        </button>
      ))}
    </div>
  );
}

// ───────────────────────── TRUCO ─────────────────────────

type Truco = { pts: [number, number]; to: 15 | 30 };

function Palitos({ n }: { n: number }) {
  // cuadradito de fósforos: 4 lados + la diagonal
  const sticks: [number, number, number, number][] = [
    [9, 37, 9, 9],
    [9, 9, 37, 9],
    [37, 9, 37, 37],
    [37, 37, 9, 37],
    [9, 37, 37, 9],
  ];
  return (
    <svg className="palitos" viewBox="0 0 46 46" aria-hidden="true">
      <rect x="3" y="3" width="40" height="40" rx="8" className="palitos-slot" />
      {sticks.slice(0, n).map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} className="palito" />
          <circle cx={x2} cy={y2} r="3.2" className="palito-head" />
        </g>
      ))}
    </svg>
  );
}

function TrucoBody({ data, names, update }: BodyProps<Truco>) {
  const { pts, to } = data;
  const add = (t: 0 | 1, n: number) =>
    update((d) => ({ ...d, pts: setAt(d.pts, t, Math.max(0, Math.min(d.to, d.pts[t] + n))) as [number, number] }));
  const falta = (t: 0 | 1) => {
    // Las dos en malas (a 30): el que gana se lleva el partido. Si no: lo que le falta al que va ganando.
    if (to === 30 && pts[0] < 15 && pts[1] < 15) return 30 - pts[t];
    return to - Math.max(pts[0], pts[1]);
  };
  const winner = pts[0] >= to ? 0 : pts[1] >= to ? 1 : -1;
  const quick: [string, number][] = [
    ["Envido", 2],
    ["Real envido", 3],
    ["Truco", 2],
    ["Retruco", 3],
    ["Vale cuatro", 4],
  ];
  return (
    <>
      <div className="row center">
        <span className="muted">Partida a</span>
        {([15, 30] as const).map((n) => (
          <button
            key={n}
            className={`pill ${to === n ? "on" : ""}`}
            aria-pressed={to === n}
            onClick={() => update((d) => ({ to: n, pts: [Math.min(n, d.pts[0]), Math.min(n, d.pts[1])] }))}
          >
            {n}
          </button>
        ))}
      </div>
      {winner >= 0 && <p className="badge ok">¡Ganó {names[winner]}! Tocá «Terminar» para cerrar la partida.</p>}
      <div className="truco">
        {([0, 1] as const).map((t) => {
          const boxes = Array.from({ length: to / 5 }, (_, b) => Math.max(0, Math.min(5, pts[t] - b * 5)));
          return (
            <div className="card truco-col" key={t}>
              <h3>{names[t]}</h3>
              <div className="truco-score" aria-label={`${names[t]}: ${pts[t]} puntos`}>
                {pts[t]}
                {to === 30 && <small>{pts[t] >= 15 ? "buenas" : "malas"}</small>}
              </div>
              <div className="truco-boxes">
                {boxes.map((n, b) => (
                  <div key={b} className={to === 30 && b === 3 ? "buenas-start" : ""}>
                    <Palitos n={n} />
                  </div>
                ))}
              </div>
              <div className="row">
                <button className="btn big grow" onClick={() => add(t, -1)} aria-label={`Restar 1 a ${names[t]}`}>−1</button>
                <button className="btn big primary grow" onClick={() => add(t, 1)} aria-label={`Sumar 1 a ${names[t]}`}>+1</button>
              </div>
              <div className="stack tight">
                {quick.map(([label, n]) => (
                  <button className="btn tint between" key={label} onClick={() => add(t, n)}>
                    <span>{label}</span>
                    <b>+{n}</b>
                  </button>
                ))}
                <button className="btn tint between" onClick={() => add(t, falta(t))} disabled={winner >= 0}>
                  <span>Falta envido</span>
                  <b>+{falta(t)}</b>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="hint">
        Falta envido: si los dos están en las malas, el que gana se lleva el partido; si no, vale lo que le falta al que va ganando. Si en tu mesa se juega distinto, sumá a mano.
      </p>
    </>
  );
}

export const trucoDef: ScorerDef<Truco> = {
  setup: { mode: "teams", min: 2, max: 2, def: 2 },
  init: () => ({ pts: [0, 0], to: 30 }),
  Body: TrucoBody,
  leader: (d, names) => leaderOf(names, d.pts),
  summary: (d, names) => ranking(names, d.pts),
};

// ───────────────────────── AVALON / RESISTENCIA ─────────────────────────

type Mission = "ok" | "fail" | null;
type Avalon = { n: number; m: Mission[]; rej: number };

const TEAM_SIZES: Record<number, number[]> = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5],
};
const BAD_COUNT: Record<number, number> = { 5: 2, 6: 2, 7: 3, 8: 3, 9: 3, 10: 4 };

export function avalonDef(variant: "avalon" | "resistencia"): ScorerDef<Avalon> {
  const good = variant === "avalon" ? "los leales" : "la Resistencia";
  const bad = variant === "avalon" ? "los esbirros de Mordred" : "los espías";
  const failWord = variant === "avalon" ? "Fracaso" : "Sabotaje";
  const outcome = (d: Avalon): "good" | "bad" | null => {
    if (d.rej >= 5 || d.m.filter((x) => x === "fail").length >= 3) return "bad";
    if (d.m.filter((x) => x === "ok").length >= 3) return "good";
    return null;
  };

  function Body({ data, update }: BodyProps<Avalon>) {
    const sizes = TEAM_SIZES[data.n];
    const cur = data.m.findIndex((x) => x == null);
    const out = outcome(data);
    const resolve = (r: Mission) => update((d) => ({ ...d, m: setAt(d.m, cur, r), rej: 0 }));
    return (
      <>
        <div className="card">
          <div className="between">
            <span>¿Cuántos juegan?</span>
            <Stepper value={data.n} min={5} max={10} label="jugadores" onChange={(n) => update((d) => ({ ...d, n }))} />
          </div>
          <p className="muted">
            {data.n - BAD_COUNT[data.n]} buenos y {BAD_COUNT[data.n]} malos.
          </p>
        </div>

        <ol className="missions" aria-label="Misiones">
          {sizes.map((size, i) => {
            const twoFails = i === 3 && data.n >= 7;
            const st = data.m[i];
            return (
              <li key={i} className={`mission ${st ?? ""} ${i === cur && !out ? "now" : ""}`}>
                <span className="mission-n">Misión {i + 1}</span>
                <span className="mission-size">{size}</span>
                <span className="mission-sub">{st === "ok" ? "Éxito" : st === "fail" ? failWord : twoFails ? "2 fallos" : "van"}</span>
              </li>
            );
          })}
        </ol>

        {out ? (
          <p className={`badge ${out === "good" ? "ok" : "bad"}`}>
            {out === "good"
              ? `Tres misiones para ${good}.${variant === "avalon" ? " Ahora el Asesino puede intentar matar a Merlín." : ""}`
              : data.rej >= 5
              ? `Cinco equipos rechazados: ganan ${bad}.`
              : `Tres misiones fallidas: ganan ${bad}.`}
          </p>
        ) : (
          <div className="card">
            <h3>
              Misión {cur + 1}: van {sizes[cur]}
            </h3>
            {cur === 3 && data.n >= 7 && <p className="muted">Esta misión necesita 2 cartas de {failWord.toLowerCase()} para fallar.</p>}
            <div className="row">
              <button className="btn big ok grow" onClick={() => resolve("ok")}>Éxito</button>
              <button className="btn big bad grow" onClick={() => resolve("fail")}>{failWord}</button>
            </div>
            <hr />
            <div className="between">
              <span>Equipos rechazados seguidos</span>
              <span className="rejects" aria-label={`${data.rej} de 5`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <i key={i} className={i < data.rej ? "on" : ""} />
                ))}
              </span>
            </div>
            <div className="row">
              <button className="btn grow" onClick={() => update((d) => ({ ...d, rej: d.rej + 1 }))}>Equipo rechazado</button>
              <button className="btn grow" onClick={() => update((d) => ({ ...d, rej: 0 }))} disabled={data.rej === 0}>
                Equipo aprobado
              </button>
            </div>
            {data.rej === 4 && <p className="badge bad">Ojo: un rechazo más y ganan {bad}.</p>}
          </div>
        )}
        <p className="hint">Acá no se anota ningún rol secreto: solo lo que ve toda la mesa.</p>
      </>
    );
  }

  return {
    setup: { mode: "none" },
    init: () => ({ n: 5, m: [null, null, null, null, null], rej: 0 }),
    Body,
    summary: (d) => {
      const out = outcome(d);
      const ok = d.m.filter((x) => x === "ok").length;
      const ko = d.m.filter((x) => x === "fail").length;
      return {
        title: out === "good" ? `¡Ganaron ${good}!` : out === "bad" ? `¡Ganaron ${bad}!` : "Partida sin terminar",
        lines: [
          `Misiones con éxito: ${ok}`,
          `Misiones fallidas: ${ko}`,
          ...(out === "good" && variant === "avalon" ? ["…salvo que el Asesino haya encontrado a Merlín."] : []),
        ],
      };
    },
  };
}

// ───────────────────────── CATAN ─────────────────────────

type Catan = { p: { pueblos: number; ciudades: number; pv: number }[]; camino: number | null; ejercito: number | null };

const catanTotal = (d: Catan, i: number) =>
  d.p[i].pueblos + d.p[i].ciudades * 2 + d.p[i].pv + (d.camino === i ? 2 : 0) + (d.ejercito === i ? 2 : 0);

function CatanBody({ data, names, update }: BodyProps<Catan>) {
  const setP = (i: number, k: "pueblos" | "ciudades" | "pv", v: number) =>
    update((d) => ({ ...d, p: setAt(d.p, i, { ...d.p[i], [k]: v }) }));
  const toggle = (k: "camino" | "ejercito", i: number) => update((d) => ({ ...d, [k]: d[k] === i ? null : i }));
  return (
    <div className="stack">
      {names.map((n, i) => {
        const total = catanTotal(data, i);
        return (
          <div className={`card player ${total >= 10 ? "is-lead" : ""}`} key={i}>
            <div className="player-head">
              <span className="player-name">{n}</span>
              <span className="score-big" aria-label={`${total} puntos`}>
                {total}
                <small>/10</small>
              </span>
            </div>
            {total >= 10 && <p className="badge ok">¡Llegó a 10! Gana si es su turno.</p>}
            <div className="between">
              <span>Pueblos <small className="muted">×1</small></span>
              <Stepper value={data.p[i].pueblos} max={5} label={`pueblos de ${n}`} onChange={(v) => setP(i, "pueblos", v)} />
            </div>
            <div className="between">
              <span>Ciudades <small className="muted">×2</small></span>
              <Stepper value={data.p[i].ciudades} max={4} label={`ciudades de ${n}`} onChange={(v) => setP(i, "ciudades", v)} />
            </div>
            <div className="between">
              <span>Cartas de PV <small className="muted">×1</small></span>
              <Stepper value={data.p[i].pv} max={5} label={`cartas de punto de ${n}`} onChange={(v) => setP(i, "pv", v)} />
            </div>
            <div className="row">
              <button className={`btn grow ${data.camino === i ? "primary" : ""}`} aria-pressed={data.camino === i} onClick={() => toggle("camino", i)}>
                Camino más largo +2
              </button>
              <button className={`btn grow ${data.ejercito === i ? "primary" : ""}`} aria-pressed={data.ejercito === i} onClick={() => toggle("ejercito", i)}>
                Gran ejército +2
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const catanDef: ScorerDef<Catan> = {
  setup: { mode: "players", min: 3, max: 6, def: 4 },
  init: (names) => ({ p: names.map(() => ({ pueblos: 2, ciudades: 0, pv: 0 })), camino: null, ejercito: null }),
  Body: CatanBody,
  leader: (d, names) => leaderOf(names, names.map((_, i) => catanTotal(d, i))),
  summary: (d, names) => ranking(names, names.map((_, i) => catanTotal(d, i)), false, " PV"),
};

// ───────────────────────── CARTÓGRAFOS ─────────────────────────

// por jugador y estación: [edicto 1, edicto 2, monedas, monstruos]
type Carto = { s: (number | null)[][][] };
const SEASONS = [
  { name: "Primavera", e: ["A", "B"] },
  { name: "Verano", e: ["B", "C"] },
  { name: "Otoño", e: ["C", "D"] },
  { name: "Invierno", e: ["D", "A"] },
];
const seasonTotal = (x: (number | null)[]) => (x[0] ?? 0) + (x[1] ?? 0) + (x[2] ?? 0) - Math.abs(x[3] ?? 0);
const cartoTotal = (d: Carto, i: number) => sum(d.s[i].map(seasonTotal));

function CartoBody({ data, names, update }: BodyProps<Carto>) {
  const [p, setP] = useState(0);
  const i = Math.min(p, names.length - 1);
  const set = (se: number, k: number, v: number | null) =>
    update((d) => ({ s: setAt(d.s, i, setAt(d.s[i], se, setAt(d.s[i][se], k, v))) }));
  return (
    <>
      <PlayerTabs names={names} active={i} onPick={setP} extra={(j) => cartoTotal(data, j)} />
      <div className="stack">
        {SEASONS.map((se, si) => {
          const x = data.s[i][si];
          const cells = [`Edicto ${se.e[0]}`, `Edicto ${se.e[1]}`, "Monedas", "Monstruos −"];
          return (
            <div className="card" key={si}>
              <div className="between">
                <h3>{se.name}</h3>
                <span className="score-mid">{seasonTotal(x)}</span>
              </div>
              <div className="quad">
                {cells.map((c, k) => (
                  <label key={k}>
                    <span>{c}</span>
                    <NumInput value={x[k]} label={`${se.name}, ${c}, ${names[i]}`} onCommit={(v) => set(si, k, v)} placeholder="0" />
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="hint">Las monedas se anotan en todas las estaciones (las que tengas acumuladas). Los monstruos se cargan en positivo y se restan solos.</p>
    </>
  );
}

export const cartografosDef: ScorerDef<Carto> = {
  setup: { mode: "players", min: 1, max: 12, def: 4 },
  init: (names) => ({ s: names.map(() => SEASONS.map(() => [null, null, null, null])) }),
  Body: CartoBody,
  leader: (d, names) => leaderOf(names, names.map((_, i) => cartoTotal(d, i))),
  summary: (d, names) => ranking(names, names.map((_, i) => cartoTotal(d, i))),
};

// ───────────────────────── SUSHI GO ─────────────────────────

type Sushi = { r: (number | null)[][]; pud: number[] };

function puddingPoints(pud: number[]): number[] {
  const hi = Math.max(...pud);
  const lo = Math.min(...pud);
  if (hi === lo) return pud.map(() => 0); // todos iguales: nadie suma ni resta
  const nHi = pud.filter((x) => x === hi).length;
  const nLo = pud.filter((x) => x === lo).length;
  return pud.map((x) =>
    x === hi ? Math.floor(6 / nHi) : x === lo && pud.length > 2 ? -Math.floor(6 / nLo) : 0
  );
}
const sushiTotals = (d: Sushi) => {
  const pp = puddingPoints(d.pud);
  return d.r.map((r, i) => sum(r) + pp[i]);
};

function SushiBody({ data, names, update }: BodyProps<Sushi>) {
  const pp = puddingPoints(data.pud);
  const tot = sushiTotals(data);
  return (
    <>
      <div className="stack">
        {names.map((n, i) => (
          <div className="card player" key={i}>
            <div className="player-head">
              <span className="player-name">{n}</span>
              <span className="score-big">{tot[i]}</span>
            </div>
            <div className="quad three">
              {[0, 1, 2].map((r) => (
                <label key={r}>
                  <span>Ronda {r + 1}</span>
                  <NumInput
                    value={data.r[i][r]}
                    label={`Ronda ${r + 1}, ${n}`}
                    onCommit={(v) => update((d) => ({ ...d, r: setAt(d.r, i, setAt(d.r[i], r, v)) }))}
                    placeholder="0"
                  />
                </label>
              ))}
            </div>
            <div className="between">
              <span>
                Puddings 🍮 <small className="muted">{pp[i] > 0 ? `+${pp[i]}` : pp[i]}</small>
              </span>
              <Stepper value={data.pud[i]} max={10} label={`puddings de ${n}`} onChange={(v) => update((d) => ({ ...d, pud: setAt(d.pud, i, v) }))} />
            </div>
          </div>
        ))}
      </div>
      <p className="hint">
        Pudding: +6 para el que más tiene y −6 para el que menos (los empates se reparten).
        {names.length === 2 && " De a 2 no se resta nada al que menos tiene."}
      </p>
    </>
  );
}

export const sushigoDef: ScorerDef<Sushi> = {
  setup: { mode: "players", min: 2, max: 5, def: 4 },
  init: (names) => ({ r: names.map(() => [null, null, null]), pud: names.map(() => 0) }),
  Body: SushiBody,
  leader: (d, names) => leaderOf(names, sushiTotals(d)),
  summary: (d, names) => ranking(names, sushiTotals(d)),
};

// ───────────────────────── KINGDOMINO ─────────────────────────

type Zone = { t: number; cells: number; crowns: number };
type Kingdo = { p: { z: Zone[]; mid: boolean; arm: boolean }[] };
const TERRAINS = ["🌾 Trigo", "🌲 Bosque", "💧 Agua", "🌿 Pradera", "🪵 Pantano", "⛏️ Mina"];
const kingTotal = (d: Kingdo, i: number) =>
  sum(d.p[i].z.map((z) => z.cells * z.crowns)) + (d.p[i].mid ? 10 : 0) + (d.p[i].arm ? 5 : 0);

function KingBody({ data, names, update }: BodyProps<Kingdo>) {
  const [p, setP] = useState(0);
  const i = Math.min(p, names.length - 1);
  const me = data.p[i];
  const setMe = (next: Kingdo["p"][number]) => update((d) => ({ p: setAt(d.p, i, next) }));
  const setZone = (zi: number, patch: Partial<Zone>) => setMe({ ...me, z: setAt(me.z, zi, { ...me.z[zi], ...patch }) });
  return (
    <>
      <PlayerTabs names={names} active={i} onPick={setP} extra={(j) => kingTotal(data, j)} />
      <div className="stack">
        {me.z.map((z, zi) => (
          <div className="card zone" key={zi}>
            <div className="between">
              <select className="text" value={z.t} aria-label="Tipo de terreno" onChange={(e) => setZone(zi, { t: Number(e.target.value) })}>
                {TERRAINS.map((t, ti) => (
                  <option key={ti} value={ti}>{t}</option>
                ))}
              </select>
              <span className="score-mid">= {z.cells * z.crowns}</span>
              <button className="pm" aria-label="Borrar esta zona" onClick={() => setMe({ ...me, z: me.z.filter((_, j) => j !== zi) })}>×</button>
            </div>
            <div className="between">
              <span>Casillas</span>
              <Stepper value={z.cells} max={25} label="casillas" onChange={(v) => setZone(zi, { cells: v })} />
            </div>
            <div className="between">
              <span>Coronas 👑</span>
              <Stepper value={z.crowns} max={20} label="coronas" onChange={(v) => setZone(zi, { crowns: v })} />
            </div>
          </div>
        ))}
        <button className="btn big block" onClick={() => setMe({ ...me, z: [...me.z, { t: 0, cells: 1, crowns: 0 }] })}>
          + Agregar zona de terreno
        </button>
        <div className="card">
          <h3>Bonus opcionales</h3>
          <div className="row">
            <button className={`btn grow ${me.mid ? "primary" : ""}`} aria-pressed={me.mid} onClick={() => setMe({ ...me, mid: !me.mid })}>
              Reino del medio +10
            </button>
            <button className={`btn grow ${me.arm ? "primary" : ""}`} aria-pressed={me.arm} onClick={() => setMe({ ...me, arm: !me.arm })}>
              Armonía +5
            </button>
          </div>
        </div>
      </div>
      <p className="hint">Cargá cada zona conectada por separado: casillas × coronas. Las zonas sin coronas valen 0, ni hace falta anotarlas.</p>
    </>
  );
}

export const kingdominoDef: ScorerDef<Kingdo> = {
  setup: { mode: "players", min: 2, max: 4, def: 2 },
  init: (names) => ({ p: names.map(() => ({ z: [{ t: 0, cells: 1, crowns: 0 }], mid: false, arm: false })) }),
  Body: KingBody,
  leader: (d, names) => leaderOf(names, names.map((_, i) => kingTotal(d, i))),
  summary: (d, names) => ranking(names, names.map((_, i) => kingTotal(d, i))),
};

// ───────────────────────── MUNCHKIN ─────────────────────────

type Munch = { p: { lvl: number; gear: number }[] };

function MunchBody({ data, names, update }: BodyProps<Munch>) {
  const set = (i: number, patch: Partial<Munch["p"][number]>) => update((d) => ({ p: setAt(d.p, i, { ...d.p[i], ...patch }) }));
  return (
    <div className="stack">
      {names.map((n, i) => {
        const { lvl, gear } = data.p[i];
        return (
          <div className={`card player ${lvl >= 10 ? "is-lead" : ""}`} key={i}>
            <div className="player-head">
              <span className="player-name">{n}</span>
              <span className="score-big" aria-label={`Fuerza ${lvl + gear}`}>
                {lvl + gear}
                <small>fuerza</small>
              </span>
            </div>
            {lvl >= 10 && <p className="badge ok">¡Nivel 10! (tiene que ser matando un monstruo)</p>}
            <div className="between">
              <span>Nivel</span>
              <Stepper value={lvl} min={1} max={10} label={`nivel de ${n}`} onChange={(v) => set(i, { lvl: v })} />
            </div>
            <div className="between">
              <span>Bonus de equipo</span>
              <Stepper value={gear} min={-20} max={99} label={`bonus de equipo de ${n}`} onChange={(v) => set(i, { gear: v })} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const munchkinDef: ScorerDef<Munch> = {
  setup: { mode: "players", min: 2, max: 8, def: 4 },
  init: (names) => ({ p: names.map(() => ({ lvl: 1, gear: 0 })) }),
  Body: MunchBody,
  leader: (d, names) => leaderOf(names, d.p.map((x) => x.lvl)),
  summary: (d, names) => ranking(names, d.p.map((x) => x.lvl), false, " (nivel)"),
};

// ───────────────────────── JUST ONE ─────────────────────────

type JustOne = { left: number; score: number };
const justOneGrade = (s: number) =>
  s >= 13 ? "¡Puntaje perfecto! ¿Lo pueden repetir?"
  : s === 12 ? "¡Increíble! Sus amigos deben estar impresionados."
  : s === 11 ? "¡Genial! Esto merece un festejo."
  : s >= 9 ? "¡Epa! Nada mal."
  : s >= 7 ? "Están en el promedio. ¿Pueden hacerlo mejor?"
  : s >= 4 ? "Es un buen comienzo. ¡Prueben de nuevo!"
  : "A intentarlo de nuevo, y de nuevo, y de nuevo.";

function JustOneBody({ data, update }: BodyProps<JustOne>) {
  const over = data.left <= 0;
  return (
    <>
      <div className="duo">
        <div className="card center">
          <span className="muted">Aciertos</span>
          <span className="score-huge">{data.score}</span>
        </div>
        <div className="card center">
          <span className="muted">Cartas que quedan</span>
          <span className="score-huge">{data.left}</span>
        </div>
      </div>
      <div className="deck" aria-hidden="true">
        {Array.from({ length: 13 }, (_, i) => (
          <i key={i} className={i < data.score ? "won" : i < data.score + data.left ? "" : "lost"} />
        ))}
      </div>
      {over ? (
        <p className="badge ok">{data.score} de 13. {justOneGrade(data.score)}</p>
      ) : (
        <div className="stack tight">
          <button className="btn big ok block" onClick={() => update((d) => ({ left: d.left - 1, score: d.score + 1 }))}>
            ✓ Acertó <small>+1</small>
          </button>
          <button
            className="btn big bad block"
            onClick={() =>
              // con la última carta no hay "siguiente" que perder: se descarta una ya ganada
              update((d) => (d.left === 1 ? { left: 0, score: Math.max(0, d.score - 1) } : { left: d.left - 2, score: d.score }))
            }
          >
            ✗ Falló <small>pierden esta y la siguiente</small>
          </button>
          <button className="btn big block" onClick={() => update((d) => ({ ...d, left: d.left - 1 }))}>
            Pasó <small>pierden solo esta</small>
          </button>
        </div>
      )}
    </>
  );
}

export const justoneDef: ScorerDef<JustOne> = {
  setup: { mode: "none" },
  init: () => ({ left: 13, score: 0 }),
  Body: JustOneBody,
  summary: (d) => ({ title: `${d.score} de 13`, lines: [justOneGrade(d.score)] }),
};

// ───────────────────────── THE MIND ─────────────────────────

type Mind = { n: number; level: number; lives: number; stars: number };
const MIND_LEVELS: Record<number, number> = { 2: 12, 3: 10, 4: 8 };
const mindInit = (n: number): Mind => ({ n, level: 1, lives: n, stars: 1 });

function MindBody({ data, update }: BodyProps<Mind>) {
  const max = MIND_LEVELS[data.n];
  const won = data.level > max;
  const lost = data.lives <= 0;
  const pass = () =>
    update((d) => {
      const done = d.level; // premio por superar este nivel
      return {
        ...d,
        level: d.level + 1,
        stars: [2, 5, 8].includes(done) ? Math.min(3, d.stars + 1) : d.stars,
        lives: [3, 6, 9].includes(done) ? Math.min(5, d.lives + 1) : d.lives,
      };
    });
  return (
    <>
      <div className="row center">
        <span className="muted">Jugadores</span>
        {[2, 3, 4].map((n) => (
          <button key={n} className={`pill ${data.n === n ? "on" : ""}`} aria-pressed={data.n === n} onClick={() => update(mindInit(n))}>
            {n}
          </button>
        ))}
      </div>
      <div className="card center">
        <span className="muted">Nivel</span>
        <span className="score-huge">
          {Math.min(data.level, max)}
          <small>/{max}</small>
        </span>
        <span className="muted">{won ? "" : `Repartí ${data.level} carta${data.level > 1 ? "s" : ""} a cada uno`}</span>
      </div>
      <div className="duo">
        <div className="card center">
          <span className="muted">Vidas</span>
          <span className="tokens" aria-label={`${data.lives} vidas`}>{"🐇".repeat(Math.max(0, data.lives)) || "—"}</span>
        </div>
        <div className="card center">
          <span className="muted">Estrellas</span>
          <span className="tokens" aria-label={`${data.stars} estrellas`}>{"⭐".repeat(data.stars) || "—"}</span>
        </div>
      </div>
      {won ? (
        <p className="badge ok">¡Superaron los {max} niveles! Son una sola mente.</p>
      ) : lost ? (
        <p className="badge bad">Se quedaron sin vidas en el nivel {data.level}.</p>
      ) : (
        <div className="stack tight">
          <button className="btn big ok block" onClick={pass}>
            Nivel superado
            {[2, 5, 8].includes(data.level) && <small>premio: +1 estrella</small>}
            {[3, 6, 9].includes(data.level) && <small>premio: +1 vida</small>}
          </button>
          <button className="btn big bad block" onClick={() => update((d) => ({ ...d, lives: d.lives - 1 }))}>
            Perdimos una vida
          </button>
          <button className="btn big block" onClick={() => update((d) => ({ ...d, stars: d.stars - 1 }))} disabled={data.stars <= 0}>
            Usar una estrella ninja
          </button>
        </div>
      )}
    </>
  );
}

export const themindDef: ScorerDef<Mind> = {
  setup: { mode: "none" },
  init: () => mindInit(3),
  Body: MindBody,
  summary: (d) => {
    const max = MIND_LEVELS[d.n];
    return {
      title: d.level > max ? "¡Ganaron!" : `Llegaron al nivel ${d.level}`,
      lines: [`Niveles superados: ${Math.min(d.level - 1, max)} de ${max}`, `Vidas: ${Math.max(0, d.lives)} · Estrellas: ${d.stars}`],
    };
  },
};

// ───────────────────────── CLUE ─────────────────────────

type Clue = { marks: Record<string, number>; labels: string[][] };
const CLUE_GROUPS = ["Sospechosos", "Armas", "Habitaciones"];
// Nombres de la edición en español más común: a confirmar con la caja (se pueden editar).
const CLUE_DEFAULT = [
  ["Señorita Escarlata", "Coronel Mostaza", "Señora Blanco", "Señor Verde", "Señora Azulino", "Profesor Moradillo"],
  ["Candelabro", "Daga", "Tubo de plomo", "Revólver", "Soga", "Llave inglesa"],
  ["Cocina", "Salón de baile", "Invernadero", "Comedor", "Sala de billar", "Biblioteca", "Salón", "Vestíbulo", "Estudio"],
];
const CLUE_MARKS = ["", "✗", "✓", "?"];
const CLUE_MARK_NAMES = ["sin marcar", "no la tiene", "la tiene", "duda"];

function ClueBody({ data, names, update }: BodyProps<Clue>) {
  const [editing, setEditing] = useState(false);
  // encabezado corto: las 3 primeras letras, o inicial + número si se repiten ("Jugador 1", "Jugador 2"…)
  const short = names.map((n) => n.slice(0, 3));
  const head = names.map((n, i) => (short.indexOf(short[i]) === short.lastIndexOf(short[i]) ? short[i] : `${n[0]}${i + 1}`));
  const cycle = (k: string) => update((d) => ({ ...d, marks: { ...d.marks, [k]: ((d.marks[k] ?? 0) + 1) % CLUE_MARKS.length } }));
  return (
    <>
      <p className="hint">Tocá una celda para ir cambiando: ✗ no la tiene · ✓ la tiene · ? duda. Esta hoja es solo tuya: que no te la espíen.</p>
      <div className="table-wrap">
        <table className="clue">
          <thead>
            <tr>
              <th />
              {names.map((n, i) => (
                <th key={i} scope="col" title={n}>{head[i]}</th>
              ))}
            </tr>
          </thead>
          {CLUE_GROUPS.map((group, gi) => (
            <tbody key={gi}>
              <tr className="clue-group">
                <th colSpan={names.length + 1} scope="colgroup">{group}</th>
              </tr>
              {data.labels[gi].map((label, ri) => {
                const solved = names.length > 0 && names.every((_, ci) => data.marks[`${gi}.${ri}.${ci}`] === 1);
                return (
                  <tr key={ri} className={solved ? "clue-solved" : ""}>
                    <th scope="row">
                      {editing ? (
                        <input
                          className="text small"
                          value={label}
                          aria-label={`Nombre de ${label}`}
                          onChange={(e) => update((d) => ({ ...d, labels: setAt(d.labels, gi, setAt(d.labels[gi], ri, e.target.value)) }))}
                        />
                      ) : (
                        label
                      )}
                    </th>
                    {names.map((n, ci) => {
                      const k = `${gi}.${ri}.${ci}`;
                      const m = data.marks[k] ?? 0;
                      return (
                        <td key={ci}>
                          <button className={`cell m${m}`} onClick={() => cycle(k)} aria-label={`${label}, ${n}: ${CLUE_MARK_NAMES[m]}`}>
                            {CLUE_MARKS[m]}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>
      <button className="btn block" onClick={() => setEditing(!editing)}>
        {editing ? "Listo" : "Editar nombres (para que coincidan con tu caja)"}
      </button>
    </>
  );
}

export const clueDef: ScorerDef<Clue> = {
  setup: { mode: "players", min: 2, max: 6, def: 4 },
  init: () => ({ marks: {}, labels: CLUE_DEFAULT.map((g) => [...g]) }),
  Body: ClueBody,
  summary: (d, names) => {
    // lo que nadie tiene (todas ✗) está en el sobre
    const inEnvelope = d.labels.map((g, gi) =>
      g.filter((_, ri) => names.every((_, ci) => d.marks[`${gi}.${ri}.${ci}`] === 1))
    );
    return {
      title: "Caso cerrado",
      lines: CLUE_GROUPS.map((g, gi) => `${g}: ${inEnvelope[gi].join(", ") || "sin resolver"}`),
    };
  },
};

// ───────────────────────── PICTIONARY ─────────────────────────

const pictBase = counterDef({ mode: "teams", steps: [1, 2, 3], min: 2, max: 4, def: 2 });
export const pictionaryDef: typeof pictBase = {
  ...pictBase,
  Body: (p) => (
    <>
      <div className="card">
        <SandTimer seconds={60} />
      </div>
      <p className="hint">Anotá los casilleros que avanza cada equipo, o un punto por acierto si juegan sin tablero.</p>
      <pictBase.Body {...p} />
    </>
  ),
};

// ───────────────────────── MAGIC MAZE ─────────────────────────

type Maze = { won: number; lost: number };

function MazeBody({ data, update }: BodyProps<Maze>) {
  return (
    <>
      <div className="card">
        <SandTimer seconds={180} flippable big />
      </div>
      <p className="hint">«Dar vuelta» invierte el reloj como el de arena: lo que ya cayó es lo que queda. Si casi no cayó arena, quedás con poquito.</p>
      <div className="duo">
        <div className="card center">
          <span className="muted">Escapes logrados</span>
          <Stepper value={data.won} label="escapes logrados" onChange={(v) => update((d) => ({ ...d, won: v }))} />
        </div>
        <div className="card center">
          <span className="muted">Nos atraparon</span>
          <Stepper value={data.lost} label="derrotas" onChange={(v) => update((d) => ({ ...d, lost: v }))} />
        </div>
      </div>
    </>
  );
}

export const magicmazeDef: ScorerDef<Maze> = {
  setup: { mode: "none" },
  init: () => ({ won: 0, lost: 0 }),
  Body: MazeBody,
  summary: (d) => ({ title: d.won >= d.lost && d.won > 0 ? "¡Buen golpe!" : "Fin de la sesión", lines: [`Escapes logrados: ${d.won}`, `Veces que los atraparon: ${d.lost}`] }),
};
