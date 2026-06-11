import { allSkills } from "@/lib/skills";
import { AdminLogin } from "./AdminLogin";
import { SignOut } from "./SignOut";
import { AdminTable, type AdminRow } from "./AdminTable";
import { provenanceMeta } from "@/components/Provenance";
import { isAdmin, adminConfigured } from "@/lib/admin-auth";

export const metadata = { title: "Admin · The Hangar" };

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={adminConfigured()} />;
  }

  const skills = allSkills();

  const rows: AdminRow[] = skills.map((s) => ({
    slug: s.slug,
    title: s.title,
    href: s.href,
    discipline: s.discipline,
    type: s.type,
    spice: s.spice,
    sourceKind: s.source?.kind ?? "curated",
    sourceLabel: provenanceMeta(s).label,
    sourceUrl: s.source?.url,
    sourceCredit: s.source?.credit,
    addedOn: s.added_on,
    addedBy: s.added_by,
    status: s.status,
    inPlugin: s.pack === true,
    summary: s.summary,
    tags: s.tags ?? [],
    spotlightNote: s.spotlight_note,
    body: s.body,
  }));

  return (
    <div className="space-y-10">
      <div>
        <div className="label mb-2">Admin</div>
        <h1 className="text-[2rem] font-black tracking-tight">
          Curation
        </h1>
        <p className="mt-2 text-ink/70 text-sm max-w-prose">
          Set a skill&apos;s bay, plugin membership, or edit its contents. Click a column heading to sort. Each change commits straight to the repo and goes live in about a minute; the installable plugins re-sync automatically.{" "}
          <SignOut />
        </p>
      </div>

      <AdminTable rows={rows} />
    </div>
  );
}
