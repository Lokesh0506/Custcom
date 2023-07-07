import React, { useEffect, useState } from 'react';
import { H1, H2, H3, IMG, P, A } from './tags';
import { setStyle, setContent, setHref, setSrc } from './dbfunctions';
import Axios from 'axios';
import './cartbody.css';

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
    const quantity = parseInt(document.getElementById("texqan").value);
    quantity++;
  

    sendUpdateRequest(pid, quantity);
  }
  
  function decrementQuantity(pid) {
    let quantity = parseInt(document.getElementById("texqan").value);
    quantity--;
  
    sendUpdateRequest(pid, quantity);
  }

    function handleInputChange(event, pid) {
      const quantity = parseInt(event.target.value);
sendUpdateRequest(pid, quantity);
    }
  return (
    <div className='Cartpage'>
     
      {data.cart && data.cart.length > 0 && data.inventory && data.inventory.length > 0 && (
        data.cart.map((cartItem, index) => {
          const { pid } = cartItem;
          const inventoryArr = data.inventory;
  
          const inventoryItem = inventoryArr.find(item => item[0].pid === pid);
  
          if (inventoryItem) {
            const { pname, price, authorname } = inventoryItem[0];
  
            return (
              <div key={pid} className='cartprd'>
         
                <IMG
                  src={setSrcprod(inventoryItem, pid)}
                  key={`${pid}-${index}`}
                />
              
                <h2 id="name">{pname}</h2>
                <h2 id="author">{authorname}</h2>
                <h2 id="price">₹{price}</h2>
                
              </div>
            );
          } else {
            return <h1>Some error occured</h1>;
          }
        })
      )}
    </div>
  );
  
  
}

export default Cartbody;
