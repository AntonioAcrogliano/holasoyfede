const PIPS: Record<number, [number, number][]> = {
  1: [[16, 16]],
  2: [[9, 9], [23, 23]],
  3: [[9, 9], [16, 16], [23, 23]],
  4: [[9, 9], [23, 9], [9, 23], [23, 23]],
  5: [[9, 9], [23, 9], [16, 16], [9, 23], [23, 23]],
  6: [[9, 8], [23, 8], [9, 16], [23, 16], [9, 24], [23, 24]],
};

export function Dice({ face = 5, className = "" }: { face?: number; className?: string }) {
  return (
    <svg className={`dice ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" className="dice-body" />
      {PIPS[face].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" className="dice-pip" />
      ))}
    </svg>
  );
}
