import Link from "next/link";
import { AIRSHOW } from "@/lib/airshow";
import { PaperPlane } from "@/components/PaperPlane";
import { GITHUB_NEW_FILE_BASE } from "@/lib/config";

export const metadata = { title: "Airshow · The Hangar" };

const TEMPLATE = `---
title: ""
source: ""
sourceUrl: ""
spottedBy: ""
spottedOn: ""
tags: []
what: ""
why: ""
color: "sky"
---
`;
const submitUrl = (() => {
  const u = new URL(GITHUB_NEW_FILE_BASE);
  u.searchParams.set("filename", "lib/airshow-submissions/your-submission.md");
  u.searchParams.set("value", TEMPLATE);
  return u.toString();
})();

const COLOR_BG: Record<string, string> = {
  sky: "bg-sky",
  butter: "bg-butter",
  coral: "bg-coral",
  mint: "bg-mint",
  cream: "bg-cream-deep",
};

export default function AirshowPage() {
  return (
    <div className="space-y-10">
      <section className="relative border border-ink bg-butter">
        <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              Eyes up
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              <span className="serif-italic font-normal italic">Airshow.</span>
              <br />
              Look what's flying.
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              Things people in the studio have spotted out there. Products, demos, posts, and tools we want everyone to see. Not ours. Worth knowing.
            </p>
            <div className="mt-6">
              <a
                href={submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink text-sm"
              >
                <span aria-hidden>＋</span> Submit a spot
              </a>
            </div>
          </div>
          <div className="text-ink/30 hidden lg:flex justify-end plane-glide">
            <PaperPlane size={96} />
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        {AIRSHOW.map((e, i) => (
          <article
            key={e.title}
            className={`paper-card border border-ink ${COLOR_BG[e.color]} p-6 sm:p-8`}
          >
            <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/75">
              <span>{String(i + 1).padStart(2, "0")} · {e.source}</span>
              <span>{e.spottedOn}</span>
            </div>
            <h3 className="mt-3 text-2xl sm:text-[1.75rem] leading-[1.05] font-black tracking-tight">
              {e.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/85">
              {e.what}
            </p>
            <div className="mt-4 pt-4 border-t border-ink/20">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/75">
                Why we noticed
              </div>
              <p className="mt-1 serif-italic text-[1.05rem] leading-snug">
                {e.why}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.75rem]">
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-ink/65">
                {e.tags.slice(0, 4).map((t) => (
                  <span key={t}>[{t}]</span>
                ))}
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/65">
                spotted by @{e.spottedBy}
              </div>
            </div>
            <div className="mt-4">
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink hover:text-coral underline decoration-ink/30 underline-offset-4 hover:decoration-coral"
              >
                Open source ↗
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
