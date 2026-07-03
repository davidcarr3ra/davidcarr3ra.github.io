import './Header.css';

const RESUME_URL =
  'https://drive.google.com/file/d/1JN7gU383xu9ltaMyEH14Ww9Hq2Hw2Bxg/view?usp=sharing';

export default function Header({ children }) {
  return (
    <header id="home">
      <nav id="nav-wrap">
        <ul id="nav" className="nav">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Work</a></li>
          {/* DEPRECATED (2026-07-03): Projects section hidden from frontend.
              Do NOT delete — re-enable alongside <Projects /> in App.jsx. */}
          {/* <li><a href="#projects">Projects</a></li> */}
          <li><a href="#bookshelf">Bookshelf</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href={RESUME_URL}>
              Resume
            </a>
          </li>
        </ul>
      </nav>

      <div
        className="row banner h-100"
        style={{ position: 'relative', verticalAlign: 'top', top: '70px' }}
      >
        <div className="banner-text h-100">
          <h1 className="main-header">David Carrera</h1>
          <div className="sphere h-75 ma0 pa0">{children}</div>
        </div>
      </div>

      <p className="scrolldown">
        <a href="#about" aria-label="Scroll to about section">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
}
