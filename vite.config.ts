import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base so the built site works under a sub-path (github.io/KY/)
  base: './',
  // Source lives in app/; the repo ROOT is the published (built) site,
  // which is what GitHub Pages (branch-deploy) serves.
  root: 'app',
  plugins: [tailwindcss()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
    // The live preview proxies through a sandbox host; allow it.
    allowedHosts: true,
  },
});
