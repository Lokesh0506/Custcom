import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './cartbody.css';
import { BUTTON } from './tags';
import { setStylecart, setContent, setHref, setSrc,setSrcprod } from './dbfunctions';


const Cartbody = (props) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:8080/cart')
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const setSrcprod = (data, name, category) => {
    const element = data.find(obj => obj.pid === name);

    if (element) {
      return require("./inventory_imgs/" + category+"/"+ element.img);
    } else {
      return 'no img';
    }
  };

  function sendUpdateRequest(pid, quantity) {Axios.post('http://localhost:8080/cart/add', { pid, quantity })
  .then(response=> {
   
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  }
  
  function incrementQuantity(pid) {
    const quantityElement = document.getElementById(`texqan-${pid}`);
    if (quantityElement) {
      let quantity = parseInt(quantityElement.value);
      quantity++;
      quantityElement.value = quantity;
      sendUpdateRequest(pid, quantity);
    }
  }
  
  function decrementQuantity(pid) {
    const quantityElement = document.getElementById(`texqan-${pid}`);
    if (quantityElement) {
      let quantity = parseInt(quantityElement.value);
      if (quantity > 0) {
        quantity--;
        quantityElement.value = quantity;
        sendUpdateRequest(pid, quantity);
      }
    }
  }
function inputval(pid){
  const quantityElement = document.getElementById(`texqan-${pid}`);
  if (quantityElement) {
    let quantity = parseInt(quantityElement.value);
    if (quantity >= 0) {
      quantityElement.value = quantity;
      sendUpdateRequest(pid, quantity);
    }
  }

}
  return (
    <div className='Cartpage'>
      {data.cart && data.cart.length > 0 && data.inventory && data.inventory.length > 0 && (
        data.cart.map((cartItem, index) => {
          const { pid , quantity, category} = cartItem;
          const inventoryArr = data.inventory;

          const inventoryItem = inventoryArr.find(item => item[0].pid === pid);
          console.log("inv");
          console.log(inventoryItem);

          if (inventoryItem) {
            const { pname, price, authorname } = inventoryItem[0];

            return (
              <div key={pid} className='cartprd'>
                <img src={setSrcprod(inventoryItem, pid , category)} alt={`${pid}-${index}`} />
                <h2 id="name">{pname}</h2>
                <h2 id="author">{authorname}</h2>
                <h2 id="price">₹{price}</h2>
                <BUTTON id="sub" onClick={()=>decrementQuantity(pid)} style={setStylecart(data,'cartbutton')} value="-" />
                <input type='number' id={`texqan-${pid}`} defaultValue={quantity}   onChange={() => inputval(pid)} />
                <BUTTON id="sub" onClick={()=>incrementQuantity(pid)} value="+" />
              </div>
            );
          } 
        })
      )}
    </div>
  );
}

export default Cartbody;
