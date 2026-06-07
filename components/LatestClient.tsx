"use client";

import { useState } from "react";
import type { Article, Source } from "@/lib/latest";
import { SOURCE_TYPE_LABEL } from "@/lib/latest";

export function LatestClient({
  curated,
  submitted,
  sources,
}: {
  curated: Article[];
  submitted: Article[];
  sources: Source[];
}) {
  const [tab, setTab] = useState<"curated" | "submitted">("curated");
  const list = tab === "curated" ? curated : submitted;

  return (
    <div className="grid lg:grid-cols-[1fr_22rem] gap-10">
      {/* FEED */}
      <div>
        <div role="tablist" className="flex items-center gap-px border border-ink bg-ink">
          <Tab
            active={tab === "curated"}
            onClick={() => setTab("curated")}
            label="Curated"
            count={curated.length}
          />
          <Tab
            active={tab === "submitted"}
            onClick={() => setTab("submitted")}
            label="Submitted"
            count={submitted.length}
          />
        </div>

        <ol className="mt-6 space-y-4">
          {list.map((a, i) => (
            <li
              key={a.title}
              className="border border-ink bg-cream paper-card p-6"
            >
              <div className="flex items-baseline justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/65">
                <span>{String(i + 1).padStart(2, "0")} · {a.source}</span>
                <span>{a.publishedOn}</span>
              </div>
              <a
                href={a.url}
                target={a.url.startsWith("http") ? "_blank" : undefined}
                rel={a.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-2 block group"
              >
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight group-hover:text-coral transition">
                  {a.title}
                </h3>
              </a>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">
                {a.summary}
              </p>
              <div className="mt-4 pt-3 border-t border-ink/15 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/70 flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <Vote count={a.votes} />
                  <Comments count={a.comments} />
                </div>
                <div className="flex items-center gap-3">
                  {a.feed === "submitted" && a.submittedBy ? (
                    <span>by @{a.submittedBy}</span>
                  ) : (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-coral underline decoration-ink/30 hover:decoration-coral underline-offset-4"
                    >
                      Read at {a.source} ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] text-ink/60">
                {a.tags.map((t) => (
                  <span key={t}>[{t}]</span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* SOURCES SIDEBAR */}
      <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
        <div className="border border-ink bg-cream p-6">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
            Sources
          </div>
          <div className="serif-italic text-xl mt-1">
            Vote on what's worth our time.
          </div>
          <ul className="mt-4 divide-y divide-ink/15">
            {sources.map((s) => (
              <li key={s.name} className="py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-coral"
                  >
                    {s.name}
                  </a>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55">
                    {SOURCE_TYPE_LABEL[s.type]}
                  </span>
                </div>
                <div className="text-xs text-ink/60 mt-0.5 font-mono">
                  {s.handle}
                </div>
                <div className="mt-2 flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/70">
                  <Vote count={s.votes} />
                  <Comments count={s.comments} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-dashed border-ink/35 bg-cream p-5 text-sm text-ink/75">
          Vote and comment are placeholder counts. They'll wire up to GitHub Discussions once Giscus is configured.
        </div>
      </aside>
    </div>
  );
}

function Tab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      onClick={onClick}
      className={[
        "flex-1 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition text-left",
        active ? "bg-cream text-ink" : "bg-ink text-cream hover:bg-ink-soft",
      ].join(" ")}
    >
      {label}{" "}
      <span className="opacity-60">({String(count).padStart(2, "0")})</span>
    </button>
  );
}

function Vote({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span aria-hidden>▲</span> {count}
    </span>
  );
}

function Comments({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span aria-hidden>💬</span> {count}
    </span>
  );
}
