import React, { useEffect, useState } from 'react';
import { H1, H2, H3, IMG, P, A } from './tags';
import './footer.css';
import { setStyle, setContent, setHref, setSrc, setSrcprod } from './dbfunctions';
import { handleHover } from './tags';
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

    const fontfetch = (data) => {
        const fontLinks = data.map((fontStyle) => {
          const { font_family } = fontStyle;
          if (font_family) {
            return (
              <link key={font_family} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font_family}`} />
            );
          }
          return null;
        });
      
        return fontLinks;
      };

    const st = { backgroundColor: props.bg_color };

    return (
        <div style={st} className='footer' onDoubleClick={() => handleHover(`${props.category}_footer`, props.enableHover)}>
            {fontfetch(data)}
            <P id="phone_no" enableHover={props.enableHover} content={"Phone: "+ setContent(data,"phone_no")} style={setStyle(data, 'phone_no')}/>
            <P id ="email" enableHover={props.enableHover} content="Email: " style={setStyle(data, 'email')}> <A href={"https://mail.google.com/mail/?view=cm&tf=0&to="+setHref(data, "email")} content={setContent(data, "email")} style={setStyle(data, 'email')}/></P>
            <address>
                <P id="address_title" enableHover={props.enableHover} content={setContent(data,"address_title")} style={setStyle(data, 'address_title')}></P>
                <P id="address" enableHover={props.enableHover} content={setContent(data,"address")} style={setStyle(data, 'address')} />
            </address>

                    </div>
                    );
};

export default Footer;
