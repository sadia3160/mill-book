const API = "http://localhost:5000/api/sellers";

const form = document.getElementById("sellerForm");

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("pricePerKg").value);
    const paid = Number(document.getElementById("paidAmount").value);

    const total = quantity * price;
    const due = total - paid;

    const seller = {

        sellerName: sellerName.value,
        phone: phone.value,
        address: address.value,
        riceType: riceType.value,
        quantity: quantity,
        pricePerKg: price,
        totalAmount: total,
        paidAmount: paid,
        dueAmount: due,
        date: date.value

    };

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(seller)
    });

    form.reset();

    loadSellers();

});

async function loadSellers(){

    const response = await fetch(API);
    const sellers = await response.json();

    const table = document.getElementById("sellerTable");

    table.innerHTML="";

    sellers.forEach((seller)=>{

        table.innerHTML +=`

        <tr>

        <td>${seller.sellerName}</td>

        <td>${seller.phone}</td>

        <td>${seller.riceType}</td>

        <td>${seller.totalAmount}</td>

        <td>${seller.paidAmount}</td>

        <td>${seller.dueAmount}</td>

        <td>

        <button class="deleteBtn"
        onclick="deleteSeller('${seller._id}')">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

async function deleteSeller(id){

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadSellers();

}

loadSellers();