# Stack catalogue and seed pricing

Use this to propose a stack (phase 2) and to know what to verify (phase 3). Every figure below is a snapshot last verified **2026-06-10**. Treat it as a starting point and a fallback only, never the source of the numbers in a client estimate. Always re-check the live `sourceUrl`, because vendors change prices and tiers frequently.

The lists of AI models and vendor plans below are illustrative, not complete or current. New models launch and old ones are deprecated constantly, and tiers get renamed and restructured. In phase 3, check each provider's current lineup live rather than assuming the items named here are still the right or cheapest options. If you find this file is materially out of date, flag it so it can be refreshed.

All prices are the vendor's published list price in their billing currency (mostly USD). Convert USD lines to GBP at the current rate (search for "USD to GBP today"); the snapshot rate on 2026-06-10 was 1 USD = 0.7468 GBP.

## Archetype to stack mapping

Use as a default; always adjust to the specific product.

- **Content / marketing site**: Vercel (hosting), Sanity (CMS), PostHog (analytics). Traffic-driven. AI and search optional. Often no database or auth needed.
- **Web app / SaaS**: Vercel, Supabase (database), Stytch (auth), PostHog, Resend (email). Add Stripe if it takes payment, Intercom for in-app support, Baremetrics if subscription billing needs analytics.
- **Assessment / questionnaire tool**: Vercel, Supabase, Stytch, PostHog, Resend, plus an AI provider for report generation. Low traffic, usage-driven by users and reports. This is the "AIR" shape.
- **Internal tool**: Vercel, Supabase, Stytch. Minimal analytics, no marketing services.
- **Ecommerce**: Vercel, Sanity or a commerce backend, Stripe, PostHog, Resend.

People time (maintenance) is a line on every estimate regardless of archetype.

## Core services

### Vercel (hosting / compute) : https://vercel.com/pricing
- Pro: 20 USD/mo per developer seat, includes 20 USD/mo usage credit; viewer seats free.
- Included on Pro: 1 TB fast data transfer, 10M edge requests, 1M function invocations, 4 active CPU-hours, 360 GB-hrs memory, 1M ISR reads, 200K ISR writes.
- Overages: data transfer 0.15 USD/GB; edge requests 0.002 USD/1K; invocations 0.0006 USD/1K; ISR reads 0.0004 USD/1K; ISR writes 0.004 USD/1K; active CPU 0.128 USD/hr; build minutes 0.014 USD/min (standard).
- Add-ons: SAML SSO 300 USD/mo; HIPAA BAA 350 USD/mo.
- Certified SOC 2 Type 2, ISO 27001, PCI DSS, GDPR on all plans. Functions can be pinned to a London region; the edge CDN is global.

### Vercel Blob (file / document storage) : https://vercel.com/pricing
- Included on Pro: 1 GB storage, 10K simple ops, 2K advanced ops, 10 GB transfer.
- Overages: storage 0.023 USD/GB; simple ops 0.0004 USD/1K; advanced ops 0.005 USD/1K; transfer 0.05 USD/GB.
- Document/PDF storage for most apps sits inside the included tier.

### Sanity (CMS) : https://www.sanity.io/pricing
- Free plan for light use; Growth 15 USD/mo per editor seat (viewer seats free).
- Documents: 25,000 included; over 25K triggers a 299 USD/mo add-on (lifts to 50K).
- SAML SSO add-on: 1,399 USD/mo (Growth).

### Stytch (auth) : https://stytch.com/pricing
- B2B pay-as-you-go: 0 USD base. Free: 10,000 MAUs, unlimited organisations, 5 SSO/SCIM connections, 1,000 M2M tokens.
- Overages: additional SSO/SCIM connection 125 USD/mo each; brand removal 99 USD fixed add-on.
- The likely first real cost step for multi-client products is the 6th SSO connection (government / enterprise clients each wanting their own SSO).

### Supabase (Postgres database) : https://supabase.com/pricing
- Pro: 25 USD/mo, includes 10 USD compute credit (one Micro instance), 100,000 MAU, 8 GB disk, 100 GB file storage, 250 GB egress, daily backups (7-day).
- Compute tiers per project: Micro 10, Small 15, Medium 60, Large 110, XL 210 USD/mo.
- Overages: MAU 0.00325 USD each; disk 0.125 USD/GB; file storage 0.0213 USD/GB; egress 0.09 USD/GB. PITR +100 USD/mo per 7 days retention.
- Compliance caveat: the company is SOC 2 / ISO 27001 certified, but the SOC 2 report and formal coverage are only available on Team (599 USD/mo) or Enterprise; HIPAA is a paid add-on. Free tier pauses after a week of inactivity, so Pro is the realistic production floor. Region selectable at creation, including eu-west-2 (London) for UK residency.

