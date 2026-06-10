---
title: Debug trace
discipline: dev
type: recipe
tags:
  - debugging
  - errors
  - troubleshooting
added_by: julian
added_on: 2026-05-27T00:00:00.000Z
status: stable
source:
  kind: curated
spice: medium
downloads_week: 13
pack: true
summary: >-
  Systematic debugging, state the error, form hypotheses in order of likelihood,
  and test each one before jumping to a fix.
---

## What it does
Walks through a bug systematically, traces the error to its root cause before suggesting a fix. Stops Claude jumping straight to a guess that misses the real problem.

## When to use
- When you have an error you can't immediately explain
- When you've tried two obvious fixes and neither worked
- When you want to understand why, not just get it patched

## The skill

I have a bug. Before suggesting any fix, work through this process:

1. **Restate the error.** What exactly is happening? What was expected?
2. **Trace the path.** Walk through the code or system involved, step by step. Where could this break?
3. **Form hypotheses.** List 3–5 possible causes, ranked by likelihood.
4. **What to check first.** For the top 2 hypotheses, what's the fastest way to confirm or rule each one out?
5. **Then suggest a fix**, only once we've narrowed it down.

Don't jump to the fix. Don't guess. If you need more information to form hypotheses, ask for it.

Here's the bug:

[describe what's happening, paste the error message, paste relevant code]
