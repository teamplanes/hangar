"use client";

import { useState } from "react";
import {
  type AirshowEntry,
  type AirshowCategory,
  AIRSHOW_CATEGORY_LABEL,
  AIRSHOW_CATEGORY_ORDER,
} from "@/lib/airshow";

const COLOR_BG: Record<string, string> = {
  sky: "bg-sky",
  butter: "bg-butter",
  coral: "bg-coral",
  mint: "bg-mint",
  cream: "bg-cream-deep",
};

type Filter = AirshowCategory | "all";

export function AirshowClient({ entries }: { entries: AirshowEntry[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Only show category chips that actually have entries.
  const present = AIRSHOW_CATEGORY_ORDER.filter((c) =>
    entries.some((e) => e.categories.includes(c)),
  );
  const chips: Filter[] = ["all", ...present];

  const shown =
    filter === "all"
      ? entries
      : entries.filter((e) => e.categories.includes(filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = filter === c;
          const label = c === "all" ? "All" : AIRSHOW_CATEGORY_LABEL[c];
          const count =
            c === "all"
              ? entries.length
              : entries.filter((e) => e.categories.includes(c)).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={[
                "inline-flex items-center gap-2 border border-ink px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors",
                active
                  ? "bg-ink text-cream"
                  : "bg-cream text-ink hover:bg-butter",
              ].join(" ")}
            >
              {label}
              <span className={active ? "text-cream/60" : "text-ink/45"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {shown.map((e) => (
          <article
            key={e.title}
            className={`paper-card border border-ink ${COLOR_BG[e.color]} p-6 sm:p-8`}
          >
            <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/75">
              <span>{e.source}</span>
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
      </div>
    </div>
  );
}
