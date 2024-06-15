import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
    const updateCaseIDInput = document.querySelector("#updateCaseIDInput");
    const enterWorkID = document.querySelector("#enterWorkID");
    const enterTechnician = document.querySelector("#enterTechnician");
    const enterHandler = document.querySelector("#enterHandler");
    const enterHardwarePartNumber = document.querySelector("#enterHardwarePartNumber");
    const enterHardwarePartStatus = document.querySelector("#enterHardwarePartStatus");
    const enterAWBNumber = document.querySelector("#enterAWBNumber");
    const enterMONumber = document.querySelector("#enterMONumber");
    const enterHPOrderNumber = document.querySelector("#enterHPOrderNumber");
    const enterRMANumber = document.querySelector("#enterRMANumber");
    const enterDateArrived = document.querySelector("#enterDateArrived");
    const enterDateCollected = document.querySelector("#enterDateCollected");
    const updateBtn = document.querySelector("#updateBtn");
    const removeBtn = document.querySelector("#removeBtn");
    const formContainer = document.querySelector("#formContainer");

    function FindData() {
        if (!updateCaseIDInput.value) {
            alert("Please enter a Case ID");
            location.reload(true); // true parameter forces reloading from the server instead of cache
            return;
        }
        const dbref = ref(db);

        get(child(dbref, "Data/" + updateCaseIDInput.value))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    enterWorkID.value = data.WorkID || "";
                    enterTechnician.value = data.TechnicianName || "";
                    enterHandler.value = data.HandlerName || "";
                    enterHardwarePartNumber.value = data.HardwarePartNumber || "";
                    enterHardwarePartStatus.value = data.HardwarePartStatus || "";
                    enterAWBNumber.value = data.AWBNumber || "";
                    enterMONumber.value = data.MONumber || "";
                    enterHPOrderNumber.value = data.HPOrderNumber || "";
                    enterRMANumber.value = data.RMANumber || "";
                    enterDateArrived.value = data.DateArrived || "";
                    enterDateCollected.value = data.DateCollected || "";
                    formContainer.style.display = "block";
                } else {
                    alert("Data Not Found!");
                    location.reload(true); // true parameter forces reloading from the server instead of cache
                }
            })
            .catch((error) => {
                alert(error);
                location.reload(true); // true parameter forces reloading from the server instead of cache
            });
    }

    function UpdateData() {
        if (confirm("Are you sure you want to update this data?")) {
            const dbref = ref(db);

            update(child(dbref, "Data/" + updateCaseIDInput.value), {
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
                alert("Data updated successfully");
                location.reload(true); // true parameter forces reloading from the server instead of cache
            })
            .catch((error) => {
                alert(error);
            });
        }
    }

    function RemoveData() {
        if (confirm("Are you sure you want to delete this data?")) {
            const dbref = ref(db);

            remove(child(dbref, "Data/" + updateCaseIDInput.value))
                .then(() => {
                    alert("Data deleted successfully");
                    clearFormFields();
                    location.reload(true); // true parameter forces reloading from the server instead of cache
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }

    function clearFormFields() {
        enterWorkID.value = "";
        enterTechnician.value = "";
        enterHandler.value = "";
        enterHardwarePartNumber.value = "";
        enterHardwarePartStatus.value = "";
        enterAWBNumber.value = "";
        enterMONumber.value = "";
        enterHPOrderNumber.value = "";
        enterRMANumber.value = "";
        enterDateArrived.value = "";
        enterDateCollected.value = "";
    }

    const findBtn = document.querySelector("#findBtn");
    findBtn.addEventListener('click', FindData);

    updateBtn.addEventListener('click', UpdateData);
    removeBtn.addEventListener('click', RemoveData);
});
