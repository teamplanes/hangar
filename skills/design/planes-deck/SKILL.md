---
name: planes-deck
description: >-
  Use when building or recreating a Planes-style presentation deck: a playback,
  pitch, demo, strategy or client deck in the studio's house design (the "big
  playback deck" look people liked). Also use when someone wants an on-brand HTML
  slide deck with Planes fonts, colours, transitions and layouts, or asks to
  "make a deck like the Lewis Silkin playback" or "build a deck in the Planes
  style".
title: Planes HTML Deck Builder
discipline: design
type: skill
tags:
  - deck
  - presentation
  - slides
  - playback
  - pitch
  - brand
  - design
added_by: julian
added_on: 2026-07-07
status: stable
source:
  kind: original
spice: medium
pack: true
summary: >-
  Build an on-brand Planes presentation deck from a ready-made HTML template:
  embedded brand fonts, the full colour palette, smooth transitions, keyboard
  navigation, an overview grid, and a library of slide layouts (cover, divider,
  statement, two-column, three-up, stats, click-through timeline, questions with
  ownership chips, live-demo holding slide, and more). Includes the build
  workflow and PDF export.
---

# Planes HTML Deck Builder

## Overview

A single self-contained HTML file that presents like the studio's playback decks: off-white paper background with grain, Mint Grotesk + PP Hatton, the brand accents (sky blue, mint, yellow, coral), soft transitions, and full-screen keyboard navigation. `template.html` in this skill carries the whole design system, the fonts (base64-embedded, so it works offline), the engine, and one example of each core layout. You duplicate it and replace the slides.

**Do not rebuild the CSS or JS.** The look people like lives in the template's `<style>` and `<script>`. Keep them as-is and only edit the `<section class="slide">` blocks.

