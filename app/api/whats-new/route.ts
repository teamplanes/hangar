import { NextResponse } from "next/server";
import { allSkills, DISCIPLINE_LABEL } from "@/lib/skills";

// Public feed of recently-added skills, so the /whats-new skill (and anything
// else) can present a rundown of what's new on The Hangar.
export async function GET() {
  const recent = [...allSkills()]
    .filter((s) => s.added_on)
    .sort((a, b) => (b.added_on ?? "").localeCompare(a.added_on ?? ""))
    .slice(0, 25)
    .map((s) => ({
      title: s.title,
      bay: DISCIPLINE_LABEL[s.discipline],
      discipline: s.discipline,
      added_on: s.added_on,
      summary: s.summary ?? "",
      in_plugin: s.pack === true,
      install: s.pack === true ? `hangar-${s.discipline}@planes-hangar` : null,
      command: s.pack === true ? `/hangar-${s.discipline}:${s.slug[s.slug.length - 1]}` : null,
      url: `https://planes-hangar.vercel.app${s.href}`,
    }));

  return NextResponse.json(
    { updated: recent[0]?.added_on ?? null, count: recent.length, skills: recent },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}
