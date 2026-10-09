// localStorage con red: si el navegador lo bloquea (modo privado, cuota llena),
// todo sigue andando en memoria mientras la pestaña esté abierta.
const mem = new Map<string, string>();

export function load<T>(key: string, fallback: T): T {
  let raw: string | null | undefined;
  try {
    raw = localStorage.getItem(key);
  } catch {
    raw = undefined;
  }
  if (raw == null) raw = mem.get(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): void {
  let raw: string;
  try {
    raw = JSON.stringify(value);
  } catch {
    return;
  }
  mem.set(key, raw);
  try {
    localStorage.setItem(key, raw);
  } catch {
    /* queda en memoria */
  }
}

export function remove(key: string): void {
  mem.delete(key);
  try {
    localStorage.removeItem(key);
  } catch {
    /* nada */
  }
}

export const matchKey = (slug: string) => `ludoteca:partida:${slug}`;
