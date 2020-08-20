import React, { Component } from 'react';
import "./Experience.css";

class Experience extends Component {
  
  render() {

    return (
      <section id="experience">

      <div className="row_work container2">
        <div className="experience_title">
          <h1><span>Experience</span></h1>
        </div>

        <div className="descr cardinal_descr">
          <h3>Cardinal Sol</h3>
          <p className="info mb0">Quantitative Software Engineering Intern<span>&bull;</span> <em className="date">Summer 2020 - Present</em><span>&bull;</span> <em className="date">New York</em></p>
          <p>Currently developing a quantitative investment strategy alongside a team of software engineering interns. The program is built in Python and implements data-cleaning and machine learning algorithms from scratch, leveraging Scikit-learn for cross-validation, as well as Pandas and NumPy for data manipulation. The underlying strategy, inspired by some works in financial academic journals, aims to predict the movement of major market indices based on various consumer sentiment metrics, where overfitting is managed through feature-selection techniques.</p>
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
        </div>

    </div>

    <div className="bottom_line w-60 center"></div>

   </section>
    );
  }
}

export default Experience;

