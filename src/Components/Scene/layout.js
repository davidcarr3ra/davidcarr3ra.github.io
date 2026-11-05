// Sphere size and placement, shared by the scene (Scene.jsx) and the overlay
// (App.jsx), which places the copy panel in the gap between the name and the
// sphere's top edge. No three.js import, so the main chunk stays light.

export const RADIUS = 0.76; // a touch larger than Unfold's cube (~0.66) with the same camera
export const CAMERA_DIST = 6.9; // Unfold: fov 38 at ~6.9 units
export const FOV = 38;
export const VISIBLE_HEIGHT = 2 * CAMERA_DIST * Math.tan(((FOV / 2) * Math.PI) / 180);

export const PHONE_MAX_WIDTH = 720;
export const PHONE_SCALE = 0.8; // phones get a slightly smaller sphere overall

// Layout values. Fractions of the viewport height are measured from the top.
// While a view is open the sphere eases lower and shrinks a little, like the
// cube dropping lower on Unfold's about page. In dev these can be changed live
// from the tuning panel (DevTuner.jsx); production always uses the defaults.
export const TUNE_DEFAULTS = {
  homeCenter: 0.5, // sphere centre with no view open
  loweredCenter: 0.63, // sphere centre while a view is open
  phoneLoweredCenter: 0.68, // the same on phones (≤ PHONE_MAX_WIDTH wide)
  loweredScale: 0.88, // sphere size while a view is open (1 = home size)
  textBias: 0.52, // where the copy sits in the gap: 0 = under the name, 1 = on the sphere

  // cursor effect: points under the pointer push out of the surface (a bulge;
  // negative strength presses a dent) and ease back when it moves away
  hoverStrength: 0.2, // displacement at the centre, in sphere units (radius 0.76)
  hoverRadius: 1.2, // falloff width, as a chord on the unit sphere (0..2)
  hoverSpread: 3, // how far points also slide sideways, away from the cursor
  hoverFollow: 7, // 1/s, how quickly the bulge chases the cursor and fades
  hoverWhenOpen: 1, // strength multiplier while a view is open

  // the name typing itself in on page load (App.jsx)
  nameCps: 90, // characters/second
  nameDelay: 50, // ms after the page mounts before the first letter
};

// Ask the name to type itself in again (dev panel's Replay button).
export const REPLAY_NAME = 'app:replay-name';
export const tune = { ...TUNE_DEFAULTS };

let version = 0;
const listeners = new Set();
export function setTune(patch) {
  Object.assign(tune, patch);
  version++;
  listeners.forEach((l) => l());
}
export const subscribeTune = (l) => (listeners.add(l), () => listeners.delete(l));
export const getTuneVersion = () => version;

export const sphereScale = (isPhone, lowered) =>
  (isPhone ? PHONE_SCALE : 1) * (lowered ? tune.loweredScale : 1);

export const loweredCenter = (isPhone) =>
  isPhone ? tune.phoneLoweredCenter : tune.loweredCenter;

// Radius of the lowered sphere as a fraction of the viewport height. (The
// perspective silhouette is <0.5% larger than this; not worth it.)
export const loweredRadius = (isPhone) => (RADIUS * sphereScale(isPhone, true)) / VISIBLE_HEIGHT;
