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
      <IMG id="logo" src={setSrc(data, 'logo')} style={setStyle(data, 'sub-title')} />
      <H1 id="title" content={setContent(data, 'title')} style={setStyle(data, 'title')} />

      <div className="nav">
        <A href={setHref(data, "home")} content={setContent(data, 'home')} style={setStyle(data, 'home')} />
        <div className="category_div">
          <A className="category_a" href={setHref(data, "category")} content={setContent(data, 'category')} style={setStyle(data, 'category')} />
          <div className="category_drpdwn">
            <a href="/grocery">Grocery</a><br />
            <a href="#">Electronics</a><br />
            <a href="#">Clothings</a><br />
          </div>
        </div>
        <A id="cart" href={setHref(data, 'cart')} content={<IMG id="cartimg" src={setSrc(data, 'cart_img')} />} />
      </div>
    </div>
  );
};

export default Header;
