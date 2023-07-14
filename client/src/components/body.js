import React, { useEffect, useState } from 'react';
import {  H1, H2, H3, IMG, P, A ,BUTTON } from './tags';
import './body.css';
import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import Axios from 'axios';
import PrdDiv from './prd_div';


const Body = (props) => {
  const [data, setData] = useState([]);
  const [invdata, setInvData] = useState([]);
  const [adSrc, setAdSrc] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Axios.get('http://localhost:8080/home')
      .then(response => {
        setData(response.data.body);
        console.log(response.data.body);
        setInvData(response.data.inv);
        console.log(response.data.inv);
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
  

  const prdfetch= (invdata,cat)=>{
    const prd_row = [];
    if (!Array.isArray(invdata)) {
        return <h1>Not able to fetch Data!!</h1>
    }

    invdata.forEach((obj) => {
    prd_row.push(
      <PrdDiv 
      data={data} 
      key={obj.id}  
      enableHover={props.enableHover} 
      prd_img={require('./inventory_imgs/'+cat+'/'+obj.img)} 
      prd_category ={cat}
      prd_id={obj.pid}
      prd_name={obj.pname} 
      prd_price={obj.price} 
      prd_offer={obj.offer} 
      prd_mrp={obj.mrp} />
    );
  });  

  return prd_row;
    
  }

  

  return (
    <div>
      <IMG
        id="ad_banner"
        src={setSrc(data, `ad_ban${currentIndex + 1}`)}
        style={imgStyle}
        enableHover={props.enableHover}
      />

      <br />
      <H2  enableHover={props.enableHover} id="rec" content={setContent(data, 'rec')} style={setStyle(data, 'rec')}/>
      
      
      <H2  enableHover={props.enableHover} id="groc" content={setContent(data, 'groc')} style={setStyle(data, 'groc')}/>

      <div className='prd_row'>{prdfetch(invdata.grocery,"grocery")}</div>
      
      <H2  enableHover={props.enableHover} id="elec" content={setContent(data, 'elec')} style={setStyle(data, 'elec')}/>

      <div className='prd_row'>{prdfetch(invdata.electronic,"electronic")}</div>

      <H2  enableHover={props.enableHover} id="books" content={setContent(data, 'books')} style={setStyle(data, 'books')}/>

      <div className='prd_row'>{prdfetch(invdata.book,"books")}</div>
    </div>
  );
};

export default Body;
