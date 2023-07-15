import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Cart from './cart';
import Category from './category';
import Test from './test';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
             <Route path="/home" element={<Home/>} />
             
        <Route path="/cart" element={<Cart/>} />
        <Route path="/grocery" element={<Category category="grocery" bg_color="#E9D9BF" header_color="#07B845"/>} />
        <Route path="/electronic" element={<Category category="electronic" bg_color="#E9D9BF" header_color="#07B845"/>} />
        <Route path="/books" element={<Category category="books" bg_color="#E9D9BF" header_color="#07B845"/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
