import React, { useEffect, useState } from 'react';
import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import "./prd_div_css.css";
import { H1, H2, H3, IMG, P, A, BUTTON } from './tags';
import Axios from 'axios';


const PrdDiv = (props) => {

  const [data, setData] = useState([]);

  
 

  const divstyle = {
    border: "1px solid black",
    textAlign: "center",
    width: "300px",
    height: "100px"
  };
  const addToCart = () => {
   
    const cartData = {
      prdId: props.prd_id, 
      price: props.prd_price, 
      category: props.prd_category 
    };
    Axios.post('http://localhost:8080/cart/frstadd', cartData)
    .then(response => {
    
      console.log(response.data);
      if(response){
        alert("Added to Cart 🛒");
      }
    })
    .catch(error => {
     
      console.error(error);
    });
};

  return (
   

<div className="prd_div">
  <div className="product-info">
    <IMG id="prd_img" className="prd_img" style={setStyle(props.data , 'prd_img')} src={props.prd_img} />
    <div className="product-details">
      <H2 id="prd_name" className="prd_name" enableHover={props.enableHover} style={setStyle(props.data, 'prd_name')} content={props.prd_name} />
      <div className="price-section">
        <P id="prd_price" className="prd_price" enableHover={props.enableHover} style={setStyle(props.data, 'prd_price')} content={"₹"+props.prd_price} />
        <div className="price-details">
            <s><P id="prd_mrp" className="prd_mrp" enableHover={props.enableHover} style={setStyle(props.data, 'prd_mrp')} content={"₹"+props.prd_mrp} /></s>
            <P id="prd_offer" className="prd_offer" enableHover={props.enableHover} style={setStyle(props.data, 'prd_offer')} content={props.prd_offer+"%"} />
        </div>
      </div>
    </div>
 
  <BUTTON onClick={addToCart} style={setStyle(props.data, 'add_to_cart')} id="add_to_cart" type="submit" enableHover={props.enableHover} value="Add to Cart"/>
   </div>
</div>



  )
};

export default PrdDiv;