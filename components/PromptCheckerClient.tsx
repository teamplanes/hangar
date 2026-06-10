"use client";

import { useMemo, useState } from "react";
import { checkPrompt } from "@/lib/good-bad";

export function PromptCheckerClient() {
  const [text, setText] = useState("");
  const checks = useMemo(() => checkPrompt(text), [text]);
  const passed = checks.filter((c) => c.passed).length;
  const total = checks.length;
  const score = text.trim() ? Math.round((passed / total) * 100) : 0;

  const verdict = !text.trim()
    ? "Paste a prompt to see what's missing."
    : score >= 100
      ? "Tight. This gives Claude what it needs."
      : score >= 75
        ? "Strong. One more detail would sharpen it."
        : score >= 50
          ? "Workable. Add what's missing for a better answer."
          : "Thin. Claude will have to fill the gaps itself.";

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
      <div>
        <label className="block">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 mb-2">
            Paste your prompt
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="e.g. Write me a summary of this article..."
            className="input-paper resize-y font-mono text-[13px] w-full"
          />
        </label>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/60">
            {text.trim().split(/\s+/).filter(Boolean).length} words
          </span>
          <button
            type="button"
            onClick={() => setText("")}
            disabled={!text}
            className="text-sm text-ink/65 hover:text-ink underline decoration-ink/20 underline-offset-4 disabled:opacity-40 disabled:no-underline"
          >
            Clear
          </button>
        </div>
      </div>

      <aside className="border border-ink bg-cream p-6">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
          Score
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <div className="text-[3rem] leading-none font-black tabular-nums">
            {score}
          </div>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink/70">
            /100 · {passed} of {total} checks
          </div>
        </div>
        <div className="mt-3 serif-italic text-[1.05rem] leading-snug text-ink">
          {verdict}
        </div>

        <ul className="mt-5 divide-y divide-ink/15">
          {checks.map((c) => (
            <li
              key={c.key}
              className="py-3 flex items-start gap-3"
            >
              <span
                className={[
                  "mt-0.5 inline-flex items-center justify-center w-5 h-5 border border-ink font-mono text-[0.75rem]",
                  c.passed ? "bg-mint" : "bg-cream",
                ].join(" ")}
                aria-hidden
              >
                {c.passed ? "✓" : ""}
              </span>
              <div>
                <div className="font-medium leading-snug">{c.label}</div>
                <div className="text-sm text-ink/70 mt-0.5">{c.hint}</div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55 leading-relaxed">
          A quick rule-of-thumb check, not an AI call. It catches the obvious gaps but can't read your pasted material the way Claude will. Treat it as a nudge, then let Claude do the rest.
        </p>
      </aside>
    </div>
  );
}
