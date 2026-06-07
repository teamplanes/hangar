import type { Discipline } from "@/lib/skills-types";

// Solid swatch (small colored square). Used in nav and metadata.
export const SWATCH_CLASS: Record<Discipline, string> = {
  product: "bg-sky",
  design: "bg-coral",
  dev: "bg-mint",
  "new-business": "bg-butter",
  general: "bg-cream-deep",
  "just-for-fun": "bg-[#e8d5ff]",
};

// Card background tint. The deck uses solid pastel blocks.
export const CARD_BG: Record<Discipline, string> = {
  product: "bg-sky",
  design: "bg-coral",
  dev: "bg-mint",
  "new-business": "bg-butter",
  general: "bg-cream-deep",
  "just-for-fun": "bg-[#e8d5ff]",
};

// Text color tuned for legibility on the card bg
export const CARD_INK: Record<Discipline, string> = {
  product: "text-ink",
  design: "text-ink",
  dev: "text-ink",
  "new-business": "text-ink",
  general: "text-ink",
  "just-for-fun": "text-ink",
};
