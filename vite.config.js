import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import partials from './plugins/partials.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const pages = ['index', 'mockups', 'templates', 'motionbox', 'pricing'];

export default defineConfig({
  // relative base so the built site works from any folder or sub-path
  base: './',
  plugins: [partials({ dir: resolve(root, 'partials') })],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(root, `${p}.html`)])),
    },
  },
});
