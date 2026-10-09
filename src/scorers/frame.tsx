import { Component, useEffect, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { load, matchKey, remove, save } from "../lib/storage";
import { Confetti } from "../components/Confetti";

export type BodyProps<S> = {
  data: S;
  names: string[];
  update: (next: S | ((d: S) => S)) => void;
  slug: string;
};

export type Summary = { title: string; lines: string[] };

export type ScorerDef<S> = {
  setup: { mode: "players" | "teams" | "none"; min?: number; max?: number; def?: number };
  init: (names: string[]) => S;
  Body: (p: BodyProps<S>) => ReactElement;
  leader?: (d: S, names: string[]) => string | null;
  summary: (d: S, names: string[]) => Summary;
};

type Match<S> = { names: string[]; data: S; hist: S[]; finished: boolean };

const HIST_MAX = 40;
const NAMES_KEY = { players: "ludoteca:nombres", teams: "ludoteca:equipos" } as const;

// ───────── helpers de ranking ─────────

export const sum = (xs: (number | null | undefined)[]) =>
  xs.reduce<number>((a, x) => a + (x ?? 0), 0);

const joinNames = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}`;

export function leaderOf(names: string[], scores: number[], lowestWins = false): string | null {
  if (!scores.length || scores.every((s) => s === scores[0])) return null;
  const best = lowestWins ? Math.min(...scores) : Math.max(...scores);
  return joinNames(names.filter((_, i) => scores[i] === best));
}

export function ranking(names: string[], scores: number[], lowestWins = false, unit = ""): Summary {
  const order = names
    .map((n, i) => ({ n, s: scores[i] ?? 0 }))
    .sort((a, b) => (lowestWins ? a.s - b.s : b.s - a.s));
  const winners = order.filter((o) => o.s === order[0].s).map((o) => o.n);
  return {
    title: winners.length > 1 ? `¡Empate entre ${joinNames(winners)}!` : `¡Ganó ${winners[0]}!`,
    lines: order.map((o, i) => `${i + 1}. ${o.n} — ${o.s}${unit}`),
  };
}

// ───────── input numérico que confirma al salir ─────────

export function NumInput({
  value,
  onCommit,
  label,
  className = "",
  placeholder = "–",
}: {
  value: number | null;
  onCommit: (v: number | null) => void;
  label: string;
  className?: string;
  placeholder?: string;
}) {
  const [text, setText] = useState(value == null ? "" : String(value));
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setText(value == null ? "" : String(value));
  }, [value]);
  // se lee del input y no del estado: si el blur llega pegado al último cambio, el estado todavía es el viejo
  const commit = (raw: string) => {
    const t = raw.trim().replace(",", ".");
    const n = t === "" ? null : Number(t);
    const v = n == null || Number.isNaN(n) ? null : Math.round(n);
    if (v !== value) onCommit(v);
    setText(v == null ? "" : String(v));
  };
  return (
    <input
      className={`num ${className}`}
      type="number"
      inputMode="numeric"
      aria-label={label}
      placeholder={placeholder}
      value={text}
      onFocus={(e) => {
        focused.current = true;
        e.currentTarget.select();
      }}
      onChange={(e) => setText(e.target.value)}
      onBlur={(e) => {
        focused.current = false;
        commit(e.currentTarget.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
    />
  );
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 999,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button className="pm" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Restar ${label}`}>
        −
      </button>
      <span className="stepper-val">{value}</span>
      <button className="pm" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Sumar ${label}`}>
        +
      </button>
    </div>
  );
}

// ───────── reloj de arena ─────────

export function SandTimer({ seconds, flippable = false, big = false }: { seconds: number; flippable?: boolean; big?: boolean }) {
  // `left` en ms; mientras corre se calcula contra `endAt` para no atrasarse con la pestaña en segundo plano
  const [left, setLeft] = useState(seconds * 1000);
  const [endAt, setEndAt] = useState<number | null>(null);
  useEffect(() => {
    setLeft(seconds * 1000);
    setEndAt(null);
  }, [seconds]);
  useEffect(() => {
    if (endAt == null) return;
    const id = window.setInterval(() => {
      const l = Math.max(0, endAt - Date.now());
      setLeft(l);
      if (l === 0) {
        setEndAt(null);
        try {
          navigator.vibrate?.([200, 100, 200]);
        } catch {
          /* sin vibración */
        }
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [endAt]);

  const running = endAt != null;
  const total = seconds * 1000;
  const secs = Math.ceil(left / 1000);
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");
  const done = left === 0;
  const start = () => left > 0 && setEndAt(Date.now() + left);
  const pause = () => setEndAt(null);
  const reset = () => {
    setEndAt(null);
    setLeft(total);
  };
  const flip = () => {
    const next = total - left; // la arena que ya cayó es la que queda por caer
    setLeft(next);
    setEndAt(next > 0 ? Date.now() + next : null);
  };

  return (
    <div className={`timer ${big ? "timer-big" : ""} ${done ? "timer-done" : ""} ${left <= 10000 && !done ? "timer-low" : ""}`}>
      <div className="timer-face" role="timer" aria-live="off">
        {mm}:{ss}
      </div>
      <div className="timer-bar">
        <span style={{ width: `${(left / total) * 100}%` }} />
      </div>
      {done && <p className="timer-msg">¡Tiempo!</p>}
      <div className="row center wrap">
        {running ? (
          <button className="btn big" onClick={pause}>Pausar</button>
        ) : (
          <button className="btn big primary" onClick={start} disabled={done}>
            {left === total ? "Arrancar" : "Seguir"}
          </button>
        )}
        {flippable && (
          <button className="btn big primary" onClick={flip} disabled={left === total}>
            Dar vuelta ⏳
          </button>
        )}
        <button className="btn big" onClick={reset}>Reiniciar</button>
      </div>
    </div>
  );
}

// ───────── carga de nombres ─────────

function Setup({ mode, min, max, def, onStart }: { mode: "players" | "teams"; min: number; max: number; def: number; onStart: (names: string[]) => void }) {
  const isTeams = mode === "teams";
  const [names, setNames] = useState<string[]>(() => {
    const saved = load<string[]>(NAMES_KEY[mode], []);
    const n = Math.min(max, Math.max(min, saved.length || def));
    return Array.from({ length: n }, (_, i) => saved[i] ?? "");
  });
  const fallback = (i: number) => (isTeams ? (names.length === 2 ? ["Nosotros", "Ellos"][i] : `Equipo ${i + 1}`) : `Jugador ${i + 1}`);
  const go = () => {
    const finalNames = names.map((n, i) => n.trim() || fallback(i));
    save(NAMES_KEY[mode], finalNames);
    onStart(finalNames);
  };
  return (
    <div className="card setup">
      <h3>{isTeams ? "¿Qué equipos juegan?" : "¿Quiénes juegan?"}</h3>
      <div className="setup-list">
        {names.map((n, i) => (
          <div className="row" key={i}>
            <input
              className="text"
              value={n}
              placeholder={fallback(i)}
              aria-label={fallback(i)}
              maxLength={18}
              onChange={(e) => setNames(names.map((x, j) => (j === i ? e.target.value : x)))}
            />
            {names.length > min && (
              <button className="pm" aria-label={`Sacar a ${n || fallback(i)}`} onClick={() => setNames(names.filter((_, j) => j !== i))}>
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {names.length < max && (
        <button className="btn" onClick={() => setNames([...names, ""])}>
          + Agregar {isTeams ? "equipo" : "jugador"}
        </button>
      )}
      <button className="btn big primary block" onClick={go}>
        ¡A jugar!
      </button>
    </div>
  );
}

// Si una partida guardada quedó con un formato viejo, no rompemos la página.
class Guard extends Component<{ onReset: () => void; children: ReactNode }, { broken: boolean }> {
  state = { broken: false };
  static getDerivedStateFromError() {
    return { broken: true };
  }
  render() {
    if (!this.state.broken) return this.props.children;
    return (
      <div className="card">
        <p>La partida guardada no se pudo abrir.</p>
        <button
          className="btn primary"
          onClick={() => {
            this.props.onReset();
            this.setState({ broken: false });
          }}
        >
          Empezar una nueva
        </button>
      </div>
    );
  }
}

// ───────── marco común de todos los anotadores ─────────

export function ScorerFrame<S>({ slug, def }: { slug: string; def: ScorerDef<S> }) {
  const key = matchKey(slug);
  const fresh = (names: string[]): Match<S> => ({ names, data: def.init(names), hist: [], finished: false });

  const [match, setMatch] = useState<Match<S> | null>(() => {
    const saved = load<Match<S> | null>(key, null);
    if (saved && Array.isArray(saved.names) && Array.isArray(saved.hist) && "data" in saved) return saved;
    return def.setup.mode === "none" ? fresh([]) : null;
  });
  // Solo preguntamos "¿seguir o nueva?" si al entrar ya había una partida empezada.
  const [asking, setAsking] = useState(() => match != null && match.hist.length > 0 && !match.finished);
  const [confirmNew, setConfirmNew] = useState(false);

  useEffect(() => {
    if (match) save(key, match);
    else remove(key);
  }, [key, match]);

  const startNew = () => {
    setAsking(false);
    setConfirmNew(false);
    setMatch(def.setup.mode === "none" ? fresh([]) : null);
  };

  if (!match) {
    const { mode, min = 2, max = 12, def: d = 4 } = def.setup;
    return <Setup mode={mode === "teams" ? "teams" : "players"} min={min} max={max} def={d} onStart={(names) => setMatch(fresh(names))} />;
  }

  if (asking) {
    return (
      <div className="card resume">
        <h3>Hay una partida guardada</h3>
        {match.names.length > 0 && <p className="muted">{match.names.join(" · ")}</p>}
        <button className="btn big primary block" onClick={() => setAsking(false)}>
          Seguir partida
        </button>
        <button className="btn big block" onClick={startNew}>
          Nueva partida
        </button>
      </div>
    );
  }

  const update: BodyProps<S>["update"] = (next) =>
    setMatch((m) => {
      if (!m) return m;
      const data = typeof next === "function" ? (next as (d: S) => S)(m.data) : next;
      if (data === m.data) return m;
      return { ...m, data, hist: [...m.hist, m.data].slice(-HIST_MAX) };
    });
  const undo = () =>
    setMatch((m) => (m && m.hist.length ? { ...m, data: m.hist[m.hist.length - 1], hist: m.hist.slice(0, -1) } : m));

  const lead = def.leader?.(match.data, match.names) ?? null;
  const result = match.finished ? def.summary(match.data, match.names) : null;

  return (
    <div className="scorer">
      <div className="scorer-bar">
        <button className="btn" onClick={undo} disabled={!match.hist.length}>
          ↩ Deshacer
        </button>
        <button className="btn" onClick={() => setConfirmNew(true)}>
          Nueva
        </button>
        <button className="btn primary" onClick={() => setMatch({ ...match, finished: true })}>
          Terminar
        </button>
      </div>
      {confirmNew && (
        <div className="card warn">
          <p>¿Borrar esta partida y empezar otra?</p>
          <div className="row">
            <button className="btn primary" onClick={startNew}>Sí, nueva partida</button>
            <button className="btn" onClick={() => setConfirmNew(false)}>No, seguir</button>
          </div>
        </div>
      )}
      {lead && <p className="leader" aria-live="polite">Va ganando: <strong>{lead}</strong></p>}
      <Guard onReset={startNew}>
        <def.Body data={match.data} names={match.names} update={update} slug={slug} />
      </Guard>
      {result && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Fin de la partida">
          <Confetti />
          <div className="card winner">
            <div className="winner-cup" aria-hidden="true">🏆</div>
            <h2>{result.title}</h2>
            <ul className="plain">
              {result.lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
            <button className="btn big primary block" onClick={startNew}>
              Nueva partida
            </button>
            <button className="btn big block" onClick={() => setMatch({ ...match, finished: false })}>
              Volver a la partida
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
