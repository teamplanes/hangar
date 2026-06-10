export type PromptExample = {
  title: string;
  lesson: string;
  bad: string;
  good: string;
  tag: string;
};

export const PROMPT_EXAMPLES: PromptExample[] = [
  {
    title: "Lead with the verb",
    tag: "A clear ask",
    lesson:
      "Soft verbs like 'help' and 'improve' leave the move unspecified. Name the one you'd write in a brief.",
    bad: "Help me with this proposal.",
    good:
      "Critique this proposal as if you were a sceptical client. List the three weakest claims, then rewrite the opening paragraph to land harder. Keep it under 120 words.",
  },
  {
    title: "Give it the material",
    tag: "The material it needs",
    lesson:
      "Describing the text makes the model guess at it. Paste the real thing and it has something to work from.",
    bad: "Make this clearer.",
    good:
      "Make this paragraph clearer for a non-technical reader. Match the voice of the two examples below.\n\n[paste two short paragraphs from our website here]\n\n[paste the paragraph to rewrite here]",
  },
  {
    title: "Name the shape",
    tag: "The shape of the answer",
    lesson:
      "With no shape specified, you get the model's default. Say what the output should look like.",
    bad: "Give me ideas for our blog.",
    good:
      "Generate 10 blog post ideas for a design studio's blog. Format each as: Title | One-line hook | Most likely reader. Bias toward titles that take a position rather than describe a topic.",
  },
  {
    title: "Say who it's for",
    tag: "Who it's for",
    lesson:
      "Same task, different reader, different answer. Naming who it's for tightens everything.",
    bad: "Explain prompt caching.",
    good:
      "You're a senior engineer onboarding a junior. Explain prompt caching in four short paragraphs, with one concrete Python example using the Anthropic SDK. Don't use the word 'leverage'.",
  },
];

export type Check = {
  key: string;
  label: string;
  hint: string;
  passed: boolean;
};

// Heuristic checks. Cheap signals only, tuned to how modern models behave:
// clarity and real context matter, ceremony (personas, word counts) much less.
// Not an evaluation, more like a checklist. It can't read your pasted material
// the way Claude will, so it stays deliberately rough.
export function checkPrompt(input: string): Check[] {
  const t = input.trim();
  const empty = t.length === 0;

  // 1. A clear ask: leads with a real task verb, not a soft "help with this".
  const hasClearAsk =
    !empty &&
    /\b(write|rewrite|draft|edit|summari[sz]e|rank|list|outline|plan|critique|review|compare|contrast|explain|describe|translate|classif|categori[sz]e|extract|generate|brainstorm|analy[sz]e|evaluate|score|name|suggest|convert|turn)\b/i.test(
      t,
    );

  // 2. The material it needs: real content pasted in, not just described.
  const hasMaterial =
    !empty &&
    (/```|~~~/.test(t) || // a code / paste fence
      /\[[^\]]{3,}\]/.test(t) || // a [paste ... here] placeholder
      /["“][^"”]{25,}["”]/.test(t) || // a quoted chunk
      /\n\s*\n/.test(t) || // a blank line, i.e. a body pasted below the ask
      t.length > 400); // long enough to carry the real thing

  // 3. The shape of the answer: format, structure or length is specified.
  const hasShape =
    !empty &&
    /\b(json|markdown|csv|xml|html|table|bullets?|numbered|list|steps?|headings?|columns?|rows?|paragraphs?|sentences?|tone:|voice:|format:|under \d+|max(imum)?|no more than \d+|in \d+|\d+ words?|one[- ]?liner|tl;?dr)\b/i.test(
      t,
    );

  // 4. Who it's for, or what good looks like: audience or success criteria.
  const hasFit =
    !empty &&
    (/\b(for (a|an|the|my|our) [a-z]+|audience|readers?|junior|senior|beginner|expert|customer|client|prospect|stakeholders?|exec(utive)?|onboarding|non[- ]?technical)\b/i.test(
      t,
    ) ||
      /\b(should|make sure|the goal is|aim(ing)? (for|to)|so that|good means|success|like the example|match the (voice|tone|style))\b/i.test(
        t,
      ));

  return [
    {
      key: "ask",
      label: "A clear ask",
      hint: "Lead with the move you want: rank, rewrite, draft, compare. Not just 'help with this'.",
      passed: hasClearAsk,
    },
    {
      key: "material",
      label: "The material it needs",
      hint: "Paste the real text, data or example instead of describing it. The single biggest win.",
      passed: hasMaterial,
    },
    {
      key: "shape",
      label: "The shape of the answer",
      hint: "Say what the output should look like: a table, five bullets, three sentences, JSON.",
      passed: hasShape,
    },
    {
      key: "fit",
      label: "Who it's for, or what good looks like",
      hint: "Name the reader or the bar to hit. Same task, different reader, different answer.",
      passed: hasFit,
    },
  ];
}
