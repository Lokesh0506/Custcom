import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Cart from './cart';
import Category from './category';
import Custcomhome from './custcom_home';
import InventoryTable from './components/custcom_components/custcom_inven';
import AddInventory from './components/custcom_components/custcom_inven_add';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/custcom" element={<Custcomhome/>} />
        <Route path="custcom/inventory" element={<InventoryTable/>} />
        <Route path="custcom/inventory/add" element={<AddInventory />} />
        <Route path="/home" element={<Home enableHover={true}/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/grocery" element={<Category category="grocery" bg_color="#E9D9BF" header_color="#07B845"/>} />
        <Route path="/electronic" element={<Category category="electronic" bg_color="#E9D9BF" header_color="#07B845"/>} />
        <Route path="/books" element={<Category category="books" bg_color="#E9D9BF" header_color="#07B845"/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
