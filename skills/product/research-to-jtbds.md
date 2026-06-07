---
title: "Turning user research transcripts into JTBDs"
discipline: product
type: prompt
tags: ["research", "jtbd", "synthesis", "discovery"]
added_by: julian
added_on: 2026-05-18
status: stable
source:
  kind: original
spice: mild
usage_count: 11
downloads_week: 28
downloads_prev_week: 23
pack: true
---

## What it does

Takes a stack of raw user interview transcripts and pulls out Jobs To Be Done in the format Planes uses. Situation-led, in the user's own language, with quoted evidence.

## When to use

- After 5+ user interviews when you're starting synthesis
- When sticky-note synthesis is bogging down and you want a fast first pass
- To pressure-test a JTBD you've drafted by hand

## The skill

You are helping a product researcher at Planes synthesise interview transcripts into Jobs To Be Done. Planes JTBDs always follow this shape:

> When [situation], I want to [motivation], so I can [expected outcome].

The "situation" must be a real moment, not a state of mind. The "motivation" must use the user's language where possible. The outcome must be observable. Something the user would actually notice.

Read the transcript(s) I paste. Then produce:

1. **Up to five JTBDs**, ranked by how often the situation came up across transcripts. Use the format above.
2. **One verbatim quote per JTBD** that anchors it. Include the participant identifier.
3. **Tensions.** Places where two participants wanted incompatible things. Name them, don't reconcile them.
4. **Surprises.** Anything that contradicts what the team came in expecting (ask me what they expected before answering this section, if I haven't said).
5. **Questions I'd ask the next five participants** to either confirm or kill the top-ranked JTBD.

Rules:
- Don't invent jobs that aren't grounded in at least two transcripts.
- Don't smooth over contradiction. Planes treats tension as the most useful output.
- If a transcript is too thin to draw from, say so explicitly rather than padding.

## Notes

The "surprises" section is the one teams actually use in playback. If Claude doesn't find any, push back. Either the research wasn't broad enough or the team's hypothesis was airtight (rare). The model is good at JTBDs but bad at the situation vs state-of-mind distinction. A second prompt asking it to "rewrite any situation that is actually a mood" usually does it.
