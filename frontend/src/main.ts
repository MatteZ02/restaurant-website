import RestaurantApiWrapper from "./api";
import loginModalController from "./controllers/loginModalController";
import registerModalController from "./controllers/registerModalController";
import { closeDialog, openDialog } from "./util/dialog";
import { noop } from "./util/utils";

const restaurantApiWrapper = new RestaurantApiWrapper();

const checkbox = document.getElementById("checkbox");
checkbox?.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

const params = new URLSearchParams(window.location.search);
const login = params.get("login");
const redirect = params.get("redirect");

const loginModal = document.getElementById("login-modal");
const openLoginModalBtn = document.getElementById("open_dialog");
const closeLoginModalBtn = document.getElementById("close_dialog");

if (login)
    redirect
        ? loginModalController(loginModal as HTMLDialogElement, redirect)
        : loginModalController(loginModal as HTMLDialogElement);

if (openLoginModalBtn && loginModal) {
    openLoginModalBtn.addEventListener("click", () => {
        loginModalController(loginModal as HTMLDialogElement);
    });
}

if (closeLoginModalBtn && loginModal) {
    closeLoginModalBtn.addEventListener("click", () => {
        closeDialog(loginModal as HTMLDialogElement);
    });
}

const registerBtn = document.getElementById("open_dialog2");

if (registerBtn)
    registerBtn.addEventListener("click", function () {
        // Close the current dialog
        document.getElementById("close_dialog")?.click();

        // Create a new dialog element
        const registerModal = document.createElement("dialog") as HTMLDialogElement;
        registerModal.setAttribute("aria-labelledby", "dialog_title");
        registerModal.setAttribute("aria-describedby", "dialog_description");

        // Set the content of the new dialog
        registerModal.innerHTML = `
    <!--Dialog-->
    <div id="register" > <dialog2 aria-labelledby="dialog_title" aria-describedby="dialog_description">
    <h2 id="dialog_title" class="h2">register</h2>
    <p>Minimum 3 characters</p>
    <!--form-->
    <form action="" method="get" class="form-sub">
      <div class="form-sub">
        <label for="Firstname">Firstname</label>
        <input
          type="text"
          name="Firstname"
          id="firstname"
          autocomplete="given-name"
          required minlength="3"
        />
      </div>
      <div class="form-sub">
        <label for="Lastname">Lastname</label>
        <input
          type="text"
          name="Lastname"
          id="lastname"
          autocomplete="family-name"
          required minlength="3"
        />
      </div>
      <div class="form-sub">
        <label for="name">Username</label>
        <input
          type="text"
          name="name"
          id="name"
          autocomplete="username"
          required minlength="3"
        />
      </div>
      <div class="form-sub">
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          id="newpassword"
          required minlength="3"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}"
        />
      </div>
      <div class="form-sub">
      <label for="name">E-mail</label>
      <input
        type="text"
        name="email"
        id="email"
        autocomplete="email"
        required minlength="3"
      />
    </div>
      <div class="form-sub">
        <label for="phone">phone number:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          autocomplete="tel"
          minlength="3"
        />
      </div>
      <div class="form-sub">
        <label for="address">address:</label>
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
      <button id="close_dialog2">Close</button>
      <button type="submit" value="lähetä!" id="confirm_dialog">Confirm</button>
    </div>
  </dialog2>
  <!--Dialog--></div>

  `;

        registerModal
            .querySelector("#close_dialog2")
            ?.addEventListener("click", () => closeDialog(registerModal));
        // Append the new dialog to the document body
        document.body.appendChild(registerModal);
        registerModalController(registerModal);
    });

const f = async () => {
    const cart = await restaurantApiWrapper.getCart().catch(noop);
    if (!cart) return;
    if (cart.items.length === 0) return;
    const cartDialog = document.getElementsByClassName("cartdialog")[0] as HTMLDialogElement;
    if (!cartDialog) return;
    const cartDialogBtn = cartDialog.getElementsByClassName("cartB")[0] as HTMLLinkElement;
    if (!cartDialogBtn) return;
    cartDialogBtn.innerText = `${cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
    )} items in cart`;
    if (cart.items.length > 0) cartDialog.showModal();
    else closeDialog(cartDialog);
};

f();
