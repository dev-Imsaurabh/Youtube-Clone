import appendData from "../components/appendData.js";

function navbar(){
    return ` <div><i id="bar" class="fa-solid fa-bars"></i>
    <img src="/assets/youtube_logo.png" alt="" id="logo"></div>
    <div><div> <input type="text" id="search" placeholder="Search a video..">
        <button id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button></div></div>
    <div><i id="account" class="fa-regular fa-circle-user"></i></div>`
}





const makeCall = async (order,id)=>{
    const API_KEY="AIzaSyAJEgi1gw2_1BWX2kHeJmhCQ8Zdt4NCVbs"

    let query = document.querySelector("#search").value
    if(query!=""){
        let data = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=${order}&maxResults=20&q=${query}&key=${API_KEY}`)
        let body = await data.json()
        let snippet = body.items
        console.log(snippet)
        appendData(snippet,id)
        
    }else{
        alert("Enter query")
    }
  
}

function check(){

    let checkLogin = JSON.parse(localStorage.getItem("login"))||0
    if(checkLogin!=0){
        let account = document.querySelector("#account")
       account.setAttribute("data-after",checkLogin.name);
       account.setAttribute("class","fa-solid fa-right-from-bracket");
    }
}


setTimeout(() => {
    document.querySelector("#logo").onclick=()=>{
        window.location.href="../index.html"
    }
 let account = document.querySelector("#account")   
 
document.querySelector("#account").onclick=()=>{
    if(account.getAttribute("class")=="fa-solid fa-right-from-bracket"){
        localStorage.removeItem("login")
        window.location.href="../signup.html"
     }else{
        window.location.href="../signup.html"

     }
}
check()
}, 1000);


export {navbar,makeCall}