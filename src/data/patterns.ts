// Patrones originales en CSS/SVG. Cada uno devuelve capas para `background`.
const svg = (w: number, h: number, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`
  )}") 0 0 / ${w}px ${h}px`;

export const pat = {
  dots: (c: string) => `radial-gradient(${c} 2px, transparent 2.5px) 0 0 / 16px 16px`,
  stripes: (c: string) =>
    `repeating-linear-gradient(135deg, ${c} 0 6px, transparent 6px 18px)`,
  pinstripes: (c: string) =>
    `repeating-linear-gradient(90deg, ${c} 0 2px, transparent 2px 14px)`,
  grid: (c: string) =>
    `linear-gradient(${c} 1.5px, transparent 1.5px) 0 0 / 20px 20px, linear-gradient(90deg, ${c} 1.5px, transparent 1.5px) 0 0 / 20px 20px`,
  checks: (c: string) =>
    `repeating-conic-gradient(${c} 0% 25%, transparent 0% 50%) 0 0 / 24px 24px`,
  rays: (c: string) =>
    `repeating-conic-gradient(from 0deg at 50% 120%, ${c} 0deg 8deg, transparent 8deg 16deg)`,
  planks: (c: string) =>
    `repeating-linear-gradient(0deg, transparent 0 22px, ${c} 22px 24px)`,
  hex: (c: string) =>
    svg(
      28,
      48,
      `<path d='M14 0l14 8v16l-14 8L0 24V8zM14 32v16M0 24v0M28 24v0' fill='none' stroke='${c}' stroke-width='1.6'/>`
    ),
  waves: (c: string) =>
    svg(
      40,
      16,
      `<path d='M0 8c5-8 15-8 20 0s15 8 20 0' fill='none' stroke='${c}' stroke-width='2' stroke-linecap='round'/>`
    ),
  diamonds: (c: string) =>
    svg(24, 24, `<path d='M12 2l10 10-10 10L2 12z' fill='none' stroke='${c}' stroke-width='1.6'/>`),
  stars: (c: string) =>
    svg(
      36,
      36,
      `<path d='M9 4l1.4 3.6L14 9l-3.6 1.4L9 14l-1.4-3.6L4 9l3.6-1.4zM27 20l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z' fill='${c}'/>`
    ),
  crosses: (c: string) =>
    svg(22, 22, `<path d='M11 6v10M6 11h10' stroke='${c}' stroke-width='2' stroke-linecap='round'/>`),
  bricks: (c: string) =>
    svg(
      32,
      20,
      `<path d='M0 0h32M0 10h32M8 0v10M24 10v10' fill='none' stroke='${c}' stroke-width='1.6'/>`
    ),
  scales: (c: string) =>
    svg(
      24,
      12,
      `<path d='M0 0a12 12 0 0024 0M-12 12a12 12 0 0024 0M12 12a12 12 0 0024 0' fill='none' stroke='${c}' stroke-width='1.5'/>`
    ),
  confetti: (c: string) =>
    svg(
      40,
      40,
      `<rect x='5' y='6' width='7' height='3' rx='1.5' fill='${c}' transform='rotate(30 8 7)'/><rect x='25' y='22' width='7' height='3' rx='1.5' fill='${c}' transform='rotate(-40 28 23)'/><circle cx='30' cy='8' r='2' fill='${c}'/><circle cx='10' cy='30' r='2' fill='${c}'/>`
    ),
};
