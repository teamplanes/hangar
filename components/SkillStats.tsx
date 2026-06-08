import type { Skill } from "@/lib/skills-types";
import { SpiceMeter, SpiceBlurb } from "@/components/SpiceMeter";
import { LiveStatTiles } from "@/components/LiveStatTiles";

// Used on the skill detail page. Copies/views are real (fetched live); spice
// is editorial.
export function SkillStatsRail({ skill }: { skill: Skill }) {
  return (
    <div className="grid sm:grid-cols-3 gap-px bg-ink border border-ink">
      <LiveStatTiles slug={skill.slug.join("/")} />
      <div className="bg-cream p-5">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70 mb-3">
          Spice
        </div>
        {skill.spice ? (
          <>
            <SpiceMeter spice={skill.spice} showLabel={false} />
            <div className="mt-3 text-[0.95rem]">
              <SpiceBlurb spice={skill.spice} />
            </div>
          </>
        ) : (
          <div className="text-ink/60 text-sm">Unrated.</div>
        )}
      </div>
    </div>
  );
}
