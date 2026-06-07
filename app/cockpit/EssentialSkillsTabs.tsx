"use client";

import { useState } from "react";
import { type Skill, DISCIPLINE_LABEL, DISCIPLINES } from "@/lib/skills-types";
import { SWATCH_CLASS } from "@/components/disciplineStyles";
import { SkillCard } from "@/components/SkillCard";

const TAB_ORDER = ["general", ...DISCIPLINES] as const;
type TabKey = (typeof TAB_ORDER)[number];

const TAB_LABEL: Record<TabKey, string> = {
  general: "General",
  product: DISCIPLINE_LABEL.product,
  design: DISCIPLINE_LABEL.design,
  dev: DISCIPLINE_LABEL.dev,
  "new-business": DISCIPLINE_LABEL["new-business"],
  "just-for-fun": DISCIPLINE_LABEL["just-for-fun"],
};

export function EssentialSkillsTabs({
  essentials,
}: {
  essentials: Record<string, Skill[]>;
}) {
  const [active, setActive] = useState<TabKey>("general");
  const skills = essentials[active] ?? [];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border border-ink overflow-hidden mb-8">
        {TAB_ORDER.map((tab) => {
          const isActive = tab === active;
          const swatch = tab === "general" ? null : SWATCH_CLASS[tab as keyof typeof SWATCH_CLASS];
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={[
                "inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors border-r border-ink last:border-r-0",
                isActive
                  ? "bg-ink text-cream"
                  : "bg-cream text-ink/60 hover:bg-cream-deep hover:text-ink",
              ].join(" ")}
            >
              {swatch ? (
                <span
                  className={`inline-block w-2 h-2 border ${isActive ? "border-cream/60" : "border-ink/60"} ${isActive ? "" : swatch}`}
                  aria-hidden
                />
              ) : null}
              {TAB_LABEL[tab]}
            </button>
          );
        })}
      </div>

      {/* Skill grid */}
      {skills.length === 0 ? (
        <p className="text-ink/50 text-sm italic">No curated picks yet for this bay.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s) => (
            <SkillCard key={s.slug.join("/")} skill={s} variant="color" />
          ))}
        </div>
      )}
    </div>
  );
}
