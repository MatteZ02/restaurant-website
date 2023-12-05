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

document.getElementById("open_dialog2").addEventListener("click", function () {
    // Close the current dialog
    document.getElementById("close_dialog").click();

    // Create a new dialog element
    var newDialog = document.createElement("dialog2");
    newDialog.setAttribute("aria-labelledby", "dialog_title");
    newDialog.setAttribute("aria-describedby", "dialog_description");

    // Set the content of the new dialog
    newDialog.innerHTML = `
    <!--Dialog-->
    <dialog2 aria-labelledby="dialog_title" aria-describedby="dialog_description">
      <img src="media/kuvat/user.png" alt="Illustration of Location Services" />
      <h2 id="dialog_title" class="h2">Rekistöröidy</h2>
      <p>Minimum 3 characters</p>
      <!--form-->
      <form action="" method="get" class="form-sub">
        <div class="form-sub">
          <label for="Firstname">Etunimi</label>
          <input
            type="text"
            name="Firstname"
            id="Firstname"
            autocomplete="given-name"
            required minlength="3"
          />
        </div>
        <div class="form-sub">
          <label for="Lastname">Sukunimi</label>
          <input
            type="text"
            name="Lastname"
            id="Lastname"
            autocomplete="family-name"
            required minlength="3"
          />
        </div>
        <div class="form-sub">
          <label for="name">Näyttäjänimi</label>
          <input
            type="text"
            name="name"
            id="name"
            autocomplete="username"
            required minlength="3"
          />
        </div>
        <div class="form-sub">
          <label for="password">Salasana:</label>
          <input
            type="password"
            name="password"
            id="password"
            required minlength="3"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}"
          />
        </div>
        <div class="form-sub">
          <label for="phone">Puhelinnumero:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autocomplete="tel"
            minlength="3"
          />
        </div>
        <div class="form-sub">
          <label for="address">Osoite:</label>
          <input
            type="text"
            name="address"
            id="address"
            autocomplete="address-line1"
            minlength="3"
          />
        </div>
        <!--</div>-->
      </form>
      <!--form-->

      <div class="flex flex-space-between">
        <button id="close_dialog2">Sulje</button>
        <button type="submit" value="lähetä!" id="confirm_dialog">Vahvista</button>
      </div>
    </dialog2>
    <!--Dialog-->
  `;

    // Append the new dialog to the document body
    document.body.appendChild(newDialog);

    // Show the new dialog
    newDialog.showModal();

    // Event listener for the close button in the new dialog
    newDialog.querySelector("#close_dialog2").addEventListener("click", function () {
        newDialog.close();
    });
});

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
