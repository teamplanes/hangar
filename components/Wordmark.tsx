import Link from "next/link";

const HANGAR_LETTERS: { ch: string; rot: number; delay: number }[] = [
  { ch: "H", rot: -8, delay: 0 },
  { ch: "A", rot: -3, delay: 60 },
  { ch: "N", rot: 1, delay: 120 },
  { ch: "G", rot: 4, delay: 180 },
  { ch: "A", rot: 6, delay: 240 },
  { ch: "R", rot: 9, delay: 300 },
];

export function Wordmark() {
  return (
    <Link
      href="/"
      className="wordmark inline-flex items-baseline gap-3 select-none"
      aria-label="The Hangar, home"
    >
      <span className="font-serif italic text-[1.35rem] leading-none text-ink">
        THE
      </span>
      <span className="font-sans font-black text-[1.55rem] leading-none tracking-tight text-ink">
        {HANGAR_LETTERS.map((l, i) => (
          <span
            key={i}
            className="wordmark-letter"
            style={
              {
                ["--rot" as string]: `${l.rot}deg`,
                ["--delay" as string]: `${l.delay}ms`,
              } as React.CSSProperties
            }
          >
            {l.ch}
          </span>
        ))}
      </span>
    </Link>
  );
}
