---
title: "Anthropic's prompt-caching pattern for long-running agents"
discipline: dev
type: skill
tags: ["claude-api", "caching", "performance", "cost"]
added_by: julian
added_on: 2026-05-15
status: stable
source:
  kind: curated
  url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
  credit: "Anthropic docs"
spice: extra-hot
usage_count: 8
downloads_week: 20
downloads_prev_week: 44
---

## What it does

A drop-in pattern for using Anthropic's prompt caching so long-running agents (tool loops, doc QA, code review bots) stop re-paying for the same context every turn.

## When to use

- The same large system prompt or document is sent on every turn
- An agent runs > 5 turns and re-sends prior context
- API spend is being pulled up by repeat-reads of the same files
- Latency budget matters

## The skill

Mark the static, reusable parts of your prompt with `cache_control: { type: "ephemeral" }`. The first request creates the cache (5-minute TTL by default). Subsequent requests within the window hit it and are billed at the discounted cached-read rate.

Rule of thumb at Planes:

1. **System prompt**: always cache if it's > 1k tokens.
2. **Large documents** (transcripts, design specs, code files) you'll reference more than once in a session: cache them.
3. **Tool definitions**: cache if you have more than ~3 tools or rich JSON schemas.
4. **The user's current turn**: never cache. It changes every time.

Place `cache_control` at the *last* block of the cacheable prefix, not on every block. The cache key is the full prefix up to that marker.

```python
messages = [
    {
        "role": "system",
        "content": [
            {"type": "text", "text": LARGE_SYSTEM_PROMPT},
            {"type": "text", "text": PROJECT_CONTEXT,
             "cache_control": {"type": "ephemeral"}},
        ],
    },
    {"role": "user", "content": user_turn},
]
```

Watch the response usage object for `cache_creation_input_tokens` (cache miss, you paid full freight) and `cache_read_input_tokens` (cache hit, you paid the discount). If the hit rate is low, your prefix isn't stable. Something dynamic snuck in.

## Notes

Cache TTL is 5 minutes. If your sessions span longer gaps, the cache will rebuild. That's fine and often still worth it. Don't bother with caching for one-shot prompts. The overhead isn't recouped. This is the single highest-leverage change on most agent loops we ship at Planes.
