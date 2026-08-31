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


const searchForm = document.querySelector("#supplier-search-box");
const sid = document.querySelector("#supplier-id-input");

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
const displySuppliers = async (sID=undefined) => {
        const url = sID ? `${BASE_URL}/api/v1/suppliers/get-suppliers?supplierID=${sID}` : `${BASE_URL}/api/v1/suppliers/get-suppliers`;
        const res = await fetch(url);
        const suppliers = await res.json();

        supplierTable.innerHTML="";

        suppliers.forEach((suppliers,index)=>{
            const row = document.createElement('tr');
            row.dataset.id = suppliers._id;
            row.innerHTML = `
                <td class="label-supplierID">${suppliers.supplierID}</td>
                <td class="label-supplierName">${suppliers.supplierName}</td>
                <td class="label-supplierPhone">${suppliers.supplierPhone}</td>
                <td class="label-supplierTotal">${suppliers.supplierTotal}</td>
                <td class="label-paidAmount">${suppliers.paidAmount}</td>
                <td class="label-dueAmount">${suppliers.dueAmount}</td>
                <td>
                    <div id="button-actions">
                        <button class="btn-action btn-edit">Edit</button>
                        <button class="btn-action btn-save">Save</button>
                        <button class="btn-action btn-del">Delete</button>
                    </div>
                </td>
            `;

            supplierTable.appendChild(row);
        });
};

//add new supplier
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
        formMsg.innerText = data.message;
        
        if(res.ok){
            formMsg.style.color = "green";
            supplierForm.reset();
            displySuppliers();

        } else{
            formMsg.style.color = "red";
        }
    }
    catch(err){
        formMsg.innerText =  "Can't Create New Supplier Now. Try again!"
        formMsg.style.color = "red";
    }

});

//

supplierTable.addEventListener(('click'), async (event)=>{

    const target = event.target;
    const row = target.closest('tr');

    if(!row){
        return;
    }

    const id = row.dataset.id;

    //save  
    if(target.classList.contains('btn-save')){

        const supplierID = row.querySelector(".input-supplierID").value;
        const supplierName = row.querySelector(".input-supplierName").value;
        const supplierPhone = row.querySelector(".input-supplierPhone").value;
        const supplierTotal = row.querySelector(".input-supplierTotal").value;
        const paidAmount = row.querySelector(".input-paidAmount").value;
        const dueAmount = row.querySelector(".input-dueAmount").value;

        if(!id){ 
            //error message
            alert("No supplier found!");
        }
        else { 
            //edit code save [put] goes here
            try{
                const res = await fetch(`${BASE_URL}/api/v1/suppliers/edit-supplier/${id}`, { //edit api
                    method: 'PUT',
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

                if(res.ok){
                    displySuppliers();
                } else {
                    alert("Can't save now, Try again later");
                }
            } catch(err){
                //error message
                alert("Can't save now, Try again later");
            }
        }
    }

    //edit button code
    if(target.classList.contains('btn-edit')){
        rowEditMode(row, true);
    }

    //del button code
    if(target.classList.contains('btn-del')){
        try{
           const res = await fetch(`${BASE_URL}/api/v1/suppliers/delete-supplier/${id}`, { method: 'DELETE' });
        
            if(res.ok){
                row.remove();
            } else {
                alert("Can't delete now, try again later");
            }
        }
        catch(err){
            alert("Can't delete now, try again later");
        }
    }

});

const rowEditMode = (row, mode) => {

    const label_supplierID  = row.querySelector(".label-supplierID");
    const label_supplierName = row.querySelector(".label-supplierName");
    const label_supplierPhone = row.querySelector(".label-supplierPhone");
    const label_supplierTotal = row.querySelector(".label-supplierTotal");
    const label_paidAmount = row.querySelector(".label-paidAmount");
    const label_dueAmount = row.querySelector(".label-dueAmount");

    if(mode){

        label_supplierID.innerHTML = `<input type="number" class="input-supplierID" value="${label_supplierID.textContent.trim()}">`;
        label_supplierName.innerHTML = `<input type="text" class="input-supplierName" value="${label_supplierName.textContent.trim()}">`;
        label_supplierPhone.innerHTML = `<input type="number" class="input-supplierPhone" value="${label_supplierPhone.textContent.trim()}">`;
        label_supplierTotal.innerHTML = `<input type="number" class="input-supplierTotal" value="${label_supplierTotal.textContent.trim()}">`;
        label_paidAmount.innerHTML = `<input type="number" class="input-paidAmount" value="${label_paidAmount.textContent.trim()}">`;
        label_dueAmount.innerHTML = `<input type="number" class="input-dueAmount" value="${label_dueAmount.textContent.trim()}">`;

    }
};  

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const sID = sid.value;
    if(!sID){
        alert("Enter supplier ID");
        return;
    }
    displySuppliers(sID);
});

displySuppliers(undefined);


                        
                         
                         
                       