// Owner/repo for the GitHub-PR Add-skill flow.
export const GITHUB_OWNER = "teamplanes";
export const GITHUB_REPO = "hangar";
export const GITHUB_DEFAULT_BRANCH = "main";

export const GITHUB_NEW_FILE_BASE = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/new/${GITHUB_DEFAULT_BRANCH}`;

// Multi-file (folder) skills can't go through the single-file form, so we point
// contributors at GitHub's drag-and-drop upload UI, scoped to the skills dir.
export const GITHUB_UPLOAD_BASE = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/upload/${GITHUB_DEFAULT_BRANCH}/skills`;
