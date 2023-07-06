import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Cart from './cart';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  );
}

export default App;
