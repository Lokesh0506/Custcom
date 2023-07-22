import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import Axios from 'axios';
import './tag_edit.css';

const Div_edit = (props) => {
    const [data, setData] = useState({});
    const [bgcolor, setBgColor] = useState('');
    const [bgcolorPickerVisible, setbgColorPickerVisible] = useState("false");

    useEffect(() => {
        setData(props.details);
        setBgColor(props.details?.bg_color || '');
    }, [props.details]);






    const updateDB = (event) => {

        event.preventDefault();


        const newData = {
            id: data.id,
            bg_color: document.getElementById('bg_color').value
        };
        console.log(newData);
        Axios.post('http://localhost:8080/custcom/update/div', newData)
            .then(response => {

                console.log(response.data);
                props.onDataUpdate();
                setData(newData);
            })
            .catch(error => {

                console.error(error);
            });

            
    };


    const setDefault = () => {
        alert("default")
    }

    const handlebgChange = (updatedColor) => {
        setBgColor(updatedColor.hex);
    };

    return (
        <div className='tag_edit'>
            <form name='div_edit'>
                <label>Tag Type : {data.type}</label><br/><br/>
                <label>Tag ID : {data.id}</label><br/><br/>
                <label>
                    Background Colour : <input type='text' id='bg_color' defaultValue={bgcolor} onChange={(e) => setBgColor(e.target.value)} onFocus={()=>{setbgColorPickerVisible('true');}} />
                    {bgcolorPickerVisible==="true" &&<div className='colorpicker'><ChromePicker color={bgcolor} onChange={handlebgChange} /></div>}
                </label><br/><br/>
                <button id="save" type='submit' onClick={updateDB}>Save</button>
                <button id="reset" type='submit' onClick={setDefault}>Reset</button>

            </form>

        </div>
    )

}

export default Div_edit;
