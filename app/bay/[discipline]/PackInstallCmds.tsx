"use client";

import { useState } from "react";
import type { Discipline } from "@/lib/skills-types";

export function PackInstallCmds({ discipline }: { discipline: Discipline }) {
  const marketplaceCmd = "claude plugin marketplace add teamplanes/hangar";
  const installCmd = `claude plugin install hangar-${discipline}@planes-hangar`;
  const updateCmd = "/plugin";

  const [copied, setCopied] = useState<"market" | "install" | "update" | null>(null);

  function copy(text: string, which: "market" | "install" | "update") {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="flex flex-col gap-2.5 w-full lg:w-auto lg:min-w-[340px]">
      <CmdLine
        label="1. Add The Hangar marketplace"
        cmd={marketplaceCmd}
        copied={copied === "market"}
        onCopy={() => copy(marketplaceCmd, "market")}
      />
      <CmdLine
        label="2. Install this plugin"
        cmd={installCmd}
        copied={copied === "install"}
        onCopy={() => copy(installCmd, "install")}
      />
      <CmdLine
        label="3. Turn on auto-update, so new skills arrive automatically"
        cmd={updateCmd}
        copied={copied === "update"}
        onCopy={() => copy(updateCmd, "update")}
      />
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink/45 leading-relaxed">
        In <span className="text-ink/70">/plugin</span> &rarr; Marketplaces &rarr; planes-hangar &rarr; enable auto-update. Then run{" "}
        <span className="text-ink/70">/hangar-general:whats-new</span> to see what landed.
      </p>
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
