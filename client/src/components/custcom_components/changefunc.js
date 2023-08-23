const changeContent=(e,id) =>{
    var iframe = document.getElementById("website");
    iframe.contentWindow.document.getElementById(id).innerHTML= e.target.value;
}

const changeFontstyle=(ff,id) =>{
    var iframe = document.getElementById("website");

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const fontLink = iframeDoc.createElement("link");
    fontLink.href = `https://fonts.googleapis.com/css2?family=${ff.replace(" ", "+")}`;
    fontLink.rel = "stylesheet";
    iframeDoc.head.appendChild(fontLink);
    iframeDoc.getElementById(id).style.fontFamily=ff;
    const elements =iframeDoc.querySelectorAll(`.${id}`);
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.fontFamily = ff;
        }
    } else {
        console.warn(`No elements with the name "${id}" found inside the iframe.`);
    }
}

const changeFontsize=(e,id) =>{
    var iframe = document.getElementById("website");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.getElementById(id).style.fontSize= e.target.value
    const elements =iframeDoc.querySelectorAll(`.${id}`);
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.fontSize= e.target.value;
        }
    } else {
        console.warn(`No elements with the name "${id}" found inside the iframe.`);
    }
}

const changeColor=(color,id) =>{
    var iframe = document.getElementById("website");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframe.contentWindow.document.getElementById(id).style.color= color;
    const elements =iframeDoc.querySelectorAll(`.${id}`);
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color= color;
        }
    } else {
        console.warn(`No elements with the name "${id}" found inside the iframe.`);
    }

}

const changeBgcolor=(color,id) =>{
    var iframe = document.getElementById("website");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframe.contentWindow.document.getElementById(id).style.backgroundColor= color;
    const elements =iframeDoc.querySelectorAll(`.${id}`);
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor= color;
        }
    } else {
        console.warn(`No elements with the name "${id}" found inside the iframe.`);
    }
}

export {changeBgcolor,changeColor,changeContent,changeFontsize,changeFontstyle}