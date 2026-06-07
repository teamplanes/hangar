import type { Skill } from "@/lib/skills-types";
import { SpiceMeter, SpiceBlurb } from "@/components/SpiceMeter";

export function hotness(skill: Skill): {
  delta: number;
  label: "Hot" | "Cooling" | "Steady";
  arrow: "▲" | "▼" | "→";
} {
  const cur = skill.downloads_week ?? 0;
  const prev = skill.downloads_prev_week ?? 0;
  if (prev === 0 && cur === 0) return { delta: 0, label: "Steady", arrow: "→" };
  if (prev === 0) return { delta: 100, label: "Hot", arrow: "▲" };
  const delta = Math.round(((cur - prev) / prev) * 100);
  if (delta > 5) return { delta, label: "Hot", arrow: "▲" };
  if (delta < -5) return { delta, label: "Cooling", arrow: "▼" };
  return { delta, label: "Steady", arrow: "→" };
}

// Used on the skill detail page, full editorial rail.
export function SkillStatsRail({ skill }: { skill: Skill }) {
  const h = hotness(skill);
  const usage = skill.usage_count ?? 0;
  const downloads = skill.downloads_week ?? 0;
  return (
    <div className="grid sm:grid-cols-3 gap-px bg-ink border border-ink">
      <Stat
        label="In use"
        value={String(usage)}
        unit={usage === 1 ? "person at Planes" : "people at Planes"}
      />
      <Stat
        label="Downloads this week"
        value={String(downloads)}
        unit={`${h.arrow} ${h.delta > 0 ? "+" : ""}${h.delta}% · ${h.label}`}
        unitTone={h.label === "Hot" ? "text-coral" : h.label === "Cooling" ? "text-ink/60" : "text-ink/70"}
      />
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

function Stat({
  label,
  value,
  unit,
  unitTone = "text-ink/70",
}: {
  label: string;
  value: string;
  unit?: string;
  unitTone?: string;
}) {
  return (
    <div className="bg-cream p-5">
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70">
        {label}
      </div>
      <div className="mt-2 text-[2.5rem] leading-none font-black tabular-nums">
        {value}
      </div>
      {unit ? (
        <div className={`mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] ${unitTone}`}>
          {unit}
        </div>
      ) : null}
    </div>
  );
}
