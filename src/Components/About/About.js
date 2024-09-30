import React, { Component } from 'react';
import "./About.css";

class About extends Component {
  render() {

    return (
      <section id="about">
      <div className="abouttitle">
         <h2>ABOUT</h2>
      </div>
      <div className="row_about container1">
         <div className="abouttext">
            <p>Hi! My name is David Carrera. I'm a software engineer at Palantir and a CS graduate from Columbia University. I love playing guitar, piano, reading, and aimless walks.</p>
         </div>
      </div>
   </section>
    );
  }
}

export default About;
