# davidcarr3ra.com

Personal site. A single screen: a slowly turning particle sphere fills the
viewport, with the copy pinned to the corners (layout modelled on
[unfoldlabs.xyz](https://unfoldlabs.xyz)).

## Stack

Vite · React 19 · three.js via @react-three/fiber (custom point shader).

## Develop

```bash
npm install
npm run dev       # vite dev server
npm run build     # production build to dist/
npm run preview   # serve the build locally
npm run deploy    # build and publish dist/ to GitHub Pages
```

## Layout

```
src/App.jsx                      overlay: name, nav, copy region, footer
src/App.css                      all styles (palette + responsive rules)
src/Components/Scene/Scene.jsx   the particle sphere (lazy-loaded chunk)
src/Components/About/            "About" view
src/Components/Bookshelf/        "Bookshelf" view
src/Components/Projects/         deprecated; kept for re-enable, not rendered
```

Views are switched by the URL hash (`#about`, `#bookshelf`), so links, reloads
and the back button work without a router.

The sphere is the original low-poly sphere (10 × 5 segments) as ~14k points
sampled over its facets and edges. It uses dark points with normal blending
(Unfold's additive blending washes out on this light background). Its look is
tuned by the `params` object at the top of `Scene.jsx`.
