import React, { Component } from 'react';
import "./About.css";

class About extends Component {
  render() {

    // if(this.props.data){
      /*var name = this.props.data.name;*/
      // var profilepic= "images/"+this.props.data.image;
      // var bio = this.props.data.bio;
      /*var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;*/
    // }

    return (
      <section id="about">
      <div className="abouttitle">
         <h2>ABOUT</h2>
      </div>
      <div className="row_about container1">
         <div className="abouttext">
            <p>Software engineer</p>
            <p>Born in Colombia, raised in Azerbaijan</p>
            <p>Currently: Engineering @ Palantir</p>
            <p>Previously: Engineering @ Bloomberg, CS @ Columbia University</p>
            <p>Also, music</p>
         </div>
      </div>
   </section>
    );
  }
}

export default About;
