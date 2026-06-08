import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { DISCIPLINES } from "@/lib/skills-types";
import { isAdminRequest } from "@/lib/admin-auth";
import { getFile, putFile, deleteFile, githubConfigured } from "@/lib/github-write";

// Hosted, admin-only. Moves a skill to a new bay by committing the new file
// and deleting the old one on main. The GitHub Action re-syncs plugins.
export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Not signed in as admin." }, { status: 401 });
  }
  if (!githubConfigured()) {
    return NextResponse.json({ error: "GITHUB_TOKEN not configured." }, { status: 503 });
  }

  const { slug, newDiscipline } = (await req.json()) as {
    slug: string[];
    newDiscipline: string;
  };

  if (!DISCIPLINES.includes(newDiscipline as never)) {
    return NextResponse.json({ error: "Invalid discipline" }, { status: 400 });
  }

  const oldPath = `skills/${slug.join("/")}.md`;
  const basename = slug.slice(1).join("/");
  const newSlug = [newDiscipline, ...slug.slice(1)];
  const newPath = `skills/${newDiscipline}/${basename}.md`;

  if (oldPath === newPath) {
    return NextResponse.json({ ok: true, newSlug });
  }

  try {
    const { content, sha } = await getFile(oldPath);
    const { data, content: body } = matter(content);
    data.discipline = newDiscipline;
    await putFile(newPath, matter.stringify(body, data), `chore(curation): move ${basename} to ${newDiscipline} bay`);
    await deleteFile(oldPath, `chore(curation): move ${basename} to ${newDiscipline} bay (remove old)`, sha);
    return NextResponse.json({ ok: true, newSlug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
