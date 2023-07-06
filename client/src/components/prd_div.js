import React, { Component, useEffect, useState } from 'react';
import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import "./prd_div_css.css";
import { H1, H2, H3, IMG, P, A } from './tags';
import Axios from 'axios';


const PrdDiv = (props) => {

  const [data, setData] = useState([]);

 

  const divstyle = {
    border: "1px solid black",
    textAlign: "center",
    width: "300px",
    height: "100px"
  };

  return (
   

<div className="prd_div">
  <div className="product-info">
    <IMG id="prd_img" style={setStyle(props.data , 'prd_img')} src={props.prd_img} />
    <div className="product-details">
      <H2 id="prd_name" style={setStyle(props.data, 'prd_name')} content={props.prd_name} />
      <div className="price-section">
        <P id="prd_price" style={setStyle(props.data, 'prd_price')} content={"₹"+props.prd_price} />
        <div className="price-details">
            <s><P id="prd_mrp" style={setStyle(props.data, 'prd_mrp')} content={"₹"+props.prd_mrp} /></s>
            <P id="prd_offer" style={setStyle(props.data, 'prd_offer')} content={props.prd_offer+"%"} />
        </div>
      </div>
    </div>
 
  <button>Add to Cart</button>
   </div>
</div>



  )
};

export default PrdDiv;