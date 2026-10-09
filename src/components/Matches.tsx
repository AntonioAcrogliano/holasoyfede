import { useMemo, useState } from "react";
import { bySlug } from "../data/games";
import { heroStyle } from "../lib/ui";
import { clearHistory, discardMatch, playerKey, timeAgo, useHistory, useMatches } from "../lib/store";
import type { HistEntry } from "../lib/store";
import { leaderFor } from "../scorers";
import { Art } from "./Art";
import { Icon } from "./Icon";
import { Avatar } from "./Player";

/** Miniatura de la tapa de un juego, para listas. */
function Thumb({ slug }: { slug: string }) {
  const g = bySlug(slug);
  if (!g) return null;
  return (
    <span className="thumb" style={heroStyle(g.theme)}>
      <Art slug={slug} />
    </span>
  );
}

/** Partidas guardadas sin terminar: un toque y seguís donde estabas. */
export function InProgress({ limit }: { limit?: number }) {
  const matches = useMatches();
  const [asking, setAsking] = useState<string | null>(null);
  const list = matches.filter((m) => bySlug(m.slug)).slice(0, limit ?? 99);
  if (!list.length) return null;
  return (
    <section className="resume-list" aria-label="Partidas en curso">
      <header className="shelf-head">
        <div>
          <h2>Seguir partida</h2>
          <p>{matches.length === 1 ? "Quedó una a medio jugar" : `Quedaron ${matches.length} a medio jugar`}</p>
        </div>
        {limit != null && matches.length > limit && (
          <a className="link" href="#/partidas">
            Ver todas <Icon name="right" size={16} />
          </a>
        )}
      </header>
      <ul className="plain rows">
        {list.map((m) => {
          const g = bySlug(m.slug)!;
          const lead = leaderFor(g, m.data, m.names);
          return (
            <li key={m.slug} className="rowcard">
              <a className="rowcard-main" href={`#/juego/${m.slug}/anotador`}>
                <Thumb slug={m.slug} />
                <span className="rowcard-text">
                  <strong>{g.name}</strong>
                  <span>{lead ? `Va ganando ${lead}` : m.names.length ? m.names.join(" · ") : "En curso"}</span>
                  <small>{timeAgo(m.at)}</small>
                </span>
                <span className="rowcard-go">
                  Seguir <Icon name="right" size={16} />
                </span>
              </a>
              {asking === m.slug ? (
                <button className="rowcard-x danger" onClick={() => discardMatch(m.slug)}>
                  ¿Borrar?
                </button>
              ) : (
                <button className="rowcard-x" aria-label={`Descartar la partida de ${g.name}`} onClick={() => setAsking(m.slug)}>
                  <Icon name="x" size={16} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

type Standing = { name: string; wins: number; played: number; top: string | null };

function standings(history: HistEntry[]): Standing[] {
  const by = new Map<string, { name: string; wins: number; played: number; games: Map<string, number> }>();
  for (const e of history) {
    if (!e.winners) continue; // cooperativos y partidas sin ganador no cuentan para el podio
    const winners = new Set(e.winners.map(playerKey));
    for (const n of e.names) {
      const k = playerKey(n);
      const row = by.get(k) ?? { name: n, wins: 0, played: 0, games: new Map() };
      row.played++;
      if (winners.has(k)) {
        row.wins++;
        row.games.set(e.slug, (row.games.get(e.slug) ?? 0) + 1);
      }
      by.set(k, row);
    }
  }
  return [...by.values()]
    .map((r) => {
      const best = [...r.games.entries()].sort((a, b) => b[1] - a[1])[0];
      return { name: r.name, wins: r.wins, played: r.played, top: best ? bySlug(best[0])?.name ?? null : null };
    })
    .sort((a, b) => b.wins - a.wins || a.played - b.played || a.name.localeCompare(b.name, "es"));
}

export function MatchesPage() {
  const history = useHistory();
  const matches = useMatches();
  const [confirm, setConfirm] = useState(false);
  const table = useMemo(() => standings(history), [history]);
  const podium = table.filter((s) => s.wins > 0).slice(0, 3);
  // el podio se dibuja 2º · 1º · 3º
  const order = [podium[1], podium[0], podium[2]].filter(Boolean);
  const mostPlayed = useMemo(() => {
    const c = new Map<string, number>();
    history.forEach((e) => c.set(e.slug, (c.get(e.slug) ?? 0) + 1));
    const top = [...c.entries()].sort((a, b) => b[1] - a[1])[0];
    return top ? { name: bySlug(top[0])?.name ?? top[0], n: top[1] } : null;
  }, [history]);

  return (
    <main className="page">
      <section className="hello">
        <div className="hello-text">
          <p className="eyebrow">{history.length} {history.length === 1 ? "partida jugada" : "partidas jugadas"}</p>
          <h1>Partidas</h1>
        </div>
      </section>

      <InProgress />

      {!matches.length && !history.length && (
        <div className="card empty">
          <Art glyph="dice" className="empty-art" />
          <h3>Todavía no hay partidas</h3>
          <p>Abrí el anotador de cualquier juego y, cuando termines, va a quedar anotada acá.</p>
          <a className="btn primary" href="#/">Ir al estante</a>
        </div>
      )}

      {podium.length > 0 && (
        <section className="card podium-card">
          <h2>El podio de la casa</h2>
          <div className="podium">
            {order.map((s) => {
              const place = podium.indexOf(s) + 1;
              return (
                <div key={s.name} className={`podium-col p${place}`}>
                  <Avatar name={s.name} size={place === 1 ? 58 : 46} />
                  <strong>{s.name}</strong>
                  <span>{s.wins} {s.wins === 1 ? "victoria" : "victorias"}</span>
                  <div className="podium-step">{place}</div>
                </div>
              );
            })}
          </div>
          <ul className="plain standings">
            {table.map((s, i) => (
              <li key={s.name}>
                <span className="standings-n">{i + 1}</span>
                <Avatar name={s.name} size={30} />
                <span className="standings-name">
                  <strong>{s.name}</strong>
                  <small>
                    {s.played} {s.played === 1 ? "jugada" : "jugadas"}
                    {s.top ? ` · gana más en ${s.top}` : ""}
                  </small>
                </span>
                <span className="standings-w">{s.wins}</span>
              </li>
            ))}
          </ul>
          {mostPlayed && (
            <p className="muted">
              Lo que más sale: <strong>{mostPlayed.name}</strong> ({mostPlayed.n} {mostPlayed.n === 1 ? "vez" : "veces"}).
            </p>
          )}
        </section>
      )}

      {history.length > 0 && (
        <section className="stack">
          <header className="shelf-head">
            <div>
              <h2>Últimas partidas</h2>
            </div>
            {confirm ? (
              <span className="row">
                <button className="link danger" onClick={() => { clearHistory(); setConfirm(false); }}>Sí, borrar todo</button>
                <button className="link" onClick={() => setConfirm(false)}>No</button>
              </span>
            ) : (
              <button className="link" onClick={() => setConfirm(true)}>Borrar historial</button>
            )}
          </header>
          <ul className="plain rows">
            {history.slice(0, 40).map((e) => {
              const g = bySlug(e.slug);
              return (
                <li key={e.id} className="rowcard">
                  <a className="rowcard-main" href={`#/juego/${e.slug}`}>
                    <Thumb slug={e.slug} />
                    <span className="rowcard-text">
                      <strong>{g?.name ?? e.slug}</strong>
                      <span>{e.title}</span>
                      <small>
                        {timeAgo(e.at)}
                        {e.names.length ? ` · ${e.names.join(", ")}` : ""}
                      </small>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
