import React, { Component } from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Contact extends Component {
  render() {
    return (
      <footer id="contact">
       <div className="row">
          <div className="twelve columns">
             <ul className="social-links">
                <li key="twitter"><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/davidcarr3ra"><i className="fa-brands fa-x-twitter"></i></a></li>
                <li key="github"><a target="_blank" rel="noopener noreferrer" href="https://github.com/davidcarr3ra"><i className="fa-brands fa-github"></i></a></li>
                <li key="linkedin"><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/davidcarrera99/"><i className="fa-brands fa-linkedin"></i></a></li>
             </ul>

          </div>
         <div id="go-top"><Link smooth to="#home"><i className="icon-up-open"></i></Link></div>
       </div>
      </footer>
    );
  }
}

export default Contact;
