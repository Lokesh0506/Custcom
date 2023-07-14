import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import CategoryBody from './components/categorybody';
import { useLocation } from 'react-router-dom';


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
  return (
    <div style={{backgroundColor:props.bg_color}} className="App">
      <Header bg_color={props.header_color} enableHover={enableHover}/>
      <CategoryBody  category={props.category} enableHover={enableHover}/>
      <Footer enableHover={enableHover}/>
    </div>
  );
}

export default Category;