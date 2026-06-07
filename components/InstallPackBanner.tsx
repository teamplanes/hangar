"use client";

import { useState } from "react";
import { type Discipline, DISCIPLINE_LABEL } from "@/lib/skills-types";
import { CARD_BG, CARD_INK, SWATCH_CLASS } from "@/components/disciplineStyles";

export function InstallPackBanner({
  discipline,
  packCount,
}: {
  discipline: Discipline;
  packCount: number;
}) {
  const packName = `hangar-${discipline}@planes-hangar`;
  const marketplaceCmd = "claude plugin marketplace add teamplanes/hangar";
  const installCmd = `claude plugin install ${packName}`;

  const [copiedMarket, setCopiedMarket] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  function copy(text: string, which: "market" | "install") {
    navigator.clipboard.writeText(text);
    if (which === "market") {
      setCopiedMarket(true);
      setTimeout(() => setCopiedMarket(false), 2000);
    } else {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  }

  // just-for-fun has no pack
  if (discipline === "just-for-fun") return null;

  return (
    <section
      className={`border border-ink ${CARD_BG[discipline]} ${CARD_INK[discipline]}`}
    >
      <div className="px-8 sm:px-12 lg:px-16 py-8 grid md:grid-cols-[1fr_auto] gap-8 items-start">
        {/* Left: info */}
        <div>
          <div className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] opacity-80">
            <span
              className={`inline-block w-2.5 h-2.5 border border-current ${SWATCH_CLASS[discipline]}`}
              aria-hidden
            />
            Claude Code Bay Pack
          </div>
          <h2 className="mt-2 text-[1.6rem] sm:text-[2rem] leading-tight font-black tracking-tight">
            {DISCIPLINE_LABEL[discipline]}{" "}
            <span className="serif-italic font-normal italic">Bay Pack</span>
          </h2>
          <p className="mt-1.5 text-[0.95rem] opacity-80 max-w-prose">
            {packCount} curated skill{packCount === 1 ? "" : "s"} from this bay,
            ready to install into Claude Code.
          </p>
        </div>

        {/* Right: commands */}
        <div className="flex flex-col gap-3 min-w-0 w-full md:w-auto">
          <CmdLine
            label="1. Add marketplace"
            cmd={marketplaceCmd}
            copied={copiedMarket}
            onCopy={() => copy(marketplaceCmd, "market")}
          />
          <CmdLine
            label="2. Install pack"
            cmd={installCmd}
            copied={copiedInstall}
            onCopy={() => copy(installCmd, "install")}
          />
        </div>
      </div>
    </section>
  );
}

function CmdLine({
  label,
  cmd,
  copied,
  onCopy,
}: {
  label: string;
  cmd: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-70 mb-1">
        {label}
      </div>
      <button
        onClick={onCopy}
        className="group flex items-center gap-3 border border-current bg-ink/10 hover:bg-ink/20 px-4 py-2.5 text-left transition-colors w-full"
        title="Click to copy"
      >
        <code className="font-mono text-[0.78rem] leading-snug flex-1 truncate">
          {cmd}
        </code>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-70 shrink-0">
          {copied ? "copied ✓" : "copy"}
        </span>
      </button>
    </div>
  );
}
