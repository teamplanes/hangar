import "server-only";

// Commits file changes straight to main in teamplanes/hangar via the GitHub
// Contents API. The git repo stays the source of truth; the marketplace and
// the site both read from it after Vercel auto-redeploys on push.

const OWNER = "teamplanes";
const REPO = "hangar";
const BRANCH = "main";
const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

function token(): string {
  const t = process.env.GITHUB_TOKEN;
  if (!t) throw new Error("GITHUB_TOKEN not configured");
  return t;
}

function headers() {
  return {
    Authorization: `Bearer ${token()}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${API}/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${BRANCH}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub getFile ${path}: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { content: string; sha: string };
  return { content: Buffer.from(json.content, "base64").toString("utf8"), sha: json.sha };
}

export async function putFile(
  path: string,
  content: string,
  message: string,
  sha?: string,
): Promise<void> {
  const res = await fetch(`${API}/${encodeURIComponent(path).replace(/%2F/g, "/")}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) throw new Error(`GitHub putFile ${path}: ${res.status} ${await res.text()}`);
}

export async function deleteFile(path: string, message: string, sha: string): Promise<void> {
  const res = await fetch(`${API}/${encodeURIComponent(path).replace(/%2F/g, "/")}`, {
    method: "DELETE",
    headers: headers(),
    body: JSON.stringify({ message, branch: BRANCH, sha }),
  });
  if (!res.ok) throw new Error(`GitHub deleteFile ${path}: ${res.status} ${await res.text()}`);
}

export function githubConfigured(): boolean {
  return !!process.env.GITHUB_TOKEN;
}
