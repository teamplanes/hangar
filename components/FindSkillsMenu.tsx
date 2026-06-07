"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DISCIPLINES, DISCIPLINE_LABEL, type Discipline } from "@/lib/skills-types";
import { SWATCH_CLASS } from "@/components/disciplineStyles";

const BAY_BLURB: Record<Discipline, string> = {
  product: "Discovery, JTBDs, roadmap moves.",
  design: "Briefs, critiques, systems.",
  dev: "Building and reviewing code with Claude.",
  "new-business": "Pitches, credentials, response writing.",
  general: "Cross-discipline moves. Useful everywhere.",
  "just-for-fun": "No agenda. Just good prompts.",
};

export function FindSkillsMenu({
  active = false,
}: {
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  function openNow() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }

  function closeSoon() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickAway(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      window.addEventListener("mousedown", onClickAway);
      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("mousedown", onClickAway);
      };
    }
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex items-center"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className={[
          "inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.16em] text-[0.72rem] transition-colors",
          open || active ? "text-ink" : "text-ink/55 hover:text-ink",
        ].join(" ")}
      >
        <span className={active ? "underline decoration-ink underline-offset-[5px]" : ""}>
          Find Skills
        </span>
        <span
          aria-hidden
          className={`inline-block transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-1/2 top-full -translate-x-1/2 mt-3 z-50 w-[24rem] border border-ink bg-cream shadow-paper-sm"
        >
          {/* notch */}
          <div
            aria-hidden
            className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cream border-l border-t border-ink"
          />
          <ul className="divide-y divide-ink/15">
            {/* All bays */}
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="block px-5 py-3.5 hover:bg-butter transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-2.5 h-2.5 border border-ink/50 bg-cream-deep" aria-hidden />
                    <span className="font-sans font-semibold text-[1.0rem] tracking-tight text-ink normal-case">
                      All Bays
                    </span>
                  </div>
                  <span className="font-mono text-ink/40 text-sm" aria-hidden>→</span>
                </div>
                <div className="mt-0.5 ml-[1.375rem] serif-italic text-[0.9rem] text-ink/60 normal-case tracking-normal leading-snug">
                  Everything across the hangar.
                </div>
              </Link>
            </li>
            {DISCIPLINES.map((d) => (
              <li key={d}>
                <Link
                  href={`/bay/${d}`}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className="block px-5 py-3.5 hover:bg-butter transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block w-2.5 h-2.5 border border-ink/70 ${SWATCH_CLASS[d]}`}
                        aria-hidden
                      />
                      <span className="font-sans font-semibold text-[1.0rem] tracking-tight text-ink normal-case">
                        {DISCIPLINE_LABEL[d]}
                      </span>
                    </div>
                    <span className="font-mono text-ink/40 text-sm" aria-hidden>→</span>
                  </div>
                  <div className="mt-0.5 ml-[1.375rem] serif-italic text-[0.9rem] text-ink/60 normal-case tracking-normal leading-snug">
                    {BAY_BLURB[d]}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
