export type AirshowEntry = {
  title: string;
  source: string;
  sourceUrl: string;
  spottedBy: string;
  spottedOn: string;
  tags: string[];
  what: string;
  why: string;
  color: "sky" | "butter" | "coral" | "mint" | "cream";
};

export const AIRSHOW: AirshowEntry[] = [
  {
    title: "Cursor Composer",
    source: "Cursor",
    sourceUrl: "https://www.cursor.com",
    spottedBy: "julian",
    spottedOn: "2026-05-22",
    tags: ["coding", "agents", "ide"],
    what: "Multi-file agent inside the editor. You describe an intent across the whole repo and it edits, runs, and iterates until tests pass.",
    why: "Feels like the first version of an AI pair that actually understands a codebase. Worth seeing how they made the diff review feel safe.",
    color: "sky",
  },
  {
    title: "Granola",
    source: "Granola.ai",
    sourceUrl: "https://www.granola.ai",
    spottedBy: "julian",
    spottedOn: "2026-05-19",
    tags: ["meetings", "notes", "audio"],
    what: "Meeting notes that combine your hand-typed shorthand with full audio transcription. The output is a single doc that reads like your notes, only better.",
    why: "Beautifully restrained AI. Doesn't try to take over the meeting, helps you write the note you would have written.",
    color: "butter",
  },
  {
    title: "Artifacts",
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news/artifacts",
    spottedBy: "julian",
    spottedOn: "2026-05-17",
    tags: ["interaction", "design", "claude"],
    what: "Workspace where Claude builds a small app or document live next to the chat. You can fork, edit, share.",
    why: "Shifts AI from chatbot to material. A new shape for what 'AI output' can be.",
    color: "coral",
  },
  {
    title: "Krea Realtime",
    source: "Krea",
    sourceUrl: "https://www.krea.ai",
    spottedBy: "julian",
    spottedOn: "2026-05-15",
    tags: ["image", "generative", "creative"],
    what: "Generates images at the speed you can sketch. Draw a rough shape and a finished illustration appears as you move.",
    why: "Wired generative AI directly into the hand. Feels less like a tool and more like an instrument.",
    color: "mint",
  },
  {
    title: "v0",
    source: "Vercel",
    sourceUrl: "https://v0.dev",
    spottedBy: "julian",
    spottedOn: "2026-05-12",
    tags: ["design", "frontend", "code"],
    what: "Prompt-to-React-component, with a live preview, copy-and-paste codegen, and a Figma plugin to import designs.",
    why: "Closes the loop between a design idea and shippable code. Look at the prompt patterns it uses, they're a masterclass.",
    color: "cream",
  },
  {
    title: "Cline",
    source: "Cline / open source",
    sourceUrl: "https://github.com/cline/cline",
    spottedBy: "julian",
    spottedOn: "2026-05-10",
    tags: ["agents", "coding", "open-source"],
    what: "Autonomous coding agent that runs in VS Code. Plans, executes, asks for permission before risky steps.",
    why: "Open source proof that the autonomous-pair pattern works. Read the system prompts.",
    color: "sky",
  },
  {
    title: "Atlas",
    source: "OpenAI",
    sourceUrl: "https://openai.com/atlas",
    spottedBy: "julian",
    spottedOn: "2026-05-08",
    tags: ["browser", "agents"],
    what: "OpenAI's full Chromium-based browser with a built-in agent that can act across tabs on your behalf.",
    why: "The browser as the agent's body. Shows where the cursor moves next.",
    color: "butter",
  },
  {
    title: "Magic Inbox",
    source: "Superhuman",
    sourceUrl: "https://superhuman.com",
    spottedBy: "julian",
    spottedOn: "2026-05-05",
    tags: ["email", "summarisation", "productivity"],
    what: "Inbox triage that writes a one-line summary of every thread, drafts a reply in your tone, and surfaces what needs you today.",
    why: "Restraint as a feature. Doesn't summarise everything, only what you would have skimmed.",
    color: "coral",
  },
];
