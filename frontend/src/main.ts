import RestaurantApiWrapper from "./api";
import loginModalController from "./controllers/loginModalController";
import { closeDialog } from "./util/dialog";

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
