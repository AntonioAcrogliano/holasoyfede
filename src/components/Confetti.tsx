import { useMemo } from "react";

const COLORS = ["#C8643B", "#7A8450", "#D9B48F", "#E5B93C", "#FFF9F0", "#B5452C"];

// Confetti cozy: papelitos en la paleta del sitio, solo CSS.
export function Confetti({ count = 44 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        dur: 2.2 + Math.random() * 1.8,
        rot: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    [count]
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            left: `${b.left}%`,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            transform: `rotate(${b.rot}deg)`,
            borderRadius: b.round ? "50%" : "3px",
          }}
        />
      ))}
    </div>
  );
}
