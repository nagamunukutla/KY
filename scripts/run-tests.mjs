// Test runner: bundles every tests/*.test.ts with Vite (already a
// devDependency) and executes the result under node:test. No framework needed.
//   npm run test
import { spawnSync } from 'node:child_process';
import { readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, '.test-build');
const testsDir = join(root, 'tests');

const entries = readdirSync(testsDir)
  .filter((f) => f.endsWith('.test.ts'))
  .map((f) => join('tests', f));

if (!entries.length) {
  console.error('No tests found in tests/*.test.ts');
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });

try {
  await build({
    root,
    configFile: false,
    logLevel: 'error',
    plugins: [],
    build: {
      ssr: true,
      outDir,
      emptyOutDir: true,
      minify: false,
      target: 'node20',
      rollupOptions: {
        input: entries,
        output: { entryFileNames: '[name].mjs', format: 'es' },
      },
    },
  });
} catch (err) {
  console.error('Failed to bundle the test entries:', err);
  process.exit(1);
}

// node's test runner skips dot-directories, so pass the bundles explicitly.
const bundles = readdirSync(outDir).filter((f) => f.endsWith('.test.mjs')).map((f) => join(outDir, f));
if (!bundles.length) {
  console.error('Bundling produced no test files.');
  process.exit(1);
}

console.log(`Bundled ${bundles.length} test file(s): ${entries.join(', ')}`);
const res = spawnSync(process.execPath, ['--test', ...bundles], { stdio: 'inherit' });
rmSync(outDir, { recursive: true, force: true });
process.exit(res.status ?? 1);
