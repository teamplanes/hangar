#!/usr/bin/env node
// Regenerates plugins/hangar-<bay>/skills/ from the website skills marked
// `pack: true`. The skill markdown under skills/ is the single source of
// truth; this makes what people INSTALL match what the site shows "in the
// plugin". Run after toggling plugin membership on /admin, before committing.
//
//   node scripts/sync-plugins.mjs        (or: npm run sync:plugins)
//
// Leaves plugin.json / marketplace.json untouched. Prunes skill folders that
// are no longer pack:true (so toggling a skill OFF removes it from the plugin).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const PLUGINS_DIR = path.join(ROOT, "plugins");

// A skill is a standalone `<slug>.md` file, or a folder containing SKILL.md
// (plus extra files that travel with it). Mirror the site loader's logic.
function collect(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (entries.some((e) => e.isFile() && e.name === "SKILL.md")) {
    return [{ skillFile: path.join(dir, "SKILL.md"), dir }];
  }
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...collect(full));
    else if (e.isFile() && e.name.endsWith(".md"))
      out.push({ skillFile: full, dir: null });
  }
  return out;
}

// Derive a one-line plugin description from summary, else first real paragraph.
function deriveDescription(data, body) {
  if (data.summary && String(data.summary).trim()) {
    return String(data.summary).trim().replace(/\s+/g, " ");
  }
  const firstPara = body
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("---"));
  const text = (firstPara || data.title || "").replace(/\s+/g, " ");
  return text.length > 400 ? text.slice(0, 397) + "..." : text;
}

const units = collect(SKILLS_DIR);
const wanted = new Map(); // bay -> Set(slug) of pack skills we generated
let written = 0;

for (const { skillFile, dir } of units) {
  const raw = fs.readFileSync(skillFile, "utf8");
  const { data, content } = matter(raw);
  if (data.pack !== true) continue;

  const bay = data.discipline;
  const slug = dir ? path.basename(dir) : path.basename(skillFile, ".md");
  if (!bay) {
    console.warn(`! ${path.relative(ROOT, skillFile)} has pack:true but no discipline — skipped`);
    continue;
  }

  const pluginDir = path.join(PLUGINS_DIR, `hangar-${bay}`);
  if (!fs.existsSync(path.join(pluginDir, ".claude-plugin", "plugin.json"))) {
    console.warn(`! no plugin manifest for bay "${bay}" (${path.join("plugins", `hangar-${bay}`)}) — skipped ${slug}`);
    continue;
  }

  if (!wanted.has(bay)) wanted.set(bay, new Set());
  wanted.get(bay).add(slug);

  // Hand-placed full bundles (real skills with assets/scripts, or skills whose
  // plugin SKILL.md frontmatter must be preserved) are marked plugin_source:
  // bundled. Protect them from pruning (added to `wanted` above) but never
  // regenerate or overwrite them.
  if (data.plugin_source === "bundled") {
    continue;
  }

  const outDir = path.join(pluginDir, "skills", slug);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  // Folder skills: copy every sibling file across (preserving structure), then
  // overwrite SKILL.md with the plugin-shaped frontmatter (name + description).
  if (dir) {
    fs.cpSync(dir, outDir, { recursive: true });
  }
  const fm = { name: slug, description: deriveDescription(data, content) };
  fs.writeFileSync(path.join(outDir, "SKILL.md"), matter.stringify(content.trim() + "\n", fm));
  written++;
}

// Prune skill folders that are no longer pack:true.
let pruned = 0;
if (fs.existsSync(PLUGINS_DIR)) {
  for (const pluginName of fs.readdirSync(PLUGINS_DIR)) {
    const skillsDir = path.join(PLUGINS_DIR, pluginName, "skills");
    if (!fs.existsSync(skillsDir)) continue;
    const bay = pluginName.replace(/^hangar-/, "");
    const keep = wanted.get(bay) ?? new Set();
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (entry.isDirectory() && !keep.has(entry.name)) {
        fs.rmSync(path.join(skillsDir, entry.name), { recursive: true, force: true });
        pruned++;
        console.log(`  pruned plugins/${pluginName}/skills/${entry.name}`);
      }
    }
  }
}

console.log(`sync:plugins — wrote ${written} skill(s), pruned ${pruned}. Plugins now match pack:true.`);
