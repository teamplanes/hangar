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

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function coerceDate(v: unknown): string | undefined {
  if (v == null) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

let cache: Skill[] | null = null;

export function allSkills(): Skill[] {
  if (cache) return cache;
  const files = walk(SKILLS_DIR);
  const skills: Skill[] = files.map((filepath) => {
    const raw = fs.readFileSync(filepath, "utf8");
    const { data, content } = matter(raw);
    const fm = data as SkillFrontmatter & Record<string, unknown>;
    const rel = path.relative(SKILLS_DIR, filepath).replace(/\.md$/, "");
    const slug = rel.split(path.sep);
    return {
      ...fm,
      added_on: coerceDate(fm.added_on),
      tags: fm.tags ?? [],
      status: fm.status ?? "draft",
      source: fm.source ?? { kind: "original" },
      slug,
      href: `/skill/${slug.join("/")}`,
      body: content.trim(),
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
