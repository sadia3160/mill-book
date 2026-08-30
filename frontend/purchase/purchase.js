import BASE_URL from "../config.js";

const formDiv = document.querySelector(".purchase-form-container");

const formBtn = document.querySelector("#new-purchase");
const submit = document.querySelector("#add-btn");
const close = document.querySelector("#clear-btn");

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
    return d.toLocaleDateString('en-GB'); //english-great britain
}

//read
const displyPurchases = async () => {
        const res = await fetch(`${BASE_URL}/api/v1/purchases/get-purchases`);
        const purchases = await res.json();

        purchaseTable.innerHTML="";

        purchases.forEach((purchase,index)=>{
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${purchase.purchaseID}</td>
                <td>${formatDate(purchase.purchaseDate)}</td>
                <td>${purchase.purchaseDescription}</td>
                <td>${purchase.purchaseRiceType}</td>
                <td>${purchase.purchaseQuantity}</td>
                <td>${purchase.purchaseUnitPrice}</td>
                <td>${purchase.purchaseTotalCost}</td>
                <td>${purchase.purchaseSupplierID}</td>
                <td>${purchase.purchaseOnAccount}</td>
                <td>${purchase.purchasePaidAmount}</td>
                <td>${purchase.purchaseDueAmount}</td>
            
                <td>
                    <div id="button-actions">
                        <button class="btn-action">Edit</button>
                        <button class="btn-action">Delete</button>
                    </div>
                </td>
            `;

            const edit = row.querySelector("#btn-edit");
            const del = row.querySelector("#btn-del");

            /*
            save.addEventListener('click', ()=>{

            });

            edit.addEventListener('click', ()=>{

            });

            del.addEventListener('click', ()=>{

            });
            */
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
            displyPurchases();

        } else{
            formMsg.style.color = "red";
        }
    }
    catch(err){
        formMsg.innerText =  "Can't Create New Purchase Now. Try again!"
        formMsg.style.color = "red";
    }
});

//update
//delete



displyPurchases();
