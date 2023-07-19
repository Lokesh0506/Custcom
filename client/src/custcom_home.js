import React, { useState, useEffect } from 'react';
import Custcomheader from './components/custcom_components/custcomheader';
import Custcomedit from './components/custcom_components/custcom_edit';

const Custcomhome = ()=>{
    const reload= ()=>{
        //alert("reload in custhome");
        window.location.reload();
    }
    return(
        <div>
            <Custcomheader bg_color="black" />
            <Custcomedit reload={reload}/>
        </div>
    )
}

export default Custcomhome;