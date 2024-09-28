import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import CategoryBody from './components/categorybody';
import { useLocation } from 'react-router-dom';
import { handleHover } from './components/tags';


function Category(props) {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mobilenumber = queryParams.get('mobno');
  const en = queryParams.get('enable');

  const [enableHover, setHover] = useState(false);

  useEffect(() => {
    if (en === 'true') {
      setHover(true);
    }
  }, []); 
  console.log("props",props.header_color);
  return (
    <div style={{backgroundColor:props.bg_color}} className="App" id={`${props.category}_body`}>
      <Header bg_color={props.header_color} className={`${props.category}_header`}category={props.category} enableHover={enableHover}/>
      <CategoryBody  category={props.category}  enableHover={enableHover}/>
      <Footer bg_color={props.footer_color}  className={`${props.category}_footer`} category={props.category}  enableHover={enableHover}/>
    </div>
  );
}

export default Category;