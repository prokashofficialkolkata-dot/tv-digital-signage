let db;

let current=0;

let slides=[];



let request=indexedDB.open(
"TVSlideDB",
1
);



request.onsuccess=function(e){

db=e.target.result;

loadImages();

};





function loadImages(){


let transaction=db.transaction(
["images"],
"readonly"
);


let store=transaction.objectStore("images");


let list=[];



store.openCursor().onsuccess=function(e){


let cursor=e.target.result;



if(cursor){


list.push(cursor.value.image);


cursor.continue();


}

else{


createSlides(list);


}



};



}





function createSlides(images){


let box=document.getElementById(
"slideshow"
);


box.innerHTML="";



images.forEach(function(img,index){


let image=document.createElement("img");


image.src=img;


image.className="slide";



if(index===0){

image.classList.add("active");

}



box.appendChild(image);



});



slides=document.querySelectorAll(".slide");



startSlide();


}






function startSlide(){



if(slides.length<=1){

return;

}



setInterval(function(){



slides[current].classList.remove(
"active"
);



current++;



if(current>=slides.length){

current=0;

}



slides[current].classList.add(
"active"
);



},15000);



}







function updateClock(){


let now=new Date();



document.getElementById("time").innerHTML =

now.toLocaleTimeString("en-MY",{

timeZone:"Asia/Kuala_Lumpur",

hour12:false

});



document.getElementById("date").innerHTML =

now.toLocaleDateString("en-MY",{

timeZone:"Asia/Kuala_Lumpur",

weekday:"long",

day:"2-digit",

month:"long",

year:"numeric"

});



}



updateClock();


setInterval(updateClock,1000);