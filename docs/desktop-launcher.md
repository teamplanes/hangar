# Desktop launcher

Click **The Hangar** in `~/Applications/App It/` (or its Dock Stack) to launch the site as a real macOS app.

## First launch

1. Right-click the app icon and choose **Open**, then click **Open** in the dialog. macOS remembers and skips this on subsequent launches (Gatekeeper, unsigned bundle).
2. The first cold start takes 5–15 s while the Next.js dev server compiles.
3. If a "couldn't be opened" alert appears citing the dev server, open `~/Library/Logs/app-it/hangar/server.log`. The alert quotes the tail; the full log usually shows the cause.

## App

- **The Hangar** (`The Hangar.app`) — the Hangar site running on the local Next.js dev server (preferred port 3020).

Each `.app` runs as a real macOS app with its own Dock icon and window, **not** a Chrome `--app` window. The `.app` embeds a small Swift WebKit shell so the Dock icon stays ours and macOS handles single-instance activation natively.

## Launch behavior

The launcher is **persistent**, designed for daily use, not single-shot demos.

- **First click after boot:** 5–15 s for the dev server cold start.
- **Closing the window with the red X does NOT kill the dev server.** It stays warm. Click the icon again and the window opens in ~250 ms (measured 129 ms on first reattach).
- **Cmd+Q (or right-click → Quit in the Dock) DOES kill the server.** Use when you want everything to stop.
- **Re-clicking the icon while the window is open** brings the existing window forward. No second window.
- **Sibling appified apps coexist.** Litmus (:3000) and TapBack (:3010) already use their ports; The Hangar prefers 3020 and scans upward if taken. The runtime port is recorded at `~/Library/Application Support/app-it/hangar/server.port`.

To stop the persistent dev server from the terminal:

```bash
npm run desktop:quit
```

Reboot also works.

## Install / update

```bash
npm run desktop:build    # rebuild The Hangar.app under desktop/
npm run desktop:install  # copy it into ~/Applications/App It/, refresh Dock
```

The `~/Applications/App It/` folder is meant to live as a Dock Stack, drag it to the right side of the Dock once and every appified app shows up there.

## Replace the app icon

Replace the source PNG (square, ≥ 1024×1024 ideal). Current source is the Planes brand mark:

- The Hangar: `assets/hangar-icon.png`

Preview how it will look in the Dock before rebuilding (optional):

```bash
npm run desktop:icons:preview -- --open
```

Then `npm run desktop:build && npm run desktop:install`.

## Something's wrong? Diagnose it

```bash
npm run desktop:doctor              # read-only health check
npm run desktop:doctor -- --tail    # …and show the tail of the launcher log
npm run desktop:doctor -- --fix-safe  # clean up app-it's own generated state only
```

## Logs & runtime files

- Logs: `~/Library/Logs/app-it/hangar/server.log`
- Runtime state: `~/Library/Application Support/app-it/hangar/` (`server.port`, `server.pid`)

## Known limitations

- **Unsigned bundle.** First launch triggers Gatekeeper; right-click → Open once.
- **Repo path is baked in** (`/Users/jsmilg/code/hangar`). If the repo moves, re-run build + install. A teammate who clones the repo and runs `npm run desktop:build` gets a bundle baked to their own path.
- **Persistent server.** Closing the window leaves the dev server running (that's why relaunch is fast). `lsof -i :3020` keeps showing a binding until you Cmd+Q, run `npm run desktop:quit`, or reboot.
- **WebKit, not Chromium.** For Chrome devtools, point a browser tab at the runtime URL.
- **Runs the dev server, not a production build.** It's the live local site, same as `npm run dev`.
