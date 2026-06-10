import Link from "next/link";
import {
  allSkills,
  byDiscipline,
  DISCIPLINES,
  DISCIPLINE_LABEL,
  featuredSkill,
} from "@/lib/skills";
import { SkillCard } from "@/components/SkillCard";
import { PaperPlane } from "@/components/PaperPlane";
import { SWATCH_CLASS } from "@/components/disciplineStyles";
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight";

export default function HomePage() {
  const skills = allSkills();
  const latest = skills.slice(0, 6);
  const featured = featuredSkill();

  return (
    <div className="space-y-24">
      {/* HERO: asymmetric cream and sky split, deck style */}
      <section className="relative border border-ink bg-cream">
        <div className="grid lg:grid-cols-[1.55fr_1fr]">
          <div className="p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <h1 className="mt-2 text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[0.96] tracking-tight font-black text-ink anim-rise" style={{ animationDelay: "60ms" }}>
              The skills, prompts and AI set-ups{" "}
              <span className="serif-italic font-normal italic">
                working at Planes
              </span>{" "}
              right now.
            </h1>

            <p className="mt-7 max-w-prose text-[1.05rem] text-ink/80 leading-relaxed anim-rise" style={{ animationDelay: "160ms" }}>
              A shared catalogue of what we've found to work in Claude for product, built and maintained by everyone at Planes. We've left the doors to The Hangar purposely unlocked, browse and steal to your heart's content.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 anim-rise" style={{ animationDelay: "260ms" }}>
              <Link href="/add" className="btn-ink font-mono uppercase tracking-[0.14em] text-sm">
                <span aria-hidden>＋</span> Add to the Hangar
              </Link>
              <Link href="/search" className="btn-ghost font-mono uppercase tracking-[0.14em] text-sm">
                <span aria-hidden>↘</span> Find a skill
              </Link>
            </div>

          </div>

          {/* Right column: sky bay summary, deck-style block */}
          <aside className="bg-sky border-t lg:border-t-0 lg:border-l border-ink p-8 sm:p-10 lg:p-12 relative">
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              By bay
            </div>
            <div className="serif-italic text-2xl text-ink mt-1">
              Find your skills.
            </div>

            <ul className="mt-6 space-y-3">
              {DISCIPLINES.map((d) => {
                const count = byDiscipline(d).length;
                return (
                  <li key={d}>
                    <Link
                      href={`/bay/${d}`}
                      className="group flex items-baseline justify-between gap-3 py-2 border-b border-ink/30 hover:border-ink"
                    >
                      <span className="inline-flex items-baseline gap-3 text-lg font-medium">
                        <span
                          className={[
                            "inline-block w-3 h-3 border border-ink",
                            SWATCH_CLASS[d],
                            "translate-y-[1px]",
                          ].join(" ")}
                          aria-hidden
                        />
                        {DISCIPLINE_LABEL[d]}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink/70 tabular-nums">
                        {String(count).padStart(2, "0")} skills
                        <span className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition inline-block">
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT: full-bleed ink band */}
      {featured ? (
        <section className="relative py-10 lg:py-14 bg-ink" style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
          <div className="mx-auto max-w-page px-6 lg:px-10">
            <div className="mb-6 flex items-baseline justify-between gap-3">
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream/80">
                00 / Skill spotlight
              </div>
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream/55 hidden sm:block">
                Featured pick · the board ranks by real copies
              </div>
            </div>
            <FeaturedSpotlight skill={featured} />
          </div>
        </section>
      ) : null}

      {/* STAY CURRENT reminder */}
      <section className="border border-ink bg-sky px-6 sm:px-10 py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none" aria-hidden>↻</span>
          <div>
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
              Already flying?
            </div>
            <p className="mt-1 text-[0.95rem] text-ink/85 leading-snug">
              New skills land here often. Turn on auto-update (<code className="font-mono text-[0.85em]">/plugin</code>) so installed plugins refresh themselves, or pull now with{" "}
              <code className="font-mono text-[0.85em]">claude plugin marketplace update</code>. Then run{" "}
              <code className="font-mono text-[0.85em]">/hangar-general:whats-new</code> for the rundown.
            </p>
          </div>
        </div>
        <Link
          href="/cockpit"
          className="btn-ink font-mono uppercase tracking-[0.14em] text-sm shrink-0 self-start sm:self-auto"
        >
          How to stay current →
        </Link>
      </section>

      {/* PROVENANCE LEGEND */}
      <section className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] text-ink/70">
        <span className="font-mono uppercase tracking-[0.14em] text-ink/50">Every skill is tagged:</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 border border-ink/50 bg-mint" aria-hidden />
          <span><b className="font-semibold">Made at Planes</b> , from scratch</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 border border-ink/50 bg-butter" aria-hidden />
          <span><b className="font-semibold">Adapted by Planes</b> , reworked from elsewhere</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 border border-ink/50 bg-sky" aria-hidden />
          <span><b className="font-semibold">Found &amp; shared</b> , used as-is</span>
        </span>
      </section>

      {/* LATEST */}
      <section>
        <SectionHeader
          kicker="01 / Recently hangared"
          title={
            <>
              Latest <span className="serif-italic font-normal">drops</span>.
            </>
          }
          link={{ href: "/search", label: "Browse the catalogue" }}
        />
        {latest.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((s, i) => (
              <SkillCard
                key={s.slug.join("/")}
                skill={s}
                variant={i === 0 ? "color" : "paper"}
              />
            ))}
          </div>
        )}
      </section>

      {/* PER-BAY ROWS */}
      {DISCIPLINES.map((d, idx) => {
        const items = byDiscipline(d).slice(0, 3);
        if (items.length === 0) return null;
        return (
          <section key={d}>
            <SectionHeader
              kicker={`0${idx + 2} / ${DISCIPLINE_LABEL[d]}`}
              title={
                <>
                  {DISCIPLINE_LABEL[d]}{" "}
                  <span className="serif-italic font-normal">bay</span>.
                </>
              }
              swatchClass={SWATCH_CLASS[d]}
              link={{
                href: `/bay/${d}`,
                label: `Open ${DISCIPLINE_LABEL[d]} bay`,
              }}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((s, i) => (
                <SkillCard
                  key={s.slug.join("/")}
                  skill={s}
                  variant={i === 0 ? "color" : "paper"}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA STRIP */}
      <section className="border border-ink bg-butter relative">
        <div className="px-8 sm:px-12 lg:px-16 py-12 lg:py-16 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              Contribute
            </div>
            <div className="mt-3 text-[2rem] sm:text-[2.5rem] leading-[1.02] font-black tracking-tight">
              Found a prompt worth sharing? Add it to the Hangar.
            </div>
            <p className="mt-4 text-ink/80 max-w-prose">
              Original or curated. Submission opens a pre-filled PR on GitHub. The bay owner reviews and merges.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 justify-start lg:justify-end">
            <Link href="/add" className="btn-ink font-mono uppercase tracking-[0.14em] text-sm">
              <span aria-hidden>＋</span> Add to the Hangar
            </Link>
            <div className="hidden lg:block text-ink/50 plane-glide">
              <PaperPlane size={32} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  swatchClass,
  link,
}: {
  kicker: string;
  title: React.ReactNode;
  swatchClass?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6 flex-wrap">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
          {swatchClass ? (
            <span className={`inline-block w-2.5 h-2.5 border border-ink ${swatchClass}`} aria-hidden />
          ) : null}
          {kicker}
        </div>
        <h2 className="mt-2 text-[1.8rem] sm:text-[2.25rem] leading-[1.05] font-black tracking-tight">
          {title}
        </h2>
      </div>
      {link ? (
        <Link
          href={link.href}
          className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-ink/70 hover:text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          {link.label} →
        </Link>
      ) : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-ink/40 p-12 text-center text-ink/60">
      <p>The Hangar is empty.</p>
      <p className="mt-2">
        <Link
          href="/add"
          className="underline decoration-ink/30 hover:decoration-coral text-ink"
        >
          Add the first skill
        </Link>
        .
      </p>
    </div>
  );
}
