import { AddSkillForm } from "@/components/AddSkillForm";
import { PaperPlane } from "@/components/PaperPlane";

export const metadata = { title: "Add to the Hangar" };

export default function AddPage() {
  return (
    <div className="space-y-10">
      <header className="relative border border-ink bg-mint">
        <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              Contribute
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              Add to the{" "}
              <span className="serif-italic font-normal italic">Hangar</span>.
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/85">
              Bring something you wrote. Or something good you've spotted. Submission opens a pre-filled PR on GitHub. Credit goes back to the original author.
            </p>
          </div>
          <div className="text-ink/40 hidden lg:flex justify-end plane-glide">
            <PaperPlane size={120} />
          </div>
        </div>
      </header>
      <AddSkillForm />
    </div>
  );
}
