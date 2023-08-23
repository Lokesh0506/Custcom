import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './tag_edit.css';
import {changeBgcolor,changeColor,changeContent,changeFontsize,changeFontstyle} from './changefunc'

const Img_edit = (props) => {
    const [data, setData] = useState({});
    const formData = new FormData();

    useEffect(() => {
        setData(props.details);
    }, [props.details]);

    formData.append('id',data.id);
    formData.append('table',data.table);



    const updateDB = (event) => {

        event.preventDefault();


       
        Axios.post('http://localhost:8080/custcom/update/img', formData)
            .then(response => {

                console.log(response.data);
                props.onDataUpdate();
            })
            .catch(error => {

                console.error(error);
            });

            
    };


  
    const setDefault = () => {
    
        var result = window.confirm("Do you want to Reset?");
        if (result === true) {
            window.location.reload();

    }
}
    const handleImgchange = (event)=>{
        formData.append('img',event.target.files[0]);
        formData.append('img_name',event.target.files[0].name);
    }

    return (
        <div className='tag_edit'>

            <form name='img_edit'>
                <label>Tag Type : {data.type}</label><br/><br/>
                <label>Tag ID : {data.id}</label><br /><br/>

                <label>Image: <input type="file" id="img" name="img" onChange={handleImgchange} /></label><br/><br/>
                <button id="save" type='submit' onClick={updateDB}>Save</button>
                <button id="reset" type='submit' onClick={setDefault}>Reset</button>

            </form>

        </div>
    )

}

export default Img_edit;

