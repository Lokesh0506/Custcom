import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Footer from './components/footer';
import { useLocation } from 'react-router-dom';
import Cartbody from './components/Cartbody';



function Cart(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const en = queryParams.get('enable');

  const [enableHover, setHover] = useState(false);

useEffect(() => {
  if (en === 'true') {
    setHover(true);
  }
}, []);
 
  return (
    <div className="App">
      <Header bg_color={props.header_color} className="cart_header" category={"cart"} enableHover={enableHover}/>
      <Cartbody category={"cart"}  className="cart_body" enableHover={enableHover} bg_color={props.body_color}/>
      <Footer bg_color={props.footer_color} category={"cart"}  className="cart_footer" enableHover={enableHover}/>
    </div>
  );
}

export default Cart;