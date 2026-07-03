import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    lightningcss: {
      // Strip legacy IE hacks (e.g. `*zoom:1` in tachyons) instead of failing
      // the build on them.
      errorRecovery: true,
    },
  },
});
