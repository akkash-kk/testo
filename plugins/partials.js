// Tiny Vite plugin: replaces <!-- @include name --> with partials/name.html
// and marks the current page's nav link with aria-current="page".
import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

export function applyPartials(html, pagePath, dir) {
  const include = /<!--\s*@include\s+([\w-]+)\s*-->/g;
  let out = html;
  // run twice so partials may include other partials
  for (let i = 0; i < 2; i++) {
    out = out.replace(include, (_, name) => readFileSync(resolve(dir, `${name}.html`), 'utf8'));
  }
  const page = basename(pagePath || 'index.html', '.html') || 'index';
  return out.replace(
    new RegExp(`(<a[^>]*data-page="${page}")`, 'g'),
    '$1 aria-current="page"'
  );
}

export default function partials({ dir }) {
  return {
    name: 'sequelbox-partials',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return applyPartials(html, ctx.path === '/' ? 'index.html' : ctx.path, dir);
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.html') && file.includes('partials')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}
