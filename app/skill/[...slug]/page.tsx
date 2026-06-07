import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allSkills,
  bySlug,
  DISCIPLINE_LABEL,
} from "@/lib/skills";
import { Markdown } from "@/components/Markdown";
import { GiscusStub } from "@/components/Giscus";
import { CopyButton } from "@/components/CopyButton";
import { CARD_BG, SWATCH_CLASS } from "@/components/disciplineStyles";
import { PaperPlane } from "@/components/PaperPlane";
import { SkillStatsRail } from "@/components/SkillStats";

export function generateStaticParams() {
  return allSkills().map((s) => ({ slug: s.slug }));
}

const TYPE_LABEL = { prompt: "Prompt", skill: "Skill", recipe: "Recipe" } as const;
const STATUS_LABEL = {
  draft: "Draft",
  stable: "Stable",
  "needs-review": "Needs review",
} as const;

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const skill = bySlug(slug);
  if (!skill) notFound();

  const all = allSkills();
  const idx = all.findIndex((s) => s.slug.join("/") === skill.slug.join("/"));
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <article className="grid lg:grid-cols-[1fr_20rem] gap-12">
      {/* MAIN */}
      <div className="min-w-0">
        {/* Crumb */}
        <Link
          href={`/bay/${skill.discipline}`}
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink/70 hover:text-ink"
        >
          <span
            className={`inline-block w-2.5 h-2.5 border border-ink ${SWATCH_CLASS[skill.discipline]}`}
            aria-hidden
          />
          {DISCIPLINE_LABEL[skill.discipline]} bay
        </Link>

        {/* Title: bold and italic-serif treatment */}
        <h1 className="mt-4 text-[2.5rem] sm:text-[3.5rem] leading-[0.98] font-black tracking-tight">
          {skill.title}
        </h1>

        {/* Type / Status / Author row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/70">
          <span className="inline-flex items-center gap-1.5">
            <PaperPlane size={11} /> {TYPE_LABEL[skill.type]}
          </span>
          {skill.status ? (
            <span>{STATUS_LABEL[skill.status]}</span>
          ) : null}
          {skill.added_by ? (
            <span>by <span className="serif-italic normal-case tracking-normal text-ink">@{skill.added_by}</span></span>
          ) : null}
          {skill.added_on ? <span>{skill.added_on}</span> : null}
        </div>

        {/* Tags */}
        {skill.tags && skill.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink/70">
            {skill.tags.map((t) => (
              <Link
                key={t}
                href={`/tag/${encodeURIComponent(t)}`}
                className="hover:text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-coral"
              >
                [{t}]
              </Link>
            ))}
          </div>
        ) : null}

        {/* Stats rail */}
        <div className="mt-8">
          <SkillStatsRail skill={skill} />
        </div>

        {/* Action rail */}
        <div className="mt-6 border-t border-ink pt-6">
          <CopyButton text={skill.body} label="Copy skill body" />
          <span className="ml-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/60">
            paste into Claude, or drop the file into a Claude Code skills dir
          </span>
        </div>

        <div className="mt-8">
          <Markdown>{skill.body}</Markdown>
        </div>

        <GiscusStub />

        <nav className="mt-14 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={prev.href}
              className="paper-card group border border-ink bg-cream p-5"
            >
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                ← Previous
              </div>
              <div className="font-semibold mt-1 leading-snug">{prev.title}</div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={next.href}
              className="paper-card group border border-ink bg-cream p-5 sm:text-right"
            >
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
                Next →
              </div>
              <div className="font-semibold mt-1 leading-snug">{next.title}</div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>

      {/* ASIDE: editorial sidebar */}
      <aside className="lg:sticky lg:top-32 lg:self-start space-y-6">
        <div className={`border border-ink ${CARD_BG[skill.discipline]} p-6`}>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
            Bay
          </div>
          <div className="serif-italic text-2xl text-ink mt-1">
            {DISCIPLINE_LABEL[skill.discipline]}
          </div>
        </div>

        <div className="border border-ink bg-cream p-6">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 mb-3">
            Source
          </div>
          {skill.source?.kind === "curated" ? (
            <div className="space-y-2 text-sm">
              <div className="inline-flex items-center gap-1.5 text-ink">
                <span aria-hidden>↗</span>
                <span className="serif-italic text-base">
                  Curated from elsewhere
                </span>
              </div>
              {skill.source.credit ? (
                <div className="text-ink/80">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/60 mr-2">
                    Credit
                  </span>
                  <span className="font-medium">{skill.source.credit}</span>
                </div>
              ) : null}
              {skill.source.url ? (
                <div className="break-words">
                  <a
                    href={skill.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-ink/30 hover:decoration-coral text-sm"
                  >
                    {skill.source.url}
                  </a>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="serif-italic text-lg text-ink">
              Written at Planes.
            </div>
          )}
        </div>

        <div className="border border-ink bg-cream p-6">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 mb-3">
            Metadata
          </div>
          <dl className="text-sm divide-y divide-ink/15">
            <Row k="Type" v={TYPE_LABEL[skill.type]} />
            {skill.status ? <Row k="Status" v={STATUS_LABEL[skill.status]} /> : null}
            {skill.added_by ? <Row k="Added by" v={`@${skill.added_by}`} /> : null}
            {skill.added_on ? <Row k="Added on" v={skill.added_on} /> : null}
          </dl>
        </div>
      </aside>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 py-2">
      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/60 self-center">
        {k}
      </dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}
