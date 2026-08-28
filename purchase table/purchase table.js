* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f4f7f5;
    color: #333;
}

.container {
    width: 95%;
    max-width: 1400px;
    margin: 30px auto;
}


/* Header */

.header {
    text-align: center;
    margin-bottom: 25px;
}

.header h1 {
    color: #176b3a;
    margin-bottom: 8px;
}

.header h2 {
    color: #555;
}


/* Purchase Box */

.purchase-box {
    background: white;
    padding: 25px;
    border-radius: 12px;

    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);

    margin-bottom: 30px;
}

.purchase-box h3 {
    color: #176b3a;
    margin-bottom: 20px;
    font-size: 20px;
}


/* Form */

form {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 18px 25px;
}

.input-box {
    display: flex;
    flex-direction: column;
}

.input-box label {
    font-weight: bold;
    margin-bottom: 7px;
}

.input-box input,
.input-box select {

    width: 100%;

    padding: 11px;

    border: 1px solid #ccc;

    border-radius: 6px;

    font-size: 15px;

    outline: none;
}

.input-box input:focus,
.input-box select:focus {
    border-color: #176b3a;
}


/* Automatic fields */

#totalCost,
#dueAmount {
    background: #eeeeee;
    font-weight: bold;
}


/* Buttons */

.button-area {

    grid-column: span 2;

    display: flex;

    gap: 12px;

    margin-top: 5px;
}

.button-area button {

    padding: 11px 25px;

    border: none;

    border-radius: 6px;

    font-size: 15px;

    cursor: pointer;

    color: white;
}

.add-btn {
    background: #176b3a;
}

.add-btn:hover {
    background: #0e4d28;
}

.clear-btn {
    background: #777;
}

.clear-btn:hover {
    background: #555;
}


/* List Box */

.list-box {

    background: white;

    padding: 25px;

    border-radius: 12px;

    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
}

.list-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;
}

.list-header h3 {

    color: #176b3a;

    font-size: 20px;
}

#searchPurchase {

    width: 250px;

    padding: 10px 15px;

    border: 1px solid #ccc;

    border-radius: 6px;

    outline: none;
}

#searchPurchase:focus {
    border-color: #176b3a;
}


/* Table */

.table-container {
    overflow-x: auto;
}

table {

    width: 100%;

    min-width: 1200px;

    border-collapse: collapse;
}

thead {
    background: #176b3a;

    color: white;
}

th,
td {

    padding: 12px 8px;

    text-align: center;

    border: 1px solid #ddd;
}

tbody tr:hover {
    background: #f5f5f5;
}


/* Action Buttons */

.edit-btn {

    background: #2980b9;

    color: white;

    border: none;

    padding: 6px 10px;

    border-radius: 4px;

    cursor: pointer;
}

.delete-btn {

    background: #d63031;

    color: white;

    border: none;

    padding: 6px 10px;

    border-radius: 4px;

    cursor: pointer;

    margin-left: 5px;
}

.edit-btn:hover {
    background: #1f6391;
}

.delete-btn:hover {
    background: #a71d1d;
}


/* Mobile */

@media (max-width: 768px) {

    form {
        grid-template-columns: 1fr;
    }

    .button-area {
        grid-column: span 1;
    }

    .list-header {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
    }

    #searchPurchase {
        width: 100%;
    }
}