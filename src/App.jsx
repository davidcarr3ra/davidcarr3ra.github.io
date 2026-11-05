import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import './App.css';
import { VIEWS } from './content.js';
import { TypedView, useTypewriter } from './Typewriter.jsx';
import {
  PHONE_MAX_WIDTH,
  getTuneVersion,
  loweredCenter,
  loweredRadius,
  subscribeTune,
  tune,
} from './Components/Scene/layout.js';
// DEPRECATED (2026-07-03): the Projects section is hidden from the frontend but
// intentionally kept for future re-enable. Do NOT delete Projects.jsx or this
// import. It was built for the old scrolling layout; to bring it back, port its
// copy into content.js as a view and add a nav link.
// import Projects from './Components/Projects/Projects.jsx';

// Three.js is heavy; load the particle sphere in a separate chunk.
const Scene = lazy(() => import('./Components/Scene/Scene.jsx'));
// layout sliders for local tuning; never part of the production build
const DevTuner = import.meta.env.DEV ? lazy(() => import('./DevTuner.jsx')) : null;

const RESUME_URL =
  'https://drive.google.com/file/d/1JN7gU383xu9ltaMyEH14Ww9Hq2Hw2Bxg/view?usp=sharing';

const NAV = [
  { key: 'about', label: 'About' },
  { key: 'bookshelf', label: 'Bookshelf' },
];

// Single-screen site: the sphere fills the viewport and the copy panel types in
// the current view. The view lives in the URL hash so links, reloads and the
// back button all work without a router. No hash = just the name and sphere.
function viewFromHash() {
  const key = window.location.hash.slice(1);
  return key in VIEWS ? key : null;
}

function useHashView() {
  const [view, setView] = useState(viewFromHash);
  useEffect(() => {
    const onChange = () => setView(viewFromHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return view;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// Where the open-view sphere's top edge goes, as a fraction of the viewport
// height: the tuned spot, or lower if the copy wouldn't fit above it (short
// screens, long views), so the copy never overlaps the sphere.
function useSphereTop(panel, view, isPhone, tuneVersion) {
  const tunedTop = loweredCenter(isPhone) - loweredRadius(isPhone);
  const [fitTop, setFitTop] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      const el = panel.current;
      if (!el || !view) return setFitTop(0);
      // the panel's height doesn't depend on the sphere, and neither does
      // what sits above it, so this can't feed back into itself
      const above = el.parentElement.querySelector(window.innerWidth <= 1051 ? '.nav' : '.top');
      const gap = parseFloat(getComputedStyle(el).getPropertyValue('--gap-y')) || 0;
      const needed = above.getBoundingClientRect().bottom + 2 * gap + el.offsetHeight;
      setFitTop(needed / window.innerHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [panel, view, isPhone, tuneVersion]);
  return Math.max(tunedTop, fitTop);
}

const SOCIALS = [
  { label: 'X', href: 'https://twitter.com/davidcarr3ra' },
  { label: 'GitHub', href: 'https://github.com/davidcarr3ra' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidcarrera99/' },
];

export default function App() {
  const view = useHashView();
  const typed = useTypewriter(view);
  const isPhone = useMediaQuery(`(max-width: ${PHONE_MAX_WIDTH}px)`);
  const tuneVersion = useSyncExternalStore(subscribeTune, getTuneVersion); // re-render on tuning
  const panel = useRef(null);
  const sphereTop = useSphereTop(panel, typed.view, isPhone, tuneVersion);

  return (
    <>
      <div className="scene" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene lowered={Boolean(view)} loweredCenter={sphereTop + loweredRadius(isPhone)} />
        </Suspense>
      </div>

      {/* --sphere-top: where the lowered sphere's top edge sits, so the copy can
          centre itself between the name and the sphere */}
      <div className="overlay" style={{ '--sphere-top': sphereTop }}>
        <div className="upper">
          <header className="top">
            <a className="brand" href="#">
              <h1>David Carrera</h1>
            </a>
          </header>

          <nav className="nav" aria-label="Primary">
            {NAV.map(({ key, label }) => (
              // toggles: clicking the open view's link closes it
              <a
                key={key}
                href={view === key ? '#' : `#${key}`}
                aria-current={view === key ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          </nav>

          {/* the spacers split the free room above and below the copy by
              tune.textBias (0.5 = equidistant from the name and the sphere) */}
          <div className="spacer" style={{ flexGrow: tune.textBias }} />
          {/* hidden from screen readers only while it types / deletes, so they read
              the settled copy rather than every keystroke */}
          <main ref={panel} className="panel" aria-hidden={typed.caret || typed.view !== view}>
            {/* invisible full copy of the showing view: holds the panel at its
                final height so the centred box doesn't drift as text types in */}
            <div className="panel-sizer" aria-hidden="true">
              <TypedView view={typed.view} chars={Infinity} caret={false} />
            </div>
            <div className="panel-text">
              <TypedView {...typed} />
            </div>
          </main>
          <div className="spacer" style={{ flexGrow: 1 - tune.textBias }} />
        </div>

        <footer className="bottom">
          {SOCIALS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </footer>
      </div>

      {DevTuner && (
        <Suspense fallback={null}>
          <DevTuner />
        </Suspense>
      )}
    </>
  );
}
