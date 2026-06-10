import Link from "next/link";
import {
  allSkills,
  byDiscipline,
  DISCIPLINES,
  DISCIPLINE_LABEL,
  featuredSkill,
} from "@/lib/skills";
import { SkillCard } from "@/components/SkillCard";
import { SWATCH_CLASS } from "@/components/disciplineStyles";
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight";
import { CommandBox } from "@/components/CommandBox";

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
              <span className="serif-italic font-normal italic">The skills and prompts</span>{" "}
              working at Planes right now
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
              Find your skills
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
            <div className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream/80">
              Skill spotlight
            </div>
            <FeaturedSpotlight skill={featured} />
          </div>
        </section>
      ) : null}

      {/* STAY CURRENT reminder */}
      <section className="!mt-12 border border-ink bg-sky px-6 sm:px-10 py-7 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">
        <div>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
            Already flying?
          </div>
          <p className="mt-2 text-[0.95rem] text-ink/85 leading-snug max-w-prose">
            New skills land here often. Turn auto-update on once so installed plugins refresh themselves, or pull the latest any time and see what landed.
          </p>
          <Link
            href="/cockpit"
            className="mt-3 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/70 hover:text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            How to have your plug-ins update automatically →
          </Link>
        </div>
        <div className="flex flex-col gap-2.5 w-full lg:w-[360px]">
          <CommandBox label="Pull the latest" cmd="claude plugin marketplace update" />
          <CommandBox label="See what landed" cmd="/hangar-general:whats-new" />
        </div>
      </section>

      {/* LATEST */}
      <section className="!mt-12">
        <SectionHeader
          kicker="01 / Recently hangared"
          title={
            <>
              <span className="serif-italic font-normal">Latest</span> drops
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
                  <span className="serif-italic font-normal">{DISCIPLINE_LABEL[d]}</span>{" "}
                  bay
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
