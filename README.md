# davidcarr3ra.com

Personal site. A single screen: the name at the top, a slowly turning particle
sphere in the middle, and a nav that types copy in under the name (layout
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
src/content.js                   copy for each view (About, Bookshelf)
src/Typewriter.jsx               typed view transitions
src/Components/Scene/Scene.jsx   the particle sphere (lazy-loaded chunk)
src/Components/Scene/layout.js   sphere size/placement, shared with the overlay
src/DevTuner.jsx                 dev-only sliders for the layout values
src/Components/Projects/         deprecated; kept for re-enable, not rendered
```

Views are opened by the URL hash (`#about`, `#bookshelf`; no hash shows just
the name and sphere), so links, reloads and the back button work without a
router. As on unfoldlabs.xyz, switching views deletes the current copy
character by character and types the new copy in; to edit the copy, change
`content.js`.

The sphere is ~14k points spread uniformly over a sphere's surface. It uses
dark points with normal blending (Unfold's additive blending washes out on this
light background). Its look is tuned by the `params` object at the top of
`Scene.jsx`. While a view is open the sphere eases lower and slightly smaller
to make room for the copy, which centres itself between the name and the
sphere's top edge (both read the numbers in `layout.js`). If the copy is too
tall for that room (short screens, the Bookshelf list) the sphere drops just
far enough to clear it. Under `npm run dev` a
tuning panel (bottom right) adjusts those numbers live; copy the values into
`TUNE_DEFAULTS` to keep them. It is not included in the production build.
