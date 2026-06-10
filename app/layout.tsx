import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { BayNav } from "@/components/BayNav";

export const metadata: Metadata = {
  title: "The Hangar · Planes' AI skills library",
  description:
    "Skills, prompts and recipes from across Planes. Browse by bay. Add your own.",
};

function SearchIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      aria-hidden
    >
      <circle cx="5.5" cy="5.5" r="4" />
      <line x1="8.5" y1="8.5" x2="12" y2="12" />
    </svg>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col antialiased text-ink">
        <header className="relative bg-cream head-rule sticky top-0 z-40">
          <div className="mx-auto max-w-page px-6 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
            <Wordmark />
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/search"
                className="btn-ghost text-sm font-mono uppercase tracking-[0.14em]"
                aria-label="Search"
              >
                <SearchIcon />
                <span className="hidden sm:inline">Search</span>
              </Link>
              <Link
                href="/add"
                className="btn-ink text-sm font-mono uppercase tracking-[0.14em]"
              >
                <span aria-hidden>＋</span>
                <span className="hidden sm:inline">Add to the Hangar</span>
                <span className="sm:hidden">Add</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-page px-6 lg:px-10 pb-3">
            <BayNav />
          </div>
        </header>

        <main className="above-grain flex-1 mx-auto w-full max-w-page px-6 lg:px-10 py-12">
          {children}
        </main>

        <footer className="above-grain mt-20 border-t border-ink/40 bg-cream">
          <div className="mx-auto max-w-page px-6 lg:px-10 py-10 grid sm:grid-cols-[1.4fr_1fr_1fr] gap-8 text-sm">
            <div>
              <div className="serif-italic text-2xl text-ink mb-2">
                A small library of how we work with Claude.
              </div>
              <p className="text-ink/70">
                Built by the studio at{" "}
                <a
                  href="https://planes.studio"
                  className="underline decoration-ink/30 hover:decoration-coral"
                >
                  Planes
                </a>
                . Pull requests welcome.
              </p>
              <a
                href="https://planes.studio"
                aria-label="Planes"
                className="mt-5 inline-block opacity-80 hover:opacity-100 transition"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/Logo.png"
                  alt="Planes"
                  width={2350}
                  height={1050}
                  className="h-12 w-auto"
                />
              </a>
            </div>
            <div>
              <div className="label mb-3">Bays</div>
              <ul className="space-y-1.5">
                <li><Link href="/bay/product" className="hover:text-coral">Product</Link></li>
                <li><Link href="/bay/design" className="hover:text-coral">Design</Link></li>
                <li><Link href="/bay/dev" className="hover:text-coral">Dev</Link></li>
                <li><Link href="/bay/new-business" className="hover:text-coral">New Business</Link></li>
                <li><Link href="/bay/general" className="hover:text-coral">General</Link></li>
                <li><Link href="/bay/just-for-fun" className="hover:text-coral">Just For Fun</Link></li>
              </ul>
            </div>
            <div>
              <div className="label mb-3">Do</div>
              <ul className="space-y-1.5">
                <li><Link href="/add" className="hover:text-coral">Add to the Hangar</Link></li>
                <li><Link href="/search" className="hover:text-coral">Search the catalogue</Link></li>
              </ul>
              <div className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink/50">
                v0.1 · {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
