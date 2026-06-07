"use client";

import { useState } from "react";
import type { Discipline } from "@/lib/skills-types";

export function PackInstallCmds({ discipline }: { discipline: Discipline }) {
  const marketplaceCmd = "claude plugin marketplace add teamplanes/hangar";
  const installCmd = `claude plugin install hangar-${discipline}@planes-hangar`;

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

  return (
    <div className="flex flex-col gap-2.5 w-full lg:w-auto lg:min-w-[340px]">
      <CmdLine
        label="1. Add The Hangar marketplace"
        cmd={marketplaceCmd}
        copied={copiedMarket}
        onCopy={() => copy(marketplaceCmd, "market")}
      />
      <CmdLine
        label="2. Install this pack"
        cmd={installCmd}
        copied={copiedInstall}
        onCopy={() => copy(installCmd, "install")}
      />
    </div>
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
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/60 mb-1">
        {label}
      </div>
      <button
        onClick={onCopy}
        className="group flex items-center gap-3 border border-ink/30 bg-ink/8 hover:bg-ink/15 px-4 py-2.5 text-left transition-colors w-full"
        title="Click to copy"
      >
        <code className="font-mono text-[0.78rem] leading-snug flex-1 truncate text-ink">
          {cmd}
        </code>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/55 shrink-0">
          {copied ? "copied ✓" : "copy"}
        </span>
      </button>
    </div>
  );
}
