import RestaurantApiWrapper from "./api";
import menuItemModalController from "./controllers/menuItemModalController";

if (!localStorage.getItem("token"))
    window.location.href = `/?login=true&redirect=${window.location.href}`;

const restaurantApiWrapper = new RestaurantApiWrapper();

const menuItemModal = document.querySelector("#menu-item-modal");

const addMenuItemButton = document.querySelector("#add-menu-item");
addMenuItemButton?.addEventListener("click", evt => {
    evt.preventDefault();
    menuItemModalController(menuItemModal as HTMLDialogElement);
});

const deleteMenuItem = async (id: string) => {
    const res = await restaurantApiWrapper.deleteMenuItem(+id);
};

const menu = document.querySelector("#menu-items");

(async () => {
    const menuItems = await restaurantApiWrapper.getMenu();

    for (const item in menuItems) {
        const menuItem = menuItems[item];

        const menuItemElement = document.createElement("div");
        menuItemElement.classList.add("menu-item");
        menuItemElement.id = menuItem.id.toString();

        const menuItemName = document.createElement("h3");
        menuItemName.innerText = menuItem.name;

        const menuItemDescription = document.createElement("p");
        menuItemDescription.innerText = menuItem.description;

        const menuItemPrice = document.createElement("p");
        menuItemPrice.innerText = menuItem.price.toString();

        const menuItemThumbnail = document.createElement("img");
        menuItemThumbnail.src = menuItem.thumbnail_url;

        const menuItemCategory = document.createElement("p");
        menuItemCategory.innerText = menuItem.category.toString();

        const menuItemEdit = document.createElement("button");
        menuItemEdit.innerText = "Edit";
        menuItemEdit.addEventListener("click", evt => {
            evt.preventDefault();
            menuItemModalController(menuItemModal as HTMLDialogElement, menuItem);
        });

        const menuItemDelete = document.createElement("button");
        menuItemDelete.innerText = "Delete";
        menuItemDelete.addEventListener("click", () => deleteMenuItem(menuItem.id.toString()));

        menuItemElement.appendChild(menuItemName);
        menuItemElement.appendChild(menuItemDescription);
        menuItemElement.appendChild(menuItemPrice);
        menuItemElement.appendChild(menuItemThumbnail);
        menuItemElement.appendChild(menuItemCategory);
        menuItemElement.appendChild(menuItemEdit);
        menuItemElement.appendChild(menuItemDelete);

        menu?.appendChild(menuItemElement);
    }
})();
