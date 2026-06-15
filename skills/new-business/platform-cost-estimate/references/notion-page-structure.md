# Notion page structure

Follow this section order and style when writing up the estimate (phase 5). It mirrors the format Planes has used and found effective. Create the page with the Notion update/create tools using the workspace's enhanced markdown (tables as `<table header-row="true">` with `<tr><td>` rows; links as `[text](url)`; bold as `**text**`). Remember the house rules: no em-dashes, sources on every figure, GBP primary with a stated FX rate and verification date.

When creating the page, ask the user for the parent page or an existing page URL first, unless they already told you where it goes. Give the page a clear title like "[Client / product] ongoing costs estimate".

## Section order

**1. Methodology and assumptions callout (top of page).**
A short callout (`>`) stating: the date pricing was verified, that figures are list prices with sources linked per line, the product scale being modelled, the FX rate used (e.g. 1 USD = 0.7468 GBP with its source and date), and the assumed stack. Follow it with a one or two sentence **Headline** giving the honest bottom line (often: the platform is cheap at this scale, AI is a modest variable, people time dominates).

**2. Baseline hosting, infrastructure and maintenance.**
A "Platform and infrastructure (monthly)" table with columns: Component, Plan / tier, What's included (relevant to this product), Likely cost here, Source. One row per service, then a Fixed platform subtotal row.
Then an "AI / report-generation costs" sub-section: a short paragraph on the token assumptions, then a per-unit table by model tier (Model, USD per 1M in/out, Cost per unit, Source), and a note on batching and prompt caching.
Then a "Maintenance (people time)" sub-section: an effort table (Activity, Estimated effort) and a day-rate table (Basis, Day rate, 4 days/month, Annual) showing full and discounted retainer rates, with the discount flagged "to confirm" if not stated.
Close with a bold "Baseline total" line summarising fixed platform + AI range + maintenance.

**3. Main variables that drive costs up or down.**
A short list (this is one place bullets are fine) of the real swing factors for this specific product: model choice, usage volume, seat/connection counts, compliance and data residency, retention. Explain each briefly and why it matters.

**4. Light / moderate / heavy usage scenarios.**
A table with Light / Moderate / Heavy columns and rows for the volume drivers (users, orgs, reports or sessions), fixed platform, AI at budget/mid/premium model, a bold hard-cost monthly total, maintenance days, and maintenance cost at full / retainer rates. State the scale assumption above the table.

**5. Thresholds where costs change materially.**
A two-column table (Threshold, What happens) grounded in the actual plan limits found in research: the points where a free tier ends, a seat or connection count steps up, compliance forces a higher tier, etc. Link the relevant source in each row.

**6. Still to confirm.**
A short list of the decisions that would tighten the estimate (model and architecture, SSO scope per client, compliance bar, whether a database is needed). This is honest and useful, not filler.

**7. Caveats.**
A short list: estimates not quotes, list prices verified on [date], FX drift, people time is the largest cost, and any product-specific risk (e.g. for government use, reliable AI output needs evaluation and guardrails outside running costs; procurement frameworks may affect pricing).

## After creating the page

Give the user a concise chat summary: the page link, the headline numbers (fixed platform per month, AI range, people-time retainer, grand total), and the one or two thresholds most likely to bite. Keep the postamble short; the value is the page, not a re-explanation of it.
