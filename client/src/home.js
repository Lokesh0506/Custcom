import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import { useLocation } from 'react-router-dom';


function Home(props) {
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
      <Header bg_color={props.header_color} className="homepage_header" category="homepage" enableHover={enableHover} />
      <Body bg_color={props.body_color} className="homepage_body" category="homepage" enableHover={enableHover} />
      <Footer bg_color={props.footer_color} className="homepage_footer" category="homepage" enableHover={enableHover} />
    </div>
  );
}

export default Home;
