import { usePlayerColors } from "../lib/store";

/** La ficha de un jugador: un disco de su color con la inicial. Se repite igual en todos los anotadores. */
export function Avatar({ name, size = 28, onCycle }: { name: string; size?: number; onCycle?: () => void }) {
  const { colorOf, cycle } = usePlayerColors();
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  const style = { background: colorOf(name), width: size, height: size, fontSize: size * 0.5 };
  if (!onCycle) return <span className="avatar" style={style} aria-hidden="true">{initial}</span>;
  return (
    <button
      type="button"
      className="avatar avatar-btn"
      style={style}
      title="Cambiar color"
      aria-label={`Cambiar el color de ${name || "este jugador"}`}
      onClick={() => {
        cycle(name);
        onCycle();
      }}
    >
      {initial}
    </button>
  );
}

export function PlayerName({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <span className="pname">
      <Avatar name={name} size={size} />
      <span>{name}</span>
    </span>
  );
}
