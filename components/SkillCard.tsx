import Link from "next/link";
import { type Skill, DISCIPLINE_LABEL, summary } from "@/lib/skills-types";
import { CARD_BG, CARD_INK } from "@/components/disciplineStyles";
import { SpiceChip } from "@/components/SpiceMeter";
import { ProvenanceTag } from "@/components/Provenance";

export function SkillCard({
  skill,
  variant = "paper",
}: {
  skill: Skill;
  variant?: "paper" | "color";
}) {
  const isColor = variant === "color";
  const inPack = !!skill.pack;

  const surface = isColor
    ? `${CARD_BG[skill.discipline]} ${CARD_INK[skill.discipline]}`
    : "bg-cream";

  return (
    <Link
      href={skill.href}
      className={[
        "paper-card group relative block border border-ink",
        "p-5 sm:p-6",
        surface,
      ].join(" ")}
    >
      {/* Top label rail */}
      <div className="flex items-center justify-end gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70">
        {inPack && (
          <span className="inline-block border border-ink/50 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-ink/80">
            In Plugin
          </span>
        )}
        {DISCIPLINE_LABEL[skill.discipline]}
      </div>

      {/* Title */}
      <h3 className="mt-5 text-[1.35rem] sm:text-2xl leading-[1.15] font-semibold tracking-tight">
        {skill.title}
      </h3>

      {/* Summary */}
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75 line-clamp-3">
        {summary(skill, 160)}
      </p>

      {/* Stat strip: provenance always, spice when set */}
      <div className="mt-5 flex flex-wrap items-center gap-2 gap-y-1.5 text-[0.7rem]">
        <ProvenanceTag skill={skill} />
        {skill.spice ? <SpiceChip spice={skill.spice} /> : null}
      </div>

      {/* Meta row */}
      <div className="mt-4 flex items-center justify-end gap-3 text-[0.8rem]">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink/70 inline-flex items-center gap-1">
          <span className="serif-italic normal-case tracking-normal text-ink">read</span>
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

