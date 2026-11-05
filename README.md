# davidcarr3ra.com

Personal site. A single screen: the name at the top, a slowly turning particle
sphere in the middle, and a nav that opens copy panels beside it (layout
modelled on [unfoldlabs.xyz](https://unfoldlabs.xyz)).

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
src/App.jsx                      overlay: name, nav, copy panel, socials
src/App.css                      all styles (palette + responsive rules)
src/Components/Scene/Scene.jsx   the particle sphere (lazy-loaded chunk)
src/Components/Bookshelf/        "Bookshelf" view
src/Components/Projects/         deprecated; kept for re-enable, not rendered
```

Panels are opened by the URL hash (`#bookshelf`; no hash shows just the name
and sphere), so links, reloads and the back button work without a router.

The sphere is ~14k points spread uniformly over a sphere's surface. It uses
dark points with normal blending (Unfold's additive blending washes out on this
light background). Its look is tuned by the `params` object at the top of
`Scene.jsx`. On narrow screens the copy stacks under the name and the sphere
eases lower while a panel is open.
