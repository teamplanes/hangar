export type ArticleFeed = "curated" | "submitted";

export type Article = {
  title: string;
  summary: string;
  source: string;
  sourceHandle: string;
  url: string;
  publishedOn: string;
  tags: string[];
  feed: ArticleFeed;
  submittedBy?: string;
  votes: number;
  comments: number;
};

export type Source = {
  name: string;
  handle: string;
  url: string;
  type: "blog" | "podcast" | "newsletter" | "research";
  votes: number;
  comments: number;
};

export const ARTICLES: Article[] = [
  {
    title: "Why Claude's Skill system changes the agency model",
    summary:
      "Ethan Mollick on what shifts when every prompt can be saved, shared and versioned across a team. Argues the bottleneck moves from individual taste to studio practice.",
    source: "One Useful Thing",
    sourceHandle: "@emollick",
    url: "https://www.oneusefulthing.org",
    publishedOn: "2026-05-23",
    tags: ["claude", "skills", "agency"],
    feed: "curated",
    votes: 84,
    comments: 12,
  },
  {
    title: "Anthropic's Voice API: what product teams should test first",
    summary:
      "Latent Space breaks down the new voice features. Worth reading before you propose any voice-first feature this quarter.",
    source: "Latent Space",
    sourceHandle: "@swyx",
    url: "https://www.latent.space",
    publishedOn: "2026-05-22",
    tags: ["voice", "anthropic", "product"],
    feed: "curated",
    votes: 61,
    comments: 8,
  },
  {
    title: "Sora 2 and the slow death of stock photography",
    summary:
      "Ben Thompson on the unit economics of generative video and what it means for the asset libraries we still pay for. Reads dry, lands sharp.",
    source: "Stratechery",
    sourceHandle: "@benthompson",
    url: "https://stratechery.com",
    publishedOn: "2026-05-21",
    tags: ["video", "economics", "stock"],
    feed: "curated",
    votes: 117,
    comments: 21,
  },
  {
    title: "I rebuilt our brief in three different LLMs and graded the output",
    summary:
      "Simon Willison runs the same brief through Claude, GPT and Gemini, then publishes the diff with scores. The rubric is the gold here.",
    source: "Simon Willison's Blog",
    sourceHandle: "@simonw",
    url: "https://simonwillison.net",
    publishedOn: "2026-05-20",
    tags: ["briefs", "evaluation", "writing"],
    feed: "curated",
    votes: 92,
    comments: 14,
  },
  {
    title: "AI design materials: where prompts meet UI",
    summary:
      "Maggie Appleton on the in-between layer where a designer can shape the behaviour of a model without writing code. Beautiful as ever.",
    source: "Maggie Appleton",
    sourceHandle: "@mappletons",
    url: "https://maggieappleton.com",
    publishedOn: "2026-05-19",
    tags: ["design", "materials", "essay"],
    feed: "curated",
    votes: 138,
    comments: 19,
  },
  {
    title: "The honest case against AI in primary research",
    summary:
      "AI Snake Oil argues that synthetic interview generation is hollowing out junior researcher skill. Painful and fair.",
    source: "AI Snake Oil",
    sourceHandle: "@AISnakeOil",
    url: "https://www.aisnakeoil.com",
    publishedOn: "2026-05-18",
    tags: ["research", "critique"],
    feed: "curated",
    votes: 73,
    comments: 28,
  },
  {
    title: "Inside Cursor's Composer architecture",
    summary:
      "The Pragmatic Engineer walks through how Cursor's multi-file agent actually works under the hood. Useful if you're sketching anything similar.",
    source: "The Pragmatic Engineer",
    sourceHandle: "@gergelyorosz",
    url: "https://newsletter.pragmaticengineer.com",
    publishedOn: "2026-05-17",
    tags: ["engineering", "agents", "ide"],
    feed: "curated",
    votes: 96,
    comments: 11,
  },
  {
    title: "How I built a discovery report generator from a single prompt",
    summary:
      "Notes on the messy iteration loop. Includes the prompt, the eval rubric and the three things that broke when a client tried it.",
    source: "Internal write-up",
    sourceHandle: "@maddie",
    url: "#",
    publishedOn: "2026-05-24",
    tags: ["discovery", "tooling", "product"],
    feed: "submitted",
    submittedBy: "maddie",
    votes: 23,
    comments: 6,
  },
  {
    title: "Three prompts that saved our credentials sprint",
    summary:
      "What we used on the last pitch, what didn't work, and what we'd run again. A short field report from the New Business bench.",
    source: "Internal write-up",
    sourceHandle: "@sam",
    url: "#",
    publishedOn: "2026-05-22",
    tags: ["pitch", "credentials", "new-business"],
    feed: "submitted",
    submittedBy: "sam",
    votes: 18,
    comments: 4,
  },
  {
    title: "Notes from the AI Engineer summit",
    summary:
      "Five things from the New York summit worth bringing back to the studio. Light on hype, heavy on practical patterns.",
    source: "Internal write-up",
    sourceHandle: "@julian",
    url: "#",
    publishedOn: "2026-05-19",
    tags: ["events", "summary"],
    feed: "submitted",
    submittedBy: "julian",
    votes: 31,
    comments: 9,
  },
];

export const SOURCES: Source[] = [
  {
    name: "Stratechery",
    handle: "@benthompson",
    url: "https://stratechery.com",
    type: "newsletter",
    votes: 142,
    comments: 8,
  },
  {
    name: "One Useful Thing",
    handle: "@emollick",
    url: "https://www.oneusefulthing.org",
    type: "newsletter",
    votes: 121,
    comments: 6,
  },
  {
    name: "Latent Space",
    handle: "@swyx",
    url: "https://www.latent.space",
    type: "podcast",
    votes: 108,
    comments: 14,
  },
  {
    name: "Simon Willison's Blog",
    handle: "@simonw",
    url: "https://simonwillison.net",
    type: "blog",
    votes: 95,
    comments: 5,
  },
  {
    name: "Maggie Appleton",
    handle: "@mappletons",
    url: "https://maggieappleton.com",
    type: "blog",
    votes: 88,
    comments: 4,
  },
  {
    name: "AI Snake Oil",
    handle: "@AISnakeOil",
    url: "https://www.aisnakeoil.com",
    type: "newsletter",
    votes: 64,
    comments: 17,
  },
  {
    name: "The Pragmatic Engineer",
    handle: "@gergelyorosz",
    url: "https://newsletter.pragmaticengineer.com",
    type: "newsletter",
    votes: 71,
    comments: 9,
  },
];

export const SOURCE_TYPE_LABEL: Record<Source["type"], string> = {
  blog: "Blog",
  podcast: "Podcast",
  newsletter: "Newsletter",
  research: "Research",
};
