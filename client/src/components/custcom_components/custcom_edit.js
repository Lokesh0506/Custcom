import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import H_edit from './h_edit';
import Button_edit from './button_edit';
import P_edit from './p_edit';
import Img_edit from './img_edit';
import A_edit from './a_edit';
import Div_edit from './div_edit';
import styles from './custcom_edit.module.css';
import "./tag_edit.css";

function Custcomedit(props) {
  
  const [currentId, setcurrentId] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [data, setData] = useState([]);
  const[H,setH]=useState(false);
  const[Img,setImg]=useState(false);
  const[P,setP]=useState(false);
  const[A,setA]=useState(false);
  const[Button,setButton]=useState(false);
  const[Div,setDiv]=useState(false);
  const[DefaultMsg,setDefaultMsg]=useState(true);
  const [fetchData, setfetchData] = useState('unfetch');

  useEffect(() => {
    document.body.classList.add(styles['custcom_edit']);
    return () => {
      document.body.classList.remove(styles['custcom_edit']);
    };
  }, []);

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
      setDiv(currentData?.type === 'div');
      setButton(['submit','reset','button'].includes(currentData?.type));
      setDefaultMsg(
        !['h1',,'h2','h3','h4','h5','h6', 'p', 'img','submit','reset', 'a', 'button',"div"].includes(currentData?.type)
      );
    }
  }, [currentData]);
  

  const renderDefaultMessage = () => {
    return (
      <div className='instruction-box'>
        <h1 style={{textAlign:"left"}}>Please select an item to edit</h1>
        <p>
         <h2> Instructions:</h2>
          <br />
          - To edit the header, double click on it.
          <br />  <br />
          -To edit the home icon and cart icon , just hover on it.
          < br/>  <br />
          -To edit your company's logo, name and category just single click on it.
          <br/>  <br />
          -For changing the add banners, click on the add banners that you want to change and upload the image of the new add banner.
          <br/>  <br />
          -To change the background color for your homepage, click on the body.
          <br/>  <br /> 
          - Similarly you can change the styles of the product name, price, mrp by just single clicking on it.
          <br/>  <br /> - Button can be modified by just hovering on it.
          <br/>  <br />- Inventory can be added, updated , deleted by going to the inventory option on the top right.

        </p>
      </div>
    );
  };
  return (
    <div className='custcom_edit'>
      <div style={{ float: 'left', width: '75%' }}>
        <iframe src={`http://localhost:3000/home?mobno=admin&enable=true`} title="Infinix" width="800" height="1000"></iframe>
      </div>
      <div style={{ float: 'right', width: '25%' }}>
        <br/>
        {DefaultMsg && !currentData && renderDefaultMessage()}
        {H &&  <H_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {P && <P_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {Img && <Img_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {A && <A_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {Button && <Button_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}
        {Div &&  <Div_edit key={currentData.id} details={currentData} onDataUpdate={handleDataUpdate}/>}


       
      </div>
    </div>
  );
}

export default Custcomedit;
