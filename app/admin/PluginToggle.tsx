"use client";

import { useState } from "react";

export function PluginToggle({
  slug,
  inPlugin: initial,
}: {
  slug: string[];
  inPlugin: boolean;
}) {
  const [inPlugin, setInPlugin] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function toggle() {
    if (status === "saving") return;
    const next = !inPlugin;
    setStatus("saving");
    try {
      const res = await fetch("/api/toggle-plugin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, inPlugin: next }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setInPlugin(next);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={inPlugin}
        onClick={toggle}
        disabled={status === "saving"}
        className={[
          "relative inline-flex h-5 w-9 flex-shrink-0 items-center border border-ink transition-colors",
          inPlugin ? "bg-mint" : "bg-cream-deep",
          status === "saving" ? "opacity-60" : "cursor-pointer",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-3.5 w-3.5 bg-ink transition-transform",
            inPlugin ? "translate-x-[1.05rem]" : "translate-x-[0.15rem]",
          ].join(" ")}
          aria-hidden
        />
      </button>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/60 w-20">
        {status === "saving"
          ? "saving…"
          : status === "saved"
            ? "synced ✓"
            : status === "error"
              ? "error"
              : inPlugin
                ? "in plugin"
                : "bay only"}
      </span>
    </div>
  );
}
