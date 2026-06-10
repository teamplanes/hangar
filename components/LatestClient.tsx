import type { Article } from "@/lib/latest";

// A single curated feed. No tabs, votes, comments, tags, or sources sidebar.
export function LatestClient({ articles }: { articles: Article[] }) {
  return (
    <ol className="space-y-4">
      {articles.map((a, i) => {
        const external = a.url.startsWith("http");
        return (
          <li key={a.title} className="border border-ink bg-cream paper-card p-6">
            <div className="flex items-baseline justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink/65">
              <span>
                {String(i + 1).padStart(2, "0")} · {a.source}
              </span>
              <span>{a.publishedOn}</span>
            </div>
            <a
              href={a.url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="mt-2 block group"
            >
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight group-hover:text-coral transition">
                {a.title}
              </h3>
            </a>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">
              {a.summary}
            </p>
            <div className="mt-4 pt-3 border-t border-ink/15 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/70">
              <a
                href={a.url}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="hover:text-coral underline decoration-ink/30 hover:decoration-coral underline-offset-4"
              >
                Read at {a.source} ↗
              </a>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
