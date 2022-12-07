import React, { Component } from 'react';
import "./Work.css";
import palantir from '../images/experience/palantir.png';
import bloomberg from '../images/experience/bloomberg.png';
import airpay from '../images/experience/airpay.png';

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
            <img src={airpay} />
          </div>
          <div className="box2">
            <p>Off-ramp product for Aptos blockchain, backed by Martian Wallet. Currently in testflight.</p>
          </div>
        </div>
        <div className="experience work_box br4 ba w-100-l shadow-5 pa4"> {/* change wrapper to work box */}
          <div className="box1">
            <img src={palantir} />
          </div>
          <div className="box2">
            <p>Built an application within Foundry that allows PG&E operators to geospatially visualize, bundle, and edit work on California's electrical grid, minimizing wildfire risk.</p>
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
        {/* <div className="work_item_descr experience testhover">
          <h3>Testing</h3>
        </div>
        <div className="work_item_descr experience testhover hide">
          <h3>Hey there!</h3>
        </div> */}
        {/*<div className="work_item_descr experience hypermatter">
          <h3>Airpay</h3>
          <p className="info mb0">Cofounder<span>&bull;</span> <em className="date">2022</em><span>&bull;</span> <em className="date">New York</em></p>
          <p>Off-ramp product for Aptos blockchain, backed by Martian Wallet. Currently in testflight.</p>
        </div>
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
        </div>

        <div className="descr afb_descr">
          <h3>AFB Bank</h3>
          <p className="info">Treasury Intern<span>&bull;</span> <em className="date">September - December 2018</em><span>&bull;</span> <em className="date">Baku, Azerbaijan</em></p>
          <p>Carried out research on public equities while working as part of the Treasury Department. Presented findings to Treasury head, and provided input on the portfolio, emphasizing a more value-oriented approach for steady long term returns. Shadowed a forex trader and learned the basics of technical analysis.</p>
        </div>
        <div className="pic_container afb_pic">
          <img src="images/experience/afb.png" alt="" style={{width: "225px"}}/>
        </div>

        <div className="descr franks_descr">
          <h3>Frank's International</h3>
          <p className="info mb0">Accountant Intern<span>&bull;</span> <em className="date">Summer 2017</em><span>&bull;</span> <em className="date">Baku, Azerbaijan</em></p>
          <p>Analyzed profit/loss reports for the Caspian region, and noticed an inefficiency arising from oil rig selection. Developed a financial model using Excel forecasting EBITDA based on an optimal combination of operational oil rigs, and presented it to district manager Adam Stanford. Model was used in executive decisions concerning rig selection.</p>
        </div>
        <div className="pic_container franks_pic">
          <img className="work_image br4 shadow-5" alt="" src="images/experience/franks.jpg"/>
        </div>*/}

    </div>

    {/*<div className="bottom_line w-60 center"></div>*/}

   </section>
    );
  }
}

export default Work;

