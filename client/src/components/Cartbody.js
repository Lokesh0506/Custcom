import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './cartbody.css';
import { BUTTON ,H2} from './tags';
import { setStylecart, setContent, setHref, setSrc,setSrcprod ,setStyle} from './dbfunctions';
import { handleHover } from './tags';


const Cartbody = (props) => {
  const [data, setData] = useState([{}]);
  const [totalBilling, setTotalBilling] = useState(0);
  const[add,callAdd]=useState(0);
  

 
 

  useEffect(() => {
    Axios.get('http://localhost:8080/cart')
      .then(response => {
        setData(response.data);
        const cartStyle = response.data.cartStyle;
        const cartItems = response.data.cart;
        const totalPrice = cartItems.reduce((sum, item) => {
          const inventoryItem = response.data?.inventory.find(i => i[0].pid === item.pid);
          if (inventoryItem) {
            const price = inventoryItem[0].price;
            return sum + price * item.quantity;
          }
          return sum;
        }, 0);
        setTotalBilling(totalPrice);
      })
      .catch(error => {
        console.log(error);
      });
  }, [add]);



  const setSrcprod = (data, name, category) => {
    const element = data.find(obj => obj.pid === name);

    if (element) {
      return require("./inventory_imgs/" + category+"/"+ element.img);
    } else {
      return 'no img';
    }
  };
function sendUpdateRequest(pid, quantity) {
    document.getElementById(`texqan-${pid}`).value=quantity;
    Axios.post('http://localhost:8080/cart/add', { pid, quantity })
  .then(response=> {
   
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  }
  
  
  function incrementQuantity(pid) {
     const quantitytemp=document.getElementById(`texqan-${pid}`).value;
    if (quantitytemp) {
      let quantity = parseInt(quantitytemp);
      quantity++;
      sendUpdateRequest(pid, quantity);
      callAdd(quantity);
    }
  }
  
  function decrementQuantity(pid) {
    const quantitytemp=document.getElementById(`texqan-${pid}`).value;
    if (quantitytemp) {
      let quantity = parseInt(quantitytemp);
      quantity--;
      sendUpdateRequest(pid, quantity);
      callAdd(quantity);
    }
  }
function inputval(pid){
  const quantitytemp =document.getElementById(`texqan-${pid}`).value;
  if (quantitytemp) {
    let quantity = parseInt(quantitytemp);
    if (quantity >= 0) {
      sendUpdateRequest(pid, quantity);
      callAdd(quantity);
    }
  }

}
console.log("data",data);
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
return (
  <div  id={props.className} className='Cartpage' onDoubleClick={() => handleHover(`${props.category}_body`, props.enableHover)} style={{backgroundColor:props.bg_color}}>
  
    
    {data.cart && data.cart.length > 0 && data.inventory && data.inventory.length > 0 && (
      <div>
        {data.cart.map((cartItem, index) => {
          const { pid, quantity, category } = cartItem;
          const inventoryArr = data.inventory;
          console.log("inven arr",inventoryArr);

          const inventoryItem = inventoryArr.find(item => item[0].pid === pid);
          console.log("inven",inventoryItem);
          if (inventoryItem) {
            const { pname, price, authorname } = inventoryItem[0];

            return (
              <div key={pid} className='cartprd'>
                <img src={setSrcprod(inventoryItem, pid, category)} alt={`${pid}-${index}`} />
                <div className='cartcon'>
                  <H2 enableHover={props.enableHover} id="pname" content={pname} style={setStylecart(data, 'pname')} />
                  <H2 enableHover={props.enableHover} id="price" content={[<span>₹</span>, price]} style={setStylecart(data, 'price')} />
                  <H2 enableHover={props.enableHover} id="author" content={authorname} style={setStylecart(data, 'author')} />
                </div>
                <div className='button-square'>
                  <BUTTON enableHover={props.enableHover} id="cartbutton-" onClick={() => decrementQuantity(pid)} style={setStylecart(data, 'cartbutton-')} value="-" />
                  <input type='number' id={`texqan-${pid}`} defaultValue={quantity} onChange={() => inputval(pid)} />
                  <BUTTON enableHover={props.enableHover} id="cartbuttonpos" onClick={() => incrementQuantity(pid)} style={setStylecart(data, 'cartbuttonpos')} value="+" />
                </div>
              </div>
            );
          }
        })}
        <div id='bill' >Total Billing: ₹{totalBilling}</div>
      
        <BUTTON id="checkout"  style={setStylecart(data, 'checkout')} value="Proceed to checkout" />
        
      </div>
    )}
  </div>
);

}

export default Cartbody;