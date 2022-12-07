import React, { Component } from 'react';
import {HashLink as Link} from 'react-router-hash-link';

class Contact extends Component {
  render() {

    /*if(this.props.data){
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a target="_blank" rel="noopener noreferrer" href={network.url}><i className={network.className}></i></a></li>
      })
    }*/

    return (
      <footer id="contact">
        <div>
          {/*<h1 className="tc pb4">Contact</h1>
          <p className="tc pl4 pr4">Best way to get in touch with me: <a href="mailto: david.carrera@columbia.edu">david.carrera@columbia.edu</a>. Feel free to reach out!</p>*/}
          
          {/*<div className="row">
            <div className="twelve-columns">
              <ul className="social-links">
                  {networks}
              </ul>
            </div>
          </div>*/}
        </div>

       <div className="row">
          <div className="twelve columns">
             <ul className="social-links">
                <li key="twitter"><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/davidcarr3ra"><i className="fa fa-twitter"></i></a></li>
                <li key="github"><a target="_blank" rel="noopener noreferrer" href="https://github.com/davidcarr3ra"><i className="fa fa-github"></i></a></li>
                <li key="linkedin"><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/davidcarrera99/"><i className="fa fa-linkedin"></i></a></li>
             </ul>

          </div>
         <div id="go-top"><Link smooth to="#home"><i className="icon-up-open"></i></Link></div>
       </div>
      </footer>
    );
  }
}

export default Contact;
