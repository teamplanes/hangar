import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  type Discipline,
  type Skill,
  type SkillFrontmatter,
} from "./skills-types";

export * from "./skills-types";

const SKILLS_DIR = path.join(process.cwd(), "skills");

// A skill is either a standalone `<slug>.md` file, or a folder containing a
// `SKILL.md` (plus any number of extra files that travel with it). When a
// folder has a SKILL.md it's treated as ONE skill; its sibling files are not
// surfaced as skills of their own.
type FoundSkill = {
  skillFile: string;
  dir: string | null;
  files: { name: string; path: string }[];
};

function listFilesRecursive(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFilesRecursive(full));
    else if (e.isFile()) out.push(full);
  }
  return out;
}

function collect(dir: string): FoundSkill[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hasSkillMd = entries.some((e) => e.isFile() && e.name === "SKILL.md");

  if (hasSkillMd) {
    const skillFile = path.join(dir, "SKILL.md");
    const files = listFilesRecursive(dir)
      .filter((f) => f !== skillFile)
      .map((f) => ({
        name: path.relative(dir, f),
        path: path.relative(process.cwd(), f),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [{ skillFile, dir, files }];
  }

  const found: FoundSkill[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...collect(full));
    else if (entry.isFile() && entry.name.endsWith(".md"))
      found.push({ skillFile: full, dir: null, files: [] });
  }
  return found;
}

function coerceDate(v: unknown): string | undefined {
  if (v == null) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

let cache: Skill[] | null = null;

export function allSkills(): Skill[] {
  if (cache) return cache;
  const found = collect(SKILLS_DIR);
  const skills: Skill[] = found.map(({ skillFile, dir, files }) => {
    const raw = fs.readFileSync(skillFile, "utf8");
    const { data, content } = matter(raw);
    const fm = data as SkillFrontmatter & Record<string, unknown>;
    const relTarget = dir
      ? path.relative(SKILLS_DIR, dir)
      : path.relative(SKILLS_DIR, skillFile).replace(/\.md$/, "");
    const slug = relTarget.split(path.sep);
    return {
      ...fm,
      added_on: coerceDate(fm.added_on),
      tags: fm.tags ?? [],
      status: fm.status ?? "draft",
      source: fm.source ?? { kind: "original" },
      slug,
      href: `/skill/${slug.join("/")}`,
      body: content.trim(),
      files: files.length ? files : undefined,
    };
  });
  skills.sort((a, b) => {
    const da = a.added_on ?? "";
    const db = b.added_on ?? "";
    if (da !== db) return db.localeCompare(da);
    return a.title.localeCompare(b.title);
  });
  cache = skills;
  return skills;
}

export function bySlug(slug: string[]): Skill | undefined {
  return allSkills().find((s) => s.slug.join("/") === slug.join("/"));
}

export function byDiscipline(discipline: Discipline): Skill[] {
  return allSkills().filter((s) => s.discipline === discipline);
}

export function byTag(tag: string): Skill[] {
  const t = tag.toLowerCase();
  return allSkills().filter((s) =>
    (s.tags ?? []).some((x) => x.toLowerCase() === t),
  );
}

export function featuredSkill(): Skill | undefined {
  const list = allSkills();
  return (
    list.find((s) => s.featured) ??
    // fallback: highest downloads_week
    [...list].sort(
      (a, b) => (b.downloads_week ?? 0) - (a.downloads_week ?? 0),
    )[0]
  );
}

export function byDownloads(): Skill[] {
  return [...allSkills()].sort(
    (a, b) => (b.downloads_week ?? 0) - (a.downloads_week ?? 0),
  );
}

export function allTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const s of allSkills()) {
    for (const t of s.tags ?? []) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
