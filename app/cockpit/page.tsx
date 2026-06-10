import React from "react";
import Link from "next/link";
import { allSkills, DISCIPLINE_LABEL } from "@/lib/skills";
import { rankedSkills } from "@/lib/leaderboard";
import { CommandBox } from "@/components/CommandBox";
import { SWATCH_CLASS } from "@/components/disciplineStyles";
import { SpiceChip } from "@/components/SpiceMeter";
import { packByDiscipline } from "@/lib/cockpit";
import { EssentialSkillsTabs } from "./EssentialSkillsTabs";

export const metadata = { title: "The Cockpit · The Hangar" };
export const dynamic = "force-dynamic";

type SetupStep = {
  n: string;
  heading: string;
  body: React.ReactNode;
  wide?: boolean;
};

const SETUP_STEPS: SetupStep[] = [
  {
    n: "01",
    heading: "Pick the right model",
    body: "Sonnet handles 90% of what you'll throw at it and won't keep you waiting. Move to Opus when the task demands it: deep research, complex code, writing that relies on nuance and context.",
  },
  {
    n: "02",
    heading: "Give every project a memory",
    body: (
      <>
        <p>
          A CLAUDE.md file (or a context.md on Claude.ai) tells Claude what the project is, who it&apos;s for, and what to steer clear of. Claude reads it at the start of every session, so you&apos;re not re-explaining the basics each time.
        </p>
        <p className="mt-3">
          You don&apos;t have to write it by hand. Ask Claude to draft one for you, and do it in plan mode so it proposes the file before writing anything. To switch into plan mode in Claude Code, press <code>Shift+Tab</code> until it shows.
        </p>
      </>
    ),
  },
  {
    n: "03",
    heading: "Install the skills you reach for",
    body: (
      <>
        <p>
          Open Claude Code and add The Hangar marketplace once, then install whichever plugins you want:
        </p>
        <div className="mt-3 space-y-1.5">
          <code className="block bg-ink/8 border border-ink/15 px-3 py-2 font-mono text-[0.78rem] leading-snug">
            claude plugin marketplace add teamplanes/hangar
          </code>
          <code className="block bg-ink/8 border border-ink/15 px-3 py-2 font-mono text-[0.78rem] leading-snug">
            claude plugin install hangar-design@planes-hangar
          </code>
        </div>
        <p className="mt-3">
          Swap the bay name for your discipline. Skills land as slash commands and stay available between sessions, so there&apos;s nothing to paste back in.
        </p>
      </>
    ),
  },
  {
    n: "04",
    heading: "Use Projects for ongoing client work",
    body: "On Claude.ai, a Project keeps everything for a piece of work in one place between sessions. Drop in the brand guidelines, research and briefs that Claude needs to stay useful for that client, and it'll have them to hand every time you pick the work back up. We tend to keep one Project per client or workstream.",
  },
  {
    n: "05",
    wide: true,
    heading: "Stay up to date",
    body: (
      <>
        <p>
          New skills land in The Hangar all the time. Turn auto-update on once and Claude pulls the latest at the start of each session (you&apos;ll get a <code>/reload-plugins</code> nudge when something new arrives). In <code>/plugin</code> &rarr; Marketplaces &rarr; planes-hangar &rarr; enable auto-update, or drop this into your settings:
        </p>
        <div className="mt-3 max-w-xl">
          <CommandBox
            multiline
            cmd={`"extraKnownMarketplaces": {
  "planes-hangar": {
    "source": { "source": "github", "repo": "teamplanes/hangar" },
    "autoUpdate": true
  }
}`}
          />
        </div>
        <p className="mt-4">Or pull manually any time:</p>
        <div className="mt-2 grid sm:grid-cols-3 gap-2.5">
          <CommandBox label="Pull the latest" cmd="claude plugin marketplace update" />
          <CommandBox label="Update one plugin" cmd="claude plugin update hangar-<bay>" />
          <CommandBox label="See what landed" cmd="/hangar-general:whats-new" />
        </div>
      </>
    ),
  },
];

