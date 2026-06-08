import Link from "next/link";
import { notFound } from "next/navigation";
import {
  byDiscipline,
  DISCIPLINES,
  DISCIPLINE_LABEL,
  type Discipline,
} from "@/lib/skills";
import { SkillCard } from "@/components/SkillCard";
import { CARD_BG, SWATCH_CLASS } from "@/components/disciplineStyles";
import { PackInstallCmds } from "./PackInstallCmds";

export function generateStaticParams() {
  return DISCIPLINES.map((discipline) => ({ discipline }));
}

const BAY_LEAD: Record<Discipline, string> = {
  product: "How we shape and ship product. Discovery, JTBDs, roadmap moves.",
  design: "Briefs, critiques, systems. How we run the work.",
  dev: "Building and reviewing code with Claude.",
  "new-business": "Pitches, credentials, response writing. Say something. Win.",
  general: "Cross-discipline moves. Useful in every bay.",
  "just-for-fun": "No agenda. No deliverables. Just good prompts worth having.",
};

export default async function BayPage({
  params,
}: {
  params: Promise<{ discipline: string }>;
}) {
  const { discipline } = await params;
  if (!DISCIPLINES.includes(discipline as Discipline)) notFound();
  const d = discipline as Discipline;
  const skills = byDiscipline(d);
  const packSkills = skills.filter((s) => s.pack);
  const inventorySkills = skills.filter((s) => !s.pack);
  const hasPack = packSkills.length > 0;

  return (
    <div>
      {/* Hero: bay colour, full width */}
      <section className={`border border-ink ${CARD_BG[d]}`}>
        <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              <span
                className={`inline-block w-2.5 h-2.5 border border-ink ${SWATCH_CLASS[d]}`}
                aria-hidden
              />
              Bay
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              {DISCIPLINE_LABEL[d]}{" "}
              <span className="serif-italic font-normal italic">bay</span>.
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/80">
              {BAY_LEAD[d]}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-5">
            {hasPack ? (
              <div className="flex gap-8 sm:justify-end">
                <div className="text-right">
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink/60">
                    In the plugin
                  </div>
                  <div className="text-[2.4rem] leading-none font-black tabular-nums">
                    {String(packSkills.length).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink/60">
                    In this bay
                  </div>
                  <div className="text-[2.4rem] leading-none font-black tabular-nums">
                    {String(skills.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-right">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
                  In this bay
                </div>
                <div className="text-[3rem] leading-none font-black tabular-nums">
                  {String(skills.length).padStart(2, "0")}
                  <span className="text-base font-mono uppercase tracking-[0.16em] ml-2 text-ink/70">
                    skill{skills.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            )}
            <Link
              href="/add"
              className="btn-ink text-sm font-mono uppercase tracking-[0.14em]"
            >
              <span aria-hidden>＋</span> Add to {DISCIPLINE_LABEL[d]}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Plugin ───────────────────────────────────────────── */}
      {hasPack && (
        <section className="border-x border-b border-ink bg-cream">
          {/* Header: bay-colour accent stripe on the left, install commands on the right */}
          <div className={`border-b border-ink/15 flex`}>
            {/* Colour stripe */}
            <div className={`w-1.5 shrink-0 ${CARD_BG[d]}`} aria-hidden />
            <div className="flex-1 px-8 sm:px-12 lg:px-16 py-10 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/60 mb-2">
                  <span
                    className={`inline-block w-2 h-2 border border-ink/40 ${CARD_BG[d]}`}
                    aria-hidden
                  />
                  Plugin
                </div>
                <h2 className="text-[1.5rem] sm:text-[1.8rem] font-black tracking-tight leading-tight">
                  The{" "}
                  <span className="serif-italic font-normal italic">
                    {DISCIPLINE_LABEL[d]}
                  </span>{" "}
                  plugin
                </h2>
                <p className="mt-2 text-[0.93rem] text-ink/70 max-w-prose">
                  {packSkills.length} curated skill
                  {packSkills.length === 1 ? "" : "s"} ready to drop into
                  Claude Code. Add the marketplace once, then install the plugin.
                  Skills land as slash commands and stay between sessions. Turn
                  on auto-update (run <code className="font-mono">/plugin</code>) and
                  new skills arrive automatically, run{" "}
                  <code className="font-mono">/hangar-general:whats-new</code> to see
                  what landed.
                </p>
              </div>
              <PackInstallCmds discipline={d} />
            </div>
          </div>

          {/* Pack skills grid */}
          <div className="px-8 sm:px-12 lg:px-16 py-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packSkills.map((s) => (
                <SkillCard key={s.slug.join("/")} skill={s} variant="color" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Inventory ────────────────────────────────────────── */}
      {inventorySkills.length > 0 && (
        <section className="border-x border-b border-ink bg-cream">
          <div className="px-8 sm:px-12 lg:px-16 py-7 border-b border-ink/15 flex items-baseline justify-between gap-6">
            <div>
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                {hasPack ? "Also in this bay" : "Skills"}
              </div>
              <h2 className="text-[1.2rem] font-black tracking-tight">
                {hasPack ? (
                  <>More {DISCIPLINE_LABEL[d]} skills</>
                ) : (
                  <>{DISCIPLINE_LABEL[d]} skills</>
                )}
              </h2>
              {hasPack && (
                <p className="mt-0.5 text-[0.85rem] text-ink/55">
                  Not in the plugin. Browse and take what&apos;s useful.
                </p>
              )}
            </div>
            <Link
              href="/add"
              className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/60 hover:text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              Add a skill →
            </Link>
          </div>

          <div className="px-8 sm:px-12 lg:px-16 py-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {inventorySkills.map((s) => (
                <SkillCard key={s.slug.join("/")} skill={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {skills.length === 0 && (
        <section className="border-x border-b border-ink bg-cream px-8 py-16 text-center text-ink/70">
          <p>Nothing in this bay yet.</p>
          <p className="mt-2">
            <Link
              href="/add"
              className="underline decoration-ink/30 hover:decoration-coral text-ink"
            >
              Add the first skill
            </Link>
            .
          </p>
        </section>
      )}
    </div>
  );
}
