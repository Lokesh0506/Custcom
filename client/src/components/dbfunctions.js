

const setStyle = (data,name) => {
    const element = data.find(obj => obj.id === name);
    if (element) {
      return {
        fontSize: element['font-size'],
        color: element.color,
        backgroundColor : element.bg_color,
        fontFamily : element.font_family,
        fontSize : element.font_size,
        textDecoration : element.text_decoration
      };
    }};
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

export {setStyle,setContent,setHref,setSrc};




































