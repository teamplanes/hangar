"use client";

import { useEffect, useState } from "react";

type Stats = { copies: number; views: number; copiesWeek: number; viewsWeek: number };

export function LiveStatTiles({ slug }: { slug: string }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`/api/track?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .catch(() => {});
  }, [slug]);

  return (
    <>
      <Tile
        label="Copies"
        value={stats ? String(stats.copies) : "—"}
        unit={stats ? `${stats.copiesWeek} this week` : "loading…"}
      />
      <Tile
        label="Views"
        value={stats ? String(stats.views) : "—"}
        unit={stats ? `${stats.viewsWeek} this week` : "loading…"}
      />
    </>
  );
}

function Tile({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-cream p-5">
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/70">
        {label}
      </div>
      <div className="mt-2 text-[2.5rem] leading-none font-black tabular-nums">{value}</div>
      <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink/70">
        {unit}
      </div>
    </div>
  );
}
