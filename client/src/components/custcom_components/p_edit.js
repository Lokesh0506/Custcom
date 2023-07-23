import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import Axios from 'axios';
import './tag_edit.css';

const P_edit = (props) => {
    const [data, setData] = useState({});
    const [color, setColor] = useState('');
    const [bgcolor, setBgColor] = useState('');
    const [fontStyles, setFontStyles] = useState([]);
    const [selectedFont, setSelectedFont] = useState(props.details?.font_family);
    const [selectedStyle, setSelectedStyle] = useState(props.details?.text_decoration);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [bgcolorPickerVisible, setbgColorPickerVisible] = useState(false);

    useEffect(() => {
        setData(props.details);
        setColor(props.details?.color || '');
        setBgColor(props.details?.bg_color || '');
    }, [props.details]);

    useEffect(() => {
        fetchFontStyles();
    }, []);

    const fetchFontStyles = async () => {
        try {
            const response = await Axios.get(
                'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCKc-F9ADY1CuLpQ7SkkUaOs2GCiTleuJg&sort=popularity'
            );
            const allFonts = response.data.items;
            const limitedFonts = allFonts.slice(0, 100);
            setFontStyles(limitedFonts);
        } catch (error) {
            console.error('Error fetching font styles:', error);
        }
    };



    const updateDB = (event) => {

        event.preventDefault();


        const newData = {
            id: data.id,
            table:data.table,
            content: document.getElementById('content').value,
            color: document.getElementById('color').value,
            bg_color: document.getElementById('bg_color').value,
            font_size: document.getElementById('font_size').value,
            font_family: document.getElementById('font_family').value,
            text_decoration: document.getElementById('text_dec').value,
            href:null,
            src:null
        };
        console.log(newData);
        Axios.post('http://localhost:8080/custcom/update', newData)
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
    
        var result = window.confirm("Do you want to Reset?");
        if (result === true) {
            window.location.reload();

    }
}



    const handleFontChange = (event) => {
        setSelectedFont(event.target.value);
    };


    const handlecolorChange = (updatedColor) => {
        setColor(updatedColor.hex);
    };
    const handlebgChange = (updatedColor) => {
        setBgColor(updatedColor.hex);
    };

    return (
        <div className='tag_edit'>

            {fontStyles.map((fontStyle) => (
                <link key={fontStyle?.family} rel="stylesheet" href={"https://fonts.googleapis.com/css?family=" + fontStyle.family} />
            ))}
            <form name='p_edit'>
                <label>Tag Type : {data.type}</label><br /><br/>
                <label>Tag ID : {data.id}</label><br /><br/>
                <label>Content : <input type='text' id='content' defaultValue={data.content} /></label><br /><br/>
                <label>
                    Colour: <input type="text" id='color' value={color} onChange={(e) => setColor(e.target.value)}  onFocus={()=>{setColorPickerVisible("true");}} />
                    {colorPickerVisible==="true"  && <div className='colorpicker'><ChromePicker color={color} onChange={handlecolorChange} /></div>}
                </label><br /><br/>
                <label>
                    Background Colour : <input type='text' id='bg_color' defaultValue={bgcolor} onChange={(e) => setBgColor(e.target.value)} onFocus={()=>{setbgColorPickerVisible("true");}}  />
                    {bgcolorPickerVisible==="true" &&<div className='colorpicker'><ChromePicker color={bgcolor} onChange={handlebgChange} /></div>}
                </label><br /><br/>
                <label>Font Size : <input type='text' id='font_size' defaultValue={data.font_size} /></label><br /><br/>
                <label>
                    Font Family:
                    <select style={{ fontFamily: selectedFont }} value={selectedFont} id='font_family' onChange={handleFontChange}>
                        <option value='sans-serif' style={{ fontFamily: 'sans-serif' }}>sans-serif</option>
                        {fontStyles.map((fontStyle) => (
                            <option key={fontStyle.family} style={{ fontFamily: fontStyle.family }} value={fontStyle.family}>
                                {fontStyle.family}
                            </option>
                        ))}
                    </select>
                </label><br /><br/>
                <label>
                    Text Decoration:
                    <select id='text_dec' value={selectedStyle}>
                        <option value="bold" style={{ fontWeight: 'bold' }}>Bold</option>
                        <option value="italic" style={{ fontStyle: 'italic' }}>Italic</option>
                        <option value="overline" style={{ textDecoration: 'overline' }}>Overline</option>
                        <option value="underline" style={{ textDecoration: 'underline' }}>Underline</option>
                        <option value="line-through" style={{ textDecoration: 'line-through' }}>Line-through</option>
                    </select>
                </label>
                <br />

<br/>                <button  id="save" type='submit' onClick={updateDB}>Save</button>
                <button id="reset" type='submit' onClick={setDefault}>Reset</button>

            </form>

        </div>
    )

}

export default P_edit;

