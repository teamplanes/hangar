import { PROMPT_EXAMPLES } from "@/lib/good-bad";
import { PromptCheckerClient } from "@/components/PromptCheckerClient";

export const metadata = { title: "Flight Tips · The Hangar" };

export default function FlightTipsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative border border-ink bg-cream">
        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              Flight school
            </div>
            <h1 className="mt-3 text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] leading-[0.96] font-black tracking-tight">
              <span className="serif-italic font-normal italic">Flight</span>{" "}
              Tips
            </h1>
            <p className="mt-4 max-w-prose text-[1.05rem] text-ink/80">
              Sharper prompts get sharper answers. Six worked examples below, then a checker that scores your own prompt against the rules of thumb the studio uses.
            </p>
          </div>
          <aside className="border-t lg:border-t-0 lg:border-l border-ink p-8 sm:p-10 lg:p-12 bg-butter relative">
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/80">
              In one line
            </div>
            <div className="serif-italic text-2xl text-ink mt-2 leading-snug">
              Sharper prompt, sharper answer
            </div>
            <p className="mt-4 text-ink/80 text-sm leading-relaxed">
              Every example below is a real moment we've seen go from average to surprisingly useful with a few small moves.
            </p>
          </aside>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
          01 / Worked examples
        </div>
        <ol className="space-y-8">
          {PROMPT_EXAMPLES.map((ex, i) => (
            <li key={ex.title} className="border border-ink bg-cream">
              <div className="border-b border-ink px-6 sm:px-8 py-4 flex items-baseline justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/65">
                    {String(i + 1).padStart(2, "0")} · {ex.tag}
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black tracking-tight">
                    {ex.title}
                  </h3>
                </div>
                <div className="serif-italic text-ink/80 text-[1.05rem] max-w-md">
                  {ex.lesson}
                </div>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink">
                <div className="p-6 sm:p-8 bg-cream">
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-coral mb-3">
                    Bad
                  </div>
                  <pre className="font-mono text-[13px] leading-6 whitespace-pre-wrap text-ink/85">
                    {ex.bad}
                  </pre>
                </div>
                <div className="p-6 sm:p-8 bg-mint">
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink mb-3">
                    Good
                  </div>
                  <pre className="font-mono text-[13px] leading-6 whitespace-pre-wrap text-ink">
                    {ex.good}
                  </pre>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Checker */}
      <section className="space-y-6">
        <div>
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink/70">
            02 / Try yours
          </div>
          <h2 className="mt-2 text-[2rem] sm:text-[2.5rem] leading-tight font-black tracking-tight">
            Score a real one
          </h2>
          <p className="mt-3 max-w-prose text-ink/80">
            Paste a prompt you&apos;d send for real and the checker flags what&apos;s missing. It won&apos;t rewrite it for you, that part is your job (or Claude&apos;s).
          </p>
        </div>
        <PromptCheckerClient />
      </section>
    </div>
  );
}
