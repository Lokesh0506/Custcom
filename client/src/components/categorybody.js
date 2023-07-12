import React, { useEffect, useState } from 'react';
import {  H1, H2, H3, IMG, P, A ,BUTTON } from './tags';
import './body.css';
import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import Axios from 'axios';
import PrdDiv from './prd_div';


const CategoryBody = (props) => {
  const [data, setData] = useState([]);
  const [invdata, setInvData] = useState([]);
  const [adSrc, setAdSrc] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Axios.post('http://localhost:8080/category',{category:props.category})
      .then(response => {
        setData(response.data.body);
        console.log(response.data.body);
        setInvData(response.data.inv);
        console.log(response.data.inv);
        console.log(response.data.category);
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
  

  const prdfetch= (invdata)=>{
    const prd_row = [];
    if (!Array.isArray(invdata)) {
        return <h1>Not able to fetch Data!!</h1>
    }

    invdata.forEach((obj) => {
    prd_row.push(
      <PrdDiv data={data} key={obj.id} prd_img={require('./inventory_imgs/'+props.category+'/'+obj.img)} prd_name={obj.pname} prd_price={obj.price} prd_offer={obj.offer} prd_mrp={obj.mrp} />
    );
  });

  return prd_row;
    
  }



  return (
    <div>
      <IMG id="ad_banner" src={setSrc(data, `ad_ban${currentIndex + 1}`)} style={imgStyle} />
      <br />
      <H2 id="rec" content={setContent(data, 'rec')} style={setStyle(data, 'rec')}/>
      
      
      <H2 id="groc" content={setContent(data, 'groc')} style={setStyle(data, 'groc')}/>

      <div className='prd_row'>{prdfetch(invdata)}</div>
      
      <div className='prd_row'>{prdfetch(invdata)}</div>

      <div className='prd_row'>{prdfetch(invdata)}</div>
    </div>
  );
};

export default CategoryBody;
