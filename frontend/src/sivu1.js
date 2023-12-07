"use strict";

const dialog = document.querySelector("dialog");
const openDialogBtn = document.getElementById("open_dialog");
const closeDialogBtn = document.getElementById("close_dialog");

const elements = dialog.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

const openDialog = () => {
    dialog.showModal();
    dialog.addEventListener("keydown", trapFocus);
};

const closeDialog = e => {
    e.preventDefault();
    dialog.close();
    dialog.removeEventListener("keydown", trapFocus);
    openDialogBtn.focus();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

/* counter to cart items*/
document.addEventListener("DOMContentLoaded", function () {
    const counterInput = document.getElementById("counter1");
    const plusBtn = document.getElementById("button_add_counter1");
    const minusBtn = document.getElementById("button_remove_counter1");

    let itemCount = 0;

    function updateCounter() {
        counterInput.value = itemCount;
    }

    plusBtn.addEventListener("click", function () {
        itemCount++;
        updateCounter();
    });

    minusBtn.addEventListener("click", function () {
        if (itemCount > 0) {
            itemCount--;
            updateCounter();
        }
    });
});

function jumpToMeals() {
    var middlePosition = window.innerHeight / 4;
    window.scrollTo(0, middlePosition);
}

// Jump to top burgers
function jumpToBurgers() {
    var burgerPosition = window.innerHeight / 1.1;
    window.scrollTo(0, burgerPosition);
}
