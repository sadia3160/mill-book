import BASE_URL from "../config.js";


const regForm = document.querySelector("#loginForm");
const msg = document.querySelector("#message");

regForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try{
        const res = await fetch(`${BASE_URL}/api/v1/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        });

        const data = await res.json();
        msg.innerText = data.message;
        
        if(res.ok){
            msg.style.color = "green";

            localStorage.setItem('userToken', data.user.token); //

            setTimeout(()=>{
                window.location.href = "../home/home.html";
            },2000);
            
        } else{
            msg.style.color = "red"
        }
    }
    catch(err){
        msg.innerText =  "Can't Login Now. Try again!"
        msg.style.color = "red";
    }

});