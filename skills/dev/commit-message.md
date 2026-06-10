---
title: Commit message writer
discipline: dev
type: prompt
tags:
  - git
  - commits
  - documentation
added_by: julian
added_on: 2026-05-27T00:00:00.000Z
status: stable
source:
  kind: curated
spice: lemon-and-herb
downloads_week: 9
summary: >-
  Write a clear conventional commit message from a diff or plain description of
  what changed.
---

## What it does
Writes a clean conventional commit message from a diff or description, following conventional commit format with a one-line summary and an optional body.

## When to use
- When you've made a change and want a proper commit message without overthinking it
- For code review prep, a good commit message makes the PR easier to review
- When a teammate's commit messages are chronically unhelpful and you want a template

## The skill

Here's what changed:

[paste your git diff, or describe the changes in plain language]

Write a commit message following conventional commit format:
- `type(scope): short description`, max 72 chars, imperative mood ("add" not "added")
- Blank line
- Body (optional): explain WHY, not what. What's the motivation? What would a reviewer want to know?

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`

If the change is large or touches multiple concerns, flag it, it may warrant splitting into separate commits.