Example of the kind of deck this builds: [the Lewis Silkin playback](https://drive.google.com/file/d/1jZnStVosWk22wO0AqqSRQodI9OxYwSR8/view?usp=sharing).

## When to use

- A client playback, pitch, demo, strategy readout, or any deck that should look like Planes.
- Someone asks for "a deck like the [X] playback" or "in the Planes style".

Not for: Google Slides / Keynote / PowerPoint decks (this is HTML), or a client's own brand (match theirs).

## Before you build: check Roger

A deck is only as good as the facts in it. Before you write a line of copy, check **Roger** (Planes' org memory) for the client's real details, so the deck starts from truth instead of plausible-sounding invention.

- `catch-me-up` on the project scope for the standing brief: what it is, where it is, open questions, who owns what.
- `search-memory` and `search-artifacts` for the specifics you are about to put on a slide: the numbers, the names, the current status, the decisions already made.
- Pull real client and partner names, live figures, and dates from Roger. Never invent a statistic to fill a stats slide. If Roger does not have a number, say so and leave it out rather than guess. A wrong figure on a client playback is worse than no figure.
- If someone has left or a name has changed, Roger is where you catch it before the client does.

This is the difference between a deck that looks like Planes and one that is right.

## Quick start

1. Copy `template.html` to a new file, for example `~/<project>-deck/index.html`.
2. Open it in a browser to see the layouts. Arrow keys / space move, `O` opens the overview grid, `F` is full screen.
3. Replace the example slides with your content, one section at a time. Keep the `<style>`, `<script>`, and the chrome (progress bar, runhead, overview) untouched.
4. Present straight from the browser, or export a PDF (below).

## Brand tokens

Already wired into the template as CSS variables. Listed here for reference; use the variables, not raw hex, when editing.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F4F3F1` | Page background, off-white with grain |
| `--ink` | `#1E1E1E` | All headlines and body text |
| `--white` | `#FFFFFF` | White |
| `--blue` | `#AFEDFF` | Accent |
| `--mint` | `#A7FFD0` | Accent |
| `--yellow` | `#FFE787` | Accent |
| `--coral` | `#FF7780` | Accent |

Colour rule: ink text on paper, white and the accent panels; white text on ink or black. Never colour the body text. Accents carry dividers, chips, colour panels and the odd emphasis, not paragraphs.

Type: Mint Grotesk for headlines and body (`--font-display`, `--font-body`); PP Hatton italic for kickers and big numerals (`--font-serif`). Sizes are fluid `clamp()` (headline--md is `clamp(2.2rem, 5.2vw, 4.4rem)`, body is `clamp(.95rem, 1.15vw, 1.2rem)`). Never hardcode px.

## Slide layouts

Each slide is `<section class="slide slide--TYPE" data-accent="blue|mint|yellow|coral" data-title="Overview label">`. Add `data-fill="accent"` for a full-colour panel (used on cover, dividers, demo). `data-title` is the label in the overview grid.

| Layout | Class | Use |
|---|---|---|
| Cover | `slide--cover` | Title slide: kicker, big headline, wavy PLANES wordmark, date |
| Agenda | `slide--agenda` | Numbered contents with hairline rules |
| Section divider | `slide--divider` | Full-colour section break: eyebrow, headline, big serif numeral |
| Statement | `slide--statement` | Serif-italic kicker over a bold line, optional body. The "Not just X. Y." beat |
| Two-column | `slide--two-col` | Kicker + headline left, body right |
| Three-up | `slide--three` | Three items with hairline rules and serif indices |
| Stats | `slide--stats` | Giant serif numerals as proof |
| Timeline | `slide--timeline` | Click-through milestones; each screenshot is its own step |
| Questions | `slide--questions` | Numbered list with ownership chips (`chip--you` filled, `chip--us` outline) |
| Live demo | `slide--demo` | Holding slide to switch away from to the real product |
| Achievements | `slide--achievements` | 3-up proof grid: `.ach-cell` with a `.label` and `.body` |
| Grid | `slide--grid` | 2-up or 4-up cards via `.duo-grid` / `.quad-grid`, each a `.three-col` with `.idx`, `.label`, `.body` |
| Split | `slide--split` | Two panes side by side; add `.pane--fill` to flood one half with the accent (the "on paper / on colour" beat) |
| Logo wall | `slide--logos` | Client logos in an even auto-fit grid (`.logo-wall` > `.logo-cell`), monochrome. The "trusted by" / proof-by-association slide |
| Closing | `slide--closing` | An asks checklist: `.ask-list` > `.ask` with an arrow `.mark` svg. "What we need from you" |

The template ships one working example of every layout above.

**Accent rhythm:** give each section one accent and rotate across sections (blue → mint → yellow → coral) so the deck has momentum. Content slides sit on paper; the accent shows on dividers, chips and colour panels.

**Screenshots:** drop images into any `<figure>` slot as a base64 `data:` URI. Downscale first to keep the file light, for example `sips -s format jpeg -s formatOptions 78 -Z 1600 in.png --out out.jpg`, then embed `data:image/jpeg;base64,<...>`. Placeholders use `class="... is-empty"` with a `.ph` label.

**Logos and the wordmark:** client logos go in a `slide--logos` wall, one per `.logo-cell`, on an even auto-fit grid. Use a single monochrome treatment (the CSS greyscales them and drops them to a low opacity) so the wall reads as one calm set, not a ransom note of brand colours. Embed each as a base64 SVG or PNG in the `.logo-cell img`; a text fallback in the cell is fine while you gather assets. The PLANES wordmark is the wavy `.wordmark` spans on the cover, styled by the template. Leave it as it is. No decorative doodles, illustrations or flight paths anywhere in the deck: the brand is the type, the colour and the space.

## Voice and story

Write every line in Planes' voice: confident, plain, honest, no em dashes, sentence case. Use the **planes-tone-of-voice** skill. One idea per slide; cut hard.

Pairs with **presentation-narrative** for the deck's arc and story before you build. A playback usually runs 15 to 25 slides: cover, agenda, a divider per section, a live-demo holding slide where relevant, and a closing asks slide.

## Export to PDF

Drive the deck with a headless browser (Playwright / chrome-headless-shell), hide the chrome (`.hint, .chrome, .progress, .progress-track { display:none }`), step through every slide **and every timeline stop** with the right arrow, screenshot each at 2x, then combine the frames into a PDF (Python PIL: `Image.save(..., save_all=True, append_images=[...])`). Downscale frames to ~2000px wide, JPEG quality 80. Ask Claude to "export the deck to PDF" and it will run this.

## Common mistakes

- Rewriting the CSS or swapping the fonts. The template is the brand; leave it alone.
- Title Case headlines, or em dashes carried in from a draft. Sentence case, and no em/en dashes.
- Cramming a slide. If it needs more than one idea, split it.
- Same accent on every section. Rotate them.
- Full-resolution screenshots bloating the file. Downscale and use JPEG.

## Red flags: stop

- You are editing the `<style>` block to change how a layout looks.
- A headline is in Title Case, or a sentence has an em dash.
- A screenshot is embedded at full retina resolution.
