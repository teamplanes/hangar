---
name: planes-deck
description: >-
  Use when building or recreating a Planes-style presentation deck: a playback,
  pitch, demo, strategy or client deck in the studio's house design (the "big
  playback deck" look people liked). Also use when someone wants an on-brand HTML
  slide deck with Planes fonts, colours, transitions and layouts, or asks to
  "make a deck like the Lewis Silkin playback" or "build a deck in the Planes
  style".
title: Planes deck
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

# Planes deck

## Overview

A single self-contained HTML file that presents like the studio's playback decks: off-white paper background with grain, Mint Grotesk + PP Hatton, the brand accents (sky blue, mint, yellow, coral), soft transitions, and full-screen keyboard navigation. `template.html` in this skill carries the whole design system, the fonts (base64-embedded, so it works offline), the engine, and one example of each core layout. You duplicate it and replace the slides.

**Do not rebuild the CSS or JS.** The look people like lives in the template's `<style>` and `<script>`. Keep them as-is and only edit the `<section class="slide">` blocks.

## When to use

- A client playback, pitch, demo, strategy readout, or any deck that should look like Planes.
- Someone asks for "a deck like the [X] playback" or "in the Planes style".

Not for: Google Slides / Keynote / PowerPoint decks (this is HTML), or a client's own brand (match theirs).

## Quick start

1. Copy `template.html` to a new file, for example `~/<project>-deck/index.html`.
2. Open it in a browser to see the layouts. Arrow keys / space move, `O` opens the overview grid, `F` is full screen.
3. Replace the example slides with your content, one section at a time. Keep the `<style>`, `<script>`, and the chrome (progress bar, runhead, overview) untouched.
4. Present straight from the browser, or export a PDF (below).

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

The template ships one working example of each of these. The CSS also contains `slide--achievements` (3-up grid), `slide--grid` (2-up / 4-up via `.duo-grid` / `.quad-grid`), `slide--split` (half paper, half colour), and `slide--closing` (an asks checklist). Copy those from a recent deck if you need them.

**Accent rhythm:** give each section one accent and rotate across sections (blue → mint → yellow → coral) so the deck has momentum. Content slides sit on paper; the accent shows on dividers, chips and colour panels.

**Screenshots:** drop images into any `<figure>` slot as a `data:` URI. Downscale to about 1600px wide and use JPEG to keep the file light. Placeholders use `class="... is-empty"` with a `.ph` label.

## Voice

Write every line in Planes' voice: confident, plain, honest, no em dashes, sentence case. Use the **planes-tone-of-voice** skill. One idea per slide; cut hard.

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
