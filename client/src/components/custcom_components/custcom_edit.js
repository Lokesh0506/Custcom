import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Custcomedit() {
  const [currentId, setcurrentId] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [data, setData] = useState([]);
  const[H,setH]=useState(false);
  const[Img,setImg]=useState(false);
  const[P,setP]=useState(false);
  const[A,setA]=useState(false);
  const[Button,setButton]=useState(false);
  const[DefaultMsg,setDefaultMsg]=useState(false);

  useEffect(() => {
    Axios.post('http://localhost:8080/custcom')
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    const handleIframeMessage = (event) => {
      setcurrentId(event.data);
    };

    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  useEffect(() => {
    
    console.log('Updated currentId:', currentId);
    document.getElementById("tagid").innerHTML = currentId;
    const detail = data.find(item => item.id === currentId);
    console.log(detail);
    setCurrentData(detail);
    
  }, [currentId,data]);

  useEffect(() => {
    if (currentData != null) {
      setH(['h1','h2','h3','h4','h5','h6'].includes(currentData.type));
      setP(currentData.type === 'p');
      setImg(currentData.type === 'img');
      setA(currentData.type === 'a');
      setButton(['submit','reset','button'].includes(currentData.type));
      setDefaultMsg(
        !['h1', 'p', 'img', 'a', 'button'].includes(currentData.type)
      );
    }
  }, [currentData]);
  
  

  return (
    <div className='custcom_edit'>
      <div style={{ float: 'left', width: '75%' }}>
        <iframe src={`http://localhost:3000/home?mobno=admin&enable=true`} title="Infinix" width="800" height="1000"></iframe>
      </div>
      <div style={{ float: 'right', width: '25%' }}>
        <h1 id="tagid">custcom</h1>
        {H && <h1>H1</h1>}
        {P && <h1>P</h1>}
        {Img && <h1>IMG</h1>}
       
      </div>
    </div>
  );
}

export default Custcomedit;
