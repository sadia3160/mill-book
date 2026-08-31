import BASE_URL from "../config.js";

const formDiv = document.querySelector(".purchase-form-container");

const formBtn = document.querySelector("#new-purchase");
const submit = document.querySelector("#add-btn");
const close = document.querySelector("#clear-btn");

const searchForm = document.querySelector("#purchase-seach-box");
const pid = document.querySelector("#purchase-id-input");

//button action

formBtn.addEventListener("click", () => {
    formDiv.style.display = 'block';
});

submit.addEventListener("click", () => {
    const purchaseID  = document.getElementById("pid").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const purchaseDescription = document.getElementById("purchaseDescription").value;
    const purchaseRiceType  = document.getElementById("purchaseRiceType").value;
    const purchaseQuantity= document.getElementById("purchaseQuantity").value;
    const purchaseUnitPrice = document.getElementById("purchaseUnitPrice").value;
    const purchaseTotalCost  = document.getElementById("purchaseTotalCost").value;
    const purchaseSupplierID = document.getElementById("purchaseSupplierID").value;
    const purchaseOnAccount = document.getElementById("purchaseOnAccount").value;
    const purchasePaidAmount = document.getElementById("purchasePaidAmount").value;
    const purchaseDueAmount= document.getElementById("purchaseDueAmount").value;

    if(!purchaseID || !purchaseDate  || !purchaseDescription || !purchaseRiceType || !purchaseQuantity 
         || !purchaseUnitPrice || !purchaseTotalCost || !purchaseSupplierID  || !purchaseOnAccount || !purchasePaidAmount || !purchaseDueAmount){
        formMsg.innerText = "Enter all information";
        formMsg.style.color = "red";
    }
});

close.addEventListener("click", () => {
    formDiv.style.display = 'none';
});

//table actions :  post, read, put, delete 

const purchaseTable = document.querySelector("#purchaseTable");
const purchaseForm = document.querySelector("#purchaseForm");
const formMsg = document.querySelector("#purchase-form-msg"); //

const formatDate = (currentDateString) =>{
    const d = new Date(currentDateString);
    return d.toLocaleDateString('sv-SE'); //swedish
}

//read
const displayPurchases = async (pID=undefined) => {
        const url = pID ? `${BASE_URL}/api/v1/purchases/get-purchases?purchaseID=${pID}` : `${BASE_URL}/api/v1/purchases/get-purchases`;
        const res = await fetch(url);
        const purchases = await res.json();

        purchaseTable.innerHTML="";

        purchases.forEach((purchase,index)=>{
            const row = document.createElement('tr');
            row.dataset.id = purchase._id; //
            row.innerHTML = `
                <td class="label-purchaseID">${purchase.purchaseID}</td>
                <td class="label-purchaseDate">${formatDate(purchase.purchaseDate)}</td>
                <td class="label-purchaseDescription">${purchase.purchaseDescription}</td>
                <td class="label-purchaseRiceType">${purchase.purchaseRiceType}</td>
                <td class="label-purchaseQuantity">${purchase.purchaseQuantity}</td>
                <td class="label-purchaseUnitPrice">${purchase.purchaseUnitPrice}</td>
                <td class="label-purchaseTotalCost">${purchase.purchaseTotalCost}</td>
                <td class="label-purchaseSupplierID">${purchase.purchaseSupplierID}</td>
                <td class="label-purchaseOnAccount">${purchase.purchaseOnAccount}</td>
                <td class="label-purchasePaidAmount">${purchase.purchasePaidAmount}</td>
                <td class="label-purchaseDueAmount">${purchase.purchaseDueAmount}</td>
            
                <td>
                    <div id="button-actions">
                        <button class="btn-action btn-edit">Edit</button>
                        <button class="btn-action btn-save">Save</button>
                        <button class="btn-action btn-del">Delete</button>
                    </div>
                </td>
            `;

            purchaseTable.appendChild(row);
        });
};

//write
purchaseForm.addEventListener('submit', async (event)=>{
    event.preventDefault(); //stops page from refreshing

    const purchaseID  = document.getElementById("pid").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const purchaseDescription = document.getElementById("purchaseDescription").value;
    const purchaseRiceType  = document.getElementById("purchaseRiceType").value;
    const purchaseQuantity= document.getElementById("purchaseQuantity").value;
    const purchaseUnitPrice = document.getElementById("purchaseUnitPrice").value;
    const purchaseTotalCost  = document.getElementById("purchaseTotalCost").value;
    const purchaseSupplierID = document.getElementById("purchaseSupplierID").value;
    const purchaseOnAccount = document.getElementById("purchaseOnAccount").value;
    const purchasePaidAmount = document.getElementById("purchasePaidAmount").value;
    const purchaseDueAmount= document.getElementById("purchaseDueAmount").value;

    if(!purchaseID || !purchaseDate  || !purchaseDescription || !purchaseRiceType || !purchaseQuantity 
         || !purchaseUnitPrice || !purchaseTotalCost || !purchaseSupplierID  || !purchaseOnAccount || !purchasePaidAmount || !purchaseDueAmount){
        formMsg.innerText = "Enter all information";
        formMsg.style.color = "red";
        return;
    }

    try{
        const res = await fetch(`${BASE_URL}/api/v1/purchases/create-purchase`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                purchaseID,
                purchaseDate,
                purchaseDescription,
                purchaseRiceType,
                purchaseQuantity,
                purchaseUnitPrice,
                purchaseTotalCost,
                purchaseSupplierID,
                purchaseOnAccount,
                purchasePaidAmount,
                purchaseDueAmount 
            })
        });

        const data = await res.json();
        formMsg.innerText = data.message;
        
        if(res.ok){
            formMsg .style.color = "green";
            purchaseForm.reset();
            displayPurchases();

        } else{
            formMsg.style.color = "red";
        }
    }
    catch(err){
        formMsg.innerText =  "Can't Create New Purchase Now. Try again!"
        formMsg.style.color = "red";
    }
});

