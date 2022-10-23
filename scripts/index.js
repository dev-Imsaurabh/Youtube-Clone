import {navbar,makeCall} from "../components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar()

let id ="#search-data"


document.querySelector("#searchBtn").addEventListener("click",function(){
    makeCall("relevance",id)
});
document.querySelector("#filter").addEventListener("change",function(){
    let order = document.querySelector("#filter").value
    if(order!=""){

        makeCall(order,id)

    }

});
