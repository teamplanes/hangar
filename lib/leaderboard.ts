import "server-only";
import { allSkills } from "./skills";
import type { Skill } from "./skills-types";
import { getStats, statsConfigured, type SkillStats } from "./stats-store";

export type RankedSkill = Skill & { stats: SkillStats };

const ZERO: SkillStats = { copies: 0, views: 0, copiesWeek: 0, viewsWeek: 0 };

// Ranks every skill by real engagement THIS WEEK, which is what the cockpit
// table shows and labels: copies this week first (the strongest "people are
// reaching for this" signal), then views this week. All-time copies/views only
// break ties between rows equal for the week, so the visible weekly columns
// always explain the order. Falls back to the seeded downloads_week to keep a
// stable order before any real data has accrued.
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
        b.stats.viewsWeek - a.stats.viewsWeek ||
        b.stats.copies - a.stats.copies ||
        b.stats.views - a.stats.views ||
        (b.downloads_week ?? 0) - (a.downloads_week ?? 0) ||
        a.title.localeCompare(b.title),
    );

  const live = ranked.some((s) => s.stats.copies > 0 || s.stats.views > 0);
  return { ranked, live, configured: statsConfigured() };
}
