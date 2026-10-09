import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CheatSheet, Game, HowToPlay } from "../types";
import { bySlug } from "../data/games";
import { difficultyClass, heroStyle, playersLabel, tintVars } from "../lib/ui";
import { Scorer } from "../scorers";
import { useFavs } from "../lib/store";
import { Art } from "./Art";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

function Block({ title, children, kind = "" }: { title: string; children: ReactNode; kind?: string }) {
  return (
    <section className={`card block ${kind}`}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

const List = ({ items, ordered = false }: { items: string[]; ordered?: boolean }) =>
  ordered ? (
    <ol className="steps">{items.map((x, i) => <li key={i}>{x}</li>)}</ol>
  ) : (
    <ul className="bullets">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
  );

function HowTo({ h }: { h: HowToPlay }) {
  return (
    <div className="stack">
      <section className="goal">
        <span className="goal-ico"><Icon name="target" size={26} /></span>
        <div>
          <h3>Objetivo</h3>
          <p>{h.goal}</p>
        </div>
      </section>
      <Block title="Preparación"><List items={h.setup} ordered /></Block>
      <Block title="Cómo es un turno"><List items={h.turn} ordered /></Block>
      <Block title="Cómo termina" kind="end"><p>{h.end}</p></Block>
      {h.tips?.length ? <Block title="Tips para la primera partida" kind="tips"><List items={h.tips} /></Block> : null}
      {h.variants?.length ? <Block title="Variantes y notas"><List items={h.variants} /></Block> : null}
    </div>
  );
}

function Cheat({ c, game }: { c: CheatSheet; game: Game }) {
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [full]);
  return (
    <div className={full ? "cheat cheat-full" : "cheat"}>
      <div className="between cheat-top">
        {full && <strong className="cheat-title">{game.name}</strong>}
        <button className="btn" onClick={() => setFull(!full)}>
          <Icon name={full ? "x" : "expand"} />
          {full ? "Cerrar" : "Pantalla completa"}
        </button>
      </div>
      <div className="stack">
        <Block title="En tu turno" kind="turn"><List items={c.yourTurn} ordered /></Block>
        {c.keyActions?.length ? (
          <Block title="Acciones y cartas clave">
            <dl className="keys">
              {c.keyActions.map((k, i) => (
                <div key={i}>
                  <dt>{k.name}</dt>
                  <dd>{k.text}</dd>
                </div>
              ))}
            </dl>
          </Block>
        ) : null}
        {c.scoring?.length ? <Block title="Cómo se puntúa"><List items={c.scoring} /></Block> : null}
        {c.commonMistakes?.length ? <Block title="Errores comunes" kind="mistakes"><List items={c.commonMistakes} /></Block> : null}
      </div>
    </div>
  );
}

function Stat({ icon, label, children, className = "" }: { icon: IconName; label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`stat ${className}`}>
      <Icon name={icon} size={20} />
      <span className="stat-val">{children}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const TAB_ICONS: Record<string, IconName> = { como: "book", cheat: "bolt", anotador: "pencil" };

export function GamePage({ slug, tab, dark }: { slug: string; tab?: string; dark: boolean }) {
  const game = bySlug(slug);
  const [favs, toggleFav] = useFavs();

  // El tema del juego tiñe toda la página (acento y fondo) mientras estés en su ficha.
  useEffect(() => {
    if (!game) return;
    const vars = tintVars(game.theme, dark);
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    document.title = `${game.name} · Ludoteca de Fede`;
    return () => {
      Object.keys(vars).forEach((k) => root.style.removeProperty(k));
      document.title = "Hola, soy la Ludoteca de Fede";
    };
  }, [game, dark]);

  if (!game) {
    return (
      <main className="page">
        <div className="card empty">
          <Art glyph="box" className="empty-art" />
          <h3>Ese juego no está en el estante</h3>
          <a className="btn primary" href="#/">Volver al catálogo</a>
        </div>
      </main>
    );
  }

  const tabs = [
    game.howToPlay && { id: "como", label: "Cómo se juega" },
    game.cheatSheet && { id: "cheat", label: "Cheat sheet" },
    game.scorer && { id: "anotador", label: "Anotador" },
  ].filter(Boolean) as { id: string; label: string }[];
  const active = tabs.find((t) => t.id === tab)?.id ?? tabs[0]?.id;
  const base = game.requires ? bySlug(game.requires) : undefined;
  // en el anotador y la cheat sheet la cabecera se achica: en la mesa importa lo de abajo
  const compact = !!active && active !== "como";
  const hasStats = game.players.min != null || game.minutes != null || game.difficulty || game.type;

  return (
    <main className="page game">
      <header className={`ghero ${compact ? "ghero-compact" : ""}`} style={heroStyle(game.theme)}>
        <Art slug={game.slug} className="cover-ghost" />
        <div className="ghero-top">
          <a className="ghero-back" href="#/" aria-label="Volver al estante">
            <Icon name="back" size={20} />
            <span>Estante</span>
          </a>
          <button
            className={`ghero-fav ${favs.includes(game.slug) ? "on" : ""}`}
            aria-pressed={favs.includes(game.slug)}
            aria-label={favs.includes(game.slug) ? "Sacar de favoritos" : "Agregar a favoritos"}
            onClick={() => toggleFav(game.slug)}
          >
            <Icon name="heart" size={20} />
          </button>
        </div>
        <div className="ghero-main">
          <span className="cover-token">
            <Art slug={game.slug} />
          </span>
          <div className="ghero-text">
            {game.status === "falta-info" ? <span className="cover-sticker">Falta info</span> : game.type && <span className="cover-over">{game.type}</span>}
            <h1>{game.name}</h1>
            <p className="ghero-desc">{game.description}</p>
          </div>
        </div>
      </header>

      {!compact && hasStats && (
        <div className="stats">
          {game.players.min != null && <Stat icon="users" label="jugadores">{playersLabel(game)}</Stat>}
          {game.minutes != null && <Stat icon="clock" label="minutos">{game.minutes}</Stat>}
          {game.difficulty && <Stat icon="gauge" label="dificultad" className={difficultyClass(game.difficulty)}>{game.difficulty}</Stat>}
          {game.type && <Stat icon="shapes" label="tipo">{game.type}</Stat>}
        </div>
      )}

      {base && (
        <p className="note">
          Es una expansión: necesita <a href={`#/juego/${base.slug}`}>{base.name}</a>.
        </p>
      )}
      {game.notes && !base && <p className="note">{game.notes}</p>}

      {game.status === "falta-info" && (
        <div className="card empty">
          <Art glyph="question" className="empty-art" />
          <h3>Todavía no cargamos cómo se juega</h3>
          <p>¿Sabés cómo se juega? Avisale a Fede.</p>
        </div>
      )}

      {tabs.length > 0 && (
        <>
          <nav className="tabs" role="tablist" aria-label="Secciones">
            {tabs.map((t) => (
              <a key={t.id} role="tab" aria-selected={t.id === active} className={`tab ${t.id === active ? "on" : ""}`} href={`#/juego/${game.slug}/${t.id}`}>
                <Icon name={TAB_ICONS[t.id]} />
                <span>{t.label}</span>
              </a>
            ))}
          </nav>
          <div role="tabpanel" className="panel" key={active}>
            {active === "como" && game.howToPlay && <HowTo h={game.howToPlay} />}
            {active === "cheat" && game.cheatSheet && <Cheat c={game.cheatSheet} game={game} />}
            {active === "anotador" && game.scorer && <Scorer game={game} />}
          </div>
        </>
      )}

      {!compact && (
        <a
          className="bgg"
          href={`https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=${encodeURIComponent(game.name.replace(/\s*\(.*?\)\s*/g, " ").trim())}`}
          target="_blank"
          rel="noreferrer"
        >
          Buscar en BoardGameGeek <Icon name="external" size={16} />
        </a>
      )}
    </main>
  );
}
