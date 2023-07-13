import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Axios from 'axios';
import Body from './components/body';
import Footer from './components/footer';



function Home(props) {
  return (
    <div className="App">
      <Header bg_color="" enableHover={props.enableHover}/>
      <Body enableHover={props.enableHover}/>
      <Footer enableHover={props.enableHover}/>
    </div>
  );
}

export default Home;