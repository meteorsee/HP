import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
    var findCaseIDInput = document.querySelector("#findCaseIDInput");
    var findCaseID = document.querySelector("#findCaseID");
    var findWorkID = document.querySelector("#findWorkID");
    var findTechnician = document.querySelector("#findTechnician");
    var findHandler = document.querySelector("#findHandler");
    var findHardwarePartNumber = document.querySelector("#findHardwarePartNumber");
    var findHardwarePartStatus = document.querySelector("#findHardwarePartStatus");
    var findAWBNumber = document.querySelector("#findAWBNumber");
    var findMONumber = document.querySelector("#findMONumber");
    var findHPOrderNumber = document.querySelector("#findHPOrderNumber");
    var findRMANumber = document.querySelector("#findRMANumber");
    var findDateArrived = document.querySelector("#findDateArrived");
    var findDateCollected = document.querySelector("#findDateCollected");
    var findBtn = document.querySelector("#findBtn");
    var resultsTable = document.querySelector("#resultsTable");

    function FindData() {
        if (!findCaseIDInput.value) {
            alert("Please enter a Case ID");
            location.reload(true); // true parameter forces reloading from the server instead of cache
            return;
        }

        const dbref = ref(db);

        get(child(dbref, "Data/" + findCaseIDInput.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    findCaseID.textContent = data.CaseID || "";
                    findWorkID.textContent = data.WorkID || "";
                    findTechnician.textContent = data.TechnicianName || "";
                    findHandler.textContent = data.HandlerName || "";
                    findHardwarePartNumber.textContent = data.HardwarePartNumber || "";
                    findHardwarePartStatus.textContent = data.HardwarePartStatus || "";
                    findAWBNumber.textContent = data.AWBNumber || "";
                    findMONumber.textContent = data.MONumber || "";
                    findHPOrderNumber.textContent = data.HPOrderNumber || "";
                    findRMANumber.textContent = data.RMANumber || "";
                    findDateArrived.textContent = data.DateArrived || "";
                    findDateCollected.textContent = data.DateCollected || "";

                    resultsTable.style.display = 'table';
                } else {
                    alert("Data Not Found!");
                    resultsTable.style.display = 'none';
                    location.reload(true); // true parameter forces reloading from the server instead of cache
                }
            })
            .catch((error) => {
                alert(error);
                resultsTable.style.display = 'none';
            });
    }

    findBtn.addEventListener('click', FindData);
});
