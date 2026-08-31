import BASE_URL from "../config.js";

const newSales= document.querySelector("#new-sales");
const salesTable = document.querySelector("#salesTable");

const dueBtn = document.querySelector("#new-due");

const formatDate = (currentDateString) =>{
    const d = new Date(currentDateString);
    return d.toLocaleDateString('sv-SE'); //swedish
}


//read milling record

const displaySales = async (due = false) => {
    const url = due ? `${BASE_URL}/api/v1/sales/get-sales?due=true` : `${BASE_URL}/api/v1/sales/get-sales`;
    const res = await fetch(url);
    const sales = await res.json();

    salesTable.innerHTML="";
    sales.forEach((sales, index)=>{
        const row = document.createElement('tr');
        row.dataset.id = sales._id; //get sales doc so ._id is not formatted as id
        row.innerHTML = `
            <td class="label-productName">${sales.productName}</td>
            <td class="label-salesDate">${formatDate(sales.salesDate)}</td> 
            <td class="label-customerInfo">${sales.customerInfo}</td>
            <td class="label-paidSales">${sales.paidSales}</td>
            <td class="label-dueSales">${sales.dueSales}</td>
            <td class="label-salesTotal">${sales.salesTotal}</td>
            <td>
                <div id="button-actions">
                    <button class="btn-action btn-edit">Edit</button>
                    <button class="btn-action btn-save">Save</button>
                    <button class="btn-action btn-del">Delete</button>
                </div>
            </td>
        `;
        salesTable.appendChild(row);
    });
}


//add new row
newSales.addEventListener('click', ()=>{
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="text" class="input-productName"></td>
        <td><input type="date" class="input-salesDate"></td>
        <td><input type="text" class="input-customerInfo"></td>
        <td><input type="number" class="input-paidSales"></td>
        <td><input type="number" class="input-dueSales"></td>
        <td><input type="number" class="input-salesTotal"></td>
        <td>
            <div id="button-actions">
                <button class="btn-action btn-save">Save</button>
                <button class="btn-action btn-edit">Edit</button>
                <button class="btn-action btn-del">Delete</button>
            </div>
        </td>
    `;

    salesTable.prepend(row);
});


//
salesTable.addEventListener(('click'), async (event)=>{

    const target = event.target;
    const row = target.closest('tr');

    if(!row){
        return;
    }

    const id = row.dataset.id;

    //save  
    if(target.classList.contains('btn-save')){

        const productName = row.querySelector(".input-productName").value;
        const salesDate = row.querySelector(".input-salesDate").value;
        const customerInfo = row.querySelector(".input-customerInfo").value;
        const paidSales  = row.querySelector(".input-paidSales").value;
        const dueSales = row.querySelector(".input-dueSales").value;
        const salesTotal = row.querySelector(".input-salesTotal").value;

        if(!id){ //newsave
           const res = await fetch(`${BASE_URL}/api/v1/sales/create-sales`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productName,
                salesDate,
                customerInfo,
                paidSales,
                dueSales,
                salesTotal})
            });
            if(res.ok){
                displaySales();
            } else {
                alert("Can't save now, Try again later");
            }
        } else { 
            //edit code save [put] goes here
            try{
                const res = await fetch(`${BASE_URL}/api/v1/sales/edit-sales/${id}`, { //edit api
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    productName,
                    salesDate,
                    customerInfo,
                    paidSales,
                    dueSales,
                    salesTotal
                })
                });
                if(res.ok){
                    displaySales();
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
           const res = await fetch(`${BASE_URL}/api/v1/sales/delete-sales/${id}`, { method: 'DELETE' });
        
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

    const label_productName = row.querySelector(".label-productName");
    const label_salesDate = row.querySelector(".label-salesDate");
    const label_customerInfo = row.querySelector(".label-customerInfo");
    const label_paidSales = row.querySelector(".label-paidSales");
    const label_dueSales = row.querySelector(".label-dueSales");
    const label_salesTotal = row.querySelector(".label-salesTotal");

    if(mode){

        label_productName.innerHTML = `<input type="text" class="input-productName" value="${label_productName.textContent.trim()}">`;
        label_salesDate.innerHTML = `<input type="date" class="input-salesDate" value="${label_salesDate.textContent.trim()}">`; //////
        label_customerInfo.innerHTML = `<input type="text" class="input-customerInfo" value="${label_customerInfo.textContent.trim()}">`;
        label_paidSales.innerHTML = `<input type="number" class="input-paidSales" value="${label_paidSales.textContent.trim()}">`;
        label_dueSales.innerHTML = `<input type="number" class="input-dueSales" value="${label_dueSales.textContent.trim()}">`;
        label_salesTotal.innerHTML = `<input type="number" class="input-salesTotal" value="${label_salesTotal.textContent.trim()}">`;

    }
}; 

//search due sales
dueBtn.addEventListener('click', ()=>{
    displaySales(true);
});


displaySales();


