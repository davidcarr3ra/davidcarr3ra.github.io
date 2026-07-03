import './Work.css';
import palantir from '../images/experience/palantir.png';
import bloomberg from '../images/experience/bloomberg.png';

export default function Work() {
  return (
    <section id="experience">
      <div className="worktitle">
        <h2>WORK</h2>
      </div>

      <div className="row_work work_grid">
        <div className="experience work_box br4 ba w-100-l shadow-5 pa4">
          <div className="box1">
            <img src={palantir} alt="Palantir" />
          </div>
          <div className="box2">
            <p>
              Led projects in South Korea &amp; USA in aviation, healthcare,
              electrical utilities, and heavy industries.
            </p>
          </div>
        </div>
        <div className="experience work_box br4 ba w-100-l shadow-5 pa4">
          <div className="box1">
            <img src={bloomberg} alt="Bloomberg" />
          </div>
          <div className="box2">
            <p>
              Built an event-driven data pipeline for Bloomberg's derivatives
              pricing platform, which processes between 800M-1.2B requests every
              day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
