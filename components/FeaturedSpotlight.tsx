import Link from "next/link";
import { type Skill, DISCIPLINE_LABEL, summary } from "@/lib/skills-types";
import { CARD_BG, SWATCH_CLASS } from "@/components/disciplineStyles";
import { SpiceChip } from "@/components/SpiceMeter";
import { hotness } from "@/components/SkillStats";
import { PaperPlane } from "@/components/PaperPlane";

export function FeaturedSpotlight({ skill }: { skill: Skill }) {
  const h = hotness(skill);
  return (
    <section className={`border border-ink ${CARD_BG[skill.discipline]} relative`}>
      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        <div className="p-8 sm:p-12 lg:p-14">
          <div className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
            <span
              className={`inline-block w-2.5 h-2.5 border border-ink ${SWATCH_CLASS[skill.discipline]}`}
              aria-hidden
            />
            Spotlight · {DISCIPLINE_LABEL[skill.discipline]} bay
          </div>
          <h2 className="mt-3 text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] leading-[0.98] font-black tracking-tight">
            {skill.title}
          </h2>
          <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
            {summary(skill, 200)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {skill.spice ? <SpiceChip spice={skill.spice} /> : null}
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/70 inline-flex items-center gap-1">
              <span aria-hidden>{h.arrow}</span>
              {h.delta > 0 ? "+" : ""}
              {h.delta}% · {h.label}
            </span>
            {typeof skill.usage_count === "number" ? (
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/70">
                {skill.usage_count}{" "}
                {skill.usage_count === 1 ? "user" : "users"} at Planes
              </span>
            ) : null}
          </div>
          <div className="mt-8">
            <Link href={skill.href} className="btn-ink">
              <span aria-hidden>→</span> Read the skill
            </Link>
          </div>
        </div>
        <aside className="border-t lg:border-t-0 lg:border-l border-ink p-8 sm:p-12 lg:p-14 bg-cream">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
            Why this, why now
          </div>
          <div className="serif-italic text-2xl mt-2 leading-snug">
            {h.label === "Hot"
              ? "Trending across the studio this week."
              : h.label === "Cooling"
                ? "A quiet classic. Still worth a look."
                : "Steady use across the studio."}
          </div>
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/60">
              This week
            </span>
            <span className="text-3xl font-black tabular-nums">
              {skill.downloads_week ?? 0}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm border-t border-ink/15 pt-2">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/60">
              Last week
            </span>
            <span className="text-xl tabular-nums text-ink/70">
              {skill.downloads_prev_week ?? 0}
            </span>
          </div>
          <div className="mt-6 text-ink/40 flex justify-end plane-glide">
            <PaperPlane size={36} />
          </div>
        </aside>
      </div>
    </section>
  );
}
