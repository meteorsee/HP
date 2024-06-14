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
    var updateCaseIDInput = document.querySelector("#updateCaseIDInput");
    var enterWorkID = document.querySelector("#enterWorkID");
    var enterReferenceNumber = document.querySelector("#enterReferenceNumber");
    var enterTechnician = document.querySelector("#enterTechnician");
    var enterHandler = document.querySelector("#enterHandler");
    var enterHardwareParts = document.querySelector("#enterHardwareParts");
    var enterHardwarePartNumber = document.querySelector("#enterHardwarePartNumber");
    var enterHardwarePartStatus = document.querySelector("#enterHardwarePartStatus");
    var enterAWBNumber = document.querySelector("#enterAWBNumber");
    var enterMONumber = document.querySelector("#enterMONumber");
    var enterSONumber = document.querySelector("#enterSONumber");
    var enterRMANumber = document.querySelector("#enterRMANumber");
    var enterDateArrived = document.querySelector("#enterDateArrived");
    var enterDateCollected = document.querySelector("#enterDateCollected");
    var updateBtn = document.querySelector("#updateBtn");
    var removeBtn = document.querySelector("#removeBtn");
    var formContainer = document.querySelector("#formContainer");

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
                    enterReferenceNumber.value = data.ReferenceNumber || "";
                    enterTechnician.value = data.TechnicianName || "";
                    enterHandler.value = data.HandlerName || "";
                    enterHardwareParts.value = data.HardwareParts || "";
                    enterHardwarePartNumber.value = data.HardwarePartNumber || "";
                    enterHardwarePartStatus.value = data.HardwarePartStatus || "";
                    enterAWBNumber.value = data.AWBNumber || "";
                    enterMONumber.value = data.MONumber || "";
                    enterSONumber.value = data.SONumber || "";
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
        const dbref = ref(db);

        update(child(dbref, "Data/" + updateCaseIDInput.value), {
            WorkID: enterWorkID.value,
            ReferenceNumber: enterReferenceNumber.value,
            TechnicianName: enterTechnician.value,
            HandlerName: enterHandler.value,
            HardwareParts: enterHardwareParts.value,
            HardwarePartNumber: enterHardwarePartNumber.value,
            HardwarePartStatus: enterHardwarePartStatus.value,
            AWBNumber: enterAWBNumber.value,
            MONumber: enterMONumber.value,
            SONumber: enterSONumber.value,
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

    function RemoveData() {
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

    function clearFormFields() {
        enterWorkID.value = "";
        enterReferenceNumber.value = "";
        enterTechnician.value = "";
        enterHandler.value = "";
        enterHardwareParts.value = "";
        enterHardwarePartNumber.value = "";
        enterHardwarePartStatus.value = "";
        enterAWBNumber.value = "";
        enterMONumber.value = "";
        enterSONumber.value = "";
        enterRMANumber.value = "";
        enterDateArrived.value = "";
        enterDateCollected.value = "";
    }

    var findBtn = document.querySelector("#findBtn");
    findBtn.addEventListener('click', FindData);

    updateBtn.addEventListener('click', UpdateData);
    removeBtn.addEventListener('click', RemoveData);
});
