"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  trackSlug,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  trackSlug?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
          if (trackSlug) {
            // fire-and-forget engagement beacon
            fetch("/api/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug: trackSlug, event: "copy" }),
              keepalive: true,
            }).catch(() => {});
          }
        } catch {
          // best-effort
        }
      }}
      className="btn-ghost text-sm"
    >
      <span aria-hidden>{copied ? "✓" : "⧉"}</span>
      {copied ? copiedLabel : label}
    </button>
  );
}
