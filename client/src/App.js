import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Cart from './cart';
import Category from './category';
import Custcomhome from './custcom_home';
import InventoryTable from './components/custcom_components/custcom_inven';
import AddInventory from './components/custcom_components/custcom_inven_add';
import Axios from 'axios';
import { setDivColor } from './components/dbfunctions';


function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:8080/div_fetch')
        .then(response => {
          setData(response.data);
          })
        .catch(error => {
          console.log("Error:", error);
        });
  },[])
console.log(data);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/custcom" element={<Custcomhome/>} />
        <Route path="custcom/inventory" element={<InventoryTable/>} />
        <Route path="custcom/inventory/add" element={<AddInventory />} />
        <Route path="/home" element={<Home header_color={setDivColor(data,'homepage_header')} body_color={setDivColor(data,'homepage_body')} footer_color={setDivColor(data,'homepage_footer')} enableHover={true}/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/grocery" element={<Category category="grocery" bg_color={setDivColor(data,'grocery_body')} header_color={setDivColor(data,'grocery_header')} footer_color={setDivColor(data,'grocery_footer')} />} />
        <Route path="/electronic" element={<Category category="electronic" bg_color={setDivColor(data,'electronic_body')} header_color={setDivColor(data,'electronic_header')} footer_color={setDivColor(data,'electronic_footer')} />}/>
        <Route path="/books" element={<Category category="books" bg_color={setDivColor(data,'books_body')} header_color={setDivColor(data,'books_header')} footer_color={setDivColor(data,'books_footer')}/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
