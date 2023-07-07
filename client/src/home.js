import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Axios from 'axios';
import Body from './components/body';
import Footer from './components/footer';



function Home() {
  return (
    <div className="App">
      <Header bg_color=""/>
      <Body />
      <Footer/>
    </div>
  );
}

export default Home;