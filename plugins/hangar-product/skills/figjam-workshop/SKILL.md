---
name: figjam-workshop
description: >-
  Designs a collaborative workshop and builds it as a ready-to-run FigJam board,
  plus a facilitator run-sheet and a participant invite email. Use this skill
  whenever Fiona (or anyone at Planes) wants to plan, design, structure, or
  build a workshop, session, or facilitated meeting — and especially whenever
  FigJam is mentioned. Trigger on phrases like "create a workshop", "design a
  workshop", "build a FigJam board", "set up a workshop in FigJam", "I'm running
  a session with [client]", "plan a discovery workshop", "kickoff workshop",
  "ideation session", "retro board", "prioritisation workshop", "journey mapping
  session", "we need a workshop for X", "turn this into a FigJam", or any
  request to prepare a participatory session. Always use this skill for workshop
  design even if the person doesn't say "FigJam" explicitly — it produces the
  agenda, the board, the run-sheet, and the invite together so the whole session
  is ready to facilitate.
---
# FigJam Workshop Builder

This skill takes a workshop from a fuzzy idea ("we need a discovery session with the client")
to three finished artefacts: a **collaborative FigJam board** ready to run, a **facilitator
run-sheet** (talk track + timings), and a **participant invite email** (objective, agenda,
pre-work). It is built for Planes — we run highly collaborative, participatory sessions, not
slide-led presentations. The whole point of a workshop is that the people in the room do the
thinking; the board and agenda exist to make that easy.

Two principles run through everything:

- **Collaboration over presentation.** Every block should have the participants doing
  something — writing stickies, voting, sketching, ranking, discussing in pairs. If a block is
  just someone talking, ask whether it earns its place.
- **Everything ladders to the objective.** Each exercise should visibly move the group toward
  the stated outcomes. If you can't explain how an activity produces one of the outputs, cut or
  redesign it.

## Workflow overview

1. Establish today's date.
2. Run the intake interview (objective + outcomes, length + headcount, draft ideas, context).
3. Gather context if asked (Granola, Gmail, Slack, Calendar, Notion).
4. Design a draft agenda and review it with the user; iterate until they're happy.
5. Ask where to build it (new FigJam file, or a link to an empty board).
6. Build the board (see `references/figjam-build.md`).
7. Produce the run-sheet and the participant email.
8. Verify legibility with a screenshot, then share everything.

Don't skip ahead to building the board. The board is only as good as the agenda, and the agenda
is only as good as the objective — getting steps 2–4 right is where the value is.

---

## Step 0 — Establish today's date

Run `date` first. You need it to reason about how far away the session is (which changes how
much pre-work is realistic) and to date the run-sheet and email.

## Step 1 — Intake interview

Ask these as a single `AskUserQuestion` round where possible, so the user answers in one pass.
Note that objective and outcomes are genuinely free-text: ask them open, or offer drafted options
the user can edit, rather than forcing a multiple choice. Length, headcount, format, and the
context question work well as multiple choice. The four things you must come away with:

1. **Who is the workshop for, and what is its purpose?** Push for a *clear objective*: one
   sentence, action-oriented ("Align the client and our team on the top 3 problems to solve in
   Phase 1"). Then the **outcomes / outputs**: the tangible things that must exist by the end (a
   prioritised problem list, a shared journey map, three agreed concepts, a decision). Outcomes
   are the spine of the agenda, so don't proceed without them.
2. **How long is the session, and how many people are attending?** Length sets how many blocks
   fit (see timing guidance in `references/facilitation-patterns.md`); headcount drives breakout
   group sizing and how much board space each exercise needs.
3. **Do they have an outline agenda or activity ideas already?** Capture anything they want
   to run, even rough. Their ideas take precedence — your job is to shape them into a coherent,
   collaborative flow, not replace them.
4. **Is there context to pull in?** Ask whether you should search their emails, meeting
   transcripts, Slack, or Notion for relevant background — or whether they'll paste what matters.
   Offer; don't assume.

Also worth establishing if not volunteered: **in-person, remote, or hybrid?** (changes timing,
energiser choice, and how stickies are run) and **how experienced the group is with workshops**
(affects how much instruction to bake in).

## Step 2 — Gather context (only if asked)

If the user wants you to pull context, search the relevant sources for the client/topic:

- **Granola** — meeting transcripts and notes for prior conversations with this client/group.
- **Gmail** — recent threads about the project or the session itself.
- **Slack** — the project channel for decisions, open questions, and what's live right now.
- **Notion** — the project context page if one exists (see the `project-context` skill's
  projects), for current state and stakeholders.

You're looking for: the real problem behind the stated objective, sensitivities or politics in
the room, prior decisions you shouldn't re-litigate, and raw material you can pre-load onto the
board (e.g. known problems, existing research, draft personas) so exercises start warm rather
than from blank. Summarise what you found and how it shaped the agenda; don't dump raw notes.

