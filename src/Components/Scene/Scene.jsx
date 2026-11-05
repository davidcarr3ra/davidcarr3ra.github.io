import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* Particle sphere, after the particle cube on unfoldlabs.xyz: points spread
 * uniformly over a sphere's surface.
 *
 * Unfold draws bright points with additive blending on near-black. On this
 * site's light #ccc ground additive points wash out to white, so this uses
 * normal blending with dark points, and depth fades distant points toward the
 * background (lower alpha) instead of toward black. */

const RADIUS = 0.76; // a touch larger than Unfold's cube (~0.66) with the same camera
const COUNT = 14000;
const SCATTER_RADIUS = 2.2; // the dust cloud the intro coalesces from
const INTRO_DUR = 1.6; // seconds
const SPIN = 0.25; // rad/s about the tilted axis

const CAMERA_DIST = 6.9; // Unfold: fov 38 at ~6.9 units
const FOV = 38;
const VISIBLE_HEIGHT = 2 * CAMERA_DIST * Math.tan(THREE.MathUtils.degToRad(FOV / 2));

// The copy panel runs down from under the name, so while it is showing the
// sphere eases into the lower half (centre at 68% of the height) and shrinks a
// little, like the cube dropping lower on Unfold's about page. Phones also get a
// slightly smaller sphere overall.
const LOWERED_CENTER = 0.68;
const LOWERED_SCALE = 0.88;
const PHONE_MAX_WIDTH = 720;
const PHONE_SCALE = 0.8;
const MOVE_RATE = 4; // 1/s, exponential ease toward the target position

const params = {
  color: new THREE.Color('#1c1c1c'),
  opacity: 0.55, // per-point alpha; density builds up where points overlap
  pointSize: 0.03,
  thickness: 0.01, // radial jitter, so the shell reads as a volume
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

// A uniformly random direction (unit vector) written into `out`.
function randomDirection(out) {
  const theta = Math.random() * Math.PI * 2;
  const z = 2 * Math.random() - 1;
  const r = Math.sqrt(1 - z * z);
  return out.set(r * Math.cos(theta), r * Math.sin(theta), z);
}

function buildGeometry() {
  const positions = new Float32Array(COUNT * 3);
  const scatter = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT * 3);
  const p = new THREE.Vector3();
  for (let i = 0; i < COUNT; i++) {
    randomDirection(p).multiplyScalar(RADIUS + (Math.random() * 2 - 1) * params.thickness);
    p.toArray(positions, i * 3);

    // scatter: uniform in a ball
    randomDirection(p).multiplyScalar(SCATTER_RADIUS * Math.cbrt(Math.random()));
    p.toArray(scatter, i * 3);

    seeds[i * 3] = Math.random();
    seeds[i * 3 + 1] = Math.random();
    seeds[i * 3 + 2] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));
  return geo;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function ParticleSphere({ lowered }) {
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

    const targetY = lowered ? (0.5 - LOWERED_CENTER) * VISIBLE_HEIGHT : 0;
    const targetScale =
      (size.width <= PHONE_MAX_WIDTH ? PHONE_SCALE : 1) * (lowered ? LOWERED_SCALE : 1);
    const ease = (from, to) =>
      reducedMotion ? to : THREE.MathUtils.damp(from, to, MOVE_RATE, dt);
    g.position.y = ease(g.position.y, targetY);
    g.scale.setScalar(ease(g.scale.x, targetScale));
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

export default function Scene({ lowered = false }) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, CAMERA_DIST], fov: FOV, near: 0.1, far: 100 }}
    >
      <ParticleSphere lowered={lowered} />
    </Canvas>
  );
}
