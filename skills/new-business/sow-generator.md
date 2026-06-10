---
title: "SOW generator"
discipline: new-business
type: skill
tags: ["sow", "contracts", "proposals", "docx", "new-business"]
added_by: ryan
added_on: 2026-06-10
status: stable
source:
  kind: original
spice: medium
pack: true
plugin_source: bundled
summary: Turn a won proposal into a complete, client-ready Statement of Work as a branded .docx, picking the right contract type and only asking about genuine gaps.
---

> Made at Planes by Ryan. Ships with the branded SOW template and a generator script, so installing the plugin gives you the whole toolkit, not just a prompt.

## What it does
Produces a finished, client-ready Statement of Work as a Planes-branded `.docx`. It reads everything from your source documents first (proposal PDF, emails, prior SOWs), researches the client's legal name, then asks you about only the real gaps in one grouped message, before generating the document.

## When to use
- A project's been won and you need the contract written up
- "Create an SOW for [client]", "draft the contract", "turn this proposal into an SOW"
- Any of the four contract types Planes uses (time & materials, gated fixed-phase, fixed budget & scope, fixed-cost discovery)

## How it works
1. **Extract** everything possible from the source docs: client, project, objectives, scope, team and rates, timeline.
2. **Research** the client's registered legal name.
3. **Ask** only about genuine gaps, grouped into one message.
4. **Pick the contract type** from the four playbooks the skill carries.
5. **Generate** the branded `.docx` via the bundled script.

## How to get it
It's in the New Business plugin (ships with the template + generator):

```
claude plugin marketplace add teamplanes/hangar
claude plugin install hangar-new-business@planes-hangar
```
