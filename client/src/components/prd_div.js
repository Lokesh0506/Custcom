import React,{Component,useEffect, useState} from 'react';

import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import { H1, H2, H3, IMG, P, A } from './tags';
import Axios from 'axios';


const PRD_DIV = (props) => {

  const [data, setData] = useState([]);

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

    return (
        <div className='prd_div'>
          <IMG id='prd_img' style={setStyle(data, 'prd_img')} src={setSrc(props.prd_img)} />
          <H2 id='prd_name' style={setStyle(data, 'prd_name')} content={props.prd_name} />
          <P id='prd_price' style={setStyle(data, 'prd_price')} content={props.prd_price} />
          <sub><P id='prd_offer' style={setStyle(data, 'prd_offer')} content={props.prd_offer} />
          <P id='prd_mrp' style={setStyle(data, 'prd_mrp')} content={props.prd_mrp} /></sub>
      </div>
       )
 };

 export default PRD_DIV;