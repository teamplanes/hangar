"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ITEMS = [
  {
    href: "/aviators",
    label: "Aviators",
    blurb: "People worth following.",
    icon: (
      <Svg>
        <circle cx="12" cy="7.5" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </Svg>
    ),
  },
  {
    href: "/airshow",
    label: "Airshow",
    blurb: "Things spotted in the wild.",
    icon: (
      <Svg>
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </Svg>
    ),
  },
  {
    href: "/flight-tips",
    label: "Flight Tips",
    blurb: "Sharper prompts, sharper answers.",
    icon: (
      <Svg>
        <path d="M9.5 17.5h5" />
        <path d="M10 20.5h4" />
        <path d="M12 3.5a5.5 5.5 0 0 0-3.3 9.9c.6.5 1 1.2 1.1 1.9h4.4c.1-.7.5-1.4 1.1-1.9A5.5 5.5 0 0 0 12 3.5z" />
      </Svg>
    ),
  },
  {
    href: "/on-the-airways",
    label: "On the Airways",
    blurb: "Latest reading from across AI.",
    icon: (
      <Svg>
        <circle cx="12" cy="12" r="1.8" />
        <path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6" />
        <path d="M15.8 8.2a5.4 5.4 0 0 1 0 7.6" />
        <path d="M5.6 5.6a9 9 0 0 0 0 12.8" />
        <path d="M18.4 5.6a9 9 0 0 1 0 12.8" />
      </Svg>
    ),
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
                  className="block px-5 py-3.5 hover:bg-butter transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2.5">
                      {item.icon}
                      <span className="font-sans font-semibold text-[1.0rem] tracking-tight text-ink normal-case">
                        {item.label}
                      </span>
                    </span>
                    <span
                      className="font-mono text-ink/40 group-hover:text-ink transition"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <div className="mt-0.5 ml-[1.625rem] text-[0.88rem] text-ink/60 normal-case tracking-normal leading-snug">
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
