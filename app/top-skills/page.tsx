import Link from "next/link";
import {
  byDownloads,
  DISCIPLINE_LABEL,
} from "@/lib/skills";
import { hotness } from "@/components/SkillStats";
import { SpiceChip } from "@/components/SpiceMeter";
import { SWATCH_CLASS } from "@/components/disciplineStyles";

export const metadata = { title: "Top Skills · The Hangar" };

export default function TopSkillsPage() {
  const ranked = byDownloads();

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
              Top{" "}
              <span className="serif-italic font-normal italic">Skills</span>.
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              The most-downloaded skills in the Hangar this week. Movement shown against last week.
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

      {/* Table */}
      <section className="border border-ink bg-cream">
        <div className="grid grid-cols-[3rem_1fr_8rem_8rem_6rem] sm:grid-cols-[3.5rem_1fr_10rem_10rem_8rem_8rem] items-center bg-ink text-cream px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
          <span>#</span>
          <span>Skill</span>
          <span className="hidden sm:block">Bay</span>
          <span>Spice</span>
          <span>This week</span>
          <span>Move</span>
        </div>
        <ol className="divide-y divide-ink/15">
          {ranked.map((s, i) => {
            const h = hotness(s);
            return (
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
                    {typeof s.usage_count === "number" ? (
                      <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/60">
                        {s.usage_count} {s.usage_count === 1 ? "user" : "users"} at Planes
                      </div>
                    ) : null}
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
                    {s.downloads_week ?? 0}
                  </span>
                  <span
                    className={[
                      "font-mono text-[0.72rem] uppercase tracking-[0.14em] inline-flex items-center gap-1",
                      h.label === "Hot"
                        ? "text-coral"
                        : h.label === "Cooling"
                          ? "text-ink/60"
                          : "text-ink/70",
                    ].join(" ")}
                  >
                    <span aria-hidden>{h.arrow}</span>
                    {h.delta > 0 ? "+" : ""}
                    {h.delta}%
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/55">
        Movement compares this week's downloads to last week's. Steady = within 5%.
      </p>
    </div>
  );
}
