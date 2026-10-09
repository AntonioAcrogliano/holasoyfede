import { NumInput, leaderOf, ranking, sum } from "./frame";
import { Avatar, PlayerName } from "../components/Player";
import type { BodyProps, ScorerDef } from "./frame";

// ───────── counter: un total por jugador ─────────

type CounterOpts = {
  mode?: "players" | "teams";
  steps?: number[];
  target?: number;
  lowestWins?: boolean;
  lapAt?: number; // avisa cuando alguien pasa este número (el tablero da la vuelta)
  start?: number;
  min?: number;
  max?: number;
  def?: number;
  note?: string;
};
type CounterState = { scores: number[] };

export function counterDef(o: CounterOpts = {}): ScorerDef<CounterState> {
  const steps = o.steps ?? [1, 5, 10];
  function Body({ data, names, update }: BodyProps<CounterState>) {
    const set = (i: number, v: number) => update((d) => ({ scores: d.scores.map((s, j) => (j === i ? v : s)) }));
    const best = o.lowestWins ? Math.min(...data.scores) : Math.max(...data.scores);
    const allSame = data.scores.every((s) => s === data.scores[0]);
    return (
      <>
        {o.note && <p className="hint">{o.note}</p>}
        <div className="stack">
          {names.map((n, i) => {
            const s = data.scores[i];
            const reached = o.target != null && s >= o.target;
            const lapped = o.lapAt != null && s >= o.lapAt;
            return (
              <div className={`card player ${!allSame && s === best ? "is-lead" : ""}`} key={i}>
                <div className="player-head">
                  <span className="player-name"><PlayerName name={n} /></span>
                  <NumInput className="score-big" value={s} label={`Puntos de ${n}`} onCommit={(v) => set(i, v ?? 0)} />
                </div>
                {reached && <p className="badge ok">¡Llegó a {o.target}!</p>}
                {lapped && !reached && (
                  <p className="badge info">Pasó los {o.lapAt}: ya dio {Math.floor(s / o.lapAt!)} vuelta{s >= o.lapAt! * 2 ? "s" : ""} al tablero</p>
                )}
                <div className="btn-grid">
                  <button className="btn big" onClick={() => set(i, s - 1)} aria-label={`Restar 1 a ${n}`}>−1</button>
                  {steps.map((st) => (
                    <button className="btn big tint" key={st} onClick={() => set(i, s + st)} aria-label={`Sumar ${st} a ${n}`}>
                      +{st}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return {
    setup: { mode: o.mode ?? "players", min: o.min ?? (o.mode === "teams" ? 2 : 1), max: o.max ?? 12, def: o.def ?? (o.mode === "teams" ? 2 : 4) },
    init: (names) => ({ scores: names.map(() => o.start ?? 0) }),
    Body,
    leader: (d, names) => leaderOf(names, d.scores, o.lowestWins),
    summary: (d, names) => ranking(names, d.scores, o.lowestWins),
  };
}

// ───────── rounds / target: tabla de jugadores × rondas ─────────

type RoundsOpts = {
  mode?: "players" | "teams";
  target?: number;
  lowestWins?: boolean;
  fixed?: number; // cantidad fija de rondas
  roundLabel?: string;
  min?: number;
  max?: number;
  def?: number;
  note?: string;
};
type RoundsState = { rounds: (number | null)[][] };

export function roundsDef(o: RoundsOpts = {}): ScorerDef<RoundsState> {
  const label = o.roundLabel ?? "Ronda";
  const totals = (d: RoundsState, n: number) => Array.from({ length: n }, (_, i) => sum(d.rounds.map((r) => r[i])));

  function Body({ data, names, update }: BodyProps<RoundsState>) {
    const tot = totals(data, names.length);
    const reached = o.target != null ? names.filter((_, i) => tot[i] >= o.target!) : [];
    const lastFull = data.rounds[data.rounds.length - 1].every((x) => x != null);
    const set = (r: number, i: number, v: number | null) =>
      update((d) => ({ rounds: d.rounds.map((row, rr) => (rr === r ? row.map((x, j) => (j === i ? v : x)) : row)) }));
    return (
      <>
        {o.note && <p className="hint">{o.note}</p>}
        {o.target != null && (
          <p className={`badge ${reached.length ? "ok" : "info"}`}>
            {reached.length
              ? `${reached.join(" y ")} ${reached.length > 1 ? "llegaron" : "llegó"} a ${o.target}. Terminen la ronda y cierren la partida.`
              : `Se juega hasta ${o.target}${o.lowestWins ? ". Gana el que MENOS tiene" : ""}.`}
          </p>
        )}
        <div className="table-wrap">
          <table className="score-table">
            <thead>
              <tr>
                <th scope="col">{label}</th>
                {names.map((n, i) => (
                  <th scope="col" key={i}>
                    <span className="th-player">
                      <Avatar name={n} size={22} />
                      {n}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rounds.map((row, r) => (
                <tr key={r}>
                  <th scope="row">{r + 1}</th>
                  {names.map((n, i) => (
                    <td key={i}>
                      <NumInput value={row[i] ?? null} label={`${label} ${r + 1}, ${n}`} onCommit={(v) => set(r, i, v)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                {tot.map((t, i) => (
                  <td key={i} className={o.target != null && t >= o.target ? "hit" : ""}>{t}</td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        {!o.fixed && (
          <button
            className="btn big block"
            onClick={() => update((d) => ({ rounds: [...d.rounds, names.map(() => null)] }))}
            disabled={!lastFull}
          >
            + Agregar {label.toLowerCase()}
          </button>
        )}
      </>
    );
  }
  return {
    setup: { mode: o.mode ?? "players", min: o.min ?? 2, max: o.max ?? 12, def: o.def ?? 4 },
    init: (names) => ({ rounds: Array.from({ length: o.fixed ?? 1 }, () => names.map(() => null)) }),
    Body,
    leader: (d, names) => leaderOf(names, totals(d, names.length), o.lowestWins),
    summary: (d, names) => ranking(names, totals(d, names.length), o.lowestWins),
  };
}
