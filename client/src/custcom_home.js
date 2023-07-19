import React, { useState, useEffect } from 'react';
import Custcomheader from './components/custcom_components/custcomheader';
import Custcomedit from './components/custcom_components/custcom_edit';

const Custcomhome = ()=>{
    return(
        <div>
            <Custcomheader bg_color="black"/>
            <Custcomedit/>
            
        </div>
    )
}

export default Custcomhome;