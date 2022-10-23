import {navbar,makeCall} from "../components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar()
document.querySelector("#search").value = localStorage.getItem("searched")

let id = "#search-box"
document.querySelector("#searchBtn").addEventListener("click",function(){

    makeCall("relevance",id)

})
let recid ="#rec"


let data = JSON.parse(localStorage.getItem("vdetails"));
document.querySelector("title").innerText=data.snippet.title
document.querySelector("#title").innerText=data.snippet.title

let vid =data.id.videoId
let videoPlayer = document.querySelector("iframe");
videoPlayer.setAttribute("src",`https://www.youtube.com/embed/${vid}?autoplay=1&mute=1`)

 makeCall(retrunRecommendation(),recid)


 function retrunRecommendation(){
    let arr=["viewCount","date","rating"]
    let random = Math.floor(Math.random() * 2) + 1
    console.log(random)
    return arr[random]
 }