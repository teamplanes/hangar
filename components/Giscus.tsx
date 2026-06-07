"use client";

export function GiscusStub() {
  return (
    <div className="mt-12 border border-dashed border-ink/35 bg-cream p-6 text-sm">
      <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/70">
        Comments &amp; reactions
      </div>
      <p className="mt-2 text-ink/80 leading-relaxed">
        Comments arrive once we point{" "}
        <a
          href="https://giscus.app"
          className="underline decoration-ink/30 hover:decoration-coral text-ink"
        >
          Giscus
        </a>{" "}
        at the repo. Threads in GitHub Discussions. Reactions count as votes. No new logins.
      </p>
    </div>
  );
}
