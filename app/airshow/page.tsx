import { AIRSHOW } from "@/lib/airshow";
import { AirshowClient } from "@/components/AirshowClient";
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
              <span className="serif-italic font-normal italic">Airshow</span>
              <br />
              Look what's flying
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              Things people in the studio have spotted that have inspired us: products, demos, posts, and tools worth knowing.
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
        </div>
      </section>

      <AirshowClient entries={AIRSHOW} />
    </div>
  );
}
