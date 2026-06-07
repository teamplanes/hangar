"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
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
