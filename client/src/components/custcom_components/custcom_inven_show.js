import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewInventory = ( props ) => {
    console.log(props.inventoryData);
  

    const booksData = props.inventoryData.books;
    const electronicsData = props.inventoryData.electronic;
    const groceryData = props.inventoryData.grocery;
  return (
    <>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Product id</th>
            <th>Book name</th>
            <th>Book Image </th>
            <th>Price</th>
            <th>Offer</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Authorname</th>

          </tr>
        </thead>
        <tbody>
          {booksData?.map((item) => (
            <tr key={item.pid}>
                <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>
                <img src={item.img} alt={item.pname} />
              </td>
            <td>
             {item.price}
            </td>
            <td>{item.offer}</td>
            <td>{item.description}</td>
            <td>{item.rating}</td>
            <td>{item.stock}</td>
            <td>{item.authorname}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Electronics</h2>
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Name</th>
            <th>Image </th>
            <th>Price</th>
            <th>Offer</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Stock</th>
         
          </tr>
        </thead>
        <tbody>
          {electronicsData?.map((item) => (
            <tr key={item.pid}>
                <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>
                <img src={item.img} alt={item.pname} />
              </td>
            <td>
             {item.price}
            </td>
            <td>{item.offer}</td>
            <td>{item.description}</td>
            <td>{item.rating}</td>
            <td>{item.stock}</td>
           
             
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Grocery</h2>
      <table>
        <thead>
          <tr>
          <th>Product Id</th>
            <th>Name</th>
            <th>Image </th>
            <th>Price</th>
            <th>Offer</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Stock</th>
            
          </tr>
        </thead>
        <tbody>
          {groceryData?.map((item) => (
            <tr key={item.id}>
             <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>
                <img src={item.img} alt={item.pname} />
              </td>
            <td>
             {item.price}
            </td>
            <td>{item.offer}</td>
            <td>{item.description}</td>
            <td>{item.rating}</td>
            <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default  ViewInventory ;


