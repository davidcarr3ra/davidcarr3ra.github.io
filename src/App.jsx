import { lazy, Suspense } from 'react';
import 'tachyons/css/tachyons.min.css';
import './App.css';
import Header from './Components/Header/Header.jsx';
import About from './Components/About/About.jsx';
import Work from './Components/Experience/Work.jsx';
import Projects from './Components/Projects/Projects.jsx';
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
      <Projects />
      <Bookshelf />
      <Footer />
    </div>
  );
}
