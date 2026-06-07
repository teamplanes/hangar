"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    href: "/aviators",
    label: "Aviators",
    blurb: "People worth following.",
  },
  {
    href: "/airshow",
    label: "Airshow",
    blurb: "Things spotted in the wild.",
  },
  {
    href: "/flight-tips",
    label: "Flight Tips",
    blurb: "Sharper prompts, sharper answers.",
  },
  {
    href: "/on-the-airways",
    label: "On the Airways",
    blurb: "Latest reading from across AI.",
  },
] as const;

export function FlightSchoolMenu({ active = false }: { active?: boolean }) {
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
          Flight School
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
          className="absolute left-1/2 top-full -translate-x-1/2 mt-3 z-50 w-[22rem] border border-ink bg-cream shadow-paper-sm"
        >
          {/* small notch */}
          <div
            aria-hidden
            className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-cream border-l border-t border-ink"
          />
          <ul className="divide-y divide-ink/15">
            {ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className="block px-5 py-4 hover:bg-butter transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-sans font-semibold text-[1.05rem] tracking-tight text-ink normal-case">
                      {item.label}
                    </span>
                    <span
                      className="font-mono text-ink/40 group-hover:text-ink transition"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <div className="mt-0.5 serif-italic text-[0.95rem] text-ink/70 normal-case tracking-normal leading-snug">
                    {item.blurb}
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
