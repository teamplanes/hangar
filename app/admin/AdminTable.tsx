"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DISCIPLINE_LABEL,
  SPICE_ORDER,
  type Discipline,
  type SkillType,
  type SkillStatus,
  type Spice,
} from "@/lib/skills-types";
import { SpiceChip } from "@/components/SpiceMeter";
import { BaySelector } from "./BaySelector";
import { PluginToggle } from "./PluginToggle";
import { EditSkill, type EditFields } from "./EditSkill";

export type AdminRow = {
  slug: string[];
  title: string;
  href: string;
  discipline: Discipline;
  type: SkillType;
  spice?: Spice;
  sourceKind: "original" | "adapted" | "curated";
  sourceLabel: string;
  sourceUrl?: string;
  sourceCredit?: string;
  addedOn?: string;
  addedBy?: string;
  status?: SkillStatus;
  inPlugin: boolean;
  summary?: string;
  tags: string[];
  spotlightNote?: string;
  body: string;
};

type SortKey = "title" | "discipline" | "addedOn" | "type" | "spice" | "sourceLabel";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso?: string): string {
  if (!iso) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1] ?? mo;
  return `${Number(d)} ${month} ${y}`;
}

function compare(a: AdminRow, b: AdminRow, key: SortKey): number {
  switch (key) {
    case "title":
      return a.title.localeCompare(b.title);
    case "discipline":
      return DISCIPLINE_LABEL[a.discipline].localeCompare(
        DISCIPLINE_LABEL[b.discipline],
      );
    case "addedOn":
      return (a.addedOn ?? "").localeCompare(b.addedOn ?? "");
    case "type":
      return a.type.localeCompare(b.type);
    case "spice":
      return (
        (a.spice ? SPICE_ORDER.indexOf(a.spice) : -1) -
        (b.spice ? SPICE_ORDER.indexOf(b.spice) : -1)
      );
    case "sourceLabel":
      return a.sourceLabel.localeCompare(b.sourceLabel);
  }
}

export function AdminTable({ rows: initialRows }: { rows: AdminRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [sortKey, setSortKey] = useState<SortKey>("addedOn");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const out = [...rows].sort((a, b) => compare(a, b, sortKey));
    return dir === "asc" ? out : out.reverse();
  }, [rows, sortKey, dir]);

  function toggle(key: SortKey) {
    if (key === sortKey) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDir(key === "addedOn" ? "desc" : "asc");
    }
  }

  function onSaved(slug: string[], f: EditFields) {
    setRows((prev) =>
      prev.map((r) =>
        r.slug.join("/") === slug.join("/")
          ? {
              ...r,
              title: f.title || r.title,
              summary: f.summary,
              tags: f.tags,
              spice: (f.spice || undefined) as Spice | undefined,
              status: (f.status || undefined) as SkillStatus | undefined,
              sourceKind: f.sourceKind as AdminRow["sourceKind"],
              sourceUrl: f.sourceUrl,
              sourceCredit: f.sourceCredit,
              spotlightNote: f.spotlight_note,
              body: f.body,
            }
          : r,
      ),
    );
  }

  return (
    <div className="border border-ink overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink bg-ink text-cream">
              <SortableTh label="Skill" col="title" {...{ sortKey, dir, toggle }} />
              <Th label="Bay" className="w-[220px]" />
              <Th label="In plugin" className="w-[150px]" />
              <SortableTh
                label="Added"
                col="addedOn"
                className="hidden sm:table-cell w-[130px]"
                {...{ sortKey, dir, toggle }}
              />
              <SortableTh
                label="Type"
                col="type"
                className="hidden md:table-cell"
                {...{ sortKey, dir, toggle }}
              />
              <SortableTh
                label="Spice"
                col="spice"
                className="hidden md:table-cell"
                {...{ sortKey, dir, toggle }}
              />
              <SortableTh
                label="Source"
                col="sourceLabel"
                className="hidden lg:table-cell"
                {...{ sortKey, dir, toggle }}
              />
              <Th label="" className="w-[60px]" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr
                key={s.slug.join("/")}
                className={`border-b border-ink/20 hover:bg-cream-deep transition-colors ${i % 2 === 0 ? "" : "bg-cream/60"}`}
              >
                <td className="px-4 py-2.5">
                  <Link
                    href={s.href}
                    className="font-medium hover:text-coral transition-colors"
                    target="_blank"
                  >
                    {s.title}
                  </Link>
                  <div className="font-mono text-[0.65rem] text-ink/40 mt-0.5">
                    {s.slug.join("/")}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <BaySelector slug={s.slug} currentDiscipline={s.discipline} />
                </td>
                <td className="px-4 py-2.5">
                  <PluginToggle slug={s.slug} inPlugin={s.inPlugin} />
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell whitespace-nowrap font-mono text-[0.72rem] text-ink/70">
                  {formatDate(s.addedOn)}
                  {s.addedBy ? (
                    <span className="block text-[0.62rem] text-ink/40">
                      @{s.addedBy}
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink/60">
                    {s.type}
                  </span>
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell">
                  {s.spice ? (
                    <SpiceChip spice={s.spice} />
                  ) : (
                    <span className="text-ink/30">-</span>
                  )}
                </td>
                <td className="px-4 py-2.5 hidden lg:table-cell">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/60">
                    {s.sourceLabel}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <EditSkill row={s} onSaved={(f) => onSaved(s.slug, f)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-ink/20 bg-cream font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/50">
        {rows.length} skills total
      </div>
    </div>
  );
}

function Th({ label, className = "" }: { label: string; className?: string }) {
  return (
    <th
      className={`text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal ${className}`}
    >
      {label}
    </th>
  );
}

function SortableTh({
  label,
  col,
  className = "",
  sortKey,
  dir,
  toggle,
}: {
  label: string;
  col: SortKey;
  className?: string;
  sortKey: SortKey;
  dir: "asc" | "desc";
  toggle: (k: SortKey) => void;
}) {
  const active = sortKey === col;
  return (
    <th
      className={`text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal ${className}`}
    >
      <button
        type="button"
        onClick={() => toggle(col)}
        className="inline-flex items-center gap-1.5 hover:text-butter transition-colors"
      >
        {label}
        <span className={active ? "opacity-100" : "opacity-30"}>
          {active ? (dir === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
    </th>
  );
}
