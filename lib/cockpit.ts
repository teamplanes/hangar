import type { Skill } from "@/lib/skills-types";

export function packByDiscipline(skills: Skill[]): Record<string, Skill[]> {
  const grouped: Record<string, Skill[]> = {};
  for (const s of skills) {
    if (!s.pack) continue;
    if (!grouped[s.discipline]) grouped[s.discipline] = [];
    grouped[s.discipline].push(s);
  }
  return grouped;
}
