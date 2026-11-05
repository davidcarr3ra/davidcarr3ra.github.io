import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { VIEWS } from './content.js';
import { FullView, TypedView, useTypewriter } from './Typewriter.jsx';
// DEPRECATED (2026-07-03): the Projects section is hidden from the frontend but
// intentionally kept for future re-enable. Do NOT delete Projects.jsx or this
// import. It was built for the old scrolling layout; to bring it back, port its
// copy into content.js as a view and add a nav link.
// import Projects from './Components/Projects/Projects.jsx';

// Three.js is heavy; load the particle sphere in a separate chunk.
const Scene = lazy(() => import('./Components/Scene/Scene.jsx'));

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

const SOCIALS = [
  { label: 'X', href: 'https://twitter.com/davidcarr3ra' },
  { label: 'GitHub', href: 'https://github.com/davidcarr3ra' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidcarrera99/' },
];

export default function App() {
  const view = useHashView();
  const typed = useTypewriter(view);

  return (
    <>
      <div className="scene" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene lowered={Boolean(view)} />
        </Suspense>
      </div>

      <div className="overlay">
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

        <main className="panel">
          <div aria-hidden="true">
            <TypedView {...typed} />
          </div>
          <div className="sr-only" aria-live="polite">
            <FullView view={view} />
          </div>
        </main>

        <footer className="bottom">
          {SOCIALS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </footer>
      </div>
    </>
  );
}
