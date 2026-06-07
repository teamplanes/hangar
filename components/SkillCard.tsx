import Link from "next/link";
import { type Skill, DISCIPLINE_LABEL, summary } from "@/lib/skills-types";
import { CARD_BG, CARD_INK } from "@/components/disciplineStyles";
import { PaperPlane } from "@/components/PaperPlane";
import { SpiceChip } from "@/components/SpiceMeter";
import { hotness } from "@/components/SkillStats";

const TYPE_LABEL: Record<Skill["type"], string> = {
  prompt: "Prompt",
  skill: "Skill",
  recipe: "Recipe",
};

export function SkillCard({
  skill,
  variant = "paper",
}: {
  skill: Skill;
  variant?: "paper" | "color";
}) {
  const isCurated = skill.source?.kind === "curated";
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
      <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70">
        <span className="inline-flex items-center gap-2">
          <PaperPlane size={11} className="text-ink" />
          {TYPE_LABEL[skill.type]}
        </span>
        <span className="inline-flex items-center gap-2">
          {inPack && (
            <span className="inline-block border border-ink/50 px-1.5 py-px text-[0.6rem] uppercase tracking-[0.14em] text-ink/80">
              In Pack
            </span>
          )}
          {DISCIPLINE_LABEL[skill.discipline]}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-[1.35rem] sm:text-2xl leading-[1.15] font-semibold tracking-tight">
        {skill.title}
      </h3>

      {/* Summary */}
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75 line-clamp-3">
        {summary(skill, 160)}
      </p>

      {/* Stat strip */}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.7rem]">
        {skill.spice ? <SpiceChip spice={skill.spice} /> : null}
        {typeof skill.downloads_week === "number" ? (
          <HotnessChip skill={skill} />
        ) : null}
        {typeof skill.usage_count === "number" ? (
          <span className="font-mono uppercase tracking-[0.14em] text-ink/65">
            {skill.usage_count} {skill.usage_count === 1 ? "user" : "users"}
          </span>
        ) : null}
      </div>

      {/* Meta row */}
      <div className="mt-4 flex items-center justify-between gap-3 text-[0.8rem]">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-ink/65">
          {(skill.tags ?? []).slice(0, 3).map((t) => (
            <span key={t} className="font-mono">
              [{t}]
            </span>
          ))}
        </div>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink/70 inline-flex items-center gap-1">
          {isCurated ? (
            <>
              <span className="serif-italic normal-case tracking-normal text-ink">
                curated
              </span>
              <span aria-hidden>↗</span>
            </>
          ) : (
            <>
              <span className="serif-italic normal-case tracking-normal text-ink">
                read
              </span>
              <span aria-hidden>→</span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
}

function HotnessChip({ skill }: { skill: Skill }) {
  const h = hotness(skill);
  const tone =
    h.label === "Hot"
      ? "text-coral"
      : h.label === "Cooling"
        ? "text-ink/60"
        : "text-ink/70";
  return (
    <span
      className={`font-mono uppercase tracking-[0.14em] inline-flex items-center gap-1 ${tone}`}
    >
      <span aria-hidden>{h.arrow}</span>
      {h.delta > 0 ? "+" : ""}
      {h.delta}% · {h.label}
    </span>
  );
}
