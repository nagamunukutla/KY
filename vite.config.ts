import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // The live preview proxies through a sandbox host; allow it.
    allowedHosts: true,
  },
});
