import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import H_edit from './h_edit';
import Button_edit from './button_edit';
import P_edit from './p_edit';

function Custcomedit(props) {
  
  const [currentId, setcurrentId] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [data, setData] = useState([]);
  const[H,setH]=useState(false);
  const[Img,setImg]=useState(false);
  const[P,setP]=useState(false);
  const[A,setA]=useState(false);
  const[Button,setButton]=useState(false);
  const[DefaultMsg,setDefaultMsg]=useState(false);
  const [fetchData, setfetchData] = useState('unfetch');

  useEffect(() => {
  
    Axios.post('http://localhost:8080/custcom')
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, [fetchData]);

  useEffect(() => {
    const handleIframeMessage = (event) => {
     
      if (event.data.source !== 'react-devtools-backend-manager'&& event.data.source !== 'react-devtools-content-script' && event.data.source !== 'react-devtools-bridge' && event.data.source !== 'webpackHotUpdate0f2f57a53098bcc82dfc' ) {
        setcurrentId(event.data);
      }
    };

    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  const handleDataUpdate = () => {
    
    setfetchData(prevState => prevState === 'fetch' ? 'unfetch' : 'fetch');
    props.reload();
    //alert("reload in custedit");
    window.location.reload();
  };

  useEffect(() => {
    
    console.log('Updated currentId:', currentId);
    document.getElementById("tagid").innerHTML = currentId;
    const detail = data.find(item => item.id === currentId);
   // console.log(detail);
    setCurrentData(detail);
    if(!detail){
      setCurrentData(null);
    }
    
  }, [currentId,data]);

  useEffect(() => {
    if (currentData != null && currentData != undefined) {
      setH(['h1','h2','h3','h4','h5','h6'].includes(currentData?.type));
      setP(currentData?.type === 'p');
      setImg(currentData?.type === 'img');
      setA(currentData?.type === 'a');
      setButton(['submit','reset','button'].includes(currentData?.type));
      setDefaultMsg(
        !['h1', 'p', 'img', 'a', 'button'].includes(currentData?.type)
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
        <br/>
        {H &&  <H_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {P && <P_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {Img && <h1>IMG</h1>}
        {A && <h1>A</h1>}
        {Button && <Button_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {DefaultMsg && <h1>DefaultMsg</h1>}

       
      </div>
    </div>
  );
}

export default Custcomedit;
