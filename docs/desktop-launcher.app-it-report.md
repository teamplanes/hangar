# App-it report

**1. Project type detected:**
Next.js 15 App Router at `/Users/jsmilg/code/hangar`. `package.json` scripts: `dev` = `next dev` (no hardcoded `-p`), `build`, `start`, `typecheck`. Not a worktree. `swiftc` available. No existing desktop config (no Electron/Tauri). No FSA usage. Sibling appified apps: Litmus (:3000), TapBack (:3010).

**1.5. Name resolution:**
Picked: "The Hangar". Sources: folder `hangar`, `package.json` name `hangar`, in-app wordmark "THE HANGAR". "The Hangar" is the product name used everywhere on the site; slug `hangar`. To override: edit `scripts/app-it.config.json`, then `npm run desktop:build && npm run desktop:install`.

**2. Apps detected:** 1
- **The Hangar** — single Next.js dev server. Preferred port 3020. `START_COMMAND="npm run dev"` (`next dev` reads `$PORT` natively).

**3. Strategy chosen per app:**
- The Hangar: **A1 native WebKit shell (Swift)** — the default for a web app.

**4. Why these are the lowest-effort robust approaches:**
Standard Next.js web app with `swiftc` present, so the native Swift shell is the default: the Dock icon stays ours, single-instance activation is native, relaunch is instant. Chrome `--app=` was ruled out (steals the Dock icon, breaks single-instance, slower startup). No File System Access or other Chromium-only APIs, so no chrome-fallback or polyfill needed. Single server, so no A3.

**5. Files added/changed:**
- `assets/hangar-icon.png` (icon source; see §6)
- `desktop/The Hangar.app/...` (gitignored)
- `scripts/wrapper.swift`, `scripts/run-template.sh`, `scripts/info-plist-template.xml`
- `scripts/desktop-build.sh`, `scripts/desktop-icons.sh`, `scripts/desktop-icons-preview.sh`, `scripts/desktop-install.sh`, `scripts/desktop-quit.sh`, `scripts/desktop-doctor.sh`
- `scripts/inspect.sh`, `scripts/placeholder-icon-gen.sh`
- `scripts/app-it.config.json`
- `package.json` — added `desktop:*` scripts
- `docs/desktop-launcher.md`, `docs/desktop-launcher.app-it-report.md`
- `.gitignore` — added: `desktop/`, `assets/icons/build/`, `assets/icons/hangar/`

**6. Icon source per app:**
- The Hangar: `assets/hangar-icon.png` — from `public/brand/Colour.png`, 1260×1260 square, white PLANES wordmark on black. Considered: `public/brand/Master.png` (630×630 black-on-cream, lower res) and `public/brand/Logo.png` (2350×1050, non-square wordmark — rejected, would need heavy padding). Colour.png won on resolution + square aspect + Dock contrast (solid black tile). Caveat: it's a wordmark, can get tight at 16px; swap in a dedicated Hangar mark later if one exists.

**7. To change an app icon later:**
Replace `assets/hangar-icon.png`, optionally `npm run desktop:icons:preview -- --open` to check it at Dock sizes, then `npm run desktop:build && npm run desktop:install` (install refreshes Dock + Finder caches automatically).

**8. Build / install / quit commands:**
- Build: `npm run desktop:build`
- Install: `npm run desktop:install` (→ ~/Applications/App It/)
- Quit: `npm run desktop:quit` (stops the daemonized dev server)
- Diagnose: `npm run desktop:doctor` (`-- --fix-safe` for generated-state cleanup)

**9. Generated launcher locations:**
- Repo: `desktop/The Hangar.app`
- Installed: `~/Applications/App It/The Hangar.app`
- Runtime port (after first click): `~/Library/Application Support/app-it/hangar/server.port`

**10. Verification (per app):**
- [x] Build succeeded; `.app` exists; wrapper is universal Mach-O (arm64 + x86_64); `.icns` valid
- [x] Bundle metadata correct: CFBundleIdentifier `com.planes.hangar`, CFBundleName "The Hangar", no `__PLACEHOLDER__` leakage
- [x] Cold launch: `server.port` = 3020 recorded; HTTP 200 on runtime port
- [x] Single instance; `lsappinfo` confirms bundle id `com.planes.hangar`
- [x] Cmd+Q (user quit) tore down the server tree — port 3020 free, no leaked next/npm procs
- [x] Red-X leaves server warm (port still bound after window close)
- [x] Warm re-launch responded HTTP 200 in 129 ms (descendant-walk reattach works)
- [x] Install-path open exited 0; `lsregister` shows exactly one registered path (the install copy)
- [x] window content + Dock icon identity — human-confirmed (user saw it on screen)

**11. Dock Stack:**
- [x] `~/Applications/App It/` exists
- [ ] User to drag `~/Applications/App It/` to the right side of the Dock once (one-time Stack setup)

**12. Known limitations:**
- Runs the **dev** server (live local site), not a production build — same as `npm run dev`.
- Unsigned bundle — Gatekeeper warns on first launch; right-click → Open once.
- Baked `PROJECT_ROOT` = `/Users/jsmilg/code/hangar`; re-run build + install if the repo moves. A teammate who clones the public repo and runs `npm run desktop:build` gets a bundle baked to their own path (portable).
- WebKit, not Chromium — use a regular browser tab for Chrome devtools.
- Persistent server: closing the window leaves `next dev` running (that's why relaunch is fast); `lsof -i :3020` shows a binding until Cmd+Q / `desktop:quit` / reboot.
- Icon is the PLANES wordmark; may get tight at 16px. Swap `assets/hangar-icon.png` for a dedicated mark if desired.
- Universal arm64 + x86_64 binary.

## Decision history
- 2026-06-07: Initial build (Strategy A1 native Swift, bundle-id `com.planes.hangar`, port 3020, icon: `public/brand/Colour.png`). All programmatic + human verification passed; warm relaunch 129 ms. app-it source files staged, not committed.
