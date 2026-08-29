const formDiv = document.querySelector(".form-container");

const formBtn = document.querySelector("#new-supplier");
const submit = document.querySelector("#formBtn-submit");
const close = document.querySelector("#close");

formBtn.addEventListener("click", () => {
    formDiv.style.display = 'block';
});

submit.addEventListener("click", () => {
    formDiv.style.display = none;
});

close.addEventListener("click", () => {
    formDiv.style.display = none;
});


