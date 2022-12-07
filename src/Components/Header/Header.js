import React, { Component } from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import "./Header.css";

class Header extends Component {
  render() {

    // if(this.props.data){
    //    var project = this.props.data.project;
    //    var github = this.props.data.github;
    //    var name = this.props.data.name;
    //    var description= this.props.data.description;
    //    var city= this.props.data.address.city;
    //    var networks= this.props.data.social.map(function(network){
    //    return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
    //    })
    // }

    return (
      <header id="home">
         <nav id="nav-wrap">
            {/*<a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>*/}
            <ul id="nav" className="nav">
               {/*<li className="current"><a className="smoothscroll" href="#home">Home</a></li>
               <li><a className="smoothscroll" href="#about">About</a></li>
               <li><a className="smoothscroll" href="#experience">Experience</a></li>
               <li><a className="smoothscroll" href="#projects">Projects</a></li>
               <li><a className="smoothscroll" href="#skills">Skills</a></li>
               <li><a className="smoothscroll" href="#bookshelf">Bookshelf</a></li>
               <li><a className="smoothscroll" href="#contact">Contact</a></li>
               <li><a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1YU0IWb3xLywHCHGLs0YSm47iU9_CeCOF/view?usp=sharing">Resume</a></li>*/}
               <li>
                     <Link smooth to="#home">Home</Link>
               </li>
               <li>
                     <Link smooth to="#about">About</Link>
               </li>
               <li>
                     <Link smooth to="#experience">Work</Link>
               </li>
               <li>
                     <Link smooth to="#bookshelf">Bookshelf</Link>
               </li>
               <li>
                     <Link smooth to="#contact">Contact</Link>
               </li>
               <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1JN7gU383xu9ltaMyEH14Ww9Hq2Hw2Bxg/view?usp=sharing">Resume</a>
               </li>
            </ul>
         </nav>

         <div className="row banner h-100" style={{position: "relative", verticalAlign: "top", top: "70px"}}>
      
            <div className="banner-text h-100">
               <h1 className="main-header">David Carrera</h1>
               {/*<h3>{description}.</h3>
               <hr />
               <ul className="social">
                  <a href={project} className="button btn project-btn"><i className="fa fa-book"></i>Project</a>
                  <a href={github} className="button btn github-btn"><i className="fa fa-github"></i>Github</a>
               </ul> */ }

               <div className="sphere h-75 ma0 pa0">
                  {this.props.children}
               </div>

            </div>
         </div>

         <p className="scrolldown">
            <Link smooth to="#about">
               <i className="icon-down-circle"></i>
            </Link>
         </p>

      </header>
    );
  }
}

export default Header;

