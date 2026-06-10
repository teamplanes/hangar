export type AviatorTag =
  | "writer"
  | "builder"
  | "researcher"
  | "engineer"
  | "designer"
  | "podcaster"
  | "product";

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
    name: "Ethan Mollick",
    handle: "@emollick",
    link: "https://www.oneusefulthing.org",
    tags: ["researcher", "writer"],
    bio: "A Wharton professor who writes One Useful Thing, on how AI is changing the way we work.",
    why: "He backs his points with research but always shows the worked example, so you can try it yourself.",
    addedBy: "julian",
    addedOn: "2026-05-04",
  },
  {
    name: "Maggie Appleton",
    handle: "@mappletons",
    link: "https://maggieappleton.com",
    tags: ["designer", "writer"],
    bio: "Designer and researcher who draws her essays, much of it on AI as something we design with rather than just use.",
    why: "Some of the most thoughtful writing on AI and design, and it holds up long after you read it.",
    addedBy: "julian",
    addedOn: "2026-05-06",
  },
  {
    name: "Amelia Wattenberger",
    handle: "@wattenberger",
    link: "https://wattenberger.com",
    tags: ["designer", "builder"],
    bio: "Designer and engineer who keeps asking why we still talk to AI through a chat box when we could build something better.",
    why: "Worth following if you design products and want to rethink what an AI interface can be.",
    addedBy: "julian",
    addedOn: "2026-06-09",
  },
  {
    name: "Claire Vo",
    handle: "@clairevo",
    link: "https://www.howiai.fm",
    tags: ["product", "builder"],
    bio: "Product leader who built ChatPRD and hosts the How I AI podcast, where she watches people work with these tools.",
    why: "A good way to see how AI is changing the day to day of building products, rather than the theory of it.",
    addedBy: "julian",
    addedOn: "2026-06-10",
  },
  {
    name: "Lenny Rachitsky",
    handle: "@lennysan",
    link: "https://www.lennysnewsletter.com",
    tags: ["product", "writer"],
    bio: "Writes Lenny's Newsletter, which most product people treat as required reading.",
    why: "A steady read on how teams are using AI, with frameworks you can lift into your own work.",
    addedBy: "julian",
    addedOn: "2026-06-10",
  },
  {
    name: "Dan Shipper",
    handle: "@danshipper",
    link: "https://every.to",
    tags: ["writer", "builder"],
    bio: "Co-founds Every and writes about what it is like to do knowledge work with AI all day.",
    why: "He is honest about what works and what doesn't, which is rarer than it should be.",
    addedBy: "julian",
    addedOn: "2026-06-09",
  },
  {
    name: "Shawn Wang (swyx)",
    handle: "@swyx",
    link: "https://www.latent.space",
    tags: ["podcaster", "writer"],
    bio: "Hosts the Latent Space podcast and started the AI Engineer summit.",
    why: "A good single source if you want to keep up with the AI industry as a whole.",
    addedBy: "julian",
    addedOn: "2026-05-10",
  },
  {
    name: "Cassie Kozyrkov",
    handle: "@quaesita",
    link: "https://kozyrkov.medium.com",
    tags: ["researcher", "writer"],
    bio: "Former Chief Decision Scientist at Google who now explains AI to the people who have to make decisions with it.",
    why: "Worth sending to a colleague who is smart but not technical and wants to understand how it works.",
    addedBy: "julian",
    addedOn: "2026-06-10",
  },
];

export const AVIATOR_TAG_LABEL: Record<AviatorTag, string> = {
  writer: "Writer",
  builder: "Builder",
  researcher: "Researcher",
  engineer: "Engineer",
  designer: "Designer",
  podcaster: "Podcaster",
  product: "Product",
};
