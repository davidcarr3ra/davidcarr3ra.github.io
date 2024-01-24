import React, { Component } from 'react';
// import "./Projects.css";
import "../Experience/Work.css"; // reusing css components from work component
import airpay from '../images/projects/airpay.png';
import ethglobal from '../images/projects/ethglobal.svg';

class Projects extends Component {
  
  render() {
    return (
      <section id="projects">

        <div className="worktitle">
          <h2>PROJECTS</h2>
        </div>

        <div className="row_work work_grid">
          <div className="experience work_box br4 ba w-100-l shadow-5 pa4">
            <div className="box1">
              <img src={airpay} />
            </div>
            <div className="box2">
              <p>
                <a href="https://suipiens.com/blog/the-first-12-projects-funded-by-sui-foundation/" target="_blank">Airpay</a>
                , an off-ramp product on Sui and Aptos blockchains. Secured 60k in grant funding from
                <a href="https://mystenlabs.com/" target="_blank"> Mysten Labs </a>
                and
                <a href="https://martianwallet.xyz/" target="_blank"> Martial Wallet.</a>
              </p>
            </div>
          </div>
          <div className="experience work_box br4 ba w-100-l shadow-5 pa4">
            <div className="box1">
              <img src={ethglobal} />
            </div>
            <div className="box2">
              <p>
                <a href="https://ethglobal.com/showcase/solvify-jq62y" target="_blank">Solvify, </a>
                a chatbot application built during ETH NYC using GPT4 that takes user input and converts it into precise on-chain transactions. 
                Won prizes from Arbitrum, 1inch, WalletConnect, among others.
              </p>
            </div>
          </div>

        </div>

      </section>
    );
  }
}

export default Projects;