 
 
 const appendData=(snippet,id)=>{
    localStorage.setItem("searched",document.querySelector("#search").value)
  

    const parent = document.querySelector(`${id}`);
        parent.innerHTML=""

        snippet.forEach((el,index) => {

            let div = document.createElement("div");
            let image = document.createElement("img");
            image.src=el.snippet.thumbnails.medium.url
        
            let title = document.createElement("h3");
            title.innerText=el.snippet.title
            let cname = document.createElement("p")
            cname.innerText=el.snippet.channelTitle
            div.addEventListener("click",function(){
                localStorage.setItem("vdetails",JSON.stringify(el))
                window.location.href="../video.html"
                
            })

        div.append(image,title,cname)
        parent.append(div)

            
        });

}

export default appendData