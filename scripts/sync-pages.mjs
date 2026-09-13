// Copies the Vite build output (dist/) to the repository root.
// GitHub Pages (branch-deploy) serves the repo root, so the built site
// lives there and is committed. Run via: npm run pages
import { cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(repoRoot, 'dist');

// Remove previously published build output from the repo root.
for (const name of ['index.html', 'assets', 'favicon.svg']) {
  rmSync(join(repoRoot, name), { recursive: true, force: true });
}

cpSync(dist, repoRoot, { recursive: true });
console.log('Published dist/ to repo root — ready for GitHub Pages. Commit index.html, assets/ and favicon.svg.');
