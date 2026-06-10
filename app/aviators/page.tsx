import Link from "next/link";
import { AVIATORS, AVIATOR_TAG_LABEL } from "@/lib/aviators";
import { GITHUB_NEW_FILE_BASE } from "@/lib/config";

export const metadata = { title: "Aviators · The Hangar" };

const SUGGEST_TEMPLATE = `---
name: ""
handle: ""
link: ""
tags: []
bio: ""
why: ""
addedBy: ""
addedOn: ""
---
`;

const suggestUrl = (() => {
  const u = new URL(GITHUB_NEW_FILE_BASE.replace("/new/main", "/new/main"));
  u.searchParams.set("filename", "lib/aviator-suggestions/someone.md");
  u.searchParams.set("value", SUGGEST_TEMPLATE);
  return u.toString();
})();

export default function AviatorsPage() {
  return (
    <div className="space-y-10">
      <section className="relative border border-ink bg-sky">
        <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              Cleared for take-off
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              <span className="serif-italic font-normal italic">Aviators.</span>
              <br />
              Worth following.
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              People we read, listen to and steal from. A curated short-list across writing, research, design and engineering. Updated when the studio finds someone new.
            </p>
            <div className="mt-6">
              <a
                href={suggestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink text-sm"
              >
                <span aria-hidden>＋</span> Suggest an Aviator
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {AVIATORS.map((a) => (
          <article
            key={a.handle}
            className="paper-card border border-ink bg-cream p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-black text-xl leading-tight tracking-tight">
                  {a.name}
                </div>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/65 hover:text-coral"
                >
                  {a.handle} ↗
                </a>
              </div>
              <div className="flex flex-wrap gap-1 justify-end max-w-[8rem]">
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.6rem] uppercase tracking-[0.14em] border border-ink/40 px-1.5 py-0.5"
                  >
                    {AVIATOR_TAG_LABEL[t]}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[0.95rem] text-ink/80 leading-relaxed">
              {a.bio}
            </p>
            <div className="mt-4 pt-4 border-t border-ink/15">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/60">
                Why follow
              </div>
              <p className="mt-1 serif-italic text-[1.05rem] leading-snug">
                {a.why}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55">
              <span>Added by @{a.addedBy}</span>
              <span>{a.addedOn}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
