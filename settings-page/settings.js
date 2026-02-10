const backPage = document.querySelector(".home");
const upArrow = document.querySelectorAll(".arrow-up");
const downArrow = document.querySelectorAll(".arrow-down");

backPage.addEventListener("click", (evt) => {
    window.location.href = "../index.html";
});

let inputs = document.querySelectorAll(".input");

inputs.forEach(input => {
    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
    });
});

upArrow.forEach(btn =>
    btn.addEventListener("click", () => {
        let input = btn.parentElement.querySelector('.input');

        let value = parseInt(input.value);
        let max = parseInt(input.max);

        if (value < max) {
            input.value = value + 1;
            localStorage.setItem(input.id, input.value);
        }

    })
);

downArrow.forEach(btn =>
    btn.addEventListener("click", () => {
        let input = btn.parentElement.querySelector('.input');

        let value = parseInt(input.value);
        let min = parseInt(input.min);

        if (value > min) {
            input.value = value - 1;
            localStorage.setItem(input.id, input.value);
        }

    })
);

window.addEventListener("DOMContentLoaded", () => {
    let inputs = document.querySelectorAll(".input");

    inputs.forEach(input => {
        savedValue = localStorage.getItem(input.id);

        if (savedValue !== null) {
            input.value = savedValue;
        }
    }
    )
})