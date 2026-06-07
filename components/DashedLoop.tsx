// A single clean loop with a dashed trail leading into a paper plane.
// Echoes the Planes deck motif without the tangled overlap of v1.
// Stroke is animated via .anim-draw class in globals.css.

export function DashedLoop({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[animated ? "anim-draw" : "", className ?? ""].join(" ")}
      aria-hidden
    >
      {/* one clean loop, then a curving trail out to the right */}
      <path
        d="M 30 78
           C 8 78, 8 42, 30 42
           C 52 42, 52 78, 30 78
           C 60 78, 100 50, 150 60
           C 180 66, 196 76, 210 78"
      />
      {/* paper plane at the end of the trail */}
      <g transform="translate(210 78) rotate(-8)" strokeDasharray="0">
        <path d="M 0 0 L 22 -8 L 10 4 Z" />
        <path d="M 10 4 L 16 12" />
      </g>
    </svg>
  );
}
