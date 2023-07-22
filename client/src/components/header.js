import React, { useEffect, useState } from 'react';
import { H1, H2, H3, IMG, P, A, AIMG } from './tags';
import './header.css';
import { setStyle, setContent, setHref, setSrc,setSrcprod } from './dbfunctions';
import Axios from 'axios';
import { handleHover } from './tags';

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

  const fontfetch = (data) => {
    const fontLinks = data.map((fontStyle) => {
      const { font_family } = fontStyle;
      if (font_family) {
        return (
          <link key={font_family} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font_family}`} />
        );
      }
      return null;
    });
  
    return fontLinks;
  };
  

  const st = { backgroundColor: props.bg_color };

  return (
    <div style={st} className='header' onDoubleClick={() => handleHover(`${props.category}_header`, props.enableHover)} >
      {fontfetch(data)}
      <IMG enableHover={props.enableHover} id="logo" src={setSrc(data, 'logo')} style={setStyle(data, 'sub-title')} />
      <H1 id="title" enableHover={props.enableHover} content={setContent(data, 'title')} style={setStyle(data, 'title')} />

      <div className="nav">
        <A id='home' href={`/home?enable=${props.enableHover}`} enableHover={props.enableHover} content={<AIMG enableHover={props.enableHover} id="home_img" src={setSrc(data, 'home_img')} />} style={setStyle(data, 'home')} />
        <div className="category_div">
          <P id="category" className="category_a" enableHover={props.enableHover}  content={setContent(data, 'category')} style={setStyle(data, 'category')} />
          <div className="category_drpdwn">
            <a href={`/grocery?enable=${props.enableHover}`}>Grocery</a><br />
            <a href={`/electronic?enable=${props.enableHover}`}>Electronics</a><br />
            <a href={`/books?enable=${props.enableHover}`}>Books</a><br />
          </div>
        </div>
        <A id="cart"  href={`/cart?enable=${props.enableHover}`} content={<AIMG enableHover={props.enableHover} id="cart_img" src={setSrc(data, 'cart_img')} />} />
      </div>
    </div>
  );
};

export default Header;
