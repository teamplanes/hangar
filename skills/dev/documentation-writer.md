---
title: Documentation writer
discipline: dev
type: prompt
tags: [documentation, readability, handoff]
added_by: julian
added_on: 2026-05-27
status: stable
source:
  kind: original
spice: mild
downloads_week: 8
summary: Turn a function, module, or system into clear documentation written for the person who hasn't read the code.
---

## What it does
Takes code and produces documentation written for the reader who doesn't have your context, clear, honest about edge cases, and actually useful.

## When to use
- Before a handoff
- When writing a README or internal wiki entry
- For any function or module that's doing something non-obvious

## The skill

I'm going to share some code. Write documentation for someone who hasn't seen it.

Include:
1. **What it does**, one sentence, plain language.
2. **How to use it**, a minimal working example.
3. **Parameters / inputs**, name, type, what it expects, what happens if it's wrong or missing.
4. **What it returns**, type and shape.
5. **Edge cases and gotchas**, what breaks, what surprises, what to watch out for.
6. **What it doesn't do**, explicit non-goals or out-of-scope behaviour.

Write for a competent developer with no context on this codebase. Don't explain the language. Do explain the decisions.

Here's the code:

[paste code]