### PostHog (analytics, error tracking, replays, flags) : https://posthog.com/pricing
- Usage-based, unlimited seats. Monthly free tiers: 1M analytics events, 100K error exceptions, 5K session replays, 1M feature-flag requests, 1,500 survey responses.
- Overages (first paid band): analytics 0.00005 USD/event; errors 0.00037 USD/exception; replays 0.005 USD/recording; flags 0.0001 USD/request; surveys 0.10 USD/response. Hard spend caps available.
- Hosting region US (Virginia) or EU (Frankfurt) only; no UK region. EU is GDPR-adequate but German soil, which matters if a client demands UK residency.

### Resend (email / notifications) : https://resend.com/pricing
- Free: 3,000 emails/mo (100/day, 1 domain). Pro 20 USD/mo: 50,000 emails, 10 domains. Scale 90 USD/mo: 100,000 emails. Overage 0.90 USD per 1,000 emails. Dedicated IP add-on 30 USD/mo.

### AI model providers (report / insight generation)
Rates are USD per 1M tokens (input / output). Sources: https://platform.claude.com/docs/en/about-claude/pricing , https://openai.com/api/pricing/ , https://ai.google.dev/gemini-api/docs/pricing
- Gemini 2.5 Flash-Lite: 0.10 / 0.40 (budget)
- GPT-5 mini: 0.125 / 1.00 (budget)
- Gemini 2.5 Flash: 0.30 / 2.50 (low-mid)
- GPT-5: 0.625 / 5.00 (mid)
- Claude Haiku 4.5: 1.00 / 5.00 (mid)
- Claude Sonnet 4.6: 3.00 / 15.00 (high-mid)
- Claude Opus 4.8: 5.00 / 25.00 (premium)
- GPT-5.5: 5.00 / 30.00 (premium)
- Per-unit AI cost = (input tokens / 1,000,000 x input rate) + (output tokens / 1,000,000 x output rate), times units per month. A "presentation-ready" report is realistically multi-pass: a sensible mid-case is ~150K input + 30K output tokens per report. Batching halves cost; prompt caching cuts repeated-context input by ~90%.

## Optional services (include only when the product needs them)

### Stripe (payments) : https://stripe.com/gb/pricing
- No monthly fee on standard. UK domestic cards 1.5% + 0.20 GBP; EEA cards 2.5% + 0.20 GBP; international cards 3.25% + 0.20 GBP (model as base plus cross-border surcharge). GBP-native, no FX conversion. Drive from monthly payment volume and card mix.

### Baremetrics (subscription analytics) : https://baremetrics.com/pricing
- Tiered, broadly from ~129 USD/mo and scaling with tracked MRR (up to ~1,000 USD/mo). Exact tier thresholds were not cleanly published at last check, so confirm the current tier against the live page and mark as a placeholder if unsure.

### Intercom (on-site support / messaging) : https://www.intercom.com/pricing
- Per-seat (monthly billing): Essential 39 USD/seat/mo, Advanced 99 USD/seat/mo, Expert 139 USD/seat/mo (annual billing is cheaper). Fin AI: 0.99 USD per resolution. Fin Copilot: 29 USD/agent/mo. Drive from plan, seat count, expected Fin resolutions per month.

### Other services that come up (research live if chosen)
Twilio (SMS / OTP, per message), Algolia (hosted search), Sentry (error monitoring, an alternative to PostHog), Bynder or similar DAM (media), Cloudflare, and domain/TLD renewal. None have seed pricing here; research them live if the user adds them.

## People time
- Day rate: this skill does not store Planes' day rate. Ask the team for the current published senior day rate (or check the internal rate card) and use that figure. Do not guess one.
- Retainer: a committed package (commonly 4 days/month) usually carries a reduction. Show both the full rate and a discounted rate, taking the current discount from the team, and flag the discount percentage as "to confirm" unless the user states it.
- Typical maintenance effort: bug fixes / dependency updates / security patches 1 to 2 days/month, monitoring / incident response 0.5 to 1 day/month, minor iterations as needed. Roughly 2 to 4 days/month total.
