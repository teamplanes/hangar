import {
  type Spice,
  SPICE_LABEL,
  SPICE_ORDER,
  SPICE_BLURB,
} from "@/lib/skills-types";

const SPICE_FILL: Record<Spice, string> = {
  "lemon-and-herb": "bg-mint",
  mild: "bg-butter",
  medium: "bg-sky",
  hot: "bg-coral",
  "extra-hot": "bg-ink",
};

const SPICE_DOT: Record<Spice, string> = {
  "lemon-and-herb": "bg-mint",
  mild: "bg-butter",
  medium: "bg-sky",
  hot: "bg-coral",
  "extra-hot": "bg-ink",
};

export function SpiceMeter({
  spice,
  size = "md",
  showLabel = true,
}: {
  spice: Spice;
  size?: "sm" | "md";
  showLabel?: boolean;
}) {
  const idx = SPICE_ORDER.indexOf(spice);
  const tickH = size === "sm" ? "h-2" : "h-3";
  return (
    <div className="inline-flex flex-col gap-1">
      {showLabel ? (
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70">
          Spice · {SPICE_LABEL[spice]}
        </div>
      ) : null}
      <div className="flex items-center gap-1">
        {SPICE_ORDER.map((s, i) => (
          <span
            key={s}
            className={[
              tickH,
              "w-5 border border-ink",
              i <= idx ? SPICE_FILL[s] : "bg-cream",
            ].join(" ")}
            aria-label={`${SPICE_LABEL[s]}${i === idx ? " (this)" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

// Compact spice chip for cards.
export function SpiceChip({ spice }: { spice: Spice }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/80">
      <span
        className={`inline-block w-2 h-2 border border-ink ${SPICE_DOT[spice]}`}
        aria-hidden
      />
      {SPICE_LABEL[spice]}
    </span>
  );
}

export function SpiceBlurb({ spice }: { spice: Spice }) {
  return (
    <span className="serif-italic text-ink/80">{SPICE_BLURB[spice]}</span>
  );
}
