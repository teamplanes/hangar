---
title: "Research synthesis to FigJam"
discipline: product
type: skill
tags: ["research", "user-interviews", "synthesis", "figjam", "thematic-analysis"]
added_by: yemi
added_on: 2026-06-10
status: stable
source:
  kind: original
spice: hot
pack: true
plugin_source: bundled
summary: Turn one user interview transcript into a thematic analysis, output as a ready-to-import FigJam board (theme bands, participant card, colour-coded insight stickies, verbatim quotes) plus a markdown file so interviews can be combined later.
---

> Made at Planes by Yemi. Takes a raw interview and gives you both a visual research board and a structured text file, so you can synthesise across interviews later.

## What it does
Processes one user interview at a time into a thematic analysis with two outputs that work together:
1. **A FigJam widget plugin** (a small `manifest.json` + `code.js` folder you import into Figma once, then run inside any board) that builds the board: horizontal theme bands, a participant card on the left, a row of colour-coded insight stickies under each theme, and yellow verbatim-quote stickies directly below each insight.
2. **A markdown text file** with the same content as structured prose, so several interviews can be combined for meta-synthesis across the project.

## When to use
- Synthesising user interviews, thematic analysis, affinity mapping, pulling themes out of a transcript
- "Synthesize this interview", "make a research board", building a FigJam board from research
- Turning Granola interview notes into something visual and shareable

## How it works
- **One interview per run**, each gets its own colour and builder widget; you accumulate one text file per interview as the source pile for cross-interview synthesis.
- **A fixed, opinionated board layout** so boards compare cleanly side by side.
- **Widget plugin over the Figma MCP** deliberately: the MCP rate-limits and leaves half-built boards, while a local widget import has no limit.

## How to get it
It's in the Product plugin:

```
claude plugin marketplace add teamplanes/hangar
claude plugin install hangar-product@planes-hangar
```
