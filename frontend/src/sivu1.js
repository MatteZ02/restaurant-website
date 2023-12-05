"use strict";

const dialog = document.querySelector("dialog");
const openDialogBtn = document.getElementById("open_dialog");
const closeDialogBtn = document.getElementById("close_dialog");

const elements = dialog.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

/*const trapFocus = (e) => {
  if (e.key === "Tab") {
    const tabForwards = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      // only TAB is pressed, not SHIFT simultaneously
      // Prevent default behavior of keydown on TAB (i.e. focus next element)
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      // TAB and SHIFT are pressed simultaneously
      e.preventDefault();
      lastElement.focus();
    }
  }
};
*/

if (typeof dialog.showModal !== "function") {
    /**
   * How to add polyfill outside CodePen conditionally
   * let polyfill = document.createElement("script");
   * polyfill.type = "text/javascript";
   * polyfill.src = "/dist/dialog-polyfill.js";
   * document.body.append(polyfill);

   * const polyfillStyles = document.createElement("link");
   * polyfillStyles.rel = "stylesheet";
   * polyfillStyles.href = "dialog-polyfill.css";
   * document.head.append(polyfillStyles);
   **/

    // Register polyfill on dialog element once the script has loaded
    dialogPolyfill.registerDialog(dialog);
}

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
