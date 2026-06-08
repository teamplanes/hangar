import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { isAdminRequest } from "@/lib/admin-auth";
import { getFile, putFile, githubConfigured } from "@/lib/github-write";

// Hosted, admin-only. Commits the pack flag change straight to main in
// teamplanes/hangar. A GitHub Action regenerates the installable plugin
// folders on push, so the marketplace stays in sync.
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Not signed in as admin." }, { status: 401 });
  }
  if (!githubConfigured()) {
    return NextResponse.json({ error: "GITHUB_TOKEN not configured." }, { status: 503 });
  }

  const { slug, inPlugin } = (await req.json()) as { slug: string[]; inPlugin: boolean };
  const path = `skills/${slug.join("/")}.md`;

  try {
    const { content, sha } = await getFile(path);
    const { data, content: body } = matter(content);

    if (inPlugin) data.pack = true;
    else delete data.pack;

    const updated = matter.stringify(body, data);
    await putFile(
      path,
      updated,
      `chore(curation): ${slug.join("/")} ${inPlugin ? "added to" : "removed from"} its plugin`,
      sha,
    );
    return NextResponse.json({ ok: true, inPlugin });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
