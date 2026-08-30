import BASE_URL from "../config.js";

const newMilling = document.querySelector("#new-milling");
const millingTable = document.querySelector("#millingTable");


//read milling record

const displayMilling = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/milling/get-milling`);
    const milling = await res.json();

    millingTable.innerHTML="";
    milling.forEach((milling, index)=>{
        const row = document.createElement('tr');
        row.dataset.id = milling.id; //
        row.innerHTML = `
            <td class="label-purchaseID">${milling.purchaseID}</td>
            <td class="label-millingCondition">${milling.millingCondition}</td>
            <td class="label-paddyQuantity">${milling.paddyQuantity}</td>
            <td class="label-remainingPaddy">${milling.remainingPaddy}</td>
            <td class="label-riceQuantity">${milling.riceQuantity}</td>
            <td class="label-byProducts">${milling.byProducts}</td>
            <td>
                <div id="button-actions">
                    <button class="btn-action btn-save">Save</button>
                    <button class="btn-action btn-edit">Edit</button>
                    <button class="btn-action btn-del">Delete</button>
                </div>
            </td>
        `;
        millingTable.appendChild(row);
    });
}


//add new row
newMilling.addEventListener('click', ()=>{
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="number" class="input-purchaseID"></td>
        <td><input type="text" class="input-millingCondition"></td>
        <td><input type="number" class="input-paddyQuantity"></td>
        <td><input type="number" class="input-remainingPaddy"></td>
        <td><input type="number" class="input-riceQuantity"></td>
        <td><input type="text" class="input-byProducts"></td>
        <td>
            <div id="button-actions">
                <button class="btn-action btn-save">Save</button>
                <button class="btn-action btn-edit">Edit</button>
                <button class="btn-action btn-del">Delete</button>
            </div>
        </td>
    `;

    millingTable.prepend(row);
});


//
millingTable.addEventListener(('click'), async (event)=>{

    const target = event.target;
    const row = target.closest('tr');

    if(!row){
        return;
    }

    const id = row.dataset.id;

    //save  
    if(target.classList.contains('btn-save')){

        const purchaseID = row.querySelector(".input-purchaseID").value;
        const millingCondition = row.querySelector(".input-millingCondition").value;
        const paddyQuantity = row.querySelector(".input-paddyQuantity").value;
        const remainingPaddy = row.querySelector(".input-remainingPaddy").value;
        const riceQuantity = row.querySelector(".input-riceQuantity ").value;
        const byProducts = row.querySelector(".input-byProducts").value;

        if(!id){ //newsave
           const res = await fetch(`${BASE_URL}/api/v1/milling/create-milling`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({purchaseID,millingCondition,paddyQuantity,remainingPaddy,riceQuantity,byProducts})
            });
            if(res.ok){
                displayMilling();
            } else {
                alert("Can't save now, Try again later");
            }
        } else { 
            //edit code save [put] goes here
        }
    }

    //edit button code
    if(target.classList.contains('btn-edit')){

    }

    //del button code
    if(target.classList.contains('btn-del')){

    }

});

displayMilling();
