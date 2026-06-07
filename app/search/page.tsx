import { allSkills } from "@/lib/skills";
import { SearchClient } from "@/components/SearchClient";

export const metadata = { title: "Search · The Hangar" };

export default function SearchPage() {
  const skills = allSkills();
  return (
    <div className="space-y-10">
      <header className="max-w-prose">
        <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
          Catalogue
        </div>
        <h1 className="mt-3 text-[2.5rem] sm:text-[3rem] leading-[0.98] font-black tracking-tight">
          Find a <span className="serif-italic font-normal">specific</span> skill.
        </h1>
        <p className="mt-3 text-ink/75">
          Live filter across every bay. Search title, tag, body, even the
          credited author.
        </p>
      </header>
      <SearchClient skills={skills} />
    </div>
  );
}
