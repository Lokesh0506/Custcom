import React, { useEffect, useState } from 'react';


const Custcomheader = (props) => {
  const [data, setData] = useState([]);

 

  const st = { backgroundColor: props.bg_color, width:'101%',  border: '1px solid #ffffff33' };

  return (
    <div style={st} className='header'>
      <img id="logo" src={require("./images/custcom_logo.png")} style={{paddingBottom:'10px', width:'110px'}}/>
      <h1 id="title"  style={{color:"whitesmoke"}}>CUSTCOM</h1>

      
        
    </div>
  );
};

export default Custcomheader;