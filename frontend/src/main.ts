import RestaurantApiWrapper from "./api";
import loginModalController from "./controllers/loginModalController";
import registerModalController from "./controllers/registerModalController";
import { closeDialog, openDialog } from "./util/dialog";

const restaurantApiWrapper = new RestaurantApiWrapper();

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
    <img src="public/media/kuvat/login.png" alt="Illustration of Location Services" />
    <h2 id="dialog_title" class="h2">Rekisteröidy</h2>
    <p>Minimi 3 merkkiä</p>
    <!--form-->
    <form action="" method="get" class="form-sub">
      <div class="form-sub">
        <label for="Firstname">Etunimi</label>
        <input
          type="text"
          name="Firstname"
          id="firstname"
          autocomplete="given-name"
          required minlength="3"
        />
      </div>
      <div class="form-sub">
        <label for="Lastname">Sukunimi</label>
        <input
          type="text"
          name="Lastname"
          id="lastname"
          autocomplete="family-name"
          required minlength="3"
        />
      </div>
      <div class="form-sub">
        <label for="name">Käyttäjänimi</label>
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
          id="newpassword"
          required minlength="3"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}"
        />
      </div>
      <div class="form-sub">
      <label for="name">Sähköposti</label>
      <input
        type="text"
        name="email"
        id="email"
        autocomplete="email"
        required minlength="3"
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
  <!--Dialog--></div>

  `;

        registerModal
            .querySelector("#close_dialog2")
            ?.addEventListener("click", () => closeDialog(registerModal));
        // Append the new dialog to the document body
        document.body.appendChild(registerModal);
        registerModalController(registerModal);
    });
