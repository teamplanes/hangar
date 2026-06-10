---
name: sow-generator
description: >
  Generate a professional Statement of Work (SOW) .docx file for Planes Agency client engagements,
  using Planes' branded template design. Use this skill whenever Ryan asks to create, draft, or update
  a Statement of Work, SOW, or client contract — for any of the four contract types Planes uses.
  Trigger on phrases like: "create an SOW for [client]", "draft the contract", "write up the SOW",
  "generate an SOW", "new statement of work", "put together an SOW", "turn this proposal into a contract".
  Also trigger when Ryan mentions a new project has been won and a contract is needed.
---

# SOW Generator

Produce a complete, client-ready Statement of Work by:
1. Extracting everything possible from the source documents (proposal PDF, emails, etc.)
2. Researching the client's legal name online
3. Asking Ryan only about genuine gaps — one grouped message, not one question at a time
4. Choosing the right contract type
5. Running the generator script to produce a branded `.docx`

---

## Step 1 — Extract from source documents

Read everything Ryan has provided before asking him anything. This means proposal PDFs, emails,
briefs, or prior SOWs. Extract:

- Client name and project name
- Project description and context
- Objectives
- Approach — the structure and activities of the engagement, drawn verbatim from the source proposal
- Phase/sprint structure — names, durations, dates, activities, outcomes (take from the proposal; do not invent)
- Team members or roles, and day rates (exact figures — take from proposal or ask)
- Phase costs and total (do not calculate or assume — take from proposal or ask)
- Start and end dates
- Client contact name and role
- Deliverables, out-of-scope items, assumptions
- Ways of working, any specific client preferences

**Never fabricate commercial information.** Rates, costs, and team must come from the proposal or
from Ryan explicitly. The proposal's commercials or cost breakdown slide is the source of truth.

---

## Step 2 — Research the client's legal name

Use web search to find the client's full legal trading name as it appears on official documents.
The privacy policy page or Companies House are reliable sources.
Example: "Amtivo Group Limited" rather than just "Amtivo".

---

## Step 3 — Ask Ryan about gaps

After extracting and researching, present a summary of what you've found and ask about what's missing
in a single message. Include:

- Any unknown fields (client contact, dates)
- Which contract type you're recommending and why (one sentence) — ask Ryan to confirm
- Whether any expenses are expected
- Anything inconsistent or ambiguous in the source material

---

## Contract Type Guide

Choose based on the engagement structure:

| Type | Key Characteristic | Label for document |
|---|---|---|
| `gated_fixed_phase` | Multi-phase; client commits phase by phase at each gate | Gated Fixed Phase Cost |
| `fixed_budget_scope` | Single fixed price, defined deliverables, committed upfront | Fixed Budget and Scope |
| `fixed_cost_discovery` | Standalone discovery/research phase only, no build commitment | Fixed Cost Fixed Scope Discovery |
| `time_and_materials` | Ongoing/retainer; billed monthly on time logged | Time and Materials (T&M) |

**`gated_fixed_phase` is the most common** — use it for multi-phase strategy, design, and build
projects where scope for later phases isn't fully defined at the start.

---

## Step 3b — Read the playbook for the chosen contract type

Before building the config, **read the playbook file** for the contract type you have selected:

```
assets/playbook/time-and-materials.md
assets/playbook/gated-fixed-phase.md
assets/playbook/fixed-budget-and-scope.md
assets/playbook/fixed-cost-discovery.md
```

The playbook contains **standard boilerplate text** for sections like Scope Changes, Engagement Model,
Ways of Working, Acceptance and Completion, Warranty, Invoicing, and Cancellation. Use this wording
verbatim (or near-verbatim) when populating those fields in the config JSON. Do not write your own
versions of these sections — the playbooks exist precisely so that Planes' contracts use consistent,
pre-approved language.

The rule is simple: **playbook copy for standard sections, Ryan's input for everything project-specific.**

| Take from the playbook | Take from Ryan / the proposal |
|---|---|
| Scope Changes text | Project overview |
| Engagement Model description | Objectives |
| Ways of Working (standard items) | Team, roles, day rates |
| Acceptance and Completion | Dates, client contact |
| Warranty | **Approach — always from the source proposal** |
| Invoicing cadence and payment terms | Phase structure and costs |
| Cancellation clause | Out-of-scope items, client responsibilities |

---

## MANDATORY: Approach Overview section

**The Approach Overview section must always be completed. Never leave it empty.**

Populate it directly from the source proposal or brief — do not use generic placeholder text.

The format is **Option A** for all contract types:

1. **Prose intro** (`approach_intro` or `approach_summary`) — 1-2 sentences describing how the
   engagement is structured, drawn from the proposal.
2. **Activities table** (`activities`) — a two-column table of Activity | Outcome pairs, taken
   directly from the proposal's activities, phases, or workstream descriptions.

For multi-phase contracts (`gated_fixed_phase`, `fixed_budget_scope`), use the phase structure
from the proposal as the activities — one row per phase, with the phase purpose as the Activity
and the expected output as the Outcome.

If the source proposal does not describe activities explicitly, derive them from the objectives
and phase descriptions — but always populate the section with real content.

---

## Step 4 — Build the config JSON

Create a JSON file with all project details. Use this schema — include every field you have;
omit or use `null` for anything genuinely unknown.

