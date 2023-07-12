import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header';
import Axios from 'axios';
import Body from './components/body';
import Footer from './components/footer';
import CategoryBody from './components/categorybody';



function Category(props) {
  return (
    <div style={{backgroundColor:props.bg_color}} className="App">
      <Header bg_color={props.header_color}/>
      <CategoryBody  category={props.category}/>
      <Footer/>
    </div>
  );
}

export default Category;