"use strict";

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
