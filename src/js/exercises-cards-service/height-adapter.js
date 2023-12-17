const section = document.querySelector(".exercise-cards__wrapper");

export default function adaptHeight(endPoint, viewPort){
    if ((viewPort  >= 375 && viewPort < 768) && endPoint != 3){
        section.style.height = "1268px";
    } else if (viewPort > 1440 && endPoint === 1){
        section.style.height = "487px";
    } else if (viewPort > 768 && endPoint != 3){
        section.style.height = "833px";
        console.log(section.style.height);
    }  
    else {
        section.style.height = "";
    }
}