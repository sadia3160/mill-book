const token = localStorage.getItem('userToken');

if(!token){
    alert('Access denied!');
    window.location.href="../login/login.html";
}



