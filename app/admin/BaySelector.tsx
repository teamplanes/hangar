"use client";

import { useState } from "react";
import { DISCIPLINES, DISCIPLINE_LABEL } from "@/lib/skills-types";
import { SWATCH_CLASS } from "@/components/disciplineStyles";

export function BaySelector({
  slug,
  currentDiscipline,
}: {
  slug: string[];
  currentDiscipline: string;
}) {
  const [discipline, setDiscipline] = useState(currentDiscipline);
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleChange(newDiscipline: string) {
    if (newDiscipline === discipline) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/move-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: currentSlug, newDiscipline }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setDiscipline(newDiscipline);
      setCurrentSlug(json.newSlug);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span
        className={`inline-block w-2.5 h-2.5 border border-ink flex-shrink-0 ${SWATCH_CLASS[discipline as keyof typeof SWATCH_CLASS] ?? "bg-cream"}`}
        aria-hidden
      />
      <select
        value={discipline}
        onChange={(e) => handleChange(e.target.value)}
        disabled={status === "saving"}
        className="input-bare text-sm py-1 pr-6 cursor-pointer appearance-none bg-transparent"
        style={{ backgroundImage: "none" }}
      >
        {DISCIPLINES.map((d) => (
          <option key={d} value={d}>
            {DISCIPLINE_LABEL[d]}
          </option>
        ))}
      </select>
      {status === "saving" && (
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/50">saving…</span>
      )}
      {status === "saved" && (
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mint">moved ✓</span>
      )}
      {status === "error" && (
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-coral">error</span>
      )}
    </div>
  );
}
