import { closeDialog, openDialog } from "../util/dialog";
import RestaurantApiWrapper from "../api";

const restaurantApiWrapper = new RestaurantApiWrapper();

const loginModalController = (modal: HTMLDialogElement, redir?: string) => {
    openDialog(modal);
    const submit = document.querySelector("#submit");
    submit?.addEventListener("click", async evt => {
        evt.preventDefault();
        closeDialog(modal);
        const username = document.querySelector("#username") as HTMLInputElement;
        const password = document.querySelector("#password") as HTMLInputElement;

        const res = await restaurantApiWrapper.login(username.value, password.value);
        if (!res) {
            alert("Login failed");
            return;
        }
        localStorage.setItem("token", res.token);

        if (redir) window.location.href = redir;
    });
};

export default loginModalController;