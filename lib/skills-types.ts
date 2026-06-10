export type Discipline =
  | "product"
  | "design"
  | "dev"
  | "new-business"
  | "general"
  | "just-for-fun";

export type SkillType = "prompt" | "skill" | "recipe";
export type SkillStatus = "draft" | "stable" | "needs-review";

// Provenance:
//   original = made from scratch by someone at Planes
//   adapted  = found elsewhere, reworked to suit how we work
//   curated  = found on the web, shared as-is
export type SkillSource = {
  kind: "original" | "adapted" | "curated";
  url?: string;
  credit?: string;
};

// Nandos spice scale, applied to how technical a skill is.
// lemon-and-herb = anyone can pick this up. extra-hot = engineering chops required.
export type Spice =
  | "lemon-and-herb"
  | "mild"
  | "medium"
  | "hot"
  | "extra-hot";

export const SPICE_ORDER: Spice[] = [
  "lemon-and-herb",
  "mild",
  "medium",
  "hot",
  "extra-hot",
];

export const SPICE_LABEL: Record<Spice, string> = {
  "lemon-and-herb": "Lemon & Herb",
  mild: "Mild",
  medium: "Medium",
  hot: "Hot",
  "extra-hot": "Extra Hot",
};

export const SPICE_BLURB: Record<Spice, string> = {
  "lemon-and-herb": "Anyone in the studio. Open and go.",
  mild: "A bit of context helps. Read the notes.",
  medium: "Comfortable with prompts and tools.",
  hot: "Engineering-shaped. Some setup.",
  "extra-hot": "API + code chops required.",
};

export type SkillFrontmatter = {
  title: string;
  discipline: Discipline;
  type: SkillType;
  tags?: string[];
  added_by?: string;
  added_on?: string;
  status?: SkillStatus;
  source?: SkillSource;
  summary?: string;
  spice?: Spice;
  usage_count?: number;
  downloads_week?: number;
  downloads_prev_week?: number;
  featured?: boolean;
  pack?: boolean;
};

export type Skill = SkillFrontmatter & {
  slug: string[];
  href: string;
  body: string;
};

export const DISCIPLINES: Discipline[] = [
  "product",
  "design",
  "dev",
  "new-business",
  "general",
  "just-for-fun",
];

export const DISCIPLINE_LABEL: Record<Discipline, string> = {
  product: "Product",
  design: "Design",
  dev: "Dev",
  "new-business": "New Business",
  general: "General",
  "just-for-fun": "Just For Fun",
};

export function summary(skill: Skill, max = 180): string {
  if (skill.summary) return skill.summary;
  const stripped = skill.body
    .replace(/^#.*$/gm, "")
    .replace(/^>.*$/gm, "")
    .replace(/[#*_`>\[\]()]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return stripped.length > max ? stripped.slice(0, max - 1) + "…" : stripped;
}