If the context shows the client wants Planes to bring a point of view (they've asked us to come
opinionated, or a decision is overdue), plan to **pre-place a recommended starting position** on
the board for the group to react to and move, rather than starting from blank. Reacting to a
strong first draft is faster and tends to be the highest-value thing the board does.

## Step 3 — Design the agenda and review it

Build a draft agenda that is appropriate for the length and the outcomes, and that maximises
collaboration. Use `references/facilitation-patterns.md` for:

- the right **workshop pattern** to start from (discovery, kickoff, ideation, prioritisation,
  retro, journey/service map, etc.) based on the objective;
- **timing** guidance so the agenda actually fits the clock (including buffers, breaks, and not
  over-stuffing);
- an **exercise library** with each activity broken into manageable steps;
- **prep / pre-work** that sets exercises up for success (pre-reads, async sticky drops,
  pre-populated board areas, materials to gather).

Present the draft as a clear, scannable agenda: for each block give the **name, duration,
format (solo / pairs / small group / whole group), what participants do, and which outcome it
serves**. Open with how the flow ladders to their objective, and call out any prep you're
recommending and why.

Then explicitly invite changes: timings, swapping exercises, adding/removing blocks. Iterate
until the user signs off. **Do not build the board until the agenda is agreed** — rebuilding a
populated board is far more expensive than editing a draft agenda.

## Step 4 — Decide where to build

Ask the user one of:

- **Create a new FigJam file** — if so, you'll need which Figma team/project it should live in
  (the build reference explains how to resolve this), or
- **A link to an existing empty FigJam board** they've already made.

If they give a board URL, confirm it's a FigJam board (`figma.com/board/...`), not a design file.

## Step 5 — Build the FigJam board

Follow `references/figjam-build.md` in full. The non-negotiables that reference enforces:

- **Every section is a native FigJam Section node** (`createSection`), laid out left to right in
  agenda order, with content positioned relative to the section's top-left. This is the container
  the workshop owner expects (movable, resizable), lets you screenshot each section to verify it,
  and avoids a positioning bug (the section name doubles as the title).
- **Sized for real sticky notes.** FigJam's standard sticky is ~240x240px; every working area is
  a grid of stickies with room to spare, and fill-in zones hold at least 4 to 6 stickies (never a
  one-line box). Seed one example sticky per zone to model the format.
- **Large, legible text and generous spacing.** Boards are read on shared screens and zoomed out.
- **Bright, cheerful FigJam pastels** (yellow, blue, pink, lilac, green, peach) with dark text;
  colour-coded by section. Not brand black/white by default.
- **An intro section that sets the scene:** title, objective, outcomes, agenda with timings, roles,
  norms. Every board starts here.
- **Clear instructions and timings per section,** in numbered steps so participants self-serve.
- **Creative, participatory exercises in manageable steps,** every one tied back to an outcome.
- **Plain language, no jargon, and no em dashes** anywhere on the board ("whole group" not
  "plenary"; use commas, "to" for ranges, or parentheses instead of em dashes).

## Step 6 — Produce the run-sheet and the participant email

Always produce both, using the templates in `assets/`:

- **Facilitator run-sheet** (`assets/run-sheet-template.md`) — the minute-by-minute talk track,
  timings, what the facilitator says/does per block, materials, and setup notes. This is what
  Fiona actually holds on the day. Save as a `.md` (or `.docx` via the docx skill if she wants
  something polished to share with co-facilitators).
- **Participant email** (`assets/participant-email-template.md`) — a warm, concise invite that
  includes the objective, the agenda, any pre-work, the FigJam link, and practical logistics.

## Step 7 — Verify and share

Because each section is its own node, screenshot **each section** with `get_screenshot` at a
readable size and check it the way a participant would: Is the text readable zoomed to fit? Is
the working area clearly big enough for several stickies, with an example sticky modelling the
format? Are instructions and timers present? Any em dashes or jargon to fix? Also take one
full-board screenshot to confirm sections read left to right in a sensible order. Fix anything
that fails.

Then share the FigJam link and present the run-sheet and email files. Offer to drop the email
into Gmail as a draft and/or add the session to the calendar if that's useful.

---

## Reference files

- `references/facilitation-patterns.md` — workshop patterns, timing, the exercise library,
  group sizing, prep, and remote/in-person/hybrid considerations. Read when designing the agenda
  (Step 3).
- `references/figjam-build.md` — the technical build guide: layout grid, sizing, colour palette,
  board structure, and the Figma Plugin API patterns for creating sections, stickies,
  and text. Read before building (Step 5).

## Assets

- `assets/run-sheet-template.md` — facilitator run-sheet template.
- `assets/participant-email-template.md` — participant invite email template.
