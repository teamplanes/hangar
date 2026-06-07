import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DISCIPLINES } from "@/lib/skills-types";

export async function POST(req: NextRequest) {
  const { slug, newDiscipline } = (await req.json()) as {
    slug: string[];
    newDiscipline: string;
  };

  if (!DISCIPLINES.includes(newDiscipline as never)) {
    return NextResponse.json({ error: "Invalid discipline" }, { status: 400 });
  }

  const SKILLS_DIR = path.join(process.cwd(), "skills");
  const filename = slug.slice(1).join("/") + ".md";
  const currentPath = path.join(SKILLS_DIR, slug[0], filename);
  const newDir = path.join(SKILLS_DIR, newDiscipline);
  const newPath = path.join(newDir, filename);

  if (!fs.existsSync(currentPath)) {
    return NextResponse.json({ error: "File not found: " + currentPath }, { status: 404 });
  }

  const raw = fs.readFileSync(currentPath, "utf8");
  const { data, content } = matter(raw);
  data.discipline = newDiscipline;

  fs.mkdirSync(newDir, { recursive: true });
  fs.writeFileSync(newPath, matter.stringify(content, data));

  if (currentPath !== newPath) {
    fs.unlinkSync(currentPath);
  }

  return NextResponse.json({ ok: true, newSlug: [newDiscipline, ...slug.slice(1)] });
}
