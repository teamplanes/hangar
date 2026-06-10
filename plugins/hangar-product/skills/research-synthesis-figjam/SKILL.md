---
name: research-synthesis-figjam
description: Synthesize a user interview transcript into a thematic analysis, output as a ready-to-import FigJam plugin (horizontal theme bands across the top, a participant card on the left, a row of color-coded insight stickies under each theme, and yellow verbatim-quote stickies sitting DIRECTLY BELOW each insight connected by a straight downward arrow) AND a structured markdown text file with the same content so multiple interviews can be combined later. Use this skill whenever the user mentions research synthesis, user interviews, thematic analysis, affinity mapping, insight extraction, discussion guides, FigJam boards for research, "synthesize this interview", "make a research board", "pull themes out of this transcript", or any task that involves turning raw interview content into a structured visual + text summary. Also trigger when the user mentions Granola meetings in a research context.
---

# Research Synthesis → FigJam Plugin + Text File

This skill processes **one user interview at a time** into a thematic analysis, producing **two outputs** that work together:

1. **A FigJam widget plugin** — a small folder (`manifest.json` + `code.js`) the user imports into Figma desktop once, then runs from inside any FigJam board to build the synthesis. The build lays out **horizontal theme bands** along the top, a **participant card on the far left**, a **row of insight stickies** under each theme band, and **yellow quote stickies directly below each insight** connected by a straight downward arrow.
2. **A markdown text file** — the same content as structured prose, organized by theme. This file is what makes cross-interview synthesis tractable: after the user has run the skill on several interviews, they can combine the text files (or feed them all back to Claude) to do meta-synthesis across the project.

**Why the plugin folder approach (vs. building via the Figma MCP directly):** The Figma MCP rate-limits tool calls per session and per seat. Building boards via MCP regularly hits that ceiling, leaving partially-built boards and broken sessions. A widget plugin is a one-time import per interview, runs locally inside the user's Figma, and has no rate limit. The plugin folder is the default deliverable; only fall back to MCP-based building if the user explicitly requests it.

**Why one interview per run:** Doing one interview at a time keeps the plugin focused and self-contained — each interview gets its own colour and its own builder widget. The user accumulates one text file per interview, which becomes the source-of-truth pile for cross-interview synthesis later.

## Canonical board layout (DO NOT improvise)

The layout is a fixed, opinionated grid. Every plugin produced by this skill must match it — that's what lets users compare boards side-by-side across interviews.

```
                  ┌───────────────────────┐  ┌───────────────────────┐  ┌──── ...
                  │     Theme 1 pill      │  │     Theme 2 pill      │  │    
                  │ (wide, spans inside)  │  │ (wide, spans inside)  │  │    
                  └───────────────────────┘  └───────────────────────┘  └──── ...

  ┌──────────┐   ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ...
  │Participant│  │ I1 │ │ I2 │ │ I3 │ │ I4 │ │ I1 │ │ I2 │ │ I3 │ │ I4 │
  │   card   │   │blue│ │blue│ │blue│ │blue│ │blue│ │blue│ │blue│ │blue│
  │  (left)  │   └─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘ └─┬──┘
  └──────────┘     │      │      │      │      │      │      │      │
                   ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼
                  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
                  │ Q1 │ │ Q2 │ │ Q3 │ │ Q4 │ │ Q1 │ │ Q2 │ │ Q3 │ │ Q4 │
                  │yel │ │yel │ │yel │ │yel │ │yel │ │yel │ │yel │ │yel │
                  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘
```

Critical layout rules — these are NOT negotiable:

- **Themes are arranged horizontally** as wide pills across the top. Each theme pill's width = `(numInsights * stickyWidth) + (numInsights - 1) * stickyGap`, so the pill visually frames its row of insights.
- **Insight stickies go in a single row** beneath their theme pill, left-to-right, one column per insight.
- **Quote stickies sit DIRECTLY BELOW each insight**, never beside it. They share the same X coordinate as the insight.
- **The connector is a straight, downward, arrowed line** from the insight's BOTTOM magnet to the quote's TOP magnet. Not elbowed. Not sideways.
- **The participant card is a frame** (`figma.createFrame`, light violet fill, vertical auto-layout), placed on the far left at the same Y as the insight row — never inline with the themes.

If you find yourself reaching for `quoteOffset` (horizontal) or `magnet: 'RIGHT'` / `magnet: 'LEFT'`, stop — that's the wrong layout. The reference template in `references/figjam-layout.md` is the source of truth.

## MCPs and tools you'll use

- **Granola MCP** — optional, used when the user's transcript lives in Granola. Key tools: `list_meeting_folders`, `list_meetings`, `get_meeting_transcript`, `get_meetings`. Find via ToolSearch: `"granola list_meeting_folders"` etc.
- **AskUserQuestion** — for efficient multi-choice intake when in an interactive context. Find via ToolSearch: `"select:AskUserQuestion"`.
- **Write** — for producing the manifest.json, code.js, and markdown text file directly into the user's workspace.

