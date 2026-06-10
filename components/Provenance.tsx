import type { Skill } from "@/lib/skills-types";

type Kind = "original" | "adapted" | "curated";

function kindOf(skill: Skill): Kind {
  const k = skill.source?.kind;
  if (k === "adapted" || k === "curated") return k;
  return "original";
}

const META: Record<
  Kind,
  { label: string; long: string; chip: string; dot: string }
> = {
  original: {
    label: "Made at Planes",
    long: "Made from scratch by someone at Planes.",
    chip: "bg-mint border-ink text-ink",
    dot: "bg-mint",
  },
  adapted: {
    label: "Adapted by Planes",
    long: "Found elsewhere, then reworked to suit how we work.",
    chip: "bg-butter border-ink text-ink",
    dot: "bg-butter",
  },
  curated: {
    label: "Found & shared",
    long: "Found on the web and shared with the team, used as-is.",
    chip: "bg-sky border-ink text-ink",
    dot: "bg-sky",
  },
};

export function provenanceMeta(skill: Skill) {
  return META[kindOf(skill)];
}

// Compact badge for cards and rows.
export function ProvenanceTag({ skill }: { skill: Skill }) {
  const m = META[kindOf(skill)];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border ${m.chip} px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em]`}
      title={m.long}
    >
      <span className={`inline-block w-1.5 h-1.5 border border-ink/50 ${m.dot}`} aria-hidden />
      {m.label}
    </span>
  );
}

// Fuller block for the skill detail page, includes the source credit/link.
export function ProvenanceBlock({ skill }: { skill: Skill }) {
  const kind = kindOf(skill);
  const m = META[kind];
  const credit = skill.source?.credit;
  const url = skill.source?.url;
  return (
    <div className={`border border-ink ${m.chip} p-5`}>
      <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
        <span className={`inline-block w-2 h-2 border border-ink/50 ${m.dot}`} aria-hidden />
        {m.label}
      </div>
      <p className="mt-2 text-[0.9rem] leading-snug text-ink/85">{m.long}</p>
      {(credit || url) && kind !== "original" ? (
        <p className="mt-2 text-[0.85rem] text-ink/80">
          Source:{" "}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ink/40 hover:decoration-ink font-medium"
            >
              {credit || url}
            </a>
          ) : (
            <span className="font-medium">{credit}</span>
          )}
        </p>
      ) : null}
      {skill.added_by ? (
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55">
          Added by @{skill.added_by}
        </p>
      ) : null}
    </div>
  );
}
