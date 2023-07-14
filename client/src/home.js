import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import { useLocation } from 'react-router-dom';

function Home() {
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
    <div className="App">
      <Header bg_color="" enableHover={enableHover} />
      <Body enableHover={enableHover} />
      <Footer enableHover={enableHover} />
    </div>
  );
}

export default Home;
