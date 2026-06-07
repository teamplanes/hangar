export type AviatorTag =
  | "writer"
  | "builder"
  | "researcher"
  | "engineer"
  | "designer"
  | "podcaster";

export type Aviator = {
  name: string;
  handle: string;
  link: string;
  tags: AviatorTag[];
  bio: string;
  why: string;
  addedBy: string;
  addedOn: string;
};

export const AVIATORS: Aviator[] = [
  {
    name: "Simon Willison",
    handle: "@simonw",
    link: "https://simonwillison.net",
    tags: ["writer", "builder"],
    bio: "Maker of Datasette, the LLM CLI, and a daily blog full of practical AI receipts.",
    why: "Tactical AI usage, no hype. Reads the docs so you don't have to.",
    addedBy: "julian",
    addedOn: "2026-05-04",
  },
  {
    name: "Ethan Mollick",
    handle: "@emollick",
    link: "https://www.oneusefulthing.org",
    tags: ["researcher", "writer"],
    bio: "Wharton professor. Writes One Useful Thing on how AI actually changes work.",
    why: "Honest takes on what changes in jobs. Research paired with worked examples you can copy.",
    addedBy: "julian",
    addedOn: "2026-05-04",
  },
  {
    name: "Andrej Karpathy",
    handle: "@karpathy",
    link: "https://karpathy.ai",
    tags: ["builder", "researcher"],
    bio: "Founding member of OpenAI, former Tesla. Now teaching from first principles.",
    why: "One tutorial and you understand a year of papers. He shows the wiring.",
    addedBy: "julian",
    addedOn: "2026-05-04",
  },
  {
    name: "Riley Goodside",
    handle: "@goodside",
    link: "https://twitter.com/goodside",
    tags: ["engineer", "researcher"],
    bio: "Prompt researcher at Scale AI. Posts edge cases like a naturalist.",
    why: "Living evidence that prompt design is craft. Worth scrolling his timeline once a week.",
    addedBy: "julian",
    addedOn: "2026-05-05",
  },
  {
    name: "Maggie Appleton",
    handle: "@mappletons",
    link: "https://maggieappleton.com",
    tags: ["designer", "writer"],
    bio: "Designer and researcher. Currently at Anthropic. Draws her essays.",
    why: "Best writing on AI as a design material. Beautiful, slow, durable.",
    addedBy: "julian",
    addedOn: "2026-05-06",
  },
  {
    name: "Linus Lee",
    handle: "@thesephist",
    link: "https://thesephist.com",
    tags: ["builder", "researcher"],
    bio: "Researcher and engineer at Notion. Posts weird and generative tools weekly.",
    why: "Watch his demos and you'll want to make something the same evening.",
    addedBy: "julian",
    addedOn: "2026-05-07",
  },
  {
    name: "Geoffrey Litt",
    handle: "@geoffreylitt",
    link: "https://www.geoffreylitt.com",
    tags: ["researcher", "writer"],
    bio: "Researcher at Ink & Switch. Thinks about end-user programming and AI as a tool for thought.",
    why: "Treats AI as a bicycle, not a horse. Long essays worth saving.",
    addedBy: "julian",
    addedOn: "2026-05-08",
  },
  {
    name: "Steve Krouse",
    handle: "@stevekrouse",
    link: "https://val.town",
    tags: ["builder", "engineer"],
    bio: "Founder of Val.town. Champion of programming as scripting.",
    why: "Sharp takes on developer ergonomics in the AI era. Builds the tool to back it up.",
    addedBy: "julian",
    addedOn: "2026-05-09",
  },
  {
    name: "Shawn Wang (swyx)",
    handle: "@swyx",
    link: "https://www.latent.space",
    tags: ["podcaster", "writer"],
    bio: "Host of the Latent Space podcast. Founder of the AI Engineer summit.",
    why: "Best industry survey you'll get. Sorts signal from noise so you don't have to.",
    addedBy: "julian",
    addedOn: "2026-05-10",
  },
  {
    name: "Lilian Weng",
    handle: "@lilianweng",
    link: "https://lilianweng.github.io",
    tags: ["researcher", "writer"],
    bio: "Head of Safety Research at OpenAI. Writes the survey paper you wish a colleague had written.",
    why: "Her blog posts are the textbook for the field. Read once, reference forever.",
    addedBy: "julian",
    addedOn: "2026-05-11",
  },
];

export const AVIATOR_TAG_LABEL: Record<AviatorTag, string> = {
  writer: "Writer",
  builder: "Builder",
  researcher: "Researcher",
  engineer: "Engineer",
  designer: "Designer",
  podcaster: "Podcaster",
};
