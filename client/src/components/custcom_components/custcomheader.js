import React, { useEffect, useState } from 'react';


const Custcomheader = (props) => {
  const [data, setData] = useState([]);

 

  const st = { backgroundColor: props.bg_color };

  return (
    <div style={st} className='header'>
      <img id="logo" src={require("./logo.png")}/>
      <h1 id="title"  style={{color:"whitesmoke"}}>CUSTCOM</h1>

      
        
    </div>
  );
};

export default Custcomheader;