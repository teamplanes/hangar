import { ARTICLES } from "@/lib/latest";
import { LatestClient } from "@/components/LatestClient";
import { GITHUB_NEW_FILE_BASE } from "@/lib/config";

export const metadata = { title: "On the Airways · The Hangar" };

const TEMPLATE = `---
title: ""
summary: ""
source: ""
url: "#"
publishedOn: ""
---
`;
const submitUrl = (() => {
  const u = new URL(GITHUB_NEW_FILE_BASE);
  u.searchParams.set("filename", "lib/latest-submissions/your-article.md");
  u.searchParams.set("value", TEMPLATE);
  return u.toString();
})();

export default function OnTheAirwaysPage() {
  return (
    <div className="space-y-10">
      <section className="relative border border-ink bg-mint">
        <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              Flight school
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              <span className="serif-italic font-normal italic">On the</span>{" "}
              airways
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              A curated stream of what&apos;s worth reading this week from the people the studio already trusts.
            </p>
            <div className="mt-6">
              <a
                href={submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink text-sm"
              >
                <span aria-hidden>＋</span> Suggest a read
              </a>
            </div>
          </div>
        </div>
      </section>

      <LatestClient articles={ARTICLES} />
    </div>
  );
}
