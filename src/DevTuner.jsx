import { useEffect, useState, useSyncExternalStore } from 'react';
import './DevTuner.css';
import {
  REPLAY_NAME,
  TUNE_DEFAULTS,
  getTuneVersion,
  setTune,
  subscribeTune,
  tune,
} from './Components/Scene/layout.js';

/* Dev-only sliders for the layout values in layout.js (App.jsx loads this only
 * under `npm run dev`). Changes apply live and persist in this browser until
 * reset; copy the values out and bake them into TUNE_DEFAULTS when settled. */

const KNOBS = [
  { key: 'homeCenter', label: 'Sphere height, home', min: 0.3, max: 0.7, step: 0.005 },
  { key: 'loweredCenter', label: 'Sphere height, view open', min: 0.5, max: 0.9, step: 0.005 },
  {
    key: 'phoneLoweredCenter',
    label: 'Sphere height, view open, phone',
    min: 0.5,
    max: 0.9,
    step: 0.005,
  },
  { key: 'loweredScale', label: 'Sphere size, view open', min: 0.5, max: 1.2, step: 0.01 },
  { key: 'textBias', label: 'Text position in gap', min: 0, max: 1, step: 0.01 },
  { key: 'hoverStrength', label: 'Hover strength', min: -0.4, max: 0.4, step: 0.01 },
  { key: 'hoverRadius', label: 'Hover radius', min: 0.1, max: 2, step: 0.01 },
  { key: 'hoverSpread', label: 'Hover spread', min: 0, max: 5, step: 0.05 },
  { key: 'hoverFollow', label: 'Hover follow speed', min: 1, max: 20, step: 0.5 },
  { key: 'hoverWhenOpen', label: 'Hover with view open', min: 0, max: 1, step: 0.05 },
  { key: 'nameCps', label: 'Name typing speed', min: 5, max: 200, step: 1 },
  { key: 'nameDelay', label: 'Name typing delay', min: 0, max: 1000, step: 10 },
];
const HINTS = {
  homeCenter: 'centre, fraction of screen height from top',
  loweredCenter: 'centre, fraction of screen height from top',
  phoneLoweredCenter: 'same, on screens ≤ 720px wide',
  loweredScale: '1 = same size as home',
  textBias: '0 = under name · 0.5 = equidistant · 1 = on sphere',
  hoverStrength: '+ bulges out · − presses a dent · 0 = off',
  hoverRadius: 'how wide the bulge is',
  hoverSpread: 'sideways push away from the cursor (visible face-on)',
  hoverFollow: 'how quickly it chases the cursor and fades',
  nameCps: 'letters per second (the name is 13)',
  nameDelay: 'ms after page load before the first letter',
  hoverWhenOpen: 'multiplier while About / Bookshelf is open',
};

const STORE = 'dev-tune';
try {
  const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
  if (saved) setTune(saved);
} catch {
  // storage unavailable or bad JSON: start from the defaults
}
const save = () => {
  try {
    localStorage.setItem(STORE, JSON.stringify(tune));
  } catch {
    // not persisting is fine
  }
};

// gaps (px) between the copy and what's above / the sphere below, for reading off
function measure() {
  const panel = document.querySelector('.panel');
  if (!panel || !panel.textContent) return null;
  const narrow = window.innerWidth <= 1051;
  const above = document.querySelector(narrow ? '.nav' : '.top').getBoundingClientRect().bottom;
  const p = panel.getBoundingClientRect();
  const overlay = document.querySelector('.overlay');
  const sphereTop = parseFloat(overlay.style.getPropertyValue('--sphere-top')) * window.innerHeight;
  return { above: Math.round(p.top - above), below: Math.round(sphereTop - p.bottom) };
}

export default function DevTuner() {
  useSyncExternalStore(subscribeTune, getTuneVersion);
  const [open, setOpen] = useState(true);
  const [gaps, setGaps] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setGaps(measure()), 200);
    return () => clearInterval(id);
  }, []);

  const values = Object.fromEntries(KNOBS.map(({ key }) => [key, +tune[key].toFixed(3)]));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(values, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard blocked: the values are shown in the panel anyway
    }
  };

  if (!open) {
    return (
      <button className="tuner-fab" onClick={() => setOpen(true)}>
        Tune
      </button>
    );
  }

  return (
    <div className="tuner">
      <div className="tuner-head">
        <strong>Layout</strong>
        <button onClick={() => setOpen(false)} aria-label="Hide tuning panel">
          ×
        </button>
      </div>
      {KNOBS.map(({ key, label, min, max, step }) => (
        <label key={key} className="tuner-knob">
          <span className="tuner-row">
            <span>{label}</span>
            <code>{values[key]}</code>
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={tune[key]}
            onChange={(e) => {
              setTune({ [key]: +e.target.value });
              save();
            }}
          />
          <span className="tuner-hint">{HINTS[key]}</span>
        </label>
      ))}
      <div className="tuner-gaps">
        {gaps
          ? `Text gap: ${gaps.above}px above · ${gaps.below}px below`
          : 'Open About or Bookshelf to see the text gaps'}
      </div>
      <div className="tuner-actions">
        <button onClick={copy}>{copied ? 'Copied' : 'Copy values'}</button>
        <button onClick={() => window.dispatchEvent(new Event(REPLAY_NAME))}>Replay name</button>
        <button
          onClick={() => {
            setTune(TUNE_DEFAULTS);
            save();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
