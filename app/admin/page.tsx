import Link from "next/link";
import { allSkills, DISCIPLINE_LABEL } from "@/lib/skills";
import { BaySelector } from "./BaySelector";
import { PluginToggle } from "./PluginToggle";
import { AdminLogin } from "./AdminLogin";
import { SignOut } from "./SignOut";
import { SpiceChip } from "@/components/SpiceMeter";
import { isAdmin, adminConfigured } from "@/lib/admin-auth";

export const metadata = { title: "Admin · The Hangar" };

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={adminConfigured()} />;
  }

  const skills = allSkills();

  const byDiscipline = Object.groupBy(skills, (s) => s.discipline);

  return (
    <div className="space-y-10">
      <div>
        <div className="label mb-2">Admin</div>
        <h1 className="text-[2rem] font-black tracking-tight">
          Curation
        </h1>
        <p className="mt-2 text-ink/70 text-sm max-w-prose">
          Set a skill&apos;s bay and whether it&apos;s in that bay&apos;s installable plugin. Each change commits straight to the repo and goes live in about a minute; the installable plugins re-sync automatically.{" "}
          <SignOut />
        </p>
      </div>

      <div className="border border-ink overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink bg-ink text-cream">
              <th className="text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal">Skill</th>
              <th className="text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal w-[220px]">Bay</th>
              <th className="text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal w-[180px]">In plugin</th>
              <th className="text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal hidden sm:table-cell">Type</th>
              <th className="text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal hidden md:table-cell">Spice</th>
              <th className="text-left px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] font-normal hidden lg:table-cell">Source</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s, i) => (
              <tr
                key={s.slug.join("/")}
                className={`border-b border-ink/20 hover:bg-cream-deep transition-colors ${i % 2 === 0 ? "" : "bg-cream/60"}`}
              >
                <td className="px-4 py-2.5">
                  <Link
                    href={s.href}
                    className="font-medium hover:text-coral transition-colors"
                    target="_blank"
                  >
                    {s.title}
                  </Link>
                  <div className="font-mono text-[0.65rem] text-ink/40 mt-0.5">
                    {s.slug.join("/")}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <BaySelector slug={s.slug} currentDiscipline={s.discipline} />
                </td>
                <td className="px-4 py-2.5">
                  <PluginToggle slug={s.slug} inPlugin={s.pack === true} />
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink/60">
                    {s.type}
                  </span>
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell">
                  {s.spice ? <SpiceChip spice={s.spice} /> : <span className="text-ink/30">-</span>}
                </td>
                <td className="px-4 py-2.5 hidden lg:table-cell">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/50">
                    {s.source?.kind ?? "original"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-ink/20 bg-cream font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/50">
          {skills.length} skills total
        </div>
      </div>
    </div>
  );
}
