import { MenuItem } from "restaurantApiTypes";
import addMenuItem from "../functions/addMenuItem";
import editMenuItem from "../functions/editMenuitem";
import { openDialog } from "../util/dialog";

const menuItemModalController = async (modal: HTMLDialogElement, oldItem?: MenuItem) => {
    openDialog(modal);
    const heading: HTMLHeadingElement | null = document.querySelector("#menu-item-modal-header");
    if (heading) heading.innerText = oldItem ? "Edit menu item" : "Add menu item";
    const submit = document.querySelector("#submit");
    submit?.addEventListener("click", evt => {
        evt.preventDefault();
        modal.close();
        const name = document.querySelector("#item-name") as HTMLInputElement;
        const description = document.querySelector("#item-description") as HTMLInputElement;
        const price = document.querySelector("#item-price") as HTMLInputElement;
        const thumbnailUrl = document.querySelector("#thumbnail-url") as HTMLInputElement; // TODO: Image upload
        const category = document.querySelector("#item-category") as HTMLInputElement;
        const menuItem = {
            name: name.value,
            description: description.value,
            price: +price.value,
            thumbnail_url: thumbnailUrl?.value ?? "no url",
            category: +category.value,
        };

        const id = oldItem?.id;

        if (id) editMenuItem(id, menuItem);
        else addMenuItem(menuItem);
    });
};

export default menuItemModalController;
