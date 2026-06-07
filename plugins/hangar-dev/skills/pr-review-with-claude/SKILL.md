---
name: pr-review-with-claude
description: "A two-pass PR review with Claude that catches the boring stuff *and* asks the questions a senior engineer at Planes would actually ask."
---

**Pass 1. Mechanics.** From the repo root:

```
gh pr diff <number> | claude -p "Review this diff. List, briefly: \
- correctness bugs you're confident in, \
- type/null/edge-case issues, \
- inconsistencies with the surrounding codebase. \
Don't list nits or style. Don't congratulate."
```

**Pass 2. Intent.** In the same Claude session:

> Now zoom out. What is this PR actually trying to do? Restate it in one sentence. Then tell me:
> - what would a senior engineer at this codebase push back on?
> - what's the smallest thing this PR is missing that would make me confident it shipped safely?
> - if I had to delete one of these changes, which one would I delete and why?

**Pass 3 (optional). Tests.** If the PR doesn't touch tests:

> Suggest the two highest-leverage test cases this PR should add. For each: the scenario, the expected outcome, and where the test should live in this repo.
