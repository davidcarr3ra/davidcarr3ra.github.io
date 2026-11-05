import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* Particle sphere — the site's original low-poly sphere (10 x 5 segments)
 * rebuilt as a point cloud, after the particle cube on unfoldlabs.xyz.
 *
 * Unfold draws bright points with additive blending on near-black. On this
 * site's light #ccc ground additive points wash out to white, so this uses
 * normal blending with dark points, and depth fades distant points toward the
 * background (lower alpha) instead of toward black. */

const RADIUS = 0.66; // ≈ the on-screen size of Unfold's cube with the same camera
const WIDTH_SEGMENTS = 10;
const HEIGHT_SEGMENTS = 5;
const COUNT = 14000;
const SCATTER_RADIUS = 2.2; // the dust cloud the intro coalesces from
const INTRO_DUR = 1.6; // seconds
const SPIN = 0.25; // rad/s about the tilted axis

const CAMERA_DIST = 6.9; // Unfold: fov 38 at ~6.9 units
const FOV = 38;
const VISIBLE_HEIGHT = 2 * CAMERA_DIST * Math.tan(THREE.MathUtils.degToRad(FOV / 2));

// Phones: the copy stacks down from the top, so drop the sphere into the empty
// lower half (centre at 66% of the height) and shrink it a little.
const PHONE_MAX_WIDTH = 720;
const PHONE_CENTER = 0.66;
const PHONE_SCALE = 0.8;

const params = {
  color: new THREE.Color('#1c1c1c'),
  opacity: 0.55, // per-point alpha; density builds up where points overlap
  pointSize: 0.03,
  edgeShare: 0.35, // fraction of particles placed on facet edges
  thickness: 0.01, // jitter off the facet / edge, so it reads as a volume
  turbulence: 0.006, // per-particle drift amplitude
  depthFade: 0.75, // how much the far side fades toward the background
};

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const VERT = /* glsl */ `
attribute vec3 aScatter;
attribute vec3 aSeed;
uniform float uTime;
uniform float uAssemble;
uniform float uTurb;
uniform float uSize;
uniform float uScale;
uniform float uNear;
uniform float uFar;
varying float vDepth;
void main() {
  vec3 turb = vec3(
    sin(uTime * 1.7 + aSeed.x * 6.2831853),
    sin(uTime * 2.3 + aSeed.y * 6.2831853),
    sin(uTime * 1.9 + aSeed.z * 6.2831853)
  );
  vec3 p = position + turb * uTurb;
  p = mix(aScatter, p, uAssemble);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = smoothstep(uNear, uFar, -mv.z);
  gl_PointSize = uSize * (uScale / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uDepthFade;
varying float vDepth;
void main() {
  // soft round sprite, computed analytically (no texture)
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = 1.0 - smoothstep(0.55, 1.0, d);
  if (a < 0.01) discard;
  gl_FragColor = vec4(uColor, a * uOpacity * (1.0 - vDepth * uDepthFade));
}`;

// Pick an index from a cumulative-weight array (binary search).
function pick(cdf, total) {
  const r = Math.random() * total;
  let lo = 0;
  let hi = cdf.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cdf[mid] < r) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// Vertex (ix, iy) of the low-poly sphere's lat/long grid, using the same
// parametrisation as THREE.SphereGeometry.
function gridVertex(ix, iy) {
  const phi = (ix / WIDTH_SEGMENTS) * Math.PI * 2;
  const theta = (iy / HEIGHT_SEGMENTS) * Math.PI;
  return new THREE.Vector3(
    -RADIUS * Math.cos(phi) * Math.sin(theta),
    RADIUS * Math.cos(theta),
    RADIUS * Math.sin(phi) * Math.sin(theta),
  );
}

