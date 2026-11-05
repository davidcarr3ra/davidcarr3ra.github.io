import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import About from './Components/About/About.jsx';
import Bookshelf from './Components/Bookshelf/Bookshelf.jsx';
// DEPRECATED (2026-07-03): the Projects section is hidden from the frontend but
// intentionally kept for future re-enable. Do NOT delete Projects.jsx or this
// import. It was built for the old scrolling layout; to bring it back, add it to
// VIEWS below (and a nav link) and restyle it for the overlay's copy region.
// import Projects from './Components/Projects/Projects.jsx';

// Three.js is heavy; load the particle sphere in a separate chunk.
const Scene = lazy(() => import('./Components/Scene/Scene.jsx'));

const RESUME_URL =
  'https://drive.google.com/file/d/1JN7gU383xu9ltaMyEH14Ww9Hq2Hw2Bxg/view?usp=sharing';

// Single-screen site: the sphere fills the viewport and the copy region swaps
// between views. The view lives in the URL hash so links, reloads and the back
// button all work without a router.
const VIEWS = { about: About, bookshelf: Bookshelf };
const DEFAULT_VIEW = 'about';

function viewFromHash() {
  const key = window.location.hash.slice(1);
  return key in VIEWS ? key : DEFAULT_VIEW;
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

const SOCIALS = [
  { label: 'X', href: 'https://twitter.com/davidcarr3ra' },
  { label: 'GitHub', href: 'https://github.com/davidcarr3ra' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidcarrera99/' },
];

export default function App() {
  const view = useHashView();
  const View = VIEWS[view];

  return (
    <>
      <div className="scene" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <div className="overlay">
        <header className="top">
          <a className="brand" href="#about">
            <h1>David Carrera</h1>
          </a>
        </header>

        <main className="copy-region" aria-live="polite">
          {/* key remounts the view so each swap replays the fade-in */}
          <div key={view} className="view">
            <View />
          </div>
        </main>

        <nav className="nav" aria-label="Primary">
          <a href="#about" aria-current={view === 'about' ? 'page' : undefined}>
            About
          </a>
          <a href="#bookshelf" aria-current={view === 'bookshelf' ? 'page' : undefined}>
            Bookshelf
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
        </nav>

        <footer className="bottom">
          <div className="social">
            {SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
          <span className="muted">© {new Date().getFullYear()} David Carrera</span>
        </footer>
      </div>
    </>
  );
}
