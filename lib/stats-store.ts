import "server-only";
import { Redis } from "@upstash/redis";

// Real per-skill engagement counters, backed by Upstash Redis (sorted sets,
// ideal for leaderboards). Graceful: if the env isn't configured, everything
// no-ops and the board shows zeros, no crashes. Connect Upstash via the Vercel
// Marketplace and set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.

// Accept whichever names the integration provisions (native Upstash uses
// UPSTASH_REDIS_REST_*, the Vercel KV/marketplace flavour uses KV_REST_API_*).
function creds(): { url?: string; token?: string } {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
  };
}

let client: Redis | null = null;
function redis(): Redis | null {
  if (client) return client;
  const { url, token } = creds();
  if (!url || !token) return null;
  client = new Redis({ url, token });
  return client;
}

export function statsConfigured(): boolean {
  const { url, token } = creds();
  return !!(url && token);
}

export type StatEvent = "copy" | "view";

// ISO-ish year+week bucket so "this week" is real, resets weekly.
function weekKey(): string {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}w${week}`;
}

function zsetAll(event: StatEvent) {
  return event === "copy" ? "z:copies:all" : "z:views:all";
}
function zsetWeek(event: StatEvent) {
  return `${event === "copy" ? "z:copies" : "z:views"}:${weekKey()}`;
}

export async function track(event: StatEvent, slug: string): Promise<void> {
  const r = redis();
  if (!r) return;
  await Promise.all([
    r.zincrby(zsetAll(event), 1, slug),
    r.zincrby(zsetWeek(event), 1, slug),
  ]);
}

export type SkillStats = {
  copies: number;
  views: number;
  copiesWeek: number;
  viewsWeek: number;
};

function toMap(pairs: Record<string, number>): Map<string, number> {
  return new Map(Object.entries(pairs));
}

// Reads all four sorted sets and returns a slug -> stats map.
export async function getStats(): Promise<Map<string, SkillStats>> {
  const r = redis();
  const out = new Map<string, SkillStats>();
  if (!r) return out;

  async function read(key: string): Promise<Map<string, number>> {
    // withScores returns [member, score, member, score, ...]
    const flat = (await r!.zrange(key, 0, -1, { withScores: true })) as (string | number)[];
    const m = new Map<string, number>();
    for (let i = 0; i < flat.length; i += 2) {
      m.set(String(flat[i]), Number(flat[i + 1]));
    }
    return m;
  }

  const [copies, views, copiesWeek, viewsWeek] = await Promise.all([
    read(zsetAll("copy")),
    read(zsetAll("view")),
    read(zsetWeek("copy")),
    read(zsetWeek("view")),
  ]);

  const slugs = new Set([
    ...copies.keys(),
    ...views.keys(),
    ...copiesWeek.keys(),
    ...viewsWeek.keys(),
  ]);
  for (const slug of slugs) {
    out.set(slug, {
      copies: copies.get(slug) ?? 0,
      views: views.get(slug) ?? 0,
      copiesWeek: copiesWeek.get(slug) ?? 0,
      viewsWeek: viewsWeek.get(slug) ?? 0,
    });
  }
  return out;
}

// Single-skill read for the detail-page rail (4 ZSCOREs).
export async function getSkillStats(slug: string): Promise<SkillStats> {
  const r = redis();
  if (!r) return { copies: 0, views: 0, copiesWeek: 0, viewsWeek: 0 };
  const [copies, views, copiesWeek, viewsWeek] = await Promise.all([
    r.zscore(zsetAll("copy"), slug),
    r.zscore(zsetAll("view"), slug),
    r.zscore(zsetWeek("copy"), slug),
    r.zscore(zsetWeek("view"), slug),
  ]);
  return {
    copies: Number(copies ?? 0),
    views: Number(views ?? 0),
    copiesWeek: Number(copiesWeek ?? 0),
    viewsWeek: Number(viewsWeek ?? 0),
  };
}

export { toMap };
