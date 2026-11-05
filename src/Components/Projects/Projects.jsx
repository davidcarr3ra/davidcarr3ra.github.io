/**
 * DEPRECATED (2026-07-03): This section is currently hidden from the frontend
 * (its <Projects /> render is commented out in App.jsx). It is intentionally
 * kept for future re-enable — DO NOT DELETE this file. To restore the section,
 * uncomment the import and render in App.jsx.
 */
import './ProjectGrid.css'; // grid styles (formerly the Work section's Work.css)
import airpay from '../images/projects/airpay.png';
import ethglobal from '../images/projects/ethglobal.svg';

export default function Projects() {
  return (
    <section id="projects">
      <div className="worktitle">
        <h2>PROJECTS</h2>
      </div>

      <div className="row_work work_grid">
        <div className="experience work_box br4 ba w-100-l shadow-5 pa4">
          <div className="box1">
            <img src={airpay} alt="Airpay" />
          </div>
          <div className="box2">
            <p>
              <a
                href="https://suipiens.com/blog/the-first-12-projects-funded-by-sui-foundation/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Airpay
              </a>
              , an off-ramp product on Sui and Aptos blockchains. Backed by
              <a
                href="https://mystenlabs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Mysten Labs{' '}
              </a>
              and
              <a
                href="https://martianwallet.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Martian Wallet.
              </a>
            </p>
          </div>
        </div>
        <div className="experience work_box br4 ba w-100-l shadow-5 pa4">
          <div className="box1">
            <img src={ethglobal} alt="ETHGlobal" />
          </div>
          <div className="box2">
            <p>
              <a
                href="https://ethglobal.com/showcase/solvify-jq62y"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solvify,{' '}
              </a>
              a chatbot application built during ETH NYC using GPT4 that takes
              user input and converts it into precise on-chain transactions. Won
              prizes from Arbitrum, 1inch, WalletConnect, among others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
