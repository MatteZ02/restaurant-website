import { closeDialog, openDialog } from "../util/dialog";
import User from "../api/classes/User";

const userModifyModalController = (modal: HTMLDialogElement, user: User) => {
    const username = document.querySelector("#username") as HTMLInputElement;
    const firstname = document.querySelector("#firstname") as HTMLInputElement;
    const lastname = document.querySelector("#lastname") as HTMLInputElement;
    const email = document.querySelector("#email") as HTMLInputElement;
    const phone = document.querySelector("#phone") as HTMLInputElement;
    const address = document.querySelector("#address") as HTMLInputElement;
    const level = document.querySelector("#role") as HTMLSelectElement;

    username.value = user.username;
    firstname.value = user.first_name;
    lastname.value = user.last_name;
    email.value = user.email;
    phone.value = user.phone || "";
    address.value = user.address || "";
    level.value = user.level.toString();

    openDialog(modal);

    const submit = document.querySelector("#submit-user");
    submit?.addEventListener("click", async evt => {
        evt.preventDefault();

        const userObj = {
            username: username.value,
            first_name: firstname.value,
            last_name: lastname.value,
            email: email.value,
            phone: phone.value || undefined,
            address: address.value || undefined,
            level: +level.value,
        };

        const updatedUser = await user.update(userObj);

        if (!updatedUser) return alert("Failed to update user");

        closeDialog(modal);
    });

    const deleteBtn = document.querySelector("#delete-user");
    deleteBtn?.addEventListener("click", async evt => {
        evt.preventDefault();

        const deletedUser = await user.delete();

        if (!deletedUser) return alert("Failed to delete user");

        closeDialog(modal);
    });
};

export default userModifyModalController;
