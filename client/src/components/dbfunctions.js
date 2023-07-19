

const setStyle = (data, name, opstyl) => {
  const element = data.find(obj => obj.id === name);
  if (element) {
    
    return {
      ...opstyl,
      fontSize: element['font-size'],
      color: element.color,
      backgroundColor: element.bg_color,
      fontFamily: element.font_family,
      fontSize: element.font_size,
      textDecoration : element.text_decoration
    };
  }
  return {};
};
const setStylecart = (data, name ) => {
  const element = data.cartStyle.find(obj => obj.id === name);
  if (element) {
    
    return {
      
 
      color: element.color,
      backgroundColor: element.bg_color,
      fontFamily: element.font_family,
      textDecoration: element.text_decoration,
    
    };
  }
  return {};
};


    const setContent = (data,name) => {
      
      const element = data.find(obj => obj.id === name);
      
      if (element) {
        return element['content'];
          }
    return null;
  };

  const setHref = (data,name) => {
      
    const element = data.find(obj => obj.id === name);
    
    if (element) {
      return element['href'];
        }
  return null;
};


  const setSrc = (data,name) => {
    const element = data.find(obj => obj.id === name);

    if (element) {

      return require("./"+element['src']);
        }else{
          return 'no img';
  }
};
const setSrcprod = (data,name) => {
  const element = data.find(obj => obj.pid === name);

  if (element) {

    return require("./"+element['img']);
      }else{
        return 'no img';
}
};

export {setStyle,setContent,setHref,setSrc,setSrcprod,setStylecart};




































