// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBolJZqazeK25DNl2nt225xR40TNB3raYY",
    authDomain: "hptest-29ff4.firebaseapp.com",
    databaseURL: "https://hptest-29ff4-default-rtdb.firebaseio.com",
    projectId: "hptest-29ff4",
    storageBucket: "hptest-29ff4.appspot.com",
    messagingSenderId: "1005924268209",
    appId: "1:1005924268209:web:268ab2adcaa6985336ca90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


let loginForm = document.getElementById('loginForm');

let Login = evt => {
    evt.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            // Logged in
            // const user = userCredential.user
            // alert("Successful login")
            // window.location.href = "index.html";

            //console.log(credentials);

            get(child(dbref, 'UserAuthList/' + credentials.user.uid)).then((snapshot)=>{
                if(snapshot.exists){
                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                    window.location.href = "index.html";
                }
            })
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // alert(errorMessage);
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}

loginForm.addEventListener('submit', Login);

// Submit button
// const submit = document.getElementById('submit');
// submit.addEventListener("click", function (event) {
//     event.preventDefault()

//     // Inputs
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Logged in
//             const user = userCredential.user
//             alert("Successful login")
//             window.location.href = "index.html";
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             alert(errorMessage);
//         });
// });
