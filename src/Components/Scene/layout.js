// Sphere size and placement, shared by the scene (Scene.jsx) and the overlay
// (App.jsx), which centres the copy panel in the gap between the name and the
// sphere's top edge. No three.js import, so the main chunk stays light.

export const RADIUS = 0.76; // a touch larger than Unfold's cube (~0.66) with the same camera
export const CAMERA_DIST = 6.9; // Unfold: fov 38 at ~6.9 units
export const FOV = 38;
export const VISIBLE_HEIGHT = 2 * CAMERA_DIST * Math.tan(((FOV / 2) * Math.PI) / 180);

// While a view is open the sphere eases into the lower half (centre at 68% of
// the height) and shrinks a little, like the cube dropping lower on Unfold's
// about page. Phones also get a slightly smaller sphere overall.
export const LOWERED_CENTER = 0.68;
export const LOWERED_SCALE = 0.88;
export const PHONE_MAX_WIDTH = 720;
export const PHONE_SCALE = 0.8;

export const sphereScale = (isPhone, lowered) =>
  (isPhone ? PHONE_SCALE : 1) * (lowered ? LOWERED_SCALE : 1);

// Top edge of the lowered sphere, as a fraction of the viewport height from the
// top. (The perspective silhouette is <0.5% larger than this; not worth it.)
export const loweredSphereTop = (isPhone) =>
  LOWERED_CENTER - (RADIUS * sphereScale(isPhone, true)) / VISIBLE_HEIGHT;
