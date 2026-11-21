# SequelBox site (Vite)

Multi-page Vite project: Home, 3D Mockups, Templates, Motion Box, Pricing.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serve the built site
```

## Structure

```
index.html, mockups.html, templates.html, motionbox.html, pricing.html
partials/         header, footer, head (fonts), icon sprite: edit once, every page updates
plugins/partials.js   replaces <!-- @include name --> and marks the active nav link
public/images/    put your images here (hero.jpg, cta.jpg, gallery-1.jpg ... model-hoodie.jpg ...)
src/styles/       base.css (all pages) + marketing.css / motion.css / home.css (per page)
src/js/           shared helpers: layout (menu, FAQ, tabs), toc, plans
src/pages/        one entry file per page
```

## Notes

- Missing images are fine: every picture has a gradient behind it and the `<img>` removes itself if the file is not found.
- To add a page: create `yourpage.html`, add `src/pages/yourpage.js`, add the name to `pages` in `vite.config.js`, and add a link in `partials/header.html` with `data-page="yourpage"`.
- Set your editor URL in `src/pages/mockups.js` (`APP_URL`).
