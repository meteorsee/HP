let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let logout = document.getElementById('Logout');

let Logout = () =>{
    sessionStorage.removeItem("user-creds");
    window.location.href = 'login.html';
}

let CheckCred = () =>{
    if(!sessionStorage.getItem('user-creds'))
        window.location.href = 'login.html';
}

window.addEventListener('load', CheckCred);
logout.addEventListener('click', Logout);