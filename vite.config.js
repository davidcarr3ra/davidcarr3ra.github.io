import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages has no rewrites: a request for /about would 404. Shipping the
// app's index.html as 404.html makes Pages serve the app for any path, and the
// app reads the view from the path (App.jsx).
const spaFallback = () => {
  let outDir;
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), spaFallback()],
});
