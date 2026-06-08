import { NextRequest, NextResponse } from "next/server";
import { track, getSkillStats } from "@/lib/stats-store";

// Read one skill's live stats (for the detail-page rail).
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug || slug.length > 120) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const stats = await getSkillStats(slug);
  return NextResponse.json({ slug, stats });
}

// Public, fire-and-forget engagement counter. No auth: it only increments
// copy/view tallies. Validates shape and caps slug length to avoid abuse.
export async function POST(req: NextRequest) {
  let body: { slug?: string; event?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const event = body.event;
  const slug = body.slug;
  if ((event !== "copy" && event !== "view") || typeof slug !== "string" || !slug || slug.length > 120) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    await track(event, slug);
  } catch {
    // Never let tracking failures surface to the user.
  }
  return NextResponse.json({ ok: true });
}
