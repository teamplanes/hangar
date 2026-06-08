---
name: whats-new
description: >-
  Show a rundown of the skills most recently added to The Hangar, what each does
  and how to run it, so you know what you just got after a plugin update.
---
> Run this after Claude tells you plugins updated (`/reload-plugins`). Claude Code won't tell you what's new in an update, this fills that gap.

## What it does
Fetches the latest additions to The Hangar and gives you a short, readable rundown: what each new skill does and the command to invoke it.

## When to use
- Right after a plugin update / `/reload-plugins` prompt
- Any time you want to catch up on what's been added to the Hangar lately
- "what's new in the hangar", "what skills were added recently"

## The skill

Fetch the live feed of recently-added Hangar skills:

```
https://planes-hangar.vercel.app/api/whats-new
```

It returns JSON: `{ updated, count, skills: [{ title, bay, added_on, summary, in_plugin, install, command, url }] }`.

Present it to me as a tight rundown, most recent first:

1. Open with one line: how many skills and the date of the most recent addition.
2. Group by `added_on` date (newest first). Under each date, list each skill as:
   - **Title** (Bay) , one-line summary.
   - If `in_plugin` is true: show the command to run it (`command`) and note it installs with `install`. If false, say it's browse-only on the site and link `url`.
3. If I don't already have the relevant bay plugin installed, remind me I can get it with `claude plugin marketplace add teamplanes/hangar` then `claude plugin install <install>`.
4. Keep it scannable. No preamble, no "here's what I found". Just the rundown.

If the fetch fails, tell me to check https://planes-hangar.vercel.app/top-skills instead.
