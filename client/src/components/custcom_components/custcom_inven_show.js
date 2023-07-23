import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './custcom_inven_show.module.css';
import "./custcom_show.css";
import Custcomheader from './custcomheader';
import addImage from './images/add.jpg';
const ViewInventory = (props) => {
  console.log(props.inventoryData);
  const [edit, setEdit] = useState(0);

 useEffect(() => {
    document.body.classList.add(styles['custcom_show']);
    return () => {
      document.body.classList.remove(styles['custcom_show']);
    };
  }, []);
  const booksData = props.inventoryData.books;
  const electronicsData = props.inventoryData.electronic;
  const groceryData = props.inventoryData.grocery;
  const handleEdit = (pid, category) => {
    setEdit(pid);
    //window.location.reload();
  };

 
  const handleDelete = (pid, category) => {
    axios
      .post('http://localhost:8080/custcom/inven/delete', { pid, category })
      .then(response => {
        console.log('deleted successfully:', response);

      })
    console.log(`Delete button clicked for product ID: ${pid}`);
    window.location.reload();
  };
  const handleInputChange = (e, pid) => {
    
 
          
 
  };
  const noneditable = (item) => {
    
    return (
 
        <tr className='nonedit'>
          <td>{item.pid}</td>
          <td>{item.pname}</td>
          <td>
            <img src={require(`../inventory_imgs/${item.category}/${item.img}`)} alt={item.pname} />
          </td>
          <td>
            {item.price}
          </td>
          <td>{item.offer}</td>
          <td>{item.desc}</td>
          <td>{item.rating}</td>
          <td>{item.stock}</td>
          {item.category === "books" && <td>{item.authorname}</td>}
          <td>
            <button id='edit' onClick={() => handleEdit(item.pid, item.category)}>Edit</button>
          </td>
          <td>
            <button id='delete' onClick={() => handleDelete(item.pid, item.category)}>Delete</button>
          </td>
        </tr>
      );
  };


  const handleSubmit = (pid, category,item) => {
    const formData = new FormData();
    formData.append("pid",pid);
    formData.append("category", category);
    formData.append(`pname`, document.getElementsByName(`${pid}_pname`)[0].value);
    const imageFileInput = document.getElementById(`${pid}_img`);
    if (imageFileInput?.files.length > 0) {
      const file = imageFileInput.files[0];
      formData.append(`img`, file);
      formData.append('img_name', file.name);
    } else {
      formData.append('img_name', item.img);
    }
  
  
    formData.append(`price`, document.getElementsByName(`${pid}_price`)[0].value);
    formData.append(`offer`, document.getElementsByName(`${pid}_offer`)[0].value);
    formData.append(`rating`, document.getElementsByName(`${pid}_rating`)[0].value);
    formData.append(`stock`, document.getElementsByName(`${pid}_stock`)[0].value);
    if (category === "books") {
      formData.append(`authorname`, document.getElementsByName(`${pid}_authorname`)[0].value);
    }
    
  
    axios
      .post('http://localhost:8080/custcom/inven/update', formData)
      .then(response => {
        console.log('Inventory updated successfully', response);
        setEdit(0);
      })
      .catch(error => {
        console.error('Error adding inventory:', error);
      });
  }
   



  const editable = (item) => {
    return (
      <div>
        <tr key={item.pid}>
          <td>{item.pid}</td>
          <td>
            <input
              type="text"
              name={`${item.pid}_pname`} 
              defaultValue={item.pname}
            />
          </td>
          <td>
            <input
              id={`${item.pid}_img`}
              name={`img`}
              type='file'
            />
          </td>
          <td>
            <input
              type='text'
              name={`${item.pid}_price`}
              defaultValue={item.price}
            />
          </td>
          <td>
            <input
              type='text'
              name={`${item.pid}_offer`}
              defaultValue={item.offer}
            />
          </td>
          <td>
            <input
              type='text'
              name={`${item.pid}_description`}
              defaultValue={item.description}
            />
          </td>
          <td>
            <input
              type='text'
              name={`${item.pid}_rating`}
              defaultValue={item.rating}
            />
          </td>
          <td>
            <input
              type='text'
              name={`${item.pid}_stock`}
              defaultValue={item.stock}
            />
          </td>
          {item.category === "books" && (
            <td>
              <input
                name={`${item.pid}_authorname`}
                defaultValue={item.authorname}
              />
            </td>
          )}
          <td>
            <button onClick={() => handleSubmit(item.pid, item.category,item)}>Save</button>
          </td>
          <td>
            <button onClick={() => { setEdit(0) }}>Cancel</button>
          </td>
        </tr>
      </div>
    );
  }
  const inventoryLink = '/custcom/inventory/add'; 

  return (
    <div>
    <Custcomheader bg_color="black" inventoryImage="add" inventoryLink={inventoryLink} />
    <div className='inven_show'>
      <h2>Books</h2>
      <table className="booksTable">
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
            <th></th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {booksData?.map((item) =>  (edit === item.pid ? editable(item) : noneditable(item))
          )}
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
            <th></th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {electronicsData?.map((item) =>  (edit === item.pid ? editable(item) : noneditable(item))
          )}
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
            <th></th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {groceryData?.map((item) =>  (edit === item.pid ? editable(item) : noneditable(item))
          )}
        </tbody>
      </table>
    </div></div>
  );
};

export default ViewInventory;
