//const apikey="YlraMgTAYWNhkF8RIq-NK0_v1EaWjWiPV-_9Fk3QXS4";


const urllink=`https://api.unsplash.com/photos/random?client_id=${apikey}&count=20`;

const searchlink=`https://api.unsplash.com/search/photos?client_id=${apikey}&count=20`;

const gallery=document.querySelector(".gallery");

let allimages;
let currentimage;
console.log("connected")
const getimages=()=>{
    fetch(urllink)
    .then((res)=>res.json())
    .then((data)=>{
        
        allimages=data;
        makeimages(allimages);
    }
    )
}

const makeimages=(data)=>{
    console.log(data)
    data.forEach((image,index)=>{

        let img=document.createElement("img");
        img.src=image.urls.regular;
        img.className="gallery-image"

        gallery.appendChild(img)


        img.addEventListener("click",()=>{
            currentimage=index;
            showpopup(image)
        })

    })
}

const showpopup=(item)=>{
    let popup=document.querySelector(".image-popup");
    const downloadbtn= document.querySelector(".download-btn");
    const closebtn= document.querySelector(".close-btn");
    const image= document.querySelector(".large-image");


    popup.classList.remove("hide");
    downloadbtn.href=item.links.html;
    image.src=item.urls.regular;

    closebtn.addEventListener("click",()=>{
        popup.classList.add("hide")
    })
}
getimages();