export default async function CockpitPage() {
  const skills = allSkills();
  const { ranked } = await rankedSkills();
  const topSkills = ranked.slice(0, 5);

  const essentials = packByDiscipline(skills);

  return (
    <div className="space-y-20">

      {/* HERO */}
      <section
        className="relative py-12 lg:py-16 bg-ink text-cream"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
      >
        <div className="mx-auto max-w-page px-6 lg:px-10">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cream/60 mb-4">
            The Cockpit
          </div>
          <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight text-cream">
            <span className="serif-italic font-normal italic">How to fly</span>{" "}
            with Claude at Planes
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] text-cream/75 leading-relaxed">
            Your out-of-the-box skills, set up. These are some of the best skills we've found and started reaching for regularly. Where it made sense, we've shaped them around how we already work at Planes.
          </p>
        </div>
      </section>

      {/* SET UP YOUR COCKPIT */}
      <section>
        <div className="mb-8">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/60 mb-2">
            01 / Setup
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.25rem] font-black tracking-tight leading-[1.05]">
            <span className="serif-italic font-normal italic">Set up</span>{" "}
            your cockpit
          </h2>
          <p className="mt-3 text-ink/70 max-w-prose">
            How to get started with Claude Code, and install your first skills
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SETUP_STEPS.map((step) => (
            <div
              key={step.n}
              className={`border border-ink p-6 bg-cream relative ${step.wide ? "sm:col-span-2" : ""}`}
            >
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink/40 mb-3">
                {step.n}
              </div>
              <h3 className="font-black text-[1.15rem] tracking-tight leading-snug">
                {step.heading}
              </h3>
              <div className="mt-3 text-[0.93rem] text-ink/75 leading-relaxed">
                {step.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESSENTIAL SKILLS */}
      <section>
        <div className="mb-8">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/60 mb-2">
            02 / Essential skills
          </div>
          <h2 className="text-[1.8rem] sm:text-[2.25rem] font-black tracking-tight leading-[1.05]">
            <span className="serif-italic font-normal italic">The skills</span>{" "}
            worth installing
          </h2>
        </div>

        <EssentialSkillsTabs essentials={essentials} />
      </section>

      {/* TOP SKILLS */}
      <section>
        <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/60 mb-2">
              03 / Top skills
            </div>
            <h2 className="text-[1.8rem] sm:text-[2.25rem] font-black tracking-tight leading-[1.05]">
              <span className="serif-italic font-normal italic">What people are</span>{" "}
              actually reaching for
            </h2>
            <p className="mt-3 text-ink/60 text-sm max-w-prose">
              Ranked by the number of times people view and copy skills over the last week.
            </p>
          </div>
          <Link
            href="/top-skills"
            className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-ink/70 hover:text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            See the full board →
          </Link>
        </div>

        <div className="border border-ink overflow-hidden">
          {/* Header row */}
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-ink bg-ink">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/50 w-6 flex-shrink-0">#</span>
            <span className="w-2.5 flex-shrink-0" aria-hidden />
            <span className="flex-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/50">Skill</span>
            <span className="hidden sm:block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/50 flex-shrink-0 w-28 text-right">Spice</span>
            <span className="hidden md:block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/50 flex-shrink-0 w-20 text-right">Copies</span>
            <span className="hidden md:block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/50 flex-shrink-0 w-20 text-right">Views</span>
            <span className="w-4 flex-shrink-0" aria-hidden />
          </div>

          {topSkills.map((s, i) => (
            <Link
              key={s.slug.join("/")}
              href={s.href}
              className="group flex items-center gap-4 px-5 py-4 border-b border-ink/15 last:border-b-0 hover:bg-cream-deep transition-colors"
            >
              {/* Rank */}
              <span className="font-mono text-[0.9rem] font-black tabular-nums text-ink/30 w-6 flex-shrink-0 group-hover:text-ink/60 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Bay swatch */}
              <span
                className={`inline-block w-2.5 h-2.5 border border-ink/60 flex-shrink-0 ${SWATCH_CLASS[s.discipline]}`}
                aria-hidden
              />

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[0.95rem] truncate group-hover:text-coral transition-colors">
                  {s.title}
                </div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/50 mt-0.5">
                  {DISCIPLINE_LABEL[s.discipline]}
                </div>
              </div>

              {/* Spice */}
              {s.spice ? (
                <span className="hidden sm:block flex-shrink-0">
                  <SpiceChip spice={s.spice} />
                </span>
              ) : null}

              {/* Copies + views this week (real) */}
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink/70 flex-shrink-0 tabular-nums hidden md:block w-20 text-right">
                {s.stats.copiesWeek}
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink/45 flex-shrink-0 tabular-nums hidden md:block w-20 text-right">
                {s.stats.viewsWeek}
              </span>

              <span className="font-mono text-ink/30 group-hover:text-ink/70 transition-colors" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
