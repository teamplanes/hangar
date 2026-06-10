import Link from "next/link";
import { DISCIPLINE_LABEL } from "@/lib/skills";
import { rankedSkills } from "@/lib/leaderboard";
import { SpiceChip } from "@/components/SpiceMeter";
import { SWATCH_CLASS } from "@/components/disciplineStyles";

export const metadata = { title: "Top Skills · The Hangar" };
export const dynamic = "force-dynamic";

export default async function TopSkillsPage() {
  const { ranked, live, configured } = await rankedSkills();

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative border border-ink bg-coral">
        <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              The board
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              <span className="serif-italic font-normal italic">Top</span>{" "}
              Skills
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              Ranked by how often people copy each skill&apos;s body this week.
              Updates live as the studio reach for new skills.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
              Currently tracking
            </div>
            <div className="text-[3rem] leading-none font-black tabular-nums">
              {String(ranked.length).padStart(2, "0")}
              <span className="text-base font-mono uppercase tracking-[0.16em] ml-2 text-ink/70">
                skills
              </span>
            </div>
          </div>
        </div>
      </section>

      {!live && (
        <div className="border border-dashed border-ink/40 px-6 py-4 text-sm text-ink/70 bg-cream">
          {configured
            ? "No copies or views recorded yet. The board fills in as people use skills, the order below is provisional until then."
            : "Live tracking isn't connected yet (Upstash not configured), so counts read zero. Once it's wired up, this board reflects real copies and views."}
        </div>
      )}

      {/* Table */}
      <section className="border border-ink bg-cream">
        <div className="grid grid-cols-[3rem_1fr_8rem_8rem_6rem] sm:grid-cols-[3.5rem_1fr_10rem_10rem_8rem_8rem] items-center bg-ink text-cream px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
          <span>#</span>
          <span>Skill</span>
          <span className="hidden sm:block">Bay</span>
          <span>Spice</span>
          <span>Copies</span>
          <span>Views</span>
        </div>
        <ol className="divide-y divide-ink/15">
          {ranked.map((s, i) => (
            <li key={s.slug.join("/")}>
              <Link
                href={s.href}
                className="grid grid-cols-[3rem_1fr_8rem_8rem_6rem] sm:grid-cols-[3.5rem_1fr_10rem_10rem_8rem_8rem] items-center px-5 py-4 hover:bg-butter/40 transition"
              >
                <span className="font-black text-2xl tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <div className="font-semibold leading-snug">{s.title}</div>
                  <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55">
                    {s.stats.copies} all-time
                  </div>
                </span>
                <span className="hidden sm:flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em]">
                  <span
                    className={`inline-block w-2 h-2 border border-ink ${SWATCH_CLASS[s.discipline]}`}
                    aria-hidden
                  />
                  {DISCIPLINE_LABEL[s.discipline]}
                </span>
                <span>{s.spice ? <SpiceChip spice={s.spice} /> : null}</span>
                <span className="text-2xl font-black tabular-nums">
                  {s.stats.copiesWeek}
                </span>
                <span className="font-mono text-[0.9rem] tabular-nums text-ink/70">
                  {s.stats.viewsWeek}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/55">
        Copies = &quot;copy skill body&quot; clicks this week. Views = skill page
        visits this week. Both reset weekly; all-time copies shown under each
        skill.
      </p>
    </div>
  );
}
