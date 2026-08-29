const formDiv = document.querySelector(".purchase-form-container");

const formBtn = document.querySelector("#new-purchase");
const submit = document.querySelector("#add-btn");
const close = document.querySelector("#clear-btn");

formBtn.addEventListener("click", () => {
    formDiv.style.display = 'block';
});

submit.addEventListener("click", () => {
    formDiv.style.display = none;
});

close.addEventListener("click", () => {
    formDiv.style.display = none;
});


