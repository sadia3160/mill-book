import BASE_URL from "../config.js";

const regForm = document.querySelector("#regForm");
const msg = document.querySelector("#message");

regForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        msg.innerText = "Password do not match!";
        msg.style.color = "red";
        return;
    }

    if(password.length<7){
        msg.innerText = "Password must be at least 7 characters long!";
        msg.style.color = "red";
        return;
    }


    try{
        const res = await fetch(`${BASE_URL}/api/v1/user/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,email,password})
        });

        const data = await res.json();
        msg.innerText = data.message;
        
        if(res.ok){
            msg.style.color = "green";

            setTimeout(()=>{
                window.location.href = "../login/login.html";
            }, 1500);
        } else{
            msg.style.color = "red";
        }
    }
    catch(err){
        msg.innerText =  "Can't Register Now. Try again!"
        msg.style.color = "red";
    }

});