# The Hangar

Planes' shared library of Claude skills, prompts and recipes, organised by discipline ("bays"). Browse, install, and contribute.

Live site: **https://planes-hangar.vercel.app**

## Install skills in Claude Code

Register the marketplace once, then install whichever bay packs you want:

```bash
claude plugin marketplace add teamplanes/hangar
claude plugin install hangar-product@planes-hangar
```

Swap `hangar-product` for any bay: `hangar-design`, `hangar-dev`, `hangar-new-business`, `hangar-general`, `hangar-just-for-fun`. Skills land as slash commands and persist between sessions.

The repo is public, so the `marketplace add` step works for anyone with no GitHub auth required.

## Add a skill

Two ways:

1. **From the site.** Use "Add to The Hangar" on https://planes-hangar.vercel.app. It opens a pre-filled GitHub "new file" page; commit it and open a PR.
2. **By hand.** Add a markdown file under `skills/<bay>/<slug>.md` with the frontmatter other skills use (see any existing skill), then open a PR.

A skill in `skills/<bay>/` renders on the site automatically. To make it installable via the plugin marketplace, also add it under `plugins/hangar-<bay>/skills/<slug>/SKILL.md`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Built with Next.js (App Router). Skills are markdown files parsed at build time; the filesystem is the source of truth.
