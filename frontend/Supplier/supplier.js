import BASE_URL from "../config.js";

const formDiv = document.querySelector(".form-container");

const formBtn = document.querySelector("#new-supplier");
const submit = document.querySelector("#formBtn-submit");
const close = document.querySelector("#close");

const supplierTable = document.querySelector("#supplierTable");
const supplierForm = document.querySelector("#supplierForm");
const formMsg = document.querySelector("#supplier-form-msg");

const supplierID = document.getElementById("supplierID");
const supplierName = document.getElementById("supplierName");
const supplierPhone = document.getElementById("supplierPhone");
const supplierTotal = document.getElementById("total");
const paidAmount = document.getElementById("paidAmount");
const dueAmount = document.getElementById("dueAmount");



//new supplier button code 

formBtn.addEventListener("click", () => {
    formDiv.style.display = 'block';
});

submit.addEventListener("click", () => {
    if(!supplierID.value || !supplierName.value || !supplierPhone.value || !supplierTotal.value || !paidAmount.value || !dueAmount.value){
        formMsg.innerText = "Enter all information";
            formMsg.style.color = "red";
    }
});

close.addEventListener("click", () => {
    formDiv.style.display = 'none';
});

//table code :  post, read, put, delete 

//read
const displySuppliers = async () => {
        const res = await fetch(`${BASE_URL}/api/v1/suppliers/get-suppliers`);
        const suppliers = await res.json();

        supplierTable.innerHTML="";

        suppliers.forEach((suppliers,index)=>{
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${suppliers.supplierID}</td>
                <td>${suppliers.supplierName}</td>
                <td>${suppliers.supplierPhone}</td>
                <td>${suppliers.supplierTotal}</td>
                <td>${suppliers.paidAmount}</td>
                <td>${suppliers.dueAmount}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            `;
            supplierTable.appendChild(row);
        });
};

//write
supplierForm.addEventListener('submit', async (event)=>{
    event.preventDefault();

    const supplierID = document.getElementById("supplierID").value;
    const supplierName = document.getElementById("supplierName").value;
    const supplierPhone = document.getElementById("supplierPhone").value;
    const supplierTotal = document.getElementById("total").value;
    const paidAmount = document.getElementById("paidAmount").value;
    const dueAmount = document.getElementById("dueAmount").value;

    if(!supplierID || !supplierName || !supplierPhone || !supplierTotal || !paidAmount || !dueAmount){
        formMsg.innerText = "Enter all information";
        formMsg.style.color = "red";
        return;
    }

    try{
        const res = await fetch(`${BASE_URL}/api/v1/suppliers/create-supplier`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                supplierID, 
                supplierName,
                supplierPhone, 
                supplierTotal, 
                paidAmount, 
                dueAmount
            })
        });

        const data = await res.json();
        formMsg .innerText = data.message;
        
        if(res.ok){
            formMsg .style.color = "green";
            supplierForm.reset();
            displySuppliers();

        } else{
            formMsg .style.color = "red";
        }
    }
    catch(err){
        formMsg .innerText =  "Can't Create New Supplier Now. Try again!"
        formMsg .style.color = "red";
    }

});

//update
//delete



displySuppliers();