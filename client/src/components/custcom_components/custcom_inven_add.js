import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddInventory.css';
import styles from "./addinventory.module.css";
import { useNavigate } from 'react-router-dom';


const AddInventory = () => {

  const navigate = useNavigate();
  const formData = new FormData();
  const [category, setCategory] = useState('');

  useEffect(() => {
    document.body.classList.add(styles['addinventory']);
    return () => {
      document.body.classList.remove(styles['addinventory']);
    };
  }, []);

  /* const handleInputChange = (event) => {
     if (event.target.name === 'img') {
       formData.append('img',event.target.files[0]);
       formData.append('img_name',event.target.files[0].name);
     } else {
     
       formData.append( event.target.name , event.target.value);
 
     }
   };*/

  const handleSubmit = (event) => {
    
    event.preventDefault();
    const formData = new FormData();
    formData.append("pid", document.getElementsByName('pid')[0].value);
    formData.append("category", document.getElementsByName('category')[0].value);
    formData.append(`pname`, document.getElementsByName(`pname`)[0].value);
    const imageFileInput = document.getElementById(`img`);
    if (imageFileInput?.files.length > 0) {
      const file = imageFileInput.files[0];
      formData.append(`img`, file);
      formData.append('img_name', file.name);
    } 


    formData.append(`price`, document.getElementsByName(`price`)[0].value);
    formData.append(`offer`, document.getElementsByName(`offer`)[0].value);
    formData.append(`rating`, document.getElementsByName(`rating`)[0].value);
    formData.append(`stock`, document.getElementsByName(`stock`)[0].value);
    if (category === "books") {
      formData.append(`authorname`, document.getElementsByName(`authorname`)[0].value);
    }
    ;


    axios
      .post('http://localhost:8080/custcom/inven/add', formData)
      .then(response => {
        console.log('Inventory added successfully:', response);
        if(response){alert("Successfully Added");
        navigate('/custcom/inventory');}

      })

      .catch(error => {
        console.error('Error adding inventory:', error);
      });
  };

  return (
    <div className="add-inventory-container">

      <h1 >Add Your Inventory</h1><br />
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor="productId">Product ID:</label>
        <input type="text" id="pid" name="pid"   />

        <label htmlFor="name">Name:</label>
        <input type="text" id="pname" name="pname"   />

        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price"   />
        <label htmlFor="mrp">Mrp:</label>
        <input type="text" id="mrp" name="mrp"   />

        <label htmlFor="offer">Offer:</label>
        <input type="text" id="offer" name="offer"   />

        <label htmlFor="description">Description:</label>
        <input type="text" id="desc" name="desc"   />

        <label htmlFor="rating">Rating:</label>
        <input type="text" id="rating" name="rating"   />

        <label htmlFor="stock">Stock:</label>
        <input type="text" id="stock" name="stock"   />



        <label htmlFor="category">Category:</label>
        <select id="category" name="category" onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="books">Books</option>
          <option value="electronic">Electronics</option>
          <option value="grocery">Grocery</option>
        </select>

        {category==="books" && <> <label htmlFor="authorname">Authorname:</label>
        <input type="text" id="authorname" name="authorname"  /></>}


        <label htmlFor="image">Image:</label>
        <input type="file" id="img" name="img"  />


        <button type="submit" >Add Inventory</button>
      </form>
    </div>);
};

export default AddInventory;
