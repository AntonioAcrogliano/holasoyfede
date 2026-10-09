import { useState } from "react";
import { load, save } from "../lib/storage";
import { SandTimer } from "../scorers/frame";

const parseNames = (text: string) =>
  text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Tools() {
  const [text, setText] = useState(() => load<string[]>("ludoteca:nombres", []).join("\n"));
  const [first, setFirst] = useState<string | null>(null);
  const [groups, setGroups] = useState<[string[], string[]] | null>(null);
  const [mins, setMins] = useState(1);
  const [secs, setSecs] = useState(0);
  const names = parseNames(text);
  const total = Math.max(5, mins * 60 + secs);

  const onNames = (v: string) => {
    setText(v);
    save("ludoteca:nombres", parseNames(v));
  };

  return (
    <main className="page">
      <a className="back" href="#/">← Volver al estante</a>
      <section className="hello">
        <div className="hello-text">
          <p className="eyebrow">Para lo que la caja no trae</p>
          <h1>Herramientas</h1>
        </div>
      </section>

      <div className="stack">
        <section className="card block">
          <h3>¿Quiénes están?</h3>
          <textarea
            className="text"
            rows={4}
            placeholder={"Un nombre por línea\n(o separados por coma)"}
            aria-label="Nombres de los jugadores"
            value={text}
            onChange={(e) => onNames(e.target.value)}
          />
          <p className="muted">{names.length} {names.length === 1 ? "persona" : "personas"}. Sirve para el sorteo y para los grupos.</p>
        </section>

        <section className="card block">
          <h3>🎲 ¿Quién empieza?</h3>
          <button className="btn big primary block" disabled={names.length < 2} onClick={() => setFirst(names[Math.floor(Math.random() * names.length)])}>
            Sortear primer jugador
          </button>
          {first && (
            <p className="result" aria-live="polite" key={first + Math.random()}>
              Empieza <strong>{first}</strong>
            </p>
          )}
        </section>

        <section className="card block">
          <h3>👥 Armar 2 grupos</h3>
          <button
            className="btn big primary block"
            disabled={names.length < 2}
            onClick={() => {
              const s = shuffle(names);
              const half = Math.ceil(s.length / 2);
              setGroups([s.slice(0, half), s.slice(half)]);
            }}
          >
            Mezclar y separar
          </button>
          {groups && (
            <div className="duo" aria-live="polite">
              {groups.map((g, i) => (
                <div className="group" key={i}>
                  <strong>Grupo {i + 1}</strong>
                  <ul className="plain">
                    {g.map((n, j) => (
                      <li key={j}>{n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card block">
          <h3>⏳ Reloj de arena</h3>
          <div className="row center wrap">
            {[30, 60, 120, 180, 300].map((s) => (
              <button
                key={s}
                className={`pill ${total === s ? "on" : ""}`}
                aria-pressed={total === s}
                onClick={() => {
                  setMins(Math.floor(s / 60));
                  setSecs(s % 60);
                }}
              >
                {s < 60 ? `${s}s` : `${s / 60} min`}
              </button>
            ))}
          </div>
          <div className="row center">
            <label className="mini">
              <span>min</span>
              <input className="num" type="number" inputMode="numeric" min={0} max={90} value={mins} onChange={(e) => setMins(Math.max(0, Math.min(90, Number(e.target.value) || 0)))} />
            </label>
            <label className="mini">
              <span>seg</span>
              <input className="num" type="number" inputMode="numeric" min={0} max={59} value={secs} onChange={(e) => setSecs(Math.max(0, Math.min(59, Number(e.target.value) || 0)))} />
            </label>
          </div>
          <SandTimer seconds={total} flippable big />
        </section>
      </div>
    </main>
  );
}
