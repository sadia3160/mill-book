import BASE_URL from "../config.js";

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('userToken');
    window.location.href = "../login/login.html";
});


const profileForm = document.querySelector("#profileForm");
const msg = document.querySelector("#message");

profileForm.addEventListener('submit', async (event)=>{
    event.preventDefault();

    const token = localStorage.getItem('userToken');
    const password = document.getElementById("shopPassword").value;
    const newPassword = document.getElementById("newShopPassword").value;
    const email = document.getElementById("shopEmail").value;

    if(!token){
            msg.innerText =  "Login first!";
            msg.style.color = "red";
            setTimeout(()=>{
                window.location.href="../login/login,html";
            },1500);
            return;
    }

    try{

        if(!email || !password || !newPassword) {
            msg.innerText =  "Enter all information!";
            msg.style.color = "red";
            return;
        }
        if(password.length<7 || newPassword.length<7){
            msg.innerText =  "Password must be at least 7 characters long";
            msg.style.color = "red";
            return;
        }

        const res = await fetch(`${BASE_URL}/api/v1/user/changepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({email, password, newPassword}) 
        });

        const data = await res.json();
        msg.innerText = data.message;

        if(res.ok){
             msg.style.color = "green";
        } else {
             msg.style.color = "red";
        }

    }
    catch(err){
        msg.innerText = err.message;
        msg.style.color = "red";
    }
});
