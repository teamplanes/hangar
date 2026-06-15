---
name: platform-cost-estimate
description: >-
  Estimate the ongoing third-party running costs for a software product or build
  and write it up as a structured Notion page. Use whenever someone at Planes
  wants to scope what a build will cost to run: "ongoing costs", "running
  costs", "hosting costs", "what would it cost to run", "cost estimate for
  [client]", "infrastructure costs", "third-party costs", "platform costs", "put
  together a quote for running X", "how much will the stack cost", or when a
  client asks for cost estimates for a new product or feature. Trigger even if
  no specific service is named and even if they only describe the product. It
  asks what is being built, proposes a stack the user can edit, researches
  current pricing live, models light/moderate/heavy scenarios and cost
  thresholds, and writes it up in Notion with sources. Do NOT use for one-off
  "what does service X cost" lookups, for invoicing money already spent, or for
  Planes' own internal SaaS spend.
title: Platform cost estimate
discipline: new-business
type: skill
tags:
  - costs
  - pricing
  - estimating
  - scoping
  - notion
added_by: fiona
added_on: '2026-06-15'
status: draft
summary: >-
  Turns a rough product brief into a credible, sourced estimate of its ongoing
  running costs, written up as a Notion page.
spice: mild
source:
  kind: original
pack: true
---
# Platform cost estimate

This skill turns a rough product idea into a credible, sourced estimate of its ongoing running costs, written up as a Notion page. It exists because Planes is repeatedly asked "what will this cost to run?" for client builds, and the honest answer needs current pricing (which changes constantly), a stack that fits the specific product, and an explanation of what drives the cost up or down, not just a single number.

The single most important behaviour: **propose the stack, let the user edit it, then research pricing live every time.** Bundled pricing in `references/stack-pricing.md` is a starting point and a fallback, never the final source. Vendors change prices and tiers often, so the estimate is only trustworthy if the figures were checked on the day.

## Workflow

Work through these phases in order. Phases 1 and 2 are a short conversation; do not skip ahead to research before the user has confirmed the stack, because researching the wrong services wastes time and anchors the estimate on the wrong thing.

### 1. Understand what is being built

Ask the user about the product before proposing anything. In Cowork, use the question tool (AskUserQuestion) so the answers are quick to give. Keep it to the few things that actually change the stack and the numbers:

- **What is the product?** A short description, and which archetype it most resembles (content / marketing site, web app or SaaS, assessment or questionnaire tool, internal tool, ecommerce, mobile app backend). See `references/stack-pricing.md` for archetype-to-stack mappings.
- **Who uses it and at what scale?** Rough number of client organisations, end users, and the headline volume driver (monthly traffic / sessions, or users and "units" like reports, assessments, transactions).
- **Any hard requirements?** Especially compliance and data residency (ISO 27001, SOC 2, UK-only data, HIPAA-style controls), payments, SSO per client, or anything the client has already specified. These move the floor materially, so surface them early.
- **Does it use AI?** If so, what for (report/insight generation, search, classification, images) and roughly how often.

If the user already gave this detail (for example, they pasted a client brief), do not re-ask. Extract what you can and only ask about genuine gaps.

### 2. Propose a stack, then let the user edit it

From the archetype and answers, propose a concrete list of services using `references/stack-pricing.md`. Present it as a clear, editable list grouped by function (hosting, CMS, auth, database, analytics, email, AI, payments, support, etc.), with a one-line "why this / when you would drop it" for each. Default to Planes' usual stack (Vercel, Sanity, Stytch, Supabase, PostHog, Resend, an AI provider) and only include optional services (Stripe, Baremetrics, Intercom, and others in the catalogue) when the product calls for them.

Then **explicitly invite edits before doing any research**: the user can add, remove, or swap services. This matters because the person scoping the build knows things the brief does not, and a quote built on the wrong stack is worse than useless. Only proceed once they confirm.

### 3. Research current pricing, live

