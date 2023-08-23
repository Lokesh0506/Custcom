const changeContent=(e,id) =>{
    var iframe = document.getElementById("website");
    iframe.contentWindow.document.getElementById(id).innerHTML= e.target.value;
}

const changeFontstyl=(e,id) =>{
    var iframe = document.getElementById("website");
    iframe.contentWindow.document.getElementById(id).style.fontFamily= e.target.value;
}

const changeFontsize=(e,id) =>{
    var iframe = document.getElementById("website");
    iframe.contentWindow.document.getElementById(id).style.fontSize= e.target.value;
}

const changeColor=(e,id) =>{
    var iframe = document.getElementById("website");
    iframe.contentWindow.document.getElementById(id).style.color= e.target.value;
}

const changeBgcolor=(e,id) =>{
    var iframe = document.getElementById("website");
    iframe.contentWindow.document.getElementById(id).style.backgroundColor= e.target.value;
}