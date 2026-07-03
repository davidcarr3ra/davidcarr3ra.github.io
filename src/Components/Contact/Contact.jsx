export default function Contact() {
  return (
    <footer id="contact">
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            <li key="twitter">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/davidcarr3ra"
                aria-label="X (Twitter)"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </li>
            <li key="github">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/davidcarr3ra"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li key="linkedin">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/davidcarrera99/"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a href="#home" aria-label="Back to top">
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
