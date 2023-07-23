import React, { useState } from 'react';

const Custcomheader = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const st = {
    backgroundColor: props.bg_color,
    width: '101%',
    border: '1px solid #ffffff33',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 0px 10px 10px',
  };

  const tooltipStyle = {
    position: 'absolute',
    top: '30px',
    right: '40px',
    backgroundColor: 'black',
    color: 'white',
    padding: '5px',
    display: showTooltip ? 'block' : 'none',
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div style={st} className='header'>
      <div>
        <img
          id="logo"
          src={require("./images/custcom_logo.png")}
          style={{ paddingTop: '20px', paddingBottom: '20px', width: '110px' }}
        />
        <h1 id="title" style={{ color: "whitesmoke", paddingTop: '20px' }}>CUSTCOM</h1>
      </div>
      {props.inventoryImage==="show" &&<a href={props.inventoryLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img
          src={require("./images/inventory.png")}
          alt="Inventory"
          style={{ width: '50px', height: '50px', paddingBottom: '30px', paddingRight: '35px', cursor: 'pointer', position: 'relative' }}
        />
        <div id="inventory-tooltip" style={tooltipStyle}>Go to Inventory</div>
      </a>} 

      {props.inventoryImage==="add" &&<a href={props.inventoryLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img
          src={require("./images/add.jpg")}
          alt="Inventory"
          style={{ width: '50px', height: '50px', paddingBottom: '15px', paddingRight: '35px', cursor: 'pointer', position: 'relative' }}
        />
        <div id="inventory-tooltip" style={tooltipStyle}>Add Product</div>
      </a>} 
    </div>
  );
};

export default Custcomheader;
