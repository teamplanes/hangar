"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DISCIPLINES, type Discipline } from "@/lib/skills-types";
import { FindSkillsMenu } from "@/components/FindSkillsMenu";
import { FlightSchoolMenu } from "@/components/FlightSchoolMenu";

type Active = "top-skills" | "find-skills" | "flight-school" | null;

const FLIGHT_PATHS = new Set([
  "/aviators",
  "/airshow",
  "/flight-tips",
  "/on-the-airways",
]);

function activeFromPath(pathname: string | null): Active {
  if (!pathname) return null;
  if (pathname === "/" || pathname.startsWith("/bay/") || pathname.startsWith("/skill/") || pathname.startsWith("/tag/") || pathname === "/search") {
    return "find-skills";
  }
  if (pathname.startsWith("/top-skills") || pathname.startsWith("/cockpit")) return "top-skills";
  if (FLIGHT_PATHS.has(pathname)) return "flight-school";
  return null;
}

export function BayNav() {
  const pathname = usePathname();
  const active = activeFromPath(pathname);

  return (
    <nav className="flex items-center gap-x-5 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
      <Link
        href="/cockpit"
        className={[
          "inline-flex items-center gap-1.5 transition-colors",
          active === "top-skills" ? "text-ink" : "text-ink/55 hover:text-ink",
        ].join(" ")}
      >
        <span className={active === "top-skills" ? "underline decoration-ink underline-offset-[5px]" : ""}>
          The Cockpit
        </span>
      </Link>

      <span className="text-ink/20">·</span>

      <FindSkillsMenu active={active === "find-skills"} />

      <span className="text-ink/20">·</span>

      <FlightSchoolMenu active={active === "flight-school"} />
    </nav>
  );
}
