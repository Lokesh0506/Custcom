import React, { useEffect, useState } from 'react';
import {  H1, H2, H3, IMG, P, A  } from './tags';

import './body.css';
import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import Axios from 'axios';


const Body = (props) => {
  const [data, setData] = useState([]);
  const [adSrc, setAdSrc] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Axios.get('http://localhost:8080/home')
      .then(response => {
        setData(response.data.body);
        console.log(response.data.body);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const slideTimeout = setTimeout(slide, 3000);
    return () => {
      clearTimeout(slideTimeout);
    };
  }, [currentIndex]);

  const slide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % 3);
  };


  const imgStyle = {
    width: '100%',
    height: '50vh',
    padding: '10px',
  };

  return (
    <div>
      <IMG id="logo" src={setSrc(data, `ad_ban${currentIndex + 1}`)} style={imgStyle} />
      <br />
      <H2 id="rec" content={setContent(data, 'rec')} style={setStyle(data, 'rec')}/>


      <H2 id="groc" content={setContent(data, 'groc')} style={setStyle(data, 'groc')}/>
      <H2 id="elec" content={setContent(data, 'elec')} style={setStyle(data, 'elec')}/>
      
      <H2 id="books" content={setContent(data, 'books')} style={setStyle(data, 'books')}/>
    </div>
  );
};

export default Body;
