import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VIEWS } from './src/content.js';

// GitHub Pages has no rewrites, but it serves `about.html` for a request to
// `/about`. So each view gets a copy of the app's index.html under its own name
// (a normal 200, no redirect), and 404.html catches any other path; the app
// reads the view from the path (App.jsx).
const pagesForViews = () => {
  let outDir;
  return {
    name: 'pages-for-views',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html');
      for (const view of Object.keys(VIEWS)) copyFileSync(index, resolve(outDir, `${view}.html`));
      copyFileSync(index, resolve(outDir, '404.html'));
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), pagesForViews()],
});
