import BASE_URL from "../config.js";

const reportForm = document.querySelector("#reportForm");
const dayIp = document.querySelector("#day-report");
const monthIp = document.querySelector("#month-report");
const yearIp = document.querySelector("#year-report");
const range = document.querySelector("#range");
const reportTable = document.querySelector("#reportTable");


const displayReport = ((purchaseSummary, salesSummary)=> {

    reportTable.innerHTML="";
    const row = document.createElement('tr');
            
    row.innerHTML = `
        <td>${purchaseSummary.totalPaidPurchase}</td>
        <td>${purchaseSummary.totalDuePurchase}</td>
        <td>${salesSummary.totalPaidSales}</td>
        <td>${salesSummary.totalDueSales}</td>
    `;
    reportTable.appendChild(row);
});



reportForm.addEventListener('submit', async (event)=>{
    event.preventDefault();

    const day = dayIp.value;
    const month = monthIp.value;
    const year = yearIp.value;

    if(!yearIp) { alert("Year required!"); return; }
    else if(day>0 && month===0) { alert("Month required!"); return; }
    else if((day>=0 && month>=0 && year>=2000)){

        range.textContent = `REPORT: ${day}/${month}/${year}`;
        //fetch puchase and sales summary
        const query = `day=${day}&month=${month}&year=${year}`;

        try{
            const [purchaseRes, salesRes] = await Promise.all([
                fetch(`${BASE_URL}/api/v1/purchases/purchase-summary?${query}`),
                fetch(`${BASE_URL}/api/v1/sales/sales-summary?${query}`),
            ]);

            const purchaseSummary = await purchaseRes.json();
            const salesSummary = await salesRes.json();

            displayReport(purchaseSummary, salesSummary);

        }
        catch(err){
            alert("Failed to get report!"); 
        }

    } else {
        alert("Failed to get report!"); return;
    }

});