//
purchaseTable.addEventListener(('click'), async (event)=>{

    const target = event.target;
    const row = target.closest('tr');

    if(!row){
        return;
    }

    const id = row.dataset.id;

    //save  
    if(target.classList.contains('btn-save')){

        const purchaseID = row.querySelector(".input-purchaseID").value;
        const purchaseDate = row.querySelector(".input-purchaseDate").value;
        const purchaseDescription = row.querySelector(".input-purchaseDescription").value;
        const purchaseRiceType = row.querySelector(".input-purchaseRiceType").value;
        const purchaseQuantity = row.querySelector(".input-purchaseQuantity").value;
        const purchaseUnitPrice = row.querySelector(".input-purchaseUnitPrice").value;

        const purchaseTotalCost = row.querySelector(".input-purchaseTotalCost").value;
        const purchaseSupplierID = row.querySelector(".input-purchaseSupplierID").value;
        const purchaseOnAccount = row.querySelector(".input-purchaseOnAccount").value;
        const purchasePaidAmount = row.querySelector(".input-purchasePaidAmount").value;
        const purchaseDueAmount = row.querySelector(".input-purchaseDueAmount").value;

        if(!id){ 
            //error message
            alert("No supplier found!");
        }
        else { 
            //edit code save [put] goes here
            try{
                const res = await fetch(`${BASE_URL}/api/v1/purchases/edit-purchase/${id}`, { //edit api
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        purchaseID,
                        purchaseDate,
                        purchaseDescription,
                        purchaseRiceType,
                        purchaseQuantity,
                        purchaseUnitPrice,
                        purchaseTotalCost,
                        purchaseSupplierID,
                        purchaseOnAccount,
                        purchasePaidAmount,
                        purchaseDueAmount 
                    })
                });

                if(res.ok){
                    displayPurchases();
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
           const res = await fetch(`${BASE_URL}/api/v1/purchases/delete-purchase/${id}`, { method: 'DELETE' });
        
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

    const label_purchaseID  = row.querySelector(".label-purchaseID");
    const label_purchaseDate = row.querySelector(".label-purchaseDate");
    const label_purchaseDescription = row.querySelector(".label-purchaseDescription");
    const label_purchaseRiceType = row.querySelector(".label-purchaseRiceType");
    const label_purchaseQuantity = row.querySelector(".label-purchaseQuantity");
    const label_purchaseUnitPrice = row.querySelector(".label-purchaseUnitPrice");

    const label_purchaseTotalCost = row.querySelector(".label-purchaseTotalCost");
    const label_purchaseSupplierID = row.querySelector(".label-purchaseSupplierID");
    const label_purchaseOnAccount = row.querySelector(".label-purchaseOnAccount");
    const label_purchasePaidAmount = row.querySelector(".label-purchasePaidAmount");
    const label_purchaseDueAmount = row.querySelector(".label-purchaseDueAmount");

    if(mode){

        label_purchaseID.innerHTML = `<input type="number" class="input-purchaseID" value="${label_purchaseID.textContent.trim()}">`;
        label_purchaseDate.innerHTML = `<input type="date" class="input-purchaseDate" value="${label_purchaseDate.textContent.trim()}">`;
        label_purchaseDescription.innerHTML = `<input type="text" class="input-purchaseDescription" value="${label_purchaseDescription.textContent.trim()}">`;
        label_purchaseRiceType.innerHTML = `<input type="text" class="input-purchaseRiceType" value="${label_purchaseRiceType.textContent.trim()}">`;
        label_purchaseQuantity.innerHTML = `<input type="number" class="input-purchaseQuantity" value="${label_purchaseQuantity.textContent.trim()}">`;
        label_purchaseUnitPrice.innerHTML = `<input type="number" class="input-purchaseUnitPrice" value="${label_purchaseUnitPrice.textContent.trim()}">`;

        label_purchaseTotalCost.innerHTML = `<input type="number" class="input-purchaseTotalCost" value="${label_purchaseTotalCost.textContent.trim()}">`;
        label_purchaseSupplierID.innerHTML = `<input type="number" class="input-purchaseSupplierID" value="${label_purchaseSupplierID.textContent.trim()}">`;
        label_purchaseOnAccount.innerHTML = `<input type="text" class="input-purchaseOnAccount" value="${label_purchaseOnAccount.textContent.trim()}">`;
        label_purchasePaidAmount.innerHTML = `<input type="number" class="input-purchasePaidAmount" value="${label_purchasePaidAmount.textContent.trim()}">`;
        label_purchaseDueAmount.innerHTML = `<input type="number" class="input-purchaseDueAmount" value="${label_purchaseDueAmount.textContent.trim()}">`;

    }
};  

 
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const pID = pid.value;
    if(!pID){
        alert("Enter purchase ID");
        return;
    }
    displayPurchases(pID);
});

displayPurchases(undefined);
