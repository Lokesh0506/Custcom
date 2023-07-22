import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewInventory from './custcom_inven_show.js';
import AddInventory from './custcom_inven_add.js';

const InventoryTable = () => {
    const [inventoryData, setInventoryData] = useState([{}]);
  
    useEffect(() => {
         axios.get('http://localhost:8080/custcom/inven')

         .then(response =>{ console.log(response);
          setInventoryData(response.data);
         })
        .catch(error=>{
          console.error('Error fetching inventory data:', error);
        });
      }
  , []);

  console.log("inv:");
  console.log(inventoryData);
  return (
    <>
    <div>

<ViewInventory inventoryData={inventoryData}/>

 
   
    </div> </>)}
    export default InventoryTable ;