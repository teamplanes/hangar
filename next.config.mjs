/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Dock app (app-it) runs `dev:app` which sets HANGAR_DIST_DIR=.next-app,
  // so its dev server never shares the .next directory that local `npm run
  // build` / Vercel writes to. Prevents the recurring cache-corruption.
  distDir: process.env.HANGAR_DIST_DIR || ".next",
};

export default nextConfig;
