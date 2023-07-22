import React, { useState } from 'react';
import axios from 'axios';
import './AddInventory.css';

const AddInventory = () => {


  const formData= new FormData();

  const handleInputChange = (event) => {
    if (event.target.name === 'img') {
      formData.append('img',event.target.files[0]);
      formData.append('img_name',event.target.files[0].name);
    } else {
    
      formData.append( event.target.name , event.target.value);

    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();


  
    console.log("input:",formData);
  

    axios
      .post('http://localhost:8080/custcom/inven/add', formData)
      .then(response => {
        console.log('Inventory added successfully:', response);
        
          
        })
      
      .catch(error => {
        console.error('Error adding inventory:', error);
      });
  };

  return (
  <div  className="add-inventory-container">
  
  <h1 >Add Your Inventory</h1><br/>
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <label htmlFor="productId">Product ID:</label>
      <input type="text" id="pid" name="pid" value={formData.pid} onBlur={handleInputChange} />

      <label htmlFor="name">Name:</label>
      <input type="text" id="pname" name="pname" value={formData.pname} onBlur={handleInputChange} />

      <label htmlFor="price">Price:</label>
      <input type="text" id="price" name="price" value={formData.price} onBlur={handleInputChange} />
      <label htmlFor="mrp">Mrp:</label>
      <input type="text" id="mrp" name="mrp" value={formData.mrp} onBlur={handleInputChange} />

      <label htmlFor="offer">Offer:</label>
      <input type="text" id="offer" name="offer" value={formData.offer} onBlur={handleInputChange} />

      <label htmlFor="description">Description:</label>
      <input type="text" id="desc" name="desc" value={formData.desc} onBlur={handleInputChange} />

      <label htmlFor="rating">Rating:</label>
      <input type="text" id="rating" name="rating" value={formData.rating} onBlur={handleInputChange} />

      <label htmlFor="stock">Stock:</label>
      <input type="text" id="stock" name="stock" value={formData.stock} onBlur={handleInputChange} />

      
      
  <label htmlFor="category">Category:</label>
  <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
    <option value="books">Books</option>
    <option value="electronic">Electronics</option>
    <option value="grocery">Grocery</option>
  </select>

  <label htmlFor="image">Image:</label>
      <input type="file" id="img" name="img" onChange={handleInputChange} />


      <button type="submit">Add Inventory</button>
    </form>
    </div>);
};

export default AddInventory;
