import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Axios from 'axios';
import Cartbody from './components/Cartbody';




function Cart() {
  return (
    <div className="App">
      <Header bg_color=""/>
      <Cartbody />
    </div>
  );
}

export default Cart;