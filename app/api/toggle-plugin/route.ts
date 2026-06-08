import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

// Admin-only by construction: writes to the local filesystem, so it only
// works when a maintainer runs the repo locally. On the read-only Vercel
// filesystem this fails, which is the gate.
export async function POST(req: NextRequest) {
  const { slug, inPlugin } = (await req.json()) as {
    slug: string[];
    inPlugin: boolean;
  };

  const SKILLS_DIR = path.join(process.cwd(), "skills");
  const filePath = path.join(SKILLS_DIR, slug.join("/") + ".md");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found: " + filePath }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (inPlugin) {
    data.pack = true;
  } else {
    delete data.pack;
  }

  fs.writeFileSync(filePath, matter.stringify(content, data));

  // Regenerate the installable plugin folders so the marketplace matches.
  try {
    execFileSync("node", ["scripts/sync-plugins.mjs"], { cwd: process.cwd() });
  } catch (e) {
    return NextResponse.json(
      { ok: true, synced: false, warning: "Flag saved but sync-plugins failed: " + String(e) },
      { status: 200 },
    );
  }

  return NextResponse.json({ ok: true, synced: true, inPlugin });
}
