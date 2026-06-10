export type PromptExample = {
  title: string;
  lesson: string;
  bad: string;
  good: string;
  tag: string;
};

export const PROMPT_EXAMPLES: PromptExample[] = [
  {
    title: "Add a role and a brief",
    tag: "Specificity",
    lesson:
      "A blank prompt leaves the model guessing. Give it a role, a reader, and the move you want.",
    bad: "Write me a marketing email.",
    good:
      "You are a B2B marketer at a SaaS company. Write a follow-up email to a prospect who attended our product demo two days ago and hasn't replied. Tone: warm, specific, no jargon. 80 words max. Open with a single line that reminds them of one demo moment. Close with one low-pressure ask.",
  },
  {
    title: "Constrain the shape",
    tag: "Output format",
    lesson:
      "If you don't say what the output should look like, you'll get the model's average. Name the structure.",
    bad: "Give me ideas for our blog.",
    good:
      "Generate 10 blog post ideas for a design studio's blog. Format each as: Title | One-line hook | Most likely reader. Bias toward titles that take a position rather than describe a topic.",
  },
  {
    title: "Lead with the audience",
    tag: "Audience",
    lesson:
      "Same content, different reader, different output. Naming the audience tightens everything.",
    bad: "Explain prompt caching.",
    good:
      "You're a senior engineer onboarding a junior. Explain prompt caching in four short paragraphs, with one concrete Python example using the Anthropic SDK. Don't use the word 'leverage'.",
  },
  {
    title: "Show your taste",
    tag: "Examples",
    lesson:
      "One pasted example beats five lines of instructions. If you can show the model what 'good' looks like, do.",
    bad: "Make this clearer.",
    good:
      "Make this paragraph clearer for a non-technical reader. Match the voice of the two examples below.\n\n[paste two short paragraphs from our website here]\n\n[paste the paragraph to rewrite here]",
  },
  {
    title: "Swap the verb",
    tag: "Specific verbs",
    lesson:
      "Words like 'help' and 'improve' are too soft. Pick the verb you'd write in a brief.",
    bad: "Help me with this proposal.",
    good:
      "Critique this proposal as if you were a sceptical client. List the three weakest claims, then rewrite the opening paragraph to land harder. Keep it under 120 words.",
  },
  {
    title: "Name what to avoid",
    tag: "Constraints",
    lesson:
      "Telling the model what *not* to do is faster than re-prompting after it does it.",
    bad: "Write a credentials section for our deck.",
    good:
      "Write the credentials section of a deck for a London product studio. Three projects, each with: client, problem, the move that mattered, the outcome. Rules: short sentences, named work over abstractions, no 'passionate about', 'robust' or 'leverage'.",
  },
];

export type Check = {
  key: string;
  label: string;
  hint: string;
  passed: boolean;
};

// Heuristic checks. Cheap signals only. Not an evaluation, more like a checklist.
export function checkPrompt(input: string): Check[] {
  const t = input.trim();
  const lower = t.toLowerCase();
  const wordCount = t.split(/\s+/).filter(Boolean).length;

  // Nothing pasted yet: every check is unmet, so the panel reads 0 of 7
  // rather than falsely passing the negative checks.
  const empty = wordCount === 0;

  const hasRole = /\byou are|\bact as|\byour role\b/i.test(t);
  const hasOutputFormat =
    /\b(format|json|markdown|table|bullets?|list|csv|sentences?|paragraphs?|words? max|word limit|max(imum)? \d+|rank(?:ed)?|categori[sz]e)\b/i.test(
      t,
    );
  const hasAudience = /\b(for (a|an|the) [a-z]+|reader|audience|onboarding|client|user|junior|senior)\b/i.test(t);
  const hasExamples = /\b(example|here['']s an example|like (this|so)|here are two|sample)\b/i.test(t);
  const vagueVerbs = ["help", "improve", "make better", "make it", "do something", "give me ideas"];
  const hasVagueVerb = vagueVerbs.some((v) => lower.includes(v));
  const hasNegativeConstraints = /\b(avoid|don['']?t|never|no [a-z]+|without|skip)\b/i.test(t);
  const hasLength = wordCount >= 40;

  return [
    {
      key: "length",
      label: "Enough specificity",
      hint: "Aim for at least 40 words of context. Short prompts get average answers.",
      passed: hasLength,
    },
    {
      key: "role",
      label: "Role / persona",
      hint: "Open with 'You are...' to set perspective and standards.",
      passed: hasRole,
    },
    {
      key: "audience",
      label: "Named audience",
      hint: "Name who the output is for. Same content, different reader, different shape.",
      passed: hasAudience,
    },
    {
      key: "format",
      label: "Output format",
      hint: "Tell the model the shape: bullets, table, three sentences, JSON.",
      passed: hasOutputFormat,
    },
    {
      key: "verbs",
      label: "Specific verbs",
      hint: "Swap 'help' and 'improve' for verbs you'd use in a brief (rank, critique, rewrite, compare).",
      passed: !empty && !hasVagueVerb,
    },
    {
      key: "examples",
      label: "Examples shown",
      hint: "One pasted example beats five lines of instructions.",
      passed: hasExamples,
    },
    {
      key: "constraints",
      label: "What to avoid",
      hint: "Tell the model what *not* to do. Faster than re-prompting later.",
      passed: hasNegativeConstraints,
    },
  ];
}