You do **not** need the Figma MCP for this skill. No `use_figma`, no `whoami`, no `create_new_file` — those are no longer in the critical path.

When running inside a non-interactive context (subagent, scheduled run), `AskUserQuestion` isn't meaningful — treat the prompt as the sole source of user intent and proceed without follow-ups. If essential info is missing, use reasonable placeholders.

## When to use this skill

Trigger on requests like:
- "Synthesize this user interview into themes"
- "Create a FigJam board from this interview"
- "Do a thematic analysis of this transcript"
- "Turn this Granola meeting into a research board"
- "I have a discussion guide and an interview — pull the insights out"

Don't trigger for:
- Generic summarization of a meeting (no thematic structure needed)
- Requests for a written research report (that's prose, not a board)

If the user asks for **multiple interviews in one go**, explain the one-at-a-time approach: "I'll process the first interview now and produce both the FigJam plugin folder and a markdown text file. Run the skill again for each subsequent interview — you'll end up with one plugin per interview plus a stack of text files you can combine into a master synthesis." Then proceed with the first interview.

## Intake: what to ask the user

Lead with the **themes question** — this is the most consequential structural decision and the user often has a strong opinion. Then collect the interview details.

### Question 1: How should themes be defined?

This must be asked explicitly. **Don't assume.** Use `AskUserQuestion` if available and offer at least these two options:

- **"I'll specify the themes myself"** — user lists them (e.g., "Current workflow, Pain points, Desired outcomes"). The simplest path when the user already knows what they're looking for. Particularly common when the user has run the skill on previous interviews in the same project — they'll want the new interview to use the same theme structure for cross-interview comparison.
- **"Infer themes for me"** — you read the interviewer's questions in the transcript and derive 3–6 themes from the question structure. Always **show your derived themes and confirm with the user before building** the plugin. Themes are structural — they're hard to change after the plugin is generated.

A third option to offer when applicable: **"I'll share a discussion guide and you derive themes from that"** — same as inferring, but from the guide rather than the transcript.

After collecting the choice:
- If the user picks "specify", ask them to list the themes (3–6 ideally).
- If "infer", flag that you'll show the proposed themes after reading the transcript and wait for confirmation.

### Question 2: Where is the interview transcript?

Ask explicitly — present the options rather than assuming:

- **Granola meeting**. Ask which folder, then call `list_meeting_folders` or `list_meetings` to help the user locate the specific meeting. Once identified, fetch via `get_meeting_transcript`.
- **File upload** (PDF, .docx, .txt) in the uploads folder.
- **Pasted text** directly in chat.
- **Google Drive / shared link** — read via the appropriate connector.

### Question 3: Participant and contextual notes

- Participant name and role (for the left-side card).
- Date of the interview (also goes on the participant card).
- Optional: contextual / facilitator notes. If the transcript is from Granola, automatically offer to pull the Granola private notes from the same meeting via `get_meetings` — don't make the user ask for it. Otherwise: paste or upload, or skip.

### Question 4: Synthesizer name (only if unclear)

Default to the current user's first name (e.g., "Yemi"). This is appended as a signature line at the bottom of each insight sticky.

### Question 5: Sticky colour (when applicable)

If the user has already run the skill on prior interviews in this project, ask which colour they want for *this* interview so it stays distinct from prior ones. Otherwise default to Light Blue (the first colour in the palette). See "Color palette" below.

## Synthesis methodology

**Read the full transcript.** Don't skim. The whole point of the quote sticky is that it contains the participant's actual words; you can only find the right line by reading in full.

For each theme, your job is to read the transcript (and any contextual notes) through the lens of that theme and extract what the participant actually said or meant about it. Aim for 3–5 insights per theme — that's the sweet spot where the board is dense enough to be useful but not overwhelming.

**Writing an insight sticky note / text-file entry:**
- **Title** (bold, 2–6 words): A crisp label for the insight. Written as a finding, not a question. Good: "Avoids risky decisions". Bad: "How they approach risk".
- **Body** (1–3 sentences, normal weight): Expand on the title with enough specificity that someone reading just this sticky understands what the participant conveyed. Reference what they said or did, not meta-commentary.
- Keep it to things the participant actually expressed. If they didn't speak to a theme meaningfully, fewer insights is fine — empty cells are honest data.

**Selecting the quote:**
- Verbatim from the transcript. Exact words, including filler if that's how they said it.
- Pick the line that most directly demonstrates the insight. If you need to explain why it relates, it's the wrong quote.
- **Do not truncate.** If the demonstrative quote is 5+ lines, the sticky becomes tall — that's the system working correctly.
- If 2–3 short lines from different points in the interview better demonstrate the insight than any single line, put them as bullets on one sticky.

For deeper guidance (weak vs. strong examples), see `references/synthesis-method.md`.

## Producing the outputs

You'll generate **both** outputs every run. The text file is just as important as the plugin folder — it's what makes cross-interview synthesis possible.

### Output A: the FigJam widget plugin folder

Save the folder into the user's workspace folder. Use a slug derived from the participant's name. The folder structure is exactly:

```
{workspace}/{participant-slug}-figjam-plugin/
├── manifest.json
└── code.js
```

For example, for a participant named Jon: `{workspace}/jon-figjam-plugin/manifest.json` and `{workspace}/jon-figjam-plugin/code.js`.

**`manifest.json` (always this exact shape):**

```json
{
  "name": "{Participant} FigJam Build",
  "id": "{participant-slug}-figjam-build",
  "api": "1.0.0",
  "widgetApi": "1.0.0",
  "main": "code.js",
  "editorType": ["figjam"],
  "containsWidget": true
}
```

The combination of `editorType: ["figjam"]` + `containsWidget: true` + `widgetApi` is required — Figma's manifest validator rejects FigJam-targeted plugins that aren't widgets. Don't try to ship as a plain plugin; it won't import.

**`code.js`:** A FigJam widget that registers a small "Builder" card on the canvas. The widget exposes a "Build" property-menu action; when the user clicks it, the widget runs the full board build (theme pills, participant card, insight + quote stickies, connectors) anchored 500px below the widget so they don't collide. After the build completes, the widget shows a status of "Done — you can delete me" and a `figma.notify` toast.

**The full canonical `code.js` template lives in `references/figjam-layout.md`. Copy it exactly — do not improvise the geometry or the JSX/h syntax.** The template covers:
- Widget registration boilerplate (`figma.widget`, `usePropertyMenu`, `useSyncedState`, `h`) — no JSX, since the widget API requires a build step to compile JSX and we ship a single-file plugin.
- The `runBuild` async function with the canonical layout constants and order of operations: theme pills first, participant card on the left, then for each theme a row of insight stickies with a quote sticky directly underneath each, connected by a straight downward arrow.
- Colour palette constants (light blue for insights by default, yellow for quotes, violet outline for theme pills, light violet for participant card).
- Critical gotchas (`sticky.authorVisible = false` to hide the synth's name from each sticky, font loading in `Regular`/`Medium`/`Bold` before any text manipulation, `containsWidget` manifest requirement, mandatory use of `h()` instead of JSX).

**How the user runs the plugin** (include this in your sharing message):
1. Open Figma desktop (web doesn't support local plugin development).
2. **Plugins → Development → Import plugin from manifest…**
3. Pick `{workspace}/{participant-slug}-figjam-plugin/manifest.json`.
4. Open or create a FigJam board for the synthesis.
5. **Plugins → Development → {Participant} FigJam Build** → the widget drops onto the canvas.
6. Click the widget. Use the floating toolbar above it (or right-click → property menu) to click **Build**.
7. Toast confirms: "Built N themes, M insights." Delete the widget once done.

### Output B: the markdown text file

Save to `{workspace}/{participant-slug}-interview-synthesis.md`.

Use this exact structure — consistent format is what makes the files mergeable later:

```markdown
# {Project} Interview {N} — {Participant Name}

- **Participant:** {Name}
- **Role:** {Role}
- **Date:** {Date}
- **Synthesizer:** {Synthesizer first name}
- **Sticky colour:** {Colour name} {hex}
- **Total insights:** {N} across {M} themes ({per-theme counts e.g. 5+5+4+5+4})

---

## Theme 1: {Theme name}

### {Insight 1 title}
{Insight 1 body — 1-3 sentences.}

**Quote:**
> {Verbatim quote from transcript, untruncated.}

### {Insight 2 title}
{Insight 2 body.}

**Quote:**
> {Verbatim quote.}

---

## Theme 2: {Theme name}

### {Insight 1 title}
{Insight 1 body.}

**Quote:**
> {Verbatim quote.}

...
```

Notes on the text file:
- Use `> ` blockquote for the verbatim quote — same line breaks preserved.
- One blank line between elements.
- Themes separated by `---` for visual scanning.
- The header metadata block lets future runs of the skill (or Claude in another session) immediately understand what they're looking at.
- For insights the user has flagged as KEY in their notes, prefix the body with `**KEY INSIGHT.**` or a similar bold marker — this helps when the user later scans the text file for headline findings.

### Sharing both outputs with the user

After both outputs exist, tell the user concisely:
- A `computer://` link to the `manifest.json` and to the `code.js`.
- A `computer://` link to the markdown text file.
- A one-line summary: "{N} insights across {M} themes for {Participant}."
- A short note on how to run the plugin (Plugins → Development → Import plugin from manifest…), since most users won't have this memorised.
- A nudge toward the next step: "When you're ready with the next interview, run me again — once you have several text files, we can do a cross-interview synthesis."

If the user has prior interview text files in the same project, end your response by surfacing one or two cross-interview themes you can already see emerging — convergent threads, outliers, or contradictions. This is high-value commentary that's easy to produce while you have the latest interview fresh.

## Color palette (auto-assigned per interview)

Each interview's insights get a distinct colour so when multiple boards are eventually combined (or compared side by side) the rows stay distinguishable. Assign in this order, cycling if needed:

1. Light Blue (`#B3D9FF`)
2. Mint / Teal (`#A8EFD2`)
3. Pink (`#F8BBD0`)
4. Purple (`#B39DDB`)
5. Light Orange (`#FFCC80`)
6. Light Green (`#C5E1A5`)
7. Lavender (`#DCCFF5`)
8. Blue (`#90CAF9`)
9. Cyan (`#B2EBF2`)
10. Light Gray (`#E0E0E0`)

For a single-interview run, you usually don't know what colours are already used in the project. Default to Light Blue (#1) unless the user says otherwise. If the user has prior text files in this project and tells you the prior colour, pick the next one in the cycle.

Quotes are always **Yellow** (`#FFF176`). Theme pills are always **Violet outline** (`#A58AEA`). Participant card is **Light Violet** (`#E9DFFA`).

## Edge cases and pitfalls

- **User asks for multiple interviews in one run**: Explain the one-at-a-time approach (see "When to use this skill" above), then do the first one.
- **User has notes but no transcript**: Generate the markdown and plugin, but explicitly label paraphrased material (e.g., `> [Paraphrased from facilitator notes] …`) rather than presenting paraphrase as verbatim.
- **A theme has nothing substantive from this participant**: Show the theme pill but leave the cell empty. In the text file, write the theme heading and a single line: "*No substantive content from this interview on this theme.*"
- **Discussion guide has 8+ themes**: Push back. Recommend consolidating to 3–6. A board with too many themes becomes unreadable.
- **Very long quotes (>15 lines)**: Don't truncate, but note in chat that the sticky will be visually dominant. Offer to split if there's a natural break.
- **Figma manifest validator error "containsWidget expected true but got undefined/boolean"**: This is what happens when `editorType: ["figjam"]` is in the manifest without `containsWidget: true`. The template in the layout reference is correct — copy it exactly, don't simplify.
- **Figma syntax error "Unexpected token <"**: This means JSX was shipped without a build step. The widget code.js MUST use `widget.h(Component, props, ...children)` instead of JSX, because we ship a single-file plugin with no compile step. The template in `references/figjam-layout.md` uses `h()` calls — don't rewrite it with JSX.
- **User wants quotes beside insights instead of below**: Don't. The canonical layout is non-negotiable for cross-board consistency. If the user insists, do it but explain that subsequent runs will revert to the canonical layout.
- **User wants to run via Figma MCP instead of importing the plugin**: Possible but rate-limit-prone. Only do it if explicitly requested. The code inside the `runBuild` function is reusable as the body of a `use_figma` call; in that case skip the widget wrapper and pass the build code directly with the file's `fileKey`.

## Quality bar before you declare done

Mental checklist before sharing the outputs:

- `manifest.json` exists in the workspace folder at `{slug}-figjam-plugin/manifest.json`
- `manifest.json` includes `editorType: ["figjam"]`, `containsWidget: true`, `widgetApi: "1.0.0"`, `main: "code.js"`
- `code.js` exists alongside, contains a registered Builder widget with a `Build` property-menu action
- `code.js` uses `widget.h()` calls, NOT JSX (no `<AutoLayout>` or `<Text>` tags anywhere)
- Quote stickies sit directly BELOW each insight sticky, same X coordinate, separated by `INSIGHT_QUOTE_V_GAP`
- Connectors run from insight `BOTTOM` magnet to quote `TOP` magnet, `STRAIGHT` line type, arrow head at the quote end
- Theme pills sit ABOVE the row of insight stickies, each pill's width spans its insights
- Participant card is a frame (not a shape-with-text), placed on the far left at the insight row's Y
- Inside `code.js`: themes data, participant data, insight colour hex, synthesizer name all match the markdown
- Markdown file exists at `{slug}-interview-synthesis.md` with the exact structure above
- Markdown's header block has participant, role, date, synthesizer, sticky colour, total insight count
- Insight titles and bodies match between `code.js` and the markdown (same wording, in both places)
- No quote is truncated in either output
- The slug used for the folder name and the markdown filename are consistent

If any of these are off, fix before sharing.
