import Link from "next/link";
import { DashedLoop } from "@/components/DashedLoop";

export default function NotFound() {
  return (
    <div className="relative text-center py-28">
      <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
        404
      </div>
      <h1 className="mt-4 text-[3rem] sm:text-[4rem] leading-[0.98] font-black tracking-tight">
        Nothing in <span className="serif-italic font-normal">this</span> bay.
      </h1>
      <p className="mt-4 text-ink/75">
        The skill you're looking for hasn't been hangared yet.
      </p>
      <div className="mt-8 inline-flex gap-3">
        <Link href="/" className="btn-ink">
          ← Back to the Hangar
        </Link>
        <Link href="/add" className="btn-ghost">
          ＋ Add a new one
        </Link>
      </div>
      <div className="absolute inset-x-0 -bottom-10 flex justify-center text-ink/20 pointer-events-none">
        <DashedLoop className="w-72 h-56" />
      </div>
    </div>
  );
}
