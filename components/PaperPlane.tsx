// Outline paper-plane glyph. Used as a bullet and as a small accent.
// Matches the ▷-style icon used throughout the Planes deck.

export function PaperPlane({
  className,
  size = 14,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M 1 1 L 23 9 L 1 17 L 7 9 Z" />
      <path d="M 7 9 L 23 9" />
    </svg>
  );
}
