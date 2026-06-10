"use client";

import { useMemo, useState } from "react";
import {
  DISCIPLINES,
  DISCIPLINE_LABEL,
  type Discipline,
  type SkillType,
  type SkillStatus,
} from "@/lib/skills-types";
import { GITHUB_NEW_FILE_BASE } from "@/lib/config";

type FormState = {
  title: string;
  discipline: Discipline;
  type: SkillType;
  tags: string;
  added_by: string;
  status: SkillStatus;
  sourceKind: "original" | "curated";
  sourceUrl: string;
  sourceCredit: string;
  whatItDoes: string;
  whenToUse: string;
  body: string;
  notes: string;
};

const TYPES: SkillType[] = ["prompt", "skill", "recipe"];
const STATUSES: SkillStatus[] = ["draft", "stable"];

const initial: FormState = {
  title: "",
  discipline: "general",
  type: "prompt",
  tags: "",
  added_by: "",
  status: "draft",
  sourceKind: "original",
  sourceUrl: "",
  sourceCredit: "",
  whatItDoes: "",
  whenToUse: "",
  body: "",
  notes: "",
};

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "untitled-skill"
  );
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildMarkdown(s: FormState): string {
  const tags = s.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const tagsLine =
    tags.length > 0 ? `[${tags.map((t) => JSON.stringify(t)).join(", ")}]` : "[]";

  const fm: string[] = [
    "---",
    `title: ${JSON.stringify(s.title)}`,
    `discipline: ${s.discipline}`,
    `type: ${s.type}`,
    `tags: ${tagsLine}`,
    `added_by: ${s.added_by || "unknown"}`,
    `added_on: ${todayISO()}`,
    `status: ${s.status}`,
    `source:`,
    `  kind: ${s.sourceKind}`,
  ];
  if (s.sourceKind === "curated") {
    fm.push(`  url: ${JSON.stringify(s.sourceUrl)}`);
    fm.push(`  credit: ${JSON.stringify(s.sourceCredit)}`);
  }
  fm.push("---", "");

  const sections: string[] = [];
  if (s.whatItDoes.trim())
    sections.push("## What it does\n\n" + s.whatItDoes.trim());
  if (s.whenToUse.trim())
    sections.push("## When to use\n\n" + s.whenToUse.trim());
  sections.push("## The skill\n\n" + s.body.trim());
  if (s.notes.trim()) sections.push("## Notes\n\n" + s.notes.trim());

  return fm.join("\n") + sections.join("\n\n") + "\n";
}

function buildGithubUrl(s: FormState, markdown: string): string {
  const filename = `skills/${s.discipline}/${slugify(s.title)}.md`;
  const url = new URL(GITHUB_NEW_FILE_BASE);
  url.searchParams.set("filename", filename);
  url.searchParams.set("value", markdown);
  return url.toString();
}

