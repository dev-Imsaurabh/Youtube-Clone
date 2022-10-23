import {navbar,makeCall} from "../components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar()
document.querySelector("#search").value = localStorage.getItem("searched")



let id = "#search-box"
document.querySelector("#searchBtn").addEventListener("click",function(){

    makeCall("relevance",id)

})

let checkLogin = localStorage.getItem("login")||0
checkLogin!=0?window.location.href="../index.html":console.log("user not found")

const BASE_URL="https://masai-api-mocker.herokuapp.com"


//authentication part

class User{


    constructor(){

    }

    validateUsername(username){

       return username.includes("@")?false:true;

    }

    validatePassword(password){
        return password.length<8?false:true
    }

   async signUp(name,username,password,email,mobile,desc){


        let validateCredintial=this.validateUsername(username)&&this.validatePassword(password)
        if(validateCredintial){
            this.name=name;
            this.username=username;
            this.password=password;
            this.email=email;
            this.mobile=mobile;
            this.description=desc;

            const reg_api = BASE_URL+"/auth/register"

            let response = await fetch(reg_api,{
                method:"POST",
                body:JSON.stringify(this),
                headers:{
                    "Content-Type":"application/json"
                }
            });


            let data = await response.json()
            console.log(data)

            if(data.error==false){
                alert("Registered successfully")
            }

        }


      



    }

    async signIn(username,password){

        this.username=username
        this.password=password

        let login_api = BASE_URL+"/auth/login"

        let response= await fetch(login_api,{
            method:"POST",
            body:JSON.stringify(this),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data = await response.json()
       return data
         

    }

}

document.querySelector("#register").onclick=()=>{
    Register()
}
document.querySelector("#login").onclick=()=>{
    Login()
}

let user = new User()

let Register=()=>{

    console.log("registering")

    let reg_form = document.querySelector("#reg_form");
    let name = reg_form.name.value
    let username = reg_form.username.value
    let password = reg_form.password.value
    let email = reg_form.email.value
    let mobile = reg_form.mobile.value
    let description = reg_form.description.value

    user.signUp(name,username,password,email,mobile,description)
    reg_form.reset()

}


let Login = async()=>{
    let login_form = document.querySelector("#log_form");

 let username = login_form.login_username.value
    let password = login_form.login_password.value

    //desturctured
    let {token,error}=await user.signIn(username,password)
    console.log(error)
    // console.log(token,username)

    getProfile(username,token,error)
}

let  getProfile = async(username,token,error)=>{
    if(!error){

        let profile_url = BASE_URL+`/user/${username}`
        let response = await fetch(profile_url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        let data = await response.json()
        console.log(data)
        
        localStorage.setItem("login",JSON.stringify(data));
        if(error==false){
            alert("Login successful")
        }
        window.location.reload()




    }else{
        alert("Incorrect email/password")
    }
   


}