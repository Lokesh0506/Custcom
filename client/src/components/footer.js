import React, { useEffect, useState } from 'react';
import { H1, H2, H3, IMG, P, A } from './tags';
import './footer.css';
import { setStyle, setContent, setHref, setSrc, setSrcprod } from './dbfunctions';
import Axios from 'axios';

const Footer = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/home')
            .then(response => {
                setData(response.data.footer);
                console.log(response.data.footer);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const st = { backgroundColor: props.bg_color };

    return (
        <div style={st} className='footer'>

            <P id="phone_no" content={"Phone: "+ setContent(data,"phone_no")} style={setStyle(data, 'phone_no')}/>
            <P id ="email" content="Email: " style={setStyle(data, 'email')}> <A href={"https://mail.google.com/mail/?view=cm&tf=0&to="+setHref(data, "email")} content={setContent(data, "email")} style={setStyle(data, 'email')}/></P>
            <address>
                <b>Visit us at:</b><br />
                <P id="address" content={setContent(data,"address")} />
            </address>

                    </div>
                    );
};

export default Footer;
