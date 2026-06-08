#!/usr/bin/env node
// Posts a Slack message for each newly-added skill. Called by the notify-slack
// GitHub Action with the list of added skills/**/*.md paths as argv. Needs
// SLACK_WEBHOOK_URL in the environment. No-ops cleanly if there's nothing to
// post or the webhook isn't set.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BAY_LABEL = {
  product: "Product",
  design: "Design",
  dev: "Dev",
  "new-business": "New Business",
  general: "General",
  "just-for-fun": "Just for Fun",
};

const webhook = process.env.SLACK_WEBHOOK_URL;
const files = process.argv.slice(2).filter((f) => f.endsWith(".md"));

if (!webhook) {
  console.log("SLACK_WEBHOOK_URL not set, skipping.");
  process.exit(0);
}
if (files.length === 0) {
  console.log("No new skills in this push.");
  process.exit(0);
}

const blocks = [];
const lines = [];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const { data } = matter(fs.readFileSync(file, "utf8"));
  const rel = file.replace(/^skills\//, "").replace(/\.md$/, "");
  const bay = BAY_LABEL[data.discipline] ?? data.discipline ?? "";
  const url = `https://planes-hangar.vercel.app/skill/${rel}`;
  const inPlugin = data.pack === true;
  const where = inPlugin
    ? `in the *${bay}* plugin , install/update: \`hangar-${data.discipline}@planes-hangar\``
    : `browse-only in the *${bay}* bay`;
  lines.push(
    `*<${url}|${data.title ?? rel}>* , ${data.summary ?? ""}\n_${where}_`,
  );
}

if (lines.length === 0) {
  console.log("No readable new skills.");
  process.exit(0);
}

const header =
  lines.length === 1
    ? "✈️ A new skill just landed in The Hangar"
    : `✈️ ${lines.length} new skills just landed in The Hangar`;

blocks.push({
  type: "section",
  text: { type: "mrkdwn", text: `*${header}*` },
});
for (const line of lines) {
  blocks.push({ type: "section", text: { type: "mrkdwn", text: line } });
}
blocks.push({
  type: "context",
  elements: [
    {
      type: "mrkdwn",
      text: "Have auto-update on? You'll get these at your next session. Run `/hangar-general:whats-new` for a rundown. Browse: <https://planes-hangar.vercel.app|planes-hangar.vercel.app>",
    },
  ],
});

const res = await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: header, blocks }),
});

if (!res.ok) {
  console.error(`Slack post failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
console.log(`Posted ${lines.length} new skill(s) to Slack.`);
