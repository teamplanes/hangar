import "server-only";
import { allSkills } from "./skills";
import type { Skill } from "./skills-types";
import { getStats, statsConfigured, type SkillStats } from "./stats-store";

export type RankedSkill = Skill & { stats: SkillStats };

const ZERO: SkillStats = { copies: 0, views: 0, copiesWeek: 0, viewsWeek: 0 };

// Ranks every skill by real engagement: copies this week first (the strongest
// "people are reaching for this" signal), then all-time copies, then views.
// Falls back to the seeded downloads_week only to keep a stable order before
// any real data has accrued.
export async function rankedSkills(): Promise<{
  ranked: RankedSkill[];
  live: boolean;
  configured: boolean;
}> {
  const stats = await getStats();
  const ranked = allSkills()
    .map((s) => ({ ...s, stats: stats.get(s.slug.join("/")) ?? ZERO }))
    .sort(
      (a, b) =>
        b.stats.copiesWeek - a.stats.copiesWeek ||
        b.stats.copies - a.stats.copies ||
        b.stats.viewsWeek - a.stats.viewsWeek ||
        b.stats.views - a.stats.views ||
        (b.downloads_week ?? 0) - (a.downloads_week ?? 0) ||
        a.title.localeCompare(b.title),
    );

  const live = ranked.some((s) => s.stats.copies > 0 || s.stats.views > 0);
  return { ranked, live, configured: statsConfigured() };
}
