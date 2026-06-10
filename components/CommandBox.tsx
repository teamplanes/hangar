"use client";

import { useState } from "react";

// The copyable command box used on bay pages, reused wherever we show a
// command for people to paste into their own Claude. Single-line by default;
// pass multiline for blocks like a settings.json snippet.
export function CommandBox({
  label,
  cmd,
  multiline = false,
}: {
  label?: string;
  cmd: string;
  multiline?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      {label ? (
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/60 mb-1">
          {label}
        </div>
      ) : null}
      <button
        onClick={copy}
        title="Click to copy"
        className={[
          "group flex w-full gap-3 border border-ink/30 bg-ink/8 hover:bg-ink/15 px-4 py-2.5 text-left transition-colors",
          multiline ? "items-start" : "items-center",
        ].join(" ")}
      >
        {multiline ? (
          <pre className="font-mono text-[0.75rem] leading-relaxed flex-1 min-w-0 whitespace-pre overflow-x-auto text-ink">
            {cmd}
          </pre>
        ) : (
          <code className="font-mono text-[0.78rem] leading-snug flex-1 truncate text-ink">
            {cmd}
          </code>
        )}
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55 shrink-0 pt-px">
          {copied ? "copied ✓" : "copy"}
        </span>
      </button>
    </div>
  );
}
