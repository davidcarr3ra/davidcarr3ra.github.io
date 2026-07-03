import { lazy, Suspense } from 'react';
import 'tachyons/css/tachyons.min.css';
import './App.css';
import Header from './Components/Header/Header.jsx';
import About from './Components/About/About.jsx';
import Work from './Components/Experience/Work.jsx';
// DEPRECATED (2026-07-03): the Projects section is hidden from the frontend but
// intentionally kept for future re-enable. Do NOT delete Projects.jsx or this
// import — to bring the section back, uncomment this line and the <Projects />
// render below.
// import Projects from './Components/Projects/Projects.jsx';
import Bookshelf from './Components/Bookshelf/Bookshelf.jsx';
import Footer from './Components/Contact/Contact.jsx';

// Three.js is heavy; load the decorative 3D header scene in a separate chunk.
const Scene = lazy(() => import('./Components/Header/Scene.jsx'));

export default function App() {
  return (
    <div className="App">
      <Header>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Header>
      <About />
      <Work />
      {/* DEPRECATED (2026-07-03): Projects section hidden from the frontend.
          Do NOT delete — re-enable by uncommenting this and its import above. */}
      {/* <Projects /> */}
      <Bookshelf />
      <Footer />
    </div>
  );
}