```json
{
  "contract_type": "gated_fixed_phase",
  "client_name": "[Client short name, e.g. Acme]",
  "client_legal_name": "[Full legal name, e.g. Acme Corp Limited]",
  "project_name": "[Project name as it appears in the proposal]",
  "date": "[Date SOW is issued, e.g. 25 March 2026]",
  "engagement_model_label": "Gated Fixed Phase Cost",
  "project_overview": "[2-3 sentence description of the engagement and context]",
  "start_date": "[e.g. 7 April 2026]",
  "completion_date": "[e.g. ~30 June 2026 (indicative)]",
  "client_contact_name": "[Name or TBC]",
  "client_contact_role": "[Role or TBC]",
  "planes_contact": "[Lead Planes contact, e.g. Ryan Lock]",
  "gsa_note": "This SOW is governed by the terms of the General Services Agreement between Planes Agency and [Client legal name].",
  "objectives": [
    "[Objective 1 from proposal]",
    "[Objective 2]"
  ],
  "completion_handover_text": "[When the project is deemed complete and how handover works]",
  "scope_changes_text": "Any changes to the scope, services, or deliverables must be agreed in writing by both parties prior to implementation.",
  "approach_intro": "[1-2 sentence framing of the engagement structure, from the proposal]",
  "gating_text": null,
  "activities": [
    { "activity": "[Activity or phase name]", "outcome": "[Expected output or result]" }
  ],
  "phases": [
    {
      "name": "[Phase name, e.g. Phase 0: Discovery & Alignment]",
      "duration": "[e.g. 1 week]",
      "dates": "[Indicative date range]",
      "description": "[What this phase is about]",
      "activities": [
        "[Activity 1]",
        "[Activity 2]"
      ],
      "outcomes": [
        "[Outcome 1]",
        "[Outcome 2]"
      ],
      "cost": "[e.g. £12,000]"
    }
  ],
  "deliverables": [
    {
      "name": "[Deliverable name]",
      "detail": "[One sentence description]"
    }
  ],
  "ways_of_working": [
    { "title": "Agile Delivery", "text": "[How Planes will run the engagement]" },
    { "title": "Remote-first Collaboration", "text": "[Tools and approach]" },
    { "title": "Status & Meetings", "text": "[Meeting cadence]" },
    { "title": "Communication", "text": "[Primary comms channel]" }
  ],
  "client_responsibilities": [
    "[Responsibility 1]",
    "[Responsibility 2]"
  ],
  "out_of_scope": [
    "[Out of scope item 1]",
    "[Out of scope item 2]"
  ],
  "team": [
    { "role": "[Role title]", "day_rate": "[e.g. £1,105]" }
  ],
  "roles_intro": null,
  "roles_footnote": "[Optional footnote, e.g. discount note. null if none.]",
  "cost_breakdown_note": "[Note that phase costs are indicative and confirmed before each phase begins]",
  "total_cost": "[e.g. £50,000 or £40,000 - £60,000 if a range]",
  "invoicing_intro": "The invoicing schedule is as follows:",
  "invoicing": [
    { "phase": "[Phase name]", "amount": "[e.g. £12,000]", "timing": "[e.g. At project start]" }
  ],
  "invoicing_notes": "All invoices are to be paid within 30 days of issue.",
  "cancellation_text": "This Statement of Work may be cancelled with 30 days' written notice. Any work completed prior to the cancellation date will be invoiced at the agreed phase rates.",
  "signatures": [
    { "name": "Ryan Lock", "role": "Director", "org": "Planes Agency Limited" },
    { "name": "[Client signatory or TBC]", "role": "[Role or TBC]", "org": "[Client legal name]" }
  ]
}
```

**Fixed Budget/Discovery note:** `team` entries use `name`, `role`, and `allocation` (e.g. `"100%"`)
instead of just `role`/`day_rate`.

**T&M note:** No `phases` or `cost_breakdown_note` needed. Use `invoicing_text` (a plain paragraph)
instead of the `invoicing` array.

---

## Step 5 — Run the generator

Find the skill's base directory (it's wherever this SKILL.md lives) and run:

```bash
SKILL_DIR="<path to this skill's directory>"

python "$SKILL_DIR/assets/generate_sow.py" \
  --template "$SKILL_DIR/assets/template.docx" \
  --config /tmp/sow_config.json \
  --output "/path/to/client/folder/Statement of Work - [Client] [Project].docx"
```

Save the output to the client's folder in the workspace:
`/[workspace]/[Client Name]/Statement of Work - [Client] [Project].docx`

Create the client folder if it doesn't already exist.

---

## Step 6 — Validate and deliver

Run the docx skill validator if available, otherwise open in Word to spot-check.

Check the output for:
- Cover page: client name, project name, date populated correctly
- Header: shows "Planes <> [Client]"
- All sections present and correctly numbered
- **Approach Overview section is populated** — prose intro and activities table both present
- No placeholder text remaining (`[TBC]` is acceptable for genuinely unknown fields)
- Tables formatted cleanly with correct data

Provide Ryan with a clickable link to the file and flag any `[TBC]` fields he needs to complete
before sending to the client.

---

## Smart quote guide

Use these XML entities in config text to produce proper typography:
- `\u2019` -> ' (apostrophe)   `\u2018` -> ' (open single)
- `\u201C` / `\u201D` -> " " (double quotes)
- `\u2013` -> - (en dash)   `\u2014` -> -- (em dash)
- `\u223C` -> ~ (tilde)

Or just use straight quotes -- they'll render fine in Word.
