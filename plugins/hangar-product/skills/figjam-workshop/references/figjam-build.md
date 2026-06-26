# Building the FigJam board

Read this before Step 5. It covers how to get a board to write to, the section-based layout
system, sticky-note sizing, the pastel palette, the structure every board follows, the Figma
Plugin API patterns, and how to verify. Build in passes and screenshot each section as you go.

## Before you write anything: load figma-use

`use_figma` runs JavaScript against the Figma Plugin API and fails in confusing ways if you skip
the guidance. Load the `/figma-use` skill first (or read the `skill://figma/figma-use/SKILL.md`
MCP resource if the skill isn't installed). Pass `skillNames: "figma-use"` on your `use_figma`
calls. Everything below assumes you've done this.

## Getting a board to write to

Two routes, decided in Step 4:

- **User gave a FigJam URL** (`figma.com/board/:fileKey/...`). Extract the `fileKey`. Confirm
  it's a `/board/` URL, not `/design/`.
- **Create a new board.** Call `whoami` to get the user's plan(s). If one plan, use its `key`;
  if several, ask which team/org (use the one where they have a full/edit seat). Then
  `create_new_file` with `editorType: "figjam"` and a clear `fileName`. It returns a new
  `fileKey` and URL.

## Build each section as a FigJam SECTION node

Use `figma.createSection()` for every section (this is FigJam's native "section" tool, the thing
the workshop owner expects: a labelled, coloured container they can move, resize, and collapse in
one grab). Do not fake sections with plain rectangles or frames.

**The coordinate rule that matters (this caused two failed attempts):** create the section
first, give it an absolute `x`/`y` and a size, and then add each child with coordinates
**relative to the section's top-left (0,0)**. So `section.x`/`section.y` place it on the canvas,
and a child at `x: 90, y: 110` sits 90/110 *inside* the section.

```js
const sec = figma.createSection();
sec.name = "2 · Now / Next / Later";     // the section name IS the visible title, so no separate title text needed
sec.x = 5420; sec.y = 0;                  // absolute on canvas
sec.resizeWithoutConstraints(3600, 2280);
sec.fills = [{ type: "SOLID", color: { r: 0.93, g: 0.94, b: 0.96 } }];
const title = figma.createText();
sec.appendChild(title);
title.x = 90; title.y = 110;              // RELATIVE to the section
```

Two traps to avoid, both of which balloon or misplace the section:

- Do **not** set child coordinates to absolute canvas values (e.g. `section.x + 90`). Section
  children are relative, so that double-counts and throws content far to the right.
- Do **not** create children on the page at absolute positions and then reparent them into the
  section. Reparenting keeps their far-away coordinates, so the section's box stretches back to
  the canvas origin and you get a giant section with an empty corner. Always create the child via
  `section.appendChild` (or append immediately) and set small relative coordinates.

Because the section name renders as the section's title on the canvas, use it as the heading
(e.g. "1 · Get oriented") and don't add a duplicate big title text inside. Keep the timing chip,
instructions, and content as children.

Lay sections out as a **horizontal sequence, left to right, in agenda order**, tops aligned at
`y = 0`, with roughly a 360px gap. Stack a short section (like a parking lot) below another by
giving it a larger `y`. People travel along the board through the session, so reading order =
run order.

## Size everything for real sticky notes

The board must hold the exercise. FigJam's standard sticky note is about **240×240px**, so size
every working area as a grid of stickies, not as a tight text box:

- **A "fill this in" zone** must hold at least 4–6 stickies: minimum ~300px tall (one row plus
  breathing room), wider if the exercise expects more. Never make a fill-in box only one line
  tall — people put stickies there, not a sentence.
- **Columns / clustering zones** should be at least 3 stickies wide (~840px+) and tall enough to
  hold any pre-placed cards **plus** open space below for several more stickies.
- **Pre-placed cards** (your starter content) should themselves be roughly sticky-sized or
  larger so they read at the same scale participants will work at.
- Leave generous empty space. A cramped board leaves nowhere to actually do the work.

Seed **one example sticky** in each fill-in zone (a real `createSticky` node with short "e.g. …"
text) so participants see the expected format and size. One per zone — enough to model it, not
so many it clutters.

## Sizing — text

Boards are read on shared screens and projected, often zoomed to fit a section. Use large text,
and **never go below FigJam's "medium" size** (roughly 32px). Smaller than that is unreadable on
a shared screen and looks cramped. Guide sizes:

- Workshop title (intro hero): 96–120px.
- Section titles: handled by the section name; if you add a hero, 64–110px.
- Instruction body / steps / bullet lists: 34px (floor 32).
- Card and sticky-zone label text: 32px.
- Timing & format chips: 36–40px, bold.

## Colour — bright, cheerful FigJam pastels

Use FigJam's standard pastels, not brand black/white. The default board should feel bright and
friendly. Colour-code **by section/phase**, consistently. A good palette (approximate hex):

- Yellow `#FFF3BF`, Blue `#D0EBFF`, Pink `#FFC9D9`, Lilac `#E5DBFF`, Green `#D3F9D8`,
  Peach/Orange `#FFE8CC`.

Suggested mapping: intro on a cheerful pastel (e.g. lilac or yellow) with dark text; generate
phases on yellow; organise/cluster on blue; decide/converge on green; reflect/parking on peach;
commit/close on lilac or pink. Always use dark text (`#1F2430`-ish) on pastels for contrast.
(Brand colours are available if a specific client board calls for them, but the default is
pastel and cheerful.)

## Writing rules on the board

- **No em dashes** anywhere on the board (or the run-sheet or email). Use commas, "to" for
  ranges (e.g. "Med to High"), or parentheses.
- **Plain language, no jargon.** Say "whole group" not "plenary", "small groups" not "breakouts"
  in participant-facing text, "everyone writes on their own" not "individual ideation". The board
  is read by clients who don't live in facilitation-speak.

## Board structure (every board has these)

1. **Intro section, "Start here".** Workshop title, the one-line objective, the outcomes, the
   agenda with timings, the roles, and norms (all ideas welcome, build don't block, one
   conversation, park tangents). Cheerful pastel, dark text.
2. **One section per agenda block,** colour-coded by phase, each containing: a title; a duration +
   format chip (e.g. "20 min · whole group"); short numbered instructions so people self-serve;
   and a working area sized for stickies (labelled zones, columns, a matrix drawn from shapes,
   or a journey grid) with one example sticky.
3. **Parking lot** section for off-topic-but-important points.
4. **Close / next steps** section: decisions captured, an actions area with Owner / What / By-when,
   sized for stickies.

When context shows the client wants a point of view (e.g. they've asked Planes to come
opinionated), **pre-place a recommended starting position** — cards already sorted into the
columns — for the group to react to and move. Reacting to a strong first draft is faster and more
productive than starting from blank, and it's where a lot of the board's value comes from.

## Plugin API patterns

`use_figma` executes JS with the `figma` global. Key creators: `figma.createSection()`,
`figma.createText()`, `figma.createSticky()`, `figma.createShapeWithText()` (good for cards and
matrix cells), `figma.createRectangle()` (column backdrops, fill-in zones),
`figma.createConnector()`. Build a few sections per call so you can screenshot and catch problems
early. `use_figma` does not return values, so verify with screenshots, not return data.

**Always load fonts before setting text:**

```js
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }); // "Semi Bold", not "SemiBold"
```

Section + relative children + an example sticky (note every child coordinate is relative to the
section, and the section name is the title):

```js
const sec = figma.createSection();
sec.name = "2 · Now / Next / Later";
sec.x = 5420; sec.y = 0;                 // absolute on canvas
sec.resizeWithoutConstraints(3600, 2280);
sec.fills = [{ type: "SOLID", color: { r: 0.93, g: 0.94, b: 0.96 } }];

const chip = figma.createText();
sec.appendChild(chip);
chip.fontName = { family: "Inter", style: "Semi Bold" };
chip.fontSize = 38;                      // never below ~32 (FigJam medium)
chip.characters = "20 min  ·  whole group";
chip.x = 90; chip.y = 110;               // RELATIVE to the section

const eg = figma.createSticky();
sec.appendChild(eg);
await figma.loadFontAsync(eg.text.fontName);
eg.text.characters = "e.g. move me";
eg.x = 140; eg.y = 600;                  // relative to section; sticky is ~240x240
```

For a `createShapeWithText` card, load the font of `card.text.fontName` (default Inter Medium)
before setting `card.text.characters`. Use `createConnector` for arrows between journey stages or
pointing at the parking lot.

## Verify before handing over

Because each section is its own node, screenshot **each section** with `get_screenshot` at a
readable `maxDimension` and check it as a participant would:

- Is the text readable when the section is zoomed to fit a screen?
- Does each exercise have a title, a timing/format chip, numbered instructions, and a working
  area clearly big enough for several stickies?
- Is there an example sticky modelling the format?
- Is the colour-coding consistent and the contrast legible (dark text on pastel)?
- Any em dashes or jargon to fix?

Also take one full-board screenshot (page root, e.g. node `0:1`) to confirm left-to-right order
and spacing. Fix anything that fails, then share the link.
