import React, { Component, useRef} from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
// import $ from 'jquery';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Contact/Contact';
import About from './Components/About/About';
import Work from './Components/Experience/Work';
import Portfolio2 from './Components/Projects/Projects';
import Skills from "./Components/Skills/Skills";
import Bookshelf from "./Components/Bookshelf/Bookshelf";
import "tachyons";
import {Canvas, useFrame} from "react-three-fiber";

const Sphere = () => {
  const mesh = useRef(null);
  useFrame(() => mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
  return(
    <mesh ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[1,10,5]} /> {/*20, 10*/}
      <meshPhongMaterial attach="material" flatShading="true" color="#333333" />
    </mesh>
  );
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

  }

  /*getResumeData(){
    $.ajax({
      url:'./resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }*/

  getFOV() {
    let fov = 0;
    if(window.innerWidth <= 425) {
      fov = 20;
    } else if(window.innerWidth>425 && window.innerWidth < 780) {
      fov = 15;
    } else {
      fov = 14;
    }
    return fov;
  }

  componentDidMount(){
    // this.getResumeData();
    // const script = document.createElement("script");
    // script.src = "./Components/sphere/sphere.js";
    // script.async = true;
    // document.body.appendChild(script);
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Header /*data={this.state.resumeData.main}*/ >
              {/*<Canvas colorManagement camera={{position: [-5, 2, 10], fov:14}}>
                <ambientLight intensity={1}/>
                {/*<pointLight position={[-10, 0, -20]} intensity={0.5}/>
                <pointLight position={[-10, 0, -8]} intensity={0.5}/>
                <Sphere/>
              </Canvas>*/}
              <Canvas colorManagement camera={{position: [-5, 2, 10], fov:this.getFOV()}}>
                <ambientLight intensity={1}/>
                {/*<pointLight position={[-10, 0, -20]} intensity={0.5}/>*/}
                <pointLight position={[-10, 0, -8]} intensity={0.5}/>
                <Sphere/>
              </Canvas>
            </Header>
            <About /*data={this.state.resumeData.main}*//>
            {/*<Resume data={this.state.resumeData.resume}/>*/}
            <Work /*data={this.state.resumeData.resume}*//>
            {/*<Portfolio2 />*/}
            {/*<Skills data={this.state.resumeData.resume} />*/}
            <Bookshelf />
            {/*<Portfolio data={this.state.resumeData.portfolio}/>*/}
            {/*<Contact data={this.state.resumeData.main}/>*/}
            <Footer /*data={this.state.resumeData.main}*/ />
        </div>
      </Router>
    );
  }
}

export default App;
