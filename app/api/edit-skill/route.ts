import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { isAdminRequest } from "@/lib/admin-auth";
import { getFile, putFile, githubConfigured } from "@/lib/github-write";

// Hosted, admin-only. Edits a skill's frontmatter and body in place and commits
// to main. The slug (and therefore the file path and URL) is left untouched so
// existing links don't break; only the contents change.
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Not signed in as admin." }, { status: 401 });
  }
  if (!githubConfigured()) {
    return NextResponse.json({ error: "GITHUB_TOKEN not configured." }, { status: 503 });
  }

  const { slug, fields } = (await req.json()) as {
    slug: string[];
    fields: Record<string, unknown>;
  };

  if (!Array.isArray(slug) || slug.length < 2) {
    return NextResponse.json({ error: "Bad slug" }, { status: 400 });
  }

  const path = `skills/${slug.join("/")}.md`;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  try {
    const { content, sha } = await getFile(path);
    const parsed = matter(content);
    const data = parsed.data as Record<string, unknown>;

    const set = (key: string, val: string) => {
      if (val) data[key] = val;
      else delete data[key];
    };

    if (str(fields.title)) data.title = str(fields.title);
    set("summary", str(fields.summary));
    set("spotlight_note", str(fields.spotlight_note));
    set("spice", str(fields.spice));
    set("status", str(fields.status));

    if (Array.isArray(fields.tags)) {
      const tags = (fields.tags as unknown[])
        .map((t) => String(t).trim())
        .filter(Boolean);
      if (tags.length) data.tags = tags;
      else delete data.tags;
    }

    const kind = str(fields.sourceKind);
    if (kind) {
      const source: Record<string, string> = { kind };
      if (str(fields.sourceUrl)) source.url = str(fields.sourceUrl);
      if (str(fields.sourceCredit)) source.credit = str(fields.sourceCredit);
      data.source = source;
    }

    const body =
      typeof fields.body === "string" ? fields.body.trim() : parsed.content.trim();
    const updated = matter.stringify(body + "\n", data);

    await putFile(
      path,
      updated,
      `chore(curation): edit ${slug.slice(1).join("/")}`,
      sha,
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
