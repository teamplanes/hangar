"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  SPICE_ORDER,
  SPICE_LABEL,
  type SkillStatus,
} from "@/lib/skills-types";
import type { AdminRow } from "./AdminTable";

const STATUSES: SkillStatus[] = ["draft", "stable", "needs-review"];
const KINDS = [
  { value: "original", label: "Made at Planes" },
  { value: "adapted", label: "Adapted by Planes" },
  { value: "curated", label: "Found & shared" },
];

export type EditFields = {
  title: string;
  summary: string;
  tags: string[];
  spice: string;
  status: string;
  sourceKind: string;
  sourceUrl: string;
  sourceCredit: string;
  spotlight_note: string;
  body: string;
};

export function EditSkill({
  row,
  onSaved,
}: {
  row: AdminRow;
  onSaved: (fields: EditFields) => void;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  const [title, setTitle] = useState(row.title);
  const [summary, setSummary] = useState(row.summary ?? "");
  const [tags, setTags] = useState((row.tags ?? []).join(", "));
  const [spice, setSpice] = useState<string>(row.spice ?? "");
  const [statusField, setStatusField] = useState<string>(row.status ?? "");
  const [sourceKind, setSourceKind] = useState<string>(row.sourceKind ?? "curated");
  const [sourceUrl, setSourceUrl] = useState(row.sourceUrl ?? "");
  const [sourceCredit, setSourceCredit] = useState(row.sourceCredit ?? "");
  const [spotlight, setSpotlight] = useState(row.spotlightNote ?? "");
  const [body, setBody] = useState(row.body);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && status !== "saving") setOpen(false);
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, status]);

  async function save() {
    setStatus("saving");
    setError("");
    const fields: EditFields = {
      title: title.trim(),
      summary: summary.trim(),
      tags: tags
        .split(",")
        .map((t) => t.replace(/^[\s["']+|[\s\]"']+$/g, ""))
        .filter(Boolean),
      spice,
      status: statusField,
      sourceKind,
      sourceUrl: sourceUrl.trim(),
      sourceCredit: sourceCredit.trim(),
      spotlight_note: spotlight.trim(),
      body,
    };
    try {
      const res = await fetch("/api/edit-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: row.slug, fields }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      onSaved(fields);
      setStatus("idle");
      setOpen(false);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/60 hover:text-coral underline decoration-ink/20 underline-offset-4"
      >
        Edit
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 sm:p-6"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget && status !== "saving")
                  setOpen(false);
              }}
            >
              <div className="flex w-full max-w-2xl max-h-[88vh] flex-col border border-ink bg-cream shadow-paper-sm">
                <div className="flex shrink-0 items-center justify-between border-b border-ink px-6 py-4">
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/60">
                  Edit skill
                </div>
                <div className="font-black text-lg tracking-tight leading-tight">
                  {row.title}
                </div>
                <div className="font-mono text-[0.62rem] text-ink/40">
                  {row.slug.join("/")}
                </div>
              </div>
              <button
                type="button"
                onClick={() => status !== "saving" && setOpen(false)}
                className="font-mono text-sm text-ink/60 hover:text-ink"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-paper"
                />
              </Field>

              <Field label="Summary  (one line, shown on cards)">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  className="input-paper resize-y"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Spice">
                  <select
                    value={spice}
                    onChange={(e) => setSpice(e.target.value)}
                    className="input-paper"
                  >
                    <option value="">— none —</option>
                    {SPICE_ORDER.map((sp) => (
                      <option key={sp} value={sp}>
                        {SPICE_LABEL[sp]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    value={statusField}
                    onChange={(e) => setStatusField(e.target.value)}
                    className="input-paper"
                  >
                    <option value="">— none —</option>
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Tags  (comma-separated)">
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="briefs, kickoff, client"
                  className="input-paper"
                />
              </Field>

              <div className="grid sm:grid-cols-3 gap-5">
                <Field label="Source">
                  <select
                    value={sourceKind}
                    onChange={(e) => setSourceKind(e.target.value)}
                    className="input-paper"
                  >
                    {KINDS.map((k) => (
                      <option key={k.value} value={k.value}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Source URL">
                  <input
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://…"
                    className="input-paper"
                  />
                </Field>
                <Field label="Credit">
                  <input
                    value={sourceCredit}
                    onChange={(e) => setSourceCredit(e.target.value)}
                    placeholder="@author"
                    className="input-paper"
                  />
                </Field>
              </div>

              <Field label="Spotlight note  (why this, why now)">
                <textarea
                  value={spotlight}
                  onChange={(e) => setSpotlight(e.target.value)}
                  rows={2}
                  className="input-paper resize-y"
                />
              </Field>

              <Field label="Body  (everything below the frontmatter)">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className="input-paper resize-y font-mono text-[13px]"
                />
              </Field>

              {status === "error" ? (
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-coral">
                  {error}
                </p>
              ) : null}
            </div>

                <div className="flex shrink-0 items-center justify-end gap-3 border-t border-ink px-6 py-4">
                  <button
                    type="button"
                    onClick={() => status !== "saving" && setOpen(false)}
                    className="btn-ghost text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    disabled={status === "saving" || !title.trim()}
                    className="btn-ink disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "saving" ? "Saving…" : "Save changes →"}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70 mb-2">
        {label}
      </div>
      {children}
    </label>
  );
}
