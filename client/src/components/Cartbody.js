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
              <div key={pid}>
         
                <IMG
                  src={setSrcprod(inventoryItem, pid)}
                  key={`${pid}-${index}`}
                />
                 <h2>{pname}</h2>
                <h2>{price}</h2>
                <h2>{authorname}</h2>
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  );
  
  
}

export default Cartbody;
