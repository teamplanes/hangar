import Link from "next/link";
import { type Skill, DISCIPLINE_LABEL, summary } from "@/lib/skills-types";
import { CARD_BG, SWATCH_CLASS } from "@/components/disciplineStyles";
import { SpiceChip } from "@/components/SpiceMeter";

export function FeaturedSpotlight({ skill }: { skill: Skill }) {
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
            This week&apos;s pick from the {DISCIPLINE_LABEL[skill.discipline]} bay
          </div>
          <p className="mt-4 text-ink/75 text-[0.95rem] leading-relaxed">
            {skill.spotlight_note ??
              "Hand-picked to put in front of the studio this week."}
          </p>
        </aside>
      </div>
    </section>
  );
}
