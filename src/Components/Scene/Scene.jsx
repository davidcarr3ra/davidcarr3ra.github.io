import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  CAMERA_DIST,
  FOV,
  PHONE_MAX_WIDTH,
  RADIUS,
  VISIBLE_HEIGHT,
  SCENE_READY,
  scene,
  sphereScale,
  tune,
} from './layout.js';

/* Particle sphere, after the particle cube on unfoldlabs.xyz: points spread
 * uniformly over a sphere's surface.
 *
 * Unfold draws bright points with additive blending on near-black. On this
 * site's light #ccc ground additive points wash out to white, so this uses
 * normal blending with dark points, and depth fades distant points toward the
 * background (lower alpha) instead of toward black. */

const COUNT = 14000;
const SCATTER_RADIUS = 2.2; // the dust cloud the intro coalesces from
const INTRO_DUR = 1.6; // seconds
const SPIN = 0.25; // rad/s about the tilted axis
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
uniform vec3 uPointer; // unit direction (sphere-local) under the cursor
uniform float uHover; // signed strength, already eased in/out
uniform float uHoverRadius;
uniform float uHoverSpread;
varying float vDepth;
varying float vLift;
void main() {
  vec3 turb = vec3(
    sin(uTime * 1.7 + aSeed.x * 6.2831853),
    sin(uTime * 2.3 + aSeed.y * 6.2831853),
    sin(uTime * 1.9 + aSeed.z * 6.2831853)
  );
  vec3 p = position + turb * uTurb;

  // cursor bulge: a gaussian of the chord distance from the cursor's point on
  // the sphere. Points lift along the normal (reads at the rim) and slide
  // away from the cursor along the surface, thinning a spot ringed by denser
  // points (reads face-on). Per-particle variation keeps it grainy.
  vec3 n = normalize(position);
  float d = distance(n, uPointer);
  float lift = exp(-(d * d) / (uHoverRadius * uHoverRadius));
  float grain = 0.6 + 0.8 * aSeed.x;
  vec3 away = n - uPointer;
  away -= n * dot(away, n);
  float awayLen = length(away);
  away = awayLen > 1e-4 ? away / awayLen : vec3(0.0);
  p += (n + away * uHoverSpread * (d / uHoverRadius)) * uHover * lift * grain;
  vLift = lift * abs(uHover);

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
varying float vLift;
void main() {
  // soft round sprite, computed analytically (no texture)
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = 1.0 - smoothstep(0.55, 1.0, d);
  if (a < 0.01) discard;
  // lifted points darken a touch so the bulge reads on the light ground
  float alpha = a * uOpacity * (1.0 - vDepth * uDepthFade) * (1.0 + vLift * 3.0);
  gl_FragColor = vec4(uColor, min(alpha, 1.0));
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

// Pointer in normalised device coordinates, from window events: the overlay
// covers the canvas, so the canvas's own pointer events can't be relied on.
// Touch has no hover, so a touch only counts while the finger is down.
function usePointer() {
  const pointer = useRef({ x: 0, y: 0, active: false });
  useEffect(() => {
    const p = pointer.current;
    const move = (e) => {
      p.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.y = -(e.clientY / window.innerHeight) * 2 + 1;
      p.active = e.pointerType !== 'touch' || e.buttons > 0 || e.type === 'pointerdown';
    };
    const end = (e) => {
      if (e.pointerType === 'touch') p.active = false;
    };
    const leave = () => (p.active = false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', leave);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', leave);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, []);
  return pointer;
}

function ParticleSphere({ lowered, loweredCenter }) {
  const points = useRef();
  const intro = useRef(reducedMotion ? 1 : 0);
  const { gl, size } = useThree();
  const pointer = usePointer();
  const hover = useMemo(
    () => ({
      amount: 0, // 0..1, eased presence of the cursor on the sphere
      ndc: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      ray: new THREE.Ray(),
      inverse: new THREE.Matrix4(),
      // a little larger than the shell so the rim catches the cursor too
      bounds: new THREE.Sphere(new THREE.Vector3(), RADIUS * 1.06),
      hit: new THREE.Vector3(),
    }),
    [],
  );

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
          uPointer: { value: new THREE.Vector3(0, 0, 1) },
          uHover: { value: 0 },
          uHoverRadius: { value: tune.hoverRadius },
          uHoverSpread: { value: tune.hoverSpread },
        },
      }),
    [],
  );
  const { uniforms } = material;

  // keep point size proportional to the canvas height, like Unfold
  uniforms.uScale.value = size.height * gl.getPixelRatio() * 0.5;

  useFrame((state, delta) => {
    if (!scene.ready) {
      // first frame: the intro starts now, so let the overlay start typing
      scene.ready = true;
      window.dispatchEvent(new Event(SCENE_READY));
    }
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

    const targetY = (0.5 - (lowered ? loweredCenter : tune.homeCenter)) * VISIBLE_HEIGHT;
    const targetScale = sphereScale(size.width <= PHONE_MAX_WIDTH, lowered);
    const ease = (from, to) =>
      reducedMotion ? to : THREE.MathUtils.damp(from, to, MOVE_RATE, dt);
    g.position.y = ease(g.position.y, targetY);
    g.scale.setScalar(ease(g.scale.x, targetScale));

    // where the cursor ray meets the sphere, in the points' own (rotating)
    // space: an analytic ray-sphere test, not a raycast against 14k points
    const h = hover;
    let onSphere = false;
    if (pointer.current.active && !reducedMotion) {
      h.ndc.set(pointer.current.x, pointer.current.y);
      h.raycaster.setFromCamera(h.ndc, state.camera);
      h.inverse.copy(g.matrixWorld).invert();
      h.ray.copy(h.raycaster.ray).applyMatrix4(h.inverse);
      onSphere = h.ray.intersectSphere(h.bounds, h.hit) !== null;
    }
    const k = 1 - Math.exp(-tune.hoverFollow * dt);
    if (onSphere) {
      h.hit.normalize();
      // jump straight there when arriving, glide when already showing
      if (h.amount < 0.02) uniforms.uPointer.value.copy(h.hit);
      else uniforms.uPointer.value.lerp(h.hit, k).normalize();
    }
    h.amount += ((onSphere ? 1 : 0) - h.amount) * k;
    uniforms.uHover.value =
      h.amount * tune.hoverStrength * (lowered ? tune.hoverWhenOpen : 1);
    uniforms.uHoverRadius.value = tune.hoverRadius;
    uniforms.uHoverSpread.value = tune.hoverSpread;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

export default function Scene({ lowered = false, loweredCenter = tune.loweredCenter }) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, CAMERA_DIST], fov: FOV, near: 0.1, far: 100 }}
    >
      <ParticleSphere lowered={lowered} loweredCenter={loweredCenter} />
    </Canvas>
  );
}
