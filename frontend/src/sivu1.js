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

const openDialog = () => {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
};

const closeDialog = (e) => {
  e.preventDefault();
  dialog.close();
  dialog.removeEventListener("keydown", trapFocus);
  openDialogBtn.focus();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);

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


const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})

