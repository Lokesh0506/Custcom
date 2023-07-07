import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './cartbody.css';
import { BUTTON } from './tags';

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

  const setSrcprod = (data, name) => {
    const element = data.find(obj => obj.pid === name);

    if (element) {
      return require("./" + element.img);
    } else {
      return 'no img';
    }
  };

  function sendUpdateRequest(pid, quantity) {
    Axios
      .post("/cart/add", { pid, quantity })
      .then((response) => {
        const updatedQuantity = response.data.quantity;
        console.log("Updated quantity:", updatedQuantity);
      })
      .catch((error) => {
        console.log("An error occurred:", error.message);
      });
  }
  
  function incrementQuantity(pid) {
    const quantityElement = document.getElementById(`texqan-${pid}`);
    if (quantityElement) {
      let quantity = parseInt(quantityElement.value);
      alert("hii");
      quantity++;
      sendUpdateRequest(pid, quantity);
    }
  }
  
  function decrementQuantity(pid) {
    const quantityElement = document.getElementById(`texqan-${pid}`);
    if (quantityElement) {
      let quantity = parseInt(quantityElement.value);
      quantity--;
      sendUpdateRequest(pid, quantity);
    }
  }

  return (
    <div className='Cartpage'>
      {data.cart && data.cart.length > 0 && data.inventory && data.inventory.length > 0 && (
        data.cart.map((cartItem, index) => {
          const { pid , quantity} = cartItem;
          const inventoryArr = data.inventory;

          const inventoryItem = inventoryArr.find(item => item[0].pid === pid);

          if (inventoryItem) {
            const { pname, price, authorname } = inventoryItem[0];

            return (
              <div key={pid} className='cartprd'>
                <img src={setSrcprod(inventoryItem, pid)} alt={`${pid}-${index}`} />
                <h2 id="name">{pname}</h2>
                <h2 id="author">{authorname}</h2>
                <h2 id="price">₹{price}</h2>
                <BUTTON id="sub" onClick={()=>decrementQuantity(pid)} value="-" />
                <input type='number' id={`texqan-${pid}`} defaultValue={quantity} />
                <BUTTON id="sub" onClick={()=>incrementQuantity(pid)} value="+" />
              </div>
            );
          } else {
            return <h1>Some error occurred</h1>;
          }
        })
      )}
    </div>
  );
}

export default Cartbody;
