"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { SkillCard } from "@/components/SkillCard";
import type { Skill } from "@/lib/skills-types";

export function SearchClient({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(skills, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "tags", weight: 0.25 },
          { name: "body", weight: 0.15 },
          { name: "discipline", weight: 0.05 },
          { name: "source.credit", weight: 0.05 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [skills],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return skills;
    return fuse.search(q).map((r) => r.item);
  }, [query, fuse, skills]);

  return (
    <div className="space-y-8">
      <div className="border-b border-ink pb-1">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search by title, tag, or contents…"
          className="w-full bg-transparent text-[2rem] sm:text-[2.5rem] leading-tight font-black tracking-tight placeholder:text-ink/30 focus:outline-none py-2"
        />
      </div>

      <div className="flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink/70">
        <span>
          {query ? (
            <>
              {results.length} match{results.length === 1 ? "" : "es"} ·{" "}
              <span className="serif-italic normal-case tracking-normal text-ink">
                "{query}"
              </span>
            </>
          ) : (
            <>{skills.length} skills in the Hangar</>
          )}
        </span>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="hover:text-ink underline decoration-ink/30 underline-offset-4"
          >
            Clear
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="border border-dashed border-ink/40 p-12 text-center text-ink/70">
          No matches. Try a broader term, or open a bay from the nav.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((s) => (
            <SkillCard key={s.slug.join("/")} skill={s} />
          ))}
        </div>
      )}
    </div>
  );
}
