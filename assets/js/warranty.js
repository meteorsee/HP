import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
    const enterReferenceNo = document.querySelector("#enterReferenceNo");
    const enterSupplierName = document.querySelector("#enterSupplierName");
    const enterWarrantyItem = document.querySelector("#enterWarrantyItem");
    const enterSerialNo = document.querySelector("#enterSerialNo");
    const enterGoodsTakenByDate = document.querySelector("#enterGoodsTakenByDate");
    const enterGoodsTakenByName = document.querySelector("#enterGoodsTakenByName");
    const enterGoodsReceivedCondition = document.querySelector("#enterGoodsReceivedCondition");
    const enterGoodsReceivedDate = document.querySelector("#enterGoodsReceivedDate");
    const enterGoodsReceivedByName = document.querySelector("#enterGoodsReceivedByName");
    const enterGoodsBelongToCustomerName = document.querySelector("#enterGoodsBelongToCustomerName");
    const enterGoodsBelongToCustomerTel = document.querySelector("#enterGoodsBelongToCustomerTel");

    const insertBtn = document.querySelector("#insert");

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
            enterReferenceNo, enterSupplierName, enterWarrantyItem, enterSerialNo,
            enterGoodsTakenByDate, enterGoodsTakenByName, enterGoodsReceivedCondition,
            enterGoodsReceivedDate, enterGoodsReceivedByName, enterGoodsBelongToCustomerName, enterGoodsBelongToCustomerTel
        )) return;

        set(ref(db, "WarrantyData/" + enterReferenceNo.value), {
            ReferenceNo: enterReferenceNo.value,
            SupplierName: enterSupplierName.value,
            WarrantyItem: enterWarrantyItem.value,
            SerialNo: enterSerialNo.value,
            GoodsTakenByDate: enterGoodsTakenByDate.value,
            GoodsTakenByName: enterGoodsTakenByName.value,
            GoodsReceivedCondition: enterGoodsReceivedCondition.value,
            GoodsReceivedDate: enterGoodsReceivedDate.value,
            GoodsReceivedByName: enterGoodsReceivedByName.value,
            GoodsBelongToCustomerName: enterGoodsBelongToCustomerName.value,
            GoodsBelongToCustomerTel: enterGoodsBelongToCustomerTel.value
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