// Particles are split between the facets (area-weighted, so every facet fills
// evenly however stretched it is) and the facet edges (length-weighted). The
// edges are what keep the old low-poly silhouette readable as a point cloud.
function buildGeometry() {
  const src = new THREE.SphereGeometry(RADIUS, WIDTH_SEGMENTS, HEIGHT_SEGMENTS).toNonIndexed();
  const pos = src.attributes.position;
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();

  const tris = [];
  const triCdf = [];
  let triTotal = 0;
  for (let t = 0; t < pos.count / 3; t++) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, t * 3);
    const b = new THREE.Vector3().fromBufferAttribute(pos, t * 3 + 1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, t * 3 + 2);
    const n = new THREE.Vector3().crossVectors(ab.subVectors(b, a), ac.subVectors(c, a));
    const area = n.length() / 2;
    if (area < 1e-6) continue; // the pole rows are degenerate
    tris.push({ a, b, c, n: n.normalize() });
    triCdf.push((triTotal += area));
  }
  src.dispose();

  // quad edges only (parallels + meridians), not the triangle diagonals
  const edges = [];
  const edgeCdf = [];
  let edgeTotal = 0;
  const addEdge = (a, b) => {
    edges.push([a, b]);
    edgeCdf.push((edgeTotal += a.distanceTo(b)));
  };
  for (let iy = 0; iy <= HEIGHT_SEGMENTS; iy++) {
    for (let ix = 0; ix < WIDTH_SEGMENTS; ix++) {
      if (iy > 0 && iy < HEIGHT_SEGMENTS) addEdge(gridVertex(ix, iy), gridVertex(ix + 1, iy));
      if (iy < HEIGHT_SEGMENTS) addEdge(gridVertex(ix, iy), gridVertex(ix, iy + 1));
    }
  }

  const positions = new Float32Array(COUNT * 3);
  const scatter = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT * 3);
  const p = new THREE.Vector3();
  const jitter = () => (Math.random() * 2 - 1) * params.thickness;
  for (let i = 0; i < COUNT; i++) {
    if (Math.random() < params.edgeShare) {
      const [a, b] = edges[pick(edgeCdf, edgeTotal)];
      p.lerpVectors(a, b, Math.random());
      p.x += jitter();
      p.y += jitter();
      p.z += jitter();
    } else {
      const tri = tris[pick(triCdf, triTotal)];
      // uniform point in the triangle
      let u = Math.random();
      let v = Math.random();
      if (u + v > 1) {
        u = 1 - u;
        v = 1 - v;
      }
      p.copy(tri.a)
        .addScaledVector(ab.subVectors(tri.b, tri.a), u)
        .addScaledVector(ac.subVectors(tri.c, tri.a), v)
        .addScaledVector(tri.n, jitter());
    }
    p.toArray(positions, i * 3);

    // scatter: uniform in a ball
    const sr = SCATTER_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    scatter[i * 3] = sr * Math.sin(phi) * Math.cos(theta);
    scatter[i * 3 + 1] = sr * Math.sin(phi) * Math.sin(theta);
    scatter[i * 3 + 2] = sr * Math.cos(phi);

    seeds[i * 3] = Math.random();
    seeds[i * 3 + 1] = Math.random();
    seeds[i * 3 + 2] = Math.random();
  }
  src.dispose();

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));
  return geo;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function ParticleSphere() {
  const points = useRef();
  const intro = useRef(reducedMotion ? 1 : 0);
  const { gl, size } = useThree();

  const geometry = useMemo(buildGeometry, []);
  // Build the material here (not as <shaderMaterial uniforms={...}>): R3F copies a
  // `uniforms` prop into the material, so per-frame writes to our object would never
  // reach the shader.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uAssemble: { value: intro.current },
          uOpacity: { value: params.opacity * intro.current },
          uTurb: { value: reducedMotion ? 0 : params.turbulence },
          uSize: { value: params.pointSize },
          uScale: { value: 400 },
          uColor: { value: params.color },
          uNear: { value: CAMERA_DIST - RADIUS },
          uFar: { value: CAMERA_DIST + RADIUS },
          uDepthFade: { value: params.depthFade },
        },
      }),
    [],
  );
  const { uniforms } = material;

  // keep point size proportional to the canvas height, like Unfold
  uniforms.uScale.value = size.height * gl.getPixelRatio() * 0.5;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1); // don't fast-forward the intro after a hidden tab
    uniforms.uTime.value += dt;

    if (intro.current < 1) {
      intro.current = Math.min(1, intro.current + dt / INTRO_DUR);
      uniforms.uAssemble.value = easeOutCubic(intro.current);
      uniforms.uOpacity.value = params.opacity * Math.min(1, intro.current / 0.25);
    }

    const g = points.current;
    g.rotation.y += dt * SPIN * (reducedMotion ? 0.4 : 1);
    g.rotation.x = g.rotation.y * 0.6; // same diagonal tumble as the old sphere, slower
  });

  const phone = size.width <= PHONE_MAX_WIDTH;
  return (
    <points
      ref={points}
      geometry={geometry}
      material={material}
      position-y={phone ? (0.5 - PHONE_CENTER) * VISIBLE_HEIGHT : 0}
      scale={phone ? PHONE_SCALE : 1}
    />
  );
}

export default function Scene() {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, CAMERA_DIST], fov: FOV, near: 0.1, far: 100 }}
    >
      <ParticleSphere />
    </Canvas>
  );
}
