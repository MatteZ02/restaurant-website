import RestaurantApiWrapper from "../api";
import { closeDialog, openDialog } from "../util/dialog";

const restaurantApiWrapper = new RestaurantApiWrapper();

const registerModalController = (modal: HTMLDialogElement) => {
    //openDialog(modal);
    const submit = document.getElementById("confirm_dialog");

    if (submit)
        submit.addEventListener("click", async () => {
            const username = (document.getElementById("name") as HTMLInputElement).value;
            const firstname = (document.getElementById("firstname") as HTMLInputElement).value;
            const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
            const password = (document.getElementById("newpassword") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const phone = (document.getElementById("phone") as HTMLInputElement).value || undefined;
            const address =
                (document.getElementById("address") as HTMLInputElement).value || undefined;

            console.log(username, firstname, lastname, password, email, phone, address);

            const userData = {
                username,
                first_name: firstname,
                last_name: lastname,
                password,
                email,
                phone,
                address,
            };

            console.log(userData);

            const user = await restaurantApiWrapper.postUser(userData);

            console.log(user);

            closeDialog(modal);
        });
};

export default registerModalController;
