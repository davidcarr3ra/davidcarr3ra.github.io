import React, { Component } from 'react';
import "./Work.css";
import palantir from '../images/experience/palantir.png';
import bloomberg from '../images/experience/bloomberg.png';

class Work extends Component {
  
  render() {

    return (
      <section id="experience">

        <div className="worktitle">
          <h2>WORK</h2>
        </div>

        <div className="row_work work_grid">
          <div className="experience work_box br4 ba w-100-l shadow-5 pa4"> {/* change wrapper to work box */}
            <div className="box1">
              <img src={palantir} />
            </div>
            <div className="box2">
              <p>Led projects in South Korea & USA in aviation, healthcare, electrical utilities, and heavy industries.</p>
            </div>
          </div>
          <div className="experience work_box br4 ba w-100-l shadow-5 pa4"> {/* change wrapper to work box */}
            <div className="box1">
              <img src={bloomberg} />
            </div>
            <div className="box2">
              <p>Built an event-driven data pipeline for Bloomberg's derivatives pricing platform, which processes between 800M-1.2B requests every day.</p>
            </div>
          </div>
        {/*
        <div className="work_item_descr experience palantir">
          <h3>Palantir Technologies</h3>
          <p className="info mb0">Forward Deployed Software Engineer<span>&bull;</span> <em className="date">2022</em><span>&bull;</span> <em className="date">New York</em></p>
          <p>Built an application within Foundry that allows PG&E operators to geospatially visualize, bundle, and edit work on the electrical grid, allowing the client to tackle more work while minimizing wildfire risk.</p>
        </div>
        <div className="work_item_descr experience bloomberg">
          <h3>Bloomberg</h3>
          <p className="info mb0">Software Engineer<span>&bull;</span> <em className="date">2021</em><span>&bull;</span> <em className="date">New York</em></p>
          <p>Built an event-driven data pipeline for Bloomberg's derivatives pricing platform, which processes between 800M-1.2B requests every day.</p>
        </div>*/}

        {/*<div className="descr cardinal_descr">
          <h3>Palantir Technologies</h3>
          <p className="info mb0">Forward Deployed Software Engineer<span>&bull;</span> <em className="date">Summer Summer 2022</em><span>&bull;</span> <em className="date">New York</em></p>
          <p>Built an application within Foundry that allows PG&E operators to geospatially visualize, bundle, and edit work on the electrical grid, allowing the client to tackle more work while minimizing wildfire risk.</p>
        </div>
        <div className="pic_container cardinal_pic">
          <img className="work_image br4 shadow-5" alt="" src="images/experience/cardinal.png"/>
        </div>*/}

       </div>

      {/*<div className="bottom_line w-60 center"></div>*/}

      </section>
    );
  }
}

export default Work;