For every confirmed service, get today's pricing. The bundled catalogue in `references/stack-pricing.md` exists to tell you which services exist and how each vendor's pricing is *shaped* (which plans, included allowances, and overage units to look for), and to act as a fallback if a page genuinely will not load. It is **not** the source of the numbers. Never copy a figure from the catalogue into a client estimate without confirming it live, because its prices are a dated snapshot and will drift.

- Fetch the vendor's pricing page (the `sourceUrl` in the catalogue) and read the current plan, included tiers, and overage rates as they are today.
- For AI models, do not just re-confirm the models the catalogue happens to list. Model lineups change fast: check the provider's **current** model range, look for newer or cheaper models and any deprecations, and price against what is actually available now. The catalogue's model list is illustrative, not complete.
- Likewise, watch for vendors renaming plans, restructuring tiers, or changing included allowances since the snapshot. Trust the live page over the catalogue whenever they disagree.
- If a fetch returns a JavaScript shell with no real numbers, search the web for the current pricing instead, and prefer the vendor's own page or a clearly dated third-party summary. Check beyond the official page when a figure is unclear.
- Record, per service, the figures used, the source URL, and the date checked. If a rate genuinely cannot be confirmed, mark it as an unverified placeholder rather than guessing.
- If you notice the catalogue is materially out of date (a price moved a lot, a model is gone, a tier was renamed), mention it in your chat summary so `references/stack-pricing.md` can be refreshed for next time.

Note the current USD-to-GBP rate (search for it) since most vendors bill in USD and Planes quotes in GBP.

### 4. Build the cost model

Assemble the numbers into the structure in `references/notion-page-structure.md`. Cover:

- **Baseline fixed platform costs**: per service, what is included and the likely monthly cost at this scale. Apply free tiers and usage credits first, then overage. Many services sit in free or low-fixed tiers for small products, so do not inflate this.
- **AI / usage costs**: cost per unit (e.g. per report) across a budget-to-premium model range, then monthly cost at expected volume. Note that batching halves token cost and prompt caching cuts repeated-context cost by ~90%.
- **People time**: maintenance as days per month, shown at both the full senior day rate and a discounted retainer rate. Ask the team for Planes' current day rate (it is not stored in this skill) and flag the retainer discount as "to confirm" unless told otherwise.
- **Light / moderate / heavy scenarios**: a table showing how hard costs move with volume.
- **Thresholds**: the specific points (seat counts, connection counts, MAU, event volumes, compliance tiers) where a cost steps up, grounded in the actual plan limits found in research.
- **Variables and caveats**: what swings the cost, and honest framing that these are estimates, not quotes.

Verify the arithmetic with a quick script rather than by hand, especially the AI per-unit maths and the scenario totals. Getting a number visibly wrong destroys trust in the whole estimate.

### 5. Write it up in Notion

Ask the user where the page should go (a parent page or an existing page URL) unless they have already said. Create the page following `references/notion-page-structure.md` exactly: methodology and assumptions up top, the sections above, a sources list, and a "pricing verified as of [date]" stamp with the FX rate used.

Then give a short summary in chat with the link and the headline numbers (fixed platform, AI range, people time, grand total), plus the one or two things most likely to move the figure.

## House style (Planes)

These are not optional polish; they are how Planes writes, and getting them wrong means the user has to redo the page.

- **No em-dashes anywhere.** Use colons, commas, parentheses, or a rewrite. This is a firm house rule.
- Write in prose and clear tables, not walls of bullets. Reserve bullets for genuine lists.
- Every figure must be traceable to a linked source. An estimate without sources is not usable for a client.
- Lead with the honest headline (often "the platform is cheap, people time dominates") rather than burying it.
- Keep claims sense-checked against the product: do not pass through a service or tier that does not fit what is being built.

## Reference files

- `references/stack-pricing.md` : the candidate service catalogue, archetype-to-stack mappings, and seed pricing with sources and last-verified dates. Read this in phase 2 to propose the stack and in phase 3 to know what to verify.
- `references/notion-page-structure.md` : the exact Notion page template and section order to follow in phase 5. Read it before writing the page.