export function AddSkillForm() {
  const [s, setS] = useState<FormState>(initial);
  const [showPreview, setShowPreview] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!s.title.trim()) e.title = "Required";
    if (!s.body.trim())
      e.body = "Required. Paste the prompt or skill body";
    if (s.sourceKind === "curated") {
      if (!s.sourceUrl.trim()) e.sourceUrl = "Required for curated";
      if (!s.sourceCredit.trim()) e.sourceCredit = "Required for curated";
    }
    return e;
  }, [s]);

  const markdown = useMemo(() => buildMarkdown(s), [s]);
  const githubUrl = useMemo(() => buildGithubUrl(s, markdown), [s, markdown]);
  const filename = `skills/${s.discipline}/${slugify(s.title || "untitled-skill")}.md`;
  const canSubmit = Object.keys(errors).length === 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        window.open(githubUrl, "_blank", "noopener,noreferrer");
      }}
      className="grid lg:grid-cols-[1fr_22rem] gap-10"
    >
      {/* MAIN COLUMN */}
      <div className="space-y-10">
        {/* Title input */}
        <FieldBare label="Title" error={errors.title}>
          <input
            value={s.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Writing a tight design brief"
            className="input-bare text-2xl sm:text-[1.75rem] font-semibold tracking-tight"
          />
        </FieldBare>

        {/* Bay / Type / Status as a grid of stark selects */}
        <div className="grid sm:grid-cols-3 gap-6">
          <FieldBlock label="Bay">
            <select
              value={s.discipline}
              onChange={(e) =>
                update("discipline", e.target.value as Discipline)
              }
              className="input-paper"
            >
              {DISCIPLINES.map((d) => (
                <option key={d} value={d}>
                  {DISCIPLINE_LABEL[d]}
                </option>
              ))}
            </select>
          </FieldBlock>
          <FieldBlock label="Type">
            <select
              value={s.type}
              onChange={(e) => update("type", e.target.value as SkillType)}
              className="input-paper"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FieldBlock>
          <FieldBlock label="Status">
            <select
              value={s.status}
              onChange={(e) => update("status", e.target.value as SkillStatus)}
              className="input-paper"
            >
              {STATUSES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FieldBlock>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <FieldBlock label="Tags  (comma-separated)">
            <input
              value={s.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="briefs, kickoff, client"
              className="input-paper"
            />
          </FieldBlock>
          <FieldBlock label="Added by  (@handle, no @)">
            <input
              value={s.added_by}
              onChange={(e) => update("added_by", e.target.value)}
              placeholder="julian"
              className="input-paper"
            />
          </FieldBlock>
        </div>

        {/* Source */}
        <fieldset className="border border-ink bg-cream p-6 space-y-5">
          <legend className="px-2 -ml-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink">
            Source
          </legend>
          <div className="flex flex-wrap gap-6 text-sm">
            <RadioPill
              label="I wrote this"
              checked={s.sourceKind === "original"}
              onChange={() => update("sourceKind", "original")}
            />
            <RadioPill
              label="I found this elsewhere"
              italic="(curated)"
              checked={s.sourceKind === "curated"}
              onChange={() => update("sourceKind", "curated")}
            />
          </div>
          {s.sourceKind === "curated" ? (
            <div className="grid sm:grid-cols-2 gap-6">
              <FieldBlock label="Original URL" error={errors.sourceUrl}>
                <input
                  value={s.sourceUrl}
                  onChange={(e) => update("sourceUrl", e.target.value)}
                  placeholder="https://…"
                  className="input-paper"
                />
              </FieldBlock>
              <FieldBlock
                label="Credit  (who made it)"
                error={errors.sourceCredit}
              >
                <input
                  value={s.sourceCredit}
                  onChange={(e) => update("sourceCredit", e.target.value)}
                  placeholder="e.g. @simonwillison"
                  className="input-paper"
                />
              </FieldBlock>
            </div>
          ) : null}
        </fieldset>

        {/* Long-form */}
        <FieldBlock label="What it does  (one paragraph)">
          <textarea
            value={s.whatItDoes}
            onChange={(e) => update("whatItDoes", e.target.value)}
            rows={3}
            placeholder="Optional but recommended."
            className="input-paper resize-y"
          />
        </FieldBlock>

        <FieldBlock label="When to use  (one per line, dash to bullet)">
          <textarea
            value={s.whenToUse}
            onChange={(e) => update("whenToUse", e.target.value)}
            rows={3}
            placeholder={"- Starting a new project\n- Writing the first design brief"}
            className="input-paper resize-y"
          />
        </FieldBlock>

        <FieldBlock
          label="The skill body  (prompt, instructions, recipe steps)"
          error={errors.body}
        >
          <textarea
            value={s.body}
            onChange={(e) => update("body", e.target.value)}
            rows={10}
            placeholder="Paste the actual prompt or skill content here."
            className="input-paper resize-y font-mono text-[13px]"
          />
        </FieldBlock>

        <FieldBlock label="Notes  (Planes tweaks, gotchas, why we use this)">
          <textarea
            value={s.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            placeholder="Optional."
            className="input-paper resize-y"
          />
        </FieldBlock>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-ink/20">
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-ink disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Open pre-filled PR on GitHub →
          </button>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="btn-ghost text-sm"
          >
            {showPreview ? "Hide" : "Preview"} markdown
          </button>
          <button
            type="button"
            onClick={() => setS(initial)}
            className="text-sm text-ink/65 hover:text-ink underline decoration-ink/20 underline-offset-4"
          >
            Reset
          </button>
        </div>

        {showPreview ? (
          <pre className="text-[12px] leading-5 p-5 bg-ink text-cream overflow-x-auto whitespace-pre-wrap border border-ink">
            {markdown}
          </pre>
        ) : null}
      </div>

      {/* ASIDE */}
      <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
        <div className="border border-ink bg-cream p-6">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
            What happens on submit
          </div>
          <ol className="mt-3 space-y-2 text-sm text-ink/85">
            <li>
              <span className="font-mono text-xs text-ink/60 mr-2">01</span>
              Opens GitHub's web editor in a new tab.
            </li>
            <li>
              <span className="font-mono text-xs text-ink/60 mr-2">02</span>
              File path and contents come pre-filled. You commit to a branch.
            </li>
            <li>
              <span className="font-mono text-xs text-ink/60 mr-2">03</span>
              GitHub opens the PR. The bay owner reviews and merges.
            </li>
          </ol>
          <div className="mt-4 pt-4 border-t border-ink/15">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/60">
              Will land at
            </div>
            <div className="mt-1 font-mono text-[0.78rem] break-all text-ink">
              {filename}
            </div>
          </div>
        </div>
        <div className="border border-ink bg-butter p-6 text-sm">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/80">
            House rules
          </div>
          <ul className="mt-3 space-y-2">
            <li>
              <span className="serif-italic">Curated</span> means someone else wrote it. Always credit the source.
            </li>
            <li>
              Mark <span className="font-medium">draft</span> until your bay owner blesses it as <span className="font-medium">stable</span>.
            </li>
            <li>
              The same markdown works as a Claude Code skill. Drops straight into a skills directory if we ship a plugin.
            </li>
          </ul>
        </div>
      </aside>
    </form>
  );
}

function FieldBare({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
          {label}
        </span>
        {error ? (
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-coral">
            {error}
          </span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function FieldBlock({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
          {label}
        </span>
        {error ? (
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-coral">
            {error}
          </span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function RadioPill({
  label,
  italic,
  checked,
  onChange,
}: {
  label: string;
  italic?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="appearance-none w-4 h-4 border border-ink checked:bg-ink checked:border-ink rounded-none"
      />
      <span>
        {label}
        {italic ? (
          <span className="serif-italic ml-1.5 text-ink/70">{italic}</span>
        ) : null}
      </span>
    </label>
  );
}
