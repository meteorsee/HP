import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    var enterCaseID = document.querySelector("#enterCaseID");
    var enterWorkID = document.querySelector("#enterWorkID");
    var enterTechnician = document.querySelector("#enterTechnician");
    var enterHandler = document.querySelector("#enterHandler");
    var enterHardwarePartNumber = document.querySelector("#enterHardwarePartNumber");
    var enterHardwarePartStatus = document.querySelector("#enterHardwarePartStatus");
    var enterAWBNumber = document.querySelector("#enterAWBNumber");
    var enterMONumber = document.querySelector("#enterMONumber");
    var enterHPOrderNumber = document.querySelector("#enterHPOrderNumber");
    var enterRMANumber = document.querySelector("#enterRMANumber");
    var enterDateArrived = document.querySelector("#enterDateArrived");
    var enterDateCollected = document.querySelector("#enterDateCollected");

    var insertBtn = document.querySelector("#insert");


    function validateInputs(...inputs) {
        for (let input of inputs) {
            if (!input.value) {
                alert("Please fill in all fields");
                return false;
            }
        }
        return true;
    }

    function InsertData() {
        if (!validateInputs(
                enterCaseID, enterWorkID, enterTechnician, 
                enterHandler, enterHardwarePartNumber, 
                enterHardwarePartStatus, enterAWBNumber, enterMONumber, 
                enterHPOrderNumber, enterRMANumber, enterDateArrived,
            )) return;

        set(ref(db, "Data/" + enterCaseID.value), {
            CaseID: enterCaseID.value,
            WorkID: enterWorkID.value,
            TechnicianName: enterTechnician.value,
            HandlerName: enterHandler.value,
            HardwarePartNumber: enterHardwarePartNumber.value,
            HardwarePartStatus: enterHardwarePartStatus.value,
            AWBNumber: enterAWBNumber.value,
            MONumber: enterMONumber.value,
            HPOrderNumber: enterHPOrderNumber.value,
            RMANumber: enterRMANumber.value,
            DateArrived: enterDateArrived.value,
            DateCollected: enterDateCollected.value
        })
        .then(() => {
            alert("Data added successfully");
            location.reload(true); // true parameter forces reloading from the server instead of cache
        })
        .catch((error) => {
            alert(error);
        });
    }

   
    insertBtn.addEventListener('click', InsertData);
    
});
