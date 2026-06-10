---
title: "Design taste (anti-slop frontend)"
discipline: design
type: skill
tags: ["frontend", "design", "taste", "landing-pages", "anti-slop"]
added_by: julian
added_on: 2026-06-10
status: stable
source:
  kind: curated
  url: https://github.com/Leonxlnx/taste-skill
  credit: "Leonxlnx / taste-skill (MIT)"
spice: medium
summary: Stops Claude shipping generic, templated frontend slop. It reads the brief, declares a design direction, reaches for real design systems where they exist, and avoids the AI defaults (purple gradients, three equal cards, Inter + slate-900).
---

> An external skill by Leonxlnx, distributed through its own installer, not our marketplace. This is a catalogue entry: what it does and how to get it. Browse-only here.

## What it does
A frontend design skill for landing pages, portfolios, and redesigns. Instead of jumping to a default aesthetic, it makes Claude read the brief, state a one-line "design read", set explicit dials, and build interfaces that don't look templated. It's opinionated about reaching for official design systems when they fit, and about refusing the tells of AI-generated design.

## When to use
- Building or redesigning a landing page, portfolio, or marketing site with Claude
- When AI output keeps landing on the same generic look and you want it to have a point of view
- Not for dashboards, data tables, or multi-step product UI (the skill says so itself)

## How to get it
This skill installs through its own tool, not `claude plugin install`:

```
npx skills add Leonxlnx/taste-skill
```

Source and full instructions: https://github.com/Leonxlnx/taste-skill (MIT, by Leonxlnx).

## How it works (the gist)
- **Design read first.** Before any code, it infers page kind, audience, vibe words, references, and constraints, then declares: "Reading this as: [page kind] for [audience], with a [vibe] language, leaning toward [design system]." One clarifying question only if genuinely ambiguous.
- **Three dials.** `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`, set from the brief (e.g. minimalist/Linear-style pulls variance and motion down; agency/Awwwards pushes them up). Every layout and motion decision is gated by these.
- **Brief to design system map.** If the brief reads as Fluent, Material, Carbon, Polaris, Primer, GOV.UK, USWDS, Radix, shadcn, or Tailwind, it installs the official package rather than hand-rolling CSS. One system per project, no mixing.
- **Anti-default discipline.** Explicitly avoids AI-purple gradients, centered hero over dark mesh, three equal feature cards, glassmorphism on everything, Inter + slate-900, and infinite micro-animations.
- **Honesty rule.** When an aesthetic (brutalism, bento, liquid glass) has no official package, it builds with native CSS and labels what's borrowed inspiration vs. official material.

Pairs well with our own `ui-critique` and `tight-design-brief` skills.
