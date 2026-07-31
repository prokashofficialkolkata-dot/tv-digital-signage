// GitHub Upload Settings

const GITHUB_USERNAME = "prokashofficialkolkata-dot";
const REPOSITORY_NAME = "tv-digital-signage";
const IMAGE_FOLDER = "images";


// Upload Images Function

async function uploadImages(){

    const files = document.getElementById("images").files;
    const message = document.getElementById("message");

    if(files.length === 0){
        message.innerHTML = "Please select images first";
        return;
    }


    message.innerHTML = "Uploading images...";


    for(let file of files){

        const reader = new FileReader();


        reader.onload = async function(){

            const base64Image = reader.result.split(",")[1];


            const fileName = Date.now() + "-" + file.name;


            const url =
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPOSITORY_NAME}/contents/${IMAGE_FOLDER}/${fileName}`;


            await fetch(url,{
                method:"PUT",

                headers:{
                    "Authorization":"Bearer YOUR_TOKEN_HERE",
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    message:"Upload slide image",

                    content:base64Image

                })

            });


        };


        reader.readAsDataURL(file);

    }


    message.innerHTML="All images uploaded successfully";

}
