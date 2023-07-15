import React,{Component} from 'react';


const handleHover = (id,enable) => {
  if(enable){
  console.log('Hovered ID:', id);
  window.parent.postMessage(id, '*');
}else{return null;}
};


const H1 = (props) => {
   return (
        <h1 id={props.id} style={props.style} onClick={(e) => handleHover(e.target.id, props.enableHover)} >{props.content}</h1>
      )
};

const H2 = (props) => {
  return (
       <h2 id={props.id} onClick={(e) => handleHover(e.target.id, props.enableHover)} style={props.style}>{props.content}</h2>
  )
};

const H3 = (props) => {
  return (
       <h3 id={props.id} onClick={(e) => handleHover(e.target.id, props.enableHover)} style={props.style}>{props.content}</h3>
       )
};

const P = (props) => {
  return (
       <p id={props.id} onClick={(e) => handleHover(e.target.id, props.enableHover)} style={props.style}>{props.content}</p>
     )
};

const A = (props) => {
  return (
       <a id={props.id} onMouseEnter={(e) => handleHover(e.target.id, props.enableHover)} href={props.href} style={props.style}>{props.content}</a>
     )
};
const IMG = (props) => {
  return (
       <img id={props.id} onClick={(e) => handleHover(e.target.id, props.enableHover)} src={props.src} style={props.style}/>
     )
};

const BUTTON = (props) => {
  return (
       <button tagtype="button" id={props.id} onMouseEnter={(e) => handleHover(e.target.id, props.enableHover)} type={props.type}  onClick={props.onClick} style={props.style}>{props.value}</button>
     )
};



export  {H1,H2,H3,P,A,IMG,BUTTON} ;






