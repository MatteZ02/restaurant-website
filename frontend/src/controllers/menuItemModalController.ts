import { MenuItem } from "restaurantApiTypes";
import addMenuItem from "../functions/addMenuItem";
import editMenuItem from "../functions/editMenuitem";
import { closeDialog, openDialog } from "../util/dialog";

const isFullMenuItem = (item: Partial<MenuItem>): item is MenuItem =>
    !!item.name && !!item.description && !!item.price && !!item.category;

const menuItemModalController = async (modal: HTMLDialogElement, oldItem?: MenuItem) => {
    openDialog(modal);
    const heading: HTMLHeadingElement | null = document.querySelector("#menu-item-modal-header");
    if (heading) heading.innerText = oldItem ? "Edit menu item" : "Add menu item";
    const submit = document.querySelector("#submit-menu-item");
    submit?.addEventListener("click", evt => {
        evt.preventDefault();
        closeDialog(modal);
        const name = document.querySelector("#item-name") as HTMLInputElement;
        const description = document.querySelector("#item-description") as HTMLInputElement;
        const price = document.querySelector("#item-price") as HTMLInputElement;
        const category = document.querySelector("#item-category") as HTMLInputElement;
        const menuItem: Partial<MenuItem> = {
            name: name.value || undefined,
            description: description.value || undefined,
            price: +price.value || undefined,
            category: +category.value || undefined,
        };

        const id = oldItem?.id;

        if (id) editMenuItem(id, menuItem);
        else {
            if (
                !menuItem.name ||
                !menuItem.description ||
                !menuItem.price ||
                !menuItem.category ||
                !isFullMenuItem(menuItem)
            )
                return alert("Missing fields");
            addMenuItem(menuItem);
        }
    });
};

export default menuItemModalController;
