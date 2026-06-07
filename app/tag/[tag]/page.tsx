import Link from "next/link";
import { allTags, byTag } from "@/lib/skills";
import { SkillCard } from "@/components/SkillCard";

export function generateStaticParams() {
  return allTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const skills = byTag(decoded);

  return (
    <div className="space-y-10">
      <header>
        <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
          Tag
        </div>
        <h1 className="mt-3 text-[2.5rem] sm:text-[3rem] leading-[0.98] font-black tracking-tight">
          <span className="serif-italic font-normal">tagged</span> [{decoded}]
        </h1>
        <p className="mt-3 text-ink/75 font-mono text-sm uppercase tracking-[0.14em]">
          {skills.length} skill{skills.length === 1 ? "" : "s"}
        </p>
      </header>

      {skills.length === 0 ? (
        <div className="border border-dashed border-ink/40 p-12 text-center text-ink/70">
          <p>No skills with this tag.</p>
          <p className="mt-2">
            <Link
              href="/"
              className="underline decoration-ink/30 hover:decoration-coral text-ink"
            >
              Back to the Hangar
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s) => (
            <SkillCard key={s.slug.join("/")} skill={s} />
          ))}
        </div>
      )}
    </div>
  );
}
