import React, { useEffect, useState } from 'react';
import Custcomheader from './custcomheader';
import Axios from 'axios';



function Custcomedit() {
  const [data , setData] = useState('logo');

  useEffect(() => {
    Axios.post('http://localhost:8080/custcom', { id:data })
    .then(response => {
      console.log('Received message from iframe:',data );
      document.getElementById("tagid").innerHTML = response;
      console.log(response);
    })
  }, [data])

  useEffect(() => {
    const handleIframeMessage = (event) => {
      setData(event.data);

     };

    

    window.addEventListener('message', handleIframeMessage);

   
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };})


   
  
    
  return (
    <div className='custcom_edit'>
        <div style={{ float: 'left', width: '75%' }}>
        <iframe src={`http://localhost:3000/home?mobno=admin&enable=true`} title="Infinix" width="800" height="1000"></iframe>
      </div>
      <div style={{ float: 'right', width: '25%' }}>
        <h1 id="tagid" defaultValue={"custcom"}>custcom</h1>
        
      </div>
    </div>
  );
}

export default Custcomedit;