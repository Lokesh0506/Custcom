import React, { useEffect, useState } from 'react';
import { H1, H2, H3, IMG, P, A } from './tags';
import './header.css';
import { setStyle, setContent, setHref, setSrc,setSrcprod } from './dbfunctions';
import Axios from 'axios';

const Header = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8080/home')
      .then(response => {
        setData(response.data.header);
        console.log(response.data.header);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const st = { backgroundColor: props.bg_color };

  return (
    <div style={st} className='header'>
      <IMG enableHover={props.enableHover} id="logo" src={setSrc(data, 'logo')} style={setStyle(data, 'sub-title')} />
      <H1 id="title" enableHover={props.enableHover} content={setContent(data, 'title')} style={setStyle(data, 'title')} />

      <div className="nav">
        <A href={`/home?enable=${props.enableHover}`} enableHover={props.enableHover} content={setContent(data, 'home')} style={setStyle(data, 'home')} />
        <div className="category_div">
          <A className="category_a" enableHover={props.enableHover} href={setHref(data, "category")} content={setContent(data, 'category')} style={setStyle(data, 'category')} />
          <div className="category_drpdwn">
            <a href={`/grocery?enable=${props.enableHover}`}>Grocery</a><br />
            <a href={`/electronic?enable=${props.enableHover}`}>Electronics</a><br />
            <a href={`/books?enable=${props.enableHover}`}>Books</a><br />
          </div>
        </div>
        <A id="cart" enableHover={props.enableHover} href={`/cart?enable=${props.enableHover}`} content={<IMG id="cartimg" src={setSrc(data, 'cart_img')} />} />
      </div>
    </div>
  );
};

export default Header